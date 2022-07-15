/// <reference types="node" />
import type { DashboardServerOptions } from './DashboardServer';
export declare const startDashboardInBackground: (options: DashboardServerOptions) => import("child_process").ChildProcess;
