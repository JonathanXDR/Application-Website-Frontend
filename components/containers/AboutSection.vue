<template>
  <div class="info-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="411" height="411">
      <defs>
        <clipPath id="image">
          <path
            d="M190.5 14.160254037844a30 30 0 0 1 30 0l143.20508075689 82.679491924311a30 30 0 0 1 15 25.980762113533l0 165.35898384862a30 30 0 0 1 -15 25.980762113533l-143.20508075689 82.679491924311a30 30 0 0 1 -30 0l-143.20508075689 -82.679491924311a30 30 0 0 1 -15 -25.980762113533l2.633606093737e-13 -165.35898384862a30 30 0 0 1 15 -25.980762113533"
          ></path>
        </clipPath>
      </defs>
      <image
        clip-path="url(#image)"
        height="100%"
        width="100%"
        x="0"
        y="10"
        href="~/assets/img/portrait.jpg"
        preserveAspectRatio="xMidYMin slice"
      ></image>
    </svg>

    <div>
      <h1>
        <span class="eyebrow">{{
          $t("components.containers.about.eyebrow")
        }}</span
        >{{ $t("components.containers.about.title") }}
      </h1>
      <p class="typography-intro">
        {{
          $t("components.containers.about.description", {
            age: dates.age,
            apprenticeshipYear: (Number(dates?.apprenticeshipYear) ?? 0) + 1,
          })
        }}
      </p>

      <LinkCollection :links="links" class="typography-intro" />
    </div>
  </div>

  <ShareSheet />
</template>

<script lang="ts" setup>
import type { DateItemType } from "~/types/common/DateItem";
import type { LinkType } from "~/types/common/Link";

defineProps({
  title: {
    type: String,
    required: true,
    default: undefined,
  },
});

const { locale, tm } = useI18n();
const links = computed(
  () => tm("components.containers.about.links") as LinkType[]
);
const dateItems = tm("components.containers.about.dates") as DateItemType[];
const dates = ref<{
  age: string | undefined;
  apprenticeshipYear: string | undefined;
}>({
  age: undefined,
  apprenticeshipYear: undefined,
});

const calculateYears = (date: string) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const regionCode = navigator.language.split("-")[1];
  const customLocale = `${locale.value}-${regionCode}`;
  const currentDate = new Date(Date.now());

  const currentLocaleDate = currentDate.toLocaleDateString(customLocale, {
    timeZone: timeZone,
  });

  const startDate = new Date(date);
  const difference = new Date(currentDate.getTime() - startDate.getTime());
  const years = Math.abs(
    difference.getUTCFullYear() - new Date(0).getUTCFullYear()
  );
  return years;
};

onMounted(async () => {
  dateItems.forEach((item) => {
    dates.value[item.key as keyof typeof dates.value] = String(
      calculateYears(item.date)
    );
  });
});
</script>

<style scoped>
.info-container {
  transform: translateZ(0) scale(1);
  z-index: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.info-container > svg {
  filter: saturate(0.9);
  transform: scale(0.63);
  margin: 0 -32px;
}

.info-container div {
  padding: 0;
}

.sharesheet-options {
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

@media screen and (min-width: 350px) {
  .info-container > svg {
    transform: scale(0.75);
  }
}

@media screen and (min-width: 900px) {
  .info-container > svg {
    transform: scale(0.85);
  }
}

@media screen and (min-width: 1250px) {
  .info-container > svg {
    transform: scale(1);
  }

  .info-container div {
    padding-top: 50px;
  }

  .info-container {
    display: grid;
    grid-template-columns: 411px 1fr;
    align-items: center;
    text-align: left;
  }

  .info-container div {
    padding: 0;
  }

  .sharesheet-options {
    justify-content: flex-start;
  }

  .links p {
    justify-content: flex-start !important;
  }
}
</style>
