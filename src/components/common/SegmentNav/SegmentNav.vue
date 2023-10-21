<template>
  <div class="segmentnav-container">
    <ul ref="segmentNav" class="segmentnav">
      <li
        v-for="(segment, index) in segments"
        :key="index"
        class="segmentnav-item"
        :ref="(el) => handleRef(el, index)"
      >
        <input
          :id="segment.id"
          type="radio"
          name="continuity-segment"
          :checked="segment.id === selectedSegment"
          @change="onSegmentChange(segment.id)"
        />
        <label :for="segment.id" class="typography-segmentnav-item">
          {{ segment.label }}
        </label>
      </li>
      <div
        ref="segmentNavSelectionBackground"
        class="segmentnav-selection-background"
        :style="{ width: selectionWidth + 'px', transform: 'translateX(' + translateX + 'px)' }"
      ></div>
    </ul>
  </div>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
