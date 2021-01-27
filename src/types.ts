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

export type ContractData = {
  abi: object[]
  address: string
  name: string
}

export type Configuration = {
  serverURL: string
  websocketProvider: string
}

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  KOVAN = 42
}
