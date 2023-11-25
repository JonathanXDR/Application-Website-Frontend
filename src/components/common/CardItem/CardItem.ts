import AnchorButton from '@/components/common/AnchorButton/AnchorButton.vue'
import ButtonItem from '@/components/common/ButtonItem/ButtonItem.vue'
import Icon from '@/components/common/Icons/Icon.vue'
import InfoBar from '@/components/common/InfoBar/InfoBar.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import TagBar from '@/components/common/TagBar/TagBar.vue'
import type { CardItemType } from '@/types/common/CardItem'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import { computed, defineComponent, type PropType } from 'vue'
export default defineComponent({
  name: 'CardTile',
  components: {
    Icon,
    ButtonItem,
    TagBar,
    InfoBar,
    AnchorButton,
    LinkCollection
  },
  props: {
    card: {
      type: Object as PropType<CardItemType & ListUserReposResponse>,
      required: true,
      default: () => {}
    },
    variant: {
      type: String as PropType<'card' | 'article'>,
      required: false,
      default: 'card'
    },
    dateFormatOptions: {
      type: Object as PropType<Intl.DateTimeFormatOptions>,
      required: false,
      default: () => {
        return {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      }
    },
    dateNowKey: {
      type: String as PropType<'created' | 'updated'>,
      required: false,
      default: 'updated'
    },
    iconPosition: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      required: false,
      default: 'left'
    },
    iconAlignment: {
      type: String as PropType<'start' | 'center' | 'end'>,
      required: false,
      default: 'top'
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large' | 'full'>,
      required: false,
      default: 'medium'
    },
    hover: {
      type: String as PropType<'auto' | 'true' | 'false'>,
      required: false,
      default: 'auto'
    },
    cover: {
      type: String,
      required: false,
      default: false as unknown as string
    },
    donutGraph: {
      type: Boolean,
      required: false,
      default: false
    },
    barGraph: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const applyHover = computed(() => {
      return (
        (props.hover === 'auto' && props.card.links && props.card.links.length === 1) ||
        props.hover === 'true'
      )
    })

    const getFlexDirection = () => {
      switch (props.iconPosition) {
        case 'top':
          return 'column'
        case 'right':
          return 'row-reverse'
        case 'bottom':
          return 'column-reverse'
        case 'left':
        default:
          return 'row'
      }
    }

    const getAlignItems = () => {
      switch (props.iconAlignment) {
        case 'start':
        case 'center':
          return 'center'
        case 'end':
          return 'flex-end'
        default:
          return 'flex-start'
      }
    }

    return {
      applyHover,
      getFlexDirection,
      getAlignItems
    }
  }
})
