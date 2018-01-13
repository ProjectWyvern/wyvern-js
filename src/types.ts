import * as Web3 from 'web3';
import { TransactionReceipt } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';

export interface WyvernExchangeConfig {
    networkId: number;
    gasPrice?: BigNumber;
    wyvernExchangeContractAddress?: string;
    wyvernRegistryContractAddress?: string;
}

export type Web3Provider = Web3.Provider;
