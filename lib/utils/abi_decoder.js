"use strict";
/* Sourced from 0x.js */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiDecoder = void 0;
var utils_1 = require("@0x/utils");
var _ = require("lodash");
var web3_1 = require("web3");
var SolidityCoder = require("web3/lib/solidity/coder");
var types_1 = require("../types");
var AbiDecoder = /** @class */ (function () {
    function AbiDecoder(abiArrays) {
        this._savedABIs = [];
        this._methodIds = {};
        _.map(abiArrays, this._addABI.bind(this));
    }
    AbiDecoder._padZeros = function (address) {
        var formatted = address;
        if (_.startsWith(formatted, '0x')) {
            formatted = formatted.slice(2);
        }
        formatted = _.padStart(formatted, 40, '0');
        return "0x".concat(formatted);
    };
    // This method can only decode logs from the 0x & ERC20 smart contracts
    AbiDecoder.prototype.tryToDecodeLogOrNoop = function (log) {
        var methodId = log.topics[0];
        var event = this._methodIds[methodId];
        if (_.isUndefined(event)) {
            return log;
        }
        var logData = log.data;
        var decodedParams = {};
        var dataIndex = 0;
        var topicsIndex = 1;
        var nonIndexedInputs = _.filter(event.inputs, function (input) { return !input.indexed; });
        var dataTypes = _.map(nonIndexedInputs, function (input) { return input.type; });
        var decodedData = SolidityCoder.decodeParams(dataTypes, logData.slice('0x'.length));
        _.map(event.inputs, function (param) {
            // Indexed parameters are stored in topics. Non-indexed ones in decodedData
            var value = param.indexed ? log.topics[topicsIndex++] : decodedData[dataIndex++];
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
        return __assign(__assign({}, log), { event: event.name, 
            // @ts-expect-error TODO: Fix if needed, but insignificant
            args: decodedParams });
    };
    AbiDecoder.prototype._addABI = function (abiArray) {
        var _this = this;
        _.map(abiArray, function (abi) {
            if (abi.type === types_1.AbiType.Event) {
                var eventAbi = abi;
                var signature = "".concat(eventAbi.name, "(").concat(_.map(eventAbi.inputs, function (input) { return input.type; }).join(','), ")");
                var signatureHash = new web3_1.default().utils.sha3(signature);
                _this._methodIds[signatureHash] = eventAbi;
            }
        });
        this._savedABIs = this._savedABIs.concat(abiArray);
    };
    return AbiDecoder;
}());
exports.AbiDecoder = AbiDecoder;
//# sourceMappingURL=abi_decoder.js.map