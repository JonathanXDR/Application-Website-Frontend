import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import AirplaneDeparture from '@/components/common/Icons/AirplaneDeparture.vue'
import ArrowDownCircle from '@/components/common/Icons/ArrowDownCircle.vue'
import Calendar from '@/components/common/Icons/Calendar.vue'
import ChevronLeftForwardslashChevronRight from '@/components/common/Icons/ChevronLeftForwardslashChevronRight.vue'
import ChevronRight from '@/components/common/Icons/ChevronRight.vue'
import Gear from '@/components/common/Icons/Gear.vue'
import PersonCropSquare from '@/components/common/Icons/PersonCropSquare.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OtherSection',
  components: {
    AirplaneDeparture,
    ArrowDownCircle,
    Calendar,
    ChevronLeftForwardslashChevronRight,
    ChevronRight,
    Gear,
    PersonCropSquare,
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
      json: undefined as any
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = (await fetchData()) as any
        this.json = data.components.containers.other
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  }
})
