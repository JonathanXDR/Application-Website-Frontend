import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import { useSiteConfig } from 'nuxt-site-config/kit'
import { parse as parseYaml } from 'yaml'

interface PageBlock {
  description?: string
  pages?: Record<string, { description?: string }>
}

interface SiteYaml extends PageBlock {
  i18n?: Record<string, PageBlock>
}

interface NavbarItem {
  id?: string
  label?: string
  route?: string
}

interface NavbarYaml {
  items?: NavbarItem[]
  i18n?: Record<string, { items?: NavbarItem[] }>
}

const LOCALES = ['de', 'en', 'fr', 'it'] as const

export default defineNuxtModule({
  meta: { name: 'llms-txt-sections' },
  async setup(_options, nuxt) {
    const site = parseYaml(
      await readFile(
        resolve(nuxt.options.rootDir, 'content/config/site.yml'),
        'utf8',
      ),
    ) as SiteYaml
    const navbar = parseYaml(
      await readFile(
        resolve(nuxt.options.rootDir, 'content/components/navbar.yml'),
        'utf8',
      ),
    ) as NavbarYaml

    const resolveItems = (locale: (typeof LOCALES)[number]) => {
      if (locale === 'de') return navbar.items ?? []
      const overrides = navbar.i18n?.[locale]?.items ?? []
      return (navbar.items ?? []).map((base, i) => ({
        ...base,
        ...(overrides[i] ?? {}),
      }))
    }

    // Mirrors the fork's merge semantics for the site config shape:
    // locale overrides fall back to the German base per field, and the
    // nested `pages` record merges per page key instead of replacing the
    // whole record when a locale translates only some pages.
    const resolveSite = (locale: (typeof LOCALES)[number]): PageBlock => {
      if (locale === 'de') return site
      const override = site.i18n?.[locale] ?? {}
      return {
        description: override.description ?? site.description,
        pages: { ...site.pages, ...override.pages },
      }
    }

    nuxt.hook('ai-ready:llms-txt', (payload) => {
      // Resolved inside the hook, where nuxt-ai-ready has already awaited
      // site-config installation. This is the same origin source the
      // module uses for its own llms.txt scaffold, so the two can never
      // diverge the way a raw NUXT_SITE_URL read could.
      const siteUrl = (useSiteConfig().url ?? '').replace(/\/$/, '')
      const sections = (payload.sections ??= [])
      for (const locale of LOCALES) {
        const localeSite = resolveSite(locale)
        const items = resolveItems(locale).filter(
          item => item.route && !item.route.includes('#'),
        )
        if (items.length === 0) continue

        sections.push({
          title: `Pages (${locale.toUpperCase()})`,
          description: localeSite.description,
          links: items.map((item) => {
            const pageKey = item.id ?? ''
            const localeDescription
              = pageKey && localeSite.pages?.[pageKey]?.description
            return {
              title: item.label ?? '',
              href: `${siteUrl}/${locale}${item.route === '/' ? '/' : `${item.route}/`}`,
              description: localeDescription || localeSite.description || '',
            }
          }),
        })
      }
    })
  },
})
