/**
 * [startDashboard]
 */
import { base64ToJson } from "@securerpc/msgbus";
import { DashboardServer } from "../lib/interfaceServer";

const [optionsBase64] = process.argv.slice(2);
const options = base64ToJson(optionsBase64);
const dashboardServer = new DashboardServer(options);
dashboardServer.start();
