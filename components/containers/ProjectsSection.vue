<template>
  <div class="flex flex-col items-center">
    <HeadlineAnimation
      :title="title"
      class="typography-magical-headline pb-12"
    />
    <NavBarExtension>
      <div class="flex flex-col items-center gap-2">
        <SegmentNav
          :items="segmentNavItems"
          label="combination"
          padding="0 21px"
          component-size="small"
          separator
          gray-labels
          :focus="false"
          :outer-padding="3"
          :selected-item="segmentNavItems[currentIndex]?.id"
          :on-select="
            id =>
              updateCurrentIndex(
                segmentNavItems.findIndex(item => item.id === id)
              )
          "
        />
      </div>
    </NavBarExtension>
    <div v-if="currentIndex === 0" class="timeline-wrapper">
      <TimeLine :height="ulHeight" />
      <ul ref="ul" class="timeline">
        <CardItem
          v-for="(project, index) in currentProjects"
          :key="index"
          variant="article"
          :component-size="windowWidth < 900 ? 'small' : 'medium'"
          :loading="false"
          :card="project"
          :icon="() => ({ position: windowWidth < 900 ? 'top' : 'left' })"
          :date="{
            formatOptions: () => ({
              year: 'numeric',
              month: 'long'
            })
          }"
        />
      </ul>
    </div>
    <div v-else class="w-full">
      <div v-if="projects.personal.length && projects.school.length">
        <LiveResultSummary
          :total-results="currentProjects.length + pinned.length"
          :pinned-results="pinned.length"
        />
        <ul v-if="pinned" class="card-container pinned-items">
          <CardItem
            v-for="(card, index) in pinned"
            :key="index"
            :loading="false"
            :card="card"
            component-size="small"
            icon-position="right"
            icon-absolute
            class="color"
            :style="{
              '--color-figure': `var(--color-figure-${randomColor})`,
              '--color-fill': `var(--color-fill-${randomColor}-secondary)`
            }"
          />
        </ul>
        <ul class="card-container">
          <CardItem
            v-for="(card, index) in currentProjects"
            :key="index"
            :loading="false"
            :card="card"
            component-size="small"
            icon-position="right"
          />
          <ResultBlankState v-if="!currentProjects" />
        </ul>
      </div>
      <LoadingSpinner v-else class="center-horizontal center-vertical pt-24" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CardItemType } from '~/types/common/CardItem'
import type { ItemType } from '~/types/common/Item'
import type { GetUserRepositories } from '~/types/services/GitHub/Repository'

type GetUserRepository = GetUserRepositories[0]

type GetUserPinnedRepository = GetUserRepository & {
  icon?: CardItemType['icon']
}

type Projects = {
  swisscom: CardItemType[]
  personal: GetUserRepositories
  school: GetUserRepositories
}

defineProps<{
  title: string
}>()

const { $listUserRepositories, $listPinnedRepositories } = useNuxtApp()
const { tm } = useI18n()
const colorStore = useColor()
const config = useRuntimeConfig()

const ul = ref<HTMLElement | null>(null)
const ulHeight = useElementSize(ul).height

const pinned = ref<GetUserPinnedRepository[]>([])
const currentIndex = ref(0)
const randomColor = ref(colorStore.randomizeColor().colorName)
const windowWidth = useWindowSize({ initialWidth: 0 }).width

const { data: userRepositories } = useAsyncData(
  'userRepositories',
  () =>
    $listUserRepositories({
      username: config.public.githubRepoOwner,
      per_page: 100
    }),
  { server: true }
)

const { data: pinnedProjects } = useAsyncData(
  'pinnedProjects',
  () =>
    $listPinnedRepositories({
      username: config.public.githubRepoOwner,
      per_page: 100
    }),
  { server: true }
)

const projects: Projects = reactive({
  swisscom: computed<CardItemType[]>(() =>
    tm('components.containers.projects')
  ),
  personal: [],
  school: []
})

const allProjects = computed(() => [...(userRepositories.value || [])])
const filteredProjects = computed(() =>
  allProjects.value.filter(
    project =>
      !pinned.value.find(pinnedProject => pinnedProject.name === project.name)
  )
)

const currentProjects = computed(
  () =>
    projects[Object.keys(projects)[currentIndex.value] as keyof typeof projects]
)

const segmentNavItems = computed<ItemType[]>(() => [
  {
    id: 'swisscom',
    category: 'projects',
    label: 'Swisscom',
    icon: {
      name: 'building.2.fill'
    }
  },
  {
    id: 'personal',
    category: 'projects',
    label: 'Persönlich',
    icon: {
      name: 'person.fill'
    }
  },
  {
    id: 'school',
    category: 'projects',
    label: 'Schule',
    icon: {
      name: 'graduationcap.fill'
    }
  }
])

const updateCurrentIndex = (index: number) => {
  currentIndex.value = index
}

const categorizeProject = (project: GetUserRepository) => {
  const schoolProjectPattern =
    /(M\d{3})|(UEK-\d{3})|(UEK-\d{3}-\w+)|((UEK|TBZ)-Modules)/
  const category = schoolProjectPattern.test(project.name)
    ? 'school'
    : 'personal'
  return { ...project, category }
}

watch(
  pinnedProjects,
  newPinnedProjects => {
    newPinnedProjects?.forEach((project: GetUserPinnedRepository) => {
      project.icon = {
        name: 'pin.fill',
        colors: {
          primary: `var(--color-figure-${randomColor.value})`
        }
      }
    })
    pinned.value = newPinnedProjects || []
  },
  { immediate: true }
)

watchEffect(() => {
  projects.personal = []
  projects.school = []
  filteredProjects.value.map(categorizeProject).forEach(project => {
    const category = project.category as keyof Projects
    projects[category].push(
      project as GetUserRepository & CardItemType & { category: string }
    )
  })
})
</script>

<style scoped>
.highlight {
  display: inline;
}

.highlight .match {
  font-weight: 600;
  /* color: var(--color-figure-gray-secondary-alt); */
  background: var(--color-fill-light-blue-secondary);
}

/* ---------------------------- timeline-wrapper ---------------------------- */

.timeline-wrapper {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  padding-top: 50px;
}

@media screen and (min-width: 900px) {
  .timeline-wrapper {
    width: 82.5%;
    padding: 100px 0 50px 0;
  }
}

@media screen and (min-width: 1250px) {
  .timeline-wrapper {
    display: flex;
    justify-content: center;
  }
}

/* -------------------------------- timeline -------------------------------- */

.timeline {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  transition: all 250ms ease;
  margin: 0 auto;
}

@media screen and (min-width: 900px) {
  .timeline {
    gap: 64px;
  }
}

@media screen and (min-width: 1250px) {
  .timeline {
    align-items: flex-start !important;
  }
}

/* ------------------------------- timeline li ------------------------------ */

.timeline .article {
  width: 90%;
}

@media screen and (min-width: 1250px) {
  .timeline .article {
    width: 40%;
  }

  .timeline .article:nth-child(even) {
    align-self: flex-end;
  }
}
</style>
