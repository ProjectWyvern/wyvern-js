export const atomicizerABI = [
    {
        'constant': false,
        'inputs': [
            {
                'name': 'addrs',
                'type': 'address[]',
            },
            {
                'name': 'values',
                'type': 'uint256[]',
            },
            {
                'name': 'calldataLengths',
                'type': 'uint256[]',
            },
            {
                'name': 'calldatas',
                'type': 'bytes',
            },
        ],
        'name': 'atomicize',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
];
// tslint:disable:max-file-line-count