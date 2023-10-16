import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import type { ListPublicReposResponse } from '@/types/GitHub/Repository'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { computed, defineComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { listPublicRepositories } from '@/helpers/github-helper'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
    TimeLine
  },
  setup() {
    const { tm } = useI18n()
    const articles = computed(() => tm('components.containers.projects') as ArticleItemType[])
    const projects = {
      personal: [] as ListPublicReposResponse,
      swisscom: [] as ArticleItemType[],
      school: [] as ListPublicReposResponse
    }
    const errors = [] as string[]

    const fetchProjects = async () => {
      const sortedProjects = {
        personal: [] as ListPublicReposResponse,
        school: [] as ListPublicReposResponse
      }
      const projects = await listPublicRepositories()
      console.log(projects)
      projects.forEach((project) => {
        const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
        ;(schoolProjectPattern.test(project.name)
          ? sortedProjects.school
          : sortedProjects.personal
        ).push(project)
      })

      projects.personal = sortedProjects.personal
      projects.school = sortedProjects.school
    }

    onMounted(() => {
      fetchProjects()
    })

    return {
      tm,
      articles,
      projects,
      errors
    }
  }
})
