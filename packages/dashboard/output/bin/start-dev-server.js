"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardServer_1 = require("../lib/DashboardServer");
const options = {
    port: 24012,
    host: 'localhost',
    verbose: true,
    rpc: true,
    autoOpen: false,
};
const dashboardServer = new DashboardServer_1.DashboardServer(options);
dashboardServer.start();
//# sourceMappingURL=start-dev-server.js.map