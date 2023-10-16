import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { listRepositoryTags } from '@/helpers/github-helper'
import type { LinkType } from '@/types/common/Link'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    LinkCollection
  },
  setup() {
    const { tm } = useI18n()
    const links = ref<LinkType[]>(tm('components.common.RibbonBar.links'))
    const tags = ref<{ latest: string | undefined; previous: string | undefined }>({
      latest: undefined,
      previous: undefined
    })

    const fetchTags = async () => {
      const [latest, previous] = await listRepositoryTags({
        owner: 'JonathanXDR',
        repo: 'Application-Website-Frontend',
        perPage: 2
      })

      tags.value = { latest: latest.name, previous: previous.name }
    }

    onMounted(fetchTags)

    return { tm, links, tags }
  }
})
