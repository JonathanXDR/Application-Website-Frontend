<template>
  <div class="tablist-wrapper">
    <div class="tabnav">
      <ul role="tablist" class="tabnav-items">
        <li role="presentation" class="tabnav-item current">
          <a
            href="#versatility-gallery-item-1"
            id="versatility-gallery-item-1-trigger"
            class="tabnav-link current"
            role="tab"
            tabindex="0"
            >Productivity</a
          >
        </li>
        <li role="presentation" class="tabnav-item">
          <a
            href="#versatility-gallery-item-2"
            id="versatility-gallery-item-2-trigger"
            class="tabnav-link"
            role="tab"
            tabindex="-1"
            >Gaming</a
          >
        </li>
        <li role="presentation" class="tabnav-item">
          <a
            href="#versatility-gallery-item-3"
            id="versatility-gallery-item-3-trigger"
            class="tabnav-link"
            role="tab"
            tabindex="-1"
            >Audio and video production</a
          >
        </li>
        <li role="presentation" class="tabnav-item">
          <a
            href="#versatility-gallery-item-4"
            id="versatility-gallery-item-4-trigger"
            class="tabnav-link"
            role="tab"
            tabindex="-1"
            >Software development</a
          >
        </li>
      </ul>
      <div class="tabnav-paddles">
        <button class="tabnav-paddle tabnav-paddle-left" aria-hidden="true" disabled></button>
        <button class="tabnav-paddle tabnav-paddle-right" aria-hidden="true" disabled></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./TabList.ts"></script>
<style scoped src="./TabList.css"></style>
