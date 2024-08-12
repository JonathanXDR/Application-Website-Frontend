<template>
  <input
    id="ac-ln-menustate"
    v-model="navOpen"
    type="checkbox"
    class="ac-ln-menustate"
    aria-controls="ac-ln-menustate-tray"
    aria-expanded="false"
    :disabled="navDisabled"
    @input="toggleNav"
  >
  <div id="ac-ln-fixed-placeholder" class="css-fixed ac-ln-sticking" />
  <nav
    id="ac-localnav"
    :class="[
      'ac-localnav-scrim css-fixed ac-ln-allow-transitions ac-ln-sticking',
      { 'ac-localnav-noborder': !border.display },
      { 'ac-ln-open': navOpen },
      { 'ac-ln-opening': navOpen },
    ]"
    lang="en-US"
    dir="ltr"
    role="navigation"
    aria-label="Local"
  >
    <div class="ac-ln-wrapper">
      <div class="ac-ln-background" />
      <div class="ac-ln-content">
        <div class="ac-ln-title">
          <!-- <a href="/apple-vision-pro/"> Apple Vision Pro </a> -->

          <NuxtLink to="/" aria-label="JR">
            <Logo :style="{ height: '13px !important', width: 'auto' }" />
          </NuxtLink>
          <DevBadge
            v-if="config.public.appEnvironment === 'development'"
            :color="{
              primary: `var(--color-figure-${randomDevColor?.name})`,
            }"
          />
        </div>
        <div class="ac-ln-menu">
          <a
            id="ac-ln-menustate-open"
            href="#ac-ln-menustate"
            class="ac-ln-menucta-anchor ac-ln-menucta-anchor-open"
            role="button"
            aria-controls="ac-ln-menustate-tray"
            aria-expanded="false"
          >
            <span class="ac-ln-menucta-anchor-label">Local Nav Open Menu</span>
          </a>
          <a
            id="ac-ln-menustate-close"
            href="#"
            class="ac-ln-menucta-anchor ac-ln-menucta-anchor-close"
            role="button"
            aria-controls="ac-ln-menustate-tray"
            aria-expanded="true"
          >
            <span class="ac-ln-menucta-anchor-label">Local Nav Close Menu</span>
          </a>
          <div id="ac-ln-menustate-tray" class="ac-ln-menu-tray">
            <ul class="ac-ln-menu-items">
              <li
                v-for="(item, index) in navItems"
                :key="index"
                class="ac-ln-menu-item"
              >
                <!-- <span
                  class="ac-ln-menu-link current"
                  role="link"
                  aria-disabled="true"
                  aria-current="page"
                >
                  Overview
                </span> -->
                <NuxtLink
                  :to="item.route"
                  :class="[
                    'ac-ln-menu-link',
                    {
                      current:
                        index === currentSectionIndex ||
                        route.path === item.route,
                    },
                  ]"
                  role="link"
                  aria-disabled="true"
                  aria-current="page"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="ac-ln-actions">
            <div class="ac-ln-action ac-ln-action-menucta" aria-hidden="true">
              <label for="ac-ln-menustate" class="ac-ln-menucta">
                <span class="ac-ln-menucta-chevron">
                  <svg
                    viewBox="0 0 16 9"
                    data-chevron-icon
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      shape-rendering="geometricPrecision"
                      data-chevron-icon-shape
                      stroke="currentColor"
                      stroke-linecap="round"
                      vector-effect="non-scaling-stroke"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                      points="15.265 .835 8 8.167 .735 .835"
                    >
                      <animate
                        ref="expandAnimation"
                        data-chevron-animate="expand"
                        attributeName="points"
                        values="15.265 .835 8 8.167 .735 .835; 15.25 4.5 8 4.5 .75 4.5; 15.265 8.165 8 .835 .735 8.165"
                        dur="320ms"
                        begin="indefinite"
                        fill="freeze"
                        keyTimes="0; 0.5; 1"
                        calcMode="spline"
                        keySplines="0.12, 0, 0.38, 0; 0.2, 1, 0.68, 1"
                      />
                      <animate
                        ref="collapseAnimation"
                        data-chevron-animate="collapse"
                        attributeName="points"
                        values="15.265 8.165 8 .835 .735 8.165; 15.25 4.5 8 4.5 .75 4.5; 15.265 .835 8 8.167 .735 .835"
                        dur="320ms"
                        begin="indefinite"
                        fill="freeze"
                        keyTimes="0; 0.5; 1"
                        calcMode="spline"
                        keySplines="0.2, 0, 0.68, 0; 0.2, 1, 0.68, 1"
                      />
                    </polyline>
                  </svg>
                </span>
              </label>
            </div>
            <div class="ac-ln-action ac-ln-action-button">
              <SegmentNav
                :items="themeItems"
                gap="5px"
                component-size="xsmall"
                :focus="false"
                :label="windowWidth >= 1024 ? 'text' : 'icon'"
                :selected-item="getTheme()"
                :on-select="(newTheme: string) => setTheme(newTheme)"
              />
            </div>
            <div class="ac-ln-action ac-ln-action-button">
              <LanguagePickerDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <label id="ac-ln-curtain" for="ac-ln-menustate" />
</template>

<script setup lang="ts">
import type { ItemType } from "~/types/common/Item";
import type { NavBarType } from "~/types/common/NavBar";
import type { SectionType } from "~/types/common/Section";

withDefaults(defineProps<NavBarType>(), {
  border: () => ({
    display: false,
    animation: false,
  }),
});

const { randomDevColor } = useColor();
const { currentSection } = useSection();
const { getTheme, setTheme } = useTheme();
const { windowWidth } = useWidth();
const { headerAnimations } = useAnimation();
const config = useRuntimeConfig();
const route = useRoute();
const { tm } = useI18n();
const navItems = computed<SectionType[]>(() => tm("components.common.NavBar"));
const themeItems = computed<ItemType[]>(() =>
  tm("components.common.SegmentNav.theme"),
);
const navOpen = ref(false);
const navDisabled = ref(false);
const currentSectionIndex = computed(() => currentSection.value.index);
const expandAnimation = ref<SVGAnimateElement | null>(null);
const collapseAnimation = ref<SVGAnimateElement | null>(null);

const initHeaderAnimations = () => {
  const animation = {
    element: document.querySelector(".ac-ln-background") as HTMLElement,
    class: "ac-ln-background-transition",
    timeout: 500,
  };
  const { setHeaderAnimation } = useAnimation();
  setHeaderAnimation(animation);
};

const toggleNav = () => {
  navOpen.value = !navOpen.value;
  animateChevron(navOpen.value);
  checkboxTimeout();
};

const animateChevron = (isOpen: boolean) => {
  if (isOpen) {
    expandAnimation.value?.beginElement();
  } else {
    collapseAnimation.value?.beginElement();
  }
};

const checkboxTimeout = () => {
  navDisabled.value = true;
  setTimeout(() => {
    navDisabled.value = false;
  }, 1000);
};

const handleScroll = () => {
  if (navOpen.value && window.scrollY > 0) {
    navOpen.value = false;
    animateChevron(false);
  }
};

const updateAnimations = () => {
  headerAnimations.value.forEach((element) => {
    element.element.classList.remove(element.class);

    setTimeout(() => {
      element.element.classList.add(element.class);
    }, element.timeout);
  });
};

onMounted(() => {
  initHeaderAnimations();
  window.addEventListener("scroll", handleScroll);

  watch(getTheme, (newTheme, oldTheme) => {
    if (newTheme !== oldTheme) {
      updateAnimations();
    }
  });
});
</script>

<style scoped>
/* .item {
  list-style: none;
  font-weight: 700;
  padding: 14px 16px;
  margin: 0 8px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none !important;
}

.item::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition: 0.2s;
  border-radius: 5px;
}

.item:hover {
  color: var(--color-fill-tertiary) !important;
}

.item:hover::before {
  background: var(--color-code-plain);
  transform: scale(1.2);
} */

#ac-localnav ul,
#ac-localnav li {
  margin: 0;
  padding: 0;
}
#ac-localnav :focus-visible {
  outline: 2px solid var(--sk-focus-color, var(--color-fill-blue));
  outline-offset: var(--sk-focus-offset, 1px);
}
#ac-localnav *,
#ac-localnav * :before,
#ac-localnav * :after {
  letter-spacing: inherit;
}
#ac-localnav .ac-ln-menu * {
  letter-spacing: inherit;
}
#ac-localnav a,
#ac-localnav a:hover {
  text-decoration: none;
}
#ac-localnav ul {
  list-style: none;
}
#ac-localnav {
  --r-globalnav-height: 44px;
  --r-globalmessage-segment-height: 0px;
  --r-globalnav-segmentbar-height: 0px;
  --r-globalmessage-segment-height: 40px;
  --r-globalnav-segmentbar-height: 40px;
}
#ac-localnav {
  --r-localnav-height: calc(52px * var(--r-localnav-text-zoom-factor));
  --r-localnav-stacked-height: calc(66px * var(--r-localnav-text-zoom-factor));
  --r-localnav-gn-height: calc(
    var(--r-globalnav-height, 44px) * var(--r-localnav-text-zoom-factor)
  );
  --r-localnav-viewport-large-min-width: viewport-get-property-for(
    "ac-localnav:large",
    min-width
  );
  --r-localnav-viewport-large-query: min-width(1024px);
  --r-localnav-viewport-medium-min-width: viewport-get-property-for(
    "ac-localnav:medium",
    min-width
  );
  --r-localnav-viewport-medium-max-width: viewport-get-property-for(
    "ac-localnav:medium",
    max-width
  );
  --r-localnav-viewport-medium-query: min-width(834px);
  --r-localnav-viewport-small-min-width: viewport-get-property-for(
    "ac-localnav:small",
    min-width
  );
  --r-localnav-viewport-small-max-width: viewport-get-property-for(
    "ac-localnav:small",
    max-width
  );
  --r-localnav-viewport-small-query: min-width(320px);
  --r-localnav-text-zoom-factor: 1;
}
#ac-localnav {
  --localnav-focus-color: var(--sk-focus-color, var(--color-fill-blue));
  --localnav-focus-color-alt: var(
    --sk-focus-color-alt,
    var(--color-nav-link-color)
  );
  --localnav-focus-offset: var(--sk-focus-offset, 1px);
  --localnav-focus-offset-container: var(--sk-focus-offset-container, 3px);
}
#ac-localnav :focus-visible {
  --sk-focus-color: var(--localnav-focus-color);
  --sk-focus-color-alt: var(--localnav-focus-color-alt);
  --sk-focus-offset: var(--localnav-focus-offset);
  --sk-focus-offset-container: var(--localnav-focus-offset-container);
}
#ac-localnav {
  --r-localnav-min-width: 1024px;
  --r-localnav-margin-bottom: calc(-1 * var(--r-localnav-height));
  --r-localnav-margin-top: var(--r-localnav-gn-height);
  --r-localnav-content-padding: 22px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--r-localnav-height);
  min-width: var(--r-localnav-min-width);
  font-size: 17px;
  z-index: 9997;
}
#ac-localnav:not([dir="rtl"]) {
  --r-localnav-start: var(--r-sk-start, left);
  --r-localnav-end: var(--r-sk-end, right);
  --r-localnav-safe-area-inset-start: var(
    --sk-safe-area-inset-start,
    env(safe-area-inset-left)
  );
  --r-localnav-safe-area-inset-end: var(
    --sk-safe-area-inset-end,
    env(safe-area-inset-right)
  );
}
@media (max-width: 1023px) {
  #ac-localnav {
    --r-localnav-min-width: 320px;
  }
}
.ac-localnav-overlap #ac-localnav {
  margin-bottom: var(--r-localnav-margin-bottom);
}
#ac-localnav .ac-ln-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 1;
}
#ac-localnav .ac-ln-content {
  height: var(--r-localnav-height);
  margin: 0 auto;
  width: 82.5%;
  /* max-width: 980px;
  padding: 0 var(--r-localnav-content-padding);
  -webkit-padding-start: max(
    var(--r-localnav-content-padding),
    var(--r-localnav-safe-area-inset-start)
  );
  padding-inline-start: max(
    var(--r-localnav-content-padding),
    var(--r-localnav-safe-area-inset-start)
  );
  -webkit-padding-end: max(
    var(--r-localnav-content-padding),
    var(--r-localnav-safe-area-inset-end)
  );
  padding-inline-end: max(
    var(--r-localnav-content-padding),
    var(--r-localnav-safe-area-inset-end)
  ); */
  position: relative;
  z-index: 2;
}
#ac-localnav .ac-ln-content::before,
#ac-localnav .ac-ln-content::after {
  content: " ";
  display: table;
}
#ac-localnav .ac-ln-content::after {
  clear: both;
}
@media (max-width: 1023px) {
  #ac-localnav .ac-ln-content {
    width: 90%;
    border-bottom: none;
  }
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-content {
    --r-localnav-content-padding: 16px;
  }
}
#ac-localnav.css-fixed {
  position: fixed;
}
#ac-localnav {
  --r-localnav-actions-padding-top: calc(
    18px * var(--r-localnav-text-zoom-factor)
  );
  --r-localnav-actions-padding-start: max(
    var(--r-localnav-safe-area-inset-start),
    22px
  );
  --r-localnav-actions-padding-end: max(
    22px,
    var(--r-localnav-safe-area-inset-end)
  );
  --r-localnav-actions-button-space-before: 24px;
  --r-localnav-actions-button-space-between: 10px;
  --r-localnav-actions-menucta-space-after: 16px;
}
@media (max-width: 767px) {
  #ac-localnav {
    --r-globalnav-height: 48px;
    --r-globalmessage-segment-height: 44px;
    --r-globalnav-segmentbar-height: 44px;
  }
  #ac-localnav {
    --r-localnav-height: calc(48px * var(--r-localnav-text-zoom-factor));
    --r-localnav-stacked-height: calc(
      63px * var(--r-localnav-text-zoom-factor)
    );
    --r-localnav-gn-height: calc(
      var(--r-globalnav-height, 48px) * var(--r-localnav-text-zoom-factor)
    );
  }
  #ac-localnav {
    --r-localnav-actions-padding-top: calc(
      16px * var(--r-localnav-text-zoom-factor)
    );
    --r-localnav-actions-padding-start: max(
      16px,
      var(--r-localnav-safe-area-inset-start)
    );
    --r-localnav-actions-padding-end: max(
      16px,
      var(--r-localnav-safe-area-inset-end)
    );
  }
}
#ac-localnav .ac-ln-actions {
  /* padding-top: var(--r-localnav-actions-padding-top); */
  height: 100%;
  display: flex;
  align-items: center;
  float: var(--r-localnav-start);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-actions {
    -webkit-padding-start: var(--r-localnav-actions-padding-start);
    padding-inline-start: var(--r-localnav-actions-padding-start);
    -webkit-padding-end: var(--r-localnav-actions-padding-end);
    padding-inline-end: var(--r-localnav-actions-padding-end);
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    z-index: 1;
  }
}
#ac-localnav .ac-ln-action {
  -webkit-margin-start: var(--r-localnav-actions-button-space-before);
  margin-inline-start: var(--r-localnav-actions-button-space-before);
  float: var(--r-localnav-start);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-action-button {
    margin-top: -3px;
  }
}
#ac-localnav .ac-ln-action-button .ac-ln-button {
  margin-top: -1px;
}
#ac-localnav .ac-ln-action-product {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
  top: auto;
  left: auto;
}
#ac-localnav .ac-ln-action-menucta {
  height: 100%;
  align-items: center;
  /* margin-top: -2px; */
  position: relative;
  z-index: 1;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-action-menucta {
    float: var(--r-localnav-start);
  }
  #ac-localnav .ac-ln-action-menucta + .ac-ln-action-button {
    --r-localnav-actions-button-space-before: var(
      --r-localnav-actions-menucta-space-after
    );
  }
}
#ac-localnav {
  --localnav-background: var(
    --globalheader-background,
    var(--color-nav-background)
  );
  --localnav-keyline-color: var(--color-nav-keyline);
}
#ac-localnav.ac-ln-sticking {
  --localnav-background: var(
    --localnav-background-stuck,
    var(--color-nav-background-stuck) ;
  );
}
#ac-ln-menustate:checked ~ #ac-localnav,
#ac-ln-menustate:target ~ #ac-localnav {
  --localnav-background: var(--color-nav-background-checked);
}
#ac-localnav .ac-ln-background {
  position: absolute;
  left: 0;
  top: 0;
  /* margin-top: calc(-1 * var(--r-globalnav-height, 0));
  padding-top: var(--r-globalnav-height, 0); */
  width: 100%;
  height: 100%;
  z-index: 1;
  -webkit-transition: background 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: background 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  background: var(--localnav-background);
}
#ac-localnav .ac-ln-background:after {
  background: var(--localnav-keyline-color);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-background {
    min-height: 48px;
    -webkit-transition: background 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms;
    transition: background 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms;
  }
}
#ac-localnav.ac-ln-sticking .ac-ln-background {
  -webkit-transition: background 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: background 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  -webkit-transition-property:
    background,
    -webkit-backdrop-filter;
  transition-property:
    background,
    -webkit-backdrop-filter;
  transition-property: background, backdrop-filter;
  transition-property:
    background,
    backdrop-filter,
    -webkit-backdrop-filter;
}
@supports ((-webkit-backdrop-filter: initial) or (backdrop-filter: initial)) {
  #ac-localnav.ac-localnav-scrim .ac-ln-background {
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
  }
}
#ac-ln-menustate:checked ~ #ac-localnav .ac-ln-background,
#ac-ln-menustate:target ~ #ac-localnav .ac-ln-background {
  max-height: none;
  -webkit-transition: 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s;
  transition: 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s;
  -webkit-transition-property:
    background,
    -webkit-backdrop-filter;
  transition-property:
    background,
    -webkit-backdrop-filter;
  transition-property: background, backdrop-filter;
  transition-property:
    background,
    backdrop-filter,
    -webkit-backdrop-filter;
}
#ac-localnav .ac-ln-background:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  inset-inline-start: 50%;
  width: 980px;
  -webkit-margin-start: -490px;
  margin-inline-start: -490px;
  height: 1px;
  z-index: 1;
}
@media (max-width: 1023px) {
  #ac-localnav .ac-ln-background:after {
    -webkit-margin-start: 0;
    margin-inline-start: 0;
    width: 100%;
    inset-inline-start: 0;
  }
}
#ac-localnav.ac-localnav-noborder .ac-ln-background:after {
  display: none;
}
#ac-localnav.ac-localnav-scrim .ac-ln-background:after {
  -webkit-margin-start: 0;
  margin-inline-start: 0;
  width: 100%;
  inset-inline-start: 0;
}
#ac-localnav.ac-ln-sticking .ac-ln-background:after {
  -webkit-margin-start: 0;
  margin-inline-start: 0;
  width: 100%;
  inset-inline-start: 0;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-background:after {
    -webkit-transition-delay: 240ms;
    transition-delay: 240ms;
    -webkit-transition-duration: 320ms;
    transition-duration: 320ms;
    -webkit-transition-property:
      width,
      inset-inline-start,
      -webkit-margin-start;
    transition-property:
      width,
      inset-inline-start,
      -webkit-margin-start;
    transition-property: margin-inline-start, width, inset-inline-start;
    transition-property:
      margin-inline-start,
      width,
      inset-inline-start,
      -webkit-margin-start;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
}
#ac-ln-menustate:checked ~ #ac-localnav .ac-ln-background:after,
#ac-ln-menustate:target ~ #ac-localnav .ac-ln-background:after {
  -webkit-margin-start: 0;
  margin-inline-start: 0;
  width: 100%;
  inset-inline-start: 0;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
#ac-localnav {
  --r-localnav-menu-tray-padding-top: calc(
    18px * var(--r-localnav-text-zoom-factor)
  );
  --r-localnav-menu-tray-max-height: 0;
  --r-localnav-menu-link-transition-delay: 0;
  --r-localnav-menu-link-color: var(--color-nav-link-color);
  --r-localnav-menu-link-opacity: 0.8;
  --r-localnav-menu-link-border-color: var(--color-nav-link-border-color);
  --r-localnav-menu-link-current-keyline-bottom-offset: 10px;
}
@media (max-width: 767px) {
  #ac-localnav {
    --r-localnav-menu-tray-padding-top: 0;
  }
  #ac-ln-menustate:checked ~ #ac-localnav,
  #ac-ln-menustate:target ~ #ac-localnav {
    --r-localnav-menu-tray-max-height: calc(100vh - 48px - 48px);
  }
  #ac-ln-menustate:checked ~ #ac-localnav.ac-ln-sticking,
  #ac-ln-menustate:target ~ #ac-localnav.ac-ln-sticking {
    --r-localnav-menu-tray-max-height: calc(100vh - 48px);
  }
}
#ac-localnav.ac-localnav-noborder {
  --r-localnav-menu-link-current-keyline-bottom-offset: 0px;
}
.ac-localnav-noborder#ac-localnav.ac-localnav-scrim {
  --r-localnav-menu-link-current-keyline-bottom-offset: 10px;
}
.ac-localnav-noborder#ac-localnav.ac-ln-sticking {
  --r-localnav-menu-link-current-keyline-bottom-offset: 10px;
}
#ac-localnav .ac-ln-menu {
  height: 100%;
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  /* margin-top: -3px; */
  float: var(--r-localnav-end);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu {
    height: auto;
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu {
    font-size: 14px;
    line-height: 1;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
    padding-top: 0;
    margin-top: 0;
    width: 100%;
  }
}
#ac-localnav .ac-ln-menu-tray {
  height: 100%;
  /* padding-top: var(--r-localnav-menu-tray-padding-top); */
  float: var(--r-localnav-start);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-tray {
    float: none;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    width: 100%;
    max-height: var(--r-localnav-menu-tray-max-height);
    -webkit-transition:
      max-height 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms,
      visibility 0s linear 1s;
    transition:
      max-height 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms,
      visibility 0s linear 1s;
  }
  #ac-ln-menustate:checked ~ #ac-localnav .ac-ln-menu-tray,
  #ac-ln-menustate:target ~ #ac-localnav .ac-ln-menu-tray {
    --r-localnav-menu-tray-max-height: var(
      --r-localnav-menu-tray-natural-height,
      calc(100vh - 48px - 48px)
    );
    overflow-y: auto;
    pointer-events: auto;
    visibility: visible;
    -webkit-overflow-scrolling: touch;
    -webkit-transition:
      max-height 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s,
      visibility 0s linear 0s;
    transition:
      max-height 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s,
      visibility 0s linear 0s;
  }
  #ac-ln-menustate:checked ~ #ac-localnav.ac-ln-opening .ac-ln-menu-tray,
  #ac-ln-menustate:target ~ #ac-localnav.ac-ln-opening .ac-ln-menu-tray {
    overflow-y: hidden;
  }
}
#ac-localnav .ac-ln-menu-items {
  height: 100%;
  display: flex;
  align-items: center;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-items {
    flex-direction: column;
    padding: 37px 16px 27px;
  }
}
@media (max-width: 767px) and (max-width: 767px) {
  #ac-localnav .ac-ln-menu-items {
    padding-top: 34px;
  }
}
#ac-localnav .ac-ln-menu-item {
  list-style: none;
  -webkit-margin-start: 24px;
  margin-inline-start: 24px;
  float: var(--r-localnav-start);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-item {
    -webkit-margin-start: 0;
    margin-inline-start: 0;
    display: inline-block;
    float: none;
    width: 100%;
    height: 34px;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(1) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 400ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(2) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 380ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(3) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 360ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(4) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 340ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(5) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(6) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 300ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(7) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 280ms;
  }
  #ac-localnav .ac-ln-menu-item:nth-child(8) .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-transition-duration: 260ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(1)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(1)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 260ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(2)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(2)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 280ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(3)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(3)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 300ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(4)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(4)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 320ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(5)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(5)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 340ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(6)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(6)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 360ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(7)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(7)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 380ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(8)
    .ac-ln-menu-link,
  #ac-ln-menustate:target
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(8)
    .ac-ln-menu-link {
    --r-localnav-menu-link-transition-delay: 400ms;
    --r-localnav-menu-link-transition-duration: 320ms;
  }
}
#ac-localnav .ac-ln-menu-link {
  color: var(--r-localnav-menu-link-color);
  display: inline-block;
  line-height: 22px;
  white-space: nowrap;
  opacity: var(--r-localnav-menu-link-opacity);
  text-decoration: none;
  position: relative;
}
#ac-localnav:not(.ac-ln-opening) .ac-ln-menu-link:hover {
  --r-localnav-menu-link-opacity: 1;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-link {
    --r-localnav-menu-link-opacity: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    line-height: 1.3;
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
    -webkit-transition: var(--r-localnav-menu-link-transition-duration)
      cubic-bezier(0.4, 0, 0.6, 1) var(--r-localnav-menu-link-transition-delay);
    transition: var(--r-localnav-menu-link-transition-duration)
      cubic-bezier(0.4, 0, 0.6, 1) var(--r-localnav-menu-link-transition-delay);
    -webkit-transition-property:
      opacity,
      -webkit-transform;
    transition-property:
      opacity,
      -webkit-transform;
    transition-property: transform, opacity;
    transition-property:
      transform,
      opacity,
      -webkit-transform;
  }
  #ac-ln-menustate:checked ~ #ac-localnav .ac-ln-menu-link,
  #ac-ln-menustate:target ~ #ac-localnav .ac-ln-menu-link {
    --r-localnav-menu-link-opacity: 0.8;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  #ac-ln-menustate:checked ~ #ac-localnav.ac-ln-opening .ac-ln-menu-link,
  #ac-ln-menustate:target ~ #ac-localnav.ac-ln-opening .ac-ln-menu-link {
    pointer-events: none;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav:not(.ac-ln-opening)
    .ac-ln-menu-link:hover,
  #ac-ln-menustate:target
    ~ #ac-localnav:not(.ac-ln-opening)
    .ac-ln-menu-link:hover {
    --r-localnav-menu-link-transition-delay: 0s;
    --r-localnav-menu-link-opacity: 1;
  }
}
#ac-localnav .ac-ln-menu-link.current {
  --r-localnav-menu-link-opacity: 1;
  color: var(--r-localnav-menu-link-color);
  cursor: default;
}
#ac-localnav .ac-ln-menu-link.current:hover {
  color: var(--r-localnav-menu-link-color);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-link.current {
    --r-localnav-menu-link-opacity: 0;
  }
  #ac-ln-menustate:checked ~ #ac-localnav .ac-ln-menu-link.current,
  #ac-ln-menustate:target ~ #ac-localnav .ac-ln-menu-link.current {
    --r-localnav-menu-link-opacity: 0.8;
  }
  #ac-ln-menustate:checked
    ~ #ac-localnav.ac-ln-open:not(.ac-ln-opening)
    .ac-ln-menu-link.current,
  #ac-ln-menustate:target
    ~ #ac-localnav.ac-ln-open:not(.ac-ln-opening)
    .ac-ln-menu-link.current {
    --r-localnav-menu-link-opacity: 1;
  }
}
#ac-localnav .ac-ln-menu-link.current::after {
  content: "";
  position: absolute;
  height: 1px;
  width: 100%;
  border-radius: 1px;
  background-color: var(--r-localnav-menu-link-color);
  inset-inline-start: 0;
  bottom: calc(
    -5px - var(--r-localnav-menu-link-current-keyline-bottom-offset)
  );
  will-change: bottom;
  opacity: 0.8;
}
#ac-localnav.ac-ln-allow-transitions .ac-ln-menu-link.current::after {
  -webkit-transition: bottom 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: bottom 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menu-link.current::after {
    bottom: auto;
    inset-inline-start: -16px;
    height: 12px;
    width: 1.2px;
    border-radius: 1.2px;
    will-change: unset;
  }
}
#ac-localnav {
  --localnav-menucta-color: var(--color-nav-link-color);
}
#ac-localnav .ac-ln-action-menucta {
  display: none;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-action-menucta {
    display: flex;
  }
}
#ac-localnav .ac-ln-menucta {
  -webkit-margin-end: -12px;
  margin-inline-end: -12px;
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 40px;
  height: calc(52px - 18px);
  -webkit-tap-highlight-color: transparent;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menucta {
    height: calc(48px - 18px);
  }
}
#ac-localnav .ac-ln-menucta-chevron {
  opacity: 0.8;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  color: var(--localnav-menucta-color);
}
#ac-localnav .ac-ln-menucta-chevron [data-chevron-icon] {
  -webkit-transform: translate3d(0, 6px, 0);
  transform: translate3d(0, 6px, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: 9px;
  width: 16px;
}
#ac-localnav .ac-ln-menucta-chevron [data-chevron-icon] polyline {
  stroke-width: 1.1px;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menucta-chevron [data-chevron-icon] polyline {
    stroke-width: 1.2px;
  }
}
#ac-localnav .ac-ln-menucta-chevron:hover {
  opacity: 1;
}
#ac-localnav .ac-ln-menucta-anchor {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  z-index: 10;
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-menucta-anchor {
    display: block;
  }
  #ac-localnav .ac-ln-menucta-anchor-close {
    display: none;
  }
}
#ac-localnav .ac-ln-menucta-anchor:focus {
  outline: none;
}
#ac-localnav .ac-ln-menucta-anchor-close {
  display: none;
}
#ac-localnav .ac-ln-menucta-anchor-label {
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
@media (max-width: 767px) {
  #ac-ln-menustate:checked ~ #ac-localnav .ac-ln-menucta-anchor-open,
  #ac-ln-menustate:target ~ #ac-localnav .ac-ln-menucta-anchor-open {
    display: none;
  }
  #ac-ln-menustate:checked ~ #ac-localnav .ac-ln-menucta-anchor-close,
  #ac-ln-menustate:target ~ #ac-localnav .ac-ln-menucta-anchor-close {
    display: block;
  }
}
#ac-localnav {
  --r-localnav-title-vertical-offset: 14px;
  --r-localnav-title-link-opacity: var(--color-nav-link-opacity);
  --r-localnav-title-link-color: var(--color-nav-link-color);
  --r-localnav-title-subhead-color: var(--color-nav-link-color);
  --r-localnav-title-subhead-opacity: 0.56;
}
@media (max-width: 767px) {
  #ac-localnav {
    --r-localnav-title-vertical-offset: 12px;
  }
}
#ac-localnav .ac-ln-title {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 21px;
  line-height: 1.1428571429;
  font-weight: 600;
  letter-spacing: 0.011em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  cursor: default;
  /* display: block; */
  /* margin: var(--r-localnav-title-vertical-offset) 0
    calc(var(--r-localnav-title-vertical-offset) * -1); */
  padding: 0;
  white-space: nowrap;
  float: var(--r-localnav-start);
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-title {
    font-size: 19px;
    line-height: 1.2631578947;
    font-weight: 600;
    letter-spacing: 0.012em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
@media (max-width: 767px) {
  #ac-localnav .ac-ln-title {
    --r-localnav-title-vertical-offset: 12px;
    /* display: inline-block; */
  }
}
#ac-localnav .ac-ln-title a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  /* -ms-flex-direction: column-reverse;
  flex-direction: column-reverse; */
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  text-decoration: none;
  white-space: nowrap;
  opacity: var(--r-localnav-title-link-opacity);
}
#ac-localnav .ac-ln-title a:hover {
  text-decoration: none;
}
#ac-localnav .ac-ln-title,
#ac-localnav .ac-ln-title a {
  color: var(--r-localnav-title-link-color);
  -webkit-transition: color 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: color 0.24s cubic-bezier(0.28, 0.11, 0.32, 1);
}
#ac-localnav .ac-ln-button {
  --sk-button-color: rgb(255, 255, 255);
  --sk-button-color-hover: var(--sk-button-color);
  --sk-button-color-active: var(--sk-button-color-hover);
  --sk-button-disabled-opacity: var(--sk-link-disabled-opacity, 0.42);
  --sk-button-border-color: transparent;
  --sk-button-border-radius: 980px;
  --sk-button-margin-horizontal: 14px;
  --sk-button-margin-vertical: 14px;
  --sk-button-min-width-basis: 60px;
  --sk-button-padding-horizontal: 16px;
  --sk-button-padding-vertical: 9px;
  --sk-button-border-width: 1px;
  --sk-button-box-sizing: content-box;
  --sk-button-width: auto;
  --sk-button-display: inline-block;
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  letter-spacing: -0.016em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  background: var(--sk-button-background);
  color: var(--sk-button-color);
  border-color: var(--sk-button-border-color);
  padding-block: calc(
    var(--sk-button-padding-vertical) - var(--sk-button-border-width)
  );
  padding-inline: calc(
    var(--sk-button-padding-horizontal) - var(--sk-button-border-width)
  );
  border-radius: var(--sk-button-border-radius);
  border-style: solid;
  border-width: var(--sk-button-border-width);
  width: var(--sk-button-width);
  min-width: calc(
    var(--sk-button-min-width-basis) - var(--sk-button-padding-horizontal) * 2
  );
  cursor: pointer;
  display: var(--sk-button-display);
  -webkit-box-sizing: var(--sk-button-box-sizing);
  box-sizing: var(--sk-button-box-sizing);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  --sk-button-background: var(--color-fill-blue);
  --sk-button-background-hover: #0076df;
  --sk-button-background-active: #006edb;
  --sk-button-padding-horizontal: 11px;
  --sk-button-padding-vertical: 4px;
  --sk-button-min-width-basis: 45px;
  --sk-button-margin-horizontal: 10px;
  --sk-button-margin-vertical: 10px;
  font-size: 12px;
  line-height: 1.3333733333;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
#ac-localnav .ac-ln-button:hover {
  background: var(--sk-button-background-hover, var(--sk-button-background));
  color: var(--sk-button-color-hover, var(--sk-button-color));
  text-decoration: none;
  border-color: transparent;
}
#ac-localnav .ac-ln-button:active {
  background: var(--sk-button-background-active, var(--sk-button-background));
  color: var(--sk-button-color-active, var(--sk-button-color));
  outline: none;
}
#ac-localnav .ac-ln-button:disabled {
  pointer-events: none;
  opacity: var(--sk-button-disabled-opacity);
}

li,
ul {
  margin: 0;
  padding: 0;
}
:focus {
  outline: 2px solid var(--color-fill-blue);
  outline-offset: 0px;
}
ul {
  margin-left: 1.1764705882em;
}
nav ul {
  margin: 0;
  list-style: none;
}
a {
  color: var(--color-figure-blue);
  letter-spacing: inherit;
}
a:link,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:active {
  text-decoration: none;
}
a :disabled {
  opacity: var(--sk-link-disabled-opacity);
}
@media only screen and (min-width: 768px) {
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    border-radius: 980px;
    font-size: 12px;
    line-height: 1.3333733333;
    font-weight: 400;
    letter-spacing: -0.01em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
    padding: 3px 10px;
    margin-top: -1px;
    background: transparent;
    color: var(--color-nav-link-color);
    border: 1px solid var(--color-nav-link-color);
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:hover {
    text-decoration: none;
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:active {
    outline: none;
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:disabled {
    cursor: default;
    pointer-events: none;
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:active,
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:focus,
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:hover {
    background: var(--color-nav-link-color);
    color: var(--color-nav-solid-background);
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral:focus {
    box-shadow: none;
    outline: 2px solid var(--color-nav-link-color);
    outline-offset: 3px;
  }
  #ac-localnav .ac-ln-menu-link.button-secondary-neutral {
    outline-color: var(--color-nav-link-color);
  }
}

#ac-ln-menustate {
  display: none;
}

#ac-ln-fixed-placeholder {
  display: block;
  margin: 0;
  padding: 0;
  position: relative;
  visibility: hidden;
  z-index: -1;
}

#ac-ln-curtain {
  --localnav-curtain-background: var(--color-nav-curtain-background);
  --r-localnav-curtain-transition: opacity 0.2s ease;
  --r-localnav-curtain-width: 0;
  --r-localnav-curtain-height: 0;
  background: var(--localnav-curtain-background);
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: var(--r-localnav-curtain-width);
  height: var(--r-localnav-curtain-height);
  z-index: 9996;
  -webkit-transition: var(--r-localnav-curtain-transition);
  transition: var(--r-localnav-curtain-transition);
}
@media (max-width: 767px) {
  #ac-localnav ~ #ac-ln-curtain {
    --r-localnav-curtain-transition: opacity 320ms cubic-bezier(0.4, 0, 0.6, 1)
        240ms,
      backdrop-filter 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms,
      -webkit-backdrop-filter 320ms cubic-bezier(0.4, 0, 0.6, 1) 240ms,
      width 0s ease 560ms, height 0s ease 560ms;
    -webkit-backdrop-filter: blur(0px);
    backdrop-filter: blur(0px);
  }
  #ac-ln-menustate:checked ~ #ac-localnav ~ #ac-ln-curtain,
  #ac-ln-menustate:target ~ #ac-localnav ~ #ac-ln-curtain {
    --r-localnav-curtain-width: 100%;
    --r-localnav-curtain-height: 100%;
    --r-localnav-curtain-transition: opacity 320ms cubic-bezier(0.4, 0, 0.6, 1)
        0s,
      backdrop-filter 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s,
      -webkit-backdrop-filter 320ms cubic-bezier(0.4, 0, 0.6, 1) 0s,
      width 0s ease 0s, height 0s ease 0s;
    opacity: 1;
    right: 0;
    bottom: 0;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
  #ac-localnav ~ #ac-ln-curtain.ac-ln-curtain-opening {
    pointer-events: none;
  }
}
</style>
