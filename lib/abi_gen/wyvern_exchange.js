"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
var base_contract_1 = require("./base_contract");
var WyvernExchangeContract = /** @class */ (function (_super) {
    __extends(WyvernExchangeContract, _super);
    function WyvernExchangeContract(web3ContractInstance, defaults) {
        var _this = _super.call(this, web3ContractInstance, defaults) || this;
        _this.name = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.name.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.tokenTransferProxy = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.tokenTransferProxy.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.staticCall = {
            callAsync: function (target_0, calldata_1, extradata_2, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.staticCall.call, self.web3ContractInstance)(target_0, calldata_1, extradata_2, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.changeMinimumMakerProtocolFee = {
            sendTransactionAsync: function (newMinimumMakerProtocolFee_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.changeMinimumMakerProtocolFee.estimateGasAsync.bind(self, newMinimumMakerProtocolFee_0))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeMinimumMakerProtocolFee, self.web3ContractInstance)(newMinimumMakerProtocolFee_0, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newMinimumMakerProtocolFee_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeMinimumMakerProtocolFee.estimateGas, self.web3ContractInstance)(newMinimumMakerProtocolFee_0, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newMinimumMakerProtocolFee_0) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.changeMinimumMakerProtocolFee.getData(newMinimumMakerProtocolFee_0);
                return abiEncodedTransactionData;
            },
        };
        _this.changeMinimumTakerProtocolFee = {
            sendTransactionAsync: function (newMinimumTakerProtocolFee_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.changeMinimumTakerProtocolFee.estimateGasAsync.bind(self, newMinimumTakerProtocolFee_0))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeMinimumTakerProtocolFee, self.web3ContractInstance)(newMinimumTakerProtocolFee_0, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newMinimumTakerProtocolFee_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeMinimumTakerProtocolFee.estimateGas, self.web3ContractInstance)(newMinimumTakerProtocolFee_0, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newMinimumTakerProtocolFee_0) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.changeMinimumTakerProtocolFee.getData(newMinimumTakerProtocolFee_0);
                return abiEncodedTransactionData;
            },
        };
        _this.guardedArrayReplace = {
            callAsync: function (array_0, desired_1, mask_2, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.guardedArrayReplace.call, self.web3ContractInstance)(array_0, desired_1, mask_2, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.minimumTakerProtocolFee = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.minimumTakerProtocolFee.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.codename = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.codename.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.DOMAIN_SEPARATOR = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.DOMAIN_SEPARATOR.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.calculateCurrentPrice_ = {
            callAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.calculateCurrentPrice_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.changeProtocolFeeRecipient = {
            sendTransactionAsync: function (newProtocolFeeRecipient_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.changeProtocolFeeRecipient.estimateGasAsync.bind(self, newProtocolFeeRecipient_0))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeProtocolFeeRecipient, self.web3ContractInstance)(newProtocolFeeRecipient_0, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newProtocolFeeRecipient_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.changeProtocolFeeRecipient.estimateGas, self.web3ContractInstance)(newProtocolFeeRecipient_0, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newProtocolFeeRecipient_0) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.changeProtocolFeeRecipient.getData(newProtocolFeeRecipient_0);
                return abiEncodedTransactionData;
            },
        };
        _this.version = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.version.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.orderCalldataCanMatch = {
            callAsync: function (buyCalldata_0, buyReplacementPattern_1, sellCalldata_2, sellReplacementPattern_3, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.orderCalldataCanMatch.call, self.web3ContractInstance)(buyCalldata_0, buyReplacementPattern_1, sellCalldata_2, sellReplacementPattern_3, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.validateOrder_ = {
            callAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.validateOrder_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.incrementNonce = {
            sendTransactionAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.incrementNonce.estimateGasAsync.bind(self))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.incrementNonce, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.incrementNonce.estimateGas, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function () {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.incrementNonce.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.calculateFinalPrice = {
            callAsync: function (side_0, saleKind_1, basePrice_2, extra_3, listingTime_4, expirationTime_5, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.calculateFinalPrice.call, self.web3ContractInstance)(side_0, saleKind_1, basePrice_2, extra_3, listingTime_4, expirationTime_5, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.protocolFeeRecipient = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.protocolFeeRecipient.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.renounceOwnership = {
            sendTransactionAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.renounceOwnership.estimateGasAsync.bind(self))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.renounceOwnership, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.renounceOwnership.estimateGas, self.web3ContractInstance)(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function () {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.renounceOwnership.getData();
                return abiEncodedTransactionData;
            },
        };
        _this.hashOrder_ = {
            callAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.hashOrder_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.ordersCanMatch_ = {
            callAsync: function (addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.ordersCanMatch_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.approveOrder_ = {
            sendTransactionAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.approveOrder_.estimateGasAsync.bind(self, addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.approveOrder_, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.approveOrder_.estimateGas, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.approveOrder_.getData(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, orderbookInclusionDesired_9);
                return abiEncodedTransactionData;
            },
        };
        _this.registry = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.registry.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.minimumMakerProtocolFee = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.minimumMakerProtocolFee.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.hashToSign_ = {
            callAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.hashToSign_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.nonces = {
            callAsync: function (index_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.nonces.call, self.web3ContractInstance)(index_0, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.cancelledOrFinalized = {
            callAsync: function (index_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.cancelledOrFinalized.call, self.web3ContractInstance)(index_0, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.owner = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.owner.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.exchangeToken = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.exchangeToken.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.cancelOrder_ = {
            sendTransactionAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.cancelOrder_.estimateGasAsync.bind(self, addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.cancelOrder_, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.cancelOrder_.estimateGas, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.cancelOrder_.getData(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11);
                return abiEncodedTransactionData;
            },
        };
        _this.atomicMatch_ = {
            sendTransactionAsync: function (addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.atomicMatch_.estimateGasAsync.bind(self, addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.atomicMatch_, self.web3ContractInstance)(addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.atomicMatch_.estimateGas, self.web3ContractInstance)(addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.atomicMatch_.getData(addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, vs_9, rssMetadata_10);
                return abiEncodedTransactionData;
            },
        };
        _this.validateOrderParameters_ = {
            callAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.validateOrderParameters_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.INVERSE_BASIS_POINT = {
            callAsync: function (txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.INVERSE_BASIS_POINT.call, self.web3ContractInstance)(txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.calculateMatchPrice_ = {
            callAsync: function (addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.calculateMatchPrice_.call, self.web3ContractInstance)(addrs_0, uints_1, feeMethodsSidesKindsHowToCalls_2, calldataBuy_3, calldataSell_4, replacementPatternBuy_5, replacementPatternSell_6, staticExtradataBuy_7, staticExtradataSell_8, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.approvedOrders = {
            callAsync: function (hash_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.approvedOrders.call, self.web3ContractInstance)(hash_0, txData)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.transferOwnership = {
            sendTransactionAsync: function (newOwner_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.transferOwnership.estimateGasAsync.bind(self, newOwner_0))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.transferOwnership, self.web3ContractInstance)(newOwner_0, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newOwner_0, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.transferOwnership.estimateGas, self.web3ContractInstance)(newOwner_0, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newOwner_0) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.transferOwnership.getData(newOwner_0);
                return abiEncodedTransactionData;
            },
        };
        _this.cancelOrderWithNonce_ = {
            sendTransactionAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData, self.cancelOrderWithNonce_.estimateGasAsync.bind(self, addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.cancelOrderWithNonce_, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12, txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                return [4 /*yield*/, self.applyDefaultsToTxDataAsync(txData)];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, utils_1.promisify(self.web3ContractInstance.cancelOrderWithNonce_.estimateGas, self.web3ContractInstance)(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12, txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12) {
                var self = this;
                var abiEncodedTransactionData = self.web3ContractInstance.cancelOrderWithNonce_.getData(addrs_0, uints_1, feeMethod_2, side_3, saleKind_4, howToCall_5, calldata_6, replacementPattern_7, staticExtradata_8, v_9, r_10, s_11, nonce_12);
                return abiEncodedTransactionData;
            },
        };
        utils_1.classUtils.bindAll(_this, ['web3ContractInstance', 'defaults']);
        return _this;
    }
    return WyvernExchangeContract;
}(base_contract_1.BaseContract)); // tslint:disable:max-file-line-count
exports.WyvernExchangeContract = WyvernExchangeContract;
//# sourceMappingURL=wyvern_exchange.js.map