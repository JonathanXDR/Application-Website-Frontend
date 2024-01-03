<template>
  <div class="rs-od-iteminfo">
    <h2 class="rs-od-itemtitle">
      <span class="rs-od-itemshortname">{{ language.eyebrow }} </span>
      <span class="rs-od-itemstatus">{{ language.title }}</span>
    </h2>
    <div class="rs-od-delivery-actions">
      <LinkCollection :links="language.links" />
    </div>
    <div
      id="rs-tracker-orderDetail.orderItems.orderItem-0000101.orderItemStatusTracker"
      class="rs-tracker as-l-container-full-small as-l-container-mobileoverflow"
    >
      <div class="as-l-container-mobileoverflow-content">
        <div class="rs-tracker-bar">
          <div class="rs-tracker-fill" :style="`width: ${language.progress}%`"></div>
        </div>
        <ol class="rs-tracker-status">
          <li
            v-for="(item, index) in status"
            :key="index"
            class="rs-status-tracker-status-list-item"
            style="width: 20%"
          >
            <span class="rs-status rs-status-current">{{ item }}</span>
          </li>
        </ol>
      </div>
    </div>
    <div class="row rs-od-itemdesc-wrapper">
      <div class="rs-od-itemdesc column large-12 small-12">
        <div class="rs-od-itemdesc-content">
          {{ language.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LanguageBarV2.ts"></script>
<style scoped src="./LanguageBarV2.css"></style>
