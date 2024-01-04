<template>
  <svg :style="styles">
    <use :href="icon" />
  </svg>
</template>

<script lang="ts">
export default defineComponent({
  name: "Icon",
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
    size: {
      type: String as PropType<"small" | "large" | "full">,
      required: false,
      default: "medium",
    },
    colors: {
      type: Object as PropType<{
        primary?: string;
        secondary?: string;
        tertiary?: string;
      }>,
      required: false,
      default: () => ({
        primary: "currentColor",
        secondary: "currentColor",
        tertiary: "currentColor",
      }),
    },
  },
  setup(props) {
    const icon = computed(() => `${getSpriteUrl(props.size)}#${props.name}`);

    const getSpriteUrl = (size: "small" | "large" | "full") => {
      return new URL(
        `/src/assets/icons/${size}/symbol/sprite.svg`,
        import.meta.url
      ).href;
    };

    const styles = reactive({
      "--color-primary": props.colors.primary || "currentColor",
      "--color-secondary": props.colors.secondary || "currentColor",
      "--color-tertiary": props.colors.tertiary || "currentColor",
    });

    return { icon, styles };
  },
});
</script>

<style>
.icon.icon-xsmall {
  width: 0.5em;
  height: 0.5em;
}

.icon.icon-small {
  width: 0.75em;
  height: 0.75em;
}

.icon.icon-medium {
  width: 1em;
  height: 1em;
}

.icon.icon-large {
  width: 1.25em;
  height: 1.25em;
}

.icon.icon-xlarge {
  width: 1.5em;
  height: 1.5em;
}

.icon.icon-xxlarge {
  width: 1.75em;
  height: 1.75em;
}

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
</style>
