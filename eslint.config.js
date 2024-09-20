import neostandard from 'neostandard'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  neostandard({
    ts: true
  })
)
