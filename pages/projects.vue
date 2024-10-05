<template>
  <div class="flex flex-col items-center mt-24">
    <HeadlineAnimation
      title="Projects"
      class="typography-magical-headline pb-12"
      :auto-animation="true"
    />
    <NavBarExtension>
      <div class="flex flex-col items-center gap-2">
        <SegmentNav
          :items="segmentNavItems"
          :label="windowWidth < 769 ? 'text' : 'combination'"
          padding="0 21px"
          component-size="small"
          :separator="windowWidth > 768"
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
            description: project.description || '',
            variant: 'article',
            hover: 'false',
            loading: false,
            componentSize: windowWidth < 769 ? 'small' : 'medium',
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
              name: project.icon?.name || '',
              position: windowWidth < 769 ? 'top' : 'left',
            },
          }"
        />
      </div>
    </div>
    <div
      v-else
      class="w-full"
    >
      <div v-if="projects.personal.length > 0 && projects.school.length > 0">
        <LiveResultSummary
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
                name: project.icon?.name || '',
                position: 'right',
                absolute: true,
              },
              info: {
                ...project?.info,
                date: {
                  ...project?.info?.date,
                  event: $t('components.common.CardItem.updated'),
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
              description: project.description || '',
              loading: false,
              componentSize: 'small',
              icon: {
                ...project.icon,
                name: project.icon?.name || '',
                position: 'right',
              },
              info: {
                ...project.info,
                date: {
                  ...project?.info?.date,
                  event: $t('components.common.CardItem.updated'),
                },
              },
            }"
          />

          <ResultBlankState v-if="currentProjects.length === 0" />
        </div>
      </div>
      <LoadingSpinner
        v-else
        class="center-horizontal center-vertical pt-24"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Repository } from '@octokit/graphql-schema'
import type { CardItemType } from '~/types/common/card-item'
import type { CardRepositoryType } from '~/types/common/card-repository'
import type { IconType } from '~/types/common/icon'
import type { ItemType } from '~/types/common/item'
import type { MinimalRepository } from '~/types/services/github/repository'

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

definePageMeta({
  header: true,
  nav: true,
  ribbon: true,
  footerFull: true,
  footerCompact: false,
})

const { tm } = useI18n()
const { randomDevColor } = useColor()
const { windowWidth } = useWidth()
const config = useRuntimeConfig()

const ul = ref<HTMLElement | undefined>(undefined)
const ulHeight = ref<number>(0)

const updateHeight = () => {
  if (!ul.value) return
  ulHeight.value = ul.value.getBoundingClientRect().height
}

const pinned = ref<PinnedRepository[]>([])
const currentIndex = ref(0)

const { data: userRepositories } = await useFetch(
  '/api/github/user-repositories',
  {
    key: 'user-repositories',
    lazy: true,
    params: { username: config.public.githubRepoOwner, perPage: 100 },
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  }
)

const { data: pinnedProjects } = await useFetch(
  '/api/github/pinned-repositories',
  {
    key: 'pinned-repositories',
    lazy: true,
    params: { username: config.public.githubRepoOwner, perPage: 100 },
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
  }
)

const projects: Projects = reactive({
  swisscom: computed<CardItemType[]>(() =>
    tm('components.containers.projects')
  ),
  personal: [],
  school: [],
})

const allProjects = computed(() => userRepositories.value || [])
const filteredProjects = computed(() =>
  allProjects.value.filter(
    project =>
      !pinned.value.some(
        pinnedProject => pinnedProject.name === project.name
      )
  )
)

const currentProjects = computed(
  () =>
    projects[
      Object.keys(projects)[currentIndex.value] as keyof typeof projects
    ]
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

useEventListener(window, 'resize', updateUlHeightAndInitializePath)

onMounted(() => {
  updateUlHeightAndInitializePath()
})

watch(
  pinnedProjects,
  (pinnedProjectsNew) => {
    if (!pinnedProjectsNew) return
    for (const project of pinnedProjectsNew) {
      project.icon = {
        name: 'pin.fill',
        colors: {
          primary: `var(--color-figure-${randomDevColor.value?.name})`,
        },
      }
    }
    pinned.value = pinnedProjectsNew || []
  },
  { immediate: true }
)

watchEffect(() => {
  projects.personal = []
  projects.school = []
  const categorizedProjects = filteredProjects.value.map(project =>
    categorizeProject(project)
  )
  for (const project of categorizedProjects) {
    const category = project.category as keyof Projects
    projects[category].push(project)
  }
})

onUnmounted(() => {
  removeEventListener('resize', updateUlHeightAndInitializePath)
})
</script>

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
