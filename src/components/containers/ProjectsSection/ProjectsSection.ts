import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import SegmentNav from '@/components/common/SegmentNav/SegmentNav.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { listUserRepositories } from '@/helpers/github-helper'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
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
    SegmentNav,
    TimeLine
  },
  props: {
    title: {
      type: String,
      required: true,
      default: undefined
    }
  },
  setup(props) {
    const { tm } = useI18n()
    const articles = computed(() => tm('components.containers.projects') as ArticleItemType[])
    const projects = reactive({
      swisscom: computed(() => tm('components.containers.projects') as ArticleItemType[]),
      personal: [] as ListUserReposResponse,
      school: [] as ListUserReposResponse
    })
    const selectedCategory = ref('school')
    const categories = Object.keys(projects)

    const updateSelectedIndex = (index: number) => {
      selectedCategory.value = categories[index]
    }

    const categorizeProject = (project: any) => {
      const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
      const category = schoolProjectPattern.test(project.name) ? 'school' : 'personal'
      return { ...project, category }
    }

    const fetchProjects = async () => {
      const allProjects = await listUserRepositories({
        username: 'JonathanXDR',
        perPage: 100
      })

      allProjects.map(categorizeProject).forEach((project) => {
        projects[project.category].push(project)
      })
    }

    onMounted(() => {
      fetchProjects()
    })

    return {
      props,
      tm,
      articles,
      projects,
      selectedCategory,
      updateSelectedIndex
    }
  }
})
