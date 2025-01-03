<template>
  <div
    class="filter"
    role="search"
    tabindex="0"
    :aria-labelledby="searchAriaLabelledBy"
    :class="{ focus: displaySuggestedTags && !preventBorderStyle }"
    @blur.capture="handleBlur"
    @focus.capture="handleFocus"
  >
    <div
      :class="[
        'filter__wrapper',
        {
          'filter__wrapper--reversed': positionReversed,
          'filter__wrapper--no-border-style': preventBorderStyle,
        },
      ]"
    >
      <div class="filter__top-wrapper">
        <button
          class="filter__filter-button"
          aria-hidden="true"
          tabindex="-1"
          :class="{ blue: inputIsNotEmpty }"
          @click="focusInput"
          @mousedown.prevent
        >
          <slot name="icon">
            <FilterIcon />
          </slot>
        </button>
        <div
          :class="['filter__input-box-wrapper', { scrolling: isScrolling }]"
          @scroll="handleScroll"
        >
          <TagList
            v-if="hasSelectedTags"
            :id="SelectedTagsId"
            v-bind="virtualKeyboardBind"
            ref="selectedTagsRef"
            :input="input"
            :tags="selectedTags"
            :aria-label="`${selectedTagsAriaLabel}`"
            :active-tags="activeTags"
            :translatable-tags="translatableTags"
            class="filter__selected-tags"
            v-on="selectedTagsMultipleSelectionListeners"
            @focus-prev="handleFocusPrevOnSelectedTags"
            @focus-next="focusInputFromTags"
            @reset-filters="resetFilters"
            @prevent-blur="$emit('update:preventedBlur', true)"
          />
          <label
            :id="FilterInputId"
            :for="FilterInputId"
            :data-value="modelValue"
            :aria-label="placeholder"
            class="filter__input-label"
          >
            <input
              ref="inputRef"
              v-model="modelValue"
              :placeholder="hasSelectedTags ? '' : placeholder"
              :aria-expanded="displaySuggestedTags ? 'true' : 'false'"
              :disabled="disabled"
              v-bind="AXinputProperties"
              type="text"
              class="filter__input"
              v-on="inputMultipleSelectionListeners"
              @focus="selectInputOnFocus && selectInputAndTags()"
              @keydown.down.prevent="downHandler"
              @keydown.up.prevent="upHandler"
              @keydown.left="leftKeyInputHandler"
              @keydown.right="rightKeyInputHandler"
              @keydown.delete="deleteHandler"
              @keydown.meta.a.prevent.stop="selectInputAndTags"
              @keydown.ctrl.a.prevent="selectInputAndTags"
              @keydown.exact="inputKeydownHandler"
              @keydown.enter.exact="enterHandler"
              @keydown.shift.exact="inputKeydownHandler"
              @keydown.shift.meta.exact="inputKeydownHandler"
              @keydown.meta.exact="assignEventValues"
              @keydown.ctrl.exact="assignEventValues"
            >
          </label>
        </div>
        <div class="filter__delete-button-wrapper">
          <button
            v-if="input.length || displaySuggestedTags || hasSelectedTags"
            :aria-label="deleteButtonAriaLabel"
            class="filter__delete-button"
            @click="resetFilters(true)"
            @keydown.enter.exact.stop="resetFilters(true)"
            @mousedown.prevent
          >
            <ClearRoundedIcon class="clear-rounded-icon" />
          </button>
        </div>
      </div>
      <TagList
        v-if="displaySuggestedTags"
        :id="SuggestedTagsId"
        ref="suggestedTagsRef"
        :aria-label="`${suggestedTagsAriaLabel}`"
        :input="input"
        :tags="suggestedTags"
        :translatable-tags="translatableTags"
        v-bind="virtualKeyboardBind"
        class="filter__suggested-tags"
        @click-tags="selectTag($event.tagName)"
        @prevent-blur="$emit('update:preventedBlur', true)"
        @focus-next="positionReversed ? focusInput() : $emit('focus-next')"
        @focus-prev="positionReversed ? $emit('focus-prev') : focusInput()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import ClearRoundedIcon from '~/components/common/New/Icons/ClearRoundedIcon.vue'
import FilterIcon from '~/components/common/New/Icons/FilterIcon.vue'
import TagList from '~/components/common/New/TagList.vue'
import {
  parseDataFromClipboard,
  prepareDataForHTMLClipboard,
} from '~/utils/clipboard'
import {
  getSelectionText,
  isSingleCharacter,
  moveCursorToEnd,
  moveCursorToStart,
} from '~/utils/input-helper'
import { insertAt } from '~/utils/strings'

const TagLimit = 5
const FilterInputId = 'filter-input'
const SelectedTagsId = 'selected-tags'
const SuggestedTagsId = 'suggested-tags'
const AXinputProperties = {
  'autocorrect': 'off',
  'autocapitalize': 'off',
  'spellcheck': 'false',
  'role': 'combobox',
  'aria-haspopup': 'true',
  'aria-autocomplete': 'none',
  'aria-owns': 'suggestedTags',
  'aria-controls': 'suggestedTags',
}

interface Props {
  positionReversed: boolean
  tags: string[]
  selectedTags: string[]
  preventedBlur: boolean
  placeholder: string
  disabled: boolean
  value: string
  shouldTruncateTags: boolean
  focusInputWhenCreated: boolean
  focusInputWhenEmpty: boolean
  selectInputOnFocus: boolean
  preventBorderStyle: boolean
  translatableTags: string[]
}

const props = withDefaults(defineProps<Props>(), {
  positionReversed: false,
  tags: () => [],
  selectedTags: () => [],
  preventedBlur: false,
  placeholder: '',
  disabled: false,
  value: '',
  shouldTruncateTags: false,
  focusInputWhenCreated: false,
  focusInputWhenEmpty: false,
  selectInputOnFocus: false,
  preventBorderStyle: false,
  translatableTags: () => [],
})

const emits = defineEmits([
  'update:preventedBlur',
  'update:selectedTags',
  'input',
  'blur',
  'focus',
  'focus-next',
  'focus-prev',
  'suggested-tags',
  'show-suggested-tags',
])

const inputRef = ref<HTMLInputElement | null>(null)
const selectedTagsRef = ref<InstanceType<typeof TagList> | null>(null)
const suggestedTagsRef = ref<InstanceType<typeof TagList> | null>(null)

const modelValue = computed({
  get: () => props.value,
  set: v => emits('input', v),
})

const input = computed(() => props.value)

const isScrolling = ref(false)
const scrollRemovedAt = ref(0)
const ScrollingDebounceDelay = 1000
const deleteScroll = useDebounceFn(() => {
  isScrolling.value = false
  scrollRemovedAt.value = Date.now()
}, ScrollingDebounceDelay)

function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  if (target.scrollTop !== 0) {
    target.scrollTop = 0
    event.preventDefault()
    return
  }
  const safeExtraWidth = 150
  const listWidth = target.offsetWidth
  const noScrollBarsWidth = listWidth + safeExtraWidth
  if (target.scrollWidth < noScrollBarsWidth) return
  const difference = Date.now() - scrollRemovedAt.value
  if (difference < ScrollingDebounceDelay / 10) return
  isScrolling.value = true
  if (!target.style.getPropertyValue('--scroll-target-height')) {
    target.style.setProperty(
      '--scroll-target-height',
      `${target.offsetHeight}px`,
    )
  }
  deleteScroll()
}

const keyboardIsVirtual = ref(false)
const activeTags = ref<string[]>([])
const initTagIndex = ref<number | null>(null)
const focusedTagIndex = ref<number | null>(null)
const metaKey = ref(false)
const shiftKey = ref(false)
const tabbing = ref(false)
const debouncedHandleDeleteTag = ref<ReturnType<typeof useDebounceFn> | null>(
  null,
)
const DebounceDelay = 280
const VirtualKeyboardThreshold = 100

const resetedTagsViaDeleteButton = ref(false)
const showSuggestedTags = ref(false)

const hasSuggestedTags = computed(() => suggestedTags.value.length > 0)
const hasSelectedTags = computed(() => props.selectedTags.length > 0)
const inputIsNotEmpty = computed(
  () => input.value.length > 0 || hasSelectedTags.value,
)
const selectedTagsAriaLabel = computed(() => props.selectedTags.length)
const suggestedTagsAriaLabel = computed(() => suggestedTags.value.length)
const deleteButtonAriaLabel = computed(() => 'Reset filter')

const suggestedTags = computed(() => {
  const filtered = props.tags.filter(
    tag => !props.selectedTags.includes(tag),
  )
  return props.shouldTruncateTags ? filtered.slice(0, TagLimit) : filtered
})

const displaySuggestedTags = computed(
  () => showSuggestedTags.value && hasSuggestedTags.value,
)

const virtualKeyboardBind = computed(() => ({
  keyboardIsVirtual: keyboardIsVirtual.value,
}))

watch(
  () => props.selectedTags,
  async () => {
    if (!resetedTagsViaDeleteButton.value) {
      if (inputRef.value && inputRef.value === document.activeElement) {
        await focusInput()
      }
    }
    else {
      resetedTagsViaDeleteButton.value = false
    }
    if (
      displaySuggestedTags.value
      && hasSuggestedTags.value
      && suggestedTagsRef.value
    ) {
      suggestedTagsRef.value.resetScroll()
    }
  },
)

watch(
  () => suggestedTags.value,
  (v) => {
    emits('suggested-tags', v)
  },
  { immediate: true },
)

watch(showSuggestedTags, (v) => {
  emits('show-suggested-tags', v)
})

onMounted(() => {
  if (
    props.focusInputWhenCreated
    && inputRef.value
    && document.activeElement !== inputRef.value
    && (input.value || props.focusInputWhenEmpty)
  ) {
    focusInput()
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateKeyboardType)
  }
})

function updateKeyboardType(event: any) {
  updateKeyboardTypeDebounced(event)
}

const updateKeyboardTypeDebounced = useDebounceFn((event: any) => {
  const heightDifference = window.innerHeight - event.target.height
  if (heightDifference >= VirtualKeyboardThreshold) {
    keyboardIsVirtual.value = true
  }
}, DebounceDelay)

function focusInput() {
  return nextTick(() => {
    inputRef.value?.focus()
    if (!input.value && resetActiveTags) {
      resetActiveTags()
    }
  })
}

function resetFilters(hideTags = false) {
  setFilterInput('')
  setSelectedTags([])
  if (!hideTags) {
    emits('update:preventedBlur', true)
    resetActiveTags()
    focusInput()
    return
  }
  resetedTagsViaDeleteButton.value = true
  showSuggestedTags.value = false
  inputRef.value?.blur()
}

function handleFocus() {
  showSuggestedTags.value = true
  emits('focus')
}

function handleBlur(event: FocusEvent) {
  const target = event.relatedTarget as HTMLElement | null
  if (
    target
    && target.matches
    && target.matches('button, input, ul')
    && (event.currentTarget as HTMLElement).contains(target)
  ) {
    return
  }
  nextTick(() => {
    resetActiveTags()
    if (props.preventedBlur) {
      emits('update:preventedBlur', false)
      return
    }
    showSuggestedTags.value = false
    emits('blur')
  })
}

function setFilterInput(value: string) {
  emits('input', value)
}

function setSelectedTags(tags: string[]) {
  emits('update:selectedTags', tags)
}

function deleteTags(arr: string[]) {
  setSelectedTags(props.selectedTags.filter(tag => !arr.includes(tag)))
}

function selectTag(tag: string) {
  updateSelectedTags([tag])
  setFilterInput('')
}

function updateSelectedTags(tags: string[]) {
  setSelectedTags([...new Set([...props.selectedTags, ...tags])])
}

function unselectActiveTags() {
  if (activeTags.value.length) {
    deleteTags(activeTags.value)
    resetActiveTags()
  }
}

function assignEventValues(event: KeyboardEvent) {
  shiftKey.value = event.shiftKey
  metaKey.value = event.metaKey || event.ctrlKey
  tabbing.value = event.key === 'Tab'
}

function selectRangeActiveTags(
  startIndex = focusedTagIndex.value || 0,
  endIndex = props.selectedTags.length,
) {
  activeTags.value = props.selectedTags.slice(startIndex, endIndex)
}

function selectInputOnFocusHandler() {
  if (!input.value && resetActiveTags) {
    resetActiveTags()
  }
}

function inputIsSelected() {
  return input.value.length > 0 && getSelectionText() === input.value
}

function inputHasPartialTextSelected() {
  const sel = getSelectionText()
  return !inputIsSelected() && sel.length && input.value.includes(sel)
}

function resetActiveTags() {
  activeTags.value = []
  initTagIndex.value = null
  metaKey.value = false
  tabbing.value = false
  shiftKey.value = false
  focusedTagIndex.value = null
}

function leftKeyInputHandler(event: KeyboardEvent) {
  assignEventValues(event)
  if (hasSelectedTags.value) {
    if (activeTags.value.length && !shiftKey.value) {
      event.preventDefault()
      selectedTagsRef.value?.focusTag(activeTags.value[0])
      return
    }
    if (
      shiftKey.value
      && inputRef.value
      && inputRef.value.selectionStart === 0
    ) {
      if (inputRef.value.selectionDirection !== 'forward') {
        if (focusedTagIndex.value === null) {
          focusedTagIndex.value = props.selectedTags.length
        }
        if (focusedTagIndex.value > 0) {
          focusedTagIndex.value = focusedTagIndex.value - 1
        }
        initTagIndex.value = props.selectedTags.length
        selectTagsPressingShift()
        return
      }
    }
    if (
      inputRef.value
      && (inputRef.value.selectionEnd === 0 || inputIsSelected())
    ) {
      selectedTagsRef.value?.focusLast()
    }
  }
}

function rightKeyInputHandler(event: KeyboardEvent) {
  assignEventValues(event)
  if (activeTags.value.length) {
    if (
      shiftKey.value
      && focusedTagIndex.value !== null
      && focusedTagIndex.value < props.selectedTags.length
    ) {
      if (
        initTagIndex.value !== null
        && initTagIndex.value < props.selectedTags.length
      ) {
        selectRangeActiveTags(initTagIndex.value, focusedTagIndex.value + 1)
        return
      }
      event.preventDefault()
      focusedTagIndex.value += 1
      selectRangeActiveTags()
    }
  }
}

function multipleTagsSelectionHandler(e: {
  event?: KeyboardEvent
  tagName: string
}) {
  const event = e.event || new KeyboardEvent('keydown')
  if (event.key === 'Enter') return
  assignEventValues(event)
  if ((shiftKey.value || metaKey.value) && !tabbing.value) {
    initTag(e.tagName)
  }
  else if (event.key !== 'Backspace') {
    resetActiveTags()
  }
  selectToDirections(event.key)
}

function initTag(tagName: string) {
  if (initTagIndex.value === null && !activeTags.value.includes(tagName)) {
    if (tagName) {
      initTagIndex.value = props.selectedTags.indexOf(tagName)
      activeTags.value.push(tagName)
    }
    else {
      initTagIndex.value = props.selectedTags.length
    }
  }
}

function selectToDirections(key: string) {
  if (metaKey.value && shiftKey.value) {
    if (key === 'ArrowRight') {
      selectRangeActiveTags(initTagIndex.value || 0, props.selectedTags.length)
      if (input.value.length) {
        inputRef.value?.select()
      }
      else {
        selectedTagsRef.value?.focusTag(
          props.selectedTags[props.selectedTags.length - 1],
        )
      }
    }
    else if (key === 'ArrowLeft') {
      selectRangeActiveTags(0, (initTagIndex.value || 0) + 1)
      if (!input.value.length) {
        selectedTagsRef.value?.focusTag(props.selectedTags[0])
      }
    }
  }
}

function focusTagHandler(e: { event: FocusEvent, tagName: string }) {
  focusedTagIndex.value = props.selectedTags.indexOf(e.tagName)
  const target = e.event.relatedTarget as HTMLElement
  if (
    target
    && target.matches('input')
    && shiftKey.value
    && !metaKey.value
    && !tabbing.value
    && inputRef.value
    && inputRef.value.selectionEnd !== 0
  ) {
    selectInputTextToTags()
    selectRangeActiveTags()
    return
  }
  selectTagsPressingShift()
}

function focusInputFromTags() {
  focusInput().then(() => {
    if (inputRef.value) {
      moveCursorToStart(inputRef.value)
    }
  })
}

function selectInputTextToTags() {
  const el = inputRef.value
  if (!el) return
  if (el.selectionStart === el.selectionEnd) {
    el.setSelectionRange(0, el.selectionEnd)
  }
  else {
    el.setSelectionRange(el.selectionStart, el.selectionEnd)
  }
  el.focus()
}

function selectTagsPressingShift() {
  if (initTagIndex.value !== null) {
    if (shiftKey.value && !metaKey.value) {
      if (initTagIndex.value < (focusedTagIndex.value || 0)) {
        selectRangeActiveTags(
          initTagIndex.value,
          (focusedTagIndex.value || 0) + 1,
        )
      }
      else {
        selectRangeActiveTags(
          focusedTagIndex.value || 0,
          (initTagIndex.value || 0) + 1,
        )
      }
    }
  }
}

function metaKeyClickSelection(event: MouseEvent, tagName: string) {
  if (metaKey.value && event instanceof MouseEvent) {
    if (activeTags.value.includes(tagName)) {
      activeTags.value.splice(activeTags.value.indexOf(tagName), 1)
      if (activeTags.value.length) {
        selectedTagsRef.value?.focusTag(activeTags.value[0])
      }
      else {
        focusInput()
      }
    }
    else {
      activeTags.value.push(tagName)
    }
  }
}

function multipleSelectionHandlerForSelectedTags(e: {
  event?: KeyboardEvent | MouseEvent
  tagName: string
}) {
  if (keyboardIsVirtual.value) {
    if (!debouncedHandleDeleteTag.value) {
      debouncedHandleDeleteTag.value = useDebounceFn(
        handleDeleteTag,
        DebounceDelay,
      )
    }
    debouncedHandleDeleteTag.value({ tagName: e.tagName, event: e.event })
  }
  else {
    if (e.event instanceof KeyboardEvent) assignEventValues(e.event)
    metaKeyClickSelection(e.event as MouseEvent, e.tagName)
    multipleTagsSelectionHandler({
      event: e.event as KeyboardEvent,
      tagName: e.tagName,
    })
  }
}

async function handleDeleteTag({
  tagName,
  event,
}: {
  tagName: string
  event?: KeyboardEvent
}) {
  if (!activeTags.value.length) {
    deleteTags([tagName])
  }
  unselectActiveTags()
  await nextTick()
  if (inputRef.value) {
    moveCursorToEnd(inputRef.value)
  }
  if (props.selectedTags.length && inputRef.value) {
    await focusInput()
    if (event && event.key === 'Backspace') {
      moveCursorToStart(inputRef.value)
    }
  }
}

function deleteHandler(e: KeyboardEvent) {
  if (activeTags.value.length > 0) {
    setSelectedTags(
      props.selectedTags.filter(tag => !activeTags.value.includes(tag)),
    )
  }
  if (
    inputIsSelected()
    && props.selectedTags.every(t => activeTags.value.includes(t))
  ) {
    e.preventDefault()
    resetFilters()
  }
  else if (
    inputRef.value
    && inputRef.value.selectionEnd === 0
    && hasSelectedTags.value
  ) {
    e.preventDefault()
    if (keyboardIsVirtual.value) {
      setSelectedTags(props.selectedTags.slice(0, -1))
    }
    else {
      selectedTagsRef.value?.focusLast()
    }
  }
  unselectActiveTags()
}

function handleCopy(e: ClipboardEvent) {
  e.preventDefault()
  const copyBuffer: string[] = []
  const copyJSONBuffer = {
    tags: [] as string[],
    input: getSelectionText(),
  }
  if (activeTags.value.length) {
    copyJSONBuffer.tags = activeTags.value
    copyBuffer.push(activeTags.value.join(' '))
  }
  copyBuffer.push(copyJSONBuffer.input)
  if (!copyJSONBuffer.tags.length && !copyJSONBuffer.input.length) {
    return copyJSONBuffer
  }
  e.clipboardData?.setData(
    'text/html',
    prepareDataForHTMLClipboard(copyJSONBuffer),
  )
  e.clipboardData?.setData('text/plain', copyBuffer.join(' '))
  return copyJSONBuffer
}

function handleCut(e: ClipboardEvent) {
  e.preventDefault()
  const { input: copiedInput, tags } = handleCopy(e)
  if (!copiedInput && !tags.length) return
  const remainingTags = props.selectedTags.filter(tag => !tags.includes(tag))
  const remainingInput = input.value.replace(copiedInput, '')
  setSelectedTags(remainingTags)
  setFilterInput(remainingInput)
}

function handlePaste(e: ClipboardEvent) {
  e.preventDefault()
  const types = e.clipboardData?.types || []
  let parsedTags: string[] = []
  let newInput = e.clipboardData?.getData('text/plain') || ''
  if (types.includes('text/html')) {
    const pasteBuffer = e.clipboardData?.getData('text/html') || ''
    const data = parseDataFromClipboard(pasteBuffer)
    if (data) {
      parsedTags = data.tags || []
      newInput = data.input || ''
    }
  }
  const selection = getSelectionText()
  if (selection.length) {
    newInput = input.value.replace(selection, newInput)
  }
  else if (document.activeElement instanceof HTMLInputElement) {
    newInput = insertAt(
      input.value,
      newInput,
      document.activeElement.selectionStart || 0,
    )
  }
  setFilterInput(newInput.trim())
  if (parsedTags.length) {
    if (props.selectedTags.every(t => activeTags.value.includes(t))) {
      setSelectedTags(parsedTags)
    }
    else {
      updateSelectedTags(parsedTags)
    }
  }
  resetActiveTags()
}

function downHandler(e: KeyboardEvent) {
  const cb = () => emits('focus-next', e)
  if (props.positionReversed) cb()
  else focusFirstTag(cb)
}

function upHandler(e: KeyboardEvent) {
  const cb = () => emits('focus-prev', e)
  if (props.positionReversed) focusFirstTag(cb)
  else cb()
}

function handleFocusPrevOnSelectedTags() {
  if (props.positionReversed) {
    focusFirstTag(() => emits('focus-prev'))
  }
  else {
    emits('focus-prev')
  }
}

function inputKeydownHandler(e: KeyboardEvent) {
  if (inputIsSelected()) {
    if (
      isSingleCharacter(e.key)
      && props.selectedTags.every(t => activeTags.value.includes(t))
    ) {
      resetFilters()
    }
  }
  multipleTagsSelectionHandler({ event: e, tagName: '' })
}

function selectedTagsKeydownHandler(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
  multipleTagsSelectionHandler({ event: e, tagName: '' })
}

function enterHandler() {
  inputRef.value?.blur()
}

function selectInputAndTags() {
  activeTags.value = [...props.selectedTags]
  if (input.value.length) {
    inputRef.value?.select()
    initTagIndex.value = activeTags.value.length
    focusedTagIndex.value = 0
  }
  else if (activeTags.value.length) {
    initTagIndex.value = activeTags.value.length - 1
    selectedTagsRef.value?.focusTag(activeTags.value[0])
  }
}

function focusFirstTag(cb: () => void) {
  if (!showSuggestedTags.value) {
    showSuggestedTags.value = true
  }
  if (hasSuggestedTags.value && suggestedTagsRef.value) {
    suggestedTagsRef.value.focusFirst()
  }
  else {
    cb()
  }
}

const inputMultipleSelectionListeners = {
  click: resetActiveTags,
  copy: handleCopy,
  cut: handleCut,
  paste: handlePaste,
}

const selectedTagsMultipleSelectionListeners = {
  'click-tags': multipleSelectionHandlerForSelectedTags,
  'select-all': selectInputAndTags,
  'delete-tag': handleDeleteTag,
  'keydown': selectedTagsKeydownHandler,
  'focus': focusTagHandler,
  'paste-tags': handlePaste,
}
</script>

<style scoped lang="scss">
// @import "docc-render/styles/_core.scss";

$tag-outline-padding: 4px !default;
$input-vertical-padding: rem(13px) !default;
$input-horizontal-spacing: rem(10px) !default;
$input-height: rem(28px);

.filter {
  --input-vertical-padding: #{$input-vertical-padding};
  --input-horizontal-spacing: #{$input-horizontal-spacing};
  --input-height: #{$input-height};
  --input-border-color: var(--color-fill-gray-secondary);
  --input-text: var(--color-fill-gray-secondary);

  position: relative;
  box-sizing: border-box;
  // Remove Gray Highlight When Tapping Links in Mobile Safari =>
  // https://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: calc(#{$small-border-radius} + 1px);
  @include on-keyboard-focus() {
    outline: none;
  }

  &__top-wrapper {
    display: flex;
  }

  &__filter-button {
    position: relative;
    z-index: 1;
    cursor: text;
    margin-left: var(--input-horizontal-spacing);
    margin-right: rem(3px);

    @include breakpoint(small) {
      margin-right: rem(7px);
    }

    .svg-icon {
      fill: var(--input-text);
      display: block;
      height: 21px;
    }

    &.blue :deep(> *) {
      fill: var(--color-figure-blue);
      color: var(--color-figure-blue);
    }
  }

  &.focus {
    .filter__wrapper {
      box-shadow: 0 0 0 3pt var(--color-focus-color);
      --input-border-color: var(--color-fill-blue);
    }
  }

  &__wrapper {
    border: 1px solid var(--input-border-color);
    background: var(--color-fill);
    border-radius: $small-border-radius;

    &--reversed {
      display: flex;
      flex-direction: column-reverse;
    }

    &--no-border-style {
      border: none;
    }
  }

  &__suggested-tags {
    border-top: 1px solid var(--color-fill-gray-tertiary);
    z-index: 1;
    overflow: hidden;

    :deep(ul) {
      padding: var(--input-vertical-padding) rem(9px);
      border: 1px solid transparent;
      border-bottom-left-radius: calc(#{$small-border-radius} - 1px);
      border-bottom-right-radius: calc(#{$small-border-radius} - 1px);

      @include on-keyboard-focus() {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-focus-color);
      }
    }

    .filter__wrapper--reversed & {
      border-bottom: 1px solid var(--color-fill-gray-tertiary);
      border-top: none;
    }
  }

  &__selected-tags {
    z-index: 1;
    padding-left: $tag-outline-padding;
    margin: -$tag-outline-padding 0;

    @include breakpoint(small) {
      padding-left: 0;
    }

    :deep() {
      ul {
        padding: $tag-outline-padding;

        @include breakpoint(small) {
          padding-right: rem(7px);
        }

        .tag:last-child {
          padding-right: 0;
        }
      }
    }
  }

  &__delete-button {
    @include replace-outline-for-shadow-on-focus;
    position: relative;
    margin: 0;
    z-index: 1;
    border-radius: 100%;

    .clear-rounded-icon {
      height: rem(12px);
      width: rem(12px);
      fill: var(--input-text);
      display: block;
    }
  }

  &__delete-button-wrapper {
    display: flex;
    align-items: center;
    padding-right: var(--input-horizontal-spacing);
    padding-left: rem(3px);
    border-top-right-radius: $small-border-radius;
    border-bottom-right-radius: $small-border-radius;
  }

  &__input-label {
    position: relative;
    flex-grow: 1;
    height: var(--input-height);
    padding: var(--input-vertical-padding) 0;

    &::after {
      content: attr(data-value);
      visibility: hidden;
      width: auto;
      white-space: nowrap;
      min-width: 130px; // set a min width, so user can select the area
      display: block;
      text-indent: rem(7px);

      @include breakpoint(small) {
        text-indent: rem(3px);
      }
    }
  }

  &__input-box-wrapper {
    @include custom-horizontal-scrollbar;
    display: flex;
    overflow-x: auto;
    align-items: center;
    cursor: text;
    flex: 1;
  }

  &__input {
    @include font-styles(body-large);
    color: var(--color-text);
    height: var(--input-height);
    border: none;
    width: 100%;
    position: absolute;
    background: transparent;
    z-index: 1;
    // Text indent is needed instead of padding so text inside <input> doesn't get cut off
    text-indent: rem(7px);

    @include breakpoint(small) {
      text-indent: rem(3px);
    }

    &:focus {
      outline: none;
    }

    &[placeholder] {
      @include placeholder(var(--input-text));
    }
  }
}
</style>
