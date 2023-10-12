import AirplaneDeparture from '@/components/common/Icons/AirplaneDeparture.vue'
import Gear from '@/components/common/Icons/Gear.vue'
import PersonCropSquare from '@/components/common/Icons/PersonCropSquare.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'

export default {
  name: 'ArticleItem',
  components: {
    AirplaneDeparture,
    ArrowDownCircle,
    Calendar,
    ChevronLeftForwardslashChevronRight,
    ChevronRight,
    Gear,
    PersonCropSquare,
    LinkCollection
  },
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
