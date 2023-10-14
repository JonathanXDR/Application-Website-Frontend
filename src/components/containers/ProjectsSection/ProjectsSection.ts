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
        personal: [] as Repository['data'],
        swisscom: [] as any[],
        school: [] as Repository['data']
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
        const data = await fetchData()
        this.projects.swisscom = data.components.containers.projects
      } catch (error: any) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchProjects() {
      try {
        const projects = await fetchUserRepos('JonathanXDR')
        const sortedProjects = sortProjects(projects)
        this.projects.personal = sortedProjects.personal
        this.projects.school = sortedProjects.school
      } catch (error: any) {
        console.error('Error fetching projects:', error)
        this.errors.push(`Error: ${error.message}: ${error.status}`)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
    this.fetchProjects()
  }
})
