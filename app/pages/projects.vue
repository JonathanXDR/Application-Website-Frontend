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

// Tab 0 is the Swisscom timeline, served entirely from `@nuxt/content`.
// Only the other two tabs render GitHub data, so both endpoints stay gated
// until one of them is selected.
const needsRepositories = computed(() => currentIndex.value !== 0)

// `enabled` (Nuxt 4.5) keeps these two out of the prerendered payload: with
// the gate closed at render time nothing is written to `payload.data`, which
// removes ~30 KB (~8 KB gzipped) from every locale's `/projects/` document.
// The data is then fetched from the deployed endpoint when the user opens the
// tab, so repository names and `updated_at` are live rather than frozen at
// build time.
//
// `lazy: true` stays: it is read on the client (not the server), and without
// it a soft navigation into `/projects/?category=personal` makes Suspense hold
// the route transition on the GitHub round trip.
//
// `immediate` is deliberately NOT set. Nuxt's own initial fetch already runs
// at `onBeforeMount`, by which point the `route.query.category` watcher below
// has set `currentIndex`, so a deep link fetches on its own. Forcing it here
// would start a request during setup that the `onBeforeMount` pass then
// aborts and reissues, two invocations for one render.
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

// The pinned endpoint fixes the owner and reads `perPage` server side, so
// no params are forwarded here.
const {
  data: pinnedProjects,
  status: pinnedStatus,
  execute: executePinned,
} = await useFetch('/api/github/pinned-repositories', {
  key: 'pinned-repositories',
  lazy: true,
  enabled: needsRepositories,
})

// Nuxt's own `enabled` watcher only handles the true -> false direction, where
// it aborts an in-flight request and resets the status to 'idle'. Re-enabling
// never refetches on its own, so the switch back has to execute explicitly.
// 'error' is included so that returning to a failed tab retries instead of
// leaving it permanently broken.
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

// Element type of the (Nitro serialized) pinned fetch result, plus the
// pin icon the watch attaches. Derived from the fetch so it tracks the
// server projection instead of an `any` hand-off.
type PinnedRepository = NonNullable<typeof pinnedProjects.value>[number] & {
  icon?: IconItemType
}

const pinned = ref<PinnedRepository[]>([])

// The queries are independent, so they run in parallel instead of
// serializing four round trips per render.
//
// `service-unavailable` is reused for the GitHub outage state below because
// it is already translated into all four locales, which keeps the failure
// path from needing new content. Its copy frames the outage as site
// maintenance rather than an upstream fault, so replace it with a dedicated
// entry if that distinction ever matters.
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
      <!-- Three states rather than two. With `enabled` the fetch starts at
           'idle', so a bare `!== 'pending'` check would flash an empty grid
           before the request begins. 'error' gets its own branch: routing
           it to `ResultBlankState` would report an outage as "no results",
           which is indistinguishable from a genuinely empty category. -->
      <div v-if="userRepositoriesStatus === 'success'">
        <LazyLiveResultSummary
          :total-results="currentProjects.length + pinned.length"
          :pinned-results="pinned.length"
        />
        <div
          v-if="pinned"
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
