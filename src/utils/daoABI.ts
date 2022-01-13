export const daoABI = [
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256',
            },
        ],
        'name': 'proposals',
        'outputs': [
            {
                'name': 'recipient',
                'type': 'address',
            },
            {
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'name': 'metadataHash',
                'type': 'bytes',
            },
            {
                'name': 'timeCreated',
                'type': 'uint256',
            },
            {
                'name': 'votingDeadline',
                'type': 'uint256',
            },
            {
                'name': 'finalized',
                'type': 'bool',
            },
            {
                'name': 'proposalPassed',
                'type': 'bool',
            },
            {
                'name': 'numberOfVotes',
                'type': 'uint256',
            },
            {
                'name': 'proposalHash',
                'type': 'bytes32',
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
                'type': 'address',
            },
        ],
        'name': 'delegatesByDelegator',
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
        'name': 'REQUIRED_SHARES_TO_BE_BOARD_MEMBER',
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
                'type': 'address',
            },
        ],
        'name': 'lockedDelegatingTokens',
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
                'name': 'proposalNumber',
                'type': 'uint256',
            },
        ],
        'name': 'countVotes',
        'outputs': [
            {
                'name': 'yea',
                'type': 'uint256',
            },
            {
                'name': 'nay',
                'type': 'uint256',
            },
            {
                'name': 'quorum',
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
                'name': 'proposalNumber',
                'type': 'uint256',
            },
            {
                'name': 'transactionBytecode',
                'type': 'bytes',
            },
        ],
        'name': 'executeProposal',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'sharesTokenAddress',
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
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'address',
            },
        ],
        'name': 'delegatedAmountsByDelegate',
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
        'inputs': [],
        'name': 'numProposals',
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
                'name': 'proposalNumber',
                'type': 'uint256',
            },
            {
                'name': 'shareholder',
                'type': 'address',
            },
        ],
        'name': 'hasVoted',
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
        'constant': true,
        'inputs': [],
        'name': 'TOKEN_DECIMALS',
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
                'name': 'tokensToLock',
                'type': 'uint256',
            },
            {
                'name': 'delegate',
                'type': 'address',
            },
        ],
        'name': 'setDelegateAndLockTokens',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'clearDelegateAndUnlockTokens',
        'outputs': [
            {
                'name': 'lockedTokens',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'debatingPeriodInMinutes',
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
                'name': 'minimumSharesToPassAVote',
                'type': 'uint256',
            },
            {
                'name': 'minutesForDebate',
                'type': 'uint256',
            },
            {
                'name': 'sharesToBeBoardMember',
                'type': 'uint256',
            },
        ],
        'name': 'changeVotingRules',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'minimumQuorum',
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
                'name': 'value',
                'type': 'uint256',
            },
            {
                'name': 'token',
                'type': 'address',
            },
            {
                'name': 'extraData',
                'type': 'bytes',
            },
        ],
        'name': 'receiveApproval',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'tokenLocker',
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
        'constant': true,
        'inputs': [],
        'name': 'MINIMUM_QUORUM',
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
        'inputs': [],
        'name': 'requiredSharesToBeBoardMember',
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
                'name': 'proposalNumber',
                'type': 'uint256',
            },
            {
                'name': 'supportsProposal',
                'type': 'bool',
            },
        ],
        'name': 'vote',
        'outputs': [
            {
                'name': 'voteID',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': false,
        'inputs': [
            {
                'name': 'beneficiary',
                'type': 'address',
            },
            {
                'name': 'weiAmount',
                'type': 'uint256',
            },
            {
                'name': 'jobMetadataHash',
                'type': 'bytes',
            },
            {
                'name': 'transactionBytecode',
                'type': 'bytes',
            },
        ],
        'name': 'newProposal',
        'outputs': [
            {
                'name': 'proposalID',
                'type': 'uint256',
            },
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'DEBATE_PERIOD_MINUTES',
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
                'name': 'proposalNumber',
                'type': 'uint256',
            },
            {
                'name': 'beneficiary',
                'type': 'address',
            },
            {
                'name': 'weiAmount',
                'type': 'uint256',
            },
            {
                'name': 'transactionBytecode',
                'type': 'bytes',
            },
        ],
        'name': 'checkProposalCode',
        'outputs': [
            {
                'name': 'codeChecksOut',
                'type': 'bool',
            },
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'totalLockedTokens',
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
                'name': 'sharesAddress',
                'type': 'address',
            },
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor',
    },
    {
        'payable': true,
        'stateMutability': 'payable',
        'type': 'fallback',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'proposalID',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'recipient',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'metadataHash',
                'type': 'bytes',
            },
        ],
        'name': 'ProposalAdded',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'proposalID',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'position',
                'type': 'bool',
            },
            {
                'indexed': false,
                'name': 'voter',
                'type': 'address',
            },
        ],
        'name': 'Voted',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'proposalID',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'yea',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'nay',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'quorum',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'active',
                'type': 'bool',
            },
        ],
        'name': 'ProposalTallied',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'name': 'newMinimumQuorum',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'newDebatingPeriodInMinutes',
                'type': 'uint256',
            },
            {
                'indexed': false,
                'name': 'newSharesTokenAddress',
                'type': 'address',
            },
        ],
        'name': 'ChangeOfRules',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'delegator',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'numberOfTokens',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'name': 'delegate',
                'type': 'address',
            },
        ],
        'name': 'TokensDelegated',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'delegator',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'numberOfTokens',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'name': 'delegate',
                'type': 'address',
            },
        ],
        'name': 'TokensUndelegated',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'sender',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256',
            },
        ],
        'name': 'ReceivedEther',
        'type': 'event',
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': true,
                'name': 'from',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'value',
                'type': 'uint256',
            },
            {
                'indexed': true,
                'name': 'token',
                'type': 'address',
            },
            {
                'indexed': false,
                'name': 'extraData',
                'type': 'bytes',
            },
        ],
        'name': 'ReceivedTokens',
        'type': 'event',
    },
];
// tslint:disable:max-file-line-count