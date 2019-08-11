import { SchemaValidator } from '@0xproject/json-schemas';
import { BigNumber, intervalUtils } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import * as ethABI from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';
import * as _ from 'lodash';

import {
  AtomicizedReplacementEncoder,
  ECSignature,
  FunctionInputKind,
  Network,
  Order,
  ReplacementEncoder,
  SignedOrder,
  TransactionReceiptWithDecodedLogs,
  Web3Provider,
  WyvernProtocolConfig,
  WyvernProtocolError,
} from './types';

import { schemas } from './schemas';
import { AbiDecoder } from './utils/abi_decoder';
import { assert } from './utils/assert';
import { constants } from './utils/constants';
import { decorators } from './utils/decorators';
import { signatureUtils } from './utils/signature_utils';
import { utils } from './utils/utils';

import { WyvernAtomicizerContract } from './abi_gen/wyvern_atomicizer';
import { WyvernDAOContract } from './abi_gen/wyvern_d_a_o';
import { WyvernExchangeContract } from './abi_gen/wyvern_exchange';
import { WyvernProxyRegistryContract } from './abi_gen/wyvern_proxy_registry';
import { WyvernTokenContract } from './abi_gen/wyvern_token';

export class WyvernProtocol {

    public static NULL_ADDRESS = constants.NULL_ADDRESS;

    public static MAX_UINT_256 = new BigNumber(2).pow(256).sub(1);

    public wyvernExchange: WyvernExchangeContract;

    public wyvernProxyRegistry: WyvernProxyRegistryContract;

    public wyvernDAO: WyvernDAOContract;

    public wyvernToken: WyvernTokenContract;

    public wyvernAtomicizer: WyvernAtomicizerContract;

    private _web3Wrapper: Web3Wrapper;

    private _abiDecoder: AbiDecoder;

    public static getExchangeContractAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernExchange;
    }

    public static getProxyRegistryContractAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernProxyRegistry;
    }

    public static getTokenContractAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernToken;
    }

    public static getDAOContractAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernDAO;
    }

    public static getAtomicizerContractAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernAtomicizer;
    }

    public static getTokenTransferProxyAddress(network: Network): string {
        return constants.DEPLOYED[network].WyvernTokenTransferProxy;
    }

    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    public static isValidSignature(data: string, signature: ECSignature, signerAddress: string): boolean {
        assert.isHexString('data', data);
        assert.doesConformToSchema('signature', signature, schemas.ecSignatureSchema);
        assert.isETHAddressHex('signerAddress', signerAddress);
        const isValidSignature = signatureUtils.isValidSignature(data, signature, signerAddress);
        return isValidSignature;
    }

    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    public static generatePseudoRandomSalt(): BigNumber {
        // BigNumber.random returns a pseudo-random number between 0 & 1 with a passed in number of decimal places.
        // Source: https://mikemcl.github.io/bignumber.js/#random
        const randomNumber = BigNumber.random(constants.MAX_DIGITS_IN_UNSIGNED_256_INT);
        const factor = new BigNumber(10).pow(constants.MAX_DIGITS_IN_UNSIGNED_256_INT - 1);
        const salt = randomNumber.times(factor).round();
        return salt;
    }

    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    public static isValidOrderHash(orderHash: string): boolean {
        // Since this method can be called to check if any arbitrary string conforms to an orderHash's
        // format, we only assert that we were indeed passed a string.
        assert.isString('orderHash', orderHash);
        const schemaValidator = new SchemaValidator();
        const isValidOrderHash = schemaValidator.validate(orderHash, schemas.orderHashSchema).valid;
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
    public static toUnitAmount(amount: BigNumber, decimals: number): BigNumber {
        assert.isValidBaseUnitAmount('amount', amount);
        assert.isNumber('decimals', decimals);
        const aUnit = new BigNumber(10).pow(decimals);
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
    public static toBaseUnitAmount(amount: BigNumber, decimals: number): BigNumber {
        assert.isBigNumber('amount', amount);
        assert.isNumber('decimals', decimals);
        const unit = new BigNumber(10).pow(decimals);
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
    @decorators.syncWyvernProtocolErrorHandler
    public static getOrderHashHex(order: Order | SignedOrder): string {
        assert.doesConformToSchema('order', order, schemas.orderSchema);
        const orderHashHex = utils.getOrderHashHex(order);
        return orderHashHex;
    }

    /**
     * Encodes the replacementPattern for a supplied ABI and replace kind
     * @param   abi AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    public static encodeReplacementPattern: ReplacementEncoder = (abi, replaceKind = FunctionInputKind.Replaceable, encodeToBytes = true): string => {
        const allowReplaceByte = '1';
        const doNotAllowReplaceByte = '0';
        /* Four bytes for method ID. */
        const maskArr: string[] = [doNotAllowReplaceByte, doNotAllowReplaceByte,
        doNotAllowReplaceByte, doNotAllowReplaceByte];
        /* This DOES NOT currently support dynamic-length data (arrays). */
        abi.inputs.map(i => {
          const type = ethABI.elementaryName(i.type);
          const encoded = ethABI.encodeSingle(type, i.value || WyvernProtocol.generateDefaultValue(i.type));
          if (i.kind === replaceKind) {
            maskArr.push((allowReplaceByte as any).repeat(encoded.length));
          } else {
            maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length));
          }
        });

        const mask = maskArr.reduce((x, y) => x + y, '');
        if (!encodeToBytes) {
            return mask;
        }

        /* Encode into bytes. */
        const ret = [];
        for (const char of mask) {
          const byte = char === allowReplaceByte ? 255 : 0;
          const buf = Buffer.alloc(1);
          buf.writeUInt8(byte, 0);
          ret.push(buf);
        }
        return '0x' + Buffer.concat(ret).toString('hex');
    }

    /**
     * Encodes the atomicized replacementPattern for a supplied ABI and replace kind
     * @param   abis array of AnnotatedFunctionABI
     * @param   replaceKind Parameter kind to replace
     * @return  The resulting encoded replacementPattern
     */
    public static encodeAtomicizedReplacementPattern: AtomicizedReplacementEncoder = (abis, replaceKind = FunctionInputKind.Replaceable): string => {
        const allowReplaceByte = '1';
        const doNotAllowReplaceByte = '0';
        /* Four bytes for method ID. */
        const maskArr: string[] = [doNotAllowReplaceByte, doNotAllowReplaceByte,
        doNotAllowReplaceByte, doNotAllowReplaceByte];

        const encodedUint256 = ethABI.encodeSingle(ethABI.elementaryName('uint256'), WyvernProtocol.generateDefaultValue('uint256'));
        const dataLocationSize = encodedUint256.length;
        const dynamicArgumentLengthSize = encodedUint256.length;

        // See https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
        // Prepare dymanic types to be passed in (they need locations of their data parts). 4 for addresses, values, calldata lengths, calldatas
        maskArr.push((doNotAllowReplaceByte as any).repeat(dataLocationSize * 4));

        // Length of addresses array
        maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize));
        // Addresses should not be replaced
        let encoded = ethABI.encodeSingle(ethABI.elementaryName('address'), WyvernProtocol.generateDefaultValue('address'));
        maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length));

        // Length of values array
        maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize));
        // Add the values...
        encoded = ethABI.encodeSingle(ethABI.elementaryName('uint'), WyvernProtocol.generateDefaultValue('uint'));
        maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length));

        // Length of calldata lengths array
        maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize));
        // ... and calldata lengths
        maskArr.push((doNotAllowReplaceByte as any).repeat(encoded.length * abis.length));

        // Length of replacementPatterns
        maskArr.push((doNotAllowReplaceByte as any).repeat(dynamicArgumentLengthSize));
        // Raw replacementPatterns
        const replacementBytes: string[] = [];
        abis.map(abi => {
            const replacement = WyvernProtocol.encodeReplacementPattern(abi, replaceKind, false);
            replacementBytes.push(replacement);
        });
        const concatenatedReplacementPatterns = replacementBytes.join('');
        maskArr.push(concatenatedReplacementPatterns);

        if (concatenatedReplacementPatterns.length % 32 !== 0) {
            // Pad replacementPatterns to nearest multiple of 32
            maskArr.push((doNotAllowReplaceByte as any).repeat(32 - concatenatedReplacementPatterns.length % 32));
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
    }

    /**
     * Computes the assetHash for a supplied asset.
     */
    public static getAssetHashHex(assetHash: string, schema: string): string {
        const assetHashHex = utils.getAssetHashHex(assetHash, schema);
        return assetHashHex;
    }

    /**
     * Computes the default value for a type
     * @param type The ABI type to calculate a default value for
     * @return The default value for that type
     */
    private static generateDefaultValue = (type: string): any => {
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
    }

    constructor(provider: Web3Provider, config: WyvernProtocolConfig) {
        assert.isWeb3Provider('provider', provider);
        // assert.doesConformToSchema('config', config, wyvernProtocolConfigSchema)
        this._web3Wrapper = new Web3Wrapper(provider, { gasPrice: config.gasPrice });

        const exchangeContractAddress = config.wyvernExchangeContractAddress || WyvernProtocol.getExchangeContractAddress(config.network);
        this.wyvernExchange = new WyvernExchangeContract(
            this._web3Wrapper.getContractInstance((constants.EXCHANGE_ABI as any), exchangeContractAddress),
            {},
        );

        const proxyRegistryContractAddress = config.wyvernProxyRegistryContractAddress || WyvernProtocol.getProxyRegistryContractAddress(config.network);
        this.wyvernProxyRegistry = new WyvernProxyRegistryContract(
            this._web3Wrapper.getContractInstance((constants.PROXY_REGISTRY_ABI as any), proxyRegistryContractAddress),
            {},
        );

        const daoContractAddress = config.wyvernDAOContractAddress || WyvernProtocol.getDAOContractAddress(config.network);
        this.wyvernDAO = new WyvernDAOContract(
            this._web3Wrapper.getContractInstance((constants.DAO_ABI as any), daoContractAddress),
            {},
        );

        const tokenContractAddress = config.wyvernTokenContractAddress || WyvernProtocol.getTokenContractAddress(config.network);
        this.wyvernToken = new WyvernTokenContract(
            this._web3Wrapper.getContractInstance((constants.TOKEN_ABI as any), tokenContractAddress),
            {},
        );

        const atomicizerContractAddress = config.wyvernAtomicizerContractAddress || WyvernProtocol.getAtomicizerContractAddress(config.network);
        this.wyvernAtomicizer = new WyvernAtomicizerContract(
            this._web3Wrapper.getContractInstance((constants.ATOMICIZER_ABI as any), atomicizerContractAddress),
            {},
        );
    }

    /**
     * Sets a new web3 provider for wyvernProtocol.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the wyvernProtocol.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    public setProvider(provider: Web3Provider, networkId: number): void {
        this._web3Wrapper.setProvider(provider);
        (this.wyvernExchange as any)._invalidateContractInstances();
        (this.wyvernExchange as any)._setNetworkId(networkId);
        (this.wyvernProxyRegistry as any)._invalidateContractInstance();
        (this.wyvernProxyRegistry as any)._setNetworkId(networkId);
    }

    /**
     * Get user Ethereum addresses available through the supplied web3 provider available for sending transactions.
     * @return  An array of available user Ethereum addresses.
     */
    public async getAvailableAddressesAsync(): Promise<string[]> {
        const availableAddresses = await this._web3Wrapper.getAvailableAddressesAsync();
        return availableAddresses;
    }

    /**
     * Signs an orderHash and returns its elliptic curve signature.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Web3.Provider supplied to wyvernProtocol.js.
     * @return  An object containing the Elliptic curve signature parameters generated by signing the orderHash.
     */
    public async signOrderHashAsync(orderHash: string, signerAddress: string): Promise<ECSignature> {
        assert.isHexString('orderHash', orderHash);
        /* await assert.isSenderAddressAsync('signerAddress', signerAddress, this._web3Wrapper); */

        let msgHashHex;
        const nodeVersion = await this._web3Wrapper.getNodeVersionAsync();
        const isParityNode = utils.isParityNode(nodeVersion);
        const isTestRpc = utils.isTestRpc(nodeVersion);
        if (isParityNode || isTestRpc) {
            // Parity and TestRpc nodes add the personalMessage prefix itself
            msgHashHex = orderHash;
        } else {
            const orderHashBuff = ethUtil.toBuffer(orderHash);
            const msgHashBuff = ethUtil.hashPersonalMessage(orderHashBuff);
            msgHashHex = ethUtil.bufferToHex(msgHashBuff);
        }

        const signature = await this._web3Wrapper.signTransactionAsync(signerAddress, msgHashHex);

        // HACK: There is no consensus on whether the signatureHex string should be formatted as
        // v + r + s OR r + s + v, and different clients (even different versions of the same client)
        // return the signature params in different orders. In order to support all client implementations,
        // we parse the signature in both ways, and evaluate if either one is a valid signature.
        const validVParamValues = [27, 28];
        const ecSignatureVRS = signatureUtils.parseSignatureHexAsVRS(signature);
        if (_.includes(validVParamValues, ecSignatureVRS.v)) {
            const isValidVRSSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureVRS, signerAddress);
            if (isValidVRSSignature) {
                return ecSignatureVRS;
            }
        }

        const ecSignatureRSV = signatureUtils.parseSignatureHexAsRSV(signature);
        if (_.includes(validVParamValues, ecSignatureRSV.v)) {
            const isValidRSVSignature = WyvernProtocol.isValidSignature(orderHash, ecSignatureRSV, signerAddress);
            if (isValidRSVSignature) {
                return ecSignatureRSV;
            }
        }

        throw new Error(WyvernProtocolError.InvalidSignature);
    }

    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    public async awaitTransactionMinedAsync(
        txHash: string,
        pollingIntervalMs = 1000,
        timeoutMs?: number,
    ): Promise<TransactionReceiptWithDecodedLogs> {
        let timeoutExceeded = false;
        if (timeoutMs) {
            setTimeout(() => (timeoutExceeded = true), timeoutMs);
        }

        const txReceiptPromise = new Promise(
            (resolve: (receipt: TransactionReceiptWithDecodedLogs) => void, reject) => {
                const intervalId = intervalUtils.setAsyncExcludingInterval(async () => {
                    if (timeoutExceeded) {
                        intervalUtils.clearAsyncExcludingInterval(intervalId);
                        return reject(WyvernProtocolError.TransactionMiningTimeout);
                    }

                    const transactionReceipt = await this._web3Wrapper.getTransactionReceiptAsync(txHash);
                    if (!_.isNull(transactionReceipt)) {
                        intervalUtils.clearAsyncExcludingInterval(intervalId);
                        const logsWithDecodedArgs = _.map(
                            transactionReceipt.logs,
                            this._abiDecoder.tryToDecodeLogOrNoop.bind(this._abiDecoder),
                        );
                        const transactionReceiptWithDecodedLogArgs: TransactionReceiptWithDecodedLogs = {
                            ...transactionReceipt,
                            logs: logsWithDecodedArgs,
                        };
                        resolve(transactionReceiptWithDecodedLogArgs);
                    }
                }, pollingIntervalMs, () => ({}));
            },
        );

        return txReceiptPromise;
    }
}
