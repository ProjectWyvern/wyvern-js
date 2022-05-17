import { AbiDefinition, LogEntry } from 'ethereum-types';
import { ContractEventArgs, LogWithDecodedArgs, RawLog } from '../types';
export declare class AbiDecoder {
    private _abiCoder;
    private _savedABIs;
    private _methodIds;
    private static _padZeros;
    constructor(abiArrays: AbiDefinition[][]);
    tryToDecodeLogOrNoop<ArgsType extends ContractEventArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    private _addABI;
}
