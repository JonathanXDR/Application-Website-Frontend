<template>
  <aside
    :class="variant"
    :style="{
      backgroundColor: `var(--color-aside-${variant}-background)`,
      borderColor: `var(--color-aside-${variant}-border)`,
      boxShadow: `0 0 1px 0 var(--color-aside-${variant}-border) inset, 0 0 1px 0 var(--color-aside-${variant}-border)`
    }"
  >
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
</style>
