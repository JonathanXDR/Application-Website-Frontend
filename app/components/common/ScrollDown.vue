<script setup lang="ts">
import type { ExtendedSizeType } from '../../../shared/types/common/extended-size'

const props = withDefaults(
  defineProps<{
    componentSize?: ExtendedSizeType
    shadow?: boolean
    animation?: boolean
    embedded?: boolean
    sticky?: boolean
    show?: boolean
  }>(),
  {
    componentSize: 'medium',
    shadow: true,
    animation: true,
    embedded: false,
    sticky: false,
    show: false,
  },
)

const { componentSize, sticky } = props
const containerClass = computed(() => [
  componentSize,
  { 'down-chevron-container': !props.animation },
  { 'scroll-down-arrow': props.animation },
  { sticky },
])
</script>

<template>
  <div :class="containerClass">
    <div
      v-if="!animation"
      class="static-arrow-container"
    >
      <!-- <SFSymbol
      name="chevron.down"
      size="small"
      class="icon icon-show-more"
    /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="8"
        viewBox="0 0 15 8"
        fill="none"
        class="chevron-icon"
      >
        <path
          d="M14.2317 1.58276C14.4053 1.40254 14.5 1.18315 14.5 0.932417C14.5 0.407441 14.0896 -2.50137e-06 13.5688 -2.4786e-06C13.3083 -2.46722e-06 13.0716 0.101858 12.8901 0.282074L7.49211 5.76689L2.10992 0.282074C1.92841 0.101859 1.68377 -1.95909e-06 1.43123 -1.94805e-06C0.910372 -1.92529e-06 0.5 0.407442 0.5 0.932417C0.5 1.18315 0.594701 1.40254 0.76832 1.57492L6.76607 7.67091C6.97125 7.8903 7.22379 8 7.5 8C7.77621 8 8.01297 7.8903 8.22604 7.67875L14.2317 1.58276Z"
          class="chevron-icon"
        />
      </svg>
    </div>
    <div
      v-else
      :class="['arrow', { embedded }, { 'is-visible': show }]"
      aria-hidden="false"
    >
      <div class="arrow-btn">
        <span
          class="container"
          aria-hidden="true"
        >
          <!-- <SFSymbol
            name="chevron.down"
            size="small"
            class="icon icon-show-more"
          /> -->
          <svg
            viewBox="0 0 70.041 40.874"
            fill="none"
            width="17"
            height="17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.045 40.874C36.74 40.86 38.202 40.251 39.509 38.893L68.434 9.618C69.492 8.559 70.041 7.256 70.041 5.698 70.04 2.535 67.555 0 64.42 0 62.898 0 61.42.659 60.3 1.777L33.2 29.3H36.903L9.757 1.777C8.637.675 7.225 0 5.652 0 2.52 0 0 2.534 0 5.699 0 7.24.564 8.544 1.607 9.618L30.58 38.893C31.92 40.266 33.332 40.874 35.045 40.874Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ----------------------------- Static chevron ----------------------------- */
svg,
path {
  --color-transition-settings: 0.3s ease;
  transition:
    color var(--color-transition-settings),
    fill var(--color-transition-settings),
    stroke var(--color-transition-settings);
}
svg.chevron-icon.chevron-icon {
  position: absolute;
  bottom: 32px;
}
svg.chevron-icon path.chevron-icon {
  fill: var(--color-fill-gray);
}
.down-chevron-container {
  /* padding: 300px 0 100px 0; */
  /* position: sticky; */
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 150px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    0deg,
    var(--color-fill) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.down-chevron-container.sticky {
  position: sticky !important;
}

.icon-show-more {
  width: 0.9375em;
  height: 0.5em;
}

/* ---------------------------- Animated chevron ---------------------------- */
.text-module {
  color: var(--color-fill-gray);
  display: flex;
  justify-content: center;
  margin-block: var(--textModuleMarginBlockMdStart, 148px)
    var(--textModuleMarginBlockMdEnd, 84px);
  padding-inline: 20px;
  position: relative;
  text-align: center;
  word-break: break-word;
  z-index: calc(var(--z-default) + 2);
}
@media (min-width: 1260px) {
  .text-module {
    -moz-column-gap: 20px;
    column-gap: 20px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
}
@media (max-width: 743px) {
  .text-module {
    margin-block: var(--textModuleMarginBlockSmStart, 64px)
      var(--textModuleMarginBlockSmEnd, 48px);
  }
}
.text {
  text-wrap: balance;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.25;
  position: relative;
  transition:
    opacity 0.33s cubic-bezier(0.17, 0.17, 0, 1),
    transform 1s cubic-bezier(0.17, 0.17, 0, 1),
    color 0.25s ease;
  z-index: calc(var(--z-default) + 1);
}
@media (prefers-reduced-motion: no-preference) {
  .text {
    opacity: 0;
    transform: translateY(25px);
    transition:
      transform 0.5s cubic-bezier(0, 0, 0.5, 1),
      opacity 0.5s cubic-bezier(0, 0, 0.5, 1);
  }
  .text.will-change {
    will-change: opacity, transform;
  }
}
.scroll-section.hero-container .text {
  opacity: 1;
  transform: translateY(0);
}
@media (min-width: 1260px) {
  .text {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
    font-size: 48px;
    font-weight: 600;
    grid-column: 4 / span 6;
    letter-spacing: 0;
    line-height: 1.0834933333;
  }
}
.text em {
  font-style: normal;
  transition: color 0.25s ease;
}
@media (max-width: 1259px) {
  .text-large-bp {
    display: none;
  }
}
.scroll-down-arrow {
  /* bottom: -43px; */
  position: absolute;
  right: 0;
  transition: opacity 0.66s ease;
  width: 100%;
  z-index: var(--z-default);
}
/* @media (max-width: 743px) {
  .scroll-down-arrow {
    bottom: -27px;
  }
} */

.arrow {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.66s ease;
  width: 100%;
}
.arrow.is-visible {
  opacity: 1;
}
@media (max-width: 1259px) {
  .arrow {
    flex-shrink: 0;
  }
}
.arrow.embedded {
  inset-inline-start: 0;
}
@media (min-width: 484px) {
  .arrow.embedded {
    inset-inline-start: 33.8843vw;
  }
}
@media (min-width: 768px) {
  .arrow.embedded {
    inset-inline-start: 260px;
  }
}
.arrow-btn {
  align-items: center;
  animation: arrow-shimmer 2.8s ease infinite;
  display: flex;
  height: 7px;
  justify-content: center;
  padding-block-end: 17px;
  width: 21px;
}
@media (min-width: 744px) and (min-height: 744px) {
  .arrow-btn {
    padding-block-end: 24px;
  }
}
@keyframes arrow-shimmer {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  21% {
    opacity: 0.8;
    transform: translateY(0);
  }
  64% {
    opacity: 0.8;
    transform: translateY(100%);
  }
  76%,
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

.container {
  align-items: center;
  display: flex;
  justify-content: center;
  color: var(--color-fill-gray);
}

.xsmall .container,
.xsmall .container svg {
  height: 1em;
  width: 1em;
}

.small .container,
.small .container svg {
  height: 1.25em;
  width: 1.25em;
}

.medium .container,
.medium .container svg {
  height: 1.5em;
  width: 1.5em;
}

.large .container,
.large .container svg {
  height: 2em;
  width: 2em;
}

.xlarge .container,
.xlarge .container svg {
  height: 3em;
  width: 3em;
}

.icon-show-more {
  width: 1.0625em;
  height: 1.0625em;
}
</style>
