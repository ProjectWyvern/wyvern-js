/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import * as Web3 from 'web3';
import { BaseContract } from './base_contract';
export declare class AuthenticatedProxyContract extends BaseContract {
    proxyType: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    user: {
        callAsync(txData?: TxData): Promise<string>;
    };
    implementation: {
        callAsync(txData?: TxData): Promise<string>;
    };
    revoked: {
        callAsync(txData?: TxData): Promise<boolean>;
    };
    upgradeabilityOwner: {
        callAsync(txData?: TxData): Promise<string>;
    };
    registry: {
        callAsync(txData?: TxData): Promise<string>;
    };
    receiveApproval: {
        sendTransactionAsync(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string, txData?: TxData): Promise<string>;
        estimateGasAsync(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string): string;
    };
    initialize: {
        sendTransactionAsync(addrUser_0: string, addrRegistry_1: string, txData?: TxData): Promise<string>;
        estimateGasAsync(addrUser_0: string, addrRegistry_1: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(addrUser_0: string, addrRegistry_1: string): string;
    };
    setRevoke: {
        sendTransactionAsync(revoke_0: boolean, txData?: TxData): Promise<string>;
        estimateGasAsync(revoke_0: boolean, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(revoke_0: boolean): string;
    };
    proxy: {
        sendTransactionAsync(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string, txData?: TxData): Promise<string>;
        estimateGasAsync(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string): string;
    };
    proxyAssert: {
        sendTransactionAsync(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string, txData?: TxData): Promise<string>;
        estimateGasAsync(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(dest_0: string, howToCall_1: number | BigNumber, calldata_2: string): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
}
