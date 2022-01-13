import { EncoderOverrides, ContractFunctionObj, ContractTxFunctionObj, BaseContract } from '@0x/base-contract';
import { BlockRange, ContractAbi, ContractArtifact, DecodedLogArgs, LogWithDecodedArgs, TxData, SupportedProvider } from 'ethereum-types';
import { BigNumber } from '@0x/utils';
import { EventCallback, IndexedFilterValues, SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
export declare type WyvernDAOEventArgs = WyvernDAOProposalAddedEventArgs | WyvernDAOVotedEventArgs | WyvernDAOProposalTalliedEventArgs | WyvernDAOChangeOfRulesEventArgs | WyvernDAOTokensDelegatedEventArgs | WyvernDAOTokensUndelegatedEventArgs | WyvernDAOReceivedEtherEventArgs | WyvernDAOReceivedTokensEventArgs;
export declare enum WyvernDAOEvents {
    ProposalAdded = "ProposalAdded",
    Voted = "Voted",
    ProposalTallied = "ProposalTallied",
    ChangeOfRules = "ChangeOfRules",
    TokensDelegated = "TokensDelegated",
    TokensUndelegated = "TokensUndelegated",
    ReceivedEther = "ReceivedEther",
    ReceivedTokens = "ReceivedTokens"
}
export interface WyvernDAOProposalAddedEventArgs extends DecodedLogArgs {
    proposalID: BigNumber;
    recipient: string;
    amount: BigNumber;
    metadataHash: string;
}
export interface WyvernDAOVotedEventArgs extends DecodedLogArgs {
    proposalID: BigNumber;
    position: boolean;
    voter: string;
}
export interface WyvernDAOProposalTalliedEventArgs extends DecodedLogArgs {
    proposalID: BigNumber;
    yea: BigNumber;
    nay: BigNumber;
    quorum: BigNumber;
    active: boolean;
}
export interface WyvernDAOChangeOfRulesEventArgs extends DecodedLogArgs {
    newMinimumQuorum: BigNumber;
    newDebatingPeriodInMinutes: BigNumber;
    newSharesTokenAddress: string;
}
export interface WyvernDAOTokensDelegatedEventArgs extends DecodedLogArgs {
    delegator: string;
    numberOfTokens: BigNumber;
    delegate: string;
}
export interface WyvernDAOTokensUndelegatedEventArgs extends DecodedLogArgs {
    delegator: string;
    numberOfTokens: BigNumber;
    delegate: string;
}
export interface WyvernDAOReceivedEtherEventArgs extends DecodedLogArgs {
    sender: string;
    amount: BigNumber;
}
export interface WyvernDAOReceivedTokensEventArgs extends DecodedLogArgs {
    from: string;
    value: BigNumber;
    token: string;
    extraData: string;
}
export declare class WyvernDAOContract extends BaseContract {
    /**
     * @ignore
     */
    static deployedBytecode: string | undefined;
    static contractName: string;
    private readonly _methodABIIndex;
    private readonly _subscriptionManager;
    static deployFrom0xArtifactAsync(artifact: ContractArtifact | SimpleContractArtifact, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, sharesAddress: string): Promise<WyvernDAOContract>;
    static deployWithLibrariesFrom0xArtifactAsync(artifact: ContractArtifact, libraryArtifacts: {
        [libraryName: string]: ContractArtifact;
    }, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: (ContractArtifact | SimpleContractArtifact);
    }, sharesAddress: string): Promise<WyvernDAOContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, supportedProvider: SupportedProvider, txDefaults: Partial<TxData>, logDecodeDependencies: {
        [contractName: string]: ContractAbi;
    }, sharesAddress: string): Promise<WyvernDAOContract>;
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
    proposals(index_0: BigNumber): ContractFunctionObj<[string, BigNumber, string, BigNumber, BigNumber, boolean, boolean, BigNumber, string]>;
    delegatesByDelegator(index_0: string): ContractFunctionObj<string>;
    name(): ContractFunctionObj<string>;
    REQUIRED_SHARES_TO_BE_BOARD_MEMBER(): ContractFunctionObj<BigNumber>;
    lockedDelegatingTokens(index_0: string): ContractFunctionObj<BigNumber>;
    countVotes(proposalNumber: BigNumber): ContractFunctionObj<[BigNumber, BigNumber, BigNumber]>;
    executeProposal(proposalNumber: BigNumber, transactionBytecode: string): ContractTxFunctionObj<void>;
    sharesTokenAddress(): ContractFunctionObj<string>;
    delegatedAmountsByDelegate(index_0: string): ContractFunctionObj<BigNumber>;
    numProposals(): ContractFunctionObj<BigNumber>;
    hasVoted(proposalNumber: BigNumber, shareholder: string): ContractFunctionObj<boolean>;
    TOKEN_DECIMALS(): ContractFunctionObj<BigNumber>;
    setDelegateAndLockTokens(tokensToLock: BigNumber, delegate: string): ContractTxFunctionObj<void>;
    clearDelegateAndUnlockTokens(): ContractTxFunctionObj<BigNumber>;
    debatingPeriodInMinutes(): ContractFunctionObj<BigNumber>;
    changeVotingRules(minimumSharesToPassAVote: BigNumber, minutesForDebate: BigNumber, sharesToBeBoardMember: BigNumber): ContractTxFunctionObj<void>;
    minimumQuorum(): ContractFunctionObj<BigNumber>;
    receiveApproval(from: string, value: BigNumber, token: string, extraData: string): ContractTxFunctionObj<void>;
    tokenLocker(): ContractFunctionObj<string>;
    MINIMUM_QUORUM(): ContractFunctionObj<BigNumber>;
    requiredSharesToBeBoardMember(): ContractFunctionObj<BigNumber>;
    vote(proposalNumber: BigNumber, supportsProposal: boolean): ContractTxFunctionObj<BigNumber>;
    newProposal(beneficiary: string, weiAmount: BigNumber, jobMetadataHash: string, transactionBytecode: string): ContractTxFunctionObj<BigNumber>;
    DEBATE_PERIOD_MINUTES(): ContractFunctionObj<BigNumber>;
    checkProposalCode(proposalNumber: BigNumber, beneficiary: string, weiAmount: BigNumber, transactionBytecode: string): ContractFunctionObj<boolean>;
    totalLockedTokens(): ContractFunctionObj<BigNumber>;
    /**
     * Subscribe to an event type emitted by the WyvernDAO contract.
     * @param eventName The WyvernDAO contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    subscribe<ArgsType extends WyvernDAOEventArgs>(eventName: WyvernDAOEvents, indexFilterValues: IndexedFilterValues, callback: EventCallback<ArgsType>, isVerbose?: boolean, blockPollingIntervalMs?: number): string;
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
     * @param eventName The WyvernDAO contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    getLogsAsync<ArgsType extends WyvernDAOEventArgs>(eventName: WyvernDAOEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: {
        [contractName: string]: ContractAbi;
    }, deployedBytecode?: string | undefined, encoderOverrides?: Partial<EncoderOverrides>);
}
