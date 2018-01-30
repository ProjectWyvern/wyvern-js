export const lazyBankABI = [
    {
        'constant': false,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': '_credit',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'name',
        'outputs': [
            {
                'name': '',
                'type': 'string',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'deposit',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
        ],
        'name': 'lockedFor',
        'outputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': '_lazyLock',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'name': 'dest',
                'type': 'address',
            },
        ],
        'name': 'withdraw',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'registry',
        'outputs': [
            {
                'name': '',
                'type': 'address',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': '_unlock',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address',
            },
            {
                'name': '',
                'type': 'address',
            },
        ],
        'name': 'balances',
        'outputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': '_lazyDebit',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address',
            },
            {
                'name': '',
                'type': 'address',
            },
        ],
        'name': 'locked',
        'outputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
        ],
        'name': 'availableFor',
        'outputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'from',
                'type': 'address',
            },
            {
                'name': 'to',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': '_transferTo',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'user',
                'type': 'address',
            },
            {
                'name': 'token',
                'type': 'address',
            },
        ],
        'name': 'balanceFor',
        'outputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'inputs': [
            {
                'name': 'addrRegistry',
                'type': 'address',
            },
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'user',
                'type': 'address',
            },
            {
                'indexed': true,
                'name': 'token',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'Credited',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'user',
                'type': 'address',
            },
            {
                'indexed': true,
                'name': 'token',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'Debited',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'user',
                'type': 'address',
            },
            {
                'indexed': true,
                'name': 'token',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'Locked',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'user',
                'type': 'address',
            },
            {
                'indexed': true,
                'name': 'token',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'Unlocked',
        'type': 'event',
    },
];
// tslint:disable:max-file-line-count
