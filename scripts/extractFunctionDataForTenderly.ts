#!/usr/bin/env ts-node
import { extractFunctionData, ExtractedData } from './utils'

interface TenderlySimulationData {
  data: string
  from: string
}

function formatForTenderly(
  extractedData: ExtractedData
): TenderlySimulationData {
  // For Tenderly simulation, we return just the function data and from address
  // The 'data' should be the function data (without the meta-transaction wrapper)
  // The 'from' should be the account from the extracted data

  return {
    data: extractedData.functionData,
    from: extractedData.account
  }
}

function main(): void {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('Usage: npm run extract-tenderly-data <transaction_data>')
    console.log('')
    console.log('Example:')
    console.log(
      'npm run extract-tenderly-data 0xd8ed1acc0000000000000000000000001234567890abcdef...'
    )
    process.exit(1)
  }

  const transactionData = args[0]

  try {
    const result = extractFunctionData(transactionData)
    const tenderlyData = formatForTenderly(result)

    console.log('\n=== Extracted Data ===')
    console.log(`Account: ${result.account}`)
    console.log(`Function Data: ${result.functionData}`)
    console.log(`Function Data Length: ${result.functionDataLength} bytes`)
    console.log(`Signature: ${result.signature}`)
    console.log(`Signature Length: ${result.signatureLength} bytes`)
    console.log(`First Offset: ${result.firstOffset}`)
    console.log(`Second Offset: ${result.secondOffset}`)

    // If you want to decode the function data further, you can use ethers.js or web3.js
    console.log('\n=== Function Data Analysis ===')
    if (result.functionData.length >= 10) {
      const functionSelector = result.functionData.substring(0, 10)
      console.log(`Function Selector: ${functionSelector}`)
      console.log(`Parameters: ${result.functionData.substring(10)}`)
    }

    console.log('\n=== Tenderly Simulation Data ===')
    console.log('Copy this JSON to use in Tenderly:')
    console.log(JSON.stringify(tenderlyData, null, 2))
  } catch (error) {
    console.error('Error:', (error as Error).message)
    process.exit(1)
  }
}

// Run the script if called directly
if (require.main === module) {
  main()
}
