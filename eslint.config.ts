import type { Linter } from 'eslint'
import neostandard from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  ...neostandard({
    noStyle: true,
    ts: true,
    globals: ['NodeJS'],
  }),
]

export default withNuxt(config)
