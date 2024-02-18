<template>
  <div
    class="viewer-sizenav all-access-pass__background"
    style="
      pointer-events: all;
      position: absolute;
      width: 110px;
      --sizenav-width: 110px;
      --bubble-position: 57px;
      --bubble-width: 48px;
      --bubble-hint-position: 0;
      --aap-offset: 0;
      transform: matrix(1, 0, 0, 1, 50, 0);
    "
  >
    <div class="viewer-sizenav__bubble">
      <div class="viewer-sizenav__bubble-inner" style="opacity: 1"></div>
    </div>
    <ul class="viewer-sizenav-items" role="radiogroup" aria-label="Select size">
      <li
        class="viewer-sizenav-item"
        style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1"
      >
        <input
          id="viewer-sizenav-value-small"
          type="radio"
          name="viewer-sizenav-value"
          class="viewer-sizenav-value"
          value="macbook-pro-14"
          data-aria-map='{"Dark":"MacBook Pro 14” in Space&nbsp;Black with M3&nbsp;Pro or M3&nbsp;Max Footnote 2"}'
          data-viewer-value="small"
          data-analytics-click="prop3:size select - macbook pro 14"
          data-analytics-title="size select - macbook pro 14"
          data-analytics-intrapage-link=""
          checked
          aria-label="MacBook Pro 14” in Space&nbsp;Black with M3&nbsp;Pro or M3&nbsp;Max Footnote 2"
          style="--option-offset: 5px; --option-width: 48px"
        />
        <label
          for="viewer-sizenav-value-small"
          class="viewer-sizenav-link"
          aria-hidden="true"
        >
          <span class="viewer-sizenav-swatch viewer-sizenav-swatch-small">
            <span class="viewer-sizenav-label"> 14” </span>
          </span>
        </label>
      </li>
      <li
        class="viewer-sizenav-item"
        style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1"
      >
        <input
          id="viewer-sizenav-value-large"
          type="radio"
          name="viewer-sizenav-value"
          class="viewer-sizenav-value"
          value="macbook-pro-16"
          data-aria-map='{"Dark":"MacBook Pro 16” in Space&nbsp;Black with M3&nbsp;Pro or M3&nbsp;Max Footnote 2"}'
          data-viewer-value="large"
          data-default-size="true"
          data-analytics-click="prop3:size select - macbook pro 16"
          data-analytics-title="size select - macbook pro 16"
          data-analytics-intrapage-link=""
          aria-label="MacBook Pro 16” in Space&nbsp;Black with M3&nbsp;Pro or M3&nbsp;Max Footnote 2"
          style="--option-offset: 57px; --option-width: 48px"
        />
        <label
          for="viewer-sizenav-value-large"
          class="viewer-sizenav-link"
          aria-hidden="true"
        >
          <span class="viewer-sizenav-swatch viewer-sizenav-swatch-large">
            <span class="viewer-sizenav-label"> 16” </span>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'icon' | 'label' | 'combination';
  }>(),
  {
    variant: 'label',
  }
);

const { getTheme, setTheme } = useTheme();
const currentTheme = computed(() => getTheme());

const items = reactive([
  { id: 'light', label: 'Light', icon: 'sun.max.fill' },
  { id: 'dark', label: 'Dark', icon: 'moon.fill' },
  { id: 'auto', label: 'Auto', icon: 'circle.lefthalf.filled' },
]);
</script>

<style scoped>
/*! CSS Used from: https://www.apple.com/v/macbook-pro/aj/built/styles/main.built.css */
input,
li,
ul {
  margin: 0;
  padding: 0;
}
:focus-visible {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: var(--sk-focus-offset, 1px);
}
input {
  font-synthesis: none;
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul {
  margin-inline-start: 1.1764705882em;
}
/*! CSS Used from: https://www.apple.com/v/macbook-pro/aj/built/styles/overview.built.css */
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
  display: none;
  margin-inline-start: 12px;
}
html.enhanced .all-access-pass__background.viewer-sizenav {
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
html.enhanced .viewer-sizenav {
  --bubble-scale: 0;
  background-color: var(--aap-background-color);
}
html.enhanced .viewer-sizenav .viewer-sizenav__bubble-inner {
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
  height: 48px;
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
  font-size: 16px;
  font-weight: 600;
  height: 100%;
  justify-content: center;
  letter-spacing: -0.35px;
  line-height: 21px;
  padding: 0 8px;
  transition: color 200ms cubic-bezier(0.53, -0.01, 0.17, 1);
  width: auto;
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
