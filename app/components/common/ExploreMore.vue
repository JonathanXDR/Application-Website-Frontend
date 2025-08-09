<script setup lang="ts">
import type { BasicPropsType } from '#shared/types/common/basic-props'

withDefaults(defineProps<Partial<BasicPropsType>>(), {
  title: 'Explore more details',
  icon: () => ({ name: 'plus' }),
})
</script>

<template>
  <p class="drawer-toggle-wrapper">
    <a
      href="#"
      class="drawer-toggle"
      aria-expanded="false"
      aria-label="Explore more details, Mac products"
      aria-content="drawer-container-mac"
      role="button"
      style="position: relative; z-index: 1"
    >
      <span class="icon-copy">{{ title }}</span>
      <span class="icon">
        <svg
          v-if="icon.name === 'plus'"
          class="svg svg-plus"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 99.598 99.547"
        >
          <path
            d="M49.773 99.547C76.997 99.547 99.598 76.997 99.598 49.773 99.598 22.55 76.945 0 49.722 0 22.54 0 0 22.55 0 49.773 0 76.997 22.591 99.547 49.773 99.547Z"
          />
          <path
            d="M25.94 49.825C25.94 47.277 27.743 45.515 30.29 45.515H45.577V30.23C45.577 27.69 47.236 25.929 49.711 25.929 52.26 25.93 54.021 27.68 54.021 30.23V45.515H69.36C71.856 45.515 73.66 47.277 73.66 49.825 73.659 52.301 71.845 54.011 69.359 54.011H54.021V69.297C54.021 71.845 52.26 73.597 49.711 73.597 47.236 73.596 45.577 71.782 45.577 69.296V54.01H30.291C27.753 54.01 25.94 52.3 25.94 49.825Z"
          />
        </svg>
        <Icon
          v-else
          v-bind="icon"
          class="icon icon-md mr-1"
        />
      </span>
    </a>
  </p>
</template>

<style scoped>
.drawer-toggle {
  background-color: var(--modal-trigger-color);
  color: var(--modal-trigger-bg);
  padding: 10px 7px 10px 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  border-radius: 28px;
}
.drawer-toggle,
.drawer-toggle:hover {
  text-decoration: none;
}
.drawer-toggle:hover .svg-plus path:first-child {
  fill: var(--color-code-plain);
}
.drawer-toggle .icon-copy {
  margin-inline-end: 12px;
}
.drawer-toggle .svg-plus {
  width: 36px;
  height: 36px;
  display: block;
}
.drawer-toggle .svg-plus path {
  transition: fill 0.2s;
}
.drawer-toggle .svg-plus path:first-child {
  fill: var(--modal-trigger-bg);
}
.drawer-toggle .svg-plus path:last-child {
  fill: var(--modal-trigger-color);
}
.drawer-toggle-wrapper {
  text-align: center;
  margin-inline-start: auto;
  margin-inline-end: auto;
  --modal-trigger-color: var(--color-fill-tertiary);
  --modal-trigger-bg: var(--color-fill-gray);
  margin-top: 15px;
  position: relative;
}
.drawer-toggle-wrapper {
  margin-block-start: 50px;
}
</style>
