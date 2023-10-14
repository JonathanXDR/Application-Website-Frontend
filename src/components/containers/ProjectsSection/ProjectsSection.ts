import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import AirplaneDepartureIcon from '@/components/common/Icons/AirplaneDepartureIcon.vue'
import ArrowDownCircleIcon from '@/components/common/Icons/ArrowDownCircleIcon.vue'
import CalendarIcon from '@/components/common/Icons/CalendarIcon.vue'
import ChevronLeftForwardslashChevronRightIcon from '@/components/common/Icons/ChevronLeftForwardslashChevronRightIcon.vue'
import ChevronRightIcon from '@/components/common/Icons/ChevronRightIcon.vue'
import GearIcon from '@/components/common/Icons/GearIcon.vue'
import PersonCropSquareIcon from '@/components/common/Icons/PersonCropSquareIcon.vue'
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
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
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
      json: undefined as any,
      allProjects: [] as ListUserReposResponse['data'],
      personalProjects: [] as ListUserReposResponse['data'],
      schoolProjects: [] as ListUserReposResponse['data'],
      schoolProjectCollections: [] as ListUserReposResponse['data'],
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
        this.json = data.components.containers.projects
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchProjects() {
      const octokit = new Octokit()
      try {
        const response = await octokit.request('GET /users/{username}/repos', {
          username: 'JonathanXDR'
        })
        this.allProjects = response.data
      } catch (error: any) {
        console.error('Error fetching projects:', error)
        this.errors.push(`Error: ${error.message}: ${error.status}`)
      }
    },
    splitProjects(projects: ListUserReposResponse['data']) {
      projects.forEach((project) => {
        if (project.name.match(/^M\d+-Portfolio$/i) || project.name.match(/^UEK-\d+-Portfolio$/i)) {
          this.schoolProjects.push(project)
        } else if (project.name.match(/^UEK-Modules$/i) || project.name.match(/^TBZ-Modules$/i)) {
          this.schoolProjectCollections.push(project)
        } else {
          this.personalProjects.push(project)
        }
      })
    }
  },
  created() {
    this.fetchLocalizedData()
    this.fetchProjects()
  }
})
