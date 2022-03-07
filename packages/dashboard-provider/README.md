# @truffle/dashboard-provider

@truffle/dashboard-provider enables communication between command-line or desktop applications and browser-based Ethereum wallets such as Metamask. One important use case is that it allows you to use your Metamask wallet with smart contract development tools such as Truffle.

**Note**: @truffle/dashboard-provider automatically starts and stops a @truffle/dashboard instance. To have more control over this dashboard instance, please use the `truffle dashboard` command and its associated RPC URL instead of the @truffle/dashboard-provider.

## Installation

```
npm install @truffle/dashboard-provider
```

```
yarn add @truffle/dashboard-provider
```

## Usage

The dashboard-provider can be used in place where you would use any other web3 provider. See the examples below for using it with Ethers.js and Web3.js.

### Ethers.js

```js
const { DashboardProvider } = require("@truffle/dashboard-provider");
const { providers } = require("ethers");

const dashboardProvider = new DashboardProvider();
const ethersProvider = new providers.Web3Provider(dashboardProvider);

const [account] = await ethersProvider.listAccounts();
```

### Web3.js

```js
const { DashboardProvider } = require("@truffle/dashboard-provider");
const Web3 = require("web3");

const dashboardProvider = new DashboardProvider();
const web3 = new Web3(dashboardProvider);

const [account] = await web3.eth.getAccounts();
```

### Configuration options

The `DashboardProvider` constructor takes a config object with a number of options.

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

When setting the dashboard-provider's `verbose` option to `true`, debug output is logged in the following "debug" namespaces

- `dashboard-message-bus:connections` - logs connections and disconnections of message bus publishers and subscribers
- `dashboard-message-bus:requests` - logs requests that get sent from publishers to subscribers
- `dashboard-message-bus:responses` - logs responses sent back from subscribers to publishers
- `dashboard-message-bus:errors` - logs errors that occur in the message bus

## Development

The entire dashboard-provider stack consists of three separate packages within the `trufflesuite/truffle` repository. `@truffle/dashboard-provider` contains the actual `Provider` interface that forwards requests to the dashboard. The `@truffle/dashboard` package contains a React app that receives incoming requests, displays them to the user, and then forwards them to the browser's injected web3 wallet. Finally `@truffle/dashboard-message-bus` ties the two packages together with a message bus that relays requests and responses between the dashboard-provider and the dashboard, using multiple WebSocket connections.

Refer to the READMEs of the other packages for more information on those components.

### Automated testing

`test/` contains a few very simple tests that test basic functioning of the DashboardProvider + Message Bus + Dashboard infrastructure. It uses a mocked "dashboard" that rather than opening a browser window just forwards all requests to Ganache.

### Manual testing

`manual-test/` contains some more "real-world" usage of the DashboardProvider as well as the `truffle dashboard` command. The `manual-test.ts` script contains some requests to the DashboardProvider, including `eth_sendTransaction` and `eth_signTypedData_v4`. `metacoin-truffle/` contains the source code for a simple MetaCoin project using Truffle. `metacoin-hardhat/` contains the same contract source code but using Hardhat.

To run these manual tests use the following commands:

```
yarn test:manual:basic
yarn test:manual:metacoin-truffle
yarn test:manual:metacoin-hardhat
```
