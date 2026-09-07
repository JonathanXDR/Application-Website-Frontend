// Type-only, so TypeScript erases it before the file runs. `unlighthouse-ci`
// is installed globally in CI where the checkout has no `node_modules`, so a
// value import (such as `defineUnlighthouseConfig`, an identity function that
// costs nothing to drop) cannot resolve there and the run fails at startup.
import type { UserConfig } from '@unlighthouse/core'

// The Vercel Protection Bypass for Automation secret in
// `VERCEL_AUTOMATION_BYPASS_SECRET` gets past Deployment Protection. It is
// created under Settings > Deployment Protection and arrives as a plain
// GitHub Actions secret rather than through Varlock or Infisical, because
// this config runs in CI and not in the Nuxt build.
// https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
const site = process.env.UNLIGHTHOUSE_SITE
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
const bypassHeaders = bypassSecret
  ? { 'x-vercel-protection-bypass': bypassSecret }
  : undefined

/**
 * Reads the deployment's own sitemap and returns the routes as paths.
 *
 * Unlighthouse cannot do this itself behind Deployment Protection: its
 * discovery step loads `/sitemap.xml` through `sitemapper`, which gets none of
 * `extraHeaders`, `cookies`, `auth`, or `defaultQueryParams`, so the request is
 * rejected and Unlighthouse quietly falls back to crawler mode.
 *
 * Paths, not the absolute `<loc>` values: those are baked from
 * `NUXT_SITE_URL` at build time, and Unlighthouse drops sitemap entries whose
 * origin differs from the audited site, so a per-commit deployment URL would
 * otherwise audit nothing.
 */
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
  // Undefined when `UNLIGHTHOUSE_SITE` is not set, which leaves the built-in
  // sitemap and crawler discovery in place for ad-hoc local runs against an
  // unprotected site.
  urls: site ? await resolveRoutes(site) : undefined,
  // A request header is the only bypass form that leaves the scores untouched.
  // `x-vercel-set-bypass-cookie` is answered with a redirect, and Lighthouse
  // folds that extra hop into FCP and LCP and flags "Avoid multiple page
  // redirects". It exists for tools that lose custom headers on in-browser
  // link clicks, such as Playwright and Cypress. Puppeteer keeps them.
  // `defaultQueryParams` appends the secret to every audited URL, changing both
  // the URLs shown in the report and the canonical and SEO audits.
  //
  // Unlighthouse copies this into `lighthouseOptions`, and Lighthouse embeds
  // its settings verbatim in every `lighthouse.json` and `lighthouse.html` it
  // writes. The workflow redacts the secret from those files before uploading
  // the report, so do not publish `.unlighthouse/` without that step.
  extraHeaders: bypassHeaders ?? false,
  scanner: {
    // Every page carries `<link rel="alternate" hreflang="x-default">` pointing
    // at the `/de/` original, so at the `true` default Unlighthouse treats the
    // other locales as translated copies and skips them. That audits 4 of the
    // 16 prerendered routes on the canonical site, and none at all on a
    // per-commit deployment URL, where no page matches the x-default target.
    ignoreI18nPages: false,
  },
} satisfies UserConfig
