export const OffChainMarketplace = [
  {
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'address', name: '_couponManager', type: 'address' },
      { internalType: 'address', name: '_feeCollector', type: 'address' },
      { internalType: 'uint256', name: '_feeRate', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'AddressEmptyCode',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'AddressInsufficientBalance',
    type: 'error'
  },
  { inputs: [], name: 'EnforcedPause', type: 'error' },
  { inputs: [], name: 'ExpectedPause', type: 'error' },
  { inputs: [], name: 'Expired', type: 'error' },
  { inputs: [], name: 'ExternalChecksFailed', type: 'error' },
  { inputs: [], name: 'FailedInnerCall', type: 'error' },
  { inputs: [], name: 'InvalidContractSignatureIndex', type: 'error' },
  { inputs: [], name: 'InvalidFingerprint', type: 'error' },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  { inputs: [], name: 'InvalidSignerSignatureIndex', type: 'error' },
  { inputs: [], name: 'NotAllowed', type: 'error' },
  { inputs: [], name: 'NotEffective', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error'
  },
  { inputs: [], name: 'SignatureReuse', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'str', type: 'string' }],
    name: 'StringTooLong',
    type: 'error'
  },
  { inputs: [], name: 'TradesAndCouponsLengthMismatch', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: '_assetType', type: 'uint256' }],
    name: 'UnsupportedAssetType',
    type: 'error'
  },
  { inputs: [], name: 'UsedTradeId', type: 'error' },
  { inputs: [], name: 'UsingCancelledSignature', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_newValue',
        type: 'uint256'
      }
    ],
    name: 'ContractSignatureIndexIncreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_couponManager',
        type: 'address'
      }
    ],
    name: 'CouponManagerUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_feeCollector',
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
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_feeRate',
        type: 'uint256'
      }
    ],
    name: 'FeeRateUpdated',
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
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_signature',
        type: 'bytes32'
      }
    ],
    name: 'SignatureCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_newValue',
        type: 'uint256'
      }
    ],
    name: 'SignerSignatureIndexIncreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_signature',
        type: 'bytes32'
      }
    ],
    name: 'Traded',
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
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'signer', type: 'address' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          {
            components: [
              { internalType: 'uint256', name: 'uses', type: 'uint256' },
              { internalType: 'uint256', name: 'expiration', type: 'uint256' },
              { internalType: 'uint256', name: 'effective', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'contractSignatureIndex',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'signerSignatureIndex',
                type: 'uint256'
              },
              { internalType: 'bytes32', name: 'allowedRoot', type: 'bytes32' },
              {
                internalType: 'bytes32[]',
                name: 'allowedProof',
                type: 'bytes32[]'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
                  { internalType: 'uint256', name: 'value', type: 'uint256' },
                  { internalType: 'bool', name: 'required', type: 'bool' }
                ],
                internalType: 'struct CommonTypes.ExternalCheck[]',
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct CommonTypes.Checks',
            name: 'checks',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'sent',
            type: 'tuple[]'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'received',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct MarketplaceTypes.Trade[]',
        name: '_trades',
        type: 'tuple[]'
      }
    ],
    name: 'accept',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'signer', type: 'address' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          {
            components: [
              { internalType: 'uint256', name: 'uses', type: 'uint256' },
              { internalType: 'uint256', name: 'expiration', type: 'uint256' },
              { internalType: 'uint256', name: 'effective', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'contractSignatureIndex',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'signerSignatureIndex',
                type: 'uint256'
              },
              { internalType: 'bytes32', name: 'allowedRoot', type: 'bytes32' },
              {
                internalType: 'bytes32[]',
                name: 'allowedProof',
                type: 'bytes32[]'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
                  { internalType: 'uint256', name: 'value', type: 'uint256' },
                  { internalType: 'bool', name: 'required', type: 'bool' }
                ],
                internalType: 'struct CommonTypes.ExternalCheck[]',
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct CommonTypes.Checks',
            name: 'checks',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'sent',
            type: 'tuple[]'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'received',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct MarketplaceTypes.Trade[]',
        name: '_trades',
        type: 'tuple[]'
      },
      {
        components: [
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          {
            components: [
              { internalType: 'uint256', name: 'uses', type: 'uint256' },
              { internalType: 'uint256', name: 'expiration', type: 'uint256' },
              { internalType: 'uint256', name: 'effective', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'contractSignatureIndex',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'signerSignatureIndex',
                type: 'uint256'
              },
              { internalType: 'bytes32', name: 'allowedRoot', type: 'bytes32' },
              {
                internalType: 'bytes32[]',
                name: 'allowedProof',
                type: 'bytes32[]'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
                  { internalType: 'uint256', name: 'value', type: 'uint256' },
                  { internalType: 'bool', name: 'required', type: 'bool' }
                ],
                internalType: 'struct CommonTypes.ExternalCheck[]',
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct CommonTypes.Checks',
            name: 'checks',
            type: 'tuple'
          },
          { internalType: 'address', name: 'couponAddress', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          { internalType: 'bytes', name: 'callerData', type: 'bytes' }
        ],
        internalType: 'struct CouponTypes.Coupon[]',
        name: '_coupons',
        type: 'tuple[]'
      }
    ],
    name: 'acceptWithCoupon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'signer', type: 'address' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          {
            components: [
              { internalType: 'uint256', name: 'uses', type: 'uint256' },
              { internalType: 'uint256', name: 'expiration', type: 'uint256' },
              { internalType: 'uint256', name: 'effective', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'contractSignatureIndex',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'signerSignatureIndex',
                type: 'uint256'
              },
              { internalType: 'bytes32', name: 'allowedRoot', type: 'bytes32' },
              {
                internalType: 'bytes32[]',
                name: 'allowedProof',
                type: 'bytes32[]'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
                  { internalType: 'uint256', name: 'value', type: 'uint256' },
                  { internalType: 'bool', name: 'required', type: 'bool' }
                ],
                internalType: 'struct CommonTypes.ExternalCheck[]',
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct CommonTypes.Checks',
            name: 'checks',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'sent',
            type: 'tuple[]'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'received',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct MarketplaceTypes.Trade[]',
        name: '_trades',
        type: 'tuple[]'
      }
    ],
    name: 'cancelSignature',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'cancelledSignatures',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractSignatureIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'couponManager',
    outputs: [
      { internalType: 'contract ICouponManager', name: '', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeCollector',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'signer', type: 'address' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          {
            components: [
              { internalType: 'uint256', name: 'uses', type: 'uint256' },
              { internalType: 'uint256', name: 'expiration', type: 'uint256' },
              { internalType: 'uint256', name: 'effective', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'contractSignatureIndex',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'signerSignatureIndex',
                type: 'uint256'
              },
              { internalType: 'bytes32', name: 'allowedRoot', type: 'bytes32' },
              {
                internalType: 'bytes32[]',
                name: 'allowedProof',
                type: 'bytes32[]'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
                  { internalType: 'uint256', name: 'value', type: 'uint256' },
                  { internalType: 'bool', name: 'required', type: 'bool' }
                ],
                internalType: 'struct CommonTypes.ExternalCheck[]',
                name: 'externalChecks',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct CommonTypes.Checks',
            name: 'checks',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'sent',
            type: 'tuple[]'
          },
          {
            components: [
              { internalType: 'uint256', name: 'assetType', type: 'uint256' },
              {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'address', name: 'beneficiary', type: 'address' },
              { internalType: 'bytes', name: 'extra', type: 'bytes' }
            ],
            internalType: 'struct MarketplaceTypes.Asset[]',
            name: 'received',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct MarketplaceTypes.Trade',
        name: '_trade',
        type: 'tuple'
      },
      { internalType: 'address', name: '_caller', type: 'address' }
    ],
    name: 'getTradeId',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'increaseContractSignatureIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'increaseSignerSignatureIndex',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'signatureUses',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'signerSignatureIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
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
  },
  {
    inputs: [
      { internalType: 'address', name: '_couponManager', type: 'address' }
    ],
    name: 'updateCouponManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_feeCollector', type: 'address' }
    ],
    name: 'updateFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_feeRate', type: 'uint256' }],
    name: 'updateFeeRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'usedTradeIds',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
]
