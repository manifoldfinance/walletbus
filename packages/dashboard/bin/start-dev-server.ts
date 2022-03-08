/**
 * [start Dev Server]
 */

import { DashboardServer } from '../lib/interfaceServer';

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
const dashboardServer = new DashboardServer(options);
console.log('dashboardServer', dashboardServer);
dashboardServer.start();
