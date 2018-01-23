export const exchangeABI = [
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
        'constant': true,
        'inputs': [],
        'name': 'exchangeTokenAddress',
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
        'inputs': [
            {
                'name': 'array',
                'type': 'bytes',
            },
            {
                'name': 'desired',
                'type': 'bytes',
            },
            {
                'name': 'mask',
                'type': 'bytes',
            },
        ],
        'name': 'guardedArrayReplace',
        'outputs': [
            {
                'name': '',
                'type': 'bytes',
            },
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': 'addrs',
                'type': 'address[6]',
            },
            {
                'name': 'uints',
                'type': 'uint256[7]',
            },
            {
                'name': 'side',
                'type': 'uint8',
            },
            {
                'name': 'saleKind',
                'type': 'uint8',
            },
            {
                'name': 'howToCall',
                'type': 'uint8',
            },
            {
                'name': 'calldata',
                'type': 'bytes',
            },
            {
                'name': 'replacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
            {
                'name': 'v',
                'type': 'uint8',
            },
            {
                'name': 'r',
                'type': 'bytes32',
            },
            {
                'name': 's',
                'type': 'bytes32',
            },
        ],
        'name': 'validateOrder_',
        'outputs': [
            {
                'name': '',
                'type': 'bool',
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
                'name': 'addrs',
                'type': 'address[12]',
            },
            {
                'name': 'uints',
                'type': 'uint256[14]',
            },
            {
                'name': 'sidesKindsHowToCalls',
                'type': 'uint8[6]',
            },
            {
                'name': 'calldataBuy',
                'type': 'bytes',
            },
            {
                'name': 'calldataSell',
                'type': 'bytes',
            },
            {
                'name': 'replacementPatternBuy',
                'type': 'bytes',
            },
            {
                'name': 'replacementPatternSell',
                'type': 'bytes',
            },
            {
                'name': 'metadataHashBuy',
                'type': 'bytes',
            },
            {
                'name': 'metadataHashSell',
                'type': 'bytes',
            },
            {
                'name': 'vs',
                'type': 'uint8[2]',
            },
            {
                'name': 'rss',
                'type': 'bytes32[4]',
            },
        ],
        'name': 'atomicMatch_',
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
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'bytes32',
            },
        ],
        'name': 'topBids',
        'outputs': [
            {
                'name': 'bidder',
                'type': 'address',
            },
            {
                'name': 'amount',
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
                'name': 'buyCalldata',
                'type': 'bytes',
            },
            {
                'name': 'buyReplacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'sellCalldata',
                'type': 'bytes',
            },
            {
                'name': 'sellReplacementPattern',
                'type': 'bytes',
            },
        ],
        'name': 'orderCalldataCanMatch',
        'outputs': [
            {
                'name': '',
                'type': 'bool',
            },
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'addrs',
                'type': 'address[6]',
            },
            {
                'name': 'uints',
                'type': 'uint256[7]',
            },
            {
                'name': 'side',
                'type': 'uint8',
            },
            {
                'name': 'saleKind',
                'type': 'uint8',
            },
            {
                'name': 'howToCall',
                'type': 'uint8',
            },
            {
                'name': 'calldata',
                'type': 'bytes',
            },
            {
                'name': 'replacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
            {
                'name': 'v',
                'type': 'uint8',
            },
            {
                'name': 'r',
                'type': 'bytes32',
            },
            {
                'name': 's',
                'type': 'bytes32',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'bid_',
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
                'name': 'addrs',
                'type': 'address[12]',
            },
            {
                'name': 'uints',
                'type': 'uint256[14]',
            },
            {
                'name': 'sidesKindsHowToCalls',
                'type': 'uint8[6]',
            },
            {
                'name': 'calldataBuy',
                'type': 'bytes',
            },
            {
                'name': 'calldataSell',
                'type': 'bytes',
            },
            {
                'name': 'replacementPatternBuy',
                'type': 'bytes',
            },
            {
                'name': 'replacementPatternSell',
                'type': 'bytes',
            },
            {
                'name': 'metadataHashBuy',
                'type': 'bytes',
            },
            {
                'name': 'metadataHashSell',
                'type': 'bytes',
            },
        ],
        'name': 'ordersCanMatch_',
        'outputs': [
            {
                'name': '',
                'type': 'bool',
            },
        ],
        'payable': false,
        'stateMutability': 'pure',
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
                'name': 'addrs',
                'type': 'address[6]',
            },
            {
                'name': 'uints',
                'type': 'uint256[7]',
            },
            {
                'name': 'side',
                'type': 'uint8',
            },
            {
                'name': 'saleKind',
                'type': 'uint8',
            },
            {
                'name': 'howToCall',
                'type': 'uint8',
            },
            {
                'name': 'calldata',
                'type': 'bytes',
            },
            {
                'name': 'replacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
            {
                'name': 'orderbookInclusionDesired',
                'type': 'bool',
            },
        ],
        'name': 'approveOrder_',
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
        'constant': true,
        'inputs': [
            {
                'name': 'addrs',
                'type': 'address[6]',
            },
            {
                'name': 'uints',
                'type': 'uint256[7]',
            },
            {
                'name': 'side',
                'type': 'uint8',
            },
            {
                'name': 'saleKind',
                'type': 'uint8',
            },
            {
                'name': 'howToCall',
                'type': 'uint8',
            },
            {
                'name': 'calldata',
                'type': 'bytes',
            },
            {
                'name': 'replacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
        ],
        'name': 'hashOrder_',
        'outputs': [
            {
                'name': '',
                'type': 'bytes32',
            },
        ],
        'payable': false,
        'stateMutability': 'pure',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'addrs',
                'type': 'address[6]',
            },
            {
                'name': 'uints',
                'type': 'uint256[7]',
            },
            {
                'name': 'side',
                'type': 'uint8',
            },
            {
                'name': 'saleKind',
                'type': 'uint8',
            },
            {
                'name': 'howToCall',
                'type': 'uint8',
            },
            {
                'name': 'calldata',
                'type': 'bytes',
            },
            {
                'name': 'replacementPattern',
                'type': 'bytes',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
            {
                'name': 'v',
                'type': 'uint8',
            },
            {
                'name': 'r',
                'type': 'bytes32',
            },
            {
                'name': 's',
                'type': 'bytes32',
            },
        ],
        'name': 'cancelOrder_',
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
                'name': 'registryAddress',
                'type': 'address',
            },
            {
                'name': 'tokenAddress',
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
                'indexed': false,
                'name': 'hash',
                'type': 'bytes32',
            },
            {
                'indexed': true,
                'name': 'approver',
                'type': 'address',
            },
            {
                'components': [
                    {
                        'name': 'exchange',
                        'type': 'address',
                    },
                    {
                        'name': 'maker',
                        'type': 'address',
                    },
                    {
                        'name': 'taker',
                        'type': 'address',
                    },
                    {
                        'name': 'makerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'takerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'feeRecipient',
                        'type': 'address',
                    },
                    {
                        'name': 'side',
                        'type': 'uint8',
                    },
                    {
                        'name': 'saleKind',
                        'type': 'uint8',
                    },
                    {
                        'name': 'target',
                        'type': 'address',
                    },
                    {
                        'name': 'howToCall',
                        'type': 'uint8',
                    },
                    {
                        'name': 'calldata',
                        'type': 'bytes',
                    },
                    {
                        'name': 'replacementPattern',
                        'type': 'bytes',
                    },
                    {
                        'name': 'metadataHash',
                        'type': 'bytes',
                    },
                    {
                        'name': 'paymentToken',
                        'type': 'address',
                    },
                    {
                        'name': 'basePrice',
                        'type': 'uint256',
                    },
                    {
                        'name': 'extra',
                        'type': 'uint256',
                    },
                    {
                        'name': 'listingTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'expirationTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'salt',
                        'type': 'uint256',
                    },
                ],
                'indexed': false,
                'name': 'order',
                'type': 'tuple',
            },
            {
                'indexed': false,
                'name': 'orderbookInclusionDesired',
                'type': 'bool',
            },
        ],
        'name': 'OrderApproved',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'hash',
                'type': 'bytes32',
            },
        ],
        'name': 'OrderCancelled',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'hash',
                'type': 'bytes32',
            },
            {
                'indexed': true,
                'name': 'bidder',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'timestamp',
                'type': 'uint256',
            },
        ],
        'name': 'OrderBidOn',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'components': [
                    {
                        'name': 'exchange',
                        'type': 'address',
                    },
                    {
                        'name': 'maker',
                        'type': 'address',
                    },
                    {
                        'name': 'taker',
                        'type': 'address',
                    },
                    {
                        'name': 'makerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'takerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'feeRecipient',
                        'type': 'address',
                    },
                    {
                        'name': 'side',
                        'type': 'uint8',
                    },
                    {
                        'name': 'saleKind',
                        'type': 'uint8',
                    },
                    {
                        'name': 'target',
                        'type': 'address',
                    },
                    {
                        'name': 'howToCall',
                        'type': 'uint8',
                    },
                    {
                        'name': 'calldata',
                        'type': 'bytes',
                    },
                    {
                        'name': 'replacementPattern',
                        'type': 'bytes',
                    },
                    {
                        'name': 'metadataHash',
                        'type': 'bytes',
                    },
                    {
                        'name': 'paymentToken',
                        'type': 'address',
                    },
                    {
                        'name': 'basePrice',
                        'type': 'uint256',
                    },
                    {
                        'name': 'extra',
                        'type': 'uint256',
                    },
                    {
                        'name': 'listingTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'expirationTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'salt',
                        'type': 'uint256',
                    },
                ],
                'indexed': false,
                'name': 'buy',
                'type': 'tuple',
            },
            {
                'components': [
                    {
                        'name': 'exchange',
                        'type': 'address',
                    },
                    {
                        'name': 'maker',
                        'type': 'address',
                    },
                    {
                        'name': 'taker',
                        'type': 'address',
                    },
                    {
                        'name': 'makerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'takerFee',
                        'type': 'uint256',
                    },
                    {
                        'name': 'feeRecipient',
                        'type': 'address',
                    },
                    {
                        'name': 'side',
                        'type': 'uint8',
                    },
                    {
                        'name': 'saleKind',
                        'type': 'uint8',
                    },
                    {
                        'name': 'target',
                        'type': 'address',
                    },
                    {
                        'name': 'howToCall',
                        'type': 'uint8',
                    },
                    {
                        'name': 'calldata',
                        'type': 'bytes',
                    },
                    {
                        'name': 'replacementPattern',
                        'type': 'bytes',
                    },
                    {
                        'name': 'metadataHash',
                        'type': 'bytes',
                    },
                    {
                        'name': 'paymentToken',
                        'type': 'address',
                    },
                    {
                        'name': 'basePrice',
                        'type': 'uint256',
                    },
                    {
                        'name': 'extra',
                        'type': 'uint256',
                    },
                    {
                        'name': 'listingTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'expirationTime',
                        'type': 'uint256',
                    },
                    {
                        'name': 'salt',
                        'type': 'uint256',
                    },
                ],
                'indexed': false,
                'name': 'sell',
                'type': 'tuple',
            },
        ],
        'name': 'OrdersMatched',
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
