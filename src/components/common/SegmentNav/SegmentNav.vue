<template>
  <div class="segmentnav-container">
    <ul ref="segmentNav" class="segmentnav">
      <div class="segmentnav-wrapper">
        <li v-for="(item, index) in items" :key="index" :class="{ 'segmentnav-item': true }">
          <input
            :id="item.id"
            type="radio"
            name="category"
            v-model="selectedIndex"
            :value="index"
          />
          <label :for="item.id" class="typography-segmentnav-item">{{ item.label }}</label>
        </li>
        <div v-if="isLoaded" class="segmentnav-selection-background" :style="selectionStyle"></div>
      </div>
    </ul>
  </div>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
