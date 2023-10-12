import AirplaneDeparture from '@/components/common/Icons/AirplaneDeparture.vue'
import Gear from '@/components/common/Icons/Gear.vue'
import PersonCropSquare from '@/components/common/Icons/PersonCropSquare.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import ServerRack

export default {
  name: 'ArticleItem',
  components: {
    AirplaneDeparture,
    ArrowDownCircle,
    Calendar,
    ChevronLeftForwardslashChevronRight,
    ChevronRight,
    ServerRack,
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
