import { defineComponent, onMounted, onUpdated, ref } from 'vue'

export default defineComponent({
  name: 'SegmentNav',
  setup() {
    const items = ref([
      { id: 'handoff', label: 'Handoff' },
      { id: 'reading-list', label: 'Reading List' },
      { id: 'icloud-keychain', label: 'iCloud Keychain' }
    ])
    const selectedIndex = ref(0)
    const selectionWidth = ref(0)
    const selectionX = ref(0)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const segmentNavSelectionBackground = ref<HTMLDivElement | null>(null)

    const updateSelection = (index: number) => {
      selectedIndex.value = index
      calculateSelectionPosition()
    }

    const calculateSelectionPosition = () => {
      if (segmentNav.value) {
        const segmentNavItems = segmentNav.value.querySelectorAll('.segmentnav-item')
        const selectedItem = segmentNavItems[selectedIndex.value] as HTMLElement
        selectionWidth.value = selectedItem.offsetWidth
        selectionX.value = selectedItem.offsetLeft
      }
    }

    onMounted(() => {
      calculateSelectionPosition()
    })

    onUpdated(() => {
      calculateSelectionPosition()
    })

    return {
      items,
      selectedIndex,
      selectionWidth,
      selectionX,
      segmentNav,
      segmentNavSelectionBackground,
      updateSelection
    }
  }
})
