<template>
  <div
    class="video-container"
    @click="handlePlay"
  >
    <video
      class="masked-video"
      autoplay
      loop
      muted
      playsinline
    >
      <source
        :src="videoSrc"
        type="video/mp4"
      >
    </video>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 630 630"
      class="blob-svg"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <!-- <filter id="blobBlurFilter" x="0" y="0" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter> -->
        <mask
          id="blobMask"
          y="0"
          x="0"
          width="100%"
          height="100%"
        >
          <path
            clip-rule="evenodd"
            d="M629.065 331.931C620.15 412.726 536.796 456.471 473.587 507.58C407.549 560.976 345.737 635.263 261.006 629.532C173.547 623.616 106.601 551.968 57.3863 479.429C11.2122 411.371-4.25079 330.487 2.50807 248.522C9.70229 161.277 19.1436 56.0458 95.7866 13.7457C170.335-27.3982 254.143 41.7608 336.247 64.3281C399.881 81.8189 466.636 84.5495 515.351 129.07C574.838 183.434 637.903 251.83 629.065 331.931Z"
            fill="white"
            fill-rule="evenodd"
            filter="url(#blobBlurFilter)"
          />
        </mask>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import audioSrc from '~/assets/drafts/background_animation/intro-music.mp3'
import videoSrc from '~/assets/drafts/background_animation/orb/orb.mp4'

const { play, isPlaying } = useSound(audioSrc, { volume: 1, autoplay: true })

const handlePlay = () => {
  if (!isPlaying.value) play()
}
</script>

<style scoped>
.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.masked-video {
  display: block;
  width: 100%;
  height: auto;
  filter: blur(30px);
  mask: url(#blobMask);
  -webkit-mask: url(#blobMask);
  animation: spin 10s linear infinite;
}

.blob-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
