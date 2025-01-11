import { NuxtLink } from '#components'
import type { LinkType } from '#shared/types/common/link'

export const getLinkComponentType = (link: LinkType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? NuxtLink
    : 'a'
}

export const getLinkAttributes = (link: LinkType) => {
  return link.url?.startsWith('#') || link.url?.startsWith('/')
    ? { to: link.url, target: '_self' }
    : { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
}

export const getEnhancedLinks = (links: LinkType[]) => {
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
