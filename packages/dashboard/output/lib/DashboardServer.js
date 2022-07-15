"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const get_port_1 = __importDefault(require("get-port"));
const open_1 = __importDefault(require("open"));
const msgbus_1 = require("@securerpc/msgbus");
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
class DashboardServer {
    constructor(options) {
        var _a, _b, _c, _d;
        this.port = options.port;
        this.host = (_a = options.host) !== null && _a !== void 0 ? _a : 'localhost';
        this.rpc = (_b = options.rpc) !== null && _b !== void 0 ? _b : true;
        this.verbose = (_c = options.verbose) !== null && _c !== void 0 ? _c : false;
        this.autoOpen = (_d = options.autoOpen) !== null && _d !== void 0 ? _d : true;
        this.frontendPath = path_1.default.join(__dirname, '.', 'dashboard-frontend', 'build');
        this.boundTerminateListener = () => this.stop();
    }
    async start() {
        var _a;
        if ((_a = this.httpServer) === null || _a === void 0 ? void 0 : _a.listening)
            return;
        this.messageBus = await this.startMessageBus();
        this.expressApp = (0, express_1.default)();
        this.expressApp.use((0, cors_1.default)());
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(express_1.default.static(this.frontendPath));
        this.expressApp.get('/ports', this.getPorts.bind(this));
        if (this.rpc) {
            this.socket = await this.connectToMessageBus();
            this.expressApp.post('/rpc', this.postRpc.bind(this));
        }
        await new Promise((resolve) => {
            this.httpServer = this.expressApp.listen(this.port, this.host, () => {
                if (this.autoOpen) {
                    const host = this.host === '0.0.0.0' ? 'localhost' : this.host;
                    (0, open_1.default)(`http://${host}:${this.port}`);
                }
                resolve();
            });
        });
    }
    async stop() {
        var _a, _b, _c;
        (_a = this.messageBus) === null || _a === void 0 ? void 0 : _a.off('terminate', this.boundTerminateListener);
        await ((_b = this.messageBus) === null || _b === void 0 ? void 0 : _b.terminate());
        (_c = this.socket) === null || _c === void 0 ? void 0 : _c.terminate();
        return new Promise((resolve) => {
            var _a;
            (_a = this.httpServer) === null || _a === void 0 ? void 0 : _a.close(() => resolve());
        });
    }
    getPorts(req, res) {
        if (!this.messageBus) {
            throw new Error('Message bus has not been started yet');
        }
        res.json({
            dashboardPort: this.port,
            subscribePort: this.messageBus.subscribePort,
            publishPort: this.messageBus.publishPort,
        });
    }
    postRpc(req, res, next) {
        if (!this.socket) {
            throw new Error('Not connected to message bus');
        }
        const message = (0, msgbus_1.createMessage)('provider', req.body);
        (0, msgbus_1.sendAndAwait)(this.socket, message)
            .then((response) => res.json(response.payload))
            .catch(next);
    }
    async startMessageBus() {
        const messageBusPublishPort = await (0, get_port_1.default)({ host: this.host });
        const messageBusSubscribePort = await (0, get_port_1.default)({ host: this.host });
        const messageBus = new msgbus_1.DashboardMessageBus(messageBusPublishPort, messageBusSubscribePort, this.host);
        await messageBus.start();
        messageBus.on('terminate', this.boundTerminateListener);
        return messageBus;
    }
    async connectToMessageBus() {
        if (!this.messageBus) {
            throw new Error('Message bus has not been started yet');
        }
        const socket = await (0, msgbus_1.connectToMessageBusWithRetries)(this.messageBus.publishPort, this.host);
        if (this.verbose) {
            socket.addEventListener('message', (event) => {
                if (typeof event.data !== 'string') {
                    event.data = event.data.toString();
                }
                const message = (0, msgbus_1.base64ToJson)(event.data);
                if (message.type === 'log') {
                    const logMessage = message;
                    const debug = (0, debug_1.default)(logMessage.payload.namespace);
                    debug.enabled = true;
                    debug(logMessage.payload.message);
                }
            });
        }
        return socket;
    }
}
exports.DashboardServer = DashboardServer;
//# sourceMappingURL=DashboardServer.js.map