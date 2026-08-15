# jonathan-russ.com

The source of my personal website, a fully prerendered [Nuxt](https://nuxt.com) 4 application published in German, English, French, and Italian.

## Features

- 🌍 **Four locales:** Serves German, English, French, and Italian from one set of content files.
- ⚡ **Fully prerendered:** Builds every route to static HTML so [Vercel](https://vercel.com) can serve it straight from the CDN.
- 🗂️ **Content-driven:** Reads pages, labels, and translations from typed YAML collections validated with [Zod](https://zod.dev).
- 🐙 **Live GitHub data:** Fetches repositories, pinned projects, and tags through cached server routes.
- 🔎 **SEO at build time:** Generates the sitemap, Open Graph images, schema.org metadata, robots rules, and [`llms.txt`](https://llmstxt.org).
- 🔐 **Strict CSP:** Ships a nonce-based Content Security Policy with [`strict-dynamic`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) and no `unsafe-inline` in `script-src`.
- 🎨 **Light and dark:** Follows the system color scheme and exposes a manual override.
- 🔑 **Managed secrets:** Keeps every variable in Infisical, resolved by Varlock locally and by the Vercel Secret Sync on deploys.

## 📋 Prerequisites

- [Bun](https://bun.com). The repository is locked with `bun.lock`, so use Bun for every command below.
- An [Infisical](https://infisical.com) machine identity with read access to the project. Without it the dev server cannot resolve its environment variables.

## 🚀 Quick Start

Install dependencies. This also runs `nuxt prepare` and installs the Git hooks.

```bash
bun install
```

Provide the two Infisical Universal Auth credentials, either by exporting them from your shell or by copying [`.env.example`](./.env.example) to a local `.env`.

```bash
cp .env.example .env
```

Start the dev server on `http://localhost:3000`.

```bash
bun run dev
```

## 🔐 Environment and Secrets

Only the two Infisical bootstrap credentials live on your machine. Everything else is stored in Infisical and pulled in on demand, so no secret is ever committed.

[`.env.schema`](./.env.schema) is the single source of truth. It declares every variable, its type, and whether it is required, and [Varlock](https://varlock.dev) validates it on each run. Locally, `bun run dev` wraps Nuxt in `varlock run` to fetch the values. On Vercel the Infisical Vercel Secret Sync writes them into the build environment instead, which is why the deployed build runs plain `nuxt build` with no Varlock wrapper.

| Variable                        | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| `INFISICAL_CLIENT_ID`           | Universal Auth identity used to reach Infisical             |
| `INFISICAL_CLIENT_SECRET`       | Secret for that identity, the only real credential you hold |
| `NUXT_SITE_URL`                 | Canonical origin behind every absolute URL                  |
| `NUXT_SITE_NAME`                | Site name used in titles and structured data                |
| `NUXT_PUBLIC_GITHUB_REPO_OWNER` | Repository owner the GitHub endpoints are pinned to         |
| `NUXT_PUBLIC_GITHUB_REPO_NAME`  | Repository name the GitHub endpoints are pinned to          |
| `NUXT_GITHUB_TOKEN`             | Token for the server-side GitHub API calls                  |

Endpoints whose credential is optional stay disabled rather than failing. The Apple [MusicKit](https://developer.apple.com/musickit/) routes, for example, return 404 until their keys are configured.

After editing `.env.schema`, regenerate the types and commit the result.

```bash
bun run env:typegen
```

## 🛠️ Development

| Command                     | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `bun run dev`               | Start the dev server with Varlock resolving secrets |
| `bun run build`             | Build and prerender the production output           |
| `bun run preview`           | Serve the production build locally                  |
| `bun run lint`              | Run ESLint across the repository                    |
| `bun run lint:fix`          | Apply ESLint autofixes                              |
| `bun run typecheck`         | Type check the app with `vue-tsc`                   |
| `bun run format`            | Check formatting with Prettier                      |
| `bun run env:typegen`       | Regenerate `env.d.ts` from `.env.schema`            |
| `bun run env:typegen:check` | Fail if the committed `env.d.ts` is out of date     |

Commits run through `lint-staged`, so only staged files are formatted and linted. Messages are checked by `commitlint` against the [Conventional Commits](https://www.conventionalcommits.org) rules.

> [!IMPORTANT]
> [`@nuxt/content`](https://content.nuxt.com) is pinned to a fork that adds per-locale keys inside a single content file. Repointing that dependency at upstream, or at a branch without a built `dist/`, makes every translation resolve to the base language with no error. See the comment above the module list in [`nuxt.config.ts`](./nuxt.config.ts) before changing it.

### How the content is organized

Content lives in [`content/`](./content) as YAML, one collection per kind of page or component. Each collection is declared in [`content.config.ts`](./content.config.ts) with a Zod schema that is pinned to a matching TypeScript interface in [`shared/types/`](./shared/types), so a schema and its interface cannot drift apart without a compile error.

## ⚖️ License

Licensed under the [MIT license](./LICENSE) © Jonathan Russ.
