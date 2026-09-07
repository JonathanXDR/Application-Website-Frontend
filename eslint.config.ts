import type { Linter } from 'eslint'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  // Ignores-only config object, which flat config treats as a GLOBAL ignore.
  // Passing them through neostandard's `ignores` option instead attaches them
  // next to a `files` key on neostandard's own layers, so the `@nuxt/eslint`
  // layers kept linting them and `eslint .` reported ~1800 problems in ignored
  // files.
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
