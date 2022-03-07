import WebSocket from "isomorphic-ws";
import {
  DashboardProviderMessage,
  getMessageBusPorts,
  jsonToBase64,
  PortsConfig
} from "@truffle/dashboard-message-bus";
import axios from "axios";
import { providers } from "ethers";
import type { JSONRPCRequestPayload } from "ethereum-protocol";
import { promisify } from "util";
import { INTERACTIVE_REQUESTS, UNSUPPORTED_REQUESTS } from "./constants";

export const getPorts = async (): Promise<PortsConfig> => {
  const dashboardHost = window.location.hostname;
  const dashboardPort =
    process.env.NODE_ENV === "development"
      ? 24012
      : Number(window.location.port);
  return getMessageBusPorts(dashboardPort, dashboardHost);
};

export const isInteractiveRequest = (request: DashboardProviderMessage) =>
  INTERACTIVE_REQUESTS.includes(request.payload.method);

export const isUnsupportedRequest = (request: DashboardProviderMessage) =>
  UNSUPPORTED_REQUESTS.includes(request.payload.method);

export const forwardDashboardProviderRequest = async (
  provider: any,
  payload: JSONRPCRequestPayload
) => {
  const sendAsync = promisify(provider.sendAsync.bind(provider));
  try {
    const response = await sendAsync(payload);
    return response;
  } catch (error) {
    return {
      jsonrpc: payload.jsonrpc,
      id: payload.id,
      error
    };
  }
};

export const handleDashboardProviderRequest = async (
  request: DashboardProviderMessage,
  provider: any,
  responseSocket: WebSocket
) => {
  const responsePayload = await forwardDashboardProviderRequest(
    provider,
    request.payload
  );
  const response = {
    id: request.id,
    payload: responsePayload
  };

  respond(response, responseSocket);
};

export const respondToUnsupportedRequest = (
  request: DashboardProviderMessage,
  responseSocket: WebSocket
) => {
  const defaultMessage = `Method "${request.payload.method}" is unsupported by @truffle/dashboard-provider`;
  const customMessages: { [index: string]: string } = {
    eth_sign:
      'Method "eth_sign" is unsupported by @truffle/dashboard-provider, please use "personal_sign" instead'
  };

  const message = customMessages[request.payload.method] ?? defaultMessage;
  const code = 4001;

  const errorResponse = {
    id: request.id,
    payload: {
      jsonrpc: request.payload.jsonrpc,
      id: request.payload.id,
      error: { code, message }
    }
  };

  respond(errorResponse, responseSocket);
};

export const respond = (response: any, socket: WebSocket) => {
  console.debug("Sending response", response);
  const encodedResponse = jsonToBase64(response);
  socket.send(encodedResponse);
};

export const getLibrary = (provider: any) =>
  new providers.Web3Provider(provider);

export const getNetworkName = async (chainId: number) => {
  const { data: chainList } = await axios.get(
    "https://chainid.network/chains.json"
  );
  const [chain] = chainList.filter((chain: any) => chain.chainId === chainId);
  if (!chain) return `Chain ID ${chainId}`;
  return chain.name;
};

export const getDisplayName = async (
  library: providers.Web3Provider,
  address: string
) => {
  const ensName = await reverseLookup(library, address);
  const shortenedAccount = shortenAddress(address);
  const displayName = ensName ?? shortenedAccount;
  return displayName;
};

export const reverseLookup = async (
  library: providers.Web3Provider,
  address: string
) => {
  try {
    return await library.lookupAddress(address);
  } catch {
    return undefined;
  }
};

export const shortenAddress = (address: string) => {
  return `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;
};
