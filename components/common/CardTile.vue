<template>
  <li
    class="tile nr-scroll-animation nr-scroll-animation--off"
    :class="{ expanded: cardOpen }"
    v-animation="{
      add: ['nr-scroll-animation--on'],
      remove: ['nr-scroll-animation--off'],
    }"
  >
    <div class="tile-content">
      <div class="tile-header">
        <h4 class="tile-headline typography-connection-tile-headline">
          {{ card.title }}
        </h4>
      </div>
      <div class="tile-body">
        <div class="grid-center">
          <svg class="hex-progress" x="0px" y="0px" viewBox="0 0 776 628">
            <path
              class="card-track"
              d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
            ></path>
            <path
              :style="{
                strokeDashoffset: ((100 - card.progress) / 100) * 2160,
              }"
              class="card-fill"
              d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
              :stroke="`url(#color${card.title})`"
            ></path>
            <text class="card-text" x="50%" y="61%">{{ card.progress }}%</text>
          </svg>
          <svg width="0" height="0">
            <defs>
              <linearGradient
                :id="`color${card.title}`"
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop :stop-color="card.color1" />
                <stop offset="100%" :stop-color="card.color2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <input
      type="checkbox"
      class="tile-overlay-toggle"
      v-model="cardOpen"
      :id="`input${card.title}`"
    />
    <div class="tile-overlay">
      <label class="tile-button-wrapper" :for="`input${card.title}`">
        <span class="tile-button">
          <svg
            class="tile-icon-alt"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M17.25,8.51H11.5V2.75A1.5,1.5,0,0,0,10,1.25h0a1.5,1.5,0,0,0-1.5,1.5V8.5H2.75a1.5,1.5,0,0,0,0,3H8.5v5.75a1.5,1.5,0,0,0,1.5,1.5h0a1.5,1.5,0,0,0,1.5-1.5V11.5h5.75a1.5,1.5,0,0,0,0-3Z"
            ></path>
          </svg>
        </span>
      </label>
      <div class="tile-overlay-content">
        <h4 class="typography-connection-tile-headline">{{ card.title }}</h4>

        <p>
          <strong>
            {{ $t('components.common.CardTile.firstEncounter') }}:</strong
          >
          {{ card.learned }}
          <br />
          <strong> {{ $t('components.common.CardTile.enhanced') }}:</strong>
          {{ card.enhanced }}
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { CardTileType } from '~/types/common/CardTile';

defineProps({
  card: {
    type: Object as PropType<CardTileType>,
    required: true,
    default: () => ({}),
  },
});

const cardOpen = ref(false);
</script>

<style scoped>
/* ---------------------------------- tile ---------------------------------- */

.tile {
  height: 300px;
  position: relative;
  background-color: var(--color-fill);
  border-radius: 18px;
  transition: box-shadow, transform 0.16s ease-out;
}

.tile:hover {
  box-shadow: 0 5px 10px var(--color-welcome-card-shadow);
  transform: scale(1.007);
}

@media screen and (min-width: 900px) {
  .tile {
    height: 350px !important;
  }
}

@media screen and (min-width: 1250px) {
  .tile {
    height: 400px !important;
  }
}

/* ------------------------------ tile-content ------------------------------ */

.tile-content {
  height: 100%;
  display: grid;
  grid-template-areas: 'tile-body' 'tile-header';
  grid-template-rows: auto 58px;
  transition: opacity 0.5s ease-in-out;
}

.expanded .tile-content {
  visibility: hidden;
  opacity: 0;
  transition: none;
}

/* ------------------------------- tile-header ------------------------------ */

.tile-header {
  text-align: left;
  grid-area: tile-header;
  padding-left: 45px;
}

/* ------------------------------ tile-headline ----------------------------- */

.tile-headline {
  display: inline-block;
  bottom: 30px;
}

/* ------------------- typography-connection-tile-headline ------------------ */

.typography-connection-tile-headline {
  font-size: 19px;
  line-height: 1.1666666667;
  font-weight: 600;
  /* letter-spacing: 0.009em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

@media screen and (min-width: 900px) {
  .typography-connection-tile-headline {
    font-size: 24px !important;
  }
}

/* -------------------------------- tile-body ------------------------------- */

.tile-body {
  grid-area: tile-body;
  display: grid;
}

/* ------------------------------- grid-center ------------------------------ */

.grid-center {
  align-self: center;
  justify-self: center;
}

/* ------------------------------ hex-progress ------------------------------ */

.hex-progress {
  width: 175px;
  height: 225px;
  align-self: center;
  justify-self: center;
}

@media screen and (min-width: 900px) {
  .hex-progress {
    width: 200px !important;
  }
}

@media screen and (min-width: 1250px) {
  .hex-progress {
    width: 200px !important;
  }
}

/* ------------------------------- card-track ------------------------------- */

.card-fill,
.card-track {
  fill: transparent;
  stroke-width: 60;
  transform: translate(70px, 700px) rotate(-90deg);
}

.card-track {
  stroke: var(--color-fill-tertiary);
}

/* -------------------------------- card-fill ------------------------------- */

.card-fill {
  stroke-linecap: round;
  stroke-dasharray: 2160;
  stroke-dashoffset: 2160;
  transition: stroke-dashoffset 1s;
}

/* -------------------------------- card-text ------------------------------- */

.card-text {
  fill: var(--color-fill-gray);
  font-weight: 600;
  font-size: 125px;
  text-anchor: middle;
}

/* --------------------------- tile-overlay-toggle -------------------------- */

.tile-overlay-toggle {
  display: none;
}

.tile-overlay-toggle:checked ~ .tile-overlay .tile-button {
  transform: rotate(45deg);
  transition: transform 0.5s ease-in-out;
}

.tile-overlay-toggle:checked ~ .tile-overlay .tile-overlay-content {
  opacity: 1;
  visibility: visible;
}

/* --------------------------- tile-button-wrapper -------------------------- */

.tile-button-wrapper {
  width: 37px;
  height: 37px;
  bottom: 26px;
  right: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

/* ------------------------------- tile-button ------------------------------ */

.tile-button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--color-code-plain);
  color: var(--color-fill);
  transition: transform 0.5s cubic-bezier(0.66, 0, 0.2, 1);
  z-index: 2;
}

@media screen and (min-width: 900px) {
  .tile-button {
    width: 33px !important;
    height: 33px !important;
  }
}

.tile-button:hover {
  background-color: var(--color-tile-button);
  color: var(--color-fill);
}

/* ------------------------------ tile-icon-alt ----------------------------- */

.tile-icon-alt {
  fill: currentColor;
  width: 50%;
  height: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* -------------------------- tile-overlay-content -------------------------- */

.tile-overlay-content {
  box-sizing: border-box;
  text-align: left;
  background-color: var(--color-fill);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 50px 65px 60px 45px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out;
  border-radius: 18px;
}
</style>
