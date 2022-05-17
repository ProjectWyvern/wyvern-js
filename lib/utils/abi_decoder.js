"use strict";
/* Sourced from 0x.js */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiDecoder = void 0;
const utils_1 = require("@0x/utils");
const utils_2 = require("ethers/utils");
const _ = require("lodash");
const types_1 = require("../types");
class AbiDecoder {
    constructor(abiArrays) {
        this._abiCoder = new utils_2.AbiCoder();
        this._savedABIs = [];
        this._methodIds = {};
        _.map(abiArrays, this._addABI.bind(this));
    }
    static _padZeros(address) {
        let formatted = address;
        if (_.startsWith(formatted, '0x')) {
            formatted = formatted.slice(2);
        }
        formatted = _.padStart(formatted, 40, '0');
        return `0x${formatted}`;
    }
    // This method can only decode logs from the 0x & ERC20 smart contracts
    tryToDecodeLogOrNoop(log) {
        const methodId = log.topics[0];
        const event = this._methodIds[methodId];
        if (_.isUndefined(event)) {
            return log;
        }
        const logData = log.data;
        const decodedParams = {};
        let dataIndex = 0;
        let topicsIndex = 1;
        const nonIndexedInputs = _.filter(event.inputs, input => !input.indexed);
        const dataTypes = _.map(nonIndexedInputs, input => input.type);
        const decodedData = this._abiCoder.decode(dataTypes, logData.slice('0x'.length));
        _.map(event.inputs, (param) => {
            // Indexed parameters are stored in topics. Non-indexed ones in decodedData
            let value = param.indexed ? log.topics[topicsIndex++] : decodedData[dataIndex++];
            if (param.type === types_1.SolidityTypes.Address) {
                value = AbiDecoder._padZeros(new utils_1.BigNumber(value).toString(16));
            }
            else if (param.type === types_1.SolidityTypes.Uint256 ||
                param.type === types_1.SolidityTypes.Uint8 ||
                param.type === types_1.SolidityTypes.Uint) {
                value = new utils_1.BigNumber(value);
            }
            decodedParams[param.name] = value;
        });
        return Object.assign(Object.assign({}, log), { event: event.name, 
            // @ts-expect-error TODO: Fix if needed, but insignificant
            args: decodedParams });
    }
    _addABI(abiArray) {
        _.map(abiArray, (abi) => {
            if (abi.type === types_1.AbiType.Event) {
                const eventAbi = abi;
                const signature = `${eventAbi.name}(${_.map(eventAbi.inputs, input => input.type).join(',')})`;
                const signatureHash = (0, utils_2.keccak256)(signature);
                this._methodIds[signatureHash] = eventAbi;
            }
        });
        this._savedABIs = this._savedABIs.concat(abiArray);
    }
}
exports.AbiDecoder = AbiDecoder;
//# sourceMappingURL=abi_decoder.js.map