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
          v-bind="{
            ...project,
            description: project.description || '',
            variant: 'article',
            hover: 'false',
            loading: false,
            componentSize: windowWidth < 900 ? 'small' : 'medium',
            info: {
              ...project.info,
              date: {
                ...project?.info?.date,
                formatOptions: () => ({
                  year: 'numeric',
                  month: 'long'
                })
              }
            },
            icon: {
              ...project.icon,
              name: project.icon?.name || '',
              position: windowWidth < 900 ? 'top' : 'left'
            }
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
            v-for="(project, index) in pinned as Partial<CardItemType>[]"
            :key="index"
            v-bind="{
              ...project,
              loading: false,
              componentSize: 'small',
              icon: {
                ...project.icon,
                name: project.icon?.name || '',
                position: 'right',
                absolute: true
              },
              info: {
                ...project?.info,
                date: {
                  ...project?.info?.date,
                  nowKey: 'updated'
                }
              }
            }"
            class="color"
            :colors="{
              secondary: `var(--color-fill-${$randomDevColor?.name}-secondary)`,
              tertiary: `var(--color-figure-${$randomDevColor?.name})`,
              quaternary: `var(--color-figure-${$randomDevColor?.name})`
            }"
          />
        </ul>
        <ul class="card-container">
          <CardItem
            v-for="(project, index) in currentProjects"
            :key="index"
            v-bind="{
              ...project,
              description: project.description || '',
              loading: false,
              componentSize: 'small',
              icon: {
                ...project.icon,
                name: project.icon?.name || '',
                position: 'right'
              },
              info: {
                ...project.info,
                date: {
                  ...project?.info?.date,
                  nowKey: 'updated'
                }
              }
            }"
          />

          <ResultBlankState v-if="!currentProjects" />
        </ul>
      </div>
      <LoadingSpinner v-else class="center-horizontal center-vertical pt-24" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Repository } from '@octokit/graphql-schema'
import type { CardItemType } from '~/types/common/CardItem'
import type { CardRepositoryType } from '~/types/common/CardRepository'
import type { IconType } from '~/types/common/Icon'
import type { ItemType } from '~/types/common/Item'
import type { MinimalRepository } from '~/types/services/GitHub/Repository'

type PinnedRepository = Repository & {
  icon?: IconType
}

type CategorizedRepository = CardRepositoryType & {
  category: string
}

type Projects = {
  swisscom: CardItemType[]
  personal: MinimalRepository[]
  school: MinimalRepository[]
}

defineProps<{
  title: string
}>()

const { $listUserRepositories, $listPinnedRepositories, $randomDevColor } =
  useNuxtApp()
const { tm } = useI18n()
const config = useRuntimeConfig()

const ul = ref<HTMLElement | null>(null)
const ulHeight = useElementSize(ul).height

const pinned = ref<PinnedRepository[]>([])
const currentIndex = ref(0)
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
) as Ref<CardItemType[]>

const segmentNavItems = computed<ItemType[]>(() =>
  tm('components.common.SegmentNav.projects')
)

const updateCurrentIndex = (index: number) => {
  currentIndex.value = index
}

const categorizeProject = (
  project: MinimalRepository
): CategorizedRepository => {
  const schoolProjectPattern =
    /(M\d{3})|(UEK-\d{3})|(UEK-\d{3}-\w+)|((UEK|TBZ)-Modules)/
  const category = schoolProjectPattern.test(project.name)
    ? 'school'
    : 'personal'
  return {
    ...project,
    category,
    title: project.name,
    description: project.description || ''
  }
}

watch(
  pinnedProjects,
  newPinnedProjects => {
    newPinnedProjects?.forEach((project: PinnedRepository) => {
      project.icon = {
        name: 'pin.fill',
        colors: {
          primary: `var(--color-figure-${$randomDevColor?.name})`
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
    projects[category].push(project)
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
