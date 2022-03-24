"use strict";
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
exports.WyvernExchangeContract = exports.WyvernExchangeEvents = void 0;
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
const base_contract_1 = require("@0x/base-contract");
const json_schemas_1 = require("@0x/json-schemas");
const utils_1 = require("@0x/utils");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const assert_1 = require("@0x/assert");
const ethers = require("ethers");
var WyvernExchangeEvents;
(function (WyvernExchangeEvents) {
    WyvernExchangeEvents["OrderApprovedPartOne"] = "OrderApprovedPartOne";
    WyvernExchangeEvents["OrderApprovedPartTwo"] = "OrderApprovedPartTwo";
    WyvernExchangeEvents["OrderCancelled"] = "OrderCancelled";
    WyvernExchangeEvents["OrdersMatched"] = "OrdersMatched";
    WyvernExchangeEvents["NonceIncremented"] = "NonceIncremented";
    WyvernExchangeEvents["OwnershipRenounced"] = "OwnershipRenounced";
    WyvernExchangeEvents["OwnershipTransferred"] = "OwnershipTransferred";
})(WyvernExchangeEvents = exports.WyvernExchangeEvents || (exports.WyvernExchangeEvents = {}));
/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
class WyvernExchangeContract extends base_contract_1.BaseContract {
    constructor(address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode = WyvernExchangeContract.deployedBytecode, encoderOverrides) {
        super('WyvernExchange', WyvernExchangeContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode, encoderOverrides);
        this._methodABIIndex = {};
        utils_1.classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new base_contract_1.SubscriptionManager(WyvernExchangeContract.ABI(), this._web3Wrapper);
        WyvernExchangeContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
    static deployFrom0xArtifactAsync(artifact, supportedProvider, txDefaults, logDecodeDependencies, registryAddress, tokenTransferProxyAddress, tokenAddress, protocolFeeAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            if (artifact.compilerOutput === undefined) {
                throw new Error('Compiler output not found in the artifact file');
            }
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const bytecode = artifact.compilerOutput.evm.bytecode.object;
            const abi = artifact.compilerOutput.abi;
            const logDecodeDependenciesAbiOnly = {};
            if (Object.keys(logDecodeDependencies) !== undefined) {
                for (const key of Object.keys(logDecodeDependencies)) {
                    logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
                }
            }
            return WyvernExchangeContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, registryAddress, tokenTransferProxyAddress, tokenAddress, protocolFeeAddress);
        });
    }
    static deployWithLibrariesFrom0xArtifactAsync(artifact, libraryArtifacts, supportedProvider, txDefaults, logDecodeDependencies, registryAddress, tokenTransferProxyAddress, tokenAddress, protocolFeeAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            if (artifact.compilerOutput === undefined) {
                throw new Error('Compiler output not found in the artifact file');
            }
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const abi = artifact.compilerOutput.abi;
            const logDecodeDependenciesAbiOnly = {};
            if (Object.keys(logDecodeDependencies) !== undefined) {
                for (const key of Object.keys(logDecodeDependencies)) {
                    logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
                }
            }
            const libraryAddresses = yield WyvernExchangeContract._deployLibrariesAsync(artifact, libraryArtifacts, new web3_wrapper_1.Web3Wrapper(provider), txDefaults);
            const bytecode = (0, base_contract_1.linkLibrariesInBytecode)(artifact, libraryAddresses);
            return WyvernExchangeContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, registryAddress, tokenTransferProxyAddress, tokenAddress, protocolFeeAddress);
        });
    }
    static deployAsync(bytecode, abi, supportedProvider, txDefaults, logDecodeDependencies, registryAddress, tokenTransferProxyAddress, tokenAddress, protocolFeeAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.isHexString('bytecode', bytecode);
            assert_1.assert.doesConformToSchema('txDefaults', txDefaults, json_schemas_1.schemas.txDataSchema);
            const provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
            const constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
            [registryAddress,
                tokenTransferProxyAddress,
                tokenAddress,
                protocolFeeAddress
            ] = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [registryAddress,
                tokenTransferProxyAddress,
                tokenAddress,
                protocolFeeAddress
            ], base_contract_1.BaseContract._bigNumberToString);
            const iface = new ethers.utils.Interface(abi);
            const deployInfo = iface.deployFunction;
            const txData = deployInfo.encode(bytecode, [registryAddress,
                tokenTransferProxyAddress,
                tokenAddress,
                protocolFeeAddress
            ]);
            const web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
            const txDataWithDefaults = yield base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync(Object.assign({ data: txData }, txDefaults), web3Wrapper.estimateGasAsync.bind(web3Wrapper));
            const txHash = yield web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            utils_1.logUtils.log(`transactionHash: ${txHash}`);
            const txReceipt = yield web3Wrapper.awaitTransactionSuccessAsync(txHash);
            utils_1.logUtils.log(`WyvernExchange successfully deployed at ${txReceipt.contractAddress}`);
            const contractInstance = new WyvernExchangeContract(txReceipt.contractAddress, provider, txDefaults, logDecodeDependencies);
            contractInstance.constructorArgs = [registryAddress,
                tokenTransferProxyAddress,
                tokenAddress,
                protocolFeeAddress
            ];
            return contractInstance;
        });
    }
    /**
     * @returns      The contract ABI
     */
    static ABI() {
        const abi = [
            {
                constant: true,
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'tokenTransferProxy',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'target',
                        type: 'address',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'extradata',
                        type: 'bytes',
                    },
                ],
                name: 'staticCall',
                outputs: [
                    {
                        name: 'result',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'newMinimumMakerProtocolFee',
                        type: 'uint256',
                    },
                ],
                name: 'changeMinimumMakerProtocolFee',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'newMinimumTakerProtocolFee',
                        type: 'uint256',
                    },
                ],
                name: 'changeMinimumTakerProtocolFee',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'array',
                        type: 'bytes',
                    },
                    {
                        name: 'desired',
                        type: 'bytes',
                    },
                    {
                        name: 'mask',
                        type: 'bytes',
                    },
                ],
                name: 'guardedArrayReplace',
                outputs: [
                    {
                        name: '',
                        type: 'bytes',
                    },
                ],
                payable: false,
                stateMutability: 'pure',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'minimumTakerProtocolFee',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'codename',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'DOMAIN_SEPARATOR',
                outputs: [
                    {
                        name: '',
                        type: 'bytes32',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                ],
                name: 'calculateCurrentPrice_',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'newProtocolFeeRecipient',
                        type: 'address',
                    },
                ],
                name: 'changeProtocolFeeRecipient',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'version',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'buyCalldata',
                        type: 'bytes',
                    },
                    {
                        name: 'buyReplacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'sellCalldata',
                        type: 'bytes',
                    },
                    {
                        name: 'sellReplacementPattern',
                        type: 'bytes',
                    },
                ],
                name: 'orderCalldataCanMatch',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'pure',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                ],
                name: 'validateOrder_',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [],
                name: 'incrementNonce',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'basePrice',
                        type: 'uint256',
                    },
                    {
                        name: 'extra',
                        type: 'uint256',
                    },
                    {
                        name: 'listingTime',
                        type: 'uint256',
                    },
                    {
                        name: 'expirationTime',
                        type: 'uint256',
                    },
                ],
                name: 'calculateFinalPrice',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'protocolFeeRecipient',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [],
                name: 'renounceOwnership',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                ],
                name: 'hashOrder_',
                outputs: [
                    {
                        name: '',
                        type: 'bytes32',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[14]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[18]',
                    },
                    {
                        name: 'feeMethodsSidesKindsHowToCalls',
                        type: 'uint8[8]',
                    },
                    {
                        name: 'calldataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'calldataSell',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternSell',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataSell',
                        type: 'bytes',
                    },
                ],
                name: 'ordersCanMatch_',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                    {
                        name: 'orderbookInclusionDesired',
                        type: 'bool',
                    },
                ],
                name: 'approveOrder_',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'registry',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'minimumMakerProtocolFee',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                ],
                name: 'hashToSign_',
                outputs: [
                    {
                        name: '',
                        type: 'bytes32',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'index_0',
                        type: 'address',
                    },
                ],
                name: 'nonces',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'index_0',
                        type: 'bytes32',
                    },
                ],
                name: 'cancelledOrFinalized',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'owner',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'exchangeToken',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                ],
                name: 'cancelOrder_',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[14]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[18]',
                    },
                    {
                        name: 'feeMethodsSidesKindsHowToCalls',
                        type: 'uint8[8]',
                    },
                    {
                        name: 'calldataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'calldataSell',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternSell',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataSell',
                        type: 'bytes',
                    },
                    {
                        name: 'vs',
                        type: 'uint8[2]',
                    },
                    {
                        name: 'rssMetadata',
                        type: 'bytes32[5]',
                    },
                ],
                name: 'atomicMatch_',
                outputs: [],
                payable: true,
                stateMutability: 'payable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                ],
                name: 'validateOrderParameters_',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'INVERSE_BASIS_POINT',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[14]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[18]',
                    },
                    {
                        name: 'feeMethodsSidesKindsHowToCalls',
                        type: 'uint8[8]',
                    },
                    {
                        name: 'calldataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'calldataSell',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPatternSell',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataBuy',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradataSell',
                        type: 'bytes',
                    },
                ],
                name: 'calculateMatchPrice_',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                    },
                ],
                name: 'approvedOrders',
                outputs: [
                    {
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'transferOwnership',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    {
                        name: 'addrs',
                        type: 'address[7]',
                    },
                    {
                        name: 'uints',
                        type: 'uint256[9]',
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                    },
                    {
                        name: 'v',
                        type: 'uint8',
                    },
                    {
                        name: 'r',
                        type: 'bytes32',
                    },
                    {
                        name: 's',
                        type: 'bytes32',
                    },
                    {
                        name: 'nonce',
                        type: 'uint256',
                    },
                ],
                name: 'cancelOrderWithNonce_',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        name: 'registryAddress',
                        type: 'address',
                    },
                    {
                        name: 'tokenTransferProxyAddress',
                        type: 'address',
                    },
                    {
                        name: 'tokenAddress',
                        type: 'address',
                    },
                    {
                        name: 'protocolFeeAddress',
                        type: 'address',
                    },
                ],
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                        indexed: true,
                    },
                    {
                        name: 'exchange',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'maker',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'taker',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'makerRelayerFee',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'takerRelayerFee',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'makerProtocolFee',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'takerProtocolFee',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'feeRecipient',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'feeMethod',
                        type: 'uint8',
                        indexed: false,
                    },
                    {
                        name: 'side',
                        type: 'uint8',
                        indexed: false,
                    },
                    {
                        name: 'saleKind',
                        type: 'uint8',
                        indexed: false,
                    },
                    {
                        name: 'target',
                        type: 'address',
                        indexed: false,
                    },
                ],
                name: 'OrderApprovedPartOne',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                        indexed: true,
                    },
                    {
                        name: 'howToCall',
                        type: 'uint8',
                        indexed: false,
                    },
                    {
                        name: 'calldata',
                        type: 'bytes',
                        indexed: false,
                    },
                    {
                        name: 'replacementPattern',
                        type: 'bytes',
                        indexed: false,
                    },
                    {
                        name: 'staticTarget',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'staticExtradata',
                        type: 'bytes',
                        indexed: false,
                    },
                    {
                        name: 'paymentToken',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'basePrice',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'extra',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'listingTime',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'expirationTime',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'salt',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'orderbookInclusionDesired',
                        type: 'bool',
                        indexed: false,
                    },
                ],
                name: 'OrderApprovedPartTwo',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'hash',
                        type: 'bytes32',
                        indexed: true,
                    },
                ],
                name: 'OrderCancelled',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'buyHash',
                        type: 'bytes32',
                        indexed: false,
                    },
                    {
                        name: 'sellHash',
                        type: 'bytes32',
                        indexed: false,
                    },
                    {
                        name: 'maker',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'taker',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'price',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'metadata',
                        type: 'bytes32',
                        indexed: true,
                    },
                ],
                name: 'OrdersMatched',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'maker',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'newNonce',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'NonceIncremented',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'previousOwner',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'OwnershipRenounced',
                outputs: [],
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        name: 'previousOwner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'newOwner',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'OwnershipTransferred',
                outputs: [],
                type: 'event',
            },
        ];
        return abi;
    }
    static _deployLibrariesAsync(artifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = artifact.compilerOutput.evm.bytecode.linkReferences;
            // Go through all linked libraries, recursively deploying them if necessary.
            for (const link of Object.values(links)) {
                for (const libraryName of Object.keys(link)) {
                    if (!libraryAddresses[libraryName]) {
                        // Library not yet deployed.
                        const libraryArtifact = libraryArtifacts[libraryName];
                        if (!libraryArtifact) {
                            throw new Error(`Missing artifact for linked library "${libraryName}"`);
                        }
                        // Deploy any dependent libraries used by this library.
                        yield WyvernExchangeContract._deployLibrariesAsync(libraryArtifact, libraryArtifacts, web3Wrapper, txDefaults, libraryAddresses);
                        // Deploy this library.
                        const linkedLibraryBytecode = (0, base_contract_1.linkLibrariesInBytecode)(libraryArtifact, libraryAddresses);
                        const txDataWithDefaults = yield base_contract_1.BaseContract._applyDefaultsToContractTxDataAsync(Object.assign({ data: linkedLibraryBytecode }, txDefaults), web3Wrapper.estimateGasAsync.bind(web3Wrapper));
                        const txHash = yield web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                        utils_1.logUtils.log(`transactionHash: ${txHash}`);
                        const { contractAddress } = yield web3Wrapper.awaitTransactionSuccessAsync(txHash);
                        utils_1.logUtils.log(`${libraryArtifact.contractName} successfully deployed at ${contractAddress}`);
                        libraryAddresses[libraryArtifact.contractName] = contractAddress;
                    }
                }
            }
            return libraryAddresses;
        });
    }
    getFunctionSignature(methodName) {
        const index = this._methodABIIndex[methodName];
        const methodAbi = WyvernExchangeContract.ABI()[index]; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = (0, base_contract_1.methodAbiToFunctionSignature)(methodAbi);
        return functionSignature;
    }
    getABIDecodedTransactionData(methodName, callData) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode(callData);
        return abiDecodedCallData;
    }
    getABIDecodedReturnData(methodName, callData) {
        if (this._encoderOverrides.decodeOutput) {
            return this._encoderOverrides.decodeOutput(methodName, callData);
        }
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue(callData);
        return abiDecodedCallData;
    }
    getSelector(methodName) {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = this;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }
    name() {
        const self = this;
        const functionSignature = 'name()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    tokenTransferProxy() {
        const self = this;
        const functionSignature = 'tokenTransferProxy()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    staticCall(target, calldata, extradata) {
        const self = this;
        assert_1.assert.isString('target', target);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('extradata', extradata);
        const functionSignature = 'staticCall(address,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [target.toLowerCase(),
                    calldata,
                    extradata
                ]);
            },
        };
    }
    changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee) {
        const self = this;
        assert_1.assert.isBigNumber('newMinimumMakerProtocolFee', newMinimumMakerProtocolFee);
        const functionSignature = 'changeMinimumMakerProtocolFee(uint256)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [newMinimumMakerProtocolFee
                ]);
            },
        };
    }
    changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee) {
        const self = this;
        assert_1.assert.isBigNumber('newMinimumTakerProtocolFee', newMinimumTakerProtocolFee);
        const functionSignature = 'changeMinimumTakerProtocolFee(uint256)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [newMinimumTakerProtocolFee
                ]);
            },
        };
    }
    guardedArrayReplace(array, desired, mask) {
        const self = this;
        assert_1.assert.isString('array', array);
        assert_1.assert.isString('desired', desired);
        assert_1.assert.isString('mask', mask);
        const functionSignature = 'guardedArrayReplace(bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    let rawCallResult;
                    if (self._deployedBytecodeIfExists) {
                        rawCallResult = yield self._evmExecAsync(this.getABIEncodedTransactionData());
                    }
                    else {
                        rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    }
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [array,
                    desired,
                    mask
                ]);
            },
        };
    }
    minimumTakerProtocolFee() {
        const self = this;
        const functionSignature = 'minimumTakerProtocolFee()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    codename() {
        const self = this;
        const functionSignature = 'codename()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    DOMAIN_SEPARATOR() {
        const self = this;
        const functionSignature = 'DOMAIN_SEPARATOR()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    calculateCurrentPrice_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        const functionSignature = 'calculateCurrentPrice_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata
                ]);
            },
        };
    }
    changeProtocolFeeRecipient(newProtocolFeeRecipient) {
        const self = this;
        assert_1.assert.isString('newProtocolFeeRecipient', newProtocolFeeRecipient);
        const functionSignature = 'changeProtocolFeeRecipient(address)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [newProtocolFeeRecipient.toLowerCase()
                ]);
            },
        };
    }
    version() {
        const self = this;
        const functionSignature = 'version()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    orderCalldataCanMatch(buyCalldata, buyReplacementPattern, sellCalldata, sellReplacementPattern) {
        const self = this;
        assert_1.assert.isString('buyCalldata', buyCalldata);
        assert_1.assert.isString('buyReplacementPattern', buyReplacementPattern);
        assert_1.assert.isString('sellCalldata', sellCalldata);
        assert_1.assert.isString('sellReplacementPattern', sellReplacementPattern);
        const functionSignature = 'orderCalldataCanMatch(bytes,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    let rawCallResult;
                    if (self._deployedBytecodeIfExists) {
                        rawCallResult = yield self._evmExecAsync(this.getABIEncodedTransactionData());
                    }
                    else {
                        rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    }
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [buyCalldata,
                    buyReplacementPattern,
                    sellCalldata,
                    sellReplacementPattern
                ]);
            },
        };
    }
    validateOrder_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata, v, r, s) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        const functionSignature = 'validateOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,uint8,bytes32,bytes32)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata,
                    v,
                    r,
                    s
                ]);
            },
        };
    }
    incrementNonce() {
        const self = this;
        const functionSignature = 'incrementNonce()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    calculateFinalPrice(side, saleKind, basePrice, extra, listingTime, expirationTime) {
        const self = this;
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isBigNumber('basePrice', basePrice);
        assert_1.assert.isBigNumber('extra', extra);
        assert_1.assert.isBigNumber('listingTime', listingTime);
        assert_1.assert.isBigNumber('expirationTime', expirationTime);
        const functionSignature = 'calculateFinalPrice(uint8,uint8,uint256,uint256,uint256,uint256)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [side,
                    saleKind,
                    basePrice,
                    extra,
                    listingTime,
                    expirationTime
                ]);
            },
        };
    }
    protocolFeeRecipient() {
        const self = this;
        const functionSignature = 'protocolFeeRecipient()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    renounceOwnership() {
        const self = this;
        const functionSignature = 'renounceOwnership()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    hashOrder_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        const functionSignature = 'hashOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata
                ]);
            },
        };
    }
    ordersCanMatch_(addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isArray('feeMethodsSidesKindsHowToCalls', feeMethodsSidesKindsHowToCalls);
        assert_1.assert.isString('calldataBuy', calldataBuy);
        assert_1.assert.isString('calldataSell', calldataSell);
        assert_1.assert.isString('replacementPatternBuy', replacementPatternBuy);
        assert_1.assert.isString('replacementPatternSell', replacementPatternSell);
        assert_1.assert.isString('staticExtradataBuy', staticExtradataBuy);
        assert_1.assert.isString('staticExtradataSell', staticExtradataSell);
        const functionSignature = 'ordersCanMatch_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethodsSidesKindsHowToCalls,
                    calldataBuy,
                    calldataSell,
                    replacementPatternBuy,
                    replacementPatternSell,
                    staticExtradataBuy,
                    staticExtradataSell
                ]);
            },
        };
    }
    approveOrder_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata, orderbookInclusionDesired) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        assert_1.assert.isBoolean('orderbookInclusionDesired', orderbookInclusionDesired);
        const functionSignature = 'approveOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,bool)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata,
                    orderbookInclusionDesired
                ]);
            },
        };
    }
    registry() {
        const self = this;
        const functionSignature = 'registry()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    minimumMakerProtocolFee() {
        const self = this;
        const functionSignature = 'minimumMakerProtocolFee()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    hashToSign_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        const functionSignature = 'hashToSign_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata
                ]);
            },
        };
    }
    nonces(index_0) {
        const self = this;
        assert_1.assert.isString('index_0', index_0);
        const functionSignature = 'nonces(address)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [index_0.toLowerCase()
                ]);
            },
        };
    }
    cancelledOrFinalized(index_0) {
        const self = this;
        assert_1.assert.isString('index_0', index_0);
        const functionSignature = 'cancelledOrFinalized(bytes32)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [index_0
                ]);
            },
        };
    }
    owner() {
        const self = this;
        const functionSignature = 'owner()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    exchangeToken() {
        const self = this;
        const functionSignature = 'exchangeToken()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    cancelOrder_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata, v, r, s) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        const functionSignature = 'cancelOrder_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,uint8,bytes32,bytes32)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata,
                    v,
                    r,
                    s
                ]);
            },
        };
    }
    atomicMatch_(addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell, vs, rssMetadata) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isArray('feeMethodsSidesKindsHowToCalls', feeMethodsSidesKindsHowToCalls);
        assert_1.assert.isString('calldataBuy', calldataBuy);
        assert_1.assert.isString('calldataSell', calldataSell);
        assert_1.assert.isString('replacementPatternBuy', replacementPatternBuy);
        assert_1.assert.isString('replacementPatternSell', replacementPatternSell);
        assert_1.assert.isString('staticExtradataBuy', staticExtradataBuy);
        assert_1.assert.isString('staticExtradataSell', staticExtradataSell);
        assert_1.assert.isArray('vs', vs);
        assert_1.assert.isArray('rssMetadata', rssMetadata);
        const functionSignature = 'atomicMatch_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes,uint8[2],bytes32[5])';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethodsSidesKindsHowToCalls,
                    calldataBuy,
                    calldataSell,
                    replacementPatternBuy,
                    replacementPatternSell,
                    staticExtradataBuy,
                    staticExtradataSell,
                    vs,
                    rssMetadata
                ]);
            },
        };
    }
    validateOrderParameters_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        const functionSignature = 'validateOrderParameters_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata
                ]);
            },
        };
    }
    INVERSE_BASIS_POINT() {
        const self = this;
        const functionSignature = 'INVERSE_BASIS_POINT()';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, []);
            },
        };
    }
    calculateMatchPrice_(addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isArray('feeMethodsSidesKindsHowToCalls', feeMethodsSidesKindsHowToCalls);
        assert_1.assert.isString('calldataBuy', calldataBuy);
        assert_1.assert.isString('calldataSell', calldataSell);
        assert_1.assert.isString('replacementPatternBuy', replacementPatternBuy);
        assert_1.assert.isString('replacementPatternSell', replacementPatternSell);
        assert_1.assert.isString('staticExtradataBuy', staticExtradataBuy);
        assert_1.assert.isString('staticExtradataSell', staticExtradataSell);
        const functionSignature = 'calculateMatchPrice_(address[14],uint256[18],uint8[8],bytes,bytes,bytes,bytes,bytes,bytes)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethodsSidesKindsHowToCalls,
                    calldataBuy,
                    calldataSell,
                    replacementPatternBuy,
                    replacementPatternSell,
                    staticExtradataBuy,
                    staticExtradataSell
                ]);
            },
        };
    }
    approvedOrders(hash) {
        const self = this;
        assert_1.assert.isString('hash', hash);
        const functionSignature = 'approvedOrders(bytes32)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [hash
                ]);
            },
        };
    }
    transferOwnership(newOwner) {
        const self = this;
        assert_1.assert.isString('newOwner', newOwner);
        const functionSignature = 'transferOwnership(address)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [newOwner.toLowerCase()
                ]);
            },
        };
    }
    cancelOrderWithNonce_(addrs, uints, feeMethod, side, saleKind, howToCall, calldata, replacementPattern, staticExtradata, v, r, s, nonce) {
        const self = this;
        assert_1.assert.isArray('addrs', addrs);
        assert_1.assert.isArray('uints', uints);
        assert_1.assert.isNumberOrBigNumber('feeMethod', feeMethod);
        assert_1.assert.isNumberOrBigNumber('side', side);
        assert_1.assert.isNumberOrBigNumber('saleKind', saleKind);
        assert_1.assert.isNumberOrBigNumber('howToCall', howToCall);
        assert_1.assert.isString('calldata', calldata);
        assert_1.assert.isString('replacementPattern', replacementPattern);
        assert_1.assert.isString('staticExtradata', staticExtradata);
        assert_1.assert.isNumberOrBigNumber('v', v);
        assert_1.assert.isString('r', r);
        assert_1.assert.isString('s', s);
        assert_1.assert.isBigNumber('nonce', nonce);
        const functionSignature = 'cancelOrderWithNonce_(address[7],uint256[9],uint8,uint8,uint8,uint8,bytes,bytes,bytes,uint8,bytes32,bytes32,uint256)';
        const selector = self._lookupAbiEncoder(functionSignature).getSelector();
        return {
            selector,
            sendTransactionAsync(txData, opts = { shouldValidate: true }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData), this.estimateGasAsync.bind(this));
                    if (opts.shouldValidate !== false) {
                        yield this.callAsync(txDataWithDefaults);
                    }
                    return self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                });
            },
            awaitTransactionSuccessAsync(txData, opts = { shouldValidate: true }) {
                return self._promiseWithTransactionHash(this.sendTransactionAsync(txData, opts), opts);
            },
            estimateGasAsync(txData) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
                });
            },
            createAccessListAsync(txData, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    const txDataWithDefaults = yield self._applyDefaultsToTxDataAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, txData));
                    return self._web3Wrapper.createAccessListAsync(txDataWithDefaults, defaultBlock);
                });
            },
            callAsync(callData = {}, defaultBlock) {
                return __awaiter(this, void 0, void 0, function* () {
                    base_contract_1.BaseContract._assertCallParams(callData, defaultBlock);
                    const rawCallResult = yield self._performCallAsync(Object.assign({ data: this.getABIEncodedTransactionData() }, callData), defaultBlock);
                    const abiEncoder = self._lookupAbiEncoder(functionSignature);
                    base_contract_1.BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                    return abiEncoder.strictDecodeReturnValue(rawCallResult);
                });
            },
            getABIEncodedTransactionData() {
                return self._strictEncodeArguments(functionSignature, [addrs,
                    uints,
                    feeMethod,
                    side,
                    saleKind,
                    howToCall,
                    calldata,
                    replacementPattern,
                    staticExtradata,
                    v,
                    r,
                    s,
                    nonce
                ]);
            },
        };
    }
    /**
     * Subscribe to an event type emitted by the WyvernExchange contract.
     * @param eventName The WyvernExchange contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe(eventName, indexFilterValues, callback, isVerbose = false, blockPollingIntervalMs) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, WyvernExchangeEvents);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        assert_1.assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe(this.address, eventName, indexFilterValues, WyvernExchangeContract.ABI(), callback, isVerbose, blockPollingIntervalMs);
        return subscriptionToken;
    }
    /**
     * Cancel a subscription
     * @param subscriptionToken Subscription token returned by `subscribe()`
     */
    unsubscribe(subscriptionToken) {
        this._subscriptionManager.unsubscribe(subscriptionToken);
    }
    /**
     * Cancels all existing subscriptions
     */
    unsubscribeAll() {
        this._subscriptionManager.unsubscribeAll();
    }
    /**
     * Gets historical logs without creating a subscription
     * @param eventName The WyvernExchange contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    getLogsAsync(eventName, blockRange, indexFilterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.assert.doesBelongToStringEnum('eventName', eventName, WyvernExchangeEvents);
            assert_1.assert.doesConformToSchema('blockRange', blockRange, json_schemas_1.schemas.blockRangeSchema);
            assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
            const logs = yield this._subscriptionManager.getLogsAsync(this.address, eventName, blockRange, indexFilterValues, WyvernExchangeContract.ABI());
            return logs;
        });
    }
}
exports.WyvernExchangeContract = WyvernExchangeContract;
WyvernExchangeContract.contractName = 'WyvernExchange';
// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
//# sourceMappingURL=wyvern_exchange.js.map