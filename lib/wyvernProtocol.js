"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var json_schemas_1 = require("@0xproject/json-schemas");
var utils_1 = require("@0xproject/utils");
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var ethABI = require("ethereumjs-abi");
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var types_1 = require("./types");
var schemas_1 = require("./schemas");
var assert_1 = require("./utils/assert");
var constants_1 = require("./utils/constants");
var decorators_1 = require("./utils/decorators");
var signature_utils_1 = require("./utils/signature_utils");
var utils_2 = require("./utils/utils");
var wyvern_atomicizer_1 = require("./abi_gen/wyvern_atomicizer");
var wyvern_d_a_o_1 = require("./abi_gen/wyvern_d_a_o");
var wyvern_exchange_1 = require("./abi_gen/wyvern_exchange");
var wyvern_proxy_registry_1 = require("./abi_gen/wyvern_proxy_registry");
var wyvern_token_1 = require("./abi_gen/wyvern_token");
var WyvernProtocol = /** @class */ (function () {
    function WyvernProtocol(provider, config) {
        assert_1.assert.isWeb3Provider('provider', provider);
        // assert.doesConformToSchema('config', config, wyvernProtocolConfigSchema)
        this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider, { gasPrice: config.gasPrice });
        var exchangeContractAddress = config.wyvernExchangeContractAddress || WyvernProtocol.getExchangeContractAddress(config.network);
        this.wyvernExchange = new wyvern_exchange_1.WyvernExchangeContract(this._web3Wrapper.getContractInstance(constants_1.constants.EXCHANGE_ABI, exchangeContractAddress), {});
        var proxyRegistryContractAddress = config.wyvernProxyRegistryContractAddress || WyvernProtocol.getProxyRegistryContractAddress(config.network);
        this.wyvernProxyRegistry = new wyvern_proxy_registry_1.WyvernProxyRegistryContract(this._web3Wrapper.getContractInstance(constants_1.constants.PROXY_REGISTRY_ABI, proxyRegistryContractAddress), {});
        var daoContractAddress = config.wyvernDAOContractAddress || WyvernProtocol.getDAOContractAddress(config.network);
        this.wyvernDAO = new wyvern_d_a_o_1.WyvernDAOContract(this._web3Wrapper.getContractInstance(constants_1.constants.DAO_ABI, daoContractAddress), {});
        var tokenContractAddress = config.wyvernTokenContractAddress || WyvernProtocol.getTokenContractAddress(config.network);
        this.wyvernToken = new wyvern_token_1.WyvernTokenContract(this._web3Wrapper.getContractInstance(constants_1.constants.TOKEN_ABI, tokenContractAddress), {});
        var atomicizerContractAddress = config.wyvernAtomicizerContractAddress || WyvernProtocol.getAtomicizerContractAddress(config.network);
        this.wyvernAtomicizer = new wyvern_atomicizer_1.WyvernAtomicizerContract(this._web3Wrapper.getContractInstance(constants_1.constants.ATOMICIZER_ABI, atomicizerContractAddress), {});
    }
    WyvernProtocol.getExchangeContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernExchange;
    };
    WyvernProtocol.getProxyRegistryContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernProxyRegistry;
    };
    WyvernProtocol.getTokenContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernToken;
    };
    WyvernProtocol.getDAOContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernDAO;
    };
    WyvernProtocol.getAtomicizerContractAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernAtomicizer;
    };
    WyvernProtocol.getTokenTransferProxyAddress = function (network) {
        return constants_1.constants.DEPLOYED[network].WyvernTokenTransferProxy;
    };
    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    WyvernProtocol.isValidSignature = function (data, signature, signerAddress) {
        assert_1.assert.isHexString('data', data);
        assert_1.assert.doesConformToSchema('signature', signature, schemas_1.schemas.ecSignatureSchema);
        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
        var isValidSignature = signature_utils_1.signatureUtils.isValidSignature(data, signature, signerAddress);
        return isValidSignature;
    };
    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    WyvernProtocol.generatePseudoRandomSalt = function () {
        // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of decimal places.
        // Source: https://mikemcl.github.io/bignumber.js/#random
        var randomNumber = utils_1.BigNumber.random(constants_1.constants.MAX_DIGITS_IN_UNSIGNED_256_INT);
        var factor = new utils_1.BigNumber(10).pow(constants_1.constants.MAX_DIGITS_IN_UNSIGNED_256_INT - 1);
        var salt = randomNumber.times(factor).round();
        return salt;
    };
    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    WyvernProtocol.isValidOrderHash = function (orderHash) {
        // Since this method can be called to check if any arbitrary string conforms to an orderHash's
        // format, we only assert that we were indeed passed a string.
        assert_1.assert.isString('orderHash', orderHash);
        var schemaValidator = new json_schemas_1.SchemaValidator();
        var isValidOrderHash = schemaValidator.validate(orderHash, schemas_1.schemas.orderHashSchema).valid;
        return isValidOrderHash;
    };
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    WyvernProtocol.toUnitAmount = function (amount, decimals) {
        assert_1.assert.isValidBaseUnitAmount('amount', amount);
        assert_1.assert.isNumber('decimals', decimals);
        var aUnit = new utils_1.BigNumber(10).pow(decimals);
        var unit = amount.div(aUnit);
        return unit;
    };
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    WyvernProtocol.toBaseUnitAmount = function (amount, decimals) {
        assert_1.assert.isBigNumber('amount', amount);
        assert_1.assert.isNumber('decimals', decimals);
        var unit = new utils_1.BigNumber(10).pow(decimals);
        var baseUnitAmount = amount.times(unit);
        var hasDecimals = baseUnitAmount.decimalPlaces() !== 0;
        if (hasDecimals) {
            throw new Error("Invalid unit amount: " + amount.toString() + " - Too many decimal places");
        }
        return baseUnitAmount;
    };
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    WyvernProtocol.getOrderHashHex = function (order) {
        assert_1.assert.doesConformToSchema('order', order, schemas_1.schemas.orderSchema);
        var orderHashHex = utils_2.utils.getOrderHashHex(order);
        return orderHashHex;
    };
    /**
     * Computes the assetHash for a supplied asset.
     */
    WyvernProtocol.getAssetHashHex = function (assetHash, schema) {
        var assetHashHex = utils_2.utils.getAssetHashHex(assetHash, schema);
        return assetHashHex;
    };
    /**
     * Sets a new web3 provider for wyvernProtocol.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the wyvernProtocol.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    WyvernProtocol.prototype.setProvider = function (provider, networkId) {
        this._web3Wrapper.setProvider(provider);
        this.wyvernExchange._invalidateContractInstances();
        this.wyvernExchange._setNetworkId(networkId);
        this.wyvernProxyRegistry._invalidateContractInstance();
        this.wyvernProxyRegistry._setNetworkId(networkId);
    };
    /**
     * Get user Ethereum addresses available through the supplied web3 provider available for sending transactions.
     * @return  An array of available user Ethereum addresses.
     */
    WyvernProtocol.prototype.getAvailableAddressesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var availableAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._web3Wrapper.getAvailableAddressesAsync()];
                    case 1:
                        availableAddresses = _a.sent();
                        return [2 /*return*/, availableAddresses];
                }
            });
        });
    };
    /**
     * Signs an orderHash and returns its elliptic curve signature.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Web3.Provider supplied to wyvernProtocol.js.
     * @return  An object containing the Elliptic curve signature parameters generated by signing the orderHash.
     */
    WyvernProtocol.prototype.signOrderHashAsync = function (orderHash, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var msgHashHex, nodeVersion, isParityNode, isTestRpc, orderHashBuff, msgHashBuff, signature, validVParamValues, ecSignatureVRS, isValidVRSSignature, ecSignatureRSV, isValidRSVSignature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isHexString('orderHash', orderHash);
                        return [4 /*yield*/, this._web3Wrapper.getNodeVersionAsync()];
                    case 1:
                        nodeVersion = _a.sent();
                        isParityNode = utils_2.utils.isParityNode(nodeVersion);
                        isTestRpc = utils_2.utils.isTestRpc(nodeVersion);
                        if (isParityNode || isTestRpc) {
                            // Parity and TestRpc nodes add the personalMessage prefix itself
                            msgHashHex = orderHash;
                        }
                        else {
                            orderHashBuff = ethUtil.toBuffer(orderHash);
                            msgHashBuff = ethUtil.hashPersonalMessage(orderHashBuff);
                            msgHashHex = ethUtil.bufferToHex(msgHashBuff);
                        }
                        return [4 /*yield*/, this._web3Wrapper.signTransactionAsync(signerAddress, msgHashHex)];
                    case 2:
                        signature = _a.sent();
                        validVParamValues = [27, 28];
                        ecSignatureVRS = signature_utils_1.signatureUtils.parseSignatureHexAsVRS(signature);
                        if (_.includes(validVParamValues, ecSignatureVRS.v)) {
                            isValidVRSSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureVRS, signerAddress);
                            if (isValidVRSSignature) {
                                return [2 /*return*/, ecSignatureVRS];
                            }
                        }
                        ecSignatureRSV = signature_utils_1.signatureUtils.parseSignatureHexAsRSV(signature);
                        if (_.includes(validVParamValues, ecSignatureRSV.v)) {
                            isValidRSVSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureRSV, signerAddress);
                            if (isValidRSVSignature) {
                                return [2 /*return*/, ecSignatureRSV];
                            }
                        }
                        throw new Error(types_1.WyvernProtocolError.InvalidSignature);
                }
            });
        });
    };
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    WyvernProtocol.prototype.awaitTransactionMinedAsync = function (txHash, pollingIntervalMs, timeoutMs) {
        if (pollingIntervalMs === void 0) { pollingIntervalMs = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var timeoutExceeded, txReceiptPromise;
            var _this = this;
            return __generator(this, function (_a) {
                timeoutExceeded = false;
                if (timeoutMs) {
                    setTimeout(function () { return (timeoutExceeded = true); }, timeoutMs);
                }
                txReceiptPromise = new Promise(function (resolve, reject) {
                    var intervalId = utils_1.intervalUtils.setAsyncExcludingInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var transactionReceipt, logsWithDecodedArgs, transactionReceiptWithDecodedLogArgs;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (timeoutExceeded) {
                                        utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                                        return [2 /*return*/, reject(types_1.WyvernProtocolError.TransactionMiningTimeout)];
                                    }
                                    return [4 /*yield*/, this._web3Wrapper.getTransactionReceiptAsync(txHash)];
                                case 1:
                                    transactionReceipt = _a.sent();
                                    if (!_.isNull(transactionReceipt)) {
                                        utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                                        logsWithDecodedArgs = _.map(transactionReceipt.logs, this._abiDecoder.tryToDecodeLogOrNoop.bind(this._abiDecoder));
                                        transactionReceiptWithDecodedLogArgs = __assign({}, transactionReceipt, { logs: logsWithDecodedArgs });
                                        resolve(transactionReceiptWithDecodedLogArgs);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, pollingIntervalMs, function () { return ({}); });
                });
                return [2 /*return*/, txReceiptPromise];
            });
        });
    };
    WyvernProtocol.NULL_ADDRESS = constants_1.constants.NULL_ADDRESS;
    WyvernProtocol.MAX_UINT_256 = new utils_1.BigNumber(2).pow(256).sub(1);
    /**
     * Encodes the replacementPattern for a supplied ABI and replace kind
     * @param   abi AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    WyvernProtocol.encodeReplacementPattern = function (abi, replaceKind, encodeToBytes) {
        if (replaceKind === void 0) { replaceKind = types_1.FunctionInputKind.Replaceable; }
        if (encodeToBytes === void 0) { encodeToBytes = true; }
        var output = [];
        var data = [];
        var dynamicOffset = abi.inputs.reduce(function (len, _a) {
            var type = _a.type;
            var match = type.match(/\[(.+)\]$/);
            return len + (match ? parseInt(match[1], 10) * 32 : 32);
        }, 0);
        abi.inputs
            .map(function (_a) {
            var kind = _a.kind, type = _a.type, value = _a.value;
            return ({
                bitmask: kind === replaceKind ? 255 : 0,
                type: ethABI.elementaryName(type),
                value: value !== undefined ? value : WyvernProtocol.generateDefaultValue(type),
            });
        })
            .reduce(function (offset, _a) {
            var bitmask = _a.bitmask, type = _a.type, value = _a.value;
            // The 0xff bytes in the mask select the replacement bytes. All other bytes are 0x00.
            var cur = new Buffer(ethABI.encodeSingle(type, value).length).fill(bitmask);
            if (ethABI.isDynamic(type)) {
                if (bitmask) {
                    throw new Error('Replacement is not supported for dynamic parameters.');
                }
                output.push(new Buffer(ethABI.encodeSingle('uint256', dynamicOffset).length));
                data.push(cur);
                return offset + cur.length;
            }
            output.push(cur);
            return offset;
        }, dynamicOffset);
        // 4 initial bytes of 0x00 for the method hash.
        var methodIdMask = new Buffer(4);
        var mask = Buffer.concat([methodIdMask, Buffer.concat(output.concat(data))]);
        return encodeToBytes ? "0x" + mask.toString('hex') : mask.map(function (b) { return b ? 1 : 0; }).join('');
    };
    /**
     * Encodes the atomicized replacementPattern for a supplied ABI and replace kind
     * @param   abis array of AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    WyvernProtocol.encodeAtomicizedReplacementPattern = function (abis, replaceKind) {
        if (replaceKind === void 0) { replaceKind = types_1.FunctionInputKind.Replaceable; }
        var allowReplaceByte = '1';
        var doNotAllowReplaceByte = '0';
        /* Four bytes for method ID. */
        var maskArr = [doNotAllowReplaceByte, doNotAllowReplaceByte,
            doNotAllowReplaceByte, doNotAllowReplaceByte];
        var encodedUint256 = ethABI.encodeSingle(ethABI.elementaryName('uint256'), WyvernProtocol.generateDefaultValue('uint256'));
        var dataLocationSize = encodedUint256.length;
        var dynamicArgumentLengthSize = encodedUint256.length;
        // See https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
        // Prepare dymanic types to be passed in (they need locations of their data parts). 4 for addresses, values, calldata lengths, calldatas
        maskArr.push(doNotAllowReplaceByte.repeat(dataLocationSize * 4));
        // Length of addresses array
        maskArr.push(doNotAllowReplaceByte.repeat(dynamicArgumentLengthSize));
        // Addresses should not be replaced
        var encoded = ethABI.encodeSingle(ethABI.elementaryName('address'), WyvernProtocol.generateDefaultValue('address'));
        maskArr.push(doNotAllowReplaceByte.repeat(encoded.length * abis.length));
        // Length of values array
        maskArr.push(doNotAllowReplaceByte.repeat(dynamicArgumentLengthSize));
        // Add the values...
        encoded = ethABI.encodeSingle(ethABI.elementaryName('uint'), WyvernProtocol.generateDefaultValue('uint'));
        maskArr.push(doNotAllowReplaceByte.repeat(encoded.length * abis.length));
        // Length of calldata lengths array
        maskArr.push(doNotAllowReplaceByte.repeat(dynamicArgumentLengthSize));
        // ... and calldata lengths
        maskArr.push(doNotAllowReplaceByte.repeat(encoded.length * abis.length));
        // Length of replacementPatterns
        maskArr.push(doNotAllowReplaceByte.repeat(dynamicArgumentLengthSize));
        // Raw replacementPatterns
        var replacementBytes = [];
        abis.map(function (abi) {
            var replacement = WyvernProtocol.encodeReplacementPattern(abi, replaceKind, false);
            replacementBytes.push(replacement);
        });
        var concatenatedReplacementPatterns = replacementBytes.join('');
        maskArr.push(concatenatedReplacementPatterns);
        if (concatenatedReplacementPatterns.length % 32 !== 0) {
            // Pad replacementPatterns to nearest multiple of 32
            maskArr.push(doNotAllowReplaceByte.repeat(32 - concatenatedReplacementPatterns.length % 32));
        }
        var mask = maskArr.reduce(function (x, y) { return x + y; }, '');
        var ret = [];
        /* Encode into bytes. */
        for (var _i = 0, mask_1 = mask; _i < mask_1.length; _i++) {
            var char = mask_1[_i];
            var byte = char === allowReplaceByte ? 255 : 0;
            var buf = Buffer.alloc(1);
            buf.writeUInt8(byte, 0);
            ret.push(buf);
        }
        return '0x' + Buffer.concat(ret).toString('hex');
    };
    /**
     * Computes the default value for a type
     * @param type The ABI type to calculate a default value for
     * @return The default value for that type
     */
    WyvernProtocol.generateDefaultValue = function (type) {
        switch (type) {
            case 'address':
            case 'bytes20':
                /* Null address is sometimes checked in transfer calls. */
                // But we need to use 0x000 because bitwise XOR won't work if there's a 0 in the actual address, since it will be replaced as 1 OR 0 = 1
                return '0x0000000000000000000000000000000000000000';
            case 'bytes32':
                return '0x0000000000000000000000000000000000000000000000000000000000000000';
            case 'bool':
                return false;
            case 'int':
            case 'uint':
            case 'uint8':
            case 'uint16':
            case 'uint32':
            case 'uint64':
            case 'uint256':
                return 0;
            default:
                throw new Error('Default value not yet implemented for type: ' + type);
        }
    };
    __decorate([
        decorators_1.decorators.syncWyvernProtocolErrorHandler
    ], WyvernProtocol, "getOrderHashHex", null);
    return WyvernProtocol;
}());
exports.WyvernProtocol = WyvernProtocol;
//# sourceMappingURL=wyvernProtocol.js.map