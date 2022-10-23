<template>
  <li class="tile" :class="{ expanded: cardOpen }">
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
          Erster Kontakt: {{ card.learned }}
          <br />
          Vertiefungen: {{ card.enhanced }}
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts" src="./CardTile.ts"></script>
<style scoped src="./CardTile.css"></style>
