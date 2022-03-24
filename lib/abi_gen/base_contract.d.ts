import { TxData, TxDataPayable } from '@0xproject/types';
import Web3 from 'web3';
export declare class BaseContract {
  protected web3ContractInstance: Web3.ContractInstance;
  protected defaults: Partial<TxData>;
  protected applyDefaultsToTxDataAsync<T extends TxData | TxDataPayable>(
    txData: T,
    estimateGasAsync?: (txData: T) => Promise<number>
  ): Promise<TxData>;
  constructor(
    web3ContractInstance: Web3.ContractInstance,
    defaults: Partial<TxData>
  );
}
