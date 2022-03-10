/// <reference types="node" />
import type { DashboardServerOptions } from './interfaceServer';
export declare const startDashboardInBackground: (
  options: DashboardServerOptions,
) => import('child_process').ChildProcess;
