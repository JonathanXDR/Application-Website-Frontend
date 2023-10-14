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
import { Octokit } from '@octokit/rest'
import { defineComponent } from 'vue'

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
      octokit: new Octokit(),
      json: undefined as any,
      projects: [] as any[]
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
      try {
        const response = await this.octokit.repos.listForUser({
          username: 'JonathanXDR'
        })
        this.projects = response.data
      } catch (error: any) {
        console.error('Error fetching projects:', error)
        this.projects.push({
          id: 1,
          name: `${error.name}: ${error.status}`,
          description: error.message
        })
      }
    },
    splitProjects(projects: any[]) {
      const personalProjects = []
      const schoolProjects = []
      const schoolProjectCollections = []

      projects.forEach((project) => {
        if (project.name.match(/^M\d+-Portfolio$/i) || project.name.match(/^UEK-\d+-Portfolio$/i)) {
          schoolProjects.push(project)
        } else if (project.name.match(/^UEK-Modules$/i) || project.name.match(/^TBZ-Modules$/i)) {
          schoolProjectCollections.push(project)
        } else {
          personalProjects.push(project)
        }
      })

      return {
        personalProjects,
        schoolProjects,
        schoolProjectCollections
      }
    }
  },
  created() {
    this.fetchLocalizedData()
    this.fetchProjects()
  }
})
