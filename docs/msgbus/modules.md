[@securerpc/msgbus](README.md) / Exports

# @securerpc/msgbus

## Table of contents

### Classes

- [DashboardMessageBus](classes/DashboardMessageBus.md)

### Interfaces

- [DashboardProviderMessage](interfaces/DashboardProviderMessage.md)
- [InvalidateMessage](interfaces/InvalidateMessage.md)
- [LogMessage](interfaces/LogMessage.md)
- [Message](interfaces/Message.md)
- [PortsConfig](interfaces/PortsConfig.md)

### Functions

- [base64ToJson](modules.md#base64tojson)
- [broadcastAndAwaitFirst](modules.md#broadcastandawaitfirst)
- [broadcastAndDisregard](modules.md#broadcastanddisregard)
- [connectToMessageBus](modules.md#connecttomessagebus)
- [connectToMessageBusWithRetries](modules.md#connecttomessagebuswithretries)
- [createMessage](modules.md#createmessage)
- [getMessageBusPorts](modules.md#getmessagebusports)
- [isDashboardProviderMessage](modules.md#isdashboardprovidermessage)
- [isInvalidateMessage](modules.md#isinvalidatemessage)
- [isLogMessage](modules.md#islogmessage)
- [jsonToBase64](modules.md#jsontobase64)
- [sendAndAwait](modules.md#sendandawait)
- [startWebSocketServer](modules.md#startwebsocketserver)

## Functions

### base64ToJson

▸ **base64ToJson**(`base64`): `any`

Convert the base64 representation of a JS object or value to its JS
representation

**`dev`** This is the reverse of `jsonToBase64` and is not expected to work with
other base64 formats

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `base64` | `string` |

#### Returns

`any`

#### Defined in

[lib/utils.ts:24](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L24)

---

### broadcastAndAwaitFirst

▸ **broadcastAndAwaitFirst**(`sockets`, `message`): `Promise`<`any`\>

Broadcast a message to multuple websocket connections and return the first
response

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `sockets` | `WebSocket`[]                      |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/utils.ts:64](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L64)

---

### broadcastAndDisregard

▸ **broadcastAndDisregard**(`sockets`, `message`): `void`

Broadcast a message to multiple websocket connections and disregard them

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `sockets` | `WebSocket`[]                      |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

`void`

#### Defined in

[lib/utils.ts:51](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L51)

---

### connectToMessageBus

▸ **connectToMessageBus**(`port`, `host?`): `Promise`<`WebSocket`\>

#### Parameters

| Name   | Type     | Default value |
| :----- | :------- | :------------ |
| `port` | `number` | `undefined`   |
| `host` | `string` | `'localhost'` |

#### Returns

`Promise`<`WebSocket`\>

#### Defined in

[lib/utils.ts:125](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L125)

---

### connectToMessageBusWithRetries

▸ **connectToMessageBusWithRetries**(`port`, `host?`, `retries?`):
`Promise`<`WebSocket`\>

#### Parameters

| Name      | Type     | Default value |
| :-------- | :------- | :------------ |
| `port`    | `number` | `undefined`   |
| `host`    | `string` | `'localhost'` |
| `retries` | `number` | `50`          |

#### Returns

`Promise`<`WebSocket`\>

#### Defined in

[lib/utils.ts:107](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L107)

---

### createMessage

▸ **createMessage**(`type`, `payload`): [`Message`](interfaces/Message.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `type`    | `string` |
| `payload` | `any`    |

#### Returns

[`Message`](interfaces/Message.md)

#### Defined in

[lib/utils.ts:43](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L43)

---

### getMessageBusPorts

▸ **getMessageBusPorts**(`dashboardPort`, `dashboardHost?`, `retries?`):
`Promise`<[`PortsConfig`](interfaces/PortsConfig.md)\>

#### Parameters

| Name            | Type     | Default value |
| :-------------- | :------- | :------------ |
| `dashboardPort` | `number` | `undefined`   |
| `dashboardHost` | `string` | `'localhost'` |
| `retries`       | `number` | `5`           |

#### Returns

`Promise`<[`PortsConfig`](interfaces/PortsConfig.md)\>

#### Defined in

[lib/utils.ts:139](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L139)

---

### isDashboardProviderMessage

▸ **isDashboardProviderMessage**(`message`): message is DashboardProviderMessage

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

message is DashboardProviderMessage

#### Defined in

[lib/message/types.ts:44](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L44)

---

### isInvalidateMessage

▸ **isInvalidateMessage**(`message`): message is InvalidateMessage

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

message is InvalidateMessage

#### Defined in

[lib/message/types.ts:54](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L54)

---

### isLogMessage

▸ **isLogMessage**(`message`): message is LogMessage

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

message is LogMessage

#### Defined in

[lib/message/types.ts:50](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L50)

---

### jsonToBase64

▸ **jsonToBase64**(`json`): `string`

Convert any JS object or value to a base64 representation of it

#### Parameters

| Name   | Type  |
| :----- | :---- |
| `json` | `any` |

#### Returns

`string`

#### Defined in

[lib/utils.ts:12](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L12)

---

### sendAndAwait

▸ **sendAndAwait**(`socket`, `message`): `Promise`<`any`\>

Send a message to a websocket connection and await a matching response

**`dev`** Responses are matched by looking at received messages that match the
ID of the sent message

#### Parameters

| Name      | Type                               |
| :-------- | :--------------------------------- |
| `socket`  | `WebSocket`                        |
| `message` | [`Message`](interfaces/Message.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[lib/utils.ts:77](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L77)

---

### startWebSocketServer

▸ **startWebSocketServer**(`options`): `Promise`<`Server`\>

Starts a websocket server and waits for it to be opened

**`dev`** If you need to attach event listeners _before_ the server connection
opens, do not use this function since it resolves _after_ the connection is
opened

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `options` | `ServerOptions` |

#### Returns

`Promise`<`Server`\>

#### Defined in

[lib/utils.ts:37](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/utils.ts#L37)
