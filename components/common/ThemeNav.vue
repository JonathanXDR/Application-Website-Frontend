<template>
  <div
    ref="themeNavContainer"
    class="viewer-sizenav all-access-pass__background"
    :style="containerStyle"
  >
    <div class="viewer-sizenav__bubble">
      <div class="viewer-sizenav__bubble-inner" :style="bubbleStyle"></div>
    </div>
    <ul class="viewer-sizenav-items" role="radiogroup">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="viewer-sizenav-item"
        :ref="(setItemRef as unknown as VNodeRef)"
      >
        <input
          :id="`viewer-sizenav-value-${item.id}`"
          type="radio"
          name="viewer-sizenav-value"
          class="viewer-sizenav-value"
          :value="item.id"
          v-model="selectedTheme"
        />
        <label
          :for="`viewer-sizenav-value-${item.id}`"
          class="viewer-sizenav-link"
        >
          <span
            :class="`viewer-sizenav-swatch viewer-sizenav-swatch-${item.id}`"
          >
            <span class="viewer-sizenav-label">
              <Icon
                v-if="labelVariant !== 'text'"
                :name="item.icon"
                class="icon icon-large"
              />
              <div v-if="labelVariant !== 'icon'">
                {{ item.label }}
              </div>
            </span>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { VNodeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    labelVariant?: 'icon' | 'text' | 'combination'
    separator?: boolean
  }>(),
  {
    size: 'medium',
    labelVariant: 'text',
    separator: false
  }
)

const { getTheme, setTheme } = useTheme()
const currentTheme = computed(() => getTheme())

const themeNavContainer: Ref<HTMLElement | null> = ref(null)
const itemElements: Ref<HTMLElement[]> = ref([])
const selectedTheme = ref(currentTheme.value)
const bubbleStyle = ref<Record<string, string>>({})

const items = [
  { id: 'light', label: 'Light', icon: 'sun.max.fill' },
  { id: 'dark', label: 'Dark', icon: 'moon.fill' },
  { id: 'auto', label: 'Auto', icon: 'circle.lefthalf.filled' }
]

const height = computed(() => {
  switch (props.size) {
    case 'xsmall':
      return '32px'
    case 'small':
      return '40px'
    case 'medium':
      return '48px'
    case 'large':
      return '56px'
    case 'xlarge':
      return '64px'
  }
})

const setItemRef = (el: HTMLElement) => {
  if (el) itemElements.value.push(el)
}

const updateBubblePosition = () => {
  const selectedItemIndex = items.findIndex(
    item => item.id === selectedTheme.value
  )
  const selectedItemElement = itemElements.value[selectedItemIndex]
  if (selectedItemElement) {
    bubbleStyle.value = {
      '--bubble-position': `${selectedItemElement.offsetLeft}px`,
      '--bubble-width': `${selectedItemElement.offsetWidth}px`,
      opacity: '1'
    }
  }
}

const containerStyle = computed(() => ({
  '--sizenav-width': `${themeNavContainer.value?.offsetWidth}px`,
  '--aap-min-height': `${height.value}`
}))

watch(
  selectedTheme,
  newTheme => {
    setTheme(newTheme)
    updateBubblePosition()
  },
  { immediate: true }
)

onMounted(updateBubblePosition)
</script>

<style scoped>
.all-access-pass__background {
  -webkit-backdrop-filter: blur(var(--aap-blur));
  backdrop-filter: blur(var(--aap-blur));
  background-color: var(--aap-background-color);
  border-radius: 32px;
  box-shadow: inset 0 0 1px var(--aap-inner-glow-color);
  color: var(--aap-text-color);
  display: flex;
  will-change: transform;
  z-index: 1;
  transition: linear var(--aap-background-transition-duration) background-color;
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
  --bubble-scale: 1;
  --bubble-width: calc(var(--aap-min-height) - 8px);
  --bubble-hint-position: 0;
  --sizenav-width: 0px;
  --toggle-color: 0;
  --ltr: 1;

  --aap-blur: 7px;
  --aap-font-size: 17px;
  --aap-font-weight: 600;
  --aap-mobile-font-size: 14px;
  --aap-hint-scale: 1;
  --aap-hint-opacity: 0;
  --aap-margin: 30px;
  --aap-margin-bottom: 100px;
  --aap-background-transition-duration: 250ms;
  -webkit-user-select: none;
  user-select: none;
}
.viewer-sizenav__bubble {
  --abs-calc: max(var(--bubble-hint-position), -1 * var(--bubble-hint-position)) /
    10;
  border-radius: 28px;
  box-sizing: border-box;
  height: calc(100% - 8px);
  left: 4px;
  pointer-events: none;
  position: absolute;
  top: 4px;
  transform: translateX(
      calc(var(--bubble-hint-position) * 1px + var(--aap-offset) * 1px)
    )
    scaleY(calc(1 - var(--abs-calc) * 0.15));
  transform-origin: center center;
  transition: transform 200ms ease-out;
  width: calc(100% - 8px);
}
.viewer-sizenav__bubble-inner {
  height: calc(var(--aap-min-height) - 8px);
  min-width: calc(var(--aap-min-height) - 8px);
  opacity: 1;
  transform: translateX(calc(var(--bubble-position) - 4px));
  transition: transform 400ms ease, width 400ms ease;
  width: var(--bubble-width);
  will-change: transform;
}
.viewer-sizenav__bubble-inner,
.viewer-sizenav__bubble-inner:before {
  background-color: var(--aap-icon-color);
  border-radius: 28px;
  left: 0;
  position: absolute;
  top: 0;
}
.viewer-sizenav__bubble-inner:before {
  content: '';
  height: 100%;
  transform: translateX(calc(var(--bubble-hint-position) * 1px))
    scaleX(calc(1 + var(--abs-calc) * 0.15));
  transition: transform 200ms ease-out;
  transform-origin: center center;
  width: 100%;
}
.viewer-sizenav {
  --bubble-scale: 0;
  background-color: var(--aap-background-color);
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
  padding: 0 3px;
  pointer-events: auto;
}
.viewer-sizenav-item {
  margin-left: 2px;
  margin-right: 2px;
}
.viewer-sizenav-link {
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 28px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: calc(var(--aap-min-height) - 8px);
  justify-content: center;
  min-width: 48px;
  transition: background-color 0.25s ease, box-shadow 0.3s ease;
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
  color: var(--aap-icon-color);
  display: flex;
  /* font-size: 16px; */
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  justify-content: center;
  letter-spacing: -0.35px;
  line-height: 21px;
  padding: 0 8px;
  transition: color 200ms cubic-bezier(0.53, -0.01, 0.17, 1);
  width: auto;
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
  color: var(--aap-icon-color-alt);
  transition: color 400ms cubic-bezier(0.53, -0.01, 0.17, 1);
}
.viewer-sizenav-value:focus ~ .viewer-sizenav-link {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
}
* {
  --mx-pro-blue: #2997ff;
  --mx-max-purple: #a972ff;
  --mx-teal: #43b9b9;
}
</style>
style
