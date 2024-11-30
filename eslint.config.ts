import type { Linter } from 'eslint'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import neostandard from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  ...neostandard(),
  {
    ...pluginPrettier,
    rules: {
      // Because auto imports -.-
      'no-undef': 'off',
    },
  },
]

export default withNuxt(config)
