import { BigNumber } from '@0x/utils';
import {
  DecodedLogEntry,
  LogEntry,
  LogEntryEvent,
  TransactionReceipt,
  Web3JsProvider,
} from 'ethereum-types';

export interface WyvernProtocolConfig {
  network: Network;
  gasPrice?: BigNumber;
  wyvernExchangeContractAddress?: string;
  wyvernProxyRegistryContractAddress?: string;
  wyvernDAOContractAddress?: string;
  wyvernTokenContractAddress?: string;
  wyvernAtomicizerContractAddress?: string;
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

export type LogEvent = LogEntryEvent;
export interface DecodedLogEvent<ArgsType> {
  isRemoved: boolean;
  log: LogWithDecodedArgs<ArgsType>;
}

export type ContractEventArg = string | BigNumber;

export interface DecodedLogArgs {
  [argName: string]: ContractEventArg;
}

export interface LogWithDecodedArgs<ArgsType>
  extends DecodedLogEntry<ArgsType> {}

export interface TransactionReceiptWithDecodedLogs extends TransactionReceipt {
  logs: Array<LogWithDecodedArgs<DecodedLogArgs> | LogEntry>;
}

export type EventCallback<ArgsType> = (
  err: null | Error,
  log?: DecodedLogEvent<ArgsType>,
) => void;
export type EventWatcherCallback = (log: LogEvent) => void;

export enum SolidityTypes {
  Address = 'address',
  Uint256 = 'uint256',
  Uint8 = 'uint8',
  Uint = 'uint',
  Bytes = 'bytes',
  String = 'string',
}

export type RawLog = LogEntry;

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
  makerRelayerFee: BigNumber;
  takerRelayerFee: BigNumber;
  makerProtocolFee: BigNumber;
  takerProtocolFee: BigNumber;
  feeRecipient: string;
  feeMethod: number;
  side: number;
  saleKind: number;
  target: string;
  howToCall: number;
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
}

export interface SignedOrder extends Order {
  ecSignature: ECSignature;
}

export enum StateMutability {
  Pure = 'pure',
  View = 'view',
  Payable = 'payable',
  Nonpayable = 'nonpayable',
}

export enum FunctionInputKind {
  Replaceable = 'replaceable',
  Asset = 'asset',
  Owner = 'owner',
  Index = 'index',
  Count = 'count',
  Data = 'data',
}

export interface AnnotatedFunctionInput {
  name: string;
  type: string;
  kind: FunctionInputKind;
  value?: any;
}

export enum FunctionOutputKind {
  Owner = 'owner',
  Asset = 'asset',
  Count = 'count',
  Other = 'other',
}

export interface AnnotatedFunctionOutput {
  name: string;
  type: string;
  kind: FunctionOutputKind;
}

export interface AnnotatedFunctionABI {
  type: AbiType;
  name: string;
  target: string;
  inputs: AnnotatedFunctionInput[];
  outputs: AnnotatedFunctionOutput[];
  constant: boolean;
  stateMutability: StateMutability;
  payable: boolean;
}

export type ReplacementEncoder = (
  abi: AnnotatedFunctionABI,
  kind?: FunctionInputKind,
  encodeToBytes?: boolean,
) => string;
export type AtomicizedReplacementEncoder = (
  abis: AnnotatedFunctionABI[],
  kind?: FunctionInputKind,
) => string;

export type Web3Provider = Web3JsProvider;
