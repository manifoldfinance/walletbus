"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msgbus_1 = require("@securerpc/msgbus");
const DashboardServer_1 = require("../lib/DashboardServer");
const [optionsBase64] = process.argv.slice(2);
const options = (0, msgbus_1.base64ToJson)(optionsBase64);
const dashboardServer = new DashboardServer_1.DashboardServer(options);
dashboardServer.start();
//# sourceMappingURL=start-dashboard.js.map