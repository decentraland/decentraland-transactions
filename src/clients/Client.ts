import { ContractData, DataToSign } from '../types'

export type MethodData = {
  functionSignature: string
  contractData: ContractData
}

export type GetSignature = (
  signer: string,
  dataToSign: DataToSign
) => Promise<string>

export interface Client {
  sendMetaTransaction(
    methodData: MethodData,
    getSignature: GetSignature
  ): Promise<string>
}
