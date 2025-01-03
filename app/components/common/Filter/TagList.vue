<template>
  <div class="tags">
    <div
      ref="scrollWrapper"
      class="scroll-wrapper"
      :class="{ scrolling: isScrolling }"
    >
      <ul
        :id="`${id}-tags`"
        ref="tags"
        :aria-label="ariaLabel"
        tabindex="0"
        role="listbox"
        :aria-multiselectable="areTagsRemovable ? 'true' : 'false'"
        aria-orientation="horizontal"
        @keydown.left.capture.prevent="focusPrev"
        @keydown.right.capture.prevent="focusNext"
        @keydown.up.capture.prevent="focusPrev"
        @keydown.down.capture.prevent="focusNext"
        @keydown.delete.prevent.self="() => emit('reset-filters')"
        @keydown.meta.a.capture.prevent="() => emit('select-all')"
        @keydown.ctrl.a.capture.prevent="() => emit('select-all')"
        @keydown.exact.capture="handleKeydown"
        @keydown.shift.exact.capture="handleKeydown"
      >
        <FilterTag
          v-for="(tag, index) in props.tags"
          :key="index"
          :name="tag"
          :is-focused="focusedIndex === index"
          :is-removable-tag="areTagsRemovable"
          :filter-text="input"
          :is-translatable-tag="props.translatableTags.includes(tag)"
          :is-active-tag="props.activeTags.includes(tag)"
          :active-tags="props.activeTags"
          :keyboard-is-virtual="keyboardIsVirtual"
          @focus="handleFocus($event, index)"
          @click="emit('click-tags', $event)"
          @delete-tag="emit('delete-tag', $event)"
          @prevent-blur="emit('prevent-blur')"
          @paste-content="emit('paste-tags', $event)"
          @keydown="emit('keydown', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isSingleCharacter } from '~/utils/input-helper'

const ScrollingDebounceDelay = 1000

const props = withDefaults(
  defineProps<{
    tags: string[]
    activeTags: string[]
    translatableTags: string[]
    ariaLabel?: string
    id?: string
    input?: string
    areTagsRemovable?: boolean
    keyboardIsVirtual?: boolean
  }>(),
  {
    tags: () => [],
    activeTags: () => [],
    translatableTags: () => [],
    input: undefined,
    areTagsRemovable: false,
    keyboardIsVirtual: false,
  },
)

const emit = defineEmits<{
  (
    e:
      | 'reset-filters'
      | 'select-all'
      | 'prevent-blur'
      | 'focus-prev'
      | 'focus-next',
  ): void
  (e: 'click-tags', payload: MouseEvent): void
  (e: 'delete-tag', payload: { tagName: string, event: Event }): void
  (e: 'paste-tags', payload: ClipboardEvent): void
  (e: 'keydown', payload: KeyboardEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const scrollWrapper = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const timestamp = useTimestamp()
const scrollRemovedAt = ref(0)
const doDeleteScroll = () => {
  isScrolling.value = false
  scrollRemovedAt.value = timestamp.value
}
const deleteScroll = useDebounceFn(doDeleteScroll, ScrollingDebounceDelay)

const { width, height } = useElementSize(scrollWrapper)

const handleScroll = (e: Event) => {
  if (!scrollWrapper.value) return
  if (scrollWrapper.value.scrollTop !== 0) {
    scrollWrapper.value.scrollTop = 0
    e.preventDefault?.()
    return
  }
  const safeExtraWidth = 150
  const noScrollBarsWidth = width.value + safeExtraWidth
  if (scrollWrapper.value.scrollWidth < noScrollBarsWidth) return
  const difference = timestamp.value - scrollRemovedAt.value
  if (difference < ScrollingDebounceDelay / 10) return
  isScrolling.value = true
  if (!scrollWrapper.value.style.getPropertyValue('--scroll-target-height')) {
    scrollWrapper.value.style.setProperty(
      '--scroll-target-height',
      `${height.value}px`,
    )
  }
  deleteScroll()
}

useEventListener(scrollWrapper, 'scroll', handleScroll)

const focusedIndex = ref(0)
const externalFocusChange = ref(false)
const totalItemsToNavigate = computed(() => props.tags.length)

const focusIndex = (index: number | null) => {
  if (index === null || index < 0) return
  focusedIndex.value = index
}

const focusPrev = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey) return
  externalFocusChange.value = false
  if (focusedIndex.value > 0) {
    focusIndex(focusedIndex.value - 1)
  }
  else {
    emit('focus-prev')
  }
}

const focusNext = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey) return
  externalFocusChange.value = false
  if (focusedIndex.value < totalItemsToNavigate.value - 1) {
    focusIndex(focusedIndex.value + 1)
  }
  else {
    emit('focus-next')
  }
}

const handleFocus = (event: FocusEvent, index: number) => {
  focusIndex(index)
  isScrolling.value = false
  emit('focus', event)
}

const handleKeydown = (e: KeyboardEvent) => {
  const { key } = e
  const tag = props.tags[focusedIndex.value]
  if (isSingleCharacter(key) && tag) {
    emit('delete-tag', { tagName: tag, event: e })
  }
}

const focusFirst = async () => {
  externalFocusChange.value = false
  focusIndex(null)
  await nextTick()
  focusIndex(0)
}

const focusLast = async () => {
  externalFocusChange.value = false
  focusIndex(null)
  await nextTick()
  focusIndex(totalItemsToNavigate.value - 1)
}

const focusTag = (tag: string) => {
  focusIndex(props.tags.indexOf(tag))
}

const resetScroll = () => {
  if (scrollWrapper.value) scrollWrapper.value.scrollLeft = 0
}

defineExpose({
  focusFirst,
  focusLast,
  focusTag,
  resetScroll,
})
</script>

<style scoped lang="scss">
// @import "docc-render/styles/_core.scss";

.tags {
  position: relative;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  transition:
    padding-right 0.8s,
    padding-bottom 0.8s,
    max-height 1s,
    opacity 1s;
  padding: 0;

  .scroll-wrapper {
    overflow-x: auto;
    @include custom-horizontal-scrollbar;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }
}
</style>
