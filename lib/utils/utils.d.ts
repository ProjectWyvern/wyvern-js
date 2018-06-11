import { BigNumber } from '@0xproject/utils';
import BN = require('bn.js');
import { Order, SignedOrder } from '../types';
export declare const utils: {
    bigNumberToBN(value: BigNumber): BN;
    consoleLog(message: string): void;
    isParityNode(nodeVersion: string): boolean;
    isTestRpc(nodeVersion: string): boolean;
    spawnSwitchErr(name: string, value: any): Error;
    getAssetHashHex(assetHash: string, schema: string): string;
    getOrderHashHex(order: Order | SignedOrder): string;
    getCurrentUnixTimestampSec(): BigNumber;
    getCurrentUnixTimestampMs(): BigNumber;
};
