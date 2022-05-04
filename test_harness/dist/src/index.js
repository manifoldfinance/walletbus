"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.providers.JsonRpcProvider('http://localhost:24012/rpc');
    const signer = provider.getSigner();
    console.log('eth_accounts');
    const [account] = yield provider.listAccounts();
    console.log(account);
    console.log('eth_sendTransaction');
    const transaction = {
        from: account,
        to: account,
        value: ethers_1.ethers.utils.parseEther('0.001'),
    };
    try {
        const result = yield signer.sendTransaction(transaction);
        console.log(result);
    }
    catch (err) {
        console.error(err);
    }
    console.log('eth_signTypedData');
    const msgParams = [
        {
            type: 'string',
            name: 'Message',
            value: 'Hi, Alice!', // The value to sign
        },
        {
            type: 'uint32',
            name: 'A number',
            value: '1337',
        },
    ];
    try {
        const result = yield provider.send('eth_signTypedData', [
            msgParams,
            account,
        ]);
        console.log(result);
    }
    catch (err) {
        console.error(err);
    }
    console.log('eth_signTypedData_v4');
    const { chainId = 4 } = yield provider.getNetwork();
    // Code taken from https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4
    const msgParams_v4 = JSON.stringify({
        domain: {
            // Defining the chain aka Rinkeby testnet or Ethereum Main Net
            chainId,
            // Give a user friendly name to the specific contract you are signing for.
            name: 'Ether Mail',
            // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            // Just let's you know the latest version. Definitely make sure the field name is correct.
            version: '1',
        },
        // Defining the message signing data content.
        message: {
            /*
             - Anything you want. Just a JSON Blob that encodes the data you want to send
             - No required fields
             - This is DApp Specific
             - Be as explicit as possible when building out the message schema.
            */
            contents: 'Hello, Bob!',
            attachedMoneyInEth: 4.2,
            from: {
                name: 'Cow',
                wallets: [
                    '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                    '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                ],
            },
            to: [
                {
                    name: 'Bob',
                    wallets: [
                        '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                        '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                        '0xB0B0b0b0b0b0B000000000000000000000000000',
                    ],
                },
            ],
        },
        // Refers to the keys of the *types* object below.
        primaryType: 'Mail',
        types: {
            // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            // Not an EIP712Domain definition
            Group: [
                { name: 'name', type: 'string' },
                { name: 'members', type: 'Person[]' },
            ],
            // Refer to PrimaryType
            Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person[]' },
                { name: 'contents', type: 'string' },
            ],
            // Not an EIP712Domain definition
            Person: [
                { name: 'name', type: 'string' },
                { name: 'wallets', type: 'address[]' },
            ],
        },
    });
    try {
        const result = yield provider.send('eth_signTypedData_v4', [
            account,
            msgParams_v4,
        ]);
        console.log(result);
    }
    catch (err) {
        console.error(err);
    }
});
run().catch(console.error);
//# sourceMappingURL=index.js.map