import type { Linter } from 'eslint'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import withNuxt from './.nuxt/eslint.config.mjs'

const config: Linter.Config[] = [
  // Ignores-only config object, which flat config treats as a GLOBAL ignore.
  // Passing these through neostandard's `ignores` option instead attaches them
  // next to a `files` key on neostandard's own layers, which only excludes the
  // paths from those layers. The `@nuxt/eslint` stylistic/tooling/vue layers
  // kept linting them, so `eslint .` reported ~1800 problems in ignored files.
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
