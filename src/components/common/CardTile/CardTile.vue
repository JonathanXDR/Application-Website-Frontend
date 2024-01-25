<template>
  <li class="tile nr-scroll-animation nr-scroll-animation--off" v-animation="{
    add: ['nr-scroll-animation--on'],
    remove: ['nr-scroll-animation--off']
  }">
    <div class="tile-content">
      <div class="tile-header">
        <h4 class="tile-headline typography-connection-tile-headline">
          {{ card.title }}
        </h4>
      </div>
      <div class="tile-body">
        <div class="grid-center">
          <svg class="hex-progress" x="0px" y="0px" viewBox="0 0 776 628">
            <path class="card-track" d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"></path>
            <path :style="{
              strokeDashoffset: ((100 - card.progress) / 100) * 2160
            }" class="card-fill" d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
              :stroke="`url(#color${card.title})`"></path>
            <text class="card-text" x="50%" y="61%">{{ card.progress }}%</text>
          </svg>
          <svg width="0" height="0">
            <defs>
              <linearGradient :id="`color${card.title}`" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
                <stop :stop-color="card.color1" />
                <stop offset="100%" :stop-color="card.color2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" src="./CardTile.ts"></script>
<style scoped src="./CardTile.css"></style>
