# `@securerpc/msgbus`

> `@securerpc/msgbus` manages the communication between the Truffle Dashboard and any other Truffle components, such as @securerpc/local-provider.

- [@securerpc/msgbus](#--securerpc-msgbus-)
  * [Development](#development)
    + [Architecture](#architecture)
    + [Adding new message types](#adding-new-message-types)




## Development

```
npm install @securerpc/msgbus
```

```
yarn add @securerpc/msgbus
```

A new message bus can be started by instantiating a new `DashboardMessageBus`
and calling the `start()` function on it. This should almost always be done in
combination with starting a new dashboard, so you probably don't want to do this
directly. Instead you should start a new dashboard, which automatically starts
its corresponding message bus.

The `@securerpc/msgbus` does contain a bunch of exported utilities used for
connecting and communicating with the message bus that can be used directly by
other packages, although this should still only be used when developing new
packages that interface with the dashboard, rather than end-user applications.

### Architecture

The message bus works by running two separate WebSocket servers. One server is
for publishers to connect to and send requests, while the other server is for
subscribers (dashboards) to connect to and receive requests. The subscribers
respond to these requests by sending a message to the message bus with an ID
that corresponds to the request. Any requests from publishers are sent to all
subscribers, but only the first response will be returned to the publisher. When
new subscribers connect, any "unfulfilled" requests will be sent to the newly
connected subscribers as well. The message bus stays running as long as there is
at least one publisher _or_ subscriber connected. As soon as the last one
disconnects, the message bus shuts down.

### Adding new message types

Right now there are very few message types. The most important one is
`"provider"`, which sends RPC requests for the dashboard-provider. Other message
types are `"invalidate"`, which can be sent to invalidate earlier messages, and
`"log"`, which is sent by the message bus to send log messages over the wire.
The interfaces of these messages are defined inside the `@securerpc/msgbus`
package, from where they can be imported by consumers.

To add additional message types, the interface for the new message type should
be defined in this package under `lib/message/types.ts`. To use these new messge
formats, support needs to be added to any consuming packages such as
`@securerpc/dashboard` as well.

## License

MIT
