<template>
  <div class="rs-covers rs-covers-preorder">
    <div class="rs-covers-transtion theme-dark r-fade-transition-enter-done">
      <div
        class="rs-covers-container rs-covers-media-default rs-covers-textovervideo as-l-container"
      >
        <div class="rs-covers-media-container">
          <div
            id="rs-covers-media"
            class="rc-videoplayer rs-covers-media-wrapper rc-videoplayer-muted rc-videoplayer-stalled rc-videoplayer-medium"
          >
            <Icon name="wrench.and.screwdriver.fill" class="rs-covers-media-img" />
            <!-- <video
              class="rc-video rs-covers-media"
              preload="metadata"
              loop
              autoplay
              playsinline
              aria-label="From red to violet, a spectrum of streaming colors outlines the Apple logo."
              role="img"
            >
              <source
                src="https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/media/app-covers-apple-outline.mp4"
                type="video/mp4"
              />
              <p>Video is not supported</p>
            </video>
            <div class="rc-videoplayer-poster">
              <img
                alt=""
                src="https://store.storeimages.cdn-apple.com/1/store.apple.com/shop/rs-covers/2/dist/images/covers-apple-outline.jpg"
              />
            </div> -->
          </div>
          <button type="button" class="rs-covers-mediabtn icon icon-after icon-thumbnailplay">
            <span class="visuallyhidden">play animation</span>
          </button>
        </div>
        <div class="rs-covers-content-container">
          <h1 class="rs-covers-heading">
            <span>We can't wait either.</span>
            <!-- <span>Be right back.</span> -->
          </h1>
          <div class="rs-covers-desc">
            Pre-order begins at 5:00 a.m. PDT. <span class="nowrap">See you then.</span>
          </div>
          <!-- <div class="rs-covers-desc">
            We're making updates to the Apple Store. <span class="nowrap">Check back soon.</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="theme-dark rs-covers-footer">
      <div class="as-l-container">Copyright © 2023 Apple Inc. All rights reserved.</div>
    </div>
  </div>
</template>

<script lang="ts" src="./MaintenanceView.ts"></script>
<style scoped src="./MaintenanceView.css"></style>
