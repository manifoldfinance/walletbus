[@securerpc/msgbus](../README.md) / [Exports](../modules.md) /
DashboardMessageBus

# Class: DashboardMessageBus

## Hierarchy

- `EventEmitter`

  ↳ **`DashboardMessageBus`**

## Table of contents

### Constructors

- [constructor](DashboardMessageBus.md#constructor)

### Properties

- [host](DashboardMessageBus.md#host)
- [publishPort](DashboardMessageBus.md#publishport)
- [publishServer](DashboardMessageBus.md#publishserver)
- [publishers](DashboardMessageBus.md#publishers)
- [subscribePort](DashboardMessageBus.md#subscribeport)
- [subscribeServer](DashboardMessageBus.md#subscribeserver)
- [subscribers](DashboardMessageBus.md#subscribers)
- [unfulfilledRequests](DashboardMessageBus.md#unfulfilledrequests)
- [captureRejectionSymbol](DashboardMessageBus.md#capturerejectionsymbol)
- [captureRejections](DashboardMessageBus.md#capturerejections)
- [defaultMaxListeners](DashboardMessageBus.md#defaultmaxlisteners)
- [errorMonitor](DashboardMessageBus.md#errormonitor)

### Methods

- [addListener](DashboardMessageBus.md#addlistener)
- [addPublisher](DashboardMessageBus.md#addpublisher)
- [addSubscriber](DashboardMessageBus.md#addsubscriber)
- [clearRequestsForPublisher](DashboardMessageBus.md#clearrequestsforpublisher)
- [emit](DashboardMessageBus.md#emit)
- [eventNames](DashboardMessageBus.md#eventnames)
- [getMaxListeners](DashboardMessageBus.md#getmaxlisteners)
- [invalidateMessage](DashboardMessageBus.md#invalidatemessage)
- [listenerCount](DashboardMessageBus.md#listenercount)
- [listeners](DashboardMessageBus.md#listeners)
- [logTo](DashboardMessageBus.md#logto)
- [logToAll](DashboardMessageBus.md#logtoall)
- [logToPublishers](DashboardMessageBus.md#logtopublishers)
- [logToSubscribers](DashboardMessageBus.md#logtosubscribers)
- [off](DashboardMessageBus.md#off)
- [on](DashboardMessageBus.md#on)
- [once](DashboardMessageBus.md#once)
- [prependListener](DashboardMessageBus.md#prependlistener)
- [prependOnceListener](DashboardMessageBus.md#prependoncelistener)
- [processRequest](DashboardMessageBus.md#processrequest)
- [rawListeners](DashboardMessageBus.md#rawlisteners)
- [ready](DashboardMessageBus.md#ready)
- [removeAllListeners](DashboardMessageBus.md#removealllisteners)
- [removeListener](DashboardMessageBus.md#removelistener)
- [removePublisher](DashboardMessageBus.md#removepublisher)
- [removeSubscriber](DashboardMessageBus.md#removesubscriber)
- [setMaxListeners](DashboardMessageBus.md#setmaxlisteners)
- [start](DashboardMessageBus.md#start)
- [terminate](DashboardMessageBus.md#terminate)
- [terminateIfNoConnections](DashboardMessageBus.md#terminateifnoconnections)
- [listenerCount](DashboardMessageBus.md#listenercount)
- [on](DashboardMessageBus.md#on)
- [once](DashboardMessageBus.md#once)

## Constructors

### constructor

• **new DashboardMessageBus**(`publishPort`, `subscribePort`, `host?`)

#### Parameters

| Name            | Type     | Default value |
| :-------------- | :------- | :------------ |
| `publishPort`   | `number` | `undefined`   |
| `subscribePort` | `number` | `undefined`   |
| `host`          | `string` | `'localhost'` |

#### Overrides

EventEmitter.constructor

#### Defined in

[lib/DashboardMessageBus.ts:27](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L27)

## Properties

### host

• **host**: `string` = `'localhost'`

---

### publishPort

• **publishPort**: `number`

---

### publishServer

• `Private` **publishServer**: `Server`

#### Defined in

[lib/DashboardMessageBus.ts:20](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L20)

---

### publishers

• `Private` **publishers**: `WebSocket`[] = `[]`

#### Defined in

[lib/DashboardMessageBus.ts:22](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L22)

---

### subscribePort

• **subscribePort**: `number`

---

### subscribeServer

• `Private` **subscribeServer**: `Server`

#### Defined in

[lib/DashboardMessageBus.ts:21](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L21)

---

### subscribers

• `Private` **subscribers**: `WebSocket`[] = `[]`

#### Defined in

[lib/DashboardMessageBus.ts:23](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L23)

---

### unfulfilledRequests

• `Private` **unfulfilledRequests**: `Map`<`string`, `UnfulfilledRequest`\>

#### Defined in

[lib/DashboardMessageBus.ts:25](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L25)

---

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof
[`captureRejectionSymbol`](DashboardMessageBus.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:30

---

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:36

---

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:37

---

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof
[`errorMonitor`](DashboardMessageBus.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no regular
`'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:29

## Methods

### addListener

▸ **addListener**(`event`, `listener`):
[`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/globals.d.ts:730

---

### addPublisher

▸ `Private` **addPublisher**(`newPublisher`): `void`

Add a publisher and set up message listeners to process their requests

#### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `newPublisher` | `WebSocket` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:199](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L199)

---

### addSubscriber

▸ `Private` **addSubscriber**(`newSubscriber`): `void`

Add a publisher so it can be used to send requests to

**`dev`** Also sends all backlogged (unfulfilled) requests upon connection

#### Parameters

| Name            | Type        |
| :-------------- | :---------- |
| `newSubscriber` | `WebSocket` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:172](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L172)

---

### clearRequestsForPublisher

▸ `Private` **clearRequestsForPublisher**(`publisher`): `void`

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `publisher` | `WebSocket` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:230](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L230)

---

### emit

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `event`   | `string` \| `symbol` |
| `...args` | `any`[]              |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/globals.d.ts:740

---

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/globals.d.ts:745

---

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:737

---

### invalidateMessage

▸ `Private` **invalidateMessage**(`id`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `number` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:136](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L136)

---

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/globals.d.ts:741

---

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/globals.d.ts:738

---

### logTo

▸ `Private` **logTo**(`logMessage`, `receivers`, `namespace?`): `void`

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `logMessage` | `any`         |
| `receivers`  | `WebSocket`[] |
| `namespace?` | `string`      |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:154](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L154)

---

### logToAll

▸ `Private` **logToAll**(`logMessage`, `namespace?`): `void`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `logMessage` | `any`    |
| `namespace?` | `string` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:149](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L149)

---

### logToPublishers

▸ `Private` **logToPublishers**(`logMessage`, `namespace?`): `void`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `logMessage` | `any`    |
| `namespace?` | `string` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:141](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L141)

---

### logToSubscribers

▸ `Private` **logToSubscribers**(`logMessage`, `namespace?`): `void`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `logMessage` | `any`    |
| `namespace?` | `string` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:145](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L145)

---

### off

▸ **off**(`event`, `listener`): [`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/globals.d.ts:734

---

### on

▸ **on**(`event`, `listener`): [`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/globals.d.ts:731

---

### once

▸ **once**(`event`, `listener`): [`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/globals.d.ts:732

---

### prependListener

▸ **prependListener**(`event`, `listener`):
[`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/globals.d.ts:743

---

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`):
[`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/globals.d.ts:744

---

### processRequest

▸ `Private` **processRequest**(`publisher`, `data`, `subscribers`):
`Promise`<`void`\>

Process a message `data` coming from `publisher` by sending it to `subscribers`
and return the first received response to the `publisher`

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `publisher`   | `WebSocket`   |
| `data`        | `Data`        |
| `subscribers` | `WebSocket`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/DashboardMessageBus.ts:92](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L92)

---

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name    | Type                 |
| :------ | :------------------- |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/globals.d.ts:739

---

### ready

▸ **ready**(): `Promise`<`void`\>

Wait for the message bus to be "ready" to process requests (i.e. having any
subscribers).

**`dev`** Polls every second to see if the number of subscribers > 0

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/DashboardMessageBus.ts:72](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L72)

---

### removeAllListeners

▸ **removeAllListeners**(`event?`):
[`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `event?` | `string` \| `symbol` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/globals.d.ts:735

---

### removeListener

▸ **removeListener**(`event`, `listener`):
[`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `event`    | `string` \| `symbol`           |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/globals.d.ts:733

---

### removePublisher

▸ `Private` **removePublisher**(`publisherToRemove`): `void`

Remove a publisher and their corresponding requests

**`dev`** Will cause the server to terminate if this was the last connection

#### Parameters

| Name                | Type        |
| :------------------ | :---------- |
| `publisherToRemove` | `WebSocket` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:213](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L213)

---

### removeSubscriber

▸ `Private` **removeSubscriber**(`subscriberToRemove`): `void`

Remove a subscriber

**`dev`** Will cause the server to terminate if this was the last connection

#### Parameters

| Name                 | Type        |
| :------------------- | :---------- |
| `subscriberToRemove` | `WebSocket` |

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:186](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L186)

---

### setMaxListeners

▸ **setMaxListeners**(`n`): [`DashboardMessageBus`](DashboardMessageBus.md)

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

[`DashboardMessageBus`](DashboardMessageBus.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:736

---

### start

▸ **start**(): `Promise`<`void`\>

Start the DashboardMessageBus

**`dev`** This starts separate websocket servers for subscribers/publishers

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/DashboardMessageBus.ts:39](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L39)

---

### terminate

▸ **terminate**(): `Promise`<`void`\>

Close both websocket servers

**`dev`** Emits a "terminate" event

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/DashboardMessageBus.ts:82](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L82)

---

### terminateIfNoConnections

▸ `Private` **terminateIfNoConnections**(): `void`

#### Returns

`void`

#### Defined in

[lib/DashboardMessageBus.ts:224](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/DashboardMessageBus.ts#L224)

---

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `event`): `number`

**`deprecated`** since v4.0.0

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `emitter` | `EventEmitter`       |
| `event`   | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:18

---

### on

▸ `Static` **on**(`emitter`, `event`): `AsyncIterableIterator`<`any`\>

#### Parameters

| Name      | Type           |
| :-------- | :------------- |
| `emitter` | `EventEmitter` |
| `event`   | `string`       |

#### Returns

`AsyncIterableIterator`<`any`\>

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:15

---

### once

▸ `Static` **once**(`emitter`, `event`): `Promise`<`any`[]\>

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `emitter` | `NodeEventTarget`    |
| `event`   | `string` \| `symbol` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:13

▸ `Static` **once**(`emitter`, `event`): `Promise`<`any`[]\>

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `emitter` | `DOMEventTarget` |
| `event`   | `string`         |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:14
