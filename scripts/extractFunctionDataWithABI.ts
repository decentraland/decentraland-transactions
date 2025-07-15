#!/usr/bin/env ts-node
import { ethers } from 'ethers'
import { extractFunctionData } from './utils'

interface DecodedFunctionData {
  functionName: string
  functionSignature: string
  parameters: Array<{
    name: string
    type: string
    value: any
  }>
  rawFunctionData: string
}

function decodeFunctionData(
  functionData: string,
  abi: any[]
): DecodedFunctionData | null {
  try {
    // Create an interface from the ABI
    const iface = new ethers.utils.Interface(abi)

    // Parse the function data
    const parsed = iface.parseTransaction({ data: functionData })

    // Decode the parameters
    const parameters = parsed.functionFragment.inputs.map(
      (input: any, index: number) => ({
        name: input.name || `param${index}`,
        type: input.type,
        value: parsed.args[index]
      })
    )

    return {
      functionName: parsed.functionFragment.name,
      functionSignature: parsed.functionFragment.format(),
      parameters,
      rawFunctionData: functionData
    }
  } catch (error) {
    console.warn(`Failed to decode function data: ${(error as Error).message}`)
    return null
  }
}

function loadABIFromFile(filePath: string): any[] {
  try {
    const fs = require('fs')
    const abiContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(abiContent)
  } catch (error) {
    throw new Error(
      `Failed to load ABI from file ${filePath}: ${(error as Error).message}`
    )
  }
}

function convertBigNumbersToValues(parameters: any[]): any[] {
  return parameters.map(param => {
    if (param._isBigNumber) {
      return param.toString()
    } else if (Array.isArray(param)) {
      return convertBigNumbersToValues(param)
    } else if (param.type === 'tuple') {
      return convertBigNumbersToValues(param.value)
    }

    return param
  })
}

function main(): void {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(
      'Usage: npm run extract-function-data <transaction_data> [abi_file_path]'
    )
    console.log('')
    console.log('Arguments:')
    console.log(
      '  transaction_data    The hex transaction data from getOffchainExecuteMetaTransactionData'
    )
    console.log(
      '  abi_file_path       (Optional) Path to a JSON file containing the contract ABI'
    )
    console.log('')
    console.log('Examples:')
    console.log(
      '  npm run extract-function-data 0xd8ed1acc0000000000000000000000001234567890abcdef...'
    )
    console.log(
      '  npm run extract-function-data 0xd8ed1acc0000000000000000000000001234567890abcdef... ./contract-abi.json'
    )
    process.exit(1)
  }

  const transactionData = args[0]
  const abiFilePath = args[1]

  try {
    const result = extractFunctionData(transactionData)

    console.log('\n=== Extracted Data ===')
    console.log(`Account: ${result.account}`)
    console.log(`Function Data: ${result.functionData}`)
    console.log(`Function Data Length: ${result.functionDataLength} bytes`)
    console.log(`Signature: ${result.signature}`)
    console.log(`Signature Length: ${result.signatureLength} bytes`)
    console.log(`First Offset: ${result.firstOffset}`)
    console.log(`Second Offset: ${result.secondOffset}`)

    // Try to decode the function data if ABI is provided
    if (abiFilePath) {
      console.log('\n=== Function Decoding ===')
      try {
        const abi = loadABIFromFile(abiFilePath)
        const decoded = decodeFunctionData(result.functionData, abi)

        if (decoded) {
          console.log(`Function Name: ${decoded.functionName}`)
          console.log(`Function Signature: ${decoded.functionSignature}`)
          console.log('')
          console.log('Parameters:')
          console.log(
            JSON.stringify(
              convertBigNumbersToValues(decoded.parameters),
              null,
              2
            )
          )
        } else {
          console.log('Could not decode function data with provided ABI')
          console.log(
            'Function Selector:',
            result.functionData.substring(0, 10)
          )
          console.log('Raw Parameters:', result.functionData.substring(10))
        }
      } catch (error) {
        console.error('Error loading or using ABI:', (error as Error).message)
      }
    } else {
      console.log('\n=== Function Data Analysis (No ABI) ===')
      if (result.functionData.length >= 10) {
        const functionSelector = result.functionData.substring(0, 10)
        console.log(`Function Selector: ${functionSelector}`)
        console.log(`Parameters: ${result.functionData.substring(10)}`)
        console.log('\nTo decode function parameters, provide an ABI file:')
        console.log(
          'npm run extract-function-data <transaction_data> <abi_file_path>'
        )
      }
    }
  } catch (error) {
    console.error('Error:', (error as Error).message)
    process.exit(1)
  }
}

// Run the script if called directly
if (require.main === module) {
  main()
}

export { decodeFunctionData, DecodedFunctionData }
