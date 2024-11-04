<template>
  <aside
    :class="[
      variant,
      'flash flex items-center justify-between fade-transition-wrapper',
      { 'r-fade-transition-enter-done': open },
      { 'r-fade-transition-exit-done': !open },
    ]"
    :style="{
      backgroundColor: `var(--color-aside-${variant}-background)`,
      borderColor: `var(--color-aside-${variant}-border)`,
      boxShadow: `0 0 1px 0 var(--color-aside-${variant}-border) inset, 0 0 1px 0 var(--color-aside-${variant}-border)`,
    }"
  >
    <div
      class="w-full flex items-start gap-3"
      :style="{ overflowWrap: 'anywhere' }"
    >
      <SFSymbol
        v-if="icon.variant === 'default' || (icon.variant === 'custom' && icon)"
        class="icon icon-medium m-1"
        :name="
          icon.variant === 'custom' ? icon?.name || '' : icons[variant].name
        "
        :colors="
          icon.variant === 'custom' ? icon?.colors : icons[variant].colors
        "
      />
      <div class="w-full">
        <p
          class="label"
          :style="{
            color: `var(--color-aside-${variant})`,
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
      class="modal-close-button"
      :style="{ transform: 'scale(0.75)' }"
      @click="toggleOpen()"
    >
      <span class="modal-close-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"
          />
        </svg>
      </span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import type { FlashAlertType } from "#shared/types/common/flash-alert";

const properties = withDefaults(defineProps<FlashAlertType>(), {
  variant: "note",
  title: undefined,
  icon: () => ({ variant: "default", name: "" }),
});

const icons = {
  deprecated: {
    name: "nosign",
    colors: {
      primary: `var(--color-aside-${properties.variant})`,
    },
  },
  experiment: {
    name: "flask.fill",
    colors: {
      primary: `var(--color-aside-${properties.variant})`,
      tertiary: `var(--color-aside-${properties.variant})`,
    },
  },
  important: {
    name: "exclamationmark.triangle.fill",
    colors: {
      primary: "var(--color-fill)",
      tertiary: `var(--color-aside-${properties.variant})`,
    },
  },
  note: {
    name: "info.circle.fill",
    colors: {
      primary: "var(--color-fill)",
      tertiary: `var(--color-aside-${properties.variant})`,
    },
  },
  tip: {
    name: "questionmark.circle.fill",
    colors: {
      primary: "var(--color-fill)",
      tertiary: `var(--color-aside-${properties.variant})`,
    },
  },
  warning: {
    name: "exclamationmark.octagon.fill",
    colors: {
      primary: "var(--color-fill)",
      tertiary: `var(--color-aside-${properties.variant})`,
    },
  },
};

const open = ref(true);
const toggleOpen = useToggle(open);
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
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}

aside .label + .description {
  margin-top: var(--spacing-stacked-margin-small);
  margin-inline: var(--spacing-stacked-margin-small);
}

aside {
  margin-top: var(--spacing-stacked-margin-xlarge);
  margin-inline: var(--spacing-stacked-margin-xlarge);
}

.flash {
  width: 90%;
  margin-left: auto !important;
  margin-right: auto !important;
}

@media screen and (min-width: 1280px) {
  .flash {
    width: 82.5%;
  }
}

.fade-transition-wrapper {
  opacity: 0;
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.r-fade-transition-enter-done {
  opacity: 1;
}

.r-fade-transition-exit-done {
  display: none;
}

.modal-close-button {
  cursor: pointer;
  position: var(--modal-close-button-position);
  -webkit-box-ordinal-group: 2;
  -ms-flex-order: 1;
  order: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* -ms-flex-item-align: end;
  align-self: flex-end; */
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: var(--modal-close-button-size);
  width: var(--modal-close-button-size);
  margin: 0;
  padding: 0;
  border: 0;
  /* -webkit-margin-end: var(--modal-close-button-offset-inline-start);
  margin-inline-end: var(--modal-close-button-offset-inline-start);
  margin-top: var(--modal-close-button-offset-top); */
  top: var(--modal-close-button-offset-top);
}
.modal-close-button {
  cursor: pointer;
}
.modal-close-button:hover .modal-close-icon {
  background: var(--modal-close-background-hover);
  color: var(--modal-close-color-hover);
}
.modal-close-button:active .modal-close-icon {
  background: var(--modal-close-background-active);
}
.modal-close-button .modal-close-icon {
  background: var(--modal-close-background);
  border-radius: var(--modal-close-border-radius);
  color: var(--modal-close-color);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: var(--modal-close-icon-size);
  width: var(--modal-close-icon-size);
  outline: none;
  -webkit-transition:
    color 100ms linear,
    background 100ms linear;
  transition:
    color 100ms linear,
    background 100ms linear;
  position: relative;
}
.modal-close-button .modal-close-icon svg {
  fill: currentColor;
  position: absolute;
  inset-inline-start: 50%;
  height: var(--modal-close-icon-svg-size);
  width: var(--modal-close-icon-svg-size);
}
html:not([dir="rtl"]) .modal-close-button .modal-close-icon svg {
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.modal-close-button .modal-close-icon * {
  pointer-events: none;
}
</style>
