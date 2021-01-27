import { ethers, Contract } from 'ethers'
import { getConfiguration } from './configuration'
import { ContractData, MethodData, DataToSign, Configuration } from './types'

export async function sendMetaTransaction(
  signer: string,
  contractData: ContractData,
  methodData: MethodData,
  configuration: Configuration = getConfiguration()
) {
  const mumbaiProvider = new ethers.providers.WebSocketProvider(
    configuration.websocketProvider
  )

  const mana = new Contract(
    contractData.address,
    contractData.abi,
    mumbaiProvider
  )

  let nonce = await mana.getNonce(signer)

  const dataToSign: DataToSign = {
    types: {
      EIP712Domain: methodData.domainType,
      MetaTransaction: methodData.metaTransactionType
    },
    domain: methodData.domainData,
    primaryType: 'MetaTransaction',
    message: {
      nonce: parseInt(nonce),
      from: signer,
      functionSignature: methodData.functionSignature
    }
  }

  try {
    const sig = await mumbaiProvider.send('eth_signTypedData_v4', [
      signer,
      dataToSign
    ])

    const signature = sig.substring(2)
    const r = '0x' + signature.substring(0, 64)
    const s = '0x' + signature.substring(64, 128)
    const v = '0x' + signature.substring(128, 130)

    const txMethod = await mana.populateTransaction.executeMetaTransaction(
      signer,
      dataToSign.message.functionSignature,
      r,
      s,
      v
    )

    const res = await fetch(configuration.serverURL, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        transactionData: {
          from: signer,
          params: [mana.address, txMethod.data]
        }
      }),
      method: 'POST'
    })

    return await res.json()
  } catch (error) {
    console.log(
      'An error occurred trying to send the meta transaction',
      error.message
    )
    return error
  }
}
