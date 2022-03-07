import express, { Application, NextFunction, Request, Response } from "express";
import WebSocket from "isomorphic-ws";
import path from "path";
import getPort from "get-port";
import open from "open";
import {
  base64ToJson,
  connectToMessageBusWithRetries,
  createMessage,
  DashboardMessageBus,
  LogMessage,
  sendAndAwait
} from "@truffle/dashboard-message-bus";
import cors from "cors";
import type { Server } from "http";
import debugModule from "debug";

export interface DashboardServerOptions {
  /** Port of the dashboard */
  port: number;

  /** Host of the dashboard (default: localhost) */
  host?: string;

  /** Boolean indicating whether the POST /rpc endpoint should be exposed (default: true) */
  rpc?: boolean;

  /** Boolean indicating whether debug output should be logged (default: false) */
  verbose?: boolean;

  /** Boolean indicating whether whether starting the DashboardServer should automatically open the dashboard (default: true) */
  autoOpen?: boolean;
}

export class DashboardServer {
  port: number;
  host: string;
  rpc: boolean;
  verbose: boolean;
  autoOpen: boolean;
  frontendPath: string;

  private expressApp?: Application;
  private httpServer?: Server;
  private messageBus?: DashboardMessageBus;
  private socket?: WebSocket;

  boundTerminateListener: () => void;

  constructor(options: DashboardServerOptions) {
    this.port = options.port;
    this.host = options.host ?? "localhost";
    this.rpc = options.rpc ?? true;
    this.verbose = options.verbose ?? false;
    this.autoOpen = options.autoOpen ?? true;
    this.frontendPath = path.join(
      __dirname,
      ".",
      "dashboard-frontend",
      "build"
    );

    this.boundTerminateListener = () => this.stop();
  }

  async start() {
    if (this.httpServer?.listening) return;

    this.messageBus = await this.startMessageBus();

    this.expressApp = express();

    this.expressApp.use(cors());
    this.expressApp.use(express.json());
    this.expressApp.use(express.static(this.frontendPath));

    this.expressApp.get("/ports", this.getPorts.bind(this));

    if (this.rpc) {
      this.socket = await this.connectToMessageBus();
      this.expressApp.post("/rpc", this.postRpc.bind(this));
    }

    await new Promise<void>(resolve => {
      this.httpServer = this.expressApp!.listen(this.port, this.host, () => {
        if (this.autoOpen) {
          const host = this.host === "0.0.0.0" ? "localhost" : this.host;
          open(`http://${host}:${this.port}`);
        }
        resolve();
      });
    });
  }

  async stop() {
    this.messageBus?.off("terminate", this.boundTerminateListener);
    await this.messageBus?.terminate();
    this.socket?.terminate();
    return new Promise<void>(resolve => {
      this.httpServer?.close(() => resolve());
    });
  }

  private getPorts(req: Request, res: Response) {
    if (!this.messageBus) {
      throw new Error("Message bus has not been started yet");
    }

    res.json({
      dashboardPort: this.port,
      subscribePort: this.messageBus.subscribePort,
      publishPort: this.messageBus.publishPort
    });
  }

  private postRpc(req: Request, res: Response, next: NextFunction) {
    if (!this.socket) {
      throw new Error("Not connected to message bus");
    }

    const message = createMessage("provider", req.body);
    sendAndAwait(this.socket, message)
      .then(response => res.json(response.payload))
      .catch(next);
  }

  private async startMessageBus() {
    const messageBusPublishPort = await getPort({ host: this.host });
    const messageBusSubscribePort = await getPort({ host: this.host });
    const messageBus = new DashboardMessageBus(
      messageBusPublishPort,
      messageBusSubscribePort,
      this.host
    );

    await messageBus.start();
    messageBus.on("terminate", this.boundTerminateListener);

    return messageBus;
  }

  private async connectToMessageBus() {
    if (!this.messageBus) {
      throw new Error("Message bus has not been started yet");
    }

    const socket = await connectToMessageBusWithRetries(
      this.messageBus.publishPort,
      this.host
    );

    if (this.verbose) {
      socket.addEventListener("message", (event: WebSocket.MessageEvent) => {
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
      });
    }

    return socket;
  }
}
