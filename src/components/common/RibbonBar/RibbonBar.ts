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
    const baseItems = ref([
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
    const totalItems = ref(baseItems.value.length)
    const isTransitioning = ref(false)
    const scrollDirection = ref('right')

    const items = computed(() => {
      if (!isTransitioning.value) {
        const start = currentIndex.value % totalItems.value
        return Array.from(
          { length: totalItems.value },
          (_, i) => baseItems.value[(start + i) % totalItems.value]
        )
      }
      return baseItems.value
    })

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
      scrollDirection.value = direction
      if (direction === 'left') {
        currentIndex.value =
          currentIndex.value === 0 ? totalItems.value - 1 : currentIndex.value - 1
      } else {
        currentIndex.value = (currentIndex.value + 1) % totalItems.value
      }
    }

    const transformStyle = computed(() => {
      let translateXValue = -100 / totalItems.value
      if (scrollDirection.value === 'left') {
        translateXValue = Math.abs(translateXValue)
      }

      return {
        transform: `translateX(${isTransitioning.value ? translateXValue + '%' : '0px'})`,
        width: `${100 * totalItems.value}%`,
        left: '-100%',
        transition: isTransitioning.value ? 'transform 1000ms ease 0s' : 'none 0s ease 0s'
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
