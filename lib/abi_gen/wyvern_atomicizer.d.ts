/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import * as Web3 from 'web3';
import { BaseContract } from './base_contract';
export declare class WyvernAtomicizerContract extends BaseContract {
    atomicize: {
        sendTransactionAsync(addrs_0: string[], values_1: BigNumber[], calldataLengths_2: BigNumber[], calldatas_3: string, txData?: TxData): Promise<string>;
        estimateGasAsync(addrs_0: string[], values_1: BigNumber[], calldataLengths_2: BigNumber[], calldatas_3: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(addrs_0: string[], values_1: BigNumber[], calldataLengths_2: BigNumber[], calldatas_3: string): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
}
