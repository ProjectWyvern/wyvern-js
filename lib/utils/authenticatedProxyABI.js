"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedProxyABI = void 0;
exports.authenticatedProxyABI = [
    {
        constant: false,
        inputs: [
            { name: 'dest', type: 'address' },
            { name: 'howToCall', type: 'uint8' },
            { name: 'calldata', type: 'bytes' },
        ],
        name: 'proxy',
        outputs: [{ name: 'result', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: 'dest', type: 'address' },
            { name: 'howToCall', type: 'uint8' },
            { name: 'calldata', type: 'bytes' },
        ],
        name: 'proxyAssert',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: 'revoke', type: 'bool' }],
        name: 'setRevoke',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'user',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'revoked',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'registry',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: 'from', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'token', type: 'address' },
            { name: 'extraData', type: 'bytes' },
        ],
        name: 'receiveApproval',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'addrUser', type: 'address' },
            { name: 'addrRegistry', type: 'address' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    { payable: true, stateMutability: 'payable', type: 'fallback' },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: 'revoked', type: 'bool' }],
        name: 'Revoked',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'sender', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'ReceivedEther',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
            { indexed: true, name: 'token', type: 'address' },
            { indexed: false, name: 'extraData', type: 'bytes' },
        ],
        name: 'ReceivedTokens',
        type: 'event',
    },
];
//# sourceMappingURL=authenticatedProxyABI.js.map