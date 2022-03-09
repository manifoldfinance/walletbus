# [`@securerpc/local-provider`](#)

`@securerpc/local-provider` enables communication between command-line or
desktop applications and browser-based Ethereum wallets such as Metamask. One
important use case is that it allows you to use your Metamask wallet with smart
contract development tools such as Foundry or Hardhat.

> TODO **Note**: @securerpc/local-provider automatically starts and stops a
> @securerpc/dashboard instance. To have more control over this dashboard
> instance, please use the [`securerpc dashboard`] command and its associated
> RPC URL instead of the @securerpc/local-provider.

- [@securerpc/local-provider](#)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Ethers.js](#ethersjs)
    - [Web3.js](#web3js)
    - [Configuration options](#configuration-options)
  - [Logging](#logging)
  - [Development](#development)
    - [Automated testing](#automated-testing)
  - [License](#license)

## Installation

```
npm install @securerpc/local-provider
```

```
yarn add @securerpc/local-provider
```

## Usage

The dashboard-provider can be used in place where you would use any other web3
provider. See the examples below for using it with Ethers.js and Web3.js.

### Ethers.js

```js
const { DashboardProvider } = require('@securerpc/local-provider');
const { providers } = require('ethers');

const dashboardProvider = new DashboardProvider();
const ethersProvider = new providers.Web3Provider(dashboardProvider);

const [account] = await ethersProvider.listAccounts();
```

### Web3.js

```js
const { DashboardProvider } = require('@securerpc/local-provider');
const Web3 = require('web3');

const dashboardProvider = new DashboardProvider();
const web3 = new Web3(dashboardProvider);

const [account] = await web3.eth.getAccounts();
```

### Configuration options

The `DashboardProvider` constructor takes a config object with a number of
options.

```ts
export interface DashboardProviderOptions {
  /** Host of the Dashboard (default: localhost) */
  dashboardHost?: string;

  /** Port of the Dashboard (default: 24012) */
  dashboardPort?: number;

  /** Number of seconds before a dashboard-provider request times out (default: 120) */
  timeoutSeconds?: number;

  /** Boolean indicating whether the connection to the dashboard is kept alive between requests (default: false) */
  keepAlive?: boolean;

  /** Boolean indicating whether debug output should be logged (default: false) */
  verbose?: boolean;

  /** Boolean indicating whether the dashboard should automatically get opened in the default browser (default: true) */
  autoOpen?: boolean;
}
```

## Logging

When setting the dashboard-provider's `verbose` option to `true`, debug output
is logged in the following "debug" namespaces

- `msgbus:connections` - logs connections and disconnections of message bus
  publishers and subscribers
- `msgbus:requests` - logs requests that get sent from publishers to subscribers
- `msgbus:responses` - logs responses sent back from subscribers to publishers
- `msgbus:errors` - logs errors that occur in the message bus

## Development

The entire dashboard/local-provider stack consists of three separate packages:

- `@securerpc/local-provider` contains the actual `Provider` interface that
  forwards requests to the dashboard.
- `@securerpc/dashboard` package contains a React app that receives incoming
  requests, displays them to the user, and then forwards them to the browser's
  injected web3 wallet.

- `@securerpc/msgbus` ties the two packages together with a message bus that
  relays requests and responses between the local-provider and the dashboard,
  using multiple WebSocket connections.

### Automated testing

`test/` contains a few very simple tests that test basic functioning of the
DashboardProvider + Message Bus + Dashboard infrastructure. It uses a mocked
"dashboard" that rather than opening a browser window just forwards all requests
to Ganache.

## License

[MIT Licensed](./LICENSE.md)
