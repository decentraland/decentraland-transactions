export interface EIPProvider {
  request: (reqArgs: { method: string; params?: any[] }) => Promise<any>
  send?: (method: string, params?: any[]) => Promise<any>
}
export interface LegacyProvider {
  send: (method: string, params: any[]) => Promise<any>
}
// We need to create this Provider type to accomodate for the different popular provider implementations.
// All implementations differ sligthly, most notably defining params as `any[] | undefined` (web3x) and `any[]` (ethers)
export type Provider = EIPProvider | LegacyProvider

export type DomainType = {
  name: string
  type: string
}

export type MetaTransactionType = {
  name: string
  type: string
}

export type DomainData = {
  name: string
  version: string
  verifyingContract: string
  salt: string
}

export type FunctionSignature = string

export type ContractData = {
  abi: object[]
  address: string
  name: string
  version: string
  chainId: ChainId
}

export enum ContractName {
  MANAToken = 'MANAToken'
}

export type MetaTxData = {
  functionSignature: string
  contractData: ContractData
}

export type DataToSign = {
  types: {
    EIP712Domain: DomainType[]
    MetaTransaction: MetaTransactionType[]
  }
  domain: DomainData
  primaryType: 'MetaTransaction'
  message: {
    nonce: number
    from: string
    functionSignature: FunctionSignature
  }
}

export type Configuration = {
  serverURL: string
}

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  MATIC_TESTNET = 13881,
  MATIC_MAINNET = 89
}

export const DOMAIN_TYPE: DomainType[] = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' }
]

export const META_TRANSACTION_TYPE: MetaTransactionType[] = [
  { name: 'nonce', type: 'uint256' },
  { name: 'from', type: 'address' },
  { name: 'functionSignature', type: 'bytes' }
]
