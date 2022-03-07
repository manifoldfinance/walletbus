require("@nomiclabs/hardhat-waffle");
require("@tenderly/hardhat-tenderly");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    "localhost": {
      url: "http://localhost:8545"
    },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc"
    }
  },
  namedAccounts: {
    deployer: {
      default: 0 // here this will by default take the first account as deployer
    }
  }
};
