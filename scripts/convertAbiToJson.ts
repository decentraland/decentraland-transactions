#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'

interface AbiItem {
  constant?: boolean
  inputs?: Array<{
    name: string
    type: string
    internalType?: string
    indexed?: boolean
  }>
  name?: string
  outputs?: Array<{
    name: string
    type: string
    internalType?: string
  }>
  payable?: boolean
  stateMutability?: string
  type: string
  anonymous?: boolean
}

type Abi = AbiItem[]

const getAbi = (module: any) => {
  if (module.default) {
    return module.default as Abi
  }

  const exports = Object.keys(module)
  for (const exportName of exports) {
    const exported = module[exportName]
    if (exported?.[0]?.type) {
      return exported
    }
  }

  throw new Error('No valid ABI found in the TypeScript file')
}

/**
 * Converts a TypeScript ABI file to JSON format
 * @param inputPath - Path to the TypeScript ABI file
 * @param outputPath - Path where the JSON file should be saved (optional)
 */
async function convertAbiToJson(
  inputPath: string,
  outputPath?: string
): Promise<void> {
  try {
    // Resolve the absolute path
    const absoluteInputPath = path.resolve(inputPath)

    // Check if the input file exists
    if (!fs.existsSync(absoluteInputPath)) {
      throw new Error(`Input file not found: ${absoluteInputPath}`)
    }

    // Get the file name without extension
    const fileName = path.basename(
      absoluteInputPath,
      path.extname(absoluteInputPath)
    )

    // Determine output path if not provided
    const outputFilePath =
      outputPath ||
      path.join(path.dirname(absoluteInputPath), `${fileName}.json`)

    console.log(`Converting ${absoluteInputPath} to ${outputFilePath}...`)

    // Dynamically import the ABI from the TypeScript file
    // We need to use require for dynamic imports in this context
    const module = require(absoluteInputPath)

    // Find the exported ABI (it should be the default export or a named export)
    const abi = getAbi(module)

    // Validate that it's actually an ABI
    if (!Array.isArray(abi)) {
      throw new Error('ABI must be an array')
    }

    // Write the ABI to JSON file
    const jsonContent = JSON.stringify(abi, null, 2)
    fs.writeFileSync(outputFilePath, jsonContent, 'utf8')

    console.log(`✅ Successfully converted ABI to JSON: ${outputFilePath}`)
    console.log(`📊 ABI contains ${abi.length} items`)
  } catch (error) {
    console.error('❌ Error converting ABI to JSON:', error)
    process.exit(1)
  }
}

/**
 * Converts all ABI TypeScript files in a directory to JSON
 * @param inputDir - Directory containing TypeScript ABI files
 * @param outputDir - Directory where JSON files should be saved (optional)
 */
async function convertAllAbisToJson(
  inputDir: string,
  outputDir?: string
): Promise<void> {
  try {
    const absoluteInputDir = path.resolve(inputDir)

    if (!fs.existsSync(absoluteInputDir)) {
      throw new Error(`Input directory not found: ${absoluteInputDir}`)
    }

    const outputDirectory = outputDir || absoluteInputDir

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true })
    }

    // Find all TypeScript files in the directory
    const files = fs.readdirSync(absoluteInputDir)
    const tsFiles = files.filter(
      file =>
        file.endsWith('.ts') &&
        !file.endsWith('.d.ts') &&
        file !== 'index.ts'
    )

    console.log(`Found ${tsFiles.length} TypeScript files to convert...`)

    for (const file of tsFiles) {
      const inputPath = path.join(absoluteInputDir, file)
      const outputPath = path.join(
        outputDirectory,
        `${path.basename(file, '.ts')}.json`
      )

      try {
        await convertAbiToJson(inputPath, outputPath)
      } catch (error) {
        console.error(`Failed to convert ${file}:`, error)
      }
    }

    console.log('✅ All conversions completed!')
  } catch (error) {
    console.error('❌ Error converting ABIs to JSON:', error)
    process.exit(1)
  }
}

// CLI interface
async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
Usage:
  npm run convert-abi <input-file> [output-file]
  npm run convert-abi --all <input-directory> [output-directory]

Examples:
  npm run convert-abi src/abis/ERC20.ts
  npm run convert-abi src/abis/ERC20.ts src/abis/ERC20.json
  npm run convert-abi --all src/abis/
  npm run convert-abi --all src/abis/ output/abis/
`)
    process.exit(0)
  }

  if (args[0] === '--all') {
    if (args.length < 2) {
      console.error('❌ Please provide an input directory when using --all')
      process.exit(1)
    }
    await convertAllAbisToJson(args[1], args[2])
  } else {
    await convertAbiToJson(args[0], args[1])
  }
}

// Run the script if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error)
    process.exit(1)
  })
}

export { convertAbiToJson, convertAllAbisToJson }
