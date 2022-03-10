[@securerpc/msgbus](../README.md) / [Exports](../modules.md) / InvalidateMessage

# Interface: InvalidateMessage

Message intended to invalidate earlier messages. The payload is the ID of the
message that should be invalidated. This is an internal message type that is not
intended to be used by publishers or subscribers.

## Hierarchy

- [`Message`](Message.md)

  ↳ **`InvalidateMessage`**

## Table of contents

### Properties

- [id](InvalidateMessage.md#id)
- [payload](InvalidateMessage.md#payload)
- [type](InvalidateMessage.md#type)

## Properties

### id

• **id**: `number`

#### Inherited from

[Message](Message.md).[id](Message.md#id)

#### Defined in

[lib/message/types.ts:2](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L2)

---

### payload

• **payload**: `number`

#### Overrides

[Message](Message.md).[payload](Message.md#payload)

#### Defined in

[lib/message/types.ts:41](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L41)

---

### type

• **type**: `"invalidate"`

#### Overrides

[Message](Message.md).[type](Message.md#type)

#### Defined in

[lib/message/types.ts:40](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-message-bus/lib/message/types.ts#L40)
