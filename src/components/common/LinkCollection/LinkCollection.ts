import AirplaneDeparture from '@/components/common/Icons/AirplaneDeparture.vue'
import ArrowDownCircle from '@/components/common/Icons/ArrowDownCircle.vue'
import Calendar from '@/components/common/Icons/Calendar.vue'
import ChevronLeftForwardslashChevronRight from '@/components/common/Icons/ChevronLeftForwardslashChevronRight.vue'
import ChevronRight from '@/components/common/Icons/ChevronRight.vue'
import Gear from '@/components/common/Icons/Gear.vue'
import PersonCropSquare from '@/components/common/Icons/PersonCropSquare.vue'

export default {
  name: 'LinkCollection',
  components: {
    AirplaneDeparture,
    ArrowDownCircle,
    Calendar,
    ChevronLeftForwardslashChevronRight,
    ChevronRight,
    Gear,
    PersonCropSquare
  },
  props: {
    links: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
