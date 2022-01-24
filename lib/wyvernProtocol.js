"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WyvernProtocol = void 0;
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const ethABI = require("ethereumjs-abi");
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const wyvern_atomicizer_1 = require("./abi_gen/wyvern_atomicizer");
const wyvern_d_a_o_1 = require("./abi_gen/wyvern_d_a_o");
const wyvern_exchange_1 = require("./abi_gen/wyvern_exchange");
const wyvern_proxy_registry_1 = require("./abi_gen/wyvern_proxy_registry");
const wyvern_token_1 = require("./abi_gen/wyvern_token");
const schemas_1 = require("./schemas");
const types_1 = require("./types");
const assert_1 = require("./utils/assert");
const constants_1 = require("./utils/constants");
const decorators_1 = require("./utils/decorators");
const signature_utils_1 = require("./utils/signature_utils");
const utils_2 = require("./utils/utils");
class WyvernProtocol {
    constructor(provider, config) {
        assert_1.assert.isWeb3Provider('provider', provider);
        this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider, {
            gasPrice: config.gasPrice,
        });
        const exchangeContractAddress = config.wyvernExchangeContractAddress ||
            WyvernProtocol.getExchangeContractAddress(config.network);
        this.wyvernExchange = new wyvern_exchange_1.WyvernExchangeContract(exchangeContractAddress, provider);
        const proxyRegistryContractAddress = config.wyvernProxyRegistryContractAddress ||
            WyvernProtocol.getProxyRegistryContractAddress(config.network);
        this.wyvernProxyRegistry = new wyvern_proxy_registry_1.WyvernProxyRegistryContract(proxyRegistryContractAddress, provider);
        const daoContractAddress = config.wyvernDAOContractAddress ||
            WyvernProtocol.getDAOContractAddress(config.network);
        this.wyvernDAO = new wyvern_d_a_o_1.WyvernDAOContract(daoContractAddress, provider);
        const tokenContractAddress = config.wyvernTokenContractAddress ||
            WyvernProtocol.getTokenContractAddress(config.network);
        this.wyvernToken = new wyvern_token_1.WyvernTokenContract(tokenContractAddress, provider);
        const atomicizerContractAddress = config.wyvernAtomicizerContractAddress ||
            WyvernProtocol.getAtomicizerContractAddress(config.network);
        this.wyvernAtomicizer = new wyvern_atomicizer_1.WyvernAtomicizerContract(atomicizerContractAddress, provider);
    }
    static getExchangeContractAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernExchange;
    }
    static getProxyRegistryContractAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernProxyRegistry;
    }
    static getTokenContractAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernToken;
    }
    static getDAOContractAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernDAO;
    }
    static getAtomicizerContractAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernAtomicizer;
    }
    static getTokenTransferProxyAddress(network) {
        return constants_1.constants.DEPLOYED[network].WyvernTokenTransferProxy;
    }
    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    static isValidSignature(data, signature, signerAddress) {
        assert_1.assert.isHexString('data', data);
        assert_1.assert.doesConformToSchema('signature', signature, schemas_1.schemas.ecSignatureSchema);
        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
        const isValidSignature = signature_utils_1.signatureUtils.isValidSignature(data, signature, signerAddress);
        return isValidSignature;
    }
    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    static generatePseudoRandomSalt() {
        // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of decimal places.
        // Source: https://mikemcl.github.io/bignumber.js/#random
        const randomNumber = utils_1.BigNumber.random(constants_1.constants.MAX_DIGITS_IN_UNSIGNED_256_INT);
        const factor = new utils_1.BigNumber(10).pow(constants_1.constants.MAX_DIGITS_IN_UNSIGNED_256_INT - 1);
        const salt = randomNumber.times(factor).integerValue();
        return salt;
    }
    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    static isValidOrderHash(orderHash) {
        // Since this method can be called to check if any arbitrary string conforms to an orderHash's
        // format, we only assert that we were indeed passed a string.
        assert_1.assert.isString('orderHash', orderHash);
        const schemaValidator = new json_schemas_1.SchemaValidator();
        const isValidOrderHash = schemaValidator.isValid(orderHash, schemas_1.schemas.orderHashSchema);
        return isValidOrderHash;
    }
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    static toUnitAmount(amount, decimals) {
        assert_1.assert.isValidBaseUnitAmount('amount', amount);
        assert_1.assert.isNumber('decimals', decimals);
        const aUnit = new utils_1.BigNumber(10).pow(decimals);
        const unit = amount.div(aUnit);
        return unit;
    }
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    static toBaseUnitAmount(amount, decimals) {
        assert_1.assert.isBigNumber('amount', amount);
        assert_1.assert.isNumber('decimals', decimals);
        const unit = new utils_1.BigNumber(10).pow(decimals);
        const baseUnitAmount = amount.times(unit);
        const hasDecimals = baseUnitAmount.decimalPlaces() !== 0;
        if (hasDecimals) {
            throw new Error(`Invalid unit amount: ${amount.toString()} - Too many decimal places`);
        }
        return baseUnitAmount;
    }
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    static getOrderHashHex(order) {
        const orderHashHex = utils_2.utils.getOrderHashHex(order);
        return orderHashHex;
    }
    /**
     * Computes the assetHash for a supplied asset.
     */
    static getAssetHashHex(assetHash, schema) {
        const assetHashHex = utils_2.utils.getAssetHashHex(assetHash, schema);
        return assetHashHex;
    }
    /**
     * Sets a new web3 provider for wyvernProtocol.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the wyvernProtocol.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    setProvider(provider, networkId) {
        this._web3Wrapper.setProvider(provider);
        this.wyvernExchange._invalidateContractInstances();
        this.wyvernExchange._setNetworkId(networkId);
        this.wyvernProxyRegistry._invalidateContractInstance();
        this.wyvernProxyRegistry._setNetworkId(networkId);
    }
    /**
     * Get user Ethereum addresses available through the supplied web3 provider available for sending transactions.
     * @return  An array of available user Ethereum addresses.
     */
    getAvailableAddressesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const availableAddresses = yield this._web3Wrapper.getAvailableAddressesAsync();
            return availableAddresses;
        });
    }
    /**
     * Signs an orderHash and returns its elliptic curve signature.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Web3.Provider supplied to wyvernProtocol.js.
     * @return  An object containing the Elliptic curve signature parameters generated by signing the orderHash.
     */
    signOrderHashAsync(orderHash, signerAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.isHexString('orderHash', orderHash);
            /* await assert.isSenderAddressAsync('signerAddress', signerAddress, this._web3Wrapper); */
            let msgHashHex;
            const nodeVersion = yield this._web3Wrapper.getNodeVersionAsync();
            const isParityNode = utils_2.utils.isParityNode(nodeVersion);
            const isTestRpc = utils_2.utils.isTestRpc(nodeVersion);
            if (isParityNode || isTestRpc) {
                // Parity and TestRpc nodes add the personalMessage prefix itself
                msgHashHex = orderHash;
            }
            else {
                const orderHashBuff = ethUtil.toBuffer(orderHash);
                const msgHashBuff = ethUtil.hashPersonalMessage(orderHashBuff);
                msgHashHex = ethUtil.bufferToHex(msgHashBuff);
            }
            const signature = yield this._web3Wrapper.signMessageAsync(signerAddress, msgHashHex);
            // HACK: There is no consensus on whether the signatureHex string should be formatted as
            // v + r + s OR r + s + v, and different clients (even different versions of the same client)
            // return the signature params in different orders. In order to support all client implementations,
            // we parse the signature in both ways, and evaluate if either one is a valid signature.
            const validVParamValues = [27, 28];
            const ecSignatureVRS = signature_utils_1.signatureUtils.parseSignatureHexAsVRS(signature);
            if (_.includes(validVParamValues, ecSignatureVRS.v)) {
                const isValidVRSSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureVRS, signerAddress);
                if (isValidVRSSignature) {
                    return ecSignatureVRS;
                }
            }
            const ecSignatureRSV = signature_utils_1.signatureUtils.parseSignatureHexAsRSV(signature);
            if (_.includes(validVParamValues, ecSignatureRSV.v)) {
                const isValidRSVSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureRSV, signerAddress);
                if (isValidRSVSignature) {
                    return ecSignatureRSV;
                }
            }
            throw new Error(types_1.WyvernProtocolError.InvalidSignature);
        });
    }
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    awaitTransactionMinedAsync(txHash, pollingIntervalMs = 1000, timeoutMs) {
        return __awaiter(this, void 0, void 0, function* () {
            let timeoutExceeded = false;
            if (timeoutMs) {
                setTimeout(() => (timeoutExceeded = true), timeoutMs);
            }
            const txReceiptPromise = new Promise((resolve, reject) => {
                const intervalId = utils_1.intervalUtils.setAsyncExcludingInterval(() => __awaiter(this, void 0, void 0, function* () {
                    if (timeoutExceeded) {
                        utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                        return reject(types_1.WyvernProtocolError.TransactionMiningTimeout);
                    }
                    const transactionReceipt = yield this._web3Wrapper.getTransactionReceiptIfExistsAsync(txHash);
                    if (transactionReceipt && this._abiDecoder) {
                        utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                        const logsWithDecodedArgs = _.map(transactionReceipt.logs, this._abiDecoder.tryToDecodeLogOrNoop.bind(this._abiDecoder));
                        const transactionReceiptWithDecodedLogArgs = Object.assign(Object.assign({}, transactionReceipt), { logs: logsWithDecodedArgs });
                        resolve(transactionReceiptWithDecodedLogArgs);
                    }
                }), pollingIntervalMs, () => ({}));
            });
            return txReceiptPromise;
        });
    }
}
WyvernProtocol.NULL_ADDRESS = constants_1.constants.NULL_ADDRESS;
WyvernProtocol.MAX_UINT_256 = new utils_1.BigNumber(2).pow(256).minus(1);
/**
 * Encodes the replacementPattern for a supplied ABI and replace kind
 * @param   abi AnnotatedFunctionABI
 * @param   replaceKind Parameter kind to replace
 * @return  The resulting encoded replacementPattern
 */
WyvernProtocol.encodeReplacementPattern = (abi, replaceKind = types_1.FunctionInputKind.Replaceable, encodeToBytes = true) => {
    const output = [];
    const data = [];
    const dynamicOffset = abi.inputs.reduce((len, { type }) => {
        const match = type.match(/\[(.+)\]$/);
        return len + (match ? parseInt(match[1], 10) * 32 : 32);
    }, 0);
    abi.inputs
        .map(({ kind, type, value }) => ({
        bitmask: kind === replaceKind ? 255 : 0,
        type: ethABI.elementaryName(type),
        value: value !== undefined
            ? value
            : WyvernProtocol.generateDefaultValue(type),
    }))
        .reduce((offset, { bitmask, type, value }) => {
        // The 0xff bytes in the mask select the replacement bytes. All other bytes are 0x00.
        const cur = Buffer.alloc(ethABI.encodeSingle(type, value).length).fill(bitmask);
        if (ethABI.isDynamic(type)) {
            if (bitmask) {
                throw new Error('Replacement is not supported for dynamic parameters.');
            }
            output.push(Buffer.alloc(ethABI.encodeSingle('uint256', dynamicOffset).length));
            data.push(cur);
            return offset + cur.length;
        }
        output.push(cur);
        return offset;
    }, dynamicOffset);
    // 4 initial bytes of 0x00 for the method hash.
    const methodIdMask = Buffer.alloc(4);
    const mask = Buffer.concat([
        methodIdMask,
        Buffer.concat(output.concat(data)),
    ]);
    return encodeToBytes
        ? `0x${mask.toString('hex')}`
        : mask.map(b => (b ? 1 : 0)).join('');
};
/**
 * Encodes the atomicized replacementPattern for a supplied ABI and replace kind
 * @param   abis array of AnnotatedFunctionABI
 * @param   replaceKind Parameter kind to replace
 * @return  The resulting encoded replacementPattern
 */
WyvernProtocol.encodeAtomicizedReplacementPattern = (abis, replaceKind = types_1.FunctionInputKind.Replaceable) => {
    const allowReplaceByte = '1';
    const doNotAllowReplaceByte = '0';
    /* Four bytes for method ID. */
    const maskArr = [
        doNotAllowReplaceByte,
        doNotAllowReplaceByte,
        doNotAllowReplaceByte,
        doNotAllowReplaceByte,
    ];
    const encodedUint256 = ethABI.encodeSingle(ethABI.elementaryName('uint256'), WyvernProtocol.generateDefaultValue('uint256'));
    const dataLocationSize = encodedUint256.length;
    const dynamicArgumentLengthSize = encodedUint256.length;
    // See https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
    // Prepare dymanic types to be passed in (they need locations of their data parts). 4 for addresses, values, calldata lengths, calldatas
    maskArr.push(doNotAllowReplaceByte.repeat(dataLocationSize * 4));
    // Length of addresses array
    maskArr.push(doNotAllowReplaceByte.repeat(dynamicArgumentLengthSize));
    // Addresses should not be replaced
    let encoded = ethABI.encodeSingle(ethABI.elementaryName('address'), WyvernProtocol.generateDefaultValue('address'));
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
    const replacementBytes = [];
    abis.map(abi => {
        const replacement = WyvernProtocol.encodeReplacementPattern(abi, replaceKind, false);
        replacementBytes.push(replacement);
    });
    const concatenatedReplacementPatterns = replacementBytes.join('');
    maskArr.push(concatenatedReplacementPatterns);
    if (concatenatedReplacementPatterns.length % 32 !== 0) {
        // Pad replacementPatterns to nearest multiple of 32
        maskArr.push(doNotAllowReplaceByte.repeat(32 - (concatenatedReplacementPatterns.length % 32)));
    }
    const mask = maskArr.reduce((x, y) => x + y, '');
    const ret = [];
    /* Encode into bytes. */
    for (const char of mask) {
        const byte = char === allowReplaceByte ? 255 : 0;
        const buf = Buffer.alloc(1);
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
WyvernProtocol.generateDefaultValue = (type) => {
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
exports.WyvernProtocol = WyvernProtocol;
//# sourceMappingURL=wyvernProtocol.js.map