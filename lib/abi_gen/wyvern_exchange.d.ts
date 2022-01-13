import { EncoderOverrides, ContractFunctionObj, ContractTxFunctionObj, BaseContract } from '@0x/base-contract';
import { BlockRange, ContractAbi, ContractArtifact, DecodedLogArgs, LogWithDecodedArgs, TxData, SupportedProvider } from 'ethereum-types';
import { BigNumber } from '@0x/utils';
import { EventCallback, IndexedFilterValues, SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
export declare type WyvernExchangeEventArgs = WyvernExchangeOrderApprovedPartOneEventArgs | WyvernExchangeOrderApprovedPartTwoEventArgs | WyvernExchangeOrderCancelledEventArgs | WyvernExchangeOrdersMatchedEventArgs | WyvernExchangeOwnershipRenouncedEventArgs | WyvernExchangeOwnershipTransferredEventArgs;
export declare enum WyvernExchangeEvents {
    OrderApprovedPartOne = "OrderApprovedPartOne",
    OrderApprovedPartTwo = "OrderApprovedPartTwo",
    OrderCancelled = "OrderCancelled",
    OrdersMatched = "OrdersMatched",
    OwnershipRenounced = "OwnershipRenounced",
    OwnershipTransferred = "OwnershipTransferred"
}
export interface WyvernExchangeOrderApprovedPartOneEventArgs extends DecodedLogArgs {
    hash: string;
    exchange: string;
    maker: string;
    taker: string;
    makerRelayerFee: BigNumber;
    takerRelayerFee: BigNumber;
    makerProtocolFee: BigNumber;
    takerProtocolFee: BigNumber;
    feeRecipient: string;
    feeMethod: BigNumber;
    side: BigNumber;
    saleKind: BigNumber;
    target: string;
}
export interface WyvernExchangeOrderApprovedPartTwoEventArgs extends DecodedLogArgs {
    hash: string;
    howToCall: BigNumber;
    calldata: string;
    replacementPattern: string;
    staticTarget: string;
    staticExtradata: string;
    paymentToken: string;
    basePrice: BigNumber;
    extra: BigNumber;
    listingTime: BigNumber;
    expirationTime: BigNumber;
    salt: BigNumber;
    orderbookInclusionDesired: boolean;
}
export interface WyvernExchangeOrderCancelledEventArgs extends DecodedLogArgs {
    hash: string;
}
export interface WyvernExchangeOrdersMatchedEventArgs extends DecodedLogArgs {
    buyHash: string;
    sellHash: string;
    maker: string;
    taker: string;
    price: BigNumber;
    metadata: string;
}
export interface WyvernExchangeOwnershipRenouncedEventArgs extends DecodedLogArgs {
    previousOwner: string;
}
export interface WyvernExchangeOwnershipTransferredEventArgs extends DecodedLogArgs {
    previousOwner: string;
    newOwner: string;
}
export declare class WyvernExchangeContract extends BaseContract {
    /**
     * @ignore
     */
    static deployedBytecode: string | undefined;
    static contractName: string;
    private readonly _methodABIIndex;
    private readonly _subscriptionManager;
    static deployFrom0xArtifactAsync(artifact: ContractArtifact | SimpleContractArtifact, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, registryAddress: string, tokenTransferProxyAddress: string, tokenAddress: string, protocolFeeAddress: string): Promise<WyvernExchangeContract>;
    static deployWithLibrariesFrom0xArtifactAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, registryAddress: string, tokenTransferProxyAddress: string, tokenAddress: string, protocolFeeAddress: string): Promise<WyvernExchangeContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: ContractAbi;
    }, registryAddress: string, tokenTransferProxyAddress: string, tokenAddress: string, protocolFeeAddress: string): Promise<WyvernExchangeContract>;
    /**
     * @returns      The contract ABI
     */
    static ABI(): ContractAbi;
    protected static _deployLibrariesAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, web3Wrapper: Web3Wrapper, txDefaults: Partial<TxData>, libraryAddresses?: {
        [libraryName: string]: string;
    }): Promise<{
        [libraryName: string]: string;
    }>;
    getFunctionSignature(methodName: string): string;
    getABIDecodedTransactionData<T>(methodName: string, callData: string): T;
    getABIDecodedReturnData<T>(methodName: string, callData: string): T;
    getSelector(methodName: string): string;
    name(): ContractFunctionObj<string>;
    tokenTransferProxy(): ContractFunctionObj<string>;
    staticCall(target: string, calldata: string, extradata: string): ContractFunctionObj<boolean>;
    changeMinimumMakerProtocolFee(newMinimumMakerProtocolFee: BigNumber): ContractTxFunctionObj<void>;
    changeMinimumTakerProtocolFee(newMinimumTakerProtocolFee: BigNumber): ContractTxFunctionObj<void>;
    guardedArrayReplace(array: string, desired: string, mask: string): ContractFunctionObj<string>;
    minimumTakerProtocolFee(): ContractFunctionObj<BigNumber>;
    codename(): ContractFunctionObj<string>;
    testCopyAddress(addr: string): ContractFunctionObj<string>;
    testCopy(arrToCopy: string): ContractFunctionObj<string>;
    calculateCurrentPrice_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string): ContractFunctionObj<BigNumber>;
    changeProtocolFeeRecipient(newProtocolFeeRecipient: string): ContractTxFunctionObj<void>;
    version(): ContractFunctionObj<string>;
    orderCalldataCanMatch(buyCalldata: string, buyReplacementPattern: string, sellCalldata: string, sellReplacementPattern: string): ContractFunctionObj<boolean>;
    validateOrder_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string, v: number | BigNumber, r: string, s: string): ContractFunctionObj<boolean>;
    calculateFinalPrice(side: number | BigNumber, saleKind: number | BigNumber, basePrice: BigNumber, extra: BigNumber, listingTime: BigNumber, expirationTime: BigNumber): ContractFunctionObj<BigNumber>;
    protocolFeeRecipient(): ContractFunctionObj<string>;
    renounceOwnership(): ContractTxFunctionObj<void>;
    hashOrder_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string): ContractFunctionObj<string>;
    ordersCanMatch_(addrs: string[], uints: BigNumber[], feeMethodsSidesKindsHowToCalls: Array<number | BigNumber>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string): ContractFunctionObj<boolean>;
    approveOrder_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string, orderbookInclusionDesired: boolean): ContractTxFunctionObj<void>;
    registry(): ContractFunctionObj<string>;
    minimumMakerProtocolFee(): ContractFunctionObj<BigNumber>;
    hashToSign_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string): ContractFunctionObj<string>;
    cancelledOrFinalized(index_0: string): ContractFunctionObj<boolean>;
    owner(): ContractFunctionObj<string>;
    exchangeToken(): ContractFunctionObj<string>;
    cancelOrder_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string, v: number | BigNumber, r: string, s: string): ContractTxFunctionObj<void>;
    atomicMatch_(addrs: string[], uints: BigNumber[], feeMethodsSidesKindsHowToCalls: Array<number | BigNumber>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string, vs: Array<number | BigNumber>, rssMetadata: string[]): ContractTxFunctionObj<void>;
    validateOrderParameters_(addrs: string[], uints: BigNumber[], feeMethod: number | BigNumber, side: number | BigNumber, saleKind: number | BigNumber, howToCall: number | BigNumber, calldata: string, replacementPattern: string, staticExtradata: string): ContractFunctionObj<boolean>;
    INVERSE_BASIS_POINT(): ContractFunctionObj<BigNumber>;
    calculateMatchPrice_(addrs: string[], uints: BigNumber[], feeMethodsSidesKindsHowToCalls: Array<number | BigNumber>, calldataBuy: string, calldataSell: string, replacementPatternBuy: string, replacementPatternSell: string, staticExtradataBuy: string, staticExtradataSell: string): ContractFunctionObj<BigNumber>;
    approvedOrders(index_0: string): ContractFunctionObj<boolean>;
    transferOwnership(newOwner: string): ContractTxFunctionObj<void>;
    /**
     * Subscribe to an event type emitted by the WyvernExchange contract.
     * @param eventName The WyvernExchange contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe<ArgsType extends WyvernExchangeEventArgs>(eventName: WyvernExchangeEvents, indexFilterValues: IndexedFilterValues, callback: EventCallback<ArgsType>, isVerbose?: boolean, blockPollingIntervalMs?: number): string;
    /**
     * Cancel a subscription
     * @param subscriptionToken Subscription token returned by `subscribe()`
     */
    unsubscribe(subscriptionToken: string): void;
    /**
     * Cancels all existing subscriptions
     */
    unsubscribeAll(): void;
    /**
     * Gets historical logs without creating a subscription
     * @param eventName The WyvernExchange contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    getLogsAsync<ArgsType extends WyvernExchangeEventArgs>(eventName: WyvernExchangeEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: {
        [contractName: string]: ContractAbi;
    }, deployedBytecode?: string | undefined, encoderOverrides?: Partial<EncoderOverrides>);
}
