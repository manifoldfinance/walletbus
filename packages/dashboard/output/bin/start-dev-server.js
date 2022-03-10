"use strict";
/**
 * [start Dev Server]
 */
Object.defineProperty(exports, "__esModule", { value: true });
const interfaceServer_1 = require("../lib/interfaceServer");
/**
 * @const options
 * @param port
 * @param host
 * @param rpc
 * @param verbose
 * @param autoOpen
 */
const options = {
    port: 24012,
    host: 'localhost',
    verbose: true,
    rpc: true,
    autoOpen: false,
};
/**
 * [dashboardServer]
 *
 * @param   {[type]}  options  [options description]
 *
 * @return  {[type]}           [return description]
 */
const dashboardServer = new interfaceServer_1.DashboardServer(options);
console.log('dashboardServer', dashboardServer);
dashboardServer.start();
//# sourceMappingURL=start-dev-server.js.map