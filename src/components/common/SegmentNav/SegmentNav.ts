import DropDown from '@/components/common/DropDown/DropDown.vue'
import type { OptionType } from '@/types/common/Option'
import { computed, defineComponent, onMounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Segment {
  width: number
  offset: number
}

export default defineComponent({
  name: 'SegmentNav',
  components: { DropDown },
  setup() {
    const { tm } = useI18n()
    const segmentNavItems: Ref<OptionType[]> = computed(() =>
      tm('components.common.SegmentNav.items')
    )
    const segmentNavOptions: Ref<OptionType[]> = computed(() =>
      tm('components.common.SegmentNav.options')
    )
    const currentIndex: Ref<number> = ref(0)
    const isLoaded: Ref<boolean> = ref(false)
    const segmentNavEl: Ref<HTMLUListElement | null> = ref(null)
    const segments: Ref<Map<number, Segment>> = ref(new Map())

    const selectionStyle = computed(() => {
      const segment = segments.value.get(currentIndex.value)
      return segment
        ? {
            width: `${segment.width}px`,
            transform: `translateX(${segment.offset}px)`
          }
        : {}
    })

    const updateSegments = () => {
      if (segmentNavEl.value) {
        const segmentNavItems = segmentNavEl.value.querySelectorAll('.segmentnav-item')
        segmentNavItems.forEach((item, index) => {
          segments.value.set(index, {
            width: item.offsetWidth,
            offset: item.offsetLeft
          })
        })
      }
    }

    onMounted(() => {
      updateSegments()
      isLoaded.value = true
    })

    return {
      segmentNavItems,
      segmentNavOptions,
      currentIndex,
      isLoaded,
      selectionStyle,
      segmentNavEl
    }
  }
})
