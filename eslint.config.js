import prettierPlugin from 'eslint-plugin-prettier'
import pluginUnicorn from 'eslint-plugin-unicorn'
import neostandard from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  neostandard(),
  pluginUnicorn.configs['flat/all'],
  prettierPlugin.configs['flat/all'],
  {
    files: ['components/**/*.vue'],
    rules: {
      'unicorn/filename-case': 'off',
    },
    languageOptions: {
      globals: {
        NodeJS: true,
      },
    },
  }
)
