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
      <foreignObject
        x="0"
        y="10"
        width="100%"
        height="100%"
      >
        <NuxtImg
          src="/img/portrait.jpg"
          alt="Portrait"
          class="portrait"
        />
      </foreignObject>
    </svg>

    <CardItem
      v-bind="{
        variant: 'article',
        hover: false,
        alignment: viewport.isLessThan('desktopMedium') ? 'center' : 'start',
        componentSize: viewport.isLessThan('tablet')
          ? 'small'
          : viewport.isLessThan('desktopMedium')
            ? 'medium'
            : 'large',
        loading: false,
        title: t('components.containers.about.title'),
        description: t('components.containers.about.description', {
          age: dates.age,
          apprenticeshipYear:
            dates.apprenticeshipYear && dates.apprenticeshipYear + 1,
        }),
      }"
    />
  </div>

  <ShareSheet />
</template>

<script setup lang="ts">
import type { DateItemType } from '#shared/types/common/date-item'

defineProps<{
  title: string
}>()

const viewport = useViewport()
const { t, tm } = useI18n()
const dateItems = computed<DateItemType[]>(() =>
  tm('components.containers.about.dates'),
)
const dates = ref<{
  age: number | undefined
  apprenticeshipYear: number | undefined
}>({
  age: undefined,
  apprenticeshipYear: undefined,
})

const calculateYears = (date: string) => {
  const currentDate = new Date(Date.now())
  const birthDate = new Date(date)
  const difference = new Date(currentDate.getTime() - birthDate.getTime())
  const years = Math.abs(difference.getUTCFullYear() - 1970)
  return years
}

onMounted(async () => {
  for (const item of dateItems.value) {
    if (item.key in dates.value) {
      dates.value[item.key as keyof typeof dates.value] = calculateYears(
        item.date,
      )
    }
  }
})
</script>

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

.info-container > svg {
  filter: saturate(0.9);
  margin: 0 -32px;
}

.info-container div {
  padding: 0;
}

.portrait {
  clip-path: url(#image);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sharesheet {
  margin-top: 24px;
  justify-content: center;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
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

  .info-container div {
    padding: 0;
  }

  .sharesheet {
    justify-content: flex-start;
  }

  .links p {
    justify-content: flex-start !important;
  }
}
</style>
