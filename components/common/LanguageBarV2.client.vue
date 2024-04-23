<template>
  <div class="rs-od-iteminfo">
    <!-- <h2 class="rs-od-itemtitle">
      <span class="rs-od-itemshortname">{{ eyebrow }} </span>
      <span class="rs-od-itemstatus">{{ title }}</span>
    </h2>
    <div class="rs-od-delivery-actions">
      <LinkCollection :links="links" />
    </div> -->
    <InfoBar :info="info" />
    <div
      id="rs-tracker-orderDetail.orderItems.orderItem-0000101.orderItemStatusTracker"
      class="rs-tracker as-l-container-full-small as-l-container-mobileoverflow"
    >
      <div class="as-l-container-mobileoverflow-content">
        <div class="rs-tracker-bar">
          <div
            class="rs-tracker-fill"
            :style="`width: ${language.progress}%`"
          />
        </div>
        <ol class="rs-tracker-status">
          <!-- <li
            v-for="(item, index) in status"
            :key="index"
            class="rs-status-tracker-status-list-item"
            style="width: 20%"
          >
            <span class="rs-status rs-status-current">{{ item }}</span>
          </li> -->
          <li
            class="rs-status-tracker-status-list-item"
            :style="`width: ${progress}%`"
          >
            {{ progress }}
          </li>
        </ol>
      </div>
    </div>
    <!-- <div class="row rs-od-itemdesc-wrapper">
      <div class="rs-od-itemdesc column large-12 small-12">
        <div class="rs-od-itemdesc-content">
          {{ description }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { LanguageBarType } from '~/types/common/LanguageBar'

defineProps<LanguageBarType>()

const status = [
  'Order Placed',
  'Processing',
  'Preparing to Ship',
  'Shipped',
  'Delivered',
]
</script>

<style scoped>
.column {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.large-7 {
  flex-basis: 58.33333%;
  max-width: 58.33333%;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .small-12 {
    flex-basis: 100%;
    max-width: 100%;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    white-space: nowrap;
    width: auto;
  }
  .as-l-container-mobileoverflow::-webkit-scrollbar {
    display: none;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow-content {
    box-sizing: border-box;
    display: inline-block;
    min-width: 100%;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow-content {
    width: auto;
    padding-left: calc(50vw - 43.75%);
    padding-right: calc(50vw - 43.75%);
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-full-small {
    margin-left: -7.14286%;
    margin-right: -7.14286%;
  }
}

.rs-od-item .rs-od-iteminfo {
  font-size: 14px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  margin: auto 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-item .rs-od-iteminfo {
    padding-top: 26px;
  }
}
.rs-od-item .rs-od-delivery-action {
  display: inline-block;
  margin: 0 30px 0 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-item .rs-od-delivery-action {
    margin: 0 0 7px;
    display: block;
  }
}
.rs-od-itemtitle {
}
.rs-od-itemshortname {
  font-size: 12px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
.rs-od-itemstatus {
  font-size: 32px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  display: block;
  padding-top: 6px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-itemstatus {
    font-size: 28px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-itemstatus {
    font-size: 24px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-itemstatus {
    padding: 7px 0 3px;
  }
}
.rs-od-itemdesc-wrapper {
  padding-top: 12px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-itemdesc-wrapper {
    padding-top: 0;
  }
}
.rs-od-itemdesc-wrapper .rs-od-itemdesc {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-itemdesc-wrapper .rs-od-itemdesc {
    padding-top: 12px;
  }
}
.rs-tracker {
  padding: 22px 0 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-tracker {
    overflow-x: scroll;
    padding: 18px 0 0;
  }
}
.rs-tracker .rs-tracker-bar {
  box-sizing: border-box;
  border-radius: 5px;
  background-color: var(--color-fill-gray-tertiary);
}
.rs-tracker .rs-tracker-fill {
  height: 6px;
  border-radius: inherit;
  overflow: hidden;
  transition: width 1s ease-in-out;
  /* background-color: var(--color-figure-green); */
  background-color: var(--color-fill-gray);
}
.rs-tracker .rs-tracker-status {
  font-size: 12px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: var(--color-figure-gray-secondary);
  margin: 12px 0;
  width: inherit;
  position: relative;
}
.rs-tracker .rs-tracker-status li {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  vertical-align: top;
}
.rs-tracker .rs-tracker-status li:first-child {
  text-align: left;
}
.rs-tracker .rs-tracker-status li:last-child {
  text-align: right;
}
.rs-tracker .rs-tracker-status .rs-status {
  white-space: normal;
  word-wrap: break-word;
}
.rs-tracker .rs-tracker-status .rs-status-current {
  font-weight: 600;
  color: var(--color-fill-gray);
}
.rs-tracker .rs-tracker-status .rs-status-a11y {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
.rs-od-delivery-actions {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  display: flex;
  align-items: flex-end;
  padding: 8px 0 2px;
  margin-top: 0;
}
.rs-od-delivery-actions .rs-od-delivery-action {
  display: inline-block;
  margin: 0 30px 0 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-delivery-actions .rs-od-delivery-action {
    margin: 0 0 7px;
    display: block;
  }
}
.rs-od-delivery-actions:empty {
  margin-top: 0;
  padding: 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rs-od-delivery-actions {
    padding: 6px 0 2px;
    display: block;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    white-space: nowrap;
    width: auto;
  }
  .as-l-container-mobileoverflow::-webkit-scrollbar {
    display: none;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow-content {
    box-sizing: border-box;
    display: inline-block;
    min-width: 100%;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-mobileoverflow-content {
    width: auto;
    padding-left: calc(50vw - 43.75%);
    padding-right: calc(50vw - 43.75%);
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .as-l-container-full-small {
    margin-left: -7.14286%;
    margin-right: -7.14286%;
  }
}
</style>
