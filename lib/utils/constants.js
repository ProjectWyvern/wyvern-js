"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const atomicizerABI_1 = require("./atomicizerABI");
const daoABI_1 = require("./daoABI");
const deployed_1 = require("./deployed");
const exchangeABI_1 = require("./exchangeABI");
const proxyRegistryABI_1 = require("./proxyRegistryABI");
const tokenABI_1 = require("./tokenABI");
exports.constants = {
    NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
    INVALID_JUMP_PATTERN: 'invalid JUMP at',
    OUT_OF_GAS_PATTERN: 'out of gas',
    INVALID_TAKER_FORMAT: 'instance.taker is not of a type(s) string',
    MAX_DIGITS_IN_UNSIGNED_256_INT: 78,
    DEFAULT_BLOCK_POLLING_INTERVAL: 1000,
    DEPLOYED: deployed_1.deployed,
    ATOMICIZER_ABI: atomicizerABI_1.atomicizerABI,
    EXCHANGE_ABI: exchangeABI_1.exchangeABI,
    PROXY_REGISTRY_ABI: proxyRegistryABI_1.proxyRegistryABI,
    DAO_ABI: daoABI_1.daoABI,
    TOKEN_ABI: tokenABI_1.tokenABI,
};
//# sourceMappingURL=constants.js.map