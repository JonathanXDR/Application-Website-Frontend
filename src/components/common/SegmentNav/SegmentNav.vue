<template>
  <div class="segmentnav-container">
    <ul ref="segmentNav" class="segmentnav">
      <li class="segmentnav-item">
        <input id="handoff" type="radio" name="continuity-segment" checked />
        <label for="handoff" class="typography-segmentnav-item"> Handoff </label>
      </li>
      <li class="segmentnav-item">
        <input id="reading-list" type="radio" name="continuity-segment" />
        <label for="reading-list" class="typography-segmentnav-item"> Reading List </label>
      </li>
      <li class="segmentnav-item">
        <input id="icloud-keychain" type="radio" name="continuity-segment" />
        <label for="icloud-keychain" class="typography-segmentnav-item"> iCloud Keychain </label>
      </li>
      <!-- <button
        id="continuity-segment-handoff"
        class="typography-segmentnav-item segmentnav-item current"
        value="handoff"
        tabindex="0"
      >
        Handoff
      </button>
      <button
        id="continuity-segment-reading-list"
        class="typography-segmentnav-item segmentnav-item"
        value="reading-list"
        tabindex="-1"
      >
        Reading List
      </button>
      <button
        id="continuity-segment-icloud-keychain"
        class="typography-segmentnav-item segmentnav-item"
        value="icloud-keychain"
        tabindex="-1"
      >
        iCloud Keychain
      </button> -->
      <div
        class="segmentnav-selection-background"
        style="width: 124px; transform: translateX(107.008px)"
      ></div>
    </ul>
  </div>
</template>

<script lang="ts" src="./SegmentNav.ts"></script>
<style scoped src="./SegmentNav.css"></style>
