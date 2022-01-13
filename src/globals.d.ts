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
declare function compareVersions(
  firstVersion: string,
  secondVersion: string,
): number;
declare module 'compare-versions' {
  export = compareVersions;
}

declare module 'ethereumjs-abi' {
  const soliditySHA3: (argTypes: string[], args: any[]) => Buffer;
  const elementaryName: (name: string) => string;
  const encodeSingle: (type: string, arg: any) => Buffer;
  const rawEncode: (types: any, values: any) => string;
  const methodID: (name: string, types: any) => Buffer;
  const isDynamic: (type: string) => boolean;
}

// abi-decoder declarations
interface DecodedLogArg {}
interface DecodedLog {
  name: string;
  events: DecodedLogArg[];
}

declare module 'web3/lib/solidity/coder' {
  const decodeParams: (types: string[], data: string) => any[];
}
