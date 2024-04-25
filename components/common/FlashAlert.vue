<template>
  <aside
    :class="[variant, 'flex items-center justify-between']"
    :style="{
      backgroundColor: `var(--color-aside-${variant}-background)`,
      borderColor: `var(--color-aside-${variant}-border)`,
      boxShadow: `0 0 1px 0 var(--color-aside-${variant}-border) inset, 0 0 1px 0 var(--color-aside-${variant}-border)`
    }"
  >
    <div
      class="w-full flex items-start gap-3"
      :style="{ overflowWrap: 'anywhere' }"
    >
      <Icon
        class="icon icon-medium m-1"
        name="exclamationmark.triangle.fill"
        :colors="{
          primary: 'var(--color-fill)',
          tertiary: `var(--color-aside-${variant})`
        }"
      />
      <div class="w-full">
        <p
          class="label"
          :style="{
            color: `var(--color-aside-${variant})`
          }"
        >
          {{ title || variant }}
        </p>
        <p class="description">
          {{ description }}
        </p>
      </div>
    </div>
    <button
      type="button"
      class="rc-overlay-close"
      :style="{
        transform: 'scale(0.75)'
      }"
      @click="toggleFlashAlert()"
    >
      <span class="rc-overlay-closesvg"
        ><svg
          width="21"
          height="21"
          class="as-svgicon as-svgicon-close as-svgicon-tiny as-svgicon-closetiny"
        >
          <path fill="none" d="M0 0h21v21H0z" />
          <path
            d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"
          /></svg
      ></span>
    </button>
  </aside>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?:
      | 'deprecated'
      | 'experiment'
      | 'important'
      | 'note'
      | 'tip'
      | 'warning'
    title?: string
    description: string
  }>(),
  {
    variant: 'note'
  }
)

const open = ref(false)
const toggleFlashAlert = () => {
  open.value = !open.value
}
</script>

<style scoped>
p + * {
  margin-top: var(--spacing-stacked-margin-large);
}

aside {
  --spacing-stacked-margin-small: 0.4em;
  --spacing-stacked-margin-large: 0.8em;
  --spacing-stacked-margin-xlarge: calc(
    var(--spacing-stacked-margin-large) * 2
  );
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  border-radius: var(--aside-border-radius, 15px);
  border-style: var(--aside-border-style, solid);
  border-width: var(--aside-border-width, 1px 1px 1px 1px);
  padding: 0.9411764706rem;
  text-align: start;
}

aside .label {
  font-size: 1rem;
  line-height: 1.5294417647;
  font-weight: 600;
  letter-spacing: -0.021em;
  font-family: var(
    --typography-html-font,
    'SF Pro Text',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif
  );
}

aside .label + .description {
  margin-top: var(--spacing-stacked-margin-small);
  margin-inline: var(--spacing-stacked-margin-small);
}

aside {
  margin-top: var(--spacing-stacked-margin-xlarge);
  margin-inline: var(--spacing-stacked-margin-xlarge);
}

.rc-overlay-close {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  width: 44px;
  z-index: 1;
}
.rc-overlay-close .rc-overlay-closesvg {
  align-items: center;
  background: var(--color-fill-gray-quaternary);
  border-radius: 50%;
  color: var(--color-figure-gray-secondary);
  display: flex;
  height: 36px;
  outline: none;
  position: relative;
  transition: color 0.1s linear, background 0.1s linear;
  width: 36px;
}
.rc-overlay-close .rc-overlay-closesvg svg {
  fill: currentColor;
  height: 20px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 20px;
}
.rc-overlay-close:hover .rc-overlay-closesvg {
  background: var(--base-color);
  color: var(--color-figure-gray-secondary-alt);
}
.rc-overlay-close:active .rc-overlay-closesvg {
  background: var(--color-fill-gray-tertiary);
}
</style>
