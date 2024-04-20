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
          padding="0 21px"
          size="small"
          separator
          grayLabels
          :outerPadding="3"
          :selectedItem="segmentNavItems[currentIndex]?.id"
          :onSelect="
            id =>
              updateCurrentIndex(
                segmentNavItems.findIndex(item => item.id === id)
              )
          "
        />
      </div>
    </NavBarExtension>
    <div class="timeline-wrapper" v-if="currentIndex === 0">
      <TimeLine :height="ulHeight" />
      <ul ref="ul" class="timeline">
        <CardItem
          variant="article"
          :size="windowWidth < 900 ? 'small' : 'medium'"
          v-for="(project, index) in currentProjects"
          :key="index"
          :card="project"
          :iconPosition="windowWidth < 900 ? 'top' : 'left'"
          :dateFormatOptions="{
            year: 'numeric',
            month: 'long'
          }"
        />
      </ul>
    </div>
    <div v-else class="w-full">
      <div v-if="projects.personal.length && projects.school.length">
        <LiveResultSummary
          :totalResults="currentProjects.length + (pinnedProjects?.length ?? 0)"
          :pinnedResults="pinnedProjects ? pinnedProjects.length : 0"
        />
        <ul v-if="pinnedProjects" class="card-container pinned-items">
          <CardItem
            v-for="(card, index) in pinnedProjects"
            :key="index"
            :card="card"
            size="small"
            iconPosition="right"
            iconAbsolute
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
            :card="card"
            size="small"
            iconPosition="right"
          />
          <ResultBlankState v-if="!currentProjects.length" />
        </ul>
      </div>
      <LoadingSpinner v-else class="center-horizontal center-vertical pt-24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ListUserReposResponse } from '~/types/GitHub/Repository'
import type { CardItemType } from '~/types/common/CardItem'
import type { ItemType } from '~/types/common/Option'

type ListUserPinnedReposResponse = ListUserReposResponse & {
  icon?: CardItemType['icon']
}

type Projects = {
  swisscom: CardItemType[]
  personal: ListUserReposResponse[]
  school: ListUserReposResponse[]
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
const windowWidth = useWindowSize().width
const randomColor = ref(colorStore.randomizeColor().colorName)

const {
  data: userRepositories,
  pending: pendingUserRepos,
  refresh: refreshUserRepos
} = useAsyncData(
  'userRepositories',
  () =>
    $listUserRepositories({
      username: config.public.githubRepoOwner,
      perPage: 100
    }),
  { server: true }
)

const { data: pinnedProjects, refresh: refreshPinnedProjects } = useAsyncData(
  'pinnedProjects',
  () =>
    $listPinnedRepositories({
      username: config.public.githubRepoOwner,
      perPage: 100
    }),
  { server: true }
)

const projects: Projects = reactive({
  swisscom: [],
  personal: [],
  school: []
})

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

const currentIndex = ref(0)
const updateCurrentIndex = (index: number) => {
  currentIndex.value = index
}

watchEffect(() => {
  projects.personal =
    userRepositories.value?.filter(
      p => !pinnedProjects.value?.some(pin => pin.id === p.id)
    ) || []
  projects.school =
    userRepositories.value?.filter(p => /school_pattern/.test(p.name)) || []
})

const currentProjects = computed(
  () =>
    projects[segmentNavItems.value[currentIndex.value]?.id as keyof Projects]
)
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
