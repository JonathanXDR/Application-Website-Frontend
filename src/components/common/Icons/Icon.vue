<template>
  <svg v-if="viewBox" :viewBox="viewBox">
    <use :href="icon" />
  </svg>
  <LoadingSpinner v-else-if="!chevron" class="medium no-margin" />
</template>

<script lang="ts">
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Icon',
  components: { LoadingSpinner },
  props: {
    name: { type: String, required: true },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => ['small', 'medium', 'large'].includes(value)
    }
  },
  setup(props) {
    const viewBox = ref('')
    const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`)
    const chevron = computed(() => props.name.startsWith('chevron.'))

    const getSpriteUrl = (size) => {
      return new URL(`/src/assets/icons/${size}/symbol/sprite.svg`, import.meta.url).href
    }

    onMounted(async () => {
      const response = await fetch(getSpriteUrl(props.size))
      const text = await response.text()
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(text, 'image/svg+xml')
      const symbol = svgDoc.getElementById(props.name)
      if (symbol) {
        viewBox.value = symbol.getAttribute('viewBox') || ''
      }
    })

    return { viewBox, icon, chevron }
  }
})
</script>

<style>
.apple-logo {
  width: 100%;
  height: 330px;
}

.apple-logo path {
  fill: none;
  stroke: var(--color-fill-gray);
  stroke-width: 0.2;
}

.media-icon {
  width: 5em;
  height: 5em;
}

@media screen and (min-width: 1069px) {
  .media-icon {
    width: 10em;
    height: 10em;
  }
}

.icon-article {
  width: 1.25em;
  height: 1.25em;
}

#projects .icon-article {
  width: 1.5em !important;
  height: 1.5em !important;
}

.link .link-icon {
  /* height: 0.6em;
  width: 0.6em; */
  height: 0.75em;
  width: 0.75em;
  margin-left: 0.3em;
}

.svg-icon {
  fill: var(--colors-svg-icon-fill-light, var(--color-svg-icon));
  transform: scale(1);
  -webkit-transform: scale(1);
  overflow: visible;
}

.svg-icon.icon-inline {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
