import DropDown from '@/components/common/DropDown/DropDown.vue'
import type { OptionType } from '@/types/common/Option'
import { computed, defineComponent, onMounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SegmentNav',
  components: { DropDown },
  props: {
    index: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup(props, { emit }) {
    const { tm } = useI18n()
    const segmentNavItems: Ref<OptionType[]> = computed(() =>
      tm('components.common.SegmentNav.items')
    )
    const segmentNavOptions: Ref<OptionType[]> = computed(() =>
      tm('components.common.SegmentNav.options')
    )
    const currentIndex: Ref<number> = ref(props.index)
    const loading: Ref<boolean> = ref(true)
    const segmentNavEl: Ref<HTMLUListElement | null> = ref(null)
    const segments: Ref<Map<number, HTMLElement>> = ref(new Map())

    const selectionStyle = computed(() => {
      const segment = segments.value.get(currentIndex.value)
      return segment
        ? {
            width: `${segment.offsetWidth}px`,
            transform: `translateX(${segment.offsetLeft}px)`
          }
        : {}
    })

    const updateSegments = () => {
      if (segmentNavEl.value) {
        const segmentNavItems = segmentNavEl.value.querySelectorAll('.segmentnav-item')
        segmentNavItems.forEach((item, index) => {
          segments.value.set(index, item as HTMLElement)
        })
        emit('update:currentIndex', currentIndex.value)
      }
    }

    onMounted(() => {
      updateSegments()
      loading.value = false
    })

    return {
      segmentNavItems,
      segmentNavOptions,
      currentIndex,
      loading,
      selectionStyle,
      segmentNavEl,
      updateSegments
    }
  }
})
