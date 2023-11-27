import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import type { RibbonBar } from '@/types/common/RibbonBar'
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    Icon,
    LinkCollection
  },
  setup() {
    const { tm, rt } = useI18n()
    const tags = ref({ latest: undefined, previous: undefined })
    const baseItems: Ref<RibbonBar[]> = ref(computed(() => tm('components.common.RibbonBar')).value)

    const itemsWithLinks = baseItems.value.map((item, index) => {
      const itemLinks = (tm(`components.common.RibbonBar[${index}].links`) as LinkType[]).map(
        (link) => {
          return {
            ...link,
            url: rt(link.url, { latestTag: tags.value.latest, previousTag: tags.value.previous })
          }
        }
      )

      return {
        ...item,
        links: itemLinks
      }
    })

    const currentIndex = ref(0)
    const totalItems = ref(itemsWithLinks.length)
    const isTransitioning = ref(false)
    const scrollDirection = ref('right')
    const displayItems = ref([...itemsWithLinks])

    const fetchTags = async () => {
      const [latest, previous] = await listRepositoryTags({
        owner: 'JonathanXDR',
        repo: 'Application-Website-Frontend',
        perPage: 2
      })

      tags.value = { latest: latest.name, previous: previous.name }
    }

    const scrollContent = (direction: 'left' | 'right') => {
      if (!isTransitioning.value && totalItems.value > 2) {
        isTransitioning.value = true
        scrollDirection.value = direction

        nextTick(() => {
          if (direction === 'left') {
            currentIndex.value =
              currentIndex.value === 0 ? totalItems.value - 1 : currentIndex.value - 1
          } else {
            currentIndex.value = (currentIndex.value + 1) % totalItems.value
          }
        })
      }
    }

    const transformStyle = computed(() => {
      if (totalItems.value > 2) {
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
      }
      return {}
    })

    watch(currentIndex, () => {
      setTimeout(() => {
        isTransitioning.value = false
        const start = (currentIndex.value - 1 + totalItems.value) % totalItems.value
        displayItems.value = Array.from(
          { length: totalItems.value },
          (_, i) => baseItems.value[(start + i) % totalItems.value]
        )
      }, 1000)
    })

    onMounted(() => {
      fetchTags()
      const start = (currentIndex.value - 1 + totalItems.value) % totalItems.value
      displayItems.value = Array.from(
        { length: totalItems.value },
        (_, i) => baseItems.value[(start + i) % totalItems.value]
      )
    })

    return {
      itemsWithLinks,
      totalItems,
      displayItems,
      tags,
      scrollContent,
      transformStyle,
      isTransitioning
    }
  }
})
