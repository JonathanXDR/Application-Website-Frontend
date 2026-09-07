import type { Linter } from 'eslint'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  // An ignores-only object is a global ignore. Passing the patterns through
  // neostandard's `ignores` option instead puts them next to a `files` key on
  // neostandard's own layers, so the `@nuxt/eslint` layers keep linting them.
  {
    ignores: [
      'app/assets/drafts/**/*',
      'env.d.ts',
      ...resolveIgnoresFromGitignore(),
    ],
  },
  ...neostandard({
    noStyle: true,
    ts: true,
    globals: ['NodeJS', 'MusicKit'],
  }),
]

export default withNuxt(config)
