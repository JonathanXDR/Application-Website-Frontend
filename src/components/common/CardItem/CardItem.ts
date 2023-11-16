import Icon from '@/components/common/Icons/Icon.vue'
import TagBar from '@/components/common/TagBar/TagBar.vue'
import type { CardItemType } from '@/types/common/CardItem'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import moment from 'moment'
import { defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'CardTile',
  components: {
    Icon,
    TagBar
  },
  props: {
    card: {
      type: Object as PropType<CardItemType & ListUserReposResponse>,
      required: true,
      default: () => {}
    },
    variant: {
      type: String as PropType<'card' | 'tile' | 'article'>,
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
    size: {
      type: String as PropType<'small' | 'large' | 'full'>,
      required: false,
      default: 'medium'
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

    const formatDate = (dateString: string, formatOptions: Intl.DateTimeFormatOptions) => {
      return new Date(dateString).toLocaleDateString(locale.value, formatOptions)
    }

    const getDate = () => {
      const formatOptions = props.dateFormatOptions
      const dateVariant = props.dateNowKey

      if (props.card.date?.from && props.card.date?.to) {
        return `${formatDate(props.card.date.from, formatOptions)} - ${formatDate(
          props.card.date.to,
          formatOptions
        )}`
      } else if (props.card.date?.from) {
        return formatDate(props.card.date.from, formatOptions)
      } else if (props.card.updated_at) {
        return (
          props.card.date ||
          `${dateVariant.charAt(0).toUpperCase()}${dateVariant.slice(1)} ${moment(
            props.card.updated_at
          )
            .locale(locale.value)
            .fromNow()}`
        )
      }
    }

    return { date: getDate() }
  }
})
