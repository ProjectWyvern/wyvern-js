import * as Web3 from 'web3';
import { ContractEventArgs, LogWithDecodedArgs, RawLog } from '../types';
export declare class AbiDecoder {
    private _savedABIs;
    private _methodIds;
    private static _padZeros(address);
    constructor(abiArrays: Web3.AbiDefinition[][]);
    tryToDecodeLogOrNoop<ArgsType extends ContractEventArgs>(log: Web3.LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    private _addABI(abiArray);
}
