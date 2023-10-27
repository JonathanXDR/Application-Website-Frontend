import DropDown from '@/components/common/DropDown/DropDown.vue'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SegmentNav',
  components: {
    DropDown
  },
  setup() {
    const { tm } = useI18n()
    const segmentNavItems = computed(() => tm('components.common.SegmentNav.items'))
    const segmentNavOptions = computed(() => tm('components.common.SegmentNav.options'))
    const currentIndex = ref(0)
    const isLoaded = ref(false)
    const segmentNavEl = ref<HTMLUListElement | null>(null)
    const segments = reactive(new Map())
    const selectionBackground = ref<HTMLDivElement | null>(null)

    const updateSelectionBackground = (segment: { width: number; offset: number }) => {
      if (selectionBackground.value) {
        selectionBackground.value.style.width = `${segment.width}px`
        selectionBackground.value.style.transform = `translateX(${segment.offset}px)`
      }
    }

    const selectionStyle = computed(() => {
      const segment = segments.get(currentIndex.value)
      return segment
        ? {
            width: `${segment.width}px`,
            transform: `translateX(${segment.offset}px)`
          }
        : {}
    })

    onMounted(() => {
      if (segmentNavEl.value) {
        const segmentNavItems = segmentNavEl.value.querySelectorAll('.segmentnav-item')
        segmentNavItems.forEach((item, index) => {
          segments.set(index, {
            width: item.offsetWidth,
            offset: item.offsetLeft
          })
        })
        const selectionBackgroundElement = document.createElement('div')
        selectionBackgroundElement.classList.add('segmentnav-selection-background')
        selectionBackgroundElement.setAttribute('role', 'presentation')
        segmentNavEl.value.appendChild(selectionBackgroundElement)
        selectionBackground.value = selectionBackgroundElement
        updateSelectionBackground(segments.get(currentIndex.value))
        isLoaded.value = true
      }
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
