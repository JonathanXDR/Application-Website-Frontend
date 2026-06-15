<script setup lang="ts">
import type { UiCollectionItem } from '@nuxt/content'
import type { CardRepositoryType } from '#shared/types/components/card-repository'
import type { ItemType } from '#shared/types/schemas'
import type { CardItemType } from '#shared/types/components/card-item'
import type { IconItemType } from '#shared/types/components/icon-item'
import type { MinimalRepositoryCard } from '#shared/types/services/github/repository'

type CategorizedRepository = CardRepositoryType & {
  category: string
}

type Projects = {
  swisscom: CardItemType[]
  personal: MinimalRepositoryCard[]
  school: MinimalRepositoryCard[]
}

definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerPre: true,
  footerCompact: false,
})

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

const { data: userRepositories, status: userRepositoriesStatus }
  = await useFetch('/api/github/user-repositories', {
    key: 'user-repositories',
    lazy: true,
    params: { per_page: 100 },
  })

// The pinned endpoint pins the owner and reads `perPage` server side, so
// no params are forwarded here.
const { data: pinnedProjects } = await useFetch(
  '/api/github/pinned-repositories',
  {
    key: 'pinned-repositories',
    lazy: true,
  },
)

// Element type of the (Nitro serialized) pinned fetch result, plus the
// pin icon the watch attaches. Derived from the fetch so it tracks the
// server projection instead of an `any` hand-off.
type PinnedRepository = NonNullable<typeof pinnedProjects.value>[number] & {
  icon?: IconItemType
}

const pinned = ref<PinnedRepository[]>([])

// The three queries are independent, so they run in parallel instead of
// serializing three round-trips per render.
const [
  { data: swisscomProjects },
  { data: cardLabels },
  { data: segmentNavData },
] = await Promise.all([
  useQueryCollection<CardItemType>('projects').all(),
  useQueryCollection<UiCollectionItem>('ui').stem('card-item').first(),
  useQueryCollection<UiCollectionItem>('ui').stem('segment-nav').first(),
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
      <div v-if="userRepositoriesStatus !== 'pending'">
        <LazyLiveResultSummary
          :total-results="currentProjects.length + pinned.length"
          :pinned-results="pinned.length"
        />
        <div
          v-if="pinned"
          class="card-container pinned-items"
        >
          <CardItem
            v-for="(project, index) in pinned as Partial<CardItemType>[]"
            :key="index"
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
          <CardItem
            v-for="(project, index) in currentProjects"
            :key="index"
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
