<script setup lang="ts">
defineProps<{
  title: string
}>()

const viewport = useViewport()
const nonce = useNonce()
const { data: about } = await useQueryCollection('sections')
  .stem('about')
  .first()

const calculateAge = (date = '') => {
  const currentDate = new Date(Date.now())
  const birthDate = new Date(date)
  const difference = new Date(currentDate.getTime() - birthDate.getTime())
  const years = Math.abs(difference.getUTCFullYear() - 1970)
  return years
}
</script>

<template>
  <div class="info-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 411 411"
      width="275"
      height="275"
    >
      <defs>
        <clipPath id="image">
          <path
            d="M190.5 14.160254037844a30 30 0 0 1 30 0l143.20508075689 82.679491924311a30 30 0 0 1 15 25.980762113533l0 165.35898384862a30 30 0 0 1 -15 25.980762113533l-143.20508075689 82.679491924311a30 30 0 0 1 -30 0l-143.20508075689 -82.679491924311a30 30 0 0 1 -15 -25.980762113533l2.633606093737e-13 -165.35898384862a30 30 0 0 1 15 -25.980762113533"
          />
        </clipPath>
      </defs>
      <!-- `foreignObject` lets the browser do real `<img srcset>`
           density picking on Retina displays. SVG `<image>` ignores
           `srcset` and would always serve 1x. The SVG `<clipPath>`
           still applies because `foreignObject` is a paintable,
           clippable SVG element. -->
      <foreignObject
        x="0"
        y="10"
        width="411"
        height="411"
        clip-path="url(#image)"
      >
        <!-- `fit="cover"` is a no-op on Vercel because the
             `/_vercel/image` URL only carries `url`, `w`, and `q`.
             The prop still expresses intent and is honoured by
             non-Vercel providers (IPX, Cloudinary) if the provider is
             ever swapped. Mirrors the note on the `cover` preset in
             `nuxt.config.ts`. -->
        <NuxtImg
          src="/img/portrait.webp"
          :alt="about?.imageAlt ?? 'Portrait of Jonathan Russ'"
          preset="portrait"
          fit="cover"
          sizes="275px md:300px xl:350px"
          :preload="{ fetchPriority: 'high' }"
          :nonce
          class="portrait-img"
        />
      </foreignObject>
    </svg>

    <CardItem
      v-if="about"
      v-bind="{
        variant: 'article',
        hover: false,
        componentSize: viewport.isLessThan('tablet')
          ? 'small'
          : viewport.isLessThan('desktopMedium')
            ? 'medium'
            : 'large',
        loading: false,
        title: about?.title,
        description: about?.description?.replace(
          '{age}',
          String(calculateAge(about?.birthDate)),
        ),
      }"
    />
  </div>
</template>

<style scoped>
.info-container {
  z-index: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.info-container .body {
  align-items: center !important;
}

.info-container > svg {
  filter: saturate(0.9);
  margin: 0 -32px;
}

.portrait-img {
  width: 411px;
  height: 411px;
  object-fit: cover;
  display: block;
}

.info-container div {
  padding: 0;
}

@media screen and (min-width: 768px) {
  .info-container > svg {
    width: 300px;
    height: 300px;
  }
}

@media screen and (min-width: 1280px) {
  .info-container > svg {
    width: 350px;
    height: 350px;
  }

  .info-container div {
    padding-top: 50px;
  }

  .info-container {
    display: grid;
    grid-template-columns: 350px 1fr;
    align-items: center;
    text-align: left;
    gap: 0px;
  }

  .info-container .body {
    align-items: unset !important;
  }

  .info-container div {
    padding: 0;
  }

  .links p {
    justify-content: flex-start !important;
  }
}
</style>
