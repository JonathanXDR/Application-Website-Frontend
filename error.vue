<template>
  <NuxtLayout>
    <div class="rs-covers rs-covers-preorder">
      <!-- NavBar -->
      <div
        data-core-fade-transition-wrapper
        class="rs-covers-transtion r-fade-transition-enter-done"
      >
        <div class="rs-covers-container rs-covers-media-default as-l-container">
          <div class="rs-covers-media-container">
            <div
              id="rs-covers-media"
              data-analytics-id="rs-covers-media"
              class="rc-videoplayer rs-covers-media-wrapper rc-videoplayer-muted rc-videoplayer-stalled rc-videoplayer-medium"
            >
              <Icon
                :name="$t(`pages.${currentKey}.icon.name`)"
                :colors="colors"
                class="rs-covers-media-icon media-icon"
              />
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
                  src="https://store.storeimages.cdn-apple.com/2/store.apple.com/shop/rs-covers/2/dist/media/apple-outline-large.mp4"
                  type="video/mp4"
                />
                <p>Video is not supported</p>
              </video>
              <div class="rc-videoplayer-poster">
                <img
                  alt=""
                  src="https://store.storeimages.cdn-apple.com/2/store.apple.com/shop/rs-covers/2/dist/images/apple-outline-large.jpg"
                />
              </div> -->
            </div>
            <button
              type="button"
              class="rs-covers-mediabtn icon icon-after icon-thumbnailplay"
            >
              <span class="visuallyhidden">play animation</span>
            </button>
          </div>
          <div class="rs-covers-content-container">
            <h1 class="rs-covers-heading">
              <span>{{ title }}</span>
            </h1>
            <div class="rs-covers-desc">
              {{ description[0] }}. <br>{{ description[1] }}
            </div>
          </div>
        </div>
      </div>
      <!-- CompactFooter -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError()
const { t, tm } = useI18n()
const pages = {
  notFound: 404,
  internalServerError: 500,
  serviceUnavailable: 503,
  error: error.value?.statusCode,
}

const currentKey = computed(() => {
  return (
    Object.keys(pages).find(
      (key: string) =>
        pages[key as keyof typeof pages] === error.value?.statusCode,
    ) || 'error'
  )
})

const title = t(`pages.${currentKey.value}.title`, {
  statusCode: error.value?.statusCode,
})
const colors = computed<object>(() =>
  tm(`pages.${currentKey.value}.icon.colors`),
)
const entireDescription = computed<string>(() =>
  tm(`pages.${currentKey.value}.description`),
)
const description = computed<string[]>(() =>
  entireDescription.value.split('. '),
)
</script>

<style scoped>
.visuallyhidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
[data-core-fade-transition-wrapper] {
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
}
.r-fade-transition-enter-done {
  opacity: 1;
}
.rc-video {
  max-width: 100%;
  display: block;
}
.rc-videoplayer {
  display: block;
  width: 100%;
  min-height: 400px;
  height: auto;
  position: relative;
}
.rc-videoplayer > * {
  -webkit-user-select: none;
  user-select: none;
}
.rc-videoplayer video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.rc-videoplayer video {
  display: block;
  outline: none;
}
.rc-videoplayer-poster {
  transition: opacity 0.5s linear;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 1;
}
.rc-videoplayer-poster img {
  display: block;
  width: 100%;
  height: auto;
}
h1 {
  font-weight: 600;
}
h1 + * {
  margin-top: 0.8em;
}
.visuallyhidden {
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
.icon:after,
.icon:before {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: '';
}
.icon:after,
.icon:before {
  text-decoration: none;
}
.icon:before {
  display: none;
}
.icon-after:after {
  padding-left: 0.3em;
  top: 0;
}
.icon-thumbnailplay:after,
.icon-thumbnailplay:before {
  content: '';
}
.as-l-container {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
}
@media only screen and (min-width: 1441px) {
  .as-l-container {
    margin-left: auto;
    margin-right: auto;
    width: 980px;
  }
}
@media only screen and (max-width: 1068px) {
  .as-l-container {
    margin-left: auto;
    margin-right: auto;
    width: 692px;
  }
}
@media only screen and (max-width: 734px) {
  .as-l-container {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
}
.rs-covers {
  text-align: center;
}
.rs-covers .rc-videoplayer-poster {
  max-height: 316px;
}
@media (prefers-reduced-motion: reduce) {
  .rs-covers .rc-videoplayer .rc-videoplayer-poster {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .rc-videoplayer .rs-covers-media {
    opacity: 0;
  }
  .rs-covers-mediabtn {
    display: none;
  }
}
.rs-covers-container {
  height: calc(100vh - 44px - 36px);
  min-height: 650px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
@media only screen and (max-width: 734px) {
  .rs-covers-container {
    min-height: calc(100svmax - 48px - 36px);
    margin: auto;
    height: auto;
  }
}
@media only screen and (max-width: 734px) and (orientation: landscape) {
  .rs-covers-container {
    min-height: 0;
  }
}
.rs-covers-preorder .rs-covers-container {
  min-height: 626px;
}
.rs-covers-transtion {
  transition-duration: 0.2s;
}
.rs-covers-media-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 260px;
  height: 316px;
  min-height: auto;
}
.rs-covers-preorder .rs-covers-media-wrapper {
  width: 488px;
  height: 274px;
}
.media-icon {
  width: 127px;
}
.rs-covers-media-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 37px 0 40px 0;
}
@media only screen and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-media-wrapper {
    width: 320px;
    height: 180px;
  }
}
@media only screen and (max-width: 736px) {
  .rs-covers-preorder .rs-covers-media-wrapper {
    width: 320px;
    height: 180px;
  }
  .rs-covers-media-icon {
    margin: 57px 0 60px 0;
  }
  .media-icon {
    width: 83px;
  }
}

.rs-covers-textovervideo .rs-covers-content {
  position: absolute;
}

.rs-covers-textovervideo .rs-covers-content {
  position: absolute;
}
@media only screen and (max-width: 320px) {
  .rs-covers-preorder .rs-covers-media-wrapper {
    width: 280px;
    height: 157.5px;
  }
  .rs-covers-media-icon {
    margin: 33px 0 34px 0;
  }
  .media-icon {
    width: 73px;
  }
}
.rs-covers-media {
  display: block;
  cursor: pointer;
  width: 260px;
  height: 316px;
  -webkit-tap-highlight-color: transparent;
}
.rs-covers-mediabtn {
  position: absolute;
  right: 40px;
  top: 90px;
  height: 52px;
  width: 52px;
  font-size: 24px;
  background-color: #565656;
  border-radius: 50%;
  z-index: 2;
  opacity: 0;
  cursor: none;
  pointer-events: none;
}
@media only screen and (max-width: 734px) {
  .rs-covers-mediabtn {
    top: 65px;
    width: 35px;
    height: 35px;
    right: 17px;
    font-size: 18px;
  }
}
.icon-thumbnailplay:after,
.icon-thumbnailplay:before {
  color: #888;
  padding-left: 16px;
}
@media only screen and (max-width: 734px) {
  .icon-thumbnailplay:after,
  .icon-thumbnailplay:before {
    padding-left: 10px;
  }
}
.rs-covers-heading {
  font-size: 80px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-top: 50px;
}
@media only screen and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 64px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .rs-covers-heading {
    font-size: 48px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .rs-covers-heading {
    font-size: 64px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) and (max-width: 1068px) {
  .rs-covers-heading {
    font-size: 48px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) and (max-width: 734px) {
  .rs-covers-heading {
    font-size: 40px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.rs-covers-preorder .rs-covers-heading {
  font-size: 48px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-top: 38px;
}
@media only screen and (max-width: 1068px) {
  .rs-covers-preorder .rs-covers-heading {
    font-size: 40px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-heading {
    font-size: 32px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-heading {
    font-size: 40px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
    padding-top: 42px;
  }
}
@media only screen and (max-width: 734px) and (max-width: 1068px) {
  .rs-covers-preorder .rs-covers-heading {
    font-size: 32px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-heading {
    font-size: 28px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.rs-covers-desc {
  font-size: 17px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  padding: 19px 0 48px;
  margin: 0 auto;
}
@media only screen and (max-width: 734px) {
  .rs-covers-desc {
    padding-top: 10px;
  }
}
.rs-covers-preorder .rs-covers-desc {
  font-size: 21px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  padding-top: 16px;
}
@media only screen and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-desc {
    font-size: 19px;
    font-weight: 400;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .rs-covers-preorder .rs-covers-desc {
    font-size: 17px;
    font-weight: 400;
    font-family: SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica,
      Arial, sans-serif;
  }
}
.rs-covers-footer {
  font-size: 12px;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  color: #86868b;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
}
</style>
