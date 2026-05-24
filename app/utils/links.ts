import { NuxtLink, NuxtLinkLocale } from '#components'
import type { LinkItemType } from '#shared/types/components/link-item'

// `NuxtLinkLocale` runs `useLocalePath()` on `to`, so unprefixed
// internal paths from the content YAML (such as `/projects` and
// `/technologies`) resolve to the active locale's prefixed route
// (`/de/projects`, `/en/projects`, and so on). In-page anchors stay on
// the plain `NuxtLink`, because `localePath` would turn `#about` into
// `/de#about` and lose the same-page scroll behaviour.
export const getLinkComponentType = (link: LinkItemType) => {
  if (!link.url) return 'a'
  if (link.url.startsWith('/')) return NuxtLinkLocale
  if (link.url.startsWith('#')) return NuxtLink
  return 'a'
}

export const getLinkAttributes = (link: LinkItemType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? { to: link.url, target: '_self' }
    : { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
}

export const getEnhancedLinks = (links: LinkItemType[]) => {
  return links.map(link => ({
    ...link,
    to:
      link.url?.startsWith('#') || link.url?.startsWith('/')
        ? link.url
        : undefined,
    href:
      link.url && !(link.url.startsWith('#') || link.url.startsWith('/'))
        ? link.url
        : undefined,
    target:
      link.url?.startsWith('#') || link.url?.startsWith('/')
        ? '_self'
        : '_blank',
  }))
}
