<template>
  <div class="segmentnav-container">
    <ul ref="segmentNav" class="segmentnav">
      <div class="segmentnav-wrapper">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="segmentnav-item"
          @click="updateSelection(index)"
        >
          <input
            :id="item.id"
            type="radio"
            name="continuity-segment"
            :checked="index === selectedIndex"
          />
          <label :for="item.id" class="typography-segmentnav-item">{{ item.label }}</label>
        </li>
        <div
          ref="segmentNavSelectionBackground"
          class="segmentnav-selection-background"
          :style="{ width: `${selectionWidth}px`, transform: `translateX(${selectionX}px)` }"
        ></div>
      </div>
    </ul>
  </div>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
