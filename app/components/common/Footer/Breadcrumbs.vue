<script setup lang="ts">
import type { IconType } from '#shared/types/common/icon'
import type { LinkType } from '#shared/types/common/link'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: IconType
    links?: LinkType[]
    loading?: boolean
  }>(),
  {
    links: () => [],
    loading: false,
  },
)

const route = useRoute()
const requestURL = useRequestURL()
const { currentRoute } = useNavbar()

const shouldShowBreadcrumbs = computed(() => route.path !== '/')

const computedLinks = computed<LinkType[]>(() => {
  if (props.links.length) return props.links
  if (route.path === '/') return []

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

  result.push({
    title: currentRoute.value?.label ?? route.path,
    url: route.path,
  })

  return result
})
</script>

<template>
  <nav
    v-if="shouldShowBreadcrumbs"
    class="footer-breadcrumbs"
    aria-label="Breadcrumbs"
  >
    <NuxtLink
      v-if="icon || label"
      :to="requestURL.host?.split('.').slice(-2).join('.')"
      class="home footer-breadcrumbs-home"
    >
      <DynamicIcon
        v-if="icon"
        v-bind="icon"
        :loading="loading"
        class="icon icon-sm"
      />
      <SiteLogo
        v-else
        class="h-[12px] !w-auto"
      />
      <span
        v-if="label"
        class="footer-breadcrumbs-home-label"
      >
        {{ label }}
      </span>
    </NuxtLink>

    <div class="footer-breadcrumbs-path">
      <ol class="footer-breadcrumbs-list">
        <li
          v-for="(link, index) in computedLinks"
          :key="index"
          class="footer-breadcrumbs-item"
        >
          <template v-if="link.url === route.path">
            {{ link.title }}
          </template>
          <template v-else>
            <LinkItem v-bind="link" />
          </template>
        </li>
      </ol>
    </div>
  </nav>
</template>
