import { TransactionReceipt } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import * as Web3 from 'web3';

export interface WyvernProtocolConfig {
    network: Network;
    gasPrice?: BigNumber;
    wyvernExchangeContractAddress?: string;
    wyvernProxyRegistryContractAddress?: string;
    wyvernDAOContractAddress?: string;
    wyvernTokenContractAddress?: string;
    wyvernLazyBankContractAddress?: string;
}

export type AsyncMethod = (...args: any[]) => Promise<any>;
export type SyncMethod = (...args: any[]) => any;

export enum Network {
    Main = 'main',
    Rinkeby = 'rinkeby',
}

export enum SaleKind {
    FixedPrice = 0,
    EnglishAuction = 1,
    DutchAuction = 2,
}

export enum HowToCall {
    Call = 0,
    DelegateCall = 1,
    StaticCall = 2,
    Create = 3,
}

export enum AbiType {
    Function = 'function',
    Constructor = 'constructor',
    Event = 'event',
    Fallback = 'fallback',
}

export enum WyvernProtocolError {
    InvalidSignature = 'INVALID_SIGNATURE',
    TransactionMiningTimeout = 'TRANSACTION_MINING_TIMEOUT',
    InvalidJump = 'INVALID_JUMP',
    OutOfGas = 'OUT_OF_GAS',
}

export interface ECSignature {
    v: number;
    r: string;
    s: string;
}

export type LogEvent = Web3.LogEntryEvent;
export interface DecodedLogEvent<ArgsType> {
    isRemoved: boolean;
    log: LogWithDecodedArgs<ArgsType>;
}

export type ContractEventArg = string | BigNumber;

export interface DecodedLogArgs {
    [argName: string]: ContractEventArg;
}

export interface LogWithDecodedArgs<ArgsType> extends Web3.DecodedLogEntry<ArgsType> {}

export interface TransactionReceiptWithDecodedLogs extends TransactionReceipt {
    logs: Array<LogWithDecodedArgs<DecodedLogArgs> | Web3.LogEntry>;
}

export type EventCallback<ArgsType> = (err: null | Error, log?: DecodedLogEvent<ArgsType>) => void;
export type EventWatcherCallback = (log: LogEvent) => void;

export enum SolidityTypes {
    Address = 'address',
    Uint256 = 'uint256',
    Uint8 = 'uint8',
    Uint = 'uint',
    Bytes = 'bytes',
}

export type RawLog = Web3.LogEntry;

export interface ContractEvent {
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    address: string;
    type: string;
    event: string;
    args: ContractEventArgs;
}

export type ContractEventArgs = string; // TODO

export interface Order {
    exchange: string;
    maker: string;
    taker: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    feeRecipient: string;
    side: number;
    saleKind: number;
    target: string;
    howToCall: number;
    calldata: string;
    replacementPattern: string;
    metadataHash: string;
    paymentToken: string;
    basePrice: BigNumber;
    extra: BigNumber;
    listingTime: BigNumber;
    expirationTime: BigNumber;
    salt: BigNumber;
}

export interface SignedOrder extends Order {
    ecSignature: ECSignature;
}

export type Web3Provider = Web3.Provider;
