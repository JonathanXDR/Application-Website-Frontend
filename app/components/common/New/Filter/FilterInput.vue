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
          @click="setFocusInput"
          @mousedown.prevent
        >
          <slot name="icon">
            <FilterIcon />
          </slot>
        </button>
        <div
          ref="scrollWrapperRef"
          :class="['filter__input-box-wrapper', { scrolling: isScrolling }]"
        >
          <TagList
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
            <ClearRoundedIcon class="clear-rounded-icon" />
          </button>
        </div>
      </div>
      <TagList
        v-if="displaySuggestedTags"
        :id="SuggestedTagsId"
        ref="suggestedTagsRef"
        :aria-label="`${suggestedTagsAriaLabel}`"
        :input="modelValue"
        :tags="computedSuggestedTags"
        :translatable-tags="translatableTags"
        v-bind="virtualKeyboardBind"
        class="filter__suggested-tags"
        @click-tags="selectTag($event.tagName)"
        @prevent-blur="$emit('update:preventedBlur', true)"
        @focus-next="positionReversed ? setFocusInput() : $emit('focus-next')"
        @focus-prev="positionReversed ? $emit('focus-prev') : setFocusInput()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ClearRoundedIcon from '~/components/common/New/Icons/ClearRoundedIcon.vue'
import FilterIcon from '~/components/common/New/Icons/FilterIcon.vue'
import TagList from '~/components/common/New/Filter/TagList.vue'
import {
  parseDataFromClipboard,
  prepareDataForHTMLClipboard,
} from '~/utils/clipboard'
import {
  isSingleCharacter,
  moveCursorToEnd,
  moveCursorToStart,
} from '~/utils/input-helper'
import { insertAt } from '~/utils/strings'

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
const selectedTagsRef = ref<InstanceType<typeof TagList> | null>(null)
const suggestedTagsRef = ref<InstanceType<typeof TagList> | null>(null)

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
function setFocusInput() {
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

function onScroll(e: Event) {
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

function updateKeyboardType(event: VisualViewport) {
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

function inputIsSelected() {
  return modelValue.value.length > 0 && selectedText.value === modelValue.value
}

// function inputHasPartialTextSelected() {
//   return (
//     !inputIsSelected()
//     && selectedText.value.length > 0
//     && modelValue.value.includes(selectedText.value)
//   )
// }

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

function resetFilters(hideTags = false) {
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

function selectTag(tag: string) {
  updateSelectedTags([tag])
  modelValue.value = ''
}

function updateSelectedTags(tags: string[]) {
  const union = [...new Set([...modelSelectedTags.value, ...tags])]
  modelSelectedTags.value = union
}

function deleteTags(arr: string[]) {
  modelSelectedTags.value = modelSelectedTags.value.filter(
    tag => !arr.includes(tag),
  )
}

function unselectActiveTags() {
  if (activeTags.value.length) {
    deleteTags(activeTags.value)
    resetActiveTags()
  }
}

function resetActiveTags() {
  activeTags.value = []
  initTagIndex.value = null
  focusedTagIndex.value = null
}

function leftKeyInputHandler(event: KeyboardEvent) {
  if (!hasSelectedTags.value) return
  if (activeTags.value.length && !isShiftPressed.value) {
    event.preventDefault()
    selectedTagsRef.value?.focusTag(activeTags.value[0])
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

function rightKeyInputHandler(event: KeyboardEvent) {
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

function selectRangeActiveTags(
  startIndex = focusedTagIndex.value || 0,
  endIndex = modelSelectedTags.value.length,
) {
  activeTags.value = modelSelectedTags.value.slice(startIndex, endIndex)
}

function selectTagsPressingShift() {
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

function multipleTagsSelectionHandler(e: {
  event?: KeyboardEvent | MouseEvent
  tagName: string
}) {
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

function initTag(tagName: string) {
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

function selectToDirections(key: string) {
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
          modelSelectedTags.value[modelSelectedTags.value.length - 1],
        )
      }
    }
    else if (key === 'ArrowLeft') {
      selectRangeActiveTags(0, (initTagIndex.value || 0) + 1)
      if (!modelValue.value.length) {
        selectedTagsRef.value?.focusTag(modelSelectedTags.value[0])
      }
    }
  }
}

function focusTagHandler(e: { event: FocusEvent, tagName: string }) {
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

function focusInputFromTags() {
  setFocusInput()
  nextTick(() => {
    if (inputRef.value) {
      moveCursorToStart(inputRef.value)
    }
  })
}

function selectInputAndTags() {
  activeTags.value = [...modelSelectedTags.value]
  if (modelValue.value.length) {
    inputRef.value?.select()
    initTagIndex.value = activeTags.value.length
    focusedTagIndex.value = 0
  }
  else if (activeTags.value.length) {
    initTagIndex.value = activeTags.value.length - 1
    selectedTagsRef.value?.focusTag(activeTags.value[0])
  }
}

function selectInputTextToTags() {
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

function handleFocusPrevOnSelectedTags() {
  if (props.positionReversed) {
    focusFirstTag(() => emits('focus-prev'))
  }
  else {
    emits('focus-prev')
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

const debouncedHandleDeleteTag = ref<
  | ((arg: { tagName: string, event?: KeyboardEvent | MouseEvent }) => void)
  | null
>(null)

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
    if (e.event instanceof KeyboardEvent) {
      // rely on useMagicKeys for shift/meta
    }
    metaKeyClickSelection(e.event as MouseEvent, e.tagName)
    multipleTagsSelectionHandler({ event: e.event, tagName: e.tagName })
  }
}

function metaKeyClickSelection(event: MouseEvent, tagName: string) {
  if (isMetaPressed.value && event instanceof MouseEvent) {
    if (activeTags.value.includes(tagName)) {
      activeTags.value.splice(activeTags.value.indexOf(tagName), 1)
      if (activeTags.value.length) {
        selectedTagsRef.value?.focusTag(activeTags.value[0])
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

function deleteHandler(e: KeyboardEvent) {
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

function handleCopy(e: ClipboardEvent) {
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

function handleCut(e: ClipboardEvent) {
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

function handlePaste(e: ClipboardEvent) {
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

function inputKeydownHandler(e: KeyboardEvent) {
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

function selectedTagsKeydownHandler(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
  multipleTagsSelectionHandler({ event: e, tagName: '' })
}

function enterHandler() {
  inputRef.value?.blur()
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

async function handleDeleteTag({
  tagName,
  event,
}: {
  tagName: string
  event?: KeyboardEvent | MouseEvent
}) {
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

<style scoped lang="scss">
.filter {
  --input-vertical-padding: 13px;
  --input-horizontal-spacing: 10px;
  --input-height: 28px;
  --input-border-color: var(--color-fill-gray-secondary);
  --input-text: var(--color-fill-gray-secondary);
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 6px;

  &__top-wrapper {
    display: flex;
  }

  &__filter-button {
    position: relative;
    z-index: 1;
    cursor: text;
    margin-left: var(--input-horizontal-spacing);
    margin-right: 3px;
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
    border-radius: 6px;
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
      padding: var(--input-vertical-padding) 9px;
      border: 1px solid transparent;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      &:focus {
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
    padding-left: 4px;
    margin: -4px 0;
    :deep() {
      ul {
        padding: 4px;
        .tag:last-child {
          padding-right: 0;
        }
      }
    }
  }

  &__delete-button {
    position: relative;
    margin: 0;
    z-index: 1;
    border-radius: 100%;
    .clear-rounded-icon {
      height: 12px;
      width: 12px;
      fill: var(--input-text);
      display: block;
    }
  }

  &__delete-button-wrapper {
    display: flex;
    align-items: center;
    padding-right: var(--input-horizontal-spacing);
    padding-left: 3px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
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
      min-width: 130px;
      display: block;
      text-indent: 7px;
    }
  }

  &__input-box-wrapper {
    display: flex;
    overflow-x: auto;
    align-items: center;
    cursor: text;
    flex: 1;
  }

  &__input {
    color: var(--color-text);
    height: var(--input-height);
    border: none;
    width: 100%;
    position: absolute;
    background: transparent;
    z-index: 1;
    text-indent: 7px;
    &:focus {
      outline: none;
    }
    &[placeholder] {
      &::placeholder {
        color: var(--input-text);
      }
    }
  }
}
</style>
