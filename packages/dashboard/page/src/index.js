
import MetaMaskOnboarding from '@metamask/onboarding';
// eslint-disable-next-line camelcase
import {
  encrypt,
  recoverPersonalSignature,
  recoverTypedSignatureLegacy,
  recoverTypedSignature,
  recoverTypedSignature_v4 as recoverTypedSignatureV4,
} from 'eth-sig-util';
import { ethers } from 'ethers';
import { toChecksumAddress } from 'ethereumjs-util';

let ethersProvider;

const currentUrl = new URL(window.location.href);
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined;

const { isMetaMaskInstalled } = MetaMaskOnboarding;



// Dapp Status Section
const networkDiv = document.getElementById('network');
const chainIdDiv = document.getElementById('chainId');
const accountsDiv = document.getElementById('accounts');
const warningDiv = document.getElementById('warning');

// Basic Actions Section
const onboardButton = document.getElementById('connectButton');
const getAccountsButton = document.getElementById('getAccounts');
const getAccountsResults = document.getElementById('getAccountsResult');

// Permissions Actions Section
const requestPermissionsButton = document.getElementById('requestPermissions');
const getPermissionsButton = document.getElementById('getPermissions');
const permissionsResult = document.getElementById('permissionsResult')


// Miscellaneous
const addEthereumChain = document.getElementById('addEthereumChain');
const switchEthereumChain = document.getElementById('switchEthereumChain');

let onboarding;
try {
  onboarding = new MetaMaskOnboarding({ forwarderOrigin });
} catch (error) {
  console.error(error);
}



const initialize = async () => {
  try {
    // We must specify the network as 'any' for ethers to allow network changes
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  } catch (error) {
    console.error(error);
  }

  let onboarding;
  try {
    onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }

  let accounts;
  let accountButtonsInitialized = false;

  const accountButtons = [
    deployButton,
    depositButton,
    withdrawButton,
    deployCollectiblesButton,
    mintButton,
    mintAmountInput,
    deployFailingButton,
    sendFailingButton,
    sendButton,
    createToken,
    watchAsset,
    transferTokens,
    approveTokens,
    transferTokensWithoutGas,
    approveTokensWithoutGas,
    getEncryptionKeyButton,
    encryptMessageInput,
    encryptButton,
    decryptButton,
    ethSign,
    personalSign,
    personalSignVerify,
    signTypedData,
    signTypedDataVerify,
    signTypedDataV3,
    signTypedDataV3Verify,
    signTypedDataV4,
    signTypedDataV4Verify,
  ];

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      handleNewAccounts(newAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  const clearTextDisplays = () => {
    encryptionKeyDisplay.innerText = '';
    encryptMessageInput.value = '';
    ciphertextDisplay.innerText = '';
    cleartextDisplay.innerText = '';
  };

  const updateButtons = () => {
    const accountButtonsDisabled =
      !isMetaMaskInstalled() || !isMetaMaskConnected();
    if (accountButtonsDisabled) {
      for (const button of accountButtons) {
        button.disabled = true;
      }
      clearTextDisplays();
    } else {
      deployButton.disabled = false;
      deployCollectiblesButton.disabled = false;
      sendButton.disabled = false;
      deployFailingButton.disabled = false;
      createToken.disabled = false;
      personalSign.disabled = false;
      signTypedData.disabled = false;
      getEncryptionKeyButton.disabled = false;
      ethSign.disabled = false;
      personalSign.disabled = false;
      signTypedData.disabled = false;
      signTypedDataV3.disabled = false;
      signTypedDataV4.disabled = false;
    }

    if (isMetaMaskInstalled()) {
      addEthereumChain.disabled = false;
      switchEthereumChain.disabled = false;
    } else {
      onboardButton.innerText = 'Click here to install MetaMask!';
      onboardButton.onclick = onClickInstall;
      onboardButton.disabled = false;
    }

    if (isMetaMaskConnected()) {
      onboardButton.innerText = 'Connected';
      onboardButton.disabled = true;
      if (onboarding) {
        onboarding.stopOnboarding();
      }
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  };



  addEthereumChain.onclick = async () => {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x64',
          rpcUrls: ['https://dai.poa.network'],
          chainName: 'xDAI Chain',
          nativeCurrency: { name: 'xDAI', decimals: 18, symbol: 'xDAI' },
          blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
        },
      ],
    });
  };

  switchEthereumChain.onclick = async () => {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x64',
        },
      ],
    });
  };

  const initializeAccountButtons = () => {
    if (accountButtonsInitialized) {
      return;
    }
    accountButtonsInitialized = true;
    /**
     * Permissions
     */

     requestPermissionsButton.onclick = async () => {
        try {
          const permissionsArray = await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          });
          permissionsResult.innerHTML =
            getPermissionsDisplayString(permissionsArray);
        } catch (err) {
          console.error(err);
          permissionsResult.innerHTML = `Error: ${err.message}`;
        }
      };
  
      getPermissionsButton.onclick = async () => {
        try {
          const permissionsArray = await ethereum.request({
            method: 'wallet_getPermissions',
          });
          permissionsResult.innerHTML =
            getPermissionsDisplayString(permissionsArray);
        } catch (err) {
          console.error(err);
          permissionsResult.innerHTML = `Error: ${err.message}`;
        }
      };
  
      getAccountsButton.onclick = async () => {
        try {
          const _accounts = await ethereum.request({
            method: 'eth_accounts',
          });
          getAccountsResults.innerHTML =
            _accounts[0] || 'Not able to get accounts';
        } catch (err) {
          console.error(err);
          getAccountsResults.innerHTML = `Error: ${err.message}`;
        }
      }
    };



      type.onchange = async () => {
        if (type.value === '0x0') {
          gasPriceDiv.style.display = 'block';
          maxFeeDiv.style.display = 'none';
          maxPriorityDiv.style.display = 'none';
        } else {
          gasPriceDiv.style.display = 'none';
          maxFeeDiv.style.display = 'block';
          maxPriorityDiv.style.display = 'block';
        }
      };

      submitFormButton.onclick = async () => {
        let params;
        if (type.value === '0x0') {
          params = [
            {
              from: accounts[0],
              to: toDiv.value,
              value: amount.value,
              gasPrice: gasPrice.value,
              type: type.value,
              data: data.value,
            },
          ];
        } else {
          params = [
            {
              from: accounts[0],
              to: toDiv.value,
              value: amount.value,
              maxFeePerGas: maxFee.value,
              maxPriorityFeePerGas: maxPriority.value,
              type: type.value,
              data: data.value,
            },
          ];
        }
        const result = await ethereum.request({
          method: 'eth_sendTransaction',
          params,
        });
        console.log(result);
      };
      
  function handleNewAccounts(newAccounts) {
    accounts = newAccounts;
    accountsDiv.innerHTML = accounts;
    fromDiv.value = accounts;
    gasPriceDiv.style.display = 'block';
    maxFeeDiv.style.display = 'none';
    maxPriorityDiv.style.display = 'none';
    if (isMetaMaskConnected()) {
      initializeAccountButtons();
    }
    updateButtons();
  }

  function handleNewChain(chainId) {
    chainIdDiv.innerHTML = chainId;

    if (chainId === '0x1') {
      warningDiv.classList.remove('warning-invisible');
    } else {
      warningDiv.classList.add('warning-invisible');
    }
  }

  updateButtons();

  if (isMetaMaskInstalled()) {
    ethereum.autoRefreshOnNetworkChange = false;
    getNetworkAndChainId();

    ethereum.autoRefreshOnNetworkChange = false;
    getNetworkAndChainId();

    ethereum.on('chainChanged', (chain) => {
      handleNewChain(chain);
      ethereum
        .request({
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
        })
        .then((block) => {
          handleEIP1559Support(block.baseFeePerGas !== undefined);
        });
    });
    ethereum.on('networkChanged', handleNewNetwork);
    ethereum.on('accountsChanged', (newAccounts) => {
      ethereum
        .request({
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
        })
        .then((block) => {
          handleEIP1559Support(block.baseFeePerGas !== undefined);
        });
      handleNewAccounts(newAccounts);
    });

    try {
      const newAccounts = await ethereum.request({
        method: 'eth_accounts',
      });
      handleNewAccounts(newAccounts);
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  }
}
window.addEventListener('DOMContentLoaded', initialize);

// utils

function getPermissionsDisplayString(permissionsArray) {
  if (permissionsArray.length === 0) {
    return 'No permissions found.';
  }
  const permissionNames = permissionsArray.map((perm) => perm.parentCapability);
  return permissionNames
    .reduce((acc, name) => `${acc}${name}, `, '')
    .replace(/, $/u, '');
}

// for priv key encrypt 
function stringifiableToHex(value) {
  return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
}