<template>
  <div class="flex flex-col items-center">
    <HeadlineAnimation
      :title="title"
      class="typography-magical-headline pb-12"
    />
    <NavBarExtension>
      <SegmentNav :index="currentIndex" @change="updateCurrentIndex" />
    </NavBarExtension>
    <div class="timeline-wrapper" v-if="currentIndex === 0">
      <TimeLine />
      <ul ref="ul" class="timeline">
        <CardItem
          variant="article"
          :size="
            windowObject && windowObject.innerWidth < 900 ? 'small' : 'medium'
          "
          v-for="(project, index) in currentProjects"
          :key="index"
          :card="project"
          :iconPosition="
            windowObject && windowObject.innerWidth < 900 ? 'top' : 'left'
          "
          :dateFormatOptions="{
            year: 'numeric',
            month: 'long',
          }"
        />
      </ul>
    </div>
    <div v-else class="w-full">
      <div v-if="projects.personal.length && projects.school.length">
        <LiveResultSummary
          :totalResults="currentProjects.length + pinned.length"
          :pinnedResults="pinned.length"
        />
        <ul v-if="pinned" class="card-container pinned-items">
          <CardItem
            v-for="(card, index) in pinned"
            :key="index"
            :card="card"
            size="small"
            iconPosition="right"
            class="color"
            :style="`--color-figure: var(--color-figure-${randomColor});
          --color-fill: var(--color-fill-${randomColor}-secondary)`"
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
          <ResultBlankState v-if="!currentProjects" />
        </ul>
      </div>
      <LoadingSpinner v-else class="center-horizontal center-vertical pt-24" />
    </div>
  </div>
</template>

<script lang="ts">
import type { ListUserReposResponse } from "~/types/GitHub/Repository";
import type { CardItemType } from "~/types/common/CardItem";

type ListUserPinnedReposResponse = ListUserReposResponse & {
  icon?: CardItemType["icon"];
};

type Projects = {
  swisscom: CardItemType[];
  personal: ListUserReposResponse[];
  school: ListUserReposResponse[];
};
</script>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const colorStore = useColor();
const articles: Ref<CardItemType[]> = computed(() =>
  tm("components.containers.projects")
);
const projects: Projects = reactive({
  swisscom: computed(() => tm("components.containers.projects")) as Ref<
    CardItemType[]
  >,
  personal: [] as ListUserReposResponse[],
  school: [] as ListUserReposResponse[],
});
const pinned: Ref<ListUserPinnedReposResponse[]> = ref([]);
const currentProjects = computed(
  () =>
    projects[Object.keys(projects)[currentIndex.value] as keyof typeof projects]
);

const currentIndex: Ref<number> = ref(0);
const randomColor = ref(colorStore.randomizeColor().colorName);
const windowObject = computed(() => window);

const updateCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

const categorizeProject = (project: ListUserReposResponse) => {
  const schoolProjectPattern =
    /(M\d{3})|(UEK-\d{3})|(UEK-\d{3}-\w+)|((UEK|TBZ)-Modules)/;
  const category = schoolProjectPattern.test(project.name)
    ? "school"
    : "personal";
  return { ...project, category };
};

const fetchProjects = async () => {
  const allProjects = await listUserRepositories({
    username: "JonathanXDR",
    perPage: 100,
  });

  const pinnedProjects = await listPinnedRepositories({
    username: "JonathanXDR",
    perPage: 100,
  });

  pinnedProjects.forEach((project: ListUserPinnedReposResponse) => {
    project.icon = {
      name: "pin.fill",
      colors: {
        primary: `var(--color-figure-${randomColor.value})`,
      },
    };
  });

  const filteredProjects = allProjects.filter(
    (project) =>
      !pinnedProjects.find(
        (pinnedProject) => pinnedProject.name === project.name
      )
  );

  pinned.value = pinnedProjects;

  filteredProjects.map(categorizeProject).forEach((project) => {
    const category = project.category as keyof Projects;
    projects[category].push(
      project as ListUserReposResponse & CardItemType & { category: string }
    );
  });
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
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
