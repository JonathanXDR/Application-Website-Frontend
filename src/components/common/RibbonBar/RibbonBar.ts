import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import { computed, defineComponent, onMounted, ref, watch, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    Icon,
    LinkCollection
  },
  setup() {
    const items = ref([
      'The latest version of the website.',
      'The previous version of the website.',
      'The first version of the website.'
    ])
    const { tm, rt } = useI18n()
    const tags = ref({ latest: undefined, previous: undefined }) as Ref<{
      latest: string | undefined
      previous: string | undefined
    }>
    const currentIndex = ref(0)
    const totalItems = ref(items.value.length)
    const isTransitioning = ref(false)

    const fetchTags = async () => {
      const [latest, previous] = await listRepositoryTags({
        owner: 'JonathanXDR',
        repo: 'Application-Website-Frontend',
        perPage: 2
      })

      tags.value = { latest: latest.name, previous: previous.name }
    }

    const links = computed(() => {
      return (tm('components.common.RibbonBar.links') as LinkType[]).map((link) => {
        return {
          ...link,
          url: rt(link.url, { latestTag: tags.value.latest, previousTag: tags.value.previous })
        }
      })
    })

    const scrollContent = (direction: 'left' | 'right') => {
      isTransitioning.value = true
      if (direction === 'left') {
        currentIndex.value = Math.max(currentIndex.value - 1, 0)
      } else {
        currentIndex.value = Math.min(currentIndex.value + 1, totalItems.value - 1)
      }
    }

    const transformStyle = computed(() => {
      const transitionStyle = isTransitioning.value ? 'transform 1000ms ease 0s' : 'none 0s ease 0s'
      return {
        transform: `translateX(${-100 / totalItems.value}%)`,
        width: `${100 * totalItems.value}%`,
        left: '-100%',
        transition: transitionStyle
      }
    })

    watch(currentIndex, () => {
      setTimeout(() => {
        isTransitioning.value = false
      }, 1000)
    })

    onMounted(fetchTags)

    return { items, links, tags, scrollContent, transformStyle }
  }
})
