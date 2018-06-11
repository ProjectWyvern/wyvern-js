import { AsyncMethod, SyncMethod } from '../types';
export declare const decorators: {
    asyncWyvernProtocolErrorHandler: (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<AsyncMethod>) => TypedPropertyDescriptor<AsyncMethod>;
    syncWyvernProtocolErrorHandler: (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<SyncMethod>) => TypedPropertyDescriptor<SyncMethod>;
};
