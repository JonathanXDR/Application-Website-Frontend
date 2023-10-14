import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchUserRepos, sortProjects } from '@/helpers/github-helper'
import { fetchData } from '@/helpers/locale-helper'
import type { Repository } from '@/types/GitHub/Repository'
import { defineComponent } from 'vue'

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
  data() {
    return {
      projects: {
        personal: [] as Repository,
        swisscom: [] as any[],
        school: [] as Repository
      },
      errors: [] as string[]
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = (await fetchData()) as any
        this.projects.swisscom = data.components.containers.projects
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message)
        } else {
          console.error('An unknown error occurred:', error)
        }
      }
    },
    async fetchProjects() {
      try {
        const projects = await fetchUserRepos('JonathanXDR')
        const sortedProjects = sortProjects(projects)
        this.projects.personal = sortedProjects.personal
        this.projects.school = sortedProjects.school
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching projects:', error.message)
          this.errors.push(error.message)
        } else {
          console.error('An unknown error occurred:', error)
          this.errors.push('An unknown error occurred.')
        }
      }
    }
  },
  created() {
    this.fetchLocalizedData()
    this.fetchProjects()
  }
})
