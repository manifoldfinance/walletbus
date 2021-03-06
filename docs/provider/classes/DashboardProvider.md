[@securerpc/local-provider](../README.md) / [Exports](../modules.md) /
DashboardProvider

# Class: DashboardProvider

## Table of contents

### Constructors

- [constructor](DashboardProvider.md#constructor)

### Properties

- [autoOpen](DashboardProvider.md#autoopen)
- [concurrentRequests](DashboardProvider.md#concurrentrequests)
- [connecting](DashboardProvider.md#connecting)
- [dashboardHost](DashboardProvider.md#dashboardhost)
- [dashboardPort](DashboardProvider.md#dashboardport)
- [keepAlive](DashboardProvider.md#keepalive)
- [socket](DashboardProvider.md#socket)
- [timeoutSeconds](DashboardProvider.md#timeoutseconds)
- [verbose](DashboardProvider.md#verbose)

### Methods

- [ready](DashboardProvider.md#ready)
- [send](DashboardProvider.md#send)
- [sendAsync](DashboardProvider.md#sendasync)
- [sendInternal](DashboardProvider.md#sendinternal)
- [setupLogging](DashboardProvider.md#setuplogging)
- [shouldTerminate](DashboardProvider.md#shouldterminate)
- [terminate](DashboardProvider.md#terminate)

## Constructors

### constructor

• **new DashboardProvider**(`options?`)

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | [`DashboardProviderOptions`](../interfaces/DashboardProviderOptions.md) |

#### Defined in

[DashboardProvider.ts:54](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L54)

## Properties

### autoOpen

• **autoOpen**: `boolean`

#### Defined in

[DashboardProvider.ts:46](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L46)

---

### concurrentRequests

• `Private` **concurrentRequests**: `number` = `0`

#### Defined in

[DashboardProvider.ts:50](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L50)

---

### connecting

• `Private` **connecting**: `boolean` = `false`

#### Defined in

[DashboardProvider.ts:51](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L51)

---

### dashboardHost

• **dashboardHost**: `string`

#### Defined in

[DashboardProvider.ts:43](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L43)

---

### dashboardPort

• **dashboardPort**: `number`

#### Defined in

[DashboardProvider.ts:44](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L44)

---

### keepAlive

• **keepAlive**: `boolean`

#### Defined in

[DashboardProvider.ts:45](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L45)

---

### socket

• `Private` **socket**: `WebSocket`

#### Defined in

[DashboardProvider.ts:48](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L48)

---

### timeoutSeconds

• `Private` **timeoutSeconds**: `number`

#### Defined in

[DashboardProvider.ts:49](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L49)

---

### verbose

• `Private` **verbose**: `boolean`

#### Defined in

[DashboardProvider.ts:52](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L52)

## Methods

### ready

▸ `Private` **ready**(): `any`

#### Returns

`any`

#### Defined in

[DashboardProvider.ts:127](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L127)

---

### send

▸ **send**(`payload`, `callback`): `void`

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `payload`  | `JSONRPCRequestPayload` |
| `callback` | `JSONRPCErrorCallback`  |

#### Returns

`void`

#### Defined in

[DashboardProvider.ts:77](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L77)

---

### sendAsync

▸ **sendAsync**(`payload`, `callback`): `void`

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `payload`  | `JSONRPCRequestPayload` |
| `callback` | `JSONRPCErrorCallback`  |

#### Returns

`void`

#### Defined in

[DashboardProvider.ts:83](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L83)

---

### sendInternal

▸ `Private` **sendInternal**(`payload`): `Promise`<`JSONRPCResponsePayload`\>

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `payload` | `JSONRPCRequestPayload` |

#### Returns

`Promise`<`JSONRPCResponsePayload`\>

#### Defined in

[DashboardProvider.ts:94](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L94)

---

### setupLogging

▸ **setupLogging**(): `void`

#### Returns

`void`

#### Defined in

[DashboardProvider.ts:155](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L155)

---

### shouldTerminate

▸ `Private` **shouldTerminate**(): `boolean`

#### Returns

`boolean`

#### Defined in

[DashboardProvider.ts:121](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L121)

---

### terminate

▸ **terminate**(): `void`

#### Returns

`void`

#### Defined in

[DashboardProvider.ts:90](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L90)
