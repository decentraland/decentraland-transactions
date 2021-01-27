import { ContractData, Configuration, DataToSign } from '../types'

export type MethodData = {
  functionSignature: string
  contractData: ContractData
}

export type GetSignature = (dataToSign: DataToSign) => Promise<string>

export interface Client {
  sendMetaTransaction(
    methodData: MethodData,
    getSignature: GetSignature,
    configuration: Configuration
  ): Promise<string>

  getSalt(chainId: number): string
}
