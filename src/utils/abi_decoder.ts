/* Sourced from 0x.js */

import { BigNumber } from '@0x/utils';
import { AbiDefinition, EventAbi, EventParameter, LogEntry } from 'ethereum-types';
import { AbiCoder, keccak256 } from 'ethers/utils';
import * as _ from 'lodash';

import { AbiType, ContractEventArgs, DecodedLogArgs, LogWithDecodedArgs, RawLog, SolidityTypes } from '../types';

export class AbiDecoder {
    private _abiCoder = new AbiCoder();
    private _savedABIs: AbiDefinition[] = [];
    private _methodIds: { [signatureHash: string]: EventAbi } = {};
    private static _padZeros(address: string) {
        let formatted = address;
        if (_.startsWith(formatted, '0x')) {
            formatted = formatted.slice(2);
        }

        formatted = _.padStart(formatted, 40, '0');
        return `0x${formatted}`;
    }
    constructor(abiArrays: AbiDefinition[][]) {
        _.map(abiArrays, this._addABI.bind(this));
    }
    // This method can only decode logs from the 0x & ERC20 smart contracts
    public tryToDecodeLogOrNoop<ArgsType extends ContractEventArgs>(
        log: LogEntry,
    ): LogWithDecodedArgs<ArgsType> | RawLog {
        const methodId = log.topics[0];
        const event = this._methodIds[methodId];
        if (_.isUndefined(event)) {
            return log;
        }
        const logData = log.data;
        const decodedParams: DecodedLogArgs = {};
        let dataIndex = 0;
        let topicsIndex = 1;

        const nonIndexedInputs = _.filter(event.inputs, input => !input.indexed);
        const dataTypes = _.map(nonIndexedInputs, input => input.type);
        const decodedData = this._abiCoder.decode(dataTypes, logData.slice('0x'.length));

        _.map(event.inputs, (param: EventParameter) => {
            // Indexed parameters are stored in topics. Non-indexed ones in decodedData
            let value = param.indexed ? log.topics[topicsIndex++] : decodedData[dataIndex++];
            if (param.type === SolidityTypes.Address) {
                value = AbiDecoder._padZeros(new BigNumber(value).toString(16));
            } else if (
                param.type === SolidityTypes.Uint256 ||
                param.type === SolidityTypes.Uint8 ||
                param.type === SolidityTypes.Uint
            ) {
                value = new BigNumber(value);
            }
            decodedParams[param.name] = value;
        });

        return {
            ...log,
            event: event.name,
            // @ts-expect-error TODO: Fix if needed, but insignificant
            args: decodedParams,
        };
    }
    private _addABI(abiArray: AbiDefinition[]): void {
        _.map(abiArray, (abi: AbiDefinition) => {
            if (abi.type === AbiType.Event) {
                const eventAbi = abi as EventAbi;
                const signature = `${eventAbi.name}(${_.map(eventAbi.inputs, input => input.type).join(',')})`;
                const signatureHash = keccak256(signature);
                this._methodIds[signatureHash] = eventAbi;
            }
        });
        this._savedABIs = this._savedABIs.concat(abiArray);
    }
}
