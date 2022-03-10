[@securerpc/msgbus](../README.md) / [Exports](../modules.md) /
DashboardProviderMessage

# Interface: DashboardProviderMessage

Message intended to be passed on to the injected provider of a dashboard
instance. The message payload is an RPC request that should be forwarded.

## Hierarchy

- [`Message`](Message.md)

  ↳ **`DashboardProviderMessage`**

## Table of contents

### Properties

- [id](DashboardProviderMessage.md#id)
- [payload](DashboardProviderMessage.md#payload)
- [type](DashboardProviderMessage.md#type)

## Properties

### id

• **id**: `number`

#### Inherited from

[Message](Message.md).[id](Message.md#id)

#### Defined in

[lib/message/types.ts:2](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L2)

---

### payload

• **payload**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `id`      | `number` |
| `jsonrpc` | `"2.0"`  |
| `method`  | `string` |
| `params`  | `any`[]  |

#### Overrides

[Message](Message.md).[payload](Message.md#payload)

#### Defined in

[lib/message/types.ts:13](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L13)

---

### type

• **type**: `"provider"`

#### Overrides

[Message](Message.md).[type](Message.md#type)

#### Defined in

[lib/message/types.ts:12](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L12)
