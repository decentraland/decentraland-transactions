export interface Provider {
  send(method: string, params: Array<any>): Promise<any>
}

type DomainType = {
  name: string
  type: string
}

type MetaTransactionType = {
  name: string
  type: string
}

type DomainData = {
  name: string
  version: string
  verifyingContract: string
  salt: string
}

type FunctionSignature = string

export type MethodData = {
  domainType: DomainType[]
  metaTransactionType: MetaTransactionType[]
  domainData: DomainData
  functionSignature: FunctionSignature
}

export type ContractData = {
  abi: object[]
  address: string
  name: string
  version: string
  chainId: ChainId
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
