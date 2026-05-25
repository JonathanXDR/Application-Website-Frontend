import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
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
    const siteUrl = (process.env.NUXT_SITE_URL ?? '').replace(/\/$/, '')

    const site = parseYaml(
      await readFile(
        resolve(nuxt.options.rootDir, 'content/config/site.yml'),
        'utf8',
      ),
    ) as SiteYaml
    const navbar = parseYaml(
      await readFile(
        resolve(nuxt.options.rootDir, 'content/navigation/navbar.yml'),
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

    nuxt.hook('ai-ready:llms-txt', (payload) => {
      const sections = (payload.sections ??= [])
      for (const locale of LOCALES) {
        const localeSite
          = locale === 'de' ? site : (site.i18n?.[locale] ?? site)
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
