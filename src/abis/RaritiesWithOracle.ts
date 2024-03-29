export const RaritiesWithOracle = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          }
        ],
        internalType: 'struct RaritiesWithOracle.Rarity[]',
        name: '_rarities',
        type: 'tuple[]'
      },
      {
        internalType: 'contract IOracle',
        name: '_oracle',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          }
        ],
        indexed: false,
        internalType: 'struct RaritiesWithOracle.Rarity',
        name: '_rarity',
        type: 'tuple'
      }
    ],
    name: 'AddRarity',
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
        internalType: 'contract IOracle',
        name: '_oldOracle',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'contract IOracle',
        name: '_newOracle',
        type: 'address'
      }
    ],
    name: 'OracleSet',
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
        internalType: 'string',
        name: '_name',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      }
    ],
    name: 'UpdatePrice',
    type: 'event'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          }
        ],
        internalType: 'struct RaritiesWithOracle.Rarity[]',
        name: '_rarities',
        type: 'tuple[]'
      }
    ],
    name: 'addRarities',
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
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
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
    inputs: [
      {
        internalType: 'string',
        name: '_rarity',
        type: 'string'
      }
    ],
    name: 'getRarityByName',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          }
        ],
        internalType: 'struct RaritiesWithOracle.Rarity',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'oracle',
    outputs: [
      {
        internalType: 'contract IOracle',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'rarities',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'maxSupply',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'raritiesCount',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IOracle',
        name: '_newOracle',
        type: 'address'
      }
    ],
    name: 'setOracle',
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
    inputs: [
      {
        internalType: 'string[]',
        name: '_names',
        type: 'string[]'
      },
      {
        internalType: 'uint256[]',
        name: '_prices',
        type: 'uint256[]'
      }
    ],
    name: 'updatePrices',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
