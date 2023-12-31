<template>
  <div class="ribbon">
    <div class="ribbon-drop-wrapper">
      <div
        ref="ribbon-content-wrapper"
        class="ribbon-content-wrapper ribbon-content-wrapper-animation"
      >
        <div
          ref="ribbon-content"
          class="ribbon-content row ribbon-content-animation"
        >
          <p>
            {{ $t("components.common.RibbonBar.description") }}&ensp;

            <LinkCollection
              ref="ribbon-link"
              :links="links"
              class="ribbon-link ribbon-link-animation icon-after-ribbon"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LinkType } from "~/types/common/Link";

const { tm } = useI18n();
const links = computed(
  () => tm("components.common.RibbonBar.links") as LinkType[]
);
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: center;
}

.article-image {
  margin-top: 0.3em !important;
}

.icon-after-ribbon a.link svg {
  width: 21px;
  height: 21px;
}

/* --------------------------------- ribbon --------------------------------- */

.ribbon {
  margin-top: 48px;
}

@media screen and (min-width: 1250px) {
  .ribbon {
    margin-top: 52px;
  }
}

.ribbon .links {
  display: flex;
  flex-wrap: wrap;
}

/* ----------------------------- ribbon-content ----------------------------- */

.ribbon-content {
  font-size: 13px;
  line-height: 1.4285914286;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
}

@media screen and (min-width: 900px) {
  .ribbon-content {
    font-size: 14px !important;
  }
}

.ribbon-content {
  color: var(--ribbon-text-color);
}

.ribbon-content p {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

/* ------------------------- ribbon-content-wrapper ------------------------- */

.ribbon-content-wrapper {
  background-color: var(--ribbon-background-color);
  text-align: center;
  padding-top: 0.9411764706em;
  padding-bottom: 0.9411764706em;
}

/* -------------------- ribbon-content-wrapper-animation -------------------- */

@keyframes animate-background-0071e3-f5f5f7 {
  0% {
    background-color: var(--ribbon-background-color-initial);
  }

  to {
    background-color: var(--ribbon-background-color);
  }
}

.ribbon-content-wrapper-animation {
  background-color: var(--ribbon-background-color-initial);
  animation: animate-background-0071e3-f5f5f7 1s ease-in-out 1.8s forwards;
}

/* ------------------------ ribbon-content-animation ------------------------ */

@keyframes animate-color-white-1d1d1f {
  0% {
    color: var(--ribbon-text-color-initial);
  }

  to {
    color: var(--ribbon-text-color);
  }
}

.ribbon-content-animation {
  color: var(--ribbon-text-color-initial);
  animation: animate-color-white-1d1d1f 1s ease-in-out 1.8s forwards;
}

/* --------------------------- ribbon-drop-wrapper -------------------------- */

@keyframes ribbon-drop {
  0% {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.ribbon-drop-wrapper {
  animation: ribbon-drop 0.8s ease-in-out forwards;
}
</style>
