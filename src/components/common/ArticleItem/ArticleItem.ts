import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import { defineComponent, onMounted, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ArticleItem',
  components: {
    Icon,
    LinkCollection
  },
  props: {
    article: {
      type: Object as PropType<ArticleItemType>,
      required: true,
      default: () => {}
    }
  },
  setup(props) {
    const { locale } = useI18n({ useScope: 'global' })

    const formatDate = (dateString, locale) => {
      if (!dateString) {
        return
      }

      const dateParts = dateString.split('-')
      const dateOptions = { year: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions
      if (dateParts.length === 1) {
        dateOptions.weekday = 'long'
      }
      return new Date(dateString).toLocaleDateString(`${locale}-CH`, dateOptions)
    }

    const fromDateString = props.article.date?.from
      ? formatDate(props.article.date?.from, locale.value)
      : ''
    const toDateString = props.article.date?.to
      ? ` - ${formatDate(props.article.date?.to, locale.value)}`
      : ''

    const formattedDateRange = `${fromDateString}${toDateString}`

    onMounted(() => {
      formatDate(props.article.date?.from, locale.value)
    })

    return {
      locale,
      formatDate,
      formattedDateRange
    }
  }
})
