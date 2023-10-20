<template>
  <div class="segmentnav-container">
    <div class="segmentnav" role="tablist" aria-orientation="horizontal">
      <button
        id="continuity-segment-handoff"
        class="typography-segmentnav-item segmentnav-item current"
        value="handoff"
        role="tab"
        aria-controls="continuity-gallery-item-handoff"
        aria-selected="true"
        tabindex="0"
      >
        Handoff
      </button>
      <button
        id="continuity-segment-reading-list"
        class="typography-segmentnav-item segmentnav-item"
        value="reading-list"
        role="tab"
        aria-controls="continuity-gallery-item-reading-list"
        aria-selected="false"
        tabindex="-1"
      >
        Reading List
      </button>
      <button
        id="continuity-segment-icloud-keychain"
        class="typography-segmentnav-item segmentnav-item"
        value="icloud-keychain"
        role="tab"
        aria-controls="continuity-gallery-item-icloud-keychain"
        aria-selected="false"
        tabindex="-1"
      >
        iCloud Keychain
      </button>
      <div
        class="segmentnav-selection-background"
        role="presentation"
        style="width: 107px; transform: translateX(0.008px)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
