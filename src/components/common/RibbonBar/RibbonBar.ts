import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    LinkCollection
  },
  setup() {
    const { tm } = useI18n()
    const links = computed(() => tm('components.common.RibbonBar.links') as LinkType[])
    const tags = reactive({
      latest: null,
      previous: null
    }) as { latest: string | null; previous: string | null }

    const fetchTags = async () => {
      const allTags = await listRepositoryTags({
        owner: 'JonathanXDR',
        repo: 'Application-Website-Frontend',
        perPage: 2
      })

      tags.latest = allTags[0].name
      tags.previous = allTags[1].name
    }

    onMounted(() => {
      fetchTags()
    })

    return {
      tm,
      links,
      tags
    }
  }
})
