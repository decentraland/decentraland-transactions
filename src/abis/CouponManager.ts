export const CouponManager = [
  {
    inputs: [
      { internalType: 'address', name: '_marketplace', type: 'address' },
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'address[]', name: '_allowedCoupons', type: 'address[]' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [{ internalType: 'address', name: '_coupon', type: 'address' }],
    name: 'CouponNotAllowed',
    type: 'error'
  },
  { inputs: [], name: 'Expired', type: 'error' },
  { inputs: [], name: 'ExternalChecksFailed', type: 'error' },
  { inputs: [], name: 'InvalidContractSignatureIndex', type: 'error' },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  { inputs: [], name: 'InvalidSignerSignatureIndex', type: 'error' },
  { inputs: [], name: 'LengthMissmatch', type: 'error' },
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
  { inputs: [], name: 'SignatureOveruse', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'str', type: 'string' }],
    name: 'StringTooLong',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: '_caller', type: 'address' }],
    name: 'UnauthorizedCaller',
    type: 'error'
  },
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
        internalType: 'address',
        name: '_coupon',
        type: 'address'
      },
      { indexed: false, internalType: 'bool', name: '_value', type: 'bool' }
    ],
    name: 'AllowedCouponsUpdated',
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
        internalType: 'bytes32',
        name: '_tradeSignature',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_couponSignature',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_tradeDigest',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_couponDigest',
        type: 'bytes32'
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
                  { internalType: 'bytes', name: 'value', type: 'bytes' },
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
        indexed: false,
        internalType: 'struct CouponTypes.Coupon',
        name: '_coupon',
        type: 'tuple'
      }
    ],
    name: 'CouponApplied',
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
        name: '_marketplace',
        type: 'address'
      }
    ],
    name: 'MarketplaceUpdated',
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
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'allowedCoupons',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
                  { internalType: 'bytes', name: 'value', type: 'bytes' },
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
                  { internalType: 'bytes', name: 'value', type: 'bytes' },
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
        internalType: 'struct CouponTypes.Coupon',
        name: '_coupon',
        type: 'tuple'
      },
      { internalType: 'bytes32', name: '_tradeDigest', type: 'bytes32' },
      { internalType: 'address', name: '_caller', type: 'address' }
    ],
    name: 'applyCoupon',
    outputs: [
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
                  { internalType: 'bytes', name: 'value', type: 'bytes' },
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
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
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
                  { internalType: 'bytes', name: 'value', type: 'bytes' },
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
    name: 'marketplace',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [
      { internalType: 'address[]', name: '_coupons', type: 'address[]' },
      { internalType: 'bool[]', name: '_values', type: 'bool[]' }
    ],
    name: 'updateAllowedCoupons',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_marketplace', type: 'address' }
    ],
    name: 'updateMarketplace',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
