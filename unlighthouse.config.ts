// Type-only: `unlighthouse-ci` is installed globally in CI where the checkout
// has no `node_modules`, so a value import (`defineUnlighthouseConfig`) could
// not resolve there.
import type { UserConfig } from '@unlighthouse/core'

// `VERCEL_AUTOMATION_BYPASS_SECRET` gets past Vercel Deployment Protection. It
// is a plain GitHub Actions secret rather than a Varlock or Infisical value
// because this config runs in CI, not in the Nuxt build.
// https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
const site = process.env.UNLIGHTHOUSE_SITE
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
const bypassHeaders = bypassSecret
  ? { 'x-vercel-protection-bypass': bypassSecret }
  : undefined

// Unlighthouse cannot discover the routes itself behind Deployment Protection:
// its discovery step loads `/sitemap.xml` through `sitemapper`, which gets none
// of `extraHeaders`, `cookies`, `auth` or `defaultQueryParams`, so the request
// is rejected and Unlighthouse quietly falls back to crawler mode.
//
// Paths, not the absolute `<loc>` values: those are baked from `NUXT_SITE_URL`
// at build time, and Unlighthouse drops sitemap entries whose origin differs
// from the audited site, so a per-commit deployment URL would audit nothing.
async function resolveRoutes(site: string): Promise<string[]> {
  const sitemapUrl = new URL('/sitemap.xml', site)
  const response = await fetch(sitemapUrl, { headers: bypassHeaders ?? {} })
  if (!response.ok) {
    throw new Error(
      `Could not read ${sitemapUrl} (HTTP ${response.status}). A 401 or 403 means VERCEL_AUTOMATION_BYPASS_SECRET is missing or not valid for this deployment. Any other status means the deployment did not serve a sitemap.`,
    )
  }
  const routes = [
    ...(await response.text()).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g),
  ].map(match => new URL(match[1]).pathname)
  if (!routes.length) {
    throw new Error(
      `No <loc> entries found in ${sitemapUrl}. Check that the deployment prerendered a sitemap and that the response is XML rather than a login page.`,
    )
  }
  return routes
}

export default {
  site,
  // Undefined leaves Unlighthouse's own sitemap and crawler discovery in place
  // for ad-hoc local runs against an unprotected site.
  urls: site ? await resolveRoutes(site) : undefined,
  // A request header is the only bypass form that leaves the scores untouched.
  // `x-vercel-set-bypass-cookie` is answered with a redirect that Lighthouse
  // folds into FCP and LCP. `defaultQueryParams` appends the secret to every
  // audited URL, changing the report URLs and the canonical and SEO audits.
  //
  // Lighthouse embeds its settings verbatim in every `lighthouse.json` and
  // `lighthouse.html` it writes, so the workflow redacts the secret before
  // uploading the report. Do not publish `.unlighthouse/` without that step.
  extraHeaders: bypassHeaders ?? false,
  scanner: {
    // Every page carries an `hreflang="x-default"` link to the `/de/`
    // original, so at the `true` default Unlighthouse skips the other locales
    // as translated copies. That audits 4 of 16 routes on the canonical site
    // and none at all on a per-commit deployment URL.
    ignoreI18nPages: false,
  },
} satisfies UserConfig
