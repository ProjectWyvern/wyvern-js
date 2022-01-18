"use strict";
/* Sourced from 0x.js */
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const utils_1 = require("@0x/utils");
const BN = require("bn.js");
const ethABI = require("ethereumjs-abi");
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const types_1 = require("../types");
exports.utils = {
    /**
     * Converts BigNumber instance to BN
     * The only reason we convert to BN is to remain compatible with `ethABI. soliditySHA3` that
     * expects values of Solidity type `uint` to be passed as type `BN`.
     * We do not use BN anywhere else in the codebase.
     */
    bigNumberToBN(value) {
        return new BN(value.toString(), 10);
    },
    consoleLog(message) {
        // tslint:disable-next-line: no-console
        console.log(message);
    },
    isParityNode(nodeVersion) {
        return _.includes(nodeVersion, 'Parity');
    },
    isTestRpc(nodeVersion) {
        return _.includes(nodeVersion, 'TestRPC');
    },
    spawnSwitchErr(name, value) {
        return new Error(`Unexpected switch value: ${value} encountered for ${name}`);
    },
    getAssetHashHex(assetHash, schema) {
        const concat = schema + ':' + assetHash;
        const hashBuf = ethABI.soliditySHA3(['string'], [concat]);
        return ethUtil.bufferToHex(hashBuf);
    },
    getOrderHashHex(order) {
        const orderParts = [
            { value: order.exchange, type: types_1.SolidityTypes.Address },
            { value: order.maker, type: types_1.SolidityTypes.Address },
            { value: order.taker, type: types_1.SolidityTypes.Address },
            { value: exports.utils.bigNumberToBN(order.makerRelayerFee), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.takerRelayerFee), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.makerProtocolFee), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.takerProtocolFee), type: types_1.SolidityTypes.Uint256 },
            { value: order.feeRecipient, type: types_1.SolidityTypes.Address },
            { value: order.feeMethod, type: types_1.SolidityTypes.Uint8 },
            { value: order.side, type: types_1.SolidityTypes.Uint8 },
            { value: order.saleKind, type: types_1.SolidityTypes.Uint8 },
            { value: order.target, type: types_1.SolidityTypes.Address },
            { value: order.howToCall, type: types_1.SolidityTypes.Uint8 },
            { value: new Buffer(order.calldata.slice(2), 'hex'), type: types_1.SolidityTypes.Bytes },
            { value: new Buffer(order.replacementPattern.slice(2), 'hex'), type: types_1.SolidityTypes.Bytes },
            { value: order.staticTarget, type: types_1.SolidityTypes.Address },
            { value: new Buffer(order.staticExtradata.slice(2), 'hex'), type: types_1.SolidityTypes.Bytes },
            { value: order.paymentToken, type: types_1.SolidityTypes.Address },
            { value: exports.utils.bigNumberToBN(order.basePrice), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.extra), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.listingTime), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.expirationTime), type: types_1.SolidityTypes.Uint256 },
            { value: exports.utils.bigNumberToBN(order.salt), type: types_1.SolidityTypes.Uint256 },
        ];
        const types = _.map(orderParts, o => o.type);
        const values = _.map(orderParts, o => o.value);
        const hash = ethABI.soliditySHA3(types, values);
        return ethUtil.bufferToHex(hash);
    },
    getCurrentUnixTimestampSec() {
        return new utils_1.BigNumber(Date.now() / 1000).integerValue();
    },
    getCurrentUnixTimestampMs() {
        return new utils_1.BigNumber(Date.now());
    },
};
//# sourceMappingURL=utils.js.map