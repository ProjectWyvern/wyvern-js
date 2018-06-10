declare module 'web3_beta';
declare module 'request-promise-native';
declare module 'web3-provider-engine';
declare module 'web3-provider-engine/subproviders/rpc';

/* tslint:enable */

declare module '*.json' {
    const json: any;
    /* tslint:disable */
    export default json;
    /* tslint:enable */
}

// find-version declarations
declare function findVersions(version: string): string[];
declare module 'find-versions' {
    export = findVersions;
}

// compare-version declarations
declare function compareVersions(firstVersion: string, secondVersion: string): number;
declare module 'compare-versions' {
    export = compareVersions;
}

declare module 'ethereumjs-abi' {
    const soliditySHA3: (argTypes: string[], args: any[]) => Buffer;
    const elementaryName: (name: string) => string;
    const encodeSingle: (type: string, arg: any) => string;
    const rawEncode: (types: any, values: any) => string;
    const methodID: (name: string, types: any) => Buffer;
}

// truffle-hdwallet-provider declarations
declare module 'truffle-hdwallet-provider' {
    import * as Web3 from 'web3';
    class HDWalletProvider implements Web3.Provider {
        constructor(mnemonic: string, rpcUrl: string);
        public sendAsync(
            payload: Web3.JSONRPCRequestPayload,
            callback: (err: Error, result: Web3.JSONRPCResponsePayload) => void,
        ): void;
    }
    export = HDWalletProvider;
}

// abi-decoder declarations
interface DecodedLogArg {}
interface DecodedLog {
    name: string;
    events: DecodedLogArg[];
}
declare module 'abi-decoder' {
    import * as Web3 from 'web3';
    const addABI: (abi: Web3.AbiDefinition) => void;
    const decodeLogs: (logs: Web3.LogEntry[]) => DecodedLog[];
}

declare module 'web3/lib/solidity/coder' {
    const decodeParams: (types: string[], data: string) => any[];
}
