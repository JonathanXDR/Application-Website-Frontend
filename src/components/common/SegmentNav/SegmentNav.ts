import { computed, defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'SegmentNav',
  setup() {
    const items = ref([
      { id: 'handoff', label: 'Handoff' },
      { id: 'reading-list', label: 'Reading List' },
      { id: 'icloud-keychain', label: 'iCloud Keychain' }
    ])
    const selectedIndex = ref(0)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const selectionWidth = ref(0)
    const selectionX = ref(0)

    const selectionStyle = computed(() => {
      return {
        width: `${selectionWidth.value}px`,
        transform: `translateX(${selectionX.value}px)`
      }
    })

    const calculateSelectionPosition = () => {
      if (segmentNav.value) {
        const segmentNavItems = segmentNav.value.querySelectorAll('.segmentnav-item')
        const { offsetWidth, offsetLeft } = segmentNavItems[selectedIndex.value] as HTMLElement
        selectionWidth.value = offsetWidth
        selectionX.value = offsetLeft
      }
    }

    watch(selectedIndex, () => {
      calculateSelectionPosition()
    })

    onMounted(() => {
      calculateSelectionPosition()
    })

    return {
      items,
      selectedIndex,
      selectionStyle,
      segmentNav
    }
  }
})
