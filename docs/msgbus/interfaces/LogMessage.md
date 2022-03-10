[@securerpc/msgbus](../README.md) / [Exports](../modules.md) / LogMessage

# Interface: LogMessage

Message intended to log messages across the message bus. The message payload
includes a "debug" namespace as well as a message. This is an internal message
type that is not intended to be used by publishers or subscribers.

## Hierarchy

- [`Message`](Message.md)

  ↳ **`LogMessage`**

## Table of contents

### Properties

- [id](LogMessage.md#id)
- [payload](LogMessage.md#payload)
- [type](LogMessage.md#type)

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

| Name        | Type     |
| :---------- | :------- |
| `message`   | `any`    |
| `namespace` | `string` |

#### Overrides

[Message](Message.md).[payload](Message.md#payload)

#### Defined in

[lib/message/types.ts:28](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L28)

---

### type

• **type**: `"log"`

#### Overrides

[Message](Message.md).[type](Message.md#type)

#### Defined in

[lib/message/types.ts:27](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L27)
