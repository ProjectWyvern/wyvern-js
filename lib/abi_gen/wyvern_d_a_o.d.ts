/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x.js/tree/development/packages/abi-gen-templates.
 */
import { TxData } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import * as Web3 from 'web3';
import { BaseContract } from './base_contract';
export declare class WyvernDAOContract extends BaseContract {
    proposals: {
        callAsync(index_0: BigNumber, txData?: TxData): Promise<[string, BigNumber, string, BigNumber, BigNumber, boolean, boolean, BigNumber, string]>;
    };
    delegatesByDelegator: {
        callAsync(index_0: string, txData?: TxData): Promise<string>;
    };
    name: {
        callAsync(txData?: TxData): Promise<string>;
    };
    REQUIRED_SHARES_TO_BE_BOARD_MEMBER: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    lockedDelegatingTokens: {
        callAsync(index_0: string, txData?: TxData): Promise<BigNumber>;
    };
    countVotes: {
        callAsync(proposalNumber_0: BigNumber, txData?: TxData): Promise<[BigNumber, BigNumber, BigNumber]>;
    };
    executeProposal: {
        sendTransactionAsync(proposalNumber_0: BigNumber, transactionBytecode_1: string, txData?: TxData): Promise<string>;
        estimateGasAsync(proposalNumber_0: BigNumber, transactionBytecode_1: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(proposalNumber_0: BigNumber, transactionBytecode_1: string): string;
    };
    sharesTokenAddress: {
        callAsync(txData?: TxData): Promise<string>;
    };
    delegatedAmountsByDelegate: {
        callAsync(index_0: string, txData?: TxData): Promise<BigNumber>;
    };
    numProposals: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    hasVoted: {
        callAsync(proposalNumber_0: BigNumber, shareholder_1: string, txData?: TxData): Promise<boolean>;
    };
    TOKEN_DECIMALS: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    setDelegateAndLockTokens: {
        sendTransactionAsync(tokensToLock_0: BigNumber, delegate_1: string, txData?: TxData): Promise<string>;
        estimateGasAsync(tokensToLock_0: BigNumber, delegate_1: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(tokensToLock_0: BigNumber, delegate_1: string): string;
    };
    clearDelegateAndUnlockTokens: {
        sendTransactionAsync(txData?: TxData): Promise<string>;
        estimateGasAsync(txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(): string;
    };
    debatingPeriodInMinutes: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    changeVotingRules: {
        sendTransactionAsync(minimumSharesToPassAVote_0: BigNumber, minutesForDebate_1: BigNumber, sharesToBeBoardMember_2: BigNumber, txData?: TxData): Promise<string>;
        estimateGasAsync(minimumSharesToPassAVote_0: BigNumber, minutesForDebate_1: BigNumber, sharesToBeBoardMember_2: BigNumber, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(minimumSharesToPassAVote_0: BigNumber, minutesForDebate_1: BigNumber, sharesToBeBoardMember_2: BigNumber): string;
    };
    minimumQuorum: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    receiveApproval: {
        sendTransactionAsync(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string, txData?: TxData): Promise<string>;
        estimateGasAsync(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(from_0: string, value_1: BigNumber, token_2: string, extraData_3: string): string;
    };
    tokenLocker: {
        callAsync(txData?: TxData): Promise<string>;
    };
    MINIMUM_QUORUM: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    requiredSharesToBeBoardMember: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    vote: {
        sendTransactionAsync(proposalNumber_0: BigNumber, supportsProposal_1: boolean, txData?: TxData): Promise<string>;
        estimateGasAsync(proposalNumber_0: BigNumber, supportsProposal_1: boolean, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(proposalNumber_0: BigNumber, supportsProposal_1: boolean): string;
    };
    newProposal: {
        sendTransactionAsync(beneficiary_0: string, weiAmount_1: BigNumber, jobMetadataHash_2: string, transactionBytecode_3: string, txData?: TxData): Promise<string>;
        estimateGasAsync(beneficiary_0: string, weiAmount_1: BigNumber, jobMetadataHash_2: string, transactionBytecode_3: string, txData?: TxData): Promise<number>;
        getABIEncodedTransactionData(beneficiary_0: string, weiAmount_1: BigNumber, jobMetadataHash_2: string, transactionBytecode_3: string): string;
    };
    DEBATE_PERIOD_MINUTES: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    checkProposalCode: {
        callAsync(proposalNumber_0: BigNumber, beneficiary_1: string, weiAmount_2: BigNumber, transactionBytecode_3: string, txData?: TxData): Promise<boolean>;
    };
    totalLockedTokens: {
        callAsync(txData?: TxData): Promise<BigNumber>;
    };
    constructor(web3ContractInstance: Web3.ContractInstance, defaults: Partial<TxData>);
}
