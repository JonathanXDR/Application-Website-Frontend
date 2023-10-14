import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchData } from '@/helpers/locale-helper'
import type { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'
import { defineComponent } from 'vue'

type ListUserReposResponse = Endpoints['GET /users/{username}/repos']['response']

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
        personal: [] as ListUserReposResponse['data'],
        swisscom: [] as Array<any>,
        school: [] as ListUserReposResponse['data']
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
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchProjects() {
      const octokit = new Octokit()
      try {
        const response = await octokit.request('GET /users/{username}/repos', {
          username: 'JonathanXDR',
          per_page: 100
        })
        this.sortProjects(response.data)
      } catch (error: any) {
        console.error('Error fetching projects:', error)
        this.errors.push(`Error: ${error.message}: ${error.status}`)
      }
    },
    sortProjects(projects: ListUserReposResponse['data']) {
      projects.forEach((project) => {
        if (
          project.name.match(/^(M\d+|UEK-\d+)-Portfolio$/i) ||
          project.name.match(/^(TBZ|UEK)-Modules$/i)
        ) {
          this.projects.school.push(project)
        } else {
          this.projects.personal.push(project)
        }
      })
    }
  },
  created() {
    this.fetchLocalizedData()
    this.fetchProjects()
  }
})
