import ButtonItem from '@/components/common/ButtonItem/ButtonItem.vue'
import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import TagBar from '@/components/common/TagBar/TagBar.vue'
import type { CardItemType } from '@/types/common/CardItem'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import moment from 'moment'
import { computed, defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'CardTile',
  components: {
    Icon,
    ButtonItem,
    TagBar,
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
      type: String as PropType<'small' | 'large' | 'full'>,
      required: false,
      default: 'small'
    },
    hover: {
      type: String as PropType<'auto' | 'true' | 'false'>,
      required: false,
      default: 'auto'
    },
    cover: {
      type: String,
      required: false,
      default: undefined
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
    const { locale } = useI18n({ useScope: 'global' })
    const applyHover = computed(() => {
      return (
        (props.hover === 'auto' && props.card.links && props.card.links.length === 1) ||
        props.hover === 'true'
      )
    })
    const updatedYesterday = computed(() => {
      if (!props.card.updated_at) return false
      const updatedDate = moment(props.card.updated_at)
      const currentDate = moment()
      return currentDate.diff(updatedDate, 'days') <= 1
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
          return 'row'
        default:
          return 'row'
      }
    }

    const getAlignItems = () => {
      switch (props.iconAlignment) {
        case 'start':
          return 'flex-start'
        case 'center':
          return 'center'
        case 'end':
          return 'flex-end'
        default:
          return 'flex-start'
      }
    }

    const formatDate = (dateString: string, formatOptions: Intl.DateTimeFormatOptions) => {
      return new Date(dateString).toLocaleDateString(locale.value, formatOptions)
    }

    const getDate = () => {
      const formatOptions = props.dateFormatOptions
      const dateVariant = props.dateNowKey

      if (props.card?.info?.date?.from && props.card?.info?.date?.to) {
        return `${formatDate(props.card?.info?.date.from, formatOptions)} - ${formatDate(
          props.card?.info?.date.to,
          formatOptions
        )}`
      } else if (props.card?.info?.date?.from) {
        return formatDate(props.card?.info?.date.from, formatOptions)
      } else if (props.card.updated_at) {
        return (
          props.card?.info?.date ||
          `${dateVariant.charAt(0).toUpperCase()}${dateVariant.slice(1)} ${moment(
            props.card.updated_at
          )
            .locale(locale.value)
            .fromNow()}`
        )
      }
    }

    return {
      applyHover,
      updatedYesterday,
      getFlexDirection,
      getAlignItems,
      date: getDate()
    }
  }
})
