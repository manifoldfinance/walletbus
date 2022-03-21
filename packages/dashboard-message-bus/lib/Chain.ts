import { Provider, extend } from '@remix-project/remix-simulator';
import type { Resources, SubscribableResources } from './Resources';
import { BN } from 'ethereumjs-util';
import crypto from 'crypto';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
import type Web3Type from 'web3';

type Web3Extended = Web3Type & { eth: (typeof Web3Type.prototype.eth) & {
  getHashFromTagBySimulator: (tag: number) => Promise<string>,
  getExecutionResultFromSimulator: (hash: string) => Promise<{
    returnValue: Buffer,
    gas: BN,
    gasUsed: BN,
    gasRefund: BN,
    gasPrice: BN,
    exceptionError: string
  }>
} };

export const EMPTY = '0x';

export class Chain {
  public web3: Web3Extended;

  constructor(private resources: Resources) {
    // FIXME - Hardfork
    const chain = new Provider({ fork: 'london' });
    chain.init();
    const web3 = new Web3(chain);
    extend(web3);

    this.web3 = web3;
  }

  public registerResources(subscribableResources: SubscribableResources) {
    subscribableResources['accounts'] = async () => {
      return await this.fetchAccounts();
    };
  }

  private async fetchAccounts(): Promise<string[]> {
    const accounts = await this.web3.eth.getAccounts();
    if (accounts?.length < 15) {
      // eth node should have 15 accounts to control
      await (new Promise(r => setTimeout(r, 250)));
      return await this.fetchAccounts();
    }
    if (!this.resources.account) {
      this.resources.account = accounts[0];
    }
    return accounts;
  }

  public async deployContract(from: string, bytecode: string, types: string[], params: string[]) {
    const paramsbytecode = this.web3.eth.abi.encodeParameters(types, params).slice(2);
    const tx = await this.sendTx({
      from: from,
      data: bytecode + paramsbytecode
    });
    return { address: tx.contractAddress, cost: tx.gasUsed, hash: tx.transactionHash };
  }

  public async call(from: string, contract: string, abi: Record<string, unknown>, types: string[], params: string[]) {
    const callInput = {
      from,
      to: contract,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: this.web3.eth.abi.encodeFunctionCall(abi as any, params)
    };
    const result = this.web3.eth.abi.decodeParameters(types, await this.web3.eth.call(callInput));
    const estimatedGas = await this.web3.eth.estimateGas(callInput);
    return { result, cost: estimatedGas, hash: '0x' + crypto.randomBytes(32).toString('hex') };
  }

  public async tx(from: string, contract: string, abi: Record<string, unknown>, types: string[], params: string[]) {
    const tx = await this.sendTx({
      from,
      to: contract,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: this.web3.eth.abi.encodeFunctionCall(abi as any, params)
    });
    const exec = await this.web3.eth.getExecutionResultFromSimulator(tx.transactionHash);
    const result = this.web3.eth.abi.decodeParameters(types, exec.returnValue.toString('hex'));
    return { result, cost: tx.gasUsed, hash: tx.transactionHash };
  }

  public async sendEth(from: string, to: string, amount: BN | number | string) {
    await this.sendTx({
      from,
      to,
      value: new BN(amount)
    });
  }

  public async sendTx(args: {
    from: string, to?: string, data?: string, value?: BN, timestamp?: number, gasLimit?: string
  }) {
    return await this.web3.eth.sendTransaction({
      data: EMPTY,
      gasLimit: '0x2dc6c0',
      timestamp: Date.now(),
      ...args
    });
  }
};
