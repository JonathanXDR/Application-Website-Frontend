<template>
  <component :is="as" :class="['button', variant, size]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { IconType } from '~/types/common/Icon'
import type { SizeType } from '~/types/common/Size'

withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap
    variant?: 'primary' | 'secondary' | 'tertiary'
    size?: Exclude<SizeType, 'xsmall' & 'xlarge'>
    borderRadius?: 'reduced' | 'full'
    label: string
    icon?: IconType
  }>(),
  {
    as: 'button',
    variant: 'primary',
    size: 'medium',
    borderRadius: 'reduced',
    icon: undefined
  }
)
</script>

<style scoped>
.button {
  --sk-button-color: var(--color-fill);
  --sk-button-color-hover: var(--sk-button-color);
  --sk-button-color-active: var(--sk-button-color-hover);
  --sk-button-disabled-opacity: var(--sk-link-disabled-opacity);
  --sk-button-border-color: transparent;
  --sk-button-border-radius: 980px;
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
  --sk-button-min-width-basis: 60px;
  --sk-button-padding-horizontal: 16px;
  --sk-button-padding-vertical: 9px;
  --sk-button-border-width: 1px;
  --sk-button-box-sizing: content-box;
  --sk-button-width: auto;
  --sk-button-display: inline-block;
  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  background: var(--color-code-plain);
  color: var(--sk-button-color);
  padding-block: calc(
    var(--sk-button-padding-vertical) - var(--sk-button-border-width)
  );
  padding-inline: calc(
    var(--sk-button-padding-horizontal) - var(--sk-button-border-width)
  );
  border-radius: var(--sk-button-border-radius);
  border: var(--sk-button-border-width) solid var(--sk-button-border-color);
  width: var(--sk-button-width);
  min-width: calc(
    var(--sk-button-min-width-basis) - var(--sk-button-padding-horizontal) * 2
  );
  cursor: pointer;
  display: var(--sk-button-display);
  box-sizing: var(--sk-button-box-sizing);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  --sk-button-background: rgb(0, 113, 227);
  --sk-button-background-hover: #0077ed;
  --sk-button-background-active: #006edb;
}

.button {
  display: flex;
}

.button {
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  min-width: 28px;
  padding: 8px 16px;
  border-radius: 980px;
  background: #0071e3;
  color: var(--color-fill-gray);
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
}

.button:hover {
  text-decoration: none;
}

.button:active {
  outline: none;
}

.button:disabled {
  cursor: default;
}

.button:hover {
  background: #0077ed;
}

.button:active {
  background: #006edb;
}

.button:disabled {
  background: #0071e3;
  color: var(--color-fill-gray);
  opacity: 0.32;
}

.reduced.button {
  --sk-button-padding-horizontal: 11px !important;
  --sk-button-padding-vertical: 4px !important;
  --sk-button-min-width-basis: 45px !important;
  --sk-button-margin-horizontal: 10px !important;
  --sk-button-margin-vertical: 10px !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.button-cta {
  background: var(
    --colors-button-light-background,
    var(--color-button-background)
  );
  border-color: var(--color-button-border, currentcolor);
  border-radius: var(--button-border-radius, 18px);
  border-style: var(--button-border-style, none);
  border-width: var(--button-border-width, medium);
  color: var(--colors-button-text, var(--color-button-text));
  cursor: pointer;
  min-width: 30px;
  padding: 4px 15px;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.button-cta:active {
  background: var(
    --colors-button-light-backgroundActive,
    var(--color-button-background-active)
  );
  outline: none;
}

.button-cta:hover:not([disabled]) {
  background: var(
    --colors-button-light-backgroundHover,
    var(--color-button-background-hover)
  );
  text-decoration: none;
}

.button-cta:disabled {
  opacity: 0.32;
  cursor: default;
}

button {
  margin: 0;
  padding: 0;
}
button {
  background: none;
  border: 0;
  box-sizing: content-box;
  color: inherit;
  cursor: pointer;
  font: inherit;
  overflow: visible;
  vertical-align: inherit;
}
button:disabled {
  cursor: default;
}
button {
  font-synthesis: none;
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  direction: ltr;
  text-align: left;
}
button:focus {
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
  outline: none;
}
.button {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 30px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 980px;
  background: #0071e3;
  color: #fff;
  border-color: transparent;
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
}
.button:hover {
  text-decoration: none;
}
.button:active {
  outline: none;
}
.button:disabled {
  cursor: default;
  pointer-events: none;
}
.button:hover,
.button:focus {
  background: #0077ed;
  color: #fff;
  border-color: transparent;
}
.button:focus {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
  outline: none;
}
.button:active {
  background: #006edb;
  color: #fff;
  border-color: transparent;
}
.button:disabled {
  background: #0071e3;
  color: #fff;
  opacity: var(--sk-link-disabled-opacity);
}
.large.button {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 17px;
  padding-bottom: 17px;
  --sk-button-margin-horizontal: 22px;
  --sk-button-margin-vertical: 22px;
}
.theme-dark .button {
  background: #0071e3;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:hover,
.theme-dark .button:focus {
  background: #0077ed;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:focus {
  box-shadow: 0 0 0 3px #000, 0 0 0 5px #0071e3;
  outline: none;
}
.theme-dark .button:active {
  background: #006edb;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:disabled {
  background: #0071e3;
  color: #fff;
  opacity: var(--sk-link-disabled-opacity);
}
.symptoms-category .content-area .support-section button {
  margin-top: 0;
}
.symptoms-category .content-area .support-section .submit-button {
  margin-top: 40px;
  margin-top: 40px;
}
@media only screen and (max-width: 1068px) {
  .symptoms-category .content-area .support-section .submit-button {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 734px) {
  .symptoms-category .content-area .support-section .submit-button {
    margin-top: 23px;
  }
}
@media only screen and (max-width: 1068px) {
  .symptoms-category .content-area .support-section .submit-button {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 734px) {
  .symptoms-category .content-area .support-section .submit-button {
    margin-top: 23px;
  }
}

button {
  margin: 0;
  padding: 0;
}
button {
  background: none;
  border: 0;
  box-sizing: content-box;
  color: inherit;
  cursor: pointer;
  font: inherit;
  overflow: visible;
  vertical-align: inherit;
}
button:disabled {
  cursor: default;
}
button {
  font-synthesis: none;
  -moz-font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  direction: ltr;
  text-align: left;
}
button:focus {
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
  outline: none;
}

.button {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 30px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 980px;
  background: #0071e3;
  color: #fff;
  border-color: transparent;
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
}
.button:hover {
  text-decoration: none;
}
.button:active {
  outline: none;
}
.button:disabled {
  cursor: default;
  pointer-events: none;
}
.button:hover,
.button:focus {
  background: #0077ed;
  color: #fff;
  border-color: transparent;
}
.button:focus {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
  outline: none;
}
.button:active {
  background: #006edb;
  color: #fff;
  border-color: transparent;
}
.button:disabled {
  background: #0071e3;
  color: #fff;
  opacity: var(--sk-link-disabled-opacity);
}
.button-secondary-alpha {
  background: rgba(0, 0, 0, 0.08);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:hover,
.button-secondary-alpha:focus {
  background: rgba(0, 0, 0, 0.07);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:focus {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
  outline: none;
}
.button-secondary-alpha:active {
  background: rgba(0, 0, 0, 0.09);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:disabled {
  background: rgba(0, 0, 0, 0.08);
  color: #000;
  opacity: 0.56;
}
.button-elevated {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 28px;
  padding-left: 21px;
  padding-right: 21px;
  padding-top: 11px;
  padding-bottom: 11px;
  --sk-button-margin-horizontal: 18px;
  --sk-button-margin-vertical: 18px;
}
.theme-dark .button {
  background: #0071e3;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:hover,
.theme-dark .button:focus {
  background: #0077ed;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:focus {
  box-shadow: 0 0 0 3px #000, 0 0 0 5px #0071e3;
  outline: none;
}
.theme-dark .button:active {
  background: #006edb;
  color: #fff;
  border-color: transparent;
}
.theme-dark .button:disabled {
  background: #0071e3;
  color: #fff;
  opacity: var(--sk-link-disabled-opacity);
}
.theme-dark .button-secondary-alpha {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-color: transparent;
}
.theme-dark .button-secondary-alpha:hover,
.theme-dark .button-secondary-alpha:focus {
  background: rgba(255, 255, 255, 0.21);
  color: #fff;
  border-color: transparent;
}
.theme-dark .button-secondary-alpha:focus {
  box-shadow: 0 0 0 3px #000, 0 0 0 5px #0071e3;
  outline: none;
}
.theme-dark .button-secondary-alpha:active {
  background: rgba(255, 255, 255, 0.19);
  color: #fff;
  border-color: transparent;
}
.theme-dark .button-secondary-alpha:disabled {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  opacity: 0.56;
}
.button {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 30px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 980px;
  background: #0071e3;
  color: #fff;
  border-color: transparent;
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
}
.button:hover {
  text-decoration: none;
}
.button:active {
  outline: none;
}
.button:disabled {
  cursor: default;
  pointer-events: none;
}
.button:hover,
.button:focus {
  background: #0077ed;
  color: #fff;
  border-color: transparent;
}
.button:focus {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
  outline: none;
}
.button:active {
  background: #006edb;
  color: #fff;
  border-color: transparent;
}
.button:disabled {
  background: #0071e3;
  color: #fff;
  opacity: var(--sk-link-disabled-opacity);
}
.button-secondary-alpha {
  background: rgba(0, 0, 0, 0.08);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:hover,
.button-secondary-alpha:focus {
  background: rgba(0, 0, 0, 0.07);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:focus {
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #0071e3;
  outline: none;
}
.button-secondary-alpha:active {
  background: rgba(0, 0, 0, 0.09);
  color: #000;
  border-color: transparent;
}
.button-secondary-alpha:disabled {
  background: rgba(0, 0, 0, 0.08);
  color: #000;
  opacity: 0.56;
}
.button-elevated {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  border-style: solid;
  border-width: 1px;
  min-width: 28px;
  padding-left: 21px;
  padding-right: 21px;
  padding-top: 11px;
  padding-bottom: 11px;
  --sk-button-margin-horizontal: 18px;
  --sk-button-margin-vertical: 18px;
}
</style>
