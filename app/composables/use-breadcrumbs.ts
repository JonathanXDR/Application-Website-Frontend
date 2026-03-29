import type { PageType } from '#shared/types/common/page'
import type { IconItemType } from '#shared/types/components/icon-item'
import type { LinkItemType } from '#shared/types/components/link-item'

interface UseBreadcrumbsProps {
  label?: string
  icon?: IconItemType
  links?: LinkItemType[]
  loading?: boolean
}

interface UseBreadcrumbsReturn {
  shouldShowBreadcrumbs: ComputedRef<boolean>
  computedLinks: ComputedRef<LinkItemType[]>
  requestURL: ReturnType<typeof useRequestURL>
  route: ReturnType<typeof useRoute>
}

export function useBreadcrumbs(
  props: UseBreadcrumbsProps,
): UseBreadcrumbsReturn {
  const route = useRoute()
  const requestURL = useRequestURL()
  const { currentRoute } = useNavbar()
  const error = useError()

  const errorPages = useState<(PageType & { pageId: string })[]>(
    'error-pages',
    () => [],
  )

  const errorPage = computed<PageType | null>(() => {
    if (!error.value?.status) return null
    const matched = errorPages.value.find(
      p => p.status === error.value?.status,
    )
    return (
      matched || errorPages.value.find(p => p.pageId === 'error') || null
    )
  })

  const shouldShowBreadcrumbs = computed(() => route.path !== '/')
  const computedLinks = computed<LinkItemType[]>(() => {
    if (props.links?.length) {
      return props.links
    }

    if (route.path === '/') {
      return []
    }

    const domainParts = requestURL.host?.split('.') ?? []
    const mainDomain = domainParts.slice(-2).join('.')
    const subDomain = domainParts.slice(0, -2).join('.')

    const result: LinkItemType[] = []

    if (subDomain) {
      const capitalized = subDomain[0]?.toUpperCase() + subDomain.slice(1)
      result.push({ title: capitalized, url: `${subDomain}.${mainDomain}` })
    }

    const lastCrumbTitle = errorPage.value?.label
      ? errorPage.value.label
      : (currentRoute.value?.label ?? route.path)

    result.push({ title: lastCrumbTitle, url: route.path })

    return result
  })

  return { shouldShowBreadcrumbs, computedLinks, requestURL, route }
}
