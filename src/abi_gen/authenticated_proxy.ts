/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
// tslint:disable-next-line:no-unused-variable
import { TxData, TxDataPayable } from '@0xproject/types';
import { BigNumber, classUtils, promisify } from '@0xproject/utils';
import * as Web3 from 'web3';

import {BaseContract} from './base_contract';

export class AuthenticatedProxyContract extends BaseContract {
    public proxyType = {
        async callAsync(
            txData: TxData = {},
        ): Promise<BigNumber
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<BigNumber
    >(
                self.web3ContractInstance.proxyType.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public user = {
        async callAsync(
            txData: TxData = {},
        ): Promise<string
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.user.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public implementation = {
        async callAsync(
            txData: TxData = {},
        ): Promise<string
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.implementation.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public revoked = {
        async callAsync(
            txData: TxData = {},
        ): Promise<boolean
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<boolean
    >(
                self.web3ContractInstance.revoked.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public upgradeabilityOwner = {
        async callAsync(
            txData: TxData = {},
        ): Promise<string
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.upgradeabilityOwner.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public registry = {
        async callAsync(
            txData: TxData = {},
        ): Promise<string
    > {
            const self = this as AuthenticatedProxyContract;
            const result = await promisify<string
    >(
                self.web3ContractInstance.registry.call,
                self.web3ContractInstance,
            )(
                txData,
            );
            return result;
        },
    };
    public receiveApproval = {
        async sendTransactionAsync(
            from_0: string,
            value_1: BigNumber,
            token_2: string,
            extraData_3: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.receiveApproval.estimateGasAsync.bind(
                    self,
                    from_0,
                    value_1,
                    token_2,
                    extraData_3,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.receiveApproval, self.web3ContractInstance,
            )(
                from_0,
                value_1,
                token_2,
                extraData_3,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            from_0: string,
            value_1: BigNumber,
            token_2: string,
            extraData_3: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.receiveApproval.estimateGas, self.web3ContractInstance,
            )(
                from_0,
                value_1,
                token_2,
                extraData_3,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            from_0: string,
            value_1: BigNumber,
            token_2: string,
            extraData_3: string,
        ): string {
            const self = this as AuthenticatedProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.receiveApproval.getData(
                from_0,
                value_1,
                token_2,
                extraData_3,
            );
            return abiEncodedTransactionData;
        },
    };
    public initialize = {
        async sendTransactionAsync(
            addrUser_0: string,
            addrRegistry_1: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.initialize.estimateGasAsync.bind(
                    self,
                    addrUser_0,
                    addrRegistry_1,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.initialize, self.web3ContractInstance,
            )(
                addrUser_0,
                addrRegistry_1,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            addrUser_0: string,
            addrRegistry_1: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.initialize.estimateGas, self.web3ContractInstance,
            )(
                addrUser_0,
                addrRegistry_1,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            addrUser_0: string,
            addrRegistry_1: string,
        ): string {
            const self = this as AuthenticatedProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.initialize.getData(
                addrUser_0,
                addrRegistry_1,
            );
            return abiEncodedTransactionData;
        },
    };
    public setRevoke = {
        async sendTransactionAsync(
            revoke_0: boolean,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.setRevoke.estimateGasAsync.bind(
                    self,
                    revoke_0,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.setRevoke, self.web3ContractInstance,
            )(
                revoke_0,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            revoke_0: boolean,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.setRevoke.estimateGas, self.web3ContractInstance,
            )(
                revoke_0,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            revoke_0: boolean,
        ): string {
            const self = this as AuthenticatedProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.setRevoke.getData(
                revoke_0,
            );
            return abiEncodedTransactionData;
        },
    };
    public proxy = {
        async sendTransactionAsync(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.proxy.estimateGasAsync.bind(
                    self,
                    dest_0,
                    howToCall_1,
                    calldata_2,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.proxy, self.web3ContractInstance,
            )(
                dest_0,
                howToCall_1,
                calldata_2,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.proxy.estimateGas, self.web3ContractInstance,
            )(
                dest_0,
                howToCall_1,
                calldata_2,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
        ): string {
            const self = this as AuthenticatedProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.proxy.getData(
                dest_0,
                howToCall_1,
                calldata_2,
            );
            return abiEncodedTransactionData;
        },
    };
    public proxyAssert = {
        async sendTransactionAsync(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
            txData: TxData = {},
        ): Promise<string> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
                self.proxyAssert.estimateGasAsync.bind(
                    self,
                    dest_0,
                    howToCall_1,
                    calldata_2,
                ),
            );
            const txHash = await promisify<string>(
                self.web3ContractInstance.proxyAssert, self.web3ContractInstance,
            )(
                dest_0,
                howToCall_1,
                calldata_2,
                txDataWithDefaults,
            );
            return txHash;
        },
        async estimateGasAsync(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
            txData: TxData = {},
        ): Promise<number> {
            const self = this as AuthenticatedProxyContract;
            const txDataWithDefaults = await self.applyDefaultsToTxDataAsync(
                txData,
            );
            const gas = await promisify<number>(
                self.web3ContractInstance.proxyAssert.estimateGas, self.web3ContractInstance,
            )(
                dest_0,
                howToCall_1,
                calldata_2,
                txDataWithDefaults,
            );
            return gas;
        },
        getABIEncodedTransactionData(
            dest_0: string,
            howToCall_1: number|BigNumber,
            calldata_2: string,
        ): string {
            const self = this as AuthenticatedProxyContract;
            const abiEncodedTransactionData = self.web3ContractInstance.proxyAssert.getData(
                dest_0,
                howToCall_1,
                calldata_2,
            );
            return abiEncodedTransactionData;
        },
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>) {
        super(web3ContractInstance, defaults);
        classUtils.bindAll(this, ['web3ContractInstance', 'defaults']);
    }
} // tslint:disable:max-file-line-count
