import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { listUserRepositories } from '@/helpers/github-helper'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { computed, defineComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

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
      personal: [] as ListUserReposResponse,
      swisscom: [] as ArticleItemType[],
      school: [] as ListUserReposResponse
    }

    const fetchProjects = async () => {
      const allProjects = await listUserRepositories({
        username: 'JonathanXDR',
        perPage: 100
      })

      allProjects.forEach((project) => {
        const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
        ;(schoolProjectPattern.test(project.name) ? projects.school : projects.personal).push(
          project
        )
      })
    }

    onMounted(() => {
      fetchProjects()
    })

    return {
      tm,
      articles,
      projects
    }
  }
})
