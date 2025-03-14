export const CreditsManager = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' }
            ],
            internalType: 'struct CreditsManagerPolygon.Credit[]',
            name: 'credits',
            type: 'tuple[]'
          },
          {
            internalType: 'bytes[]',
            name: 'creditsSignatures',
            type: 'bytes[]'
          },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes4', name: 'selector', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
              { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
              { internalType: 'bytes32', name: 'salt', type: 'bytes32' }
            ],
            internalType: 'struct CreditsManagerPolygon.ExternalCall',
            name: 'externalCall',
            type: 'tuple'
          },
          {
            internalType: 'bytes',
            name: 'customExternalCallSignature',
            type: 'bytes'
          },
          {
            internalType: 'uint256',
            name: 'maxUncreditedValue',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'maxCreditedValue', type: 'uint256' }
        ],
        internalType: 'struct CreditsManagerPolygon.UseCreditsArgs',
        name: '_args',
        type: 'tuple'
      }
    ],
    name: 'useCredits',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
