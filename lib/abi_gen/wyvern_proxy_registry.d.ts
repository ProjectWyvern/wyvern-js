/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import * as Web3 from 'web3';
import { BaseContract } from './base_contract';
export declare class WyvernProxyRegistryContract extends BaseContract {
    name: {
        callAsync(txData?: TxData): Promise<string>;
    };
    initialAddressSet: {
        callAsync(txData?: TxData): Promise<boolean>;
    };
    endGrantAuthentication: {
        sendTransactionAsync(addr_0: string, txData?: TxData): Promise<string>;
        estimateGasAsync(addr_0: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(addr_0: string): string;
    };
    revokeAuthentication: {
        sendTransactionAsync(addr_0: string, txData?: TxData): Promise<string>;
        estimateGasAsync(addr_0: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(addr_0: string): string;
    };
    pending: {
        callAsync(index_0: string, txData?: TxData): Promise<BigNumber>;
    };
    contracts: {
        callAsync(index_0: string, txData?: TxData): Promise<boolean>;
    };
    renounceOwnership: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(): string;
    };
    owner: {
        callAsync(txData?: TxData): Promise<string>;
    };
    delegateProxyImplementation: {
        callAsync(txData?: TxData): Promise<string>;
    };
    proxies: {
        callAsync(index_0: string, txData?: TxData): Promise<string>;
    };
    startGrantAuthentication: {
        sendTransactionAsync(addr_0: string, txData?: TxData): Promise<string>;
        estimateGasAsync(addr_0: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(addr_0: string): string;
    };
    registerProxy: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(): string;
    };
    DELAY_PERIOD: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner_0: string, txData?: TxData): Promise<string>;
        estimateGasAsync(newOwner_0: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(newOwner_0: string): string;
    };
    grantInitialAuthentication: {
        sendTransactionAsync(authAddress_0: string, txData?: TxData): Promise<string>;
        estimateGasAsync(authAddress_0: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(authAddress_0: string): string;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
}
