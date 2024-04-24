<template>
  <aside
    data-v-0ca053f3=""
    :aria-label="variant"
    :class="variant"
    :style="{
      backgroundColor: `var(--color-aside-${variant}-background)`,
      borderColor: `var(--color-aside-${variant}-border)`,
      boxShadow: `0 0 1px 0 var(--color-aside-${variant}-border) inset, 0 0 1px 0 var(--color-aside-${variant}-border)`,
    }"
  >
    <p
      data-v-0ca053f3=""
      class="label"
      :style="{
        color: `var(--color-aside-${variant})`,
      }"
    >
      {{ title || variant }}
    </p>
    <p data-v-0ca053f3="">
      {{ description }}
    </p>
  </aside>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'deprecated' | 'experiment' | 'important' | 'note' | 'tip' | 'warning'
  title?: string
  description: string
}>(), {
  variant: 'note',
})
</script>

<style scoped>
a,
  a:link,
  a:visited {
    color: #000;
    text-decoration: none;
  }

p+* {
  margin-top: var(--spacing-stacked-margin-large);
}

a {
  color: var(--colors-link, var(--color-link));
}

a:link,
a:visited {
  text-decoration: none;
}

a.inline-link,
a:hover {
  text-decoration: underline;
  text-underline-position: under;
}

a:active {
  text-decoration: none;
}

[data-v-21735da6] :focus:not(input):not(textarea):not(select) {
  outline: none;
}

.fromkeyboard[data-v-21735da6] :focus:not(input):not(textarea):not(select) {
  outline: 4px solid var(--color-focus-color);
  outline-offset: 1px;
}

/*! CSS Used from: https://developer.apple.com/tutorials/css/624.a121bb2a.css */
aside[data-v-0ca053f3] {
  -moz-column-break-inside: avoid;
  break-inside: avoid;
  border-radius: var(--aside-border-radius, 15px);
  border-style: var(--aside-border-style, solid);
  border-width: var(--aside-border-width, 1px 1px 1px 1px);
  padding: .9411764706rem;
  text-align: start;
}

aside .label[data-v-0ca053f3] {
  font-size: 1rem;
  line-height: 1.5294417647;
  font-weight: 600;
  letter-spacing: -.021em;
  font-family: var(--typography-html-font, "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Helvetica", "Arial", sans-serif);
}

aside .label+[data-v-0ca053f3] {
  margin-top: var(--spacing-stacked-margin-small);
}

/*! CSS Used from: https://developer.apple.com/tutorials/css/minimized.2cbd71d2.css */
[data-v-15d7e6ba] *+aside {
  margin-top: var(--spacing-stacked-margin-xlarge);
}
</style>
