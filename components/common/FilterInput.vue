<template>
  <div class="row">
    <div class="col filter-column w-full">
      <div :class="['filter', { focus: open }]">
        <div class="filter-wrapper">
          <div class="filter-top-wrapper">
            <button class="filter-filter-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svg-icon filter-icon"
                height="21"
                width="21"
                viewBox="0 0 41 41"
                fill="currentColor"
              >
                <path
                  d="M20.8.3a20,20,0,0,1,0,40,20.1,20.1,0,0,1-20-20A20.2,20.2,0,0,1,20.8.3Zm0,2.6a17.4,17.4,0,0,0,0,34.8A17.2,17.2,0,0,0,38.2,20.3,17.3,17.3,0,0,0,20.8,2.9Z"
                ></path>
                <path
                  d="M31.9,16a1.1,1.1,0,0,0,1.2-1.1,1.1,1.1,0,0,0-1.2-1.1H9.8a1.1,1.1,0,0,0-1.2,1.1A1.1,1.1,0,0,0,9.8,16Z"
                ></path>
                <path
                  d="M29,22.6a1,1,0,0,0,1.1-1.1A1.1,1.1,0,0,0,29,20.4H12.7a1.1,1.1,0,0,0-1.2,1.1,1.1,1.1,0,0,0,1.2,1.1Z"
                ></path>
                <path
                  d="M25.9,29.2a1.1,1.1,0,0,0,1.2-1.1A1.1,1.1,0,0,0,25.9,27H15.8a1.1,1.1,0,0,0-1.2,1.1,1.1,1.1,0,0,0,1.2,1.1Z"
                ></path>
              </svg>
            </button>
            <div class="filter-input-box-wrapper">
              <label
                id="filter-label"
                for="filter-input"
                class="filter-input-label"
              >
                <input
                  id="filter-input"
                  placeholder="Filter on this page"
                  type="text"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  class="filter-input"
                  @focus="onFocus"
                  @blur="onBlur"
                />
              </label>
            </div>
            <div class="filter-delete-button-wrapper">
              <button v-if="open" class="filter-delete-button">
                <svg
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
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <!-- deepcode ignore PureMethodReturnValueIgnored: false positive -->
          <BadgeBar
            v-if="open && options.length"
            :tags="options.map(option => option.label)"
          />
        </div>
      </div>
    </div>
    <!-- <div class="col large-4 medium-5 small-12">
      <DropDown :options="options" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { ItemType } from '~/types/common/Option'

const { tm } = useI18n()
const items: Ref<ItemType[]> = ref(tm('components.common.FilterInput.items'))
const options: Ref<ItemType[]> = ref(tm('components.common.FilterInput.sorts'))
const open: Ref<boolean> = ref(false)

const onFocus = () => {
  open.value = true
}

const onBlur = () => {
  open.value = false
}
</script>

<style scoped>
.svg-icon {
  fill: var(--colors-svg-icon-fill-light, var(--color-svg-icon));
  transform: scale(1);
  -webkit-transform: scale(1);
  overflow: visible;
}

.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.row {
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
}

.col {
  box-sizing: border-box;
  flex: none;
}

.large-4 {
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
}

.large-8 {
  flex-basis: 66.6666666667%;
  max-width: 66.6666666667%;
}

@media only screen and (max-width: 1250px) {
  .medium-5 {
    flex-basis: 41.6666666667%;
    max-width: 41.6666666667%;
  }

  .medium-7 {
    flex-basis: 58.3333333333%;
    max-width: 58.3333333333%;
  }
}

@media only screen and (max-width: 735px) {
  .small-12 {
    flex-basis: 100%;
    max-width: 100%;
  }
}

.filter {
  --input-vertical-padding: 13px;
  --input-horizontal-spacing: 10px;
  --input-height: 28px;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 13px;
}

.filter-top-wrapper {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.filter-filter-button {
  position: relative;
  z-index: 1;
  cursor: text;
  margin-left: var(--input-horizontal-spacing);
  margin-right: 3px;
}

@media only screen and (max-width: 735px) {
  .filter-filter-button {
    margin-right: 7px;
  }
}

.filter-filter-button .svg-icon {
  fill: var(--color-fill-gray-secondary);
  display: block;
  height: 21px;
}

.filter.focus .filter-wrapper {
  box-shadow: 0 0 0 3pt var(--color-focus-color);
  border: 1px solid var(--color-fill-blue) !important;
}

.filter-wrapper {
  border: 1px solid var(--color-fill-gray-secondary);
  background: var(--color-fill);
  border-radius: 12px;
}

.filter-delete-button {
  position: relative;
  margin: 0;
  z-index: 1;
  border-radius: 100%;
}

.filter-delete-button .clear-rounded-icon {
  height: 12px;
  width: 12px;
  fill: var(--color-fill-gray-secondary);
  display: block;
}

.filter-delete-button-wrapper {
  display: flex;
  align-items: center;
  padding-right: 8px;
  padding-left: 3px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.filter-input-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
}

.filter-input-label:after {
  content: attr(data-value);
  visibility: hidden;
  width: auto;
  white-space: nowrap;
  min-width: 130px;
  display: block;
  text-indent: 7px;
}

@media only screen and (max-width: 735px) {
  .filter-input-label:after {
    text-indent: 3px;
  }
}

.filter-input-box-wrapper {
  width: 100%;
  height: 100%;
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

.filter-input-box-wrapper::-webkit-scrollbar {
  height: 0;
}

.filter-input {
  font-size: 21px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--color-text);
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  background: transparent;
  z-index: 1;
  text-indent: 7px;
}

@media only screen and (max-width: 735px) {
  .filter-input {
    font-size: 19px;
    font-weight: 400;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}

@media only screen and (max-width: 735px) {
  .filter-input {
    text-indent: 3px;
  }
}

.filter-input[placeholder]::placeholder {
  color: var(--color-fill-gray-secondary);
  opacity: 1;
}

.filter-column {
  padding-right: 10px;
}

@media only screen and (max-width: 735px) {
  .filter-column {
    padding-right: 0;
    padding-bottom: 10px;
  }
}
</style>
