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
export declare class DashboardServer {
    port: number;
    host: string;
    rpc: boolean;
    verbose: boolean;
    autoOpen: boolean;
    frontendPath: string;
    private expressApp?;
    private httpServer?;
    private messageBus?;
    private socket?;
    boundTerminateListener: () => void;
    constructor(options: DashboardServerOptions);
    start(): Promise<void>;
    stop(): Promise<void>;
    private getPorts;
    private postRpc;
    private startMessageBus;
    private connectToMessageBus;
}
