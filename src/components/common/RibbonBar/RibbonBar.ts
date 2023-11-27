// RibbonBar.ts
import Icon from '@/components/common/Icons/Icon.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import { computed, defineComponent, onMounted, ref, type Ref } from 'vue'
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
    const tags = ref({ latest: undefined, previous: undefined }) as Ref<{
      latest: string | undefined
      previous: string | undefined
    }>
    const scrollPosition = ref(0)

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
      const scrollAmount = 300
      scrollPosition.value += (direction === 'left' ? -1 : 1) * scrollAmount
    }

    const transformStyle = computed(() => {
      return `translateX(-${scrollPosition.value}px)`
    })

    onMounted(fetchTags)

    return { links, tags, scrollContent, transformStyle }
  }
})
