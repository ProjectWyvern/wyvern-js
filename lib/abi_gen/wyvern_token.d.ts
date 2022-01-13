import { EncoderOverrides, ContractFunctionObj, ContractTxFunctionObj, BaseContract } from '@0x/base-contract';
import { BlockRange, ContractAbi, ContractArtifact, DecodedLogArgs, LogWithDecodedArgs, TxData, SupportedProvider } from 'ethereum-types';
import { BigNumber } from '@0x/utils';
import { EventCallback, IndexedFilterValues, SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
export declare type WyvernTokenEventArgs = WyvernTokenBurnEventArgs | WyvernTokenUTXORedeemedEventArgs | WyvernTokenTokensReleasedEventArgs | WyvernTokenApprovalEventArgs | WyvernTokenTransferEventArgs;
export declare enum WyvernTokenEvents {
    Burn = "Burn",
    UTXORedeemed = "UTXORedeemed",
    TokensReleased = "TokensReleased",
    Approval = "Approval",
    Transfer = "Transfer"
}
export interface WyvernTokenBurnEventArgs extends DecodedLogArgs {
    burner: string;
    value: BigNumber;
}
export interface WyvernTokenUTXORedeemedEventArgs extends DecodedLogArgs {
    txid: string;
    outputIndex: BigNumber;
    satoshis: BigNumber;
    proof: string[];
    pubKey: string;
    v: BigNumber;
    r: string;
    s: string;
    redeemer: string;
    numberOfTokens: BigNumber;
}
export interface WyvernTokenTokensReleasedEventArgs extends DecodedLogArgs {
    destination: string;
    numberOfTokens: BigNumber;
}
export interface WyvernTokenApprovalEventArgs extends DecodedLogArgs {
    owner: string;
    spender: string;
    value: BigNumber;
}
export interface WyvernTokenTransferEventArgs extends DecodedLogArgs {
    from: string;
    to: string;
    value: BigNumber;
}
export declare class WyvernTokenContract extends BaseContract {
    /**
     * @ignore
     */
    static deployedBytecode: string | undefined;
    static contractName: string;
    private readonly _methodABIIndex;
    private readonly _subscriptionManager;
    static deployFrom0xArtifactAsync(artifact: ContractArtifact | SimpleContractArtifact, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, merkleRoot: string, totalUtxoAmount: BigNumber): Promise<WyvernTokenContract>;
    static deployWithLibrariesFrom0xArtifactAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, merkleRoot: string, totalUtxoAmount: BigNumber): Promise<WyvernTokenContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: ContractAbi;
    }, merkleRoot: string, totalUtxoAmount: BigNumber): Promise<WyvernTokenContract>;
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
    MULTIPLIER(): ContractFunctionObj<BigNumber>;
    name(): ContractFunctionObj<string>;
    maximumRedeemable(): ContractFunctionObj<BigNumber>;
    approve(_spender: string, _value: BigNumber): ContractTxFunctionObj<boolean>;
    totalSupply(): ContractFunctionObj<BigNumber>;
    multiplier(): ContractFunctionObj<BigNumber>;
    transferFrom(_from: string, _to: string, _value: BigNumber): ContractTxFunctionObj<boolean>;
    decimals(): ContractFunctionObj<BigNumber>;
    burn(_value: BigNumber): ContractTxFunctionObj<void>;
    pubKeyToEthereumAddress(pubKey: string): ContractFunctionObj<string>;
    MINT_AMOUNT(): ContractFunctionObj<BigNumber>;
    decreaseApproval(_spender: string, _subtractedValue: BigNumber): ContractTxFunctionObj<boolean>;
    balanceOf(_owner: string): ContractFunctionObj<BigNumber>;
    redeemUTXO(txid: string, outputIndex: number | BigNumber, satoshis: BigNumber, proof: string[], pubKey: string, isCompressed: boolean, v: number | BigNumber, r: string, s: string): ContractTxFunctionObj<BigNumber>;
    canRedeemUTXOHash(merkleLeafHash: string, proof: string[]): ContractFunctionObj<boolean>;
    releaseTokens(destination: string): ContractTxFunctionObj<void>;
    symbol(): ContractFunctionObj<string>;
    transfer(_to: string, _value: BigNumber): ContractTxFunctionObj<boolean>;
    validateSignature(hash: string, v: number | BigNumber, r: string, s: string, expected: string): ContractFunctionObj<boolean>;
    verifyProof(proof: string[], merkleLeafHash: string): ContractFunctionObj<boolean>;
    canRedeemUTXO(txid: string, originalAddress: string, outputIndex: number | BigNumber, satoshis: BigNumber, proof: string[]): ContractFunctionObj<boolean>;
    ecdsaVerify(addr: string, pubKey: string, v: number | BigNumber, r: string, s: string): ContractFunctionObj<boolean>;
    increaseApproval(_spender: string, _addedValue: BigNumber): ContractTxFunctionObj<boolean>;
    allowance(_owner: string, _spender: string): ContractFunctionObj<BigNumber>;
    pubKeyToBitcoinAddress(pubKey: string, isCompressed: boolean): ContractFunctionObj<string>;
    rootUTXOMerkleTreeHash(): ContractFunctionObj<string>;
    totalRedeemed(): ContractFunctionObj<BigNumber>;
    SATS_TO_TOKENS(): ContractFunctionObj<BigNumber>;
    /**
     * Subscribe to an event type emitted by the WyvernToken contract.
     * @param eventName The WyvernToken contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe<ArgsType extends WyvernTokenEventArgs>(eventName: WyvernTokenEvents, indexFilterValues: IndexedFilterValues, callback: EventCallback<ArgsType>, isVerbose?: boolean, blockPollingIntervalMs?: number): string;
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
     * @param eventName The WyvernToken contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    getLogsAsync<ArgsType extends WyvernTokenEventArgs>(eventName: WyvernTokenEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: {
        [contractName: string]: ContractAbi;
    }, deployedBytecode?: string | undefined, encoderOverrides?: Partial<EncoderOverrides>);
}
