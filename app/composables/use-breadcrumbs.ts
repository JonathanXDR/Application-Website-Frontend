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

  // The last crumb title comes from the navbar entry for the current
  // route. Nothing else supplies it, so a route without a navbar entry
  // (an error page, for example) falls back to the raw path.

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
      result.push({
        title: capitalized,
        url: `https://${subDomain}.${mainDomain}`,
      })
    }

    const lastCrumbTitle = currentRoute.value?.label ?? route.path

    result.push({ title: lastCrumbTitle, url: route.path })

    return result
  })

  return { shouldShowBreadcrumbs, computedLinks, requestURL, route }
}
