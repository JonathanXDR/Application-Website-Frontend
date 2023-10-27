<template>
  <fieldset class="tile">
    <DropDown :options="segmentNavOptions" />
    <div class="segmentnav-container">
      <ul ref="segmentNavEl" class="segmentnav">
        <div class="segmentnav-wrapper">
          <li v-for="(item, index) in segmentNavItems" :key="index" class="segmentnav-item">
            <input
              :id="'segment-' + item.id"
              type="radio"
              name="category"
              v-model="currentIndex"
              :value="index"
            />
            <label :for="'segment-' + item.id" class="typography-segmentnav-item">
              {{ item.label }}
            </label>
          </li>
          <div
            v-if="!loading"
            class="segmentnav-selection-background"
            :style="selectionStyle"
          ></div>
        </div>
      </ul>
    </div>
  </fieldset>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
