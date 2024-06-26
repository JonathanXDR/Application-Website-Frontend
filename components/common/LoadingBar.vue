<template>
  <div class="loader">
    <div class="loader-background" />
    <div class="loader-content">
      <p class="loader-headline" tabindex="-1">
        {{ title }}
      </p>
      <div class="loader-progress" role="img" aria-label="loading, please wait">
        <div
          class="loader-progress-indicator"
          :style="`--progress: ${progress}%`"
        />
      </div>
    </div>
    <div class="preview">
      <div class="preview-image" data-anim-lazy-image-download-complete />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  progress: number
}>()
</script>

<style scoped>
.loader {
  display: none;
}
.gallery--loading .loader {
  opacity: 1;
  transition: none;
  visibility: inherit;
}

.loader-content {
  opacity: 1;
}

.loader-progress-indicator {
  transition: transform 0.5s ease;
}
.loader {
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.4s ease-out 0.4s, visibility 0.4s ease-out 0.4s;
  visibility: hidden;
  width: 100%;
  z-index: 3;
}
.loader-background {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.9);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
}
.loader-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  gap: 10px;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.4s ease-out;
  width: 100%;
  z-index: 3;
}
.loader-headline {
  font-size: 48px;
  line-height: 1.0834933333;
  font-weight: 700;
  letter-spacing: -0.003em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  max-width: 600px;
  text-align: center;
}
@media only screen and (max-width: 734px) {
  .loader-headline {
    font-size: 28px;
    line-height: 1.1428571429;
    font-weight: 700;
    letter-spacing: 0.007em;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.loader-headline:focus {
  outline: none;
}
@media only screen and (max-width: 734px) {
  .loader-headline {
    max-width: 260px;
    width: 87.5%;
  }
}
.loader-progress {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  height: 8px;
  margin-top: 60px;
  overflow: hidden;
  position: relative;
  width: 338px;
  z-index: 2;
}
@media only screen and (max-width: 734px) {
  .loader-progress {
    width: 248px;
  }
}
.loader-progress-indicator {
  --progress: -100%;
  background: #000;
  border-radius: 4px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateX(var(--progress));
  transform-origin: left;
  width: 100%;
}
.preview {
  background-color: #fafafc;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
}
.preview-image {
  aspect-ratio: 998/543;
  background-size: cover;
  left: 50%;
  margin-top: -113px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 83.42vh;
}

.preview-image[data-anim-lazy-image-download-complete] {
  background-repeat: no-repeat;
  background-image: url(https://www.apple.com/v/apple-vision-pro/c/images/overview/intro/loader__cwppis0i3742_large.jpg);
}
@media only screen and (max-width: 1068px) {
  .preview-image[data-anim-lazy-image-download-complete] {
    background-repeat: no-repeat;
    background-image: url(https://www.apple.com/v/apple-vision-pro/c/images/overview/intro/loader__cwppis0i3742_medium.jpg);
  }
}
@media only screen and (max-width: 734px) {
  .preview-image[data-anim-lazy-image-download-complete] {
    background-repeat: no-repeat;
    background-image: url(https://www.apple.com/v/apple-vision-pro/c/images/overview/intro/loader__cwppis0i3742_small.jpg);
  }
}
@media (orientation: portrait) and (min-width: 0px) {
  .preview-image {
    margin-top: -110px;
    width: 43.5vh;
  }
}
@media (orientation: portrait) and (min-width: 768px) {
  .preview-image {
    margin-top: -62px;
    width: 56.6vh;
  }
}
</style>
