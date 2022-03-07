import type {
  JSONRPCRequestPayload,
  JSONRPCErrorCallback,
  JSONRPCResponsePayload
} from "ethereum-protocol";
import { callbackify } from "util";
import WebSocket from "isomorphic-ws";
import delay from "delay";
import open from "open";
import {
  sendAndAwait,
  createMessage,
  connectToMessageBusWithRetries,
  getMessageBusPorts,
  base64ToJson,
  LogMessage
} from "@truffle/dashboard-message-bus";
import { startDashboardInBackground } from "@truffle/dashboard";
import { timeout } from "promise-timeout";
import debugModule from "debug";

export interface DashboardProviderOptions {
  /** Host of the Dashboard (default: localhost) */
  dashboardHost?: string;

  /** Port of the Dashboard (default: 24012) */
  dashboardPort?: number;

  /** Number of seconds before a dashboard-provider request times out (default: 120) */
  timeoutSeconds?: number;

  /** Boolean indicating whether the connection to the dashboard is kept alive between requests (default: false) */
  keepAlive?: boolean;

  /** Boolean indicating whether debug output should be logged (default: false) */
  verbose?: boolean;

  /** Boolean indicating whether the dashboard should automatically get opened in the default browser (default: true) */
  autoOpen?: boolean;
}

export class DashboardProvider {
  public dashboardHost: string;
  public dashboardPort: number;
  public keepAlive: boolean;
  public autoOpen: boolean;

  private socket: WebSocket;
  private timeoutSeconds: number;
  private concurrentRequests: number = 0;
  private connecting: boolean = false;
  private verbose: boolean;

  constructor(options: DashboardProviderOptions = {}) {
    this.dashboardHost = options.dashboardHost ?? "localhost";
    this.dashboardPort = options.dashboardPort ?? 24012;
    this.timeoutSeconds = options.timeoutSeconds ?? 120;
    this.keepAlive = options.keepAlive ?? false;
    this.verbose = options.verbose ?? false;
    this.autoOpen = options.autoOpen ?? true;

    // Start a dashboard at the provided port (will silently fail if the dashboard address is already in use)
    const dashboardOptions = {
      port: this.dashboardPort,
      host: this.dashboardHost,
      rpc: false,
      verbose: this.verbose,
      autoOpen: false
    };
    startDashboardInBackground(dashboardOptions);

    if (this.autoOpen) {
      open(`http://${this.dashboardHost}:${this.dashboardPort}`);
    }
  }

  public send(payload: JSONRPCRequestPayload, callback: JSONRPCErrorCallback) {
    const sendInternal = (payload: JSONRPCRequestPayload) =>
      this.sendInternal(payload);
    callbackify(sendInternal)(payload, callback);
  }

  public sendAsync(
    payload: JSONRPCRequestPayload,
    callback: JSONRPCErrorCallback
  ) {
    this.send(payload, callback);
  }

  public terminate() {
    this.socket?.terminate();
  }

  private async sendInternal(
    payload: JSONRPCRequestPayload
  ): Promise<JSONRPCResponsePayload> {
    await this.ready();

    const message = createMessage("provider", payload);

    this.concurrentRequests += 1;

    const { payload: response } = await timeout(
      sendAndAwait(this.socket, message),
      this.timeoutSeconds * 1000
    );

    this.concurrentRequests -= 1;

    if (this.shouldTerminate()) {
      this.terminate();
    }

    if (response.error) {
      throw response.error;
    }

    return response;
  }

  private shouldTerminate(): boolean {
    if (this.keepAlive) return false;
    if (this.concurrentRequests !== 0) return false;
    return true;
  }

  private async ready() {
    // Don't create a new connection to the message bus while we're already connecting
    if (this.connecting) {
      await delay(1000);
      return this.ready();
    }

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.connecting = false;
      return;
    }

    this.connecting = true;
    try {
      const { publishPort } = await getMessageBusPorts(
        this.dashboardPort,
        this.dashboardHost
      );
      this.socket = await connectToMessageBusWithRetries(
        publishPort,
        this.dashboardHost
      );
      if (this.verbose) this.setupLogging();
    } finally {
      this.connecting = false;
    }
  }

  setupLogging() {
    this.socket?.addEventListener(
      "message",
      (event: WebSocket.MessageEvent) => {
        if (typeof event.data !== "string") {
          event.data = event.data.toString();
        }

        const message = base64ToJson(event.data);
        if (message.type === "log") {
          const logMessage = message as LogMessage;
          const debug = debugModule(logMessage.payload.namespace);
          debug.enabled = true;
          debug(logMessage.payload.message);
        }
      }
    );
  }
}
