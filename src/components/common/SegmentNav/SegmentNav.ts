import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

const calculateSelectionPosition = (
  segmentNav: HTMLUListElement | null,
  selectedIndex: number,
  selectionDimensions: { width: number; x: number }
) => {
  if (segmentNav) {
    const segmentNavItems = segmentNav.querySelectorAll('.segmentnav-item')
    const { offsetWidth, offsetLeft } = segmentNavItems[selectedIndex] as HTMLElement
    selectionDimensions.width = offsetWidth
    selectionDimensions.x = offsetLeft
  }
}

export default defineComponent({
  name: 'SegmentNav',
  setup() {
    const items = reactive([
      { id: 'handoff', label: 'Handoff' },
      { id: 'reading-list', label: 'Reading List' },
      { id: 'icloud-keychain', label: 'iCloud Keychain' }
    ])
    const selectedIndex = ref(0)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const selectionDimensions = reactive({ width: 0, x: 0 })

    const selectionStyle = computed(() => ({
      width: `${selectionDimensions.width}px`,
      transform: `translateX(${selectionDimensions.x}px)`
    }))

    watch(selectedIndex, () => {
      calculateSelectionPosition(segmentNav.value, selectedIndex.value, selectionDimensions)
    })

    onMounted(() => {
      calculateSelectionPosition(segmentNav.value, selectedIndex.value, selectionDimensions)
    })

    return {
      items,
      selectedIndex,
      selectionStyle,
      segmentNav
    }
  }
})
