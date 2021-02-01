import {
  getAccount,
  getNonce,
  getSignature,
  getExecuteMetaTransactionData,
  getSalt
} from './utils'
import { getConfiguration } from './configuration'
import {
  Provider,
  Configuration,
  DataToSign,
  ContractData,
  DomainData,
  DOMAIN_TYPE,
  META_TRANSACTION_TYPE
} from './types'

export async function sendMetaTransaction(
  l1Provider: Provider,
  l2Provider: Provider,
  functionSignature: string,
  contractData: ContractData,
  partialConfiguration: Partial<Configuration> = {}
): Promise<string> {
  const configuration = {
    ...getConfiguration(),
    ...partialConfiguration
  }

  try {
    const account = await getAccount(l1Provider)
    const nonce = await getNonce(l2Provider, account, contractData.address)
    const salt = getSalt(contractData.chainId)

    const domainData = getDomainData(salt, contractData)
    const dataToSign = getDataToSign(
      account,
      nonce,
      functionSignature,
      domainData
    )
    const signature = await getSignature(
      l1Provider,
      account,
      JSON.stringify(dataToSign)
    )

    const txData = getExecuteMetaTransactionData(
      account,
      signature,
      functionSignature
    )

    const res = await fetch(`${configuration.serverURL}/transactions`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactionData: {
          from: account,
          params: [contractData.address, txData]
        }
      }),
      method: 'POST'
    })

    const { txHash } = (await res.json()) as { txHash: string }
    return txHash
  } catch (error) {
    console.log(
      'An error occurred trying to send the meta transaction',
      error.message
    )
    throw error
  }
}

function getDataToSign(
  account: string,
  nonce: string,
  functionSignature: string,
  domainData: DomainData
): DataToSign {
  return {
    types: {
      EIP712Domain: DOMAIN_TYPE,
      MetaTransaction: META_TRANSACTION_TYPE
    },
    domain: domainData,
    primaryType: 'MetaTransaction',
    message: {
      nonce: parseInt(nonce, 16),
      from: account,
      functionSignature: functionSignature
    }
  }
}

function getDomainData(salt: string, contractData: ContractData): DomainData {
  return {
    name: contractData.name,
    version: contractData.version,
    verifyingContract: contractData.address,
    salt
  }
}
