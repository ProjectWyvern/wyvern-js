import { BigNumber } from '@0x/utils';
import BN = require('bn.js');
import { Order, SignedOrder } from '../types';
export declare const utils: {
    /**
     * Converts BigNumber instance to BN
     * The only reason we convert to BN is to remain compatible with `ethABI. soliditySHA3` that
     * expects values of Solidity type `uint` to be passed as type `BN`.
     * We do not use BN anywhere else in the codebase.
     */
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
