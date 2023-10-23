import type { TabItemType } from '@/types/common/TabItem'
import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SegmentNav',
  setup(setup, { emit }) {
    const { tm } = useI18n()
    const items = computed(() => tm('components.common.SegmentNav.items') as TabItemType[])
    const options = computed(() => tm('components.common.SegmentNav.options') as TabItemType[])
    const selectedIndex = ref(0)
    const isLoaded = ref(false)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const selectionDimensions = reactive({ width: 0, x: 0 })

    const calculateSelectionPosition = (selectedIndex: number) => {
      const segmentNavElement = segmentNav.value
      if (segmentNavElement) {
        const segmentNavItems = segmentNavElement.querySelectorAll('.segmentnav-item')
        const { offsetWidth, offsetLeft } = segmentNavItems[selectedIndex] as HTMLElement
        selectionDimensions.width = offsetWidth
        selectionDimensions.x = offsetLeft
      }
    }

    const selectionStyle = computed(() => ({
      width: `${selectionDimensions.width}px`,
      transform: `translateX(${selectionDimensions.x}px)`
    }))

    watchEffect(() => {
      calculateSelectionPosition(selectedIndex.value)
      emit('update:selectedIndex', selectedIndex.value)
    })

    onMounted(() => {
      calculateSelectionPosition(selectedIndex.value)
      isLoaded.value = true
    })

    return {
      items,
      selectedIndex,
      isLoaded,
      selectionStyle,
      segmentNav
    }
  }
})
