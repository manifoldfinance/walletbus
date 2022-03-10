import WebSocket from "isomorphic-ws";
import { Server } from "ws";
import AblativeWebSocket from "../lib/ablative";

const PORT = 9327;
const URL = `ws://localhost:${PORT}`;

let server: Server;
let ws: AblativeWebSocket;

// Be careful to always assign created websockets to the top-level ws variable
// so they get cleaned up after the test, or otherwise close them manually.
// Otherwise, they will keep trying to reconnect and mess with following tests!

beforeEach(() => (server = new Server({ port: PORT })));
afterEach(() => {
    server.close();
    ws.close();
});

describe("basic functionality", () => {
    it("should make a connection like a normal WebSocket", done => {
        setupEchoServer();
        ws = new AblativeWebSocket(URL, { wsConstructor: WebSocket });
        const ondown = jest.fn();
        const onreopen = jest.fn();
        const onclose = jest.fn();
        ws.ondown = ondown;
        ws.onreopen = onreopen;
        ws.onclose = onclose;
        ws.onopen = () => ws.send("Echo?");
        ws.onmessage = event => {
            expect(event.data).toEqual("Echo?");
            expect(ondown).not.toHaveBeenCalled();
            expect(onreopen).not.toHaveBeenCalled();
            expect(onclose).not.toHaveBeenCalled();
            done();
        };
    });

    it("should use the protocol argument", done => {
        server.on("connection", async connection => {
            expect(connection.protocol).toEqual("some-protocol");
            done();
        });
        ws = new AblativeWebSocket(URL, "some-protocol", {
            wsConstructor: WebSocket,
        });
    });

    it("should work with event listeners", done => {
        setupEchoServer();
        ws = new AblativeWebSocket(URL, { wsConstructor: WebSocket });
        ws.addEventListener("open", () => ws.send("Echo??"));
        ws.addEventListener("message", event => {
            expect(event.data).toEqual("Echo??");
            done();
        });
    });

    interface GlobalWithWebSocket extends NodeJS.Global {
        WebSocket?: typeof WebSocket;
    }

    it("should default to global WebSocket if no wsConstructor option", () => {
        const wsGlobal = global as GlobalWithWebSocket;
        const oldGlobalWebSocket = wsGlobal.WebSocket;
        wsGlobal.WebSocket = WebSocket;
        try {
            ws = new AblativeWebSocket(URL);
        } finally {
            wsGlobal.WebSocket = oldGlobalWebSocket;
        }
    });

    it("should fail if no global WebSocket and no wsConstructor option", () => {
        // This test is mainly just to be sure that the previous test is
        // actually doing something.
        const wsGlobal = global as GlobalWithWebSocket;
        const oldGlobalWebSocket = wsGlobal.WebSocket;
        wsGlobal.WebSocket = undefined;
        try {
            expect(() => (ws = new AblativeWebSocket(URL))).toThrow(/global/);
        } finally {
            wsGlobal.WebSocket = oldGlobalWebSocket;
        }
    });
});


function setupEchoServer(): void {
    server.on("connection", connection => {
        connection.on("message", message => {
            connection.send(message);
        });
    });
}

function containsSubsequence<T>(haystack: T[], needle: T[]): boolean {
    let haystackIndex = 0;
    let needleIndex = 0;
    while (true) {
        if (needleIndex >= needle.length) {
            return true;
        } else if (haystackIndex >= haystack.length) {
            return false;
        } else if (haystack[haystackIndex] === needle[needleIndex]) {
            needleIndex++;
        }
        haystackIndex++;
    }
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
