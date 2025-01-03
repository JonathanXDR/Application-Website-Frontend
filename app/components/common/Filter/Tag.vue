<template>
  <li
    class="tag"
    role="presentation"
  >
    <button
      ref="button"
      :class="{ focus: isActiveTag }"
      role="option"
      :aria-selected="ariaSelected"
      aria-roledescription="tag"
      @focus="emitFocus"
      @click.prevent="emitClick"
      @dblclick.prevent="!keyboardIsVirtual && deleteTag()"
      @keydown.exact="emitKeydown"
      @keydown.shift.exact="emitKeydown"
      @keydown.shift.meta.exact="emitKeydown"
      @keydown.meta.exact="emitKeydown"
      @keydown.ctrl.exact="emitKeydown"
      @keydown.delete.prevent="deleteTag"
      @mousedown.prevent="focusButton"
      @copy="handleCopy"
    >
      <span
        v-if="!isRemovableTag"
        class="visuallyhidden"
      >{{ t("filter.add-tag") }} -</span>
      <template v-if="isTranslatableTag">
        {{ t(name) }}
      </template>
      <template v-else>
        {{ name }}
      </template>
      <span
        v-if="isRemovableTag"
        class="visuallyhidden"
      >– {{ t("filter.tag-select-remove") }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
import { prepareDataForHTMLClipboard } from '~/utils/clipboard'

const props = defineProps<{
  name: string
  isFocused?: boolean
  isRemovableTag?: boolean
  isTranslatableTag?: boolean
  isActiveTag?: boolean
  activeTags?: string[]
  keyboardIsVirtual?: boolean
}>()

const emit = defineEmits([
  'focus',
  'click',
  'keydown',
  'paste-content',
  'delete-tag',
  'prevent-blur',
])

const { t } = useI18n()
const button = ref<HTMLButtonElement | null>(null)

const ariaSelected = computed(() => {
  if (!props.isRemovableTag) return undefined
  return props.isActiveTag ? 'true' : 'false'
})

const activeElement = useActiveElement()

const isCurrentlyActiveElement = () => {
  return activeElement.value === button.value
}

const handleCopy = (e: ClipboardEvent) => {
  if (!isCurrentlyActiveElement()) return
  e.preventDefault()
  const tags
    = props.activeTags && props.activeTags.length
      ? props.activeTags
      : [props.name]
  e.clipboardData?.setData('text/html', prepareDataForHTMLClipboard({ tags }))
  e.clipboardData?.setData('text/plain', tags.join(' '))
}

const handleCut = (e: ClipboardEvent) => {
  if (!isCurrentlyActiveElement() || !props.isRemovableTag) return
  handleCopy(e)
  deleteTag(e)
}

const handlePaste = (e: ClipboardEvent) => {
  if (!isCurrentlyActiveElement() || !props.isRemovableTag) return
  e.preventDefault()
  deleteTag(e)
  emit('paste-content', e)
}

const deleteTag = (e?: Event) => {
  emit('delete-tag', { tagName: props.name, event: e })
  emit('prevent-blur')
}

const focusButton = (e?: MouseEvent) => {
  if (!props.keyboardIsVirtual && button.value) button.value.focus()
  if (e?.buttons === 0 && props.isFocused) deleteTag(e)
}

const emitFocus = (e: FocusEvent) => {
  emit('focus', { event: e, tagName: props.name })
}

const emitClick = (e: MouseEvent) => {
  emit('click', { event: e, tagName: props.name })
}

const emitKeydown = (e: KeyboardEvent) => {
  emit('keydown', { event: e, tagName: props.name })
}

useEventListener(document, 'copy', handleCopy)
useEventListener(document, 'cut', handleCut)
useEventListener(document, 'paste', handlePaste)

watch(
  () => props.isFocused,
  (val) => {
    if (val) focusButton()
  },
)
</script>

<style scoped lang="scss">
// @import "docc-render/styles/_core.scss";

.tag {
  display: inline-block;
  padding-right: rem(10px);

  &:focus {
    outline: none;
  }

  button {
    color: var(--color-figure-gray);
    background-color: var(--color-fill-tertiary);
    @include font-styles(body-reduced-tight);
    border-radius: rem(14px);
    padding: rem(4px) rem(10px);
    white-space: nowrap;
    border: 1px solid transparent;

    @media (hover: hover) {
      // Prevent hover state to get stuck on iOS Safari
      &:hover {
        transition:
          background-color 0.2s,
          color 0.2s;
        background-color: var(--color-fill-blue);
        color: white;
      }
    }

    // We only want to make active the tags when they are clicked (focus) to prevent
    // ghost active states when deleting tags. https://stackoverflow.com/questions/1677990/
    &:focus:active {
      background-color: var(--color-fill-blue);
      color: white;
    }

    &:focus,
    &.focus {
      @include focus-shadow-form-element();
    }

    @include on-keyboard-focus() {
      @include focus-shadow-form-element();
    }
  }
}
</style>
