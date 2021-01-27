const DOMAIN_TYPE = Object.freeze([
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' }
])

const META_TRANSACTION_TYPE = Object.freeze([
  { name: 'nonce', type: 'uint256' },
  { name: 'from', type: 'address' },
  { name: 'functionSignature', type: 'bytes' }
])

export function doesSomething() {
  const domainData = {
    name: 'Decentraland Collection',
    version: '2',
    verifyingContract: contract.address,
    salt: web3.utils.padLeft(web3.utils.toHex(chainId), 64)
  }

  let nonce = await contract.getNonce(signer)

  let message = {
    nonce: nonce,
    from: signer,
    functionSignature: functionSignature
  }
}
