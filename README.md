# jonathan-russ.com

The source of my personal website, a prerendered [Nuxt](https://nuxt.com) 4 application published in German, English, French, and Italian.

## ✨ Features

- 🌍 **Four locales:** Serves German, English, French, and Italian from one set of content files.
- ⚡ **Prerendered:** Builds every page to static HTML so [Vercel](https://vercel.com) can serve it straight from the CDN. Only the error page renders at runtime, because a 404 can hit any URL.
- 🗂️ **Content-driven:** Reads pages, labels, and translations from typed YAML collections validated with [Zod](https://zod.dev).
- 🐙 **Live GitHub data:** Fetches repositories, pinned projects, and tags through cached server routes.
- 🔌 **Proxied APIs:** Reaches Apple Music and Flick through server routes that stay disabled until their keys are set.
- 🔎 **SEO at build time:** Generates the sitemap, Open Graph images, schema.org metadata, robots rules, and [`llms.txt`](https://llmstxt.org).
- 🔐 **Strict CSP:** Ships a nonce-based Content Security Policy with [`strict-dynamic`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src) and no `unsafe-inline` in `script-src`.
- 📈 **Analytics:** Includes Vercel Analytics and Speed Insights, and loads Google Analytics only when a measurement ID is set.
- 🎨 **Light and dark:** Follows the system color scheme and exposes a manual override.
- 🔑 **Managed secrets:** Resolves every secret from Infisical, through Varlock locally and the Vercel Secret Sync on deploys.

## 📋 Prerequisites

- [Bun](https://bun.com). The repository is locked with `bun.lock`, so use Bun for every command below.
- [Node.js](https://nodejs.org) 24 or newer. `@nuxt/content` reads its database through the `native` SQLite connector, which needs the built-in `node:sqlite` module in dev, during prerender, and on the deployed error page.
- An [Infisical](https://infisical.com) machine identity with read access to the project. Without it the dev server cannot resolve its environment variables.

## 🚀 Quick Start

Install dependencies. This also runs `nuxt prepare`, installs the Git hooks, and regenerates the local `skilld` agent skills.

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

[`.env.schema`](./.env.schema) is the single source of truth. It declares every variable, its type, and whether it is required, and [Varlock](https://varlock.dev) validates it on each run.

Locally, `bun run dev` wraps Nuxt in `varlock run` to fetch the values. On Vercel the Infisical Vercel Secret Sync writes them into the build environment instead, which is why the deployed build runs plain `nuxt build` with no Varlock wrapper.

| Variable                                  | Purpose                                                    |
| ----------------------------------------- | ---------------------------------------------------------- |
| `INFISICAL_CLIENT_ID`                     | Universal Auth identity used to reach Infisical            |
| `INFISICAL_CLIENT_SECRET`                 | Secret for that identity                                   |
| `NUXT_SITE_URL`                           | Canonical origin behind every absolute URL                 |
| `NUXT_SITE_NAME`                          | Site name used in titles and structured data               |
| `NUXT_PUBLIC_GITHUB_REPO_OWNER`           | Repository owner the GitHub endpoints are pinned to        |
| `NUXT_PUBLIC_GITHUB_REPO_NAME`            | Repository name the GitHub endpoints are pinned to         |
| `NUXT_GITHUB_TOKEN`                       | Token for the server-side GitHub API calls                 |
| `NUXT_PUBLIC_APP_ENVIRONMENT`             | `development` switches the accent color and favicon        |
| `NUXT_FLICK_API_KEY`                      | Key for the Flick endpoints                                |
| `NUXT_APPLE_DEVELOPER_TEAM_ID`            | Apple team behind the MusicKit token                       |
| `NUXT_APPLE_DEVELOPER_KEY_ID`             | MusicKit key ID                                            |
| `NUXT_APPLE_DEVELOPER_PRIVATE_KEY`        | Base64-encoded MusicKit signing key                        |
| `NUXT_APPLE_MUSIC_USER_TOKEN`             | `Music-User-Token` for the library endpoints               |
| `NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID` | Google Analytics measurement ID, optional                  |
| `NUXT_OG_IMAGE_SECRET`                    | Signs `og:image` URLs, optional while they are prerendered |

Endpoints whose credential is optional stay disabled rather than failing. The Apple [MusicKit](https://developer.apple.com/musickit/) and Flick endpoints return 404 until their keys are configured.

After editing `.env.schema`, regenerate the types and commit the result.

```bash
bun run env:typegen
```

## 🛠️ Development

| Command                     | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `bun run dev`               | Start the dev server with Varlock resolving secrets |
| `bun run build`             | Build and prerender the production output           |
| `bun run check:build`       | Vercel build gate, exits 1 to run the build         |
| `bun run preview`           | Serve the production build locally                  |
| `bun run lint`              | Run ESLint across the repository                    |
| `bun run lint:fix`          | Apply ESLint autofixes                              |
| `bun run typecheck`         | Prepare Nuxt types, then type check with `vue-tsc`  |
| `bun run format`            | Check formatting with Prettier                      |
| `bun run format:fix`        | Apply Prettier formatting                           |
| `bun run env:typegen`       | Regenerate `env.d.ts` from `.env.schema`            |
| `bun run env:typegen:check` | Fail if the committed `env.d.ts` is out of date     |

`bun run check:build` needs GNU `date -d`, which macOS does not provide, so a local run always reports a skip.

Commits run through `lint-staged`. Prettier and ESLint touch only the staged files, and any staged `.ts`, `.tsx`, or `.vue` file also triggers a project-wide type check. Messages are checked by `commitlint` against the [Conventional Commits](https://www.conventionalcommits.org) rules.

> [!IMPORTANT]
> [`@nuxt/content`](https://content.nuxt.com) is pinned to a fork that adds per-locale keys inside a single content file. Repointing that dependency at upstream, or at a branch without a built `dist/`, makes every translation resolve to the base language with no error. See the comment above the `@nuxt/content` entry in [`nuxt.config.ts`](./nuxt.config.ts) before changing it.

## 🧩 Content Model

Content lives in [`content/`](./content) as YAML, one collection per kind of page or component. Each collection is declared in [`content.config.ts`](./content.config.ts) with a Zod schema. The atoms and composites those schemas are built from carry `satisfies z.ZodType<...>` against their interface in [`shared/types/`](./shared/types), so changing one without the other is a compile error. The collection wrappers are read through the generated query types, so there is no interface to pin them to.

## ⚖️ License

Licensed under the [MIT license](./LICENSE) © Jonathan Russ.
