import { atomicizerABI } from './atomicizerABI';
import { daoABI } from './daoABI';
import { deployed } from './deployed';
import { exchangeABI } from './exchangeABI';
import { proxyRegistryABI } from './proxyRegistryABI';
import { tokenABI } from './tokenABI';

export const constants = {
    NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
    INVALID_JUMP_PATTERN: 'invalid JUMP at',
    OUT_OF_GAS_PATTERN: 'out of gas',
    INVALID_TAKER_FORMAT: 'instance.taker is not of a type(s) string',
    MAX_DIGITS_IN_UNSIGNED_256_INT: 78,
    DEFAULT_BLOCK_POLLING_INTERVAL: 1000,
    DEPLOYED: deployed,
    ATOMICIZER_ABI: atomicizerABI,
    EXCHANGE_ABI: exchangeABI,
    PROXY_REGISTRY_ABI: proxyRegistryABI,
    DAO_ABI: daoABI,
    TOKEN_ABI: tokenABI,
};
