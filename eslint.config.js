import prettierPlugin from 'eslint-plugin-prettier'
import neostandard from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(...neostandard(), prettierPlugin.configs['flat/all'], {
  rules: {
    // Because auto imports -.-
    'no-undef': 'off',
  },
})
