#!/usr/bin/env ts-node

/**
 * TypeScript script to extract function data from the output of getOffchainExecuteMetaTransactionData
 * and format it for Tenderly transaction simulation
 *
 * The output structure is:
 * 0x + functionSelector + account + offset1 + offset2 + length1 + functionData + length2 + signature
 */

interface ExtractedData {
  functionData: string
  signature: string
  account: string
  functionDataLength: number
  signatureLength: number
  firstOffset: string
  secondOffset: string
}

interface TenderlySimulationData {
  data: string
  from: string
}

function extractFunctionData(transactionData: string): ExtractedData {
  // Remove 0x prefix if present
  const data = transactionData.startsWith('0x')
    ? transactionData.slice(2)
    : transactionData

  // Function selector is 4 bytes (8 hex chars)
  const FUNCTION_SELECTOR_LENGTH = 8
  const FUNCTION_SELECTOR = 'd8ed1acc'

  // Check if this is the correct function
  const actualSelector = data.substring(0, FUNCTION_SELECTOR_LENGTH)
  if (actualSelector !== FUNCTION_SELECTOR) {
    throw new Error(
      `Invalid function selector. Expected ${FUNCTION_SELECTOR}, got ${actualSelector}`
    )
  }

  // Each 32-byte field is 64 hex characters
  const FIELD_SIZE = 64

  // Skip function selector (4 bytes = 8 hex chars)
  let position = FUNCTION_SELECTOR_LENGTH

  // Skip account address (32 bytes)
  position += FIELD_SIZE

  // Skip first offset (32 bytes) - should be '60'
  const firstOffset = data.substring(position, position + FIELD_SIZE)
  console.log(`First offset: 0x${firstOffset}`)
  position += FIELD_SIZE

  // Skip second offset (32 bytes)
  const secondOffset = data.substring(position, position + FIELD_SIZE)
  console.log(`Second offset: 0x${secondOffset}`)
  position += FIELD_SIZE

  // Get function data length (32 bytes)
  const functionDataLengthHex = data.substring(position, position + FIELD_SIZE)
  const functionDataLength = parseInt(functionDataLengthHex, 16)
  console.log(`Function data length: ${functionDataLength} bytes`)
  position += FIELD_SIZE

  // Extract function data
  const functionData = data.substring(
    position,
    position + functionDataLength * 2
  )
  position += functionDataLength * 2

  // Skip signature length (32 bytes)
  const signatureLengthHex = data.substring(position, position + FIELD_SIZE)
  const signatureLength = parseInt(signatureLengthHex, 16)
  console.log(`Signature length: ${signatureLength} bytes`)
  position += FIELD_SIZE

  // Extract signature
  const signature = data.substring(position, position + signatureLength * 2)

  return {
    functionData: `0x${functionData}`,
    signature: `0x${signature}`,
    account: `0x${data.substring(
      FUNCTION_SELECTOR_LENGTH + FIELD_SIZE - 40,
      FUNCTION_SELECTOR_LENGTH + FIELD_SIZE
    )}`,
    functionDataLength,
    signatureLength,
    firstOffset: `0x${firstOffset}`,
    secondOffset: `0x${secondOffset}`
  }
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

export {
  extractFunctionData,
  formatForTenderly,
  ExtractedData,
  TenderlySimulationData
}
