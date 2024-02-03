<template>
  <div class="section-content">
    <h3 class="typography-magical-headline">
      Playlists and charts <br />that keep me in the&nbsp;mix.
    </h3>
  </div>

  <div class="dynamic-gallery marquees-initialized">
    <TabList
      :items="tabs"
      :activeTabId="activeTabId"
      @change="handleTabChange"
    />

    <div
      class="dynamic-gallery-item-container apple-music dynamic-gallery-item-container--default"
    >
      <div id="dynamic-gallery-item-a" class="dynamic-gallery-item">
        <div
          class="marquee images-loading"
          :style="{ transform: `translateX(${translateX}px)` }"
          @mouseenter="pauseMarquee"
          @mouseleave="playMarquee"
        >
          <ul class="marquee-list">
            <li
              class="marquee-tile"
              v-for="(playlist, index) in filteredPlaylists"
              :key="`playlist-${index}`"
            >
              <a class="marquee-link" :href="playlist.link">
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    :style="{ backgroundColor: playlist.bgColor }"
                  >
                    <img
                      class="marquee-picture-img"
                      :src="playlist.imageSrc"
                      :alt="playlist.altText"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta">
                      Listen now
                      <Icon
                        name="play.circle.fill"
                        :colors="{ primary: 'var(--color-fill)' }"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                      />
                    </span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">{{ playlist.title }}</p>
                  <p class="marquee-subtitle">{{ playlist.subtitle }}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="control-container mediaobject-enhanced">
      <button
        class="play-pause-button play-pause-marquees-button has-background"
        :class="{ playing: isPlaying }"
        @click="togglePlayPause"
      >
        <span v-if="!isPlaying" class="control-icon play-icon">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 85 85"
            width="27"
            height="27"
          >
            <defs>
              <g id="play-icon">
                <path
                  d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
                ></path>
                <path
                  d="M55.73,41.55c0.3,0.45,0.3,1.03,0,1.48c-0.11,0.23-0.29,0.41-0.52,0.52L35.27,56.1c-0.23,0.12-0.48,0.17-0.74,0.15 c-0.8-0.03-1.45-0.68-1.48-1.48v-25c-0.01-0.26,0.07-0.52,0.22-0.74c0.11-0.23,0.29-0.41,0.52-0.52c0.22-0.15,0.48-0.23,0.74-0.22 c0.25,0.01,0.5,0.06,0.74,0.15L55.21,41c0.21,0.16,0.39,0.36,0.52,0.59"
                ></path>
              </g>
            </defs>
            <g fill="currentColor">
              <path
                d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
              ></path>
              <path
                d="M55.73,41.55c0.3,0.45,0.3,1.03,0,1.48c-0.11,0.23-0.29,0.41-0.52,0.52L35.27,56.1c-0.23,0.12-0.48,0.17-0.74,0.15 c-0.8-0.03-1.45-0.68-1.48-1.48v-25c-0.01-0.26,0.07-0.52,0.22-0.74c0.11-0.23,0.29-0.41,0.52-0.52c0.22-0.15,0.48-0.23,0.74-0.22 c0.25,0.01,0.5,0.06,0.74,0.15L55.21,41c0.21,0.16,0.39,0.36,0.52,0.59"
              ></path>
            </g>
          </svg>
        </span>
        <span v-else class="control-icon pause-icon">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 85 85"
            width="27"
            height="27"
          >
            <defs>
              <g id="pause-icon">
                <path
                  d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
                ></path>
                <path
                  d="M50,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C48,29.15,48.9,28.25,50,28.25z"
                ></path>
                <path
                  d="M35,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C33,29.15,33.9,28.25,35,28.25z"
                ></path>
              </g>
            </defs>
            <g fill="currentColor">
              <path
                d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
              ></path>
              <path
                d="M50,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C48,29.15,48.9,28.25,50,28.25z"
              ></path>
              <path
                d="M35,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C33,29.15,33.9,28.25,35,28.25z"
              ></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlaylistType } from "~/types/common/Playlist";

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const allPlaylists = ref<PlaylistType[]>([]);
onMounted(async () => {
  allPlaylists.value = await tm("components.containers.music");
});

const tabs = ref([
  { id: "1", label: "Playlist 1" },
  { id: "2", label: "Playlist 2" },
  { id: "3", label: "Playlist 3" },
]);
const activeTabId = ref(tabs.value[0].id);

const filteredPlaylists = computed(() =>
  allPlaylists.value.filter(
    (p) => p.playlistId.toString() === activeTabId.value
  )
);

const isPlaying = ref(true);
const translateX = ref(0);
const speed = ref(1);

let animationFrameId: number | null = null;

const updateMarquee = () => {
  if (!isPlaying.value) return;
  translateX.value -= speed.value;
  if (Math.abs(translateX.value) >= 100 * filteredPlaylists.value.length)
    translateX.value = 0;
  animationFrameId = requestAnimationFrame(updateMarquee);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(updateMarquee);
});

watch(isPlaying, (newState) => {
  if (newState) {
    animationFrameId = requestAnimationFrame(updateMarquee);
  } else if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

const handleTabChange = (selectedId: string) => {
  activeTabId.value = selectedId;
  translateX.value = 0;
  nextTick(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateMarquee);
  });
};

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value;
};

const playMarquee = () => {
  isPlaying.value = true;
};
const pauseMarquee = () => {
  isPlaying.value = false;
};
</script>

<style scoped>
/* ---------------------------- play-pause-button --------------------------- */

/* .play-pause-button {
  position: relative;
  z-index: 2;
  top: -442px;
  right: 34px;
  height: 34px;
  width: 34px;
} */

/* @media only screen and (max-width: 1068px) {
  .play-pause-button {
    top: -248px;
    right: 27px;
    height: 27px;
    width: 27px;
  }
} */

/* @media only screen and (max-width: 734px) {
  .play-pause-button {
    top: unset;
    right: unset;
    height: 26px;
    width: 26px;
  }

  .play-pause-button {
    top: 36px;
  }
} */

.play-pause-button.playing,
.playing .play-pause-button {
  opacity: 1;
  pointer-events: auto;
}

.play-pause-button {
  width: 25px;
  height: 25px;
  position: relative;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
}

/* .play-pause-button.has-background {
  top: -350px;
  right: 34px;
}

@media only screen and (max-width: 1068px) {
  .play-pause-button.has-background {
    top: -260px;
    right: 27px;
  }
}

@media only screen and (max-width: 734px) {
  .play-pause-button.has-background {
    top: unset;
    right: unset;
  }
}

.play-pause-button.has-background svg {
  fill: var(--color-fill);
}

@media only screen and (max-width: 734px) {
  .play-pause-button.has-background svg {
    fill: var(--color-code-plain);
  }
} */

.play-pause-button .control-icon {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.play-pause-button svg {
  fill: var(--color-fill-gray);
}

@media only screen and (max-width: 734px) {
  .play-pause-button svg {
    fill: var(--color-code-plain);
  }
}

/* --------------------------------- marquee -------------------------------- */

.marquee {
  display: flex;
}

.marquee {
  transition: opacity 300ms;
}

.marquee:first-child {
  margin-bottom: 34px;
}

@media only screen and (max-width: 1068px) {
  .marquee:first-child {
    margin-bottom: 41px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee:first-child {
    margin-bottom: 30px;
  }
}

.marquee:last-child {
  margin-left: -100px;
}

@media only screen and (max-width: 1068px) {
  .marquee:last-child {
    margin-left: -60px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee:last-child {
    margin-left: -6px;
  }
}

/* ------------------------------ marquee-list ------------------------------ */

.marquee-list {
  margin-left: 0;
  margin-top: 0;
  list-style-type: none;
  display: flex;
  flex-shrink: 0;
}

/* ------------------------------ marquee-tile ------------------------------ */

.marquee-tile {
  flex-shrink: 0;
  position: relative;
  flex-direction: column;
  width: var(--tile-width);
  /* margin-top: 15px; */
  margin-right: 15px;
}

@media only screen and (max-width: 1068px) {
  .marquee-tile {
    margin-top: 13px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-tile {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 1068px) {
  .marquee-tile {
    margin-right: 13px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-tile {
    margin-right: 10px;
  }
}

/* ------------------------------ marquee-link ------------------------------ */

.marquee-link {
  display: block;
  overflow: hidden;
}

.marquee-link:hover {
  text-decoration: none;
}

.marquee-link:hover .marquee-hover-content {
  opacity: 1;
}

.marquee-link:hover .marquee-cta {
  transform: translateY(0);
}

/* ------------------------------- marquee-cta ------------------------------ */

.marquee-cta {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-radius: 980px;
  font-size: 14px;
  line-height: 1.1428571429;
  font-weight: 700;
  /* letter-spacing: 0em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  min-width: 26px;
  padding: 12px 22px;
  background: var(--color-fill);
  color: var(--color-figure-gray);
  transform: translateY(15px);
}

.marquee-cta:hover {
  text-decoration: none;
}

.marquee-cta:active {
  outline: none;
}

.marquee-cta:disabled {
  cursor: default;
}

.marquee-cta:hover {
  background: var(--color-fill);
}

.marquee-cta:active {
  background: var(--color-fill-tertiary);
}

.marquee-cta:disabled {
  background: var(--color-fill);
  color: var(--color-fill-gray);
  opacity: 0.32;
}

.marquee-cta:hover {
  opacity: 0.9;
}

.marquee-cta {
  transition: transform 400ms;
}

@media only screen and (max-width: 734px) {
  .marquee-cta {
    font-size: 14px;
    line-height: 1.1428571429;
    font-weight: 700;
    /* letter-spacing: 0em; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
    min-width: 28px;
    padding: 8px 10px 8px 11px;
  }
}

/* ----------------------------- marquee-picture ---------------------------- */

.marquee-picture {
  display: block;
  object-fit: cover;
  width: var(--tile-width);
  height: var(--tile-height);
}

.marquee-picture:after {
  content: "";
  display: block;
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-picture:after {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-picture:after {
    border-radius: 4px;
  }
}

.marquee-picture img {
  height: 100%;
  vertical-align: bottom;
  width: 100%;
}

/* ------------------------- marquee-hover-container ------------------------ */

.marquee-hover-container {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-hover-container {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-hover-container {
    border-radius: 4px;
  }
}

/* -------------------------- marquee-hover-content ------------------------- */

.marquee-hover-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-hover-content {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-hover-content {
    border-radius: 4px;
  }
}

.marquee-hover-content {
  transition: opacity 300ms;
}

/* ------------------------------ marquee-copy ------------------------------ */

.marquee-copy {
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
  margin-top: 10px;
}

@media only screen and (max-width: 734px) {
  .marquee-copy {
    font-size: 12px;
    line-height: 1.3333733333;
    font-weight: 400;
    /* letter-spacing: -0.01em; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
  }
}

@media only screen and (max-width: 1068px) {
  .marquee-copy {
    margin-top: 7px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-copy {
    margin-top: 6px;
  }
}

/* ------------------------------ marquee-title ----------------------------- */

.marquee-title {
  color: var(--color-fill-gray);
}

/* ---------------------------- marquee-subtitle ---------------------------- */

.marquee-subtitle {
  color: var(--color-fill-gray-secondary);
  margin-top: 0.16em;
}

@media only screen and (max-width: 1068px) {
  .marquee-subtitle {
    margin-top: -3px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-subtitle {
    margin-top: -2px;
  }
}

.marquee-subtitle,
.marquee-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* ----------------------------- dynamic-gallery ---------------------------- */

.dynamic-gallery {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 70px;
}

/* ---------------------------- control-container --------------------------- */

.control-container {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 40px;
  z-index: 4;
  height: 0;
}

@media only screen and (max-width: 734px) {
  .control-container {
    justify-content: flex-start;
  }
}

@media only screen and (max-width: 734px) and (max-width: 734px) {
  .control-container {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
}

/* ----------------------- play-pause-marquees-button ----------------------- */

.play-pause-marquees-button {
  right: 54px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  pointer-events: none;
  color: var(--color-figure-gray-secondary);
}

.play-pause-marquees-button:hover {
  color: var(--color-fill-gray);
}

.dynamic-gallery.marquees-initialized .play-pause-marquees-button {
  opacity: 1;
  pointer-events: auto;
}

@media only screen and (max-width: 1068px) {
  .play-pause-marquees-button {
    right: 20px;
  }
}

/* -------------------------- dynamic-gallery-item -------------------------- */

.dynamic-gallery-item {
  width: 100%;
  position: absolute;
  /* background-color: var(--color-fill); */
  visibility: hidden;
  z-index: 0;
}

.dynamic-gallery-item:first-of-type {
  visibility: visible;
  z-index: 1;
}

/* --------------------- dynamic-gallery-item-container --------------------- */

.dynamic-gallery-item-container {
  height: 305px;
  overflow: hidden;
  position: relative;
}

@media only screen and (max-width: 1068px) {
  .dynamic-gallery-item-container {
    height: 235px;
  }
}

@media only screen and (max-width: 734px) {
  .dynamic-gallery-item-container {
    height: 190px;
  }
}

@media only screen and (min-width: 0px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 234px;
    --tile-height: 234px;
  }
}

@media only screen and (max-width: 1068px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 164px;
    --tile-height: 164px;
  }
}

@media only screen and (max-width: 735px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 132px;
    --tile-height: 132px;
  }
}
</style>
