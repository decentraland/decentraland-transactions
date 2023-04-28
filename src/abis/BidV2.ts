export const BidV2 = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_feesCollector',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_manaToken',
        type: 'address'
      },
      {
        internalType: 'contract IRoyaltiesManager',
        name: '_royaltiesManager',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_feesCollectorCutPerMillion',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_royaltiesCutPerMillion',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_id',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_bidder',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_seller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256'
      }
    ],
    name: 'BidAccepted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_id',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_bidder',
        type: 'address'
      }
    ],
    name: 'BidCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_id',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_bidder',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_fingerprint',
        type: 'bytes'
      }
    ],
    name: 'BidCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_feesCollectorCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'ChangedFeesCollectorCutPerMillion',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_royaltiesCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'ChangedRoyaltiesCutPerMillion',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_oldFeesCollector',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_newFeesCollector',
        type: 'address'
      }
    ],
    name: 'FeesCollectorSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'userAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'relayerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'functionSignature',
        type: 'bytes'
      }
    ],
    name: 'MetaTransactionExecuted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IRoyaltiesManager',
        name: '_oldRoyaltiesManager',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'contract IRoyaltiesManager',
        name: '_newRoyaltiesManager',
        type: 'address'
      }
    ],
    name: 'RoyaltiesManagerSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    type: 'event'
  },
  {
    inputs: [],
    name: 'ERC721Composable_ValidateFingerprint',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ERC721_Interface',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ERC721_Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MAX_BID_DURATION',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MIN_BID_DURATION',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ONE_MILLION',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'bidCounterByToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'bidIdByTokenAndBidder',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'bidIndexByBidId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'cancelBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'domainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: 'functionSignature',
        type: 'bytes'
      },
      {
        internalType: 'bytes32',
        name: 'sigR',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'sigS',
        type: 'bytes32'
      },
      {
        internalType: 'uint8',
        name: 'sigV',
        type: 'uint8'
      }
    ],
    name: 'executeMetaTransaction',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feesCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feesCollectorCutPerMillion',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_bidder',
        type: 'address'
      }
    ],
    name: 'getBidByBidder',
    outputs: [
      {
        internalType: 'uint256',
        name: 'bidIndex',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'bidId',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'bidder',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'getBidByToken',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'getNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'manaToken',
    outputs: [
      {
        internalType: 'contract ERC20Interface',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_duration',
        type: 'uint256'
      }
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_duration',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_fingerprint',
        type: 'bytes'
      }
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokenAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '_bidders',
        type: 'address[]'
      }
    ],
    name: 'removeExpiredBids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'royaltiesCutPerMillion',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'royaltiesManager',
    outputs: [
      {
        internalType: 'contract IRoyaltiesManager',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newFeesCollector',
        type: 'address'
      }
    ],
    name: 'setFeesCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feesCollectorCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'setFeesCollectorCutPerMillion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_royaltiesCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'setRoyaltiesCutPerMillion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IRoyaltiesManager',
        name: '_newRoyaltiesManager',
        type: 'address'
      }
    ],
    name: 'setRoyaltiesManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
