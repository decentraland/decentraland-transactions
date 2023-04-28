export const MANAToken = [
  { type: 'constructor', stateMutability: 'nonpayable', inputs: [] },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'spender',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'MetaTransactionExecuted',
    inputs: [
      {
        type: 'address',
        name: 'userAddress',
        internalType: 'address',
        indexed: false
      },
      {
        type: 'address',
        name: 'relayerAddress',
        internalType: 'address payable',
        indexed: false
      },
      {
        type: 'bytes',
        name: 'functionSignature',
        internalType: 'bytes',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'RoleAdminChanged',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'bytes32',
        name: 'previousAdminRole',
        internalType: 'bytes32',
        indexed: true
      },
      {
        type: 'bytes32',
        name: 'newAdminRole',
        internalType: 'bytes32',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'RoleGranted',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'RoleRevoked',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'CHILD_CHAIN_ID',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
    name: 'CHILD_CHAIN_ID_BYTES',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'DEPOSITOR_ROLE',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'ERC712_VERSION',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'ROOT_CHAIN_ID',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
    name: 'ROOT_CHAIN_ID_BYTES',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'allowance',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'spender', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'approve',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [{ type: 'address', name: 'account', internalType: 'address' }]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'changeName',
    inputs: [{ type: 'string', name: 'name_', internalType: 'string' }]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: 'decimals',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'decreaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'subtractedValue', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deposit',
    inputs: [
      { type: 'address', name: 'user', internalType: 'address' },
      { type: 'bytes', name: 'depositData', internalType: 'bytes' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'payable',
    outputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
    name: 'executeMetaTransaction',
    inputs: [
      { type: 'address', name: 'userAddress', internalType: 'address' },
      { type: 'bytes', name: 'functionSignature', internalType: 'bytes' },
      { type: 'bytes32', name: 'sigR', internalType: 'bytes32' },
      { type: 'bytes32', name: 'sigS', internalType: 'bytes32' },
      { type: 'uint8', name: 'sigV', internalType: 'uint8' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'pure',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'getChainId',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'getDomainSeperator',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: 'nonce', internalType: 'uint256' }],
    name: 'getNonce',
    inputs: [{ type: 'address', name: 'user', internalType: 'address' }]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'getRoleAdmin',
    inputs: [{ type: 'bytes32', name: 'role', internalType: 'bytes32' }]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'getRoleMember',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'uint256', name: 'index', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'getRoleMemberCount',
    inputs: [{ type: 'bytes32', name: 'role', internalType: 'bytes32' }]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'grantRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'hasRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'increaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'addedValue', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'initialize',
    inputs: [
      { type: 'string', name: 'name_', internalType: 'string' },
      { type: 'string', name: 'symbol_', internalType: 'string' },
      { type: 'uint8', name: 'decimals_', internalType: 'uint8' },
      { type: 'address', name: 'childChainManager', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'renounceRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'revokeRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'symbol',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'totalSupply',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transfer',
    inputs: [
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transferFrom',
    inputs: [
      { type: 'address', name: 'sender', internalType: 'address' },
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'withdraw',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }]
  }
]
