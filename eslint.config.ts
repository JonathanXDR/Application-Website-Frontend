import type { Linter } from 'eslint'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  ...neostandard({
    noStyle: true,
    ts: true,
    globals: ['NodeJS', 'MusicKit'],
    ignores: [
      'app/assets/drafts/**/*',
      'env.d.ts',
      ...resolveIgnoresFromGitignore(),
    ],
  }),
]

export default withNuxt(config)
