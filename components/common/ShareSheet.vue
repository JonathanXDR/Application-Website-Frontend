<template>
  <ul class="sharesheet-options">
    <li
      class="social-option"
      v-for="(link, index) in links"
      :key="index"
      v-animation="{ add: 'visible' }"
    >
      <NuxtLink
        class="link"
        :href="link.url"
        :title="link.title"
        target="_blank"
      >
        <ClientOnly>
          <font-awesome-icon
            :icon="`fa-${link.category} fa-${link.icon?.name}`"
          />
        </ClientOnly>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { FaLinkType } from '~/types/common/FaLink'

const { tm } = useI18n()
const links = computed<FaLinkType[]>(() =>
  tm('components.common.ShareSheet.links')
)
</script>

<style scoped>
.link:hover {
  color: var(--color-figure-blue) !important;
}

/* --------------------------- sharesheet-options --------------------------- */

.sharesheet-options {
  display: flex;
  align-items: center;
  visibility: visible;
  margin-top: 10px;
}

/* -------------------- social-option ------------------- */

@keyframes FadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.social-option ~ .social-option {
  margin-left: 19px;
}

.sharesheet-options .social-option {
  opacity: 0;
}

.sharesheet-options .social-option.visible {
  opacity: 1;
}

.sharesheet-options .social-option.visible {
  animation: FadeIn 0.2s linear;
  -webkit-animation: FadeIn 0.2s linear;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: both;
}

.sharesheet-options .social-option:nth-child(1) {
  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
}

.sharesheet-options .social-option:nth-child(2) {
  animation-delay: 0.15s;
  -webkit-animation-delay: 0.15s;
}

.sharesheet-options .social-option:nth-child(3) {
  animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}

.sharesheet-options .social-option:nth-child(4) {
  animation-delay: 0.25s;
  -webkit-animation-delay: 0.25s;
}

/* ------------------------------------ a ----------------------------------- */

.sharesheet-options .social-option a {
  color: var(--color-fill-gray-secondary);
}
</style>
