/**
 * `useAsyncData` for a Nuxt Content query in the active locale. `queryCollection`
 * reads the locale when the handler creates the query, and the locale in the key
 * refetches the content after a locale switch and keeps prerendered pages of
 * different locales from sharing data under one key.
 */
export const useContentQuery = <T>(key: string, query: () => Promise<T>) => {
  const { locale } = useI18n()
  return useAsyncData(() => `content:${key}:${locale.value}`, query)
}

// Queries that several components share. `useAsyncData` compares the handler
// source of a shared key, so each one needs a single definition.

export const useNavbarContent = () =>
  useContentQuery('navigation:navbar', () =>
    queryCollection('navigation').stem('components/navigation/navbar').first(),
  )

export const useSegmentNavContent = () =>
  useContentQuery('segmentNav', () => queryCollection('segmentNav').first())

export const useCardItemContent = () =>
  useContentQuery('cardItem', () => queryCollection('cardItem').first())

export const useFooterCopyrightContent = () =>
  useContentQuery('footerCopyright', () =>
    queryCollection('footerCopyright').first(),
  )
