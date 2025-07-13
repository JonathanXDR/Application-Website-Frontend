<script setup lang="ts">
import type FilterTagList from '~/assets/drafts/components/Filter/TagList.vue'
import {
  parseDataFromClipboard,
  prepareDataForHTMLClipboard,
} from '~/assets/drafts/utils/clipboard'
import {
  isSingleCharacter,
  moveCursorToEnd,
  moveCursorToStart,
} from '~/assets/drafts/utils/input-helper'
import { insertAt } from '~/assets/drafts/utils/strings'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
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
  },
)

const emits = defineEmits([
  'update:preventedBlur',
  'update:selectedTags',
  'update:value',
  'input',
  'blur',
  'focus',
  'focus-next',
  'focus-prev',
  'suggested-tags',
  'show-suggested-tags',
])

const FilterInputId = 'filter-input'
const SelectedTagsId = 'selected-tags'
const SuggestedTagsId = 'suggested-tags'
const AXinputProperties: Record<string, string | boolean> = {
  'autocorrect': 'off',
  'autocapitalize': 'off',
  'spellcheck': false,
  'role': 'combobox',
  'aria-haspopup': 'true',
  'aria-autocomplete': 'none',
  'aria-owns': 'suggestedTags',
  'aria-controls': 'suggestedTags',
}

const inputRef = ref<HTMLInputElement | null>(null)
const scrollWrapperRef = ref<HTMLElement | null>(null)
const selectedTagsRef = ref<InstanceType<typeof FilterTagList> | null>(null)
const suggestedTagsRef = ref<InstanceType<typeof FilterTagList> | null>(null)

const modelValue = useVModel(props, 'value', emits)
const modelSelectedTags = useVModel(props, 'selectedTags', emits)

interface ClipboardPayload {
  tags?: string[]
  input?: string
}

const searchAriaLabelledBy = computed(() => {
  return modelSelectedTags.value.length
    ? `${FilterInputId} ${SelectedTagsId}`
    : FilterInputId
})

const { focused: inputFocus } = useFocus(inputRef, { initialValue: false })
const setFocusInput = () => {
  inputFocus.value = !inputFocus.value
}

const pressedKeys = useMagicKeys()
const isShiftPressed = computed(() => pressedKeys.shift?.value ?? false)
const isMetaPressed = computed(
  () =>
    (pressedKeys.meta?.value ?? false) || (pressedKeys.ctrl?.value ?? false),
)
const isTabPressed = computed(() => pressedKeys.Tab?.value ?? false)
const { text: selectedText } = useTextSelection()

const keyboardIsVirtual = ref(false)
const activeTags = ref<string[]>([])
const initTagIndex = ref<number | null>(null)
const focusedTagIndex = ref<number | null>(null)
const resetedTagsViaDeleteButton = ref(false)
const showSuggestedTags = ref(false)
const isScrolling = ref(false)
const scrollRemovedAt = ref(0)
const ScrollingDebounceDelay = 1000
const deleteScroll = useDebounceFn(() => {
  isScrolling.value = false
  scrollRemovedAt.value = Date.now()
}, ScrollingDebounceDelay)

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.scrollTop !== 0) {
    target.scrollTop = 0
    e.preventDefault()
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

useEventListener(scrollWrapperRef, 'scroll', onScroll)

const DebounceDelay = 280
const VirtualKeyboardThreshold = 100
const updateKeyboardTypeDebounced = useDebounceFn((event) => {
  const heightDifference = window.innerHeight - event.target.height
  if (heightDifference >= VirtualKeyboardThreshold) {
    keyboardIsVirtual.value = true
  }
}, DebounceDelay)

const updateKeyboardType = (event: VisualViewport) => {
  updateKeyboardTypeDebounced(event)
}

onMounted(() => {
  if (
    props.focusInputWhenCreated
    && inputRef.value
    && document.activeElement !== inputRef.value
  ) {
    if (modelValue.value || props.focusInputWhenEmpty) {
      setFocusInput()
    }
  }
  if (window.visualViewport) {
    useEventListener(window.visualViewport, 'resize', updateKeyboardType)
  }
})

const hasSelectedTags = computed(() => modelSelectedTags.value.length > 0)
const hasSuggestedTags = computed(() => computedSuggestedTags.value.length > 0)
const inputIsNotEmpty = computed(
  () => modelValue.value.length > 0 || hasSelectedTags.value,
)
const selectedTagsAriaLabel = computed(() => modelSelectedTags.value.length)
const suggestedTagsAriaLabel = computed(
  () => computedSuggestedTags.value.length,
)
const deleteButtonAriaLabel = computed(() => 'Reset filter')

const TagLimit = 5
const computedSuggestedTags = computed(() => {
  const filtered = props.tags.filter(
    tag => !modelSelectedTags.value.includes(tag),
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
  () => modelSelectedTags.value,
  async () => {
    if (!resetedTagsViaDeleteButton.value) {
      if (inputRef.value && inputRef.value === document.activeElement) {
        await nextTick()
        setFocusInput()
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
  () => computedSuggestedTags.value,
  (v) => {
    emits('suggested-tags', v)
  },
  { immediate: true },
)

watch(showSuggestedTags, (v) => {
  emits('show-suggested-tags', v)
})

const inputIsSelected = () => {
  return modelValue.value.length > 0 && selectedText.value === modelValue.value
}

// const inputHasPartialTextSelected = () => {
//   return (
//     !inputIsSelected()
//     && selectedText.value.length > 0
//     && modelValue.value.includes(selectedText.value)
//   )
// }

const handleFocus = () => {
  showSuggestedTags.value = true
  emits('focus')
}

const handleBlur = (event: FocusEvent) => {
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

const resetFilters = (hideTags = false) => {
  modelValue.value = ''
  modelSelectedTags.value = []
  if (!hideTags) {
    emits('update:preventedBlur', true)
    resetActiveTags()
    setFocusInput()
    return
  }
  resetedTagsViaDeleteButton.value = true
  showSuggestedTags.value = false
  inputRef.value?.blur()
}

const selectTag = (tag: string) => {
  updateSelectedTags([tag])
  modelValue.value = ''
}

const updateSelectedTags = (tags: string[]) => {
  const union = [...new Set([...modelSelectedTags.value, ...tags])]
  modelSelectedTags.value = union
}

const deleteTags = (arr: string[]) => {
  modelSelectedTags.value = modelSelectedTags.value.filter(
    tag => !arr.includes(tag),
  )
}

const unselectActiveTags = () => {
  if (activeTags.value.length) {
    deleteTags(activeTags.value)
    resetActiveTags()
  }
}

const resetActiveTags = () => {
  activeTags.value = []
  initTagIndex.value = null
  focusedTagIndex.value = null
}

const leftKeyInputHandler = (event: KeyboardEvent) => {
  if (!hasSelectedTags.value) return
  if (activeTags.value.length && !isShiftPressed.value) {
    event.preventDefault()
    selectedTagsRef.value?.focusTag(activeTags.value[0] || '')
    return
  }
  if (
    isShiftPressed.value
    && inputRef.value
    && inputRef.value.selectionStart === 0
  ) {
    if (inputRef.value.selectionDirection !== 'forward') {
      if (focusedTagIndex.value === null) {
        focusedTagIndex.value = modelSelectedTags.value.length
      }
      if (focusedTagIndex.value > 0) {
        focusedTagIndex.value--
      }
      initTagIndex.value = modelSelectedTags.value.length
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

const rightKeyInputHandler = (event: KeyboardEvent) => {
  if (!activeTags.value.length) return
  if (
    isShiftPressed.value
    && focusedTagIndex.value !== null
    && focusedTagIndex.value < modelSelectedTags.value.length
  ) {
    if (
      initTagIndex.value !== null
      && initTagIndex.value < modelSelectedTags.value.length
    ) {
      selectRangeActiveTags(initTagIndex.value, focusedTagIndex.value + 1)
      return
    }
    event.preventDefault()
    focusedTagIndex.value++
    selectRangeActiveTags()
  }
}

const selectRangeActiveTags = (
  startIndex = focusedTagIndex.value || 0,
  endIndex = modelSelectedTags.value.length,
) => {
  activeTags.value = modelSelectedTags.value.slice(startIndex, endIndex)
}

const selectTagsPressingShift = () => {
  if (
    initTagIndex.value !== null
    && isShiftPressed.value
    && !isMetaPressed.value
  ) {
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

const multipleTagsSelectionHandler = (e: {
  event?: KeyboardEvent | MouseEvent
  tagName: string
}) => {
  const evt = e.event || new KeyboardEvent('keydown')
  if (evt instanceof KeyboardEvent && evt.key === 'Enter') return
  if ((isShiftPressed.value || isMetaPressed.value) && !isTabPressed.value) {
    initTag(e.tagName)
  }
  else if (evt instanceof KeyboardEvent && evt.key !== 'Backspace') {
    resetActiveTags()
  }
  if (evt instanceof KeyboardEvent) {
    selectToDirections(evt.key)
  }
}

const initTag = (tagName: string) => {
  if (initTagIndex.value === null && !activeTags.value.includes(tagName)) {
    if (tagName) {
      initTagIndex.value = modelSelectedTags.value.indexOf(tagName)
      activeTags.value.push(tagName)
    }
    else {
      initTagIndex.value = modelSelectedTags.value.length
    }
  }
}

const selectToDirections = (key: string) => {
  if (isMetaPressed.value && isShiftPressed.value) {
    if (key === 'ArrowRight') {
      selectRangeActiveTags(
        initTagIndex.value || 0,
        modelSelectedTags.value.length,
      )
      if (modelValue.value.length) {
        inputRef.value?.select()
      }
      else {
        selectedTagsRef.value?.focusTag(
          modelSelectedTags.value[modelSelectedTags.value.length - 1] || '',
        )
      }
    }
    else if (key === 'ArrowLeft') {
      selectRangeActiveTags(0, (initTagIndex.value || 0) + 1)
      if (!modelValue.value.length) {
        selectedTagsRef.value?.focusTag(modelSelectedTags.value[0] || '')
      }
    }
  }
}

const focusTagHandler = (e: { event: FocusEvent, tagName: string }) => {
  focusedTagIndex.value = modelSelectedTags.value.indexOf(e.tagName)
  const target = e.event.relatedTarget as HTMLElement
  if (
    target
    && target.matches('input')
    && isShiftPressed.value
    && !isMetaPressed.value
    && !isTabPressed.value
    && inputRef.value
    && inputRef.value.selectionEnd !== 0
  ) {
    selectInputTextToTags()
    selectRangeActiveTags()
    return
  }
  selectTagsPressingShift()
}

const focusInputFromTags = () => {
  setFocusInput()
  nextTick(() => {
    if (inputRef.value) {
      moveCursorToStart(inputRef.value)
    }
  })
}

const selectInputAndTags = () => {
  activeTags.value = [...modelSelectedTags.value]
  if (modelValue.value.length) {
    inputRef.value?.select()
    initTagIndex.value = activeTags.value.length
    focusedTagIndex.value = 0
  }
  else if (activeTags.value.length) {
    initTagIndex.value = activeTags.value.length - 1
    selectedTagsRef.value?.focusTag(activeTags.value[0] || '')
  }
}

const selectInputTextToTags = () => {
  if (!inputRef.value) return
  if (inputRef.value.selectionStart === inputRef.value.selectionEnd) {
    inputRef.value.setSelectionRange(0, inputRef.value.selectionEnd)
  }
  else {
    inputRef.value.setSelectionRange(
      inputRef.value.selectionStart,
      inputRef.value.selectionEnd,
    )
  }
  inputRef.value.focus()
}

const handleFocusPrevOnSelectedTags = () => {
  if (props.positionReversed) {
    focusFirstTag(() => emits('focus-prev'))
  }
  else {
    emits('focus-prev')
  }
}

const focusFirstTag = (cb: () => void) => {
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

const debouncedHandleDeleteTag = ref<
  | ((arg: { tagName: string, event?: KeyboardEvent | MouseEvent }) => void)
    | null
    >(null)

const multipleSelectionHandlerForSelectedTags = (e: {
  event?: KeyboardEvent | MouseEvent
  tagName: string
}) => {
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
    if (e.event instanceof KeyboardEvent) {
      // rely on useMagicKeys for shift/meta
    }
    metaKeyClickSelection(e.event as MouseEvent, e.tagName)
    multipleTagsSelectionHandler({ event: e.event, tagName: e.tagName })
  }
}

const metaKeyClickSelection = (event: MouseEvent, tagName: string) => {
  if (isMetaPressed.value && event instanceof MouseEvent) {
    if (activeTags.value.includes(tagName)) {
      activeTags.value.splice(activeTags.value.indexOf(tagName), 1)
      if (activeTags.value.length) {
        selectedTagsRef.value?.focusTag(activeTags.value[0] || '')
      }
      else {
        setFocusInput()
      }
    }
    else {
      activeTags.value.push(tagName)
    }
  }
}

const deleteHandler = (e: KeyboardEvent) => {
  if (activeTags.value.length > 0) {
    modelSelectedTags.value = modelSelectedTags.value.filter(
      tag => !activeTags.value.includes(tag),
    )
  }
  if (
    inputIsSelected()
    && modelSelectedTags.value.every(t => activeTags.value.includes(t))
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
      modelSelectedTags.value = modelSelectedTags.value.slice(0, -1)
    }
    else {
      selectedTagsRef.value?.focusLast()
    }
  }
  unselectActiveTags()
}

const handleCopy = (e: ClipboardEvent) => {
  e.preventDefault()
  const copyBuffer: string[] = []
  const copyJSONBuffer = {
    tags: [] as string[],
    input: selectedText.value,
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

const handleCut = (e: ClipboardEvent) => {
  e.preventDefault()
  const result = handleCopy(e)
  if (!result) return
  const { input: copiedInput, tags } = result
  if (!copiedInput && !tags.length) return
  modelSelectedTags.value = modelSelectedTags.value.filter(
    tag => !tags.includes(tag),
  )
  modelValue.value = modelValue.value.replace(copiedInput, '')
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const types = e.clipboardData?.types || []
  let parsedTags: string[] = []
  let newInput = e.clipboardData?.getData('text/plain') || ''
  if (types.includes('text/html')) {
    const pasteBuffer = e.clipboardData?.getData('text/html') || ''
    const data = parseDataFromClipboard(pasteBuffer) as ClipboardPayload | null
    if (data) {
      parsedTags = data.tags || []
      newInput = data.input || ''
    }
  }
  if (selectedText.value.length) {
    newInput = modelValue.value.replace(selectedText.value, newInput)
  }
  else if (document.activeElement instanceof HTMLInputElement) {
    newInput = insertAt(
      modelValue.value,
      newInput,
      document.activeElement.selectionStart || 0,
    )
  }
  modelValue.value = newInput.trim()
  if (parsedTags.length) {
    if (modelSelectedTags.value.every(t => activeTags.value.includes(t))) {
      modelSelectedTags.value = parsedTags
    }
    else {
      updateSelectedTags(parsedTags)
    }
  }
  resetActiveTags()
}

const inputKeydownHandler = (e: KeyboardEvent) => {
  if (inputIsSelected()) {
    if (
      isSingleCharacter(e.key)
      && modelSelectedTags.value.every(t => activeTags.value.includes(t))
    ) {
      resetFilters()
    }
  }
  multipleTagsSelectionHandler({ event: e, tagName: '' })
}

const selectedTagsKeydownHandler = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
  multipleTagsSelectionHandler({ event: e, tagName: '' })
}

const enterHandler = () => {
  inputRef.value?.blur()
}

const downHandler = (e: KeyboardEvent) => {
  const cb = () => emits('focus-next', e)
  if (props.positionReversed) cb()
  else focusFirstTag(cb)
}

const upHandler = (e: KeyboardEvent) => {
  const cb = () => emits('focus-prev', e)
  if (props.positionReversed) focusFirstTag(cb)
  else cb()
}
const handleDeleteTag = async ({
  tagName,
  event,
}: {
  tagName: string
  event?: KeyboardEvent | MouseEvent
}) => {
  if (!activeTags.value.length) {
    deleteTags([tagName])
  }
  unselectActiveTags()
  await nextTick()
  if (inputRef.value) {
    moveCursorToEnd(inputRef.value)
  }
  if (
    modelSelectedTags.value.length
    && inputRef.value
    && event instanceof KeyboardEvent
    && event.key === 'Backspace'
  ) {
    await nextTick()
    moveCursorToStart(inputRef.value)
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

<template>
  <div
    class="filter filter-component"
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
          @click="setFocusInput"
          @mousedown.prevent
        >
          <slot name="icon">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="svg-icon filter-icon"
              height="21"
              width="21"
              viewBox="0 0 21 21"
              fill="currentColor"
            >
              <path
                d="M2.8,6.8h15.5c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5H2.8C2.5,5.8,2.2,6,2.2,6.3C2.2,6.6,2.5,6.8,2.8,6.8z M4.6,11h11.8c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5H4.6c-0.3,0-0.5,0.2-0.5,0.5C4.1,10.8,4.4,11,4.6,11z M6.5,15.2h8.2c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5H6.5c-0.3,0-0.5,0.2-0.5,0.5C6,14.9,6.2,15.2,6.5,15.2z"
              />
            </svg>
          </slot>
        </button>
        <div
          ref="scrollWrapperRef"
          :class="['filter__input-box-wrapper', { scrolling: isScrolling }]"
        >
          <FilterTagList
            v-if="hasSelectedTags"
            :id="SelectedTagsId"
            v-bind="virtualKeyboardBind"
            ref="selectedTagsRef"
            :input="modelValue"
            :tags="modelSelectedTags"
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
            :for="FilterInputId"
            :data-value="modelValue"
            :aria-label="placeholder"
            class="filter__input-label"
          >
            <input
              :id="FilterInputId"
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
            >
          </label>
        </div>
        <div class="filter__delete-button-wrapper">
          <button
            v-if="modelValue.length || displaySuggestedTags || hasSelectedTags"
            :aria-label="deleteButtonAriaLabel"
            class="filter__delete-button"
            @click="resetFilters(true)"
            @keydown.enter.exact.stop="resetFilters(true)"
            @mousedown.prevent
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="svg-icon clear-rounded-icon"
              viewBox="0 0 16 16"
            >
              <title>Clear</title>
              <path
                d="M10.5,11.3a.7.7,0,0,1-.6-.2L8,9.2,6.1,11.1a.7.7,0,0,1-.6.2.8.8,0,0,1-.9-.8.9.9,0,0,
    1,.3-.6L6.8,8,4.9,6.1a.9.9,0,0,1-.3-.6.8.8,0,0,1,.9-.8l.6.2L8,6.8,9.9,4.9a.7.7,0,0,1,
    .6-.2.8.8,0,0,1,.9.8.9.9,0,0,1-.3.6L9.2,8l1.9,1.9a.9.9,0,0,1,.3.6A.8.8,0,0,1,10.5,11.3ZM8,
    16A8,8,0,1,0,0,8,8,8,0,0,0,8,16Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <FilterTagList
        v-if="displaySuggestedTags"
        :id="SuggestedTagsId"
        ref="suggestedTagsRef"
        :aria-label="`${suggestedTagsAriaLabel}`"
        :input="modelValue"
        :tags="computedSuggestedTags"
        :active-tags="activeTags"
        :translatable-tags="translatableTags"
        v-bind="virtualKeyboardBind"
        class="filter__suggested-tags"
        @click-tags="
          (event: MouseEvent) =>
            selectTag((event.target as HTMLElement).dataset.tagName || '')
        "
        @prevent-blur="$emit('update:preventedBlur', true)"
        @focus-next="positionReversed ? setFocusInput() : $emit('focus-next')"
        @focus-prev="positionReversed ? $emit('focus-prev') : setFocusInput()"
      />
    </div>
  </div>
</template>

<style scoped>
.svg-icon {
  fill: var(--colors-svg-icon-fill-light, var(--color-svg-icon));
  transform: scale(1);
  -webkit-transform: scale(1);
  overflow: visible;
}
.filter {
  --input-vertical-padding: 13px;
  --input-horizontal-spacing: 10px;
  --input-height: 28px;
  --input-border-color: var(--color-fill-gray-secondary);
  --input-text: var(--color-fill-gray-secondary);
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 13px;
}
.filter__top-wrapper {
  display: flex;
}
.filter__filter-button {
  position: relative;
  z-index: 1;
  cursor: text;
  margin-left: var(--input-horizontal-spacing);
  margin-right: 3px;
}
@media only screen and (max-width: 735px) {
  .filter__filter-button {
    margin-right: 7px;
  }
}
.filter__filter-button .svg-icon {
  fill: var(--input-text);
  display: block;
  height: 21px;
}
.filter__filter-button.blue > * {
  fill: var(--color-figure-blue);
  color: var(--color-figure-blue);
}
.filter.focus .filter__wrapper {
  box-shadow: 0 0 0 3pt var(--color-focus-color);
  --input-border-color: var(--color-fill-blue);
}
.filter__wrapper {
  border: 1px solid var(--input-border-color);
  background: var(--color-fill);
  border-radius: 12px;
}
.filter__wrapper--reversed {
  display: flex;
  flex-direction: column-reverse;
}
.filter__delete-button {
  position: relative;
  margin: 0;
  z-index: 1;
  border-radius: 100%;
}
.filter__delete-button .clear-rounded-icon {
  height: 12px;
  width: 12px;
  fill: var(--input-text);
  display: block;
}
.filter__delete-button-wrapper {
  display: flex;
  align-items: center;
  padding-right: var(--input-horizontal-spacing);
  padding-left: 3px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.filter__input-label {
  position: relative;
  flex-grow: 1;
  height: var(--input-height);
  padding: var(--input-vertical-padding) 0;
}
.filter__input-label:after {
  content: attr(data-value);
  visibility: hidden;
  width: auto;
  white-space: nowrap;
  min-width: 130px;
  display: block;
  text-indent: 7px;
}
@media only screen and (max-width: 735px) {
  .filter__input-label:after {
    text-indent: 3px;
  }
}
.filter__input-box-wrapper {
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-color: var(--color-figure-gray-tertiary) transparent;
  scrollbar-width: thin;
  display: flex;
  overflow-x: auto;
  align-items: center;
  cursor: text;
  flex: 1;
}
.filter__input-box-wrapper::-webkit-scrollbar {
  height: 0;
}
.filter__input {
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 400;
  letter-spacing: 0.011em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--color-text);
  height: var(--input-height);
  border: none;
  width: 100%;
  position: absolute;
  background: transparent;
  z-index: 1;
  text-indent: 7px;
}
@media only screen and (max-width: 735px) {
  .filter__input {
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 400;
    letter-spacing: 0.012em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media only screen and (max-width: 735px) {
  .filter__input {
    text-indent: 3px;
  }
}
.filter__input:focus {
  outline: none;
}
.filter__input[placeholder]::placeholder {
  color: var(--input-text);
  opacity: 1;
}
.filter-component {
  --input-vertical-padding: 8px;
  --input-height: 22px;
  --input-border-color: var(--color-fill-gray-tertiary);
  --input-text: var(--color-figure-gray-secondary);
}
.filter-component .filter__input {
  font-size: 17px;
  line-height: 1.4705882353;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
.filter-component .filter__input-label:after {
  min-width: 70px;
}
</style>
