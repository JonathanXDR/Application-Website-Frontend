<template>
  <div class="form-element form-has-value">
    <select class="form-dropdown">
      <option v-for="(option, index) in options" :key="index" :value="index">
        {{ option.label }}
      </option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="svg-icon inline-chevron-down-icon form-icon"
      viewBox="0 0 14 14"
    >
      <path
        d="m6.94042969 10.6855469c.17089843 0 .34179687-.0683594.45800781-.1982422l5.2910156-5.42089845c.116211-.11621094.1845703-.26660156.1845703-.4375 0-.35546875-.2666015-.62890625-.6220703-.62890625-.1708984 0-.328125.06835938-.4443359.17773438l-4.86718751 4.9765625-4.87402344-4.9765625c-.109375-.109375-.26660156-.17773438-.44433594-.17773438-.35546875 0-.62207031.2734375-.62207031.62890625 0 .17089844.06835938.32128906.18457031.44433594l5.29101563 5.41406251c.12988281.1298828.28710937.1982422.46484375.1982422z"
      />
    </svg>
    <span v-if="label" class="form-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ItemType } from "~/types/common/Item";

withDefaults(
  defineProps<{
    options: ItemType[];
    label?: string;
  }>(),
  {
    options: () => [],
    label: undefined,
  },
);
</script>

<style scoped>
.form-element {
  position: relative;
}

.form-dropdown {
  font-size: 17px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  /* height: 3.3em; */
  height: 40px;
  color: var(--color-dropdown-text);
  /* padding: 17px 35px 0 14px; */
  padding: 0 35px 0 14px;
  text-align: left;
  border: 1px solid var(--color-dropdown-border);
  border-radius: 15px;
  background-clip: padding-box;
  margin-bottom: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-height: 32px;
}

.form-dropdown ~ .form-icon {
  position: absolute;
  display: block;
  pointer-events: none;
  fill: var(--color-figure-gray-tertiary);
  right: 14px;
  width: 13px;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
}

@media only screen and (max-width: 767px) {
  .form-dropdown ~ .form-icon {
    right: 14px;
  }
}

.form-dropdown ~ .form-label {
  font-size: 12px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  position: absolute;
  top: 8px;
  left: 17px;
  color: var(--color-figure-gray-secondary);
  pointer-events: none;
  padding: 0;
  z-index: 1;
}

.form-dropdown option {
  color: var(--color-fill-gray);
}

.form-dropdown {
  margin-bottom: 0;
  border-radius: 12px;
  border: 1px solid transparent;
  background: var(--color-fill-tertiary);
  color: var(--color-figure-gray);
}

.form-dropdown ~ .form-label {
  color: var(--color-figure-gray-secondary);
}

.form-dropdown ~ .form-icon {
  fill: var(--color-figure-gray);
}
</style>
