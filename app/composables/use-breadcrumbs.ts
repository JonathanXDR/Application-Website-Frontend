import type { ErrorPageType } from '#shared/types/common/error-page'
import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

interface UseBreadcrumbsProps {
  label?: string
  icon?: IconType
  links?: LinkType[]
  loading?: boolean
}

interface UseBreadcrumbsReturn {
  shouldShowBreadcrumbs: ComputedRef<boolean>
  computedLinks: ComputedRef<LinkType[]>
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
  const { tm } = useI18n()

  const pages = computed<ErrorPageType[]>(() => tm('pages'))

  const errorPage = computed<ErrorPageType | null>(() => {
    if (!error.value?.statusCode) return null
    const matched = pages.value.find(
      p => p.statusCode === error.value?.statusCode,
    )
    return matched || pages.value.find(p => p.id === 'error') || null
  })

  const shouldShowBreadcrumbs = computed(() => route.path !== '/')
  const computedLinks = computed<LinkType[]>(() => {
    if (props.links?.length) {
      return props.links
    }

    if (route.path === '/') {
      return []
    }

    const domainParts = requestURL.host?.split('.') ?? []
    const mainDomain = domainParts.slice(-2).join('.')
    const subDomain = domainParts.slice(0, -2).join('.')

    const result: LinkType[] = []

    if (subDomain) {
      const capitalized = subDomain[0]?.toUpperCase() + subDomain.slice(1)
      result.push({
        title: capitalized,
        url: `${subDomain}.${mainDomain}`,
      })
    }

    const lastCrumbTitle = errorPage.value?.label
      ? errorPage.value.label
      : (currentRoute.value?.label ?? route.path)

    result.push({
      title: lastCrumbTitle,
      url: route.path,
    })

    return result
  })

  return {
    shouldShowBreadcrumbs,
    computedLinks,
    requestURL,
    route,
  }
}
