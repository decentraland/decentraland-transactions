export const CollectionDiscountCoupon = [
  { inputs: [], name: 'InvalidDiscountType', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'InvalidProof',
    type: 'error'
  },
  { inputs: [], name: 'InvalidReceivedLength', type: 'error' },
  { inputs: [], name: 'InvalidSentLength', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'SignerIsNotTheCreator',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_assetType', type: 'uint256' }],
    name: 'UnsupportedAssetType',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'UnsupportedReceivedAssetType',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
    name: 'UnsupportedSentAssetType',
    type: 'error'
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
    name: 'DISCOUNT_TYPE_FLAT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DISCOUNT_TYPE_RATE',
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
      }
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
    stateMutability: 'view',
    type: 'function'
  }
]
