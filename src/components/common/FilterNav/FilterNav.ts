import Icon from '@/components/common/Icons/Icon.vue'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'FilterNav',
  components: {
    Icon
  },
  setup() {
    const items = reactive([
      { id: 'overall', label: 'Overall' },
      { id: 'tech', label: 'Tech' },
      { id: 'nontech', label: 'Non-Tech' },
      { id: 'leadership', label: 'Leadership' },
      { id: 'retail', label: 'Retail' },
      { id: 'retailLeadership', label: 'Retail Leadership' }
    ])

    const options = reactive([
      { id: '2022', label: '2022' },
      { id: '2021', label: '2021' },
      { id: '2020', label: '2020' },
      { id: '2019', label: '2019' },
      { id: '2018', label: '2018' },
      { id: '2017', label: '2017' },
      { id: '2016', label: '2016' },
      { id: '2015', label: '2015' },
      { id: '2014', label: '2014' }
    ])

    return {
      items,
      options
    }
  }
})
