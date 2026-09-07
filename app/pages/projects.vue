<script setup lang="ts">
import type {
  CardItemCollectionItem,
  ErrorPagesCollectionItem,
  SegmentNavCollectionItem,
} from '@nuxt/content'

type CategorizedRepository = CardRepositoryType & {
  category: string
}

type Projects = {
  swisscom: CardItemType[]
  personal: MinimalRepositoryCard[]
  school: MinimalRepositoryCard[]
}

await usePageSeo()

const route = useRoute()
const router = useRouter()
const viewport = useViewport()
const { currentRoute } = useNavbar()
const { randomDevColor } = useColor()

const ul = useTemplateRef('ul')
const ulHeight = ref<number>(0)
const currentIndex = ref(0)

const updateHeight = () => {
  if (!ul.value) return
  ulHeight.value = ul.value.getBoundingClientRect().height
}

// Tab 0 is the Swisscom timeline, served from `@nuxt/content`
const needsRepositories = computed(() => currentIndex.value !== 0)

// `enabled` keeps these out of the prerendered payload, so `updated_at` stays
// live rather than frozen at build time. `lazy` keeps Suspense from holding a
// soft navigation on the GitHub round trip.
const {
  data: userRepositories,
  status: userRepositoriesStatus,
  execute: executeUserRepositories,
} = await useFetch('/api/github/user-repositories', {
  key: 'user-repositories',
  lazy: true,
  enabled: needsRepositories,
  params: { per_page: 100 },
})

const {
  data: pinnedProjects,
  status: pinnedStatus,
  execute: executePinned,
} = await useFetch('/api/github/pinned-repositories', {
  key: 'pinned-repositories',
  lazy: true,
  enabled: needsRepositories,
})

// Nuxt's `enabled` watcher only aborts on true -> false and never refetches
// when re-enabled, so the switch back executes explicitly. `'error'` is
// included so a failed tab retries.
watch(needsRepositories, (needed) => {
  if (!needed) return
  if (
    userRepositoriesStatus.value === 'idle'
    || userRepositoriesStatus.value === 'error'
  ) {
    executeUserRepositories()
  }
  if (pinnedStatus.value === 'idle' || pinnedStatus.value === 'error') {
    executePinned()
  }
})

type PinnedRepository = NonNullable<typeof pinnedProjects.value>[number] & {
  icon?: IconItemType
}

const pinned = ref<PinnedRepository[]>([])

// The GitHub outage state reuses `service-unavailable` because it is already
// translated into all four locales, though its copy frames the outage as site
// maintenance rather than an upstream fault.
const [
  { data: swisscomProjects },
  { data: cardLabels },
  { data: segmentNavData },
  { data: unavailableLabels },
] = await Promise.all([
  useQueryCollection<CardItemType>('projects').all(),
  useQueryCollection<CardItemCollectionItem>('cardItem').first(),
  useQueryCollection<SegmentNavCollectionItem>('segmentNav').first(),
  useQueryCollection<ErrorPagesCollectionItem>('errorPages')
    .stem('service-unavailable')
    .first(),
])

const projects: Projects = reactive({
  swisscom: computed<CardItemType[]>(() => swisscomProjects.value || []),
  personal: [],
  school: [],
})

const allProjects = computed(() => userRepositories.value || [])
const filteredProjects = computed(() =>
  allProjects.value.filter(
    project =>
      !pinned.value.some(
        pinnedProject => pinnedProject.name === project.name,
      ),
  ),
)

const updateCurrentIndex = (index: number) => {
  const category = Object.keys(projects)[index]
  router.push({
    query: {
      ...route.query,
      category,
    },
  })
  currentIndex.value = index
}

const currentProjects = computed(() => {
  const category
    = (route.query.category as keyof typeof projects)
      || Object.keys(projects)[currentIndex.value]
  return projects[category] || []
}) as Ref<CardItemType[]>

const segmentNavItems = computed<ItemType[]>(
  () => segmentNavData.value?.projects ?? [],
)

const categorizeProject = (
  project: MinimalRepositoryCard,
): CategorizedRepository => {
  const schoolProjectPattern = /M\d{3}|UEK-\d{3}(?:-\w+)?|(?:UEK|TBZ)-Modules/
  const category = schoolProjectPattern.test(project.name)
    ? 'school'
    : 'personal'
  return {
    ...project,
    category,
    title: project.name,
    description: project.description || '',
  }
}

const updateUlHeightAndInitializePath = async () => {
  await nextTick()
  updateHeight()
}

useEventListener(() => window, 'resize', updateUlHeightAndInitializePath, {
  passive: true,
})

onMounted(() => {
  updateUlHeightAndInitializePath()
})

watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      const index = Object.keys(projects).findIndex(
        key => key === newCategory,
      )
      if (index !== -1) {
        currentIndex.value = index
      }
    }
  },
  { immediate: true },
)

watch(
  pinnedProjects,
  (pinnedProjectsNew) => {
    pinned.value = (pinnedProjectsNew ?? []).map(project => ({
      ...project,
      icon: {
        name: 'sf-symbols:pin.fill',
        colors: {
          primary: `var(--color-figure-${randomDevColor.value?.name})`,
        },
      },
    }))
  },
  { immediate: true },
)

watchEffect(() => {
  projects.personal = []
  projects.school = []
  const categorizedProjects = filteredProjects.value.map(project =>
    categorizeProject(project),
  )
  for (const project of categorizedProjects) {
    const category = project.category as keyof Projects
    projects[category].push(project)
  }
})
</script>

<template>
  <div class="flex flex-col items-center mt-24">
    <AnimatingHeadline
      v-if="currentRoute?.label"
      :title="currentRoute?.label"
      tag="h1"
      class="typography-magical-headline pb-12"
      :auto-animation="true"
    />
    <NavBarExtension>
      <div class="flex flex-col items-center gap-2">
        <SegmentNav
          :items="segmentNavItems"
          :label="viewport.isLessThan('tablet') ? 'text' : 'combination'"
          padding="0 21px"
          component-size="small"
          :separator="viewport.isGreaterOrEquals('tablet')"
          gray-labels
          :focus="false"
          :outer-padding="3"
          :selected-item="segmentNavItems[currentIndex]?.id"
          :on-select="
            (id: string) =>
              updateCurrentIndex(
                segmentNavItems.findIndex((item) => item.id === id),
              )
          "
        />
      </div>
    </NavBarExtension>
    <div
      v-if="currentIndex === 0"
      class="timeline-wrapper"
    >
      <TimeLine
        :initial-height="ulHeight"
        :on-update-height="updateHeight"
      />
      <div
        ref="ul"
        class="timeline"
      >
        <CardItem
          v-for="(project, index) in currentProjects"
          :key="index"
          v-bind="{
            ...project,
            variant: 'article',
            hover: false,
            loading: false,
            componentSize: viewport.isLessThan('tablet') ? 'small' : 'medium',
            info: {
              ...project.info,
              date: {
                ...project?.info?.date,
                formatOptions: () => ({
                  year: 'numeric',
                  month: 'long',
                }),
              },
            },
            icon: {
              ...project.icon,
              position: viewport.isLessThan('tablet') ? 'top' : 'left',
            },
          }"
        />
      </div>
    </div>
    <div
      v-else
      class="w-full"
    >
      <!-- With `enabled` the fetch starts at `'idle'`, so anything looser than
           `'success'` would flash an empty grid before the request begins. -->
      <div v-if="userRepositoriesStatus === 'success'">
        <LazyLiveResultSummary
          :total-results="currentProjects.length + pinned.length"
          :pinned-results="pinned.length"
        />
        <div
          v-if="pinned.length"
          class="card-container pinned-items"
        >
          <LazyCardItem
            v-for="(project, index) in pinned as Partial<CardItemType>[]"
            :key="index"
            :hydrate-on-visible="{ rootMargin: '200px' }"
            v-bind="{
              ...project,
              loading: false,
              componentSize: 'small',
              colors: {
                secondary: `var(--color-fill-${randomDevColor?.name}-secondary)`,
                tertiary: `var(--color-figure-${randomDevColor?.name})`,
                quaternary: `var(--color-figure-${randomDevColor?.name})`,
              },
              icon: {
                ...project.icon,
                position: 'right',
                absolute: true,
              },
              info: {
                ...project?.info,
                date: {
                  ...project?.info?.date,
                  event: cardLabels?.updated,
                },
              },
            }"
            class="color"
          />
        </div>

        <div class="card-container">
          <LazyCardItem
            v-for="(project, index) in currentProjects"
            :key="index"
            :hydrate-on-visible="{ rootMargin: '200px' }"
            v-bind="{
              ...project,
              loading: false,
              componentSize: 'small',
              icon: {
                ...project.icon,
                position: 'right',
              },
              info: {
                ...project.info,
                date: {
                  ...project?.info?.date,
                  event: cardLabels?.updated,
                },
              },
            }"
          />

          <LazyResultBlankState v-if="currentProjects.length === 0" />
        </div>
      </div>
      <LazyFlashAlert
        v-else-if="userRepositoriesStatus === 'error'"
        variant="warning"
        :title="unavailableLabels?.label"
        :description="unavailableLabels?.description"
      />
      <LazyLoadingSpinner
        v-else
        class="center-horizontal center-vertical pt-24"
      />
    </div>
  </div>
</template>

<style scoped>
.highlight {
  display: inline;
}

.highlight .match {
  font-weight: 600;
  background: var(--color-fill-light-blue-secondary);
}

.timeline-wrapper {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  padding-top: 50px;
}

@media screen and (min-width: 768px) {
  .timeline-wrapper {
    width: 82.5%;
    padding: 100px 0 50px 0;
  }
}

@media screen and (min-width: 1280px) {
  .timeline-wrapper {
    display: flex;
    justify-content: center;
  }
}

.timeline {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  transition: all 250ms ease;
  margin: 0 auto;
}

@media screen and (min-width: 768px) {
  .timeline {
    gap: 64px;
  }
}

@media screen and (min-width: 1280px) {
  .timeline {
    align-items: flex-start !important;
  }
}

.timeline .article {
  width: 90%;
}

@media screen and (min-width: 1280px) {
  .timeline .article {
    width: 40%;
  }

  .timeline .article:nth-child(even) {
    align-self: flex-end;
  }
}
</style>
