<template>
  <span class="badge" :style="`--color-figure: var(--color-figure-${props.color})`">
    <Icon v-if="props.icon" :name="props.icon.name" :size="props.icon.size" :colors="props.icon.colors" />
    {{ props.title }}
  </span>
</template>

<script lang="ts">
import type { IconType } from '~/types/common/Icon';

export default defineComponent({
  name: "Badge",
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
    color: {
      type: String as PropType<string>,
      required: false,
      default: "blue",
    },
    icon: {
      type: Object as PropType<IconType>,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});

</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  font-size: 11px;
  line-height: 1.3333733333;
  font-weight: 400;
  letter-spacing: -.01em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  padding-inline: 10px;
  white-space: nowrap;
  background: none;
  border-radius: 18px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--color-figure);
  color: var(--color-figure);
}

.small .badge {
  font-size: 12px;
  font-weight: 400;
}

.medium .badge {
  font-size: 17px;
  font-weight: 500;
}

.large .badge {
  font-size: 21px;
  font-weight: 600;
}
</style>