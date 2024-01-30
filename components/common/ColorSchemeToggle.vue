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
          @change="setTheme(item.id)"
          :value="item.id"
          :checked="currentTheme === item.id"
        />
        <div class="text">
          <Icon
            v-if="variant !== 'label'"
            :name="item.icon"
            class="icon icon-large"
          />
          <div v-if="variant !== 'icon'">
            {{ item.label }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "icon" | "label" | "combination";
  }>(),
  {
    variant: "label",
  }
);

const { getTheme, setTheme } = useTheme();
const currentTheme = computed(() => getTheme());

const items = reactive([
  { id: "light", label: "Light", icon: "sun.max.fill" },
  { id: "dark", label: "Dark", icon: "moon.fill" },
  { id: "auto", label: "Auto", icon: "circle.lefthalf.filled" },
]);
</script>

<style scoped>
.color-scheme-toggle {
  border: 1px solid var(--color-figure-blue);
}

.color-scheme-toggle .text {
  color: var(--color-figure-blue);
}

.color-scheme-toggle input:checked + .text {
  color: white;
  background: var(--color-button-background);
  border-color: var(--color-button-background);
}

.content .color-scheme-toggle {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  border: 1px solid var(--color-fill-blue);
  border-radius: 25px;
  display: flex;
  padding: 1px;
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
  border-radius: 25px;
  text-align: center;
  color: var(--color-figure-blue);
}

.content .text:hover {
  cursor: pointer;
}

.content input[type="radio"]:checked + .text {
  background: var(--color-fill-blue);
  border-color: var(--color-fill-blue);
}
</style>
