import { defineComponent, onMounted, ref, watch, type Ref } from 'vue'

export default defineComponent({
  name: 'SegmentNav',
  setup() {
    const segments = ref([
      { id: 'handoff', label: 'Handoff' },
      { id: 'reading-list', label: 'Reading List' },
      { id: 'icloud-keychain', label: 'iCloud Keychain' }
    ])
    const selectedSegment = ref('handoff')
    const segmentNav = ref(null)
    const segmentNavSelectionBackground = ref(null)
    const segmentEls: Ref<HTMLLIElement[]> = ref([])

    const selectionWidth = ref(0)
    const translateX = ref(0)

    const handleRef = (el, index) => {
      if (el) segmentEls.value[index] = el
    }

    const updateSelectionStyles = () => {
      const selectedIndex = segments.value.findIndex(
        (segment) => segment.id === selectedSegment.value
      )
      if (segmentEls.value[selectedIndex] && segmentNav.value) {
        selectionWidth.value = segmentEls.value[selectedIndex].offsetWidth
        const segmentNavPadding = parseFloat(getComputedStyle(segmentNav.value).paddingLeft) || 0
        translateX.value = segmentEls.value[selectedIndex].offsetLeft - segmentNavPadding
      }
    }

    watch(selectedSegment, updateSelectionStyles)

    onMounted(updateSelectionStyles)

    const onSegmentChange = (selectedId: string) => {
      selectedSegment.value = selectedId
    }

    return {
      handleRef,
      segments,
      selectedSegment,
      segmentNav,
      segmentNavSelectionBackground,
      onSegmentChange,
      selectionWidth,
      translateX
    }
  }
})
