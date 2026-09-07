// A type-only import, which TypeScript erases before the file ever runs.
// `unlighthouse-ci` is installed globally in CI and the checkout has no
// `node_modules`, so a value import (such as the `defineUnlighthouseConfig`
// helper) cannot be resolved there and the run fails before it starts. The
// helper is an identity function, so nothing is lost by dropping it.
import type { UserConfig } from '@unlighthouse/core'

// Site to audit, and the Vercel Protection Bypass for Automation secret that
// gets past Deployment Protection. The secret is created under
// Settings > Deployment Protection. It arrives as a plain GitHub Actions secret
// rather than through Varlock or Infisical, because this config runs in CI and
// not in the Nuxt build.
// https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
const site = process.env.UNLIGHTHOUSE_SITE
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
const bypassHeaders = bypassSecret
  ? { 'x-vercel-protection-bypass': bypassSecret }
  : undefined

/**
 * Reads the deployment's own sitemap and returns the routes as paths.
 *
 * Unlighthouse cannot do this itself behind Deployment Protection. Its
 * discovery step loads `/sitemap.xml` through the `sitemapper` package.
 * `sitemapper` receives the bare URL and none of `extraHeaders`, `cookies`,
 * `auth`, or `defaultQueryParams`, so the request is rejected, the sitemap step
 * finds zero routes, and Unlighthouse quietly falls back to crawler mode.
 * Fetching it here instead applies the bypass header like any other request.
 *
 * Paths work on any site, but the absolute `<loc>` values do not. `sitemap.xml`
 * holds URLs baked from `NUXT_SITE_URL` at build time, and Unlighthouse drops
 * sitemap entries whose origin differs from the site being audited. Paths skip
 * that check and resolve against whichever site is passed in, so a per-commit
 * deployment URL audits the same 16 routes as the canonical site.
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
  // Skipped when `UNLIGHTHOUSE_SITE` is not set, which leaves the built-in
  // sitemap and crawler discovery in place for ad-hoc local runs against an
  // unprotected site.
  urls: site ? await resolveRoutes(site) : undefined,
  // A request header is the only bypass form that leaves the scores untouched.
  // Both alternatives distort the report:
  //   * `x-vercel-set-bypass-cookie` is answered with a redirect carrying a
  //     `Set-Cookie`, so every navigation gains an extra hop. The browser does
  //     not count that hop as a new navigation, so Lighthouse folds its time
  //     into FCP and LCP and flags it under "Avoid multiple page redirects".
  //     The header exists for tools like Playwright and Cypress, which lose
  //     custom headers on in-browser link clicks. Puppeteer keeps them, so
  //     `x-vercel-set-bypass-cookie` is unnecessary here.
  //   * `defaultQueryParams` appends the secret to every audited URL, changing
  //     both the URLs shown in the report and the canonical and SEO audits.
  //
  // Unlighthouse copies this into `lighthouseOptions`, and Lighthouse embeds
  // its settings verbatim in every `lighthouse.json` and `lighthouse.html` it
  // writes. The workflow redacts the secret from those files before uploading
  // the report, so do not publish `.unlighthouse/` without that step.
  extraHeaders: bypassHeaders ?? false,
  scanner: {
    // Every page carries `<link rel="alternate" hreflang="x-default">` pointing
    // at the `/de/` original, so at the `true` default Unlighthouse treats the
    // other locales as translated copies and skips them. On the canonical site
    // that would audit 4 of the 16 prerendered routes. On any other site, such
    // as a per-commit deployment URL, no page matches the x-default target, so
    // it audits none at all.
    ignoreI18nPages: false,
  },
} satisfies UserConfig
