<script setup lang="ts">
import type { SegmentNavType } from '#shared/types/components/segment-nav'

const props = withDefaults(defineProps<SegmentNavType>(), {
  componentSize: 'medium',
  label: 'text',
  focus: true,
  separator: false,
  shadow: false,
  grayLabels: false,
  gap: '0px',
  outerPadding: 4,
  selectedItem: (props: SegmentNavType) => {
    return props.items[0]?.id || ''
  },
  onSelect: () => {},
})

const selectedItem = ref<string>(props.selectedItem)
const isTransitioning = ref<boolean>(false)

const navContainer = useTemplateRef('navContainer')
const itemElements = ref<Array<HTMLElement>>([])
const selectedItemElement = ref<HTMLElement | undefined>(undefined)

const setItemReference = (element: HTMLElement | undefined) => {
  if (!element) return
  itemElements.value.push(element)
}

const updateBubblePosition = () => {
  isTransitioning.value = true
  const selectedItemIndex = props.items.findIndex(
    item => item.id === selectedItem.value,
  )
  selectedItemElement.value
    = itemElements.value[selectedItemIndex] || undefined
  if (!selectedItemElement.value) return
  bubbleStyle.value = {
    '--bubble-position': `${selectedItemElement.value.offsetLeft}px`,
    '--bubble-width': `${selectedItemElement.value.offsetWidth}px`,
    'opacity': '1',
  }

  setTimeout(() => (isTransitioning.value = false), 400)
}

const bubbleStyle = ref<Record<string, string>>({})

const computedHeight = computed(() => {
  const sizes: Record<string, number> = {
    xsmall: 32,
    small: 40,
    medium: 48,
    large: 56,
  }
  return sizes[props.componentSize || 'medium'] || 48
})

const fontSize = computed(() => {
  const sizes: Record<string, number> = {
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
  }
  return sizes[props.componentSize || 'medium']
})

const containerStyle = computed(() => ({
  'width': 'fit-content',
  '--sizenav-width': `${navContainer.value?.offsetWidth}px`,
  '--sizenav-outer-padding': `${props.outerPadding}px`,
  '--aap-min-height': `${computedHeight.value}px`,
}))

const computedPadding = computed(() => {
  return props.padding ?? (props.label === 'icon' ? '0' : '0 12px')
})

watch(
  () => props.selectedItem,
  (newValue) => {
    selectedItem.value = newValue
  },
)

watch(
  selectedItem,
  (itemNew) => {
    props.onSelect(itemNew)
    updateBubblePosition()
  },
  { immediate: true },
)

onMounted(updateBubblePosition)

useResizeObserver(navContainer, () => {
  nextTick(() => {
    updateBubblePosition()
  })
})
</script>

<template>
  <div
    ref="navContainer"
    :class="['viewer-sizenav all-access-pass__background', { shadow }]"
    :style="containerStyle"
  >
    <div
      v-if="selectedItemElement"
      class="viewer-sizenav__bubble"
    >
      <div
        class="viewer-sizenav__bubble-inner"
        :style="bubbleStyle"
      />
    </div>
    <ul
      class="viewer-sizenav-items"
      :style="{ '--viewer-sizenav-items-gap': gap }"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :ref="setItemReference as any"
        :class="['viewer-sizenav-item', { separator }]"
      >
        <input
          :id="`viewer-sizenav-value-${item.id}`"
          v-model="selectedItem"
          type="radio"
          :name="`viewer-sizenav-value-${item.category}`"
          :class="['viewer-sizenav-value', { focus }]"
          :aria-label="item.label"
          :value="item.id"
          :disabled="item.id !== selectedItem && isTransitioning"
        >
        <label
          :for="`viewer-sizenav-value-${item.id}`"
          class="viewer-sizenav-link"
          :style="{
            minWidth:
              label !== 'icon'
                ? '48px'
                : `${computedHeight - outerPadding * 2}px`,
          }"
        >
          <span
            :class="`viewer-sizenav-swatch viewer-sizenav-swatch-${item.id}`"
          >
            <span
              class="viewer-sizenav-label"
              :style="{
                padding: computedPadding,
                color: grayLabels
                  ? 'var(--color-figure-gray-secondary)'
                  : 'var(--aap-icon-color)',
                fontSize: `${fontSize}px`,
              }"
            >
              <DynamicIcon
                v-if="item.icon && label !== 'text'"
                :name="item.icon.name"
                class="icon icon-lg"
              />
              <div v-if="label !== 'icon'">{{ item.label }}</div>
            </span>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.viewer-sizenav-item.separator {
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.viewer-sizenav-item.separator:not(:first-child)::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(
    0px - (var(--viewer-sizenav-items-separator) / 2) -
      (var(--viewer-sizenav-items-gap) / 2) - (var(--sizenav-outer-padding) / 2)
  );
  margin: auto;
  width: var(--viewer-sizenav-items-separator);
  height: var(--viewer-sizenav-items-separator);
  border-radius: 100px;
  background: var(--color-code-plain);
  transition: transform 350ms;
}
.viewer-sizenav-item.separator:first-child {
  padding-left: 0;
}
.viewer-sizenav-item.separator:last-child {
  padding-right: 0;
}
.viewer-sizenav-item.separator:has(.viewer-sizenav-value:checked)
  + .viewer-sizenav-item.separator::before,
.viewer-sizenav-item.separator:has(.viewer-sizenav-value:checked)::before {
  transform: scale(0);
}

.all-access-pass__background {
  -webkit-backdrop-filter: blur(var(--aap-blur));
  backdrop-filter: blur(var(--aap-blur));
  /* background-color: var(--aap-background-color); */
  background-color: var(--color-fill-tertiary);
  border-radius: 32px;
  color: var(--aap-text-color);
  display: flex;
  will-change: transform;
  z-index: 1;
  transition: linear var(--aap-background-transition-duration) background-color;
}
.all-access-pass__background.shadow {
  box-shadow: inset 0 0 1px var(--aap-inner-glow-color);
}
.all-access-pass__background.viewer-sizenav {
  --sizenav-width: 0px;
  --ltr: 1;
  margin-inline-start: 12px;
}
.all-access-pass__background.viewer-sizenav {
  margin-inline-start: 0;
}
.viewer-loaded .all-access-pass__background.viewer-sizenav {
  display: block;
}
.viewer-sizenav {
  --bubble-position: 0;
  --bubble-scale: 0;
  --bubble-width: calc(
    var(--aap-min-height) - calc(var(--sizenav-outer-padding) * 2)
  );
  --bubble-hint-position: 0;
  --sizenav-width: 0px;
  --sizenav-outer-padding: 0px;
  --toggle-color: 0;
  --ltr: 1;

  --aap-blur: 7px;
  --aap-font-size: 17px;
  --aap-font-weight: 600;
  --aap-mobile-font-size: 14px;
  --aap-hint-scale: 1;
  --aap-hint-opacity: 0;
  --aap-offset: 0;
  --aap-margin: 30px;
  --aap-margin-bottom: 100px;
  --aap-background-transition-duration: 250ms;
  --viewer-sizenav-items-separator: 3px;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: all;
}
.viewer-sizenav__bubble {
  --abs-calc: max(
      var(--bubble-hint-position),
      -1 * var(--bubble-hint-position)
    ) /
    10;
  border-radius: 28px;
  box-sizing: border-box;
  height: calc(100% - calc(var(--sizenav-outer-padding) * 2));
  left: var(--sizenav-outer-padding);
  pointer-events: none;
  position: absolute;
  top: var(--sizenav-outer-padding);
  transform: translateX(
      calc(var(--bubble-hint-position) * 1px + var(--aap-offset) * 1px)
    )
    scaleY(calc(1 - var(--abs-calc) * 0.15));
  transform-origin: center center;
  transition: transform 200ms ease-out;
  width: calc(100% - calc(var(--sizenav-outer-padding) * 2));
}
.viewer-sizenav__bubble-inner {
  height: calc(var(--aap-min-height) - calc(var(--sizenav-outer-padding) * 2));
  min-width: calc(
    var(--aap-min-height) - calc(var(--sizenav-outer-padding) * 2)
  );
  opacity: 1;
  transform: translateX(
    calc(var(--bubble-position) - var(--sizenav-outer-padding))
  );
  transition:
    transform 400ms ease,
    width 400ms ease;
  width: var(--bubble-width);
  will-change: transform;
}
.viewer-sizenav__bubble-inner,
.viewer-sizenav__bubble-inner:before {
  /* background-color: var(--aap-icon-color); */
  background-color: var(--color-fill-gray);
  border-radius: 28px;
  left: 0;
  position: absolute;
  top: 0;
}
.viewer-sizenav__bubble-inner:before {
  content: "";
  height: 100%;
  transform: translateX(calc(var(--bubble-hint-position) * 1px))
    scaleX(calc(1 + var(--abs-calc) * 0.15));
  transition: transform 200ms ease-out;
  transform-origin: center center;
  width: 100%;
}
.viewer-sizenav .viewer-sizenav__bubble-inner {
  opacity: 0;
}
.viewer-sizenav-items {
  align-items: center;
  display: flex;
  height: var(--aap-min-height);
  justify-content: center;
  list-style: none;
  margin-inline-start: 0;
  padding: 0 calc(var(--sizenav-outer-padding) / 1.33333333333);
  pointer-events: auto;
  gap: var(--viewer-sizenav-items-gap);
}
.viewer-sizenav-item {
  margin-left: calc(var(--sizenav-outer-padding) / 2);
  margin-right: calc(var(--sizenav-outer-padding) / 2);
}

.viewer-sizenav-link {
  align-items: center;
  background-color: transparent;
  border-radius: 28px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: calc(var(--aap-min-height) - calc(var(--sizenav-outer-padding) * 2));
  justify-content: center;
  transition:
    background-color 0.25s ease,
    box-shadow 0.3s ease;
  width: auto;
}
.viewer-sizenav-swatch {
  border-radius: 28px;
  height: inherit;
  position: relative;
  width: inherit;
}
.viewer-sizenav-label {
  align-items: center;
  /* color: var(--aap-icon-color); */
  /* color: var(--color-fill-gray-secondary); */
  display: flex;
  /* font-size: 16px; */
  /* font-size: 12px; */
  font-weight: 600;
  height: 100%;
  justify-content: center;
  transition: color 200ms cubic-bezier(0.53, -0.01, 0.17, 1);
  width: fit-content;
  gap: 5px;
}
.viewer-sizenav-value {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.viewer-sizenav-value:checked ~ .viewer-sizenav-link {
  pointer-events: none;
}
.viewer-sizenav-value:checked
  ~ .viewer-sizenav-link
  .viewer-sizenav-swatch
  .viewer-sizenav-label {
  /* color: var(--aap-icon-color-alt); */
  color: var(--color-fill-tertiary) !important;
  transition: color 400ms cubic-bezier(0.53, -0.01, 0.17, 1);
}
.viewer-sizenav-value.focus:focus ~ .viewer-sizenav-link {
  box-shadow:
    0 0 0 3px #fff,
    0 0 0 5px #0071e3;
}
* {
  --mx-pro-blue: #2997ff;
  --mx-max-purple: #a972ff;
  --mx-teal: #43b9b9;
}
</style>
