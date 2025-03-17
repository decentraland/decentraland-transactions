export const CreditsManager = [
  {
    constant: false,
    inputs: [
      {
        components: [
          { name: 'owner', type: 'address' },
          { name: 'signer', type: 'address' },
          { name: 'pauser', type: 'address' },
          { name: 'denier', type: 'address' },
          { name: 'revoker', type: 'address' },
          { name: 'customExternalCallSigner', type: 'address' },
          { name: 'customExternalCallRevoker', type: 'address' }
        ],
        indexed: false,
        internalType: 'struct CreditsManagerPolygon.Roles',
        name: '_roles',
        type: 'tuple'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxManaCreditedPerHour',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_primarySalesAllowed',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_secondarySalesAllowed',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: '_mana',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_marketplace',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_legacyMarketplace',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_collectionStore',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'contract ICollectionFactory',
        name: '_collectionFactory',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'contract ICollectionFactory',
        name: '_collectionFactoryV3',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: false,
    inputs: [],
    name: 'AccessControlBadConfirmation',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32'
      }
    ],
    name: 'AccessControlUnauthorizedAccount',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'target',
        type: 'address'
      }
    ],
    name: 'AddressEmptyCode',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'AddressInsufficientBalance',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      }
    ],
    name: 'CreditConsumed',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      }
    ],
    name: 'CreditExpired',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256'
      }
    ],
    name: 'CustomExternalCallExpired',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_target',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: '_selector',
        type: 'bytes4'
      }
    ],
    name: 'CustomExternalCallNotAllowed',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'DeniedUser',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'ECDSAInvalidSignature',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'length',
        type: 'uint256'
      }
    ],
    name: 'ECDSAInvalidSignatureLength',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      { indexed: false, internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    name: 'ECDSAInvalidSignatureS',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'EnforcedPause',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'ExpectedPause',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'selector', type: 'bytes4' },
          { name: 'data', type: 'bytes' },
          { name: 'expiresAt', type: 'uint256' },
          { name: 'salt', type: 'bytes32' }
        ],
        indexed: false,
        internalType: 'struct CreditsManagerPolygon.ExternalCall',
        name: '_externalCall',
        type: 'tuple'
      }
    ],
    name: 'ExternalCallFailed',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'FailedInnerCall',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'InvalidAssetsLength',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'InvalidBeneficiary',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'InvalidCreditValue',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'InvalidCreditsSignaturesLength',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_recoveredSigner',
        type: 'address'
      }
    ],
    name: 'InvalidCustomExternalCallSignature',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_target',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: '_selector',
        type: 'bytes4'
      }
    ],
    name: 'InvalidExternalCallSelector',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_recoveredSigner',
        type: 'address'
      }
    ],
    name: 'InvalidSignature',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          { name: 'signer', type: 'address' },
          { name: 'signature', type: 'bytes' },
          {
            components: [
              { name: 'uses', type: 'uint256' },
              { name: 'expiration', type: 'uint256' },
              { name: 'effective', type: 'uint256' },
              { name: 'salt', type: 'bytes32' },
              { name: 'contractSignatureIndex', type: 'uint256' },
              { name: 'signerSignatureIndex', type: 'uint256' },
              { name: 'allowedRoot', type: 'bytes32' },
              { name: 'allowedProof', type: 'bytes32[]' },
              {
                components: [
                  { name: 'contractAddress', type: 'address' },
                  { name: 'selector', type: 'bytes4' },
                  { name: 'value', type: 'bytes' },
                  { name: 'required', type: 'bool' }
                ],
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            name: 'checks',
            type: 'tuple'
          },
          {
            components: [
              { name: 'assetType', type: 'uint256' },
              { name: 'contractAddress', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'beneficiary', type: 'address' },
              { name: 'extra', type: 'bytes' }
            ],
            name: 'sent',
            type: 'tuple[]'
          },
          {
            components: [
              { name: 'assetType', type: 'uint256' },
              { name: 'contractAddress', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'beneficiary', type: 'address' },
              { name: 'extra', type: 'bytes' }
            ],
            name: 'received',
            type: 'tuple[]'
          }
        ],
        indexed: false,
        internalType: 'struct IMarketplace.Trade',
        name: '_trade',
        type: 'tuple'
      }
    ],
    name: 'InvalidTrade',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'InvalidTradesLength',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditedValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxCreditedValue',
        type: 'uint256'
      }
    ],
    name: 'MaxCreditedValueExceeded',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'MaxCreditedValueZero',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditableManaThisHour',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditedValue',
        type: 'uint256'
      }
    ],
    name: 'MaxManaCreditedPerHourExceeded',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_uncreditedValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxUncreditedValue',
        type: 'uint256'
      }
    ],
    name: 'MaxUncreditedValueExceeded',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'MetaTransactionFailedWithoutReason',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'NoCredits',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'NoMANATransfer',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_contractAddress',
        type: 'address'
      }
    ],
    name: 'NotDecentralandCollection',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'PrimarySalesNotAllowed',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      }
    ],
    name: 'RevokedCredit',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'SafeERC20FailedOperation',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'SecondarySalesNotAllowed',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [],
    name: 'SignerAndSignatureDoNotMatch',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'str', type: 'string' }
    ],
    name: 'StringTooLong',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_hashedCustomExternalCallSignature',
        type: 'bytes32'
      }
    ],
    name: 'UsedCustomExternalCallSignature',
    payable: false,
    type: 'error'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      }
    ],
    name: 'CreditRevoked',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_creditId',
        type: 'bytes32'
      },
      {
        components: [
          { name: 'value', type: 'uint256' },
          { name: 'expiresAt', type: 'uint256' },
          { name: 'salt', type: 'bytes32' }
        ],
        indexed: false,
        internalType: 'struct CreditsManagerPolygon.Credit',
        name: '_credit',
        type: 'tuple'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'CreditUsed',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_manaTransferred',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_creditedValue',
        type: 'uint256'
      }
    ],
    name: 'CreditsUsed',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_target',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: '_selector',
        type: 'bytes4'
      },
      { indexed: false, internalType: 'bool', name: '_allowed', type: 'bool' }
    ],
    name: 'CustomExternalCallAllowed',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_hashedExternalCallSignature',
        type: 'bytes32'
      }
    ],
    name: 'CustomExternalCallRevoked',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      { indexed: true, internalType: 'address', name: '_to', type: 'address' }
    ],
    name: 'ERC20Withdrawn',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      { indexed: true, internalType: 'address', name: '_to', type: 'address' }
    ],
    name: 'ERC721Withdrawn',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxManaCreditedPerHour',
        type: 'uint256'
      }
    ],
    name: 'MaxManaCreditedPerHourUpdated',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
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
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_primarySalesAllowed',
        type: 'bool'
      }
    ],
    name: 'PrimarySalesAllowedUpdated',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_secondarySalesAllowed',
        type: 'bool'
      }
    ],
    name: 'SecondarySalesAllowedUpdated',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'UserAllowed',
    payable: false,
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'UserDenied',
    payable: false,
    type: 'event'
  },
  {
    inputs: [],
    name: 'ASSET_TYPE_COLLECTION_ITEM',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ASSET_TYPE_ERC20',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ASSET_TYPE_ERC721',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ASSET_TYPE_USD_PEGGED_MANA',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DENIER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'EXTERNAL_CALL_REVOKER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'EXTERNAL_CALL_SIGNER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'REVOKER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'SIGNER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_target',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes4',
        name: '_selector',
        type: 'bytes4'
      },
      { indexed: false, internalType: 'bool', name: '_allowed', type: 'bool' }
    ],
    name: 'allowCustomExternalCall',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'allowUser',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'bytes4', name: '', type: 'bytes4' }
    ],
    name: 'allowedCustomExternalCalls',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'collectionFactory',
    outputs: [
      {
        internalType: 'contract ICollectionFactory',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'collectionFactoryV3',
    outputs: [
      {
        internalType: 'contract ICollectionFactory',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'collectionStore',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'denyUser',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_userAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_functionData',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes'
      }
    ],
    name: 'executeMetaTransaction',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_signer',
        type: 'address'
      }
    ],
    name: 'getNonce',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'hourOfLastManaCredit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' }
    ],
    name: 'isDenied',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'bytes32', name: '', type: 'bytes32' }
    ],
    name: 'isRevoked',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'legacyMarketplace',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mana',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'manaCreditedThisHour',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'marketplace',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxManaCreditedPerHour',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
      { indexed: false, internalType: 'bytes', name: '', type: 'bytes' }
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'pause',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'primarySalesAllowed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_credit',
        type: 'bytes32'
      }
    ],
    name: 'revokeCredit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_hashedCustomExternalCallSignature',
        type: 'bytes32'
      }
    ],
    name: 'revokeCustomExternalCall',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'secondarySalesAllowed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'bytes32', name: '', type: 'bytes32' }
    ],
    name: 'spentValue',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'unpause',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_maxManaCreditedPerHour',
        type: 'uint256'
      }
    ],
    name: 'updateMaxManaCreditedPerHour',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: '_primarySalesAllowed',
        type: 'bool'
      }
    ],
    name: 'updatePrimarySalesAllowed',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: '_secondarySalesAllowed',
        type: 'bool'
      }
    ],
    name: 'updateSecondarySalesAllowed',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'value', type: 'uint256' },
              { name: 'expiresAt', type: 'uint256' },
              { name: 'salt', type: 'bytes32' }
            ],
            name: 'credits',
            type: 'tuple[]'
          },
          { name: 'creditsSignatures', type: 'bytes[]' },
          {
            components: [
              { name: 'target', type: 'address' },
              { name: 'selector', type: 'bytes4' },
              { name: 'data', type: 'bytes' },
              { name: 'expiresAt', type: 'uint256' },
              { name: 'salt', type: 'bytes32' }
            ],
            name: 'externalCall',
            type: 'tuple'
          },
          { name: 'customExternalCallSignature', type: 'bytes' },
          { name: 'maxUncreditedValue', type: 'uint256' },
          { name: 'maxCreditedValue', type: 'uint256' }
        ],
        indexed: false,
        internalType: 'struct CreditsManagerPolygon.UseCreditsArgs',
        name: '_args',
        type: 'tuple'
      }
    ],
    name: 'useCredits',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { indexed: false, internalType: 'bytes32', name: '', type: 'bytes32' }
    ],
    name: 'usedCustomExternalCallSignature',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address'
      }
    ],
    name: 'withdrawERC20',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address'
      }
    ],
    name: 'withdrawERC721',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
