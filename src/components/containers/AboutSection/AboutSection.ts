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
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchData, stringTemplateParser } from '@/services/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutSection',
  components: {
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
    TimeLine
  },
  data() {
    return {
      json: null as any,
      age: [] as number[]
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = await fetchData()
        this.json = data.components.containers.about
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  },
  mounted() {
    if (!this.json) {
      console.error('Error: JSON data is null')
      return
    }

    const jsonWithDates = this.json as { dates: { date: string }[] }
    jsonWithDates.dates.forEach((item) => {
      const date = new Date(item.date)
      const difference = new Date(Date.now() - date.getTime())
      const age = Math.abs(difference.getUTCFullYear() - 1970)
      this.age.push(age)
    })

    this.json = stringTemplateParser(this.json, {
      age: this.age
    })
  }
})
