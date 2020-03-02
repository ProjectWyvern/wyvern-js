"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Network;
(function (Network) {
    Network["Main"] = "main";
    Network["Rinkeby"] = "rinkeby";
})(Network = exports.Network || (exports.Network = {}));
var SaleKind;
(function (SaleKind) {
    SaleKind[SaleKind["FixedPrice"] = 0] = "FixedPrice";
    SaleKind[SaleKind["EnglishAuction"] = 1] = "EnglishAuction";
    SaleKind[SaleKind["DutchAuction"] = 2] = "DutchAuction";
})(SaleKind = exports.SaleKind || (exports.SaleKind = {}));
var HowToCall;
(function (HowToCall) {
    HowToCall[HowToCall["Call"] = 0] = "Call";
    HowToCall[HowToCall["DelegateCall"] = 1] = "DelegateCall";
    HowToCall[HowToCall["StaticCall"] = 2] = "StaticCall";
    HowToCall[HowToCall["Create"] = 3] = "Create";
})(HowToCall = exports.HowToCall || (exports.HowToCall = {}));
var AbiType;
(function (AbiType) {
    AbiType["Function"] = "function";
    AbiType["Constructor"] = "constructor";
    AbiType["Event"] = "event";
    AbiType["Fallback"] = "fallback";
})(AbiType = exports.AbiType || (exports.AbiType = {}));
var WyvernProtocolError;
(function (WyvernProtocolError) {
    WyvernProtocolError["InvalidSignature"] = "INVALID_SIGNATURE";
    WyvernProtocolError["TransactionMiningTimeout"] = "TRANSACTION_MINING_TIMEOUT";
    WyvernProtocolError["InvalidJump"] = "INVALID_JUMP";
    WyvernProtocolError["OutOfGas"] = "OUT_OF_GAS";
})(WyvernProtocolError = exports.WyvernProtocolError || (exports.WyvernProtocolError = {}));
var SolidityTypes;
(function (SolidityTypes) {
    SolidityTypes["Address"] = "address";
    SolidityTypes["Uint256"] = "uint256";
    SolidityTypes["Uint8"] = "uint8";
    SolidityTypes["Uint"] = "uint";
    SolidityTypes["Bytes"] = "bytes";
    SolidityTypes["String"] = "string";
})(SolidityTypes = exports.SolidityTypes || (exports.SolidityTypes = {}));
var StateMutability;
(function (StateMutability) {
    StateMutability["Pure"] = "pure";
    StateMutability["View"] = "view";
    StateMutability["Payable"] = "payable";
    StateMutability["Nonpayable"] = "nonpayable";
})(StateMutability = exports.StateMutability || (exports.StateMutability = {}));
var FunctionInputKind;
(function (FunctionInputKind) {
    FunctionInputKind["Replaceable"] = "replaceable";
    FunctionInputKind["Asset"] = "asset";
    FunctionInputKind["Owner"] = "owner";
    FunctionInputKind["Index"] = "index";
    FunctionInputKind["Count"] = "count";
    FunctionInputKind["Data"] = "data";
})(FunctionInputKind = exports.FunctionInputKind || (exports.FunctionInputKind = {}));
var FunctionOutputKind;
(function (FunctionOutputKind) {
    FunctionOutputKind["Owner"] = "owner";
    FunctionOutputKind["Asset"] = "asset";
    FunctionOutputKind["Count"] = "count";
    FunctionOutputKind["Other"] = "other";
})(FunctionOutputKind = exports.FunctionOutputKind || (exports.FunctionOutputKind = {}));
//# sourceMappingURL=types.js.map