import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'

import typescript from 'rollup-plugin-typescript2'

const PROD = !!process.env.CI

console.log(`production: ${PROD}`)

const plugins = [
  json({
    compact: true
  }),
  typescript({
    verbosity: 2,
    clean: true,
    useTsconfigDeclarationDir: true
  }),
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs({
    ignoreGlobal: true,
    include: [/node_modules/],
  }),

  PROD && terser({}),
  globals({})
]

export default {
  input: './src/index.ts',
  context: 'globalThis',
  plugins,
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'decentraland-transactions',
      sourcemap: true,
      amd: {
        id: 'decentraland-transactions'
      }
    }
  ]
}
