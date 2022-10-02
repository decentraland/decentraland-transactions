export const Rentals = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_contractAddress',
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
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'AssetClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_signer',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_contractAddress',
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
        internalType: 'uint256',
        name: '_newIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'AssetIndexUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_contractAddress',
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
        name: '_lessor',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_tenant',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_rentalDays',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_pricePerDay',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_isExtension',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'AssetRented',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'ContractIndexUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'FeeCollectorUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_from',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_to',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'FeeUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_relayerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_functionData',
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
        internalType: 'address',
        name: '_signer',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'SignerIndexUpdated',
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
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'signer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiration',
            type: 'uint256'
          },
          {
            internalType: 'uint256[3]',
            name: 'indexes',
            type: 'uint256[3]'
          },
          {
            internalType: 'uint256[]',
            name: 'pricePerDay',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'maxDays',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'minDays',
            type: 'uint256[]'
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes'
          }
        ],
        internalType: 'struct Rentals.Listing',
        name: '_listing',
        type: 'tuple'
      },
      {
        internalType: 'address',
        name: '_operator',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_conditionIndex',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rentalDays',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: '_fingerprint',
        type: 'bytes32'
      }
    ],
    name: 'acceptListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'signer',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'expiration',
            type: 'uint256'
          },
          {
            internalType: 'uint256[3]',
            name: 'indexes',
            type: 'uint256[3]'
          },
          {
            internalType: 'uint256',
            name: 'pricePerDay',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rentalDays',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address'
          },
          {
            internalType: 'bytes32',
            name: 'fingerprint',
            type: 'bytes32'
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes'
          }
        ],
        internalType: 'struct Rentals.Offer',
        name: '_offer',
        type: 'tuple'
      }
    ],
    name: 'acceptOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'bumpAssetIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'bumpContractIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'bumpSignerIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_contractAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: '_functionData',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
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
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_signer',
        type: 'address'
      }
    ],
    name: 'getAssetIndex',
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
    name: 'getContractIndex',
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
    name: 'getFee',
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
    name: 'getFeeCollector',
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
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'getIsRented',
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
        name: '_signer',
        type: 'address'
      }
    ],
    name: 'getNonce',
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
        name: '_contractAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'getRental',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'lessor',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'tenant',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256'
          }
        ],
        internalType: 'struct Rentals.Rental',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_signer',
        type: 'address'
      }
    ],
    name: 'getSignerIndex',
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
    name: 'getToken',
    outputs: [
      {
        internalType: 'contract IERC20',
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
        name: '_owner',
        type: 'address'
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_feeCollector',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_operator',
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256'
      }
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeCollector',
        type: 'address'
      }
    ],
    name: 'setFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256[][]',
        name: '_landTokenIds',
        type: 'uint256[][]'
      },
      {
        internalType: 'address[]',
        name: '_operators',
        type: 'address[]'
      }
    ],
    name: 'setManyLandUpdateOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_contractAddresses',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_tokenIds',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '_operators',
        type: 'address[]'
      }
    ],
    name: 'setUpdateOperator',
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
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
