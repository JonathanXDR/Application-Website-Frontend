<template>
  <div class="content">
    <div
      class="color-scheme-toggle"
      role="radiogroup"
      tabindex="0"
      aria-label="Select a color scheme preference"
    >
      <label v-for="(item, index) in items" :key="index" :for="item.id">
        <input
          :id="item.id"
          type="radio"
          autocomplete="off"
          name="color-scheme"
          :onchange="`window.setPreferredColorScheme(${item.id})`"
          :value="item.id"
          :checked="item.checked"
        />
        <div class="text">
          <Icon
            v-if="props.variant !== 'label'"
            :name="item.icon"
            class="icon icon-large"
          />
          <div v-if="props.variant !== 'icon'">
            {{ item.label }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "ColorSchemeToggle",
  props: {
    variant: {
      type: String as PropType<"icon" | "label" | "combination">,
      default: "label",
    },
  },
  setup(props) {
    const items = reactive([
      { id: "light", label: "Light", icon: "sun.max.fill", checked: false },
      { id: "dark", label: "Dark", icon: "moon.fill", checked: false },
      {
        id: "auto",
        label: "Auto",
        icon: "circle.lefthalf.filled",
        checked: true,
      },
    ]);

    return {
      items,
      props,
    };
  },
});
</script>

<style scoped>
.color-scheme-toggle {
  border: 1px solid var(--toggle-color-text);
}

.color-scheme-toggle .text {
  color: var(--toggle-color-text);
}

.color-scheme-toggle input:checked + .text {
  color: var(--color-button-text);
  background: var(--color-button-background);
  border-color: var(--color-button-background);
}

.dmf input {
  color: -internal-light-dark(white, black);
}

.content {
  --toggle-border-radius-outer: 12px;
  --toggle-border-radius-inner: 10px;
  --toggle-color-fill: var(--color-button-background-active);
  --toggle-color-text: var(--color-fill-blue);
  flex-shrink: 0;
}

.content .color-scheme-toggle {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica",
    "Arial", sans-serif;
  border: 1px solid var(--toggle-color-fill);
  border-radius: var(--toggle-border-radius-outer, 2px);
  display: flex;
  padding: 1px;
}

@media screen {
  [data-color-scheme="dark"] .content .color-scheme-toggle {
    --toggle-color-text: var(--color-figure-blue);
  }
}

.content [role="radiogroup"]:focus {
  outline: none;
}

.content input[type="radio"] {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
  appearance: none;
}

.content .text {
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  padding: 1px 6px;
  border: 1px solid transparent;
  border-radius: var(--toggle-border-radius-inner, 2px);
  text-align: center;
  color: var(--toggle-color-text);
}

.content .text:hover {
  cursor: pointer;
}

.content input[type="radio"]:checked + .text {
  --toggle-color-text: var(--color-button-text);
  background: var(--toggle-color-fill);
  border-color: var(--toggle-color-fill);
}
</style>
