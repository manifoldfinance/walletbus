"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDashboardInBackground = void 0;
const msgbus_1 = require("@securerpc/msgbus");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const startDashboardInBackground = (options) => {
    const dashboardPath = path_1.default.join(__dirname, '..', 'bin', 'start-dashboard');
    const optionsBase64 = (0, msgbus_1.jsonToBase64)(options);
    const child = (0, child_process_1.spawn)('node', [dashboardPath, optionsBase64], {
        detached: true,
        stdio: 'ignore',
    });
    return child;
};
exports.startDashboardInBackground = startDashboardInBackground;
//# sourceMappingURL=utils.js.map