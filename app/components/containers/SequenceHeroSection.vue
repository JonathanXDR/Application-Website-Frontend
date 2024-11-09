<template>
  <section
    ref="sectionRef"
    class="section section-hero"
    :class="{ 'load-state': isLoading, 'hero-fallback': isFallbackMode }"
    :style="sectionStyles"
  >
    <div class="overview-hero-intro sticky-container">
      <div class="sticky-content">
        <div class="overview-hero-background" :style="backgroundStyles" />
        <div class="enhanced-section-content">
          <div class="grid-content static-container">
            <div class="overview-hero-icon grid-content-overlay">
              <div
                class="hero-lock-icon-container enhanced-icon-container"
                :style="iconContainerStyles"
              >
                <HeroIcon ref="heroIconRef" />
              </div>
            </div>
            <h1
              ref="headlineRef"
              class="typography-overview-hero-headline overview-hero-headline grid-content-overlay static-content"
            >
              <div class="aria-headline visuallyhidden">
                {{ title }}
              </div>
              <div
                class="default-headline"
                aria-hidden="true"
                v-html="formattedHeadline"
              />
              <div
                class="masked-headline"
                aria-hidden="true"
                v-html="formattedMaskedHeadline"
              />
            </h1>
          </div>
          <div
            ref="copyContainerRef"
            class="overview-hero-copy-container static-container"
          >
            <div class="overview-hero-copy-content static-content">
              <div class="hero-lock-icon-container">
                <HeroIcon />
              </div>
              <p
                class="overview-hero-copy typography-overview-hero-copy large-9 small-12"
                :style="copyStyles"
              >
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-duration" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroIcon from "~/components/common/HeroIcon.vue";

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    background: string;
  }>(),
  {
    title: "Privacy. That's Apple.",
    description:
      "Privacy is a fundamental human right. It's also one of our core values. Which is why we design our products and services to protect it. That's the kind of innovation we believe&nbsp;in.",
    background:
      "https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_large.jpg",
  },
);

const sectionRef = ref<HTMLElement | null>(null);

const heroIconRef = ref<InstanceType<typeof HeroIcon> | null>(null);
const headlineRef = ref<HTMLElement | null>(null);
const copyContainerRef = ref<HTMLElement | null>(null);

const isLoading = ref(true);
const isFallbackMode = ref(false);

const { width: windowWidth, height: windowHeight } = useWindowSize();

// Animation variables
const backgroundSize = ref("3292.0888888888894px 985.0000000000001px");
const backgroundMultiplier = ref(1.0944444444444446);
const heroOffset = ref("180.5px");
const iconHeight = ref("92px");
const backgroundBlur = ref(0);
const backgroundAlpha = ref(0);
const backgroundOpacity = ref(1);
const iconScale = ref(1);
const iconTranslateY = ref(0);
const copyTranslateY = ref(0);
const copyOpacity = ref(0);

// Computed styles
const sectionStyles = computed(() => ({
  "--background-size": backgroundSize.value,
  "--background-multiplier": backgroundMultiplier.value,
  "--hero-offset": heroOffset.value,
  "--icon-height": iconHeight.value,
  "--background-blur": `${backgroundBlur.value}px`,
  "--background-alpha": `rgba(0, 0, 0, ${backgroundAlpha.value})`,
}));

const backgroundStyles = computed(() => ({
  opacity: backgroundOpacity.value,
}));

const iconContainerStyles = computed(() => ({
  transform: `matrix(${iconScale.value}, 0, 0, ${iconScale.value}, 0, ${iconTranslateY.value})`,
}));

const copyStyles = computed(() => ({
  transform: `matrix(1, 0, 0, 1, 0, ${copyTranslateY.value})`,
  opacity: copyOpacity.value,
}));

// Headline formatting
const formattedHeadline = computed(() => {
  return props.title
    .split("")
    .map((char, index) => {
      return `<span class="animate-character" aria-hidden="true" style="transform: matrix(0, 0, 0, 0, ${299.2 - index * 29.75}, 0)">${char}</span>`;
    })
    .join("");
});

const formattedMaskedHeadline = computed(() => {
  return props.title
    .split("")
    .map((_, index) => {
      return `<span class="animate-character dot-character" aria-hidden="true" style="transform: matrix(1, 0, 0, 1, ${299.2 - index * 29.75}, 0)"></span>`;
    })
    .join("");
});

// Lifecycle hooks
onMounted(() => {
  initializeAnimation();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Methods
const initializeAnimation = () => {
  if (!sectionRef.value || !headlineRef.value || !copyContainerRef.value) {
    return;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Background animation
  timeline
    .to(backgroundBlur, { value: 50, duration: 1 })
    .to(backgroundAlpha, { value: 0.6, duration: 1 }, "<");

  // Icon animation
  timeline
    .to(iconScale, { value: 1.35, duration: 0.2, ease: "power2.out" })
    .to(
      iconTranslateY,
      { value: -80, duration: 0.4, ease: "power2.inOut" },
      "<",
    );

  // Copy animation
  timeline
    .to(copyOpacity, { value: 1, duration: 0.3 }, "-=0.2")
    .to(
      copyTranslateY,
      { value: -80, duration: 0.4, ease: "power2.inOut" },
      "<",
    );

  // Headline animation
  const headlineChars =
    headlineRef.value.querySelectorAll(".animate-character");
  headlineChars.forEach((char, index) => {
    timeline.fromTo(
      char,
      { opacity: 0, y: 20, scale: 0 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
      index * 0.05,
    );
  });

  // Masked headline animation
  const maskedChars = headlineRef.value.querySelectorAll(".dot-character");
  maskedChars.forEach((char, index) => {
    timeline.to(
      char,
      { scale: 0, duration: 0.3, ease: "power2.in" },
      0.5 + index * 0.05,
    );
  });

  // Icon-specific animations
  if (!heroIconRef.value) return;
  const iconTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  heroIconRef.value.animate(iconTimeline);

  isLoading.value = false;
};

const handleResize = () => {
  updateBackgroundSize();
  checkFallbackState();
};

const updateBackgroundSize = () => {
  const backgroundAspectRatio = 3292 / 985;
  const scale = Math.max(windowWidth.value / 3292, windowHeight.value / 985);
  backgroundSize.value = `${3292 * scale}px ${985 * scale}px`;
  backgroundMultiplier.value = scale;
};

const checkFallbackState = () => {
  if (!sectionRef.value) return;
  const fallbackHeight = Number.parseInt(
    getComputedStyle(sectionRef.value).getPropertyValue("--fallback-height"),
  );
  isFallbackMode.value = windowHeight.value <= fallbackHeight;
};

// Watch for changes in window size
watch([windowWidth, windowHeight], () => {
  handleResize();
});
</script>

<style scoped>
.typography-overview-hero-headline {
  font-size: 80px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.015em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-overview-hero-headline {
    font-size: 56px;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -0.005em;
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
@media only screen and (max-width: 734px) {
  .typography-overview-hero-headline {
    font-size: 48px;
    line-height: 1;
    font-weight: 600;
    letter-spacing: -0.003em;
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
.typography-overview-hero-copy {
  font-size: 48px;
  line-height: 1.08349;
  font-weight: 600;
  letter-spacing: -0.003em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-overview-hero-copy {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: 0em;
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
@media only screen and (max-width: 734px) {
  .typography-overview-hero-copy {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
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
.large-9 {
  -ms-flex-preferred-size: 75%;
  flex-basis: 75%;
  max-width: 75%;
}
@media only screen and (max-width: 734px) {
  .small-12 {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }
}
.typography-overview-hero-headline {
  font-size: 80px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.015em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-overview-hero-headline {
    font-size: 56px;
    line-height: 1.07143;
    font-weight: 600;
    letter-spacing: -0.005em;
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
@media only screen and (max-width: 734px) {
  .typography-overview-hero-headline {
    font-size: 48px;
    line-height: 1;
    font-weight: 600;
    letter-spacing: -0.003em;
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
.typography-overview-hero-copy {
  font-size: 48px;
  line-height: 1.08349;
  font-weight: 600;
  letter-spacing: -0.003em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-overview-hero-copy {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: 0em;
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
@media only screen and (max-width: 734px) {
  .typography-overview-hero-copy {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
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
.section-hero {
  --r-localnav-height: 52px;
  --section-offset: var(--r-localnav-height);
  --scroll-duration: 300px;
  --dot-size: 20px;
  --dot-margin: 0.095em;
  --icon-size: 65px;
  --background-blur: 0;
  --background-alpha: rgba(0, 0, 0, 0);
  --background-image-width: 3008px;
  --background-image-height: 900px;
  --background-size: var(--background-image-width)
    var(--background-image-height);
  --icon-y: -80px;
  --fallback-height: 550px;
  --copy-offset-start: 510px;
  --min-pad-top: 90px;
  --pos: 0.48;
  position: relative;
  margin-top: calc((var(--section-offset) * 2) * -1);
}
@media only screen and (max-width: 1068px) {
  .section-hero {
    --dot-size: 15px;
    --icon-size: 55px;
    --background-image-width: 1068px;
    --background-image-height: 768px;
    --icon-y: -60px;
    --fallback-height: 470px;
    --copy-offset-start: 410px;
  }
}
@media only screen and (max-width: 734px) {
  .section-hero {
    --dot-size: 12px;
    --icon-size: 40px;
    --background-image-width: 734px;
    --background-image-height: 844px;
    --icon-y: -40px;
    --copy-offset-start: 300px;
    --min-pad-top: 110px;
    --pos: 0.38;
  }
}
@media only screen and (min-width: 735px) {
  .section-hero .pseudo-space:before {
    content: "\00a0";
  }
}
@media only screen and (max-width: 734px) {
  .section-hero .pseudo-space {
    display: block;
  }
}
.section-hero .dot-character {
  width: var(--dot-size);
  height: var(--dot-size);
  background: #fff;
  display: block;
  margin: auto;
  border-radius: 999px;
  margin: auto var(--dot-margin);
}
.section-hero .dot-character:first-of-type {
  margin-left: 0;
}
.section-hero .dot-character:last-of-type {
  margin-right: 0;
}
.section-hero .sticky-container {
  position: relative;
}
.section-hero .sticky-content {
  top: 0;
  margin-top: calc(var(--scroll-duration) * -0.65);
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: var(--section-offset);
  position: -webkit-sticky;
  position: sticky;
  min-height: 100vh;
}
.section-hero .scroll-duration {
  height: var(--scroll-duration);
}
.section-hero .overview-hero-background {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  top: 0;
  pointer-events: none;
}
.section-hero .overview-hero-background,
.section-hero .overview-hero-background:before,
.section-hero .overview-hero-background:after {
  position: absolute;
  left: 0;
  width: 100%;
  height: 200%;
}
.section-hero .overview-hero-background:before {
  background-repeat: no-repeat;
  background-image: var(--background-image);
  content: "";
  position: absolute;
  background-size: var(--background-size);
  background-position-y: 12px;
  --background-image-offset-from-center: 0.0178;
  background-position-x: calc(
    50% - var(--background-image-width) *
      var(--background-image-offset-from-center, 0)
  );
  inset-block-start: 0;
  inset-inline: 0;
  will-change: filter;
  -webkit-filter: blur(var(--background-blur)) brightness(0.7);
  filter: blur(var(--background-blur)) brightness(0.7);
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-resolution: 1.5dppx),
  (-webkit-min-device-pixel-ratio: 1.5),
  (min-resolution: 144dpi) {
  .section-hero .overview-hero-background:before {
    background-image: url("https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_large_2x.jpg");
  }
}
@media only screen and (max-width: 1068px) {
  .section-hero .overview-hero-background:before {
    background-repeat: no-repeat;
    background-image: url("https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_medium.jpg");
  }
}
@media only screen and (max-width: 1068px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (max-width: 1068px) and (min-resolution: 1.5dppx),
  only screen and (max-width: 1068px) and (min-resolution: 144dpi) {
  .section-hero .overview-hero-background:before {
    background-image: url("https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_medium_2x.jpg");
  }
}
@media only screen and (max-width: 734px) {
  .section-hero .overview-hero-background:before {
    background-repeat: no-repeat;
    background-image: url("https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_small.jpg");
  }
}
@media only screen and (max-width: 734px) and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (max-width: 734px) and (min-resolution: 1.5dppx),
  only screen and (max-width: 734px) and (min-resolution: 144dpi) {
  .section-hero .overview-hero-background:before {
    background-image: url("https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_small_2x.jpg");
  }
}
@media only screen and (max-width: 1068px) {
  .section-hero .overview-hero-background:before {
    background-position-y: 0px;
    --background-image-offset-from-center: 0.002;
  }
}
@media only screen and (max-width: 734px) {
  .section-hero .overview-hero-background:before {
    --background-image-offset-from-center: -0.004;
  }
}
.section-hero .overview-hero-background:before {
  background-attachment: fixed;
}
.section-hero .overview-hero-background:after {
  content: "";
  background: var(--background-alpha);
  height: 110%;
}
.section-hero .overview-hero-intro {
  text-align: center;
}
.section-hero .overview-hero-intro .enhanced-section-content {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
  margin-top: 0;
  margin-bottom: 80px;
}
@media only screen and (min-width: 1441px) {
  .section-hero .overview-hero-intro .enhanced-section-content {
    margin-left: auto;
    margin-right: auto;
    width: 980px;
  }
}
@media only screen and (max-width: 1068px) {
  .section-hero .overview-hero-intro .enhanced-section-content {
    margin-left: auto;
    margin-right: auto;
    width: 692px;
  }
}
@media only screen and (max-width: 734px) {
  .section-hero .overview-hero-intro .enhanced-section-content {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
}
.section-hero .overview-hero-intro .grid-content {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
  padding-top: max(
    var(--min-pad-top),
    calc(
      var(--min-pad-top) +
        (
          var(--background-image-height) * var(--pos) *
            (var(--background-multiplier) - 1)
        )
    )
  );
}
.section-hero .overview-hero-intro .grid-content .grid-content-overlay {
  grid-column: 1;
  text-align: center;
}
.section-hero .overview-hero-intro .overview-hero-headline {
  position: relative;
  -webkit-font-kerning: none;
  font-kerning: none;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.section-hero .overview-hero-intro .overview-hero-headline .animate-character {
  -webkit-transform-origin: center center;
  transform-origin: center center;
  display: inline-block;
  vertical-align: middle;
}

.section-hero .overview-hero-intro .overview-hero-headline .masked-headline {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
@media only screen and (min-width: 735px) {
  .section-hero
    .overview-hero-intro
    .overview-hero-headline
    .masked-headline
    .pseudo-space {
    display: none;
  }
}
@media only screen and (max-width: 734px) {
  .section-hero
    .overview-hero-intro
    .overview-hero-headline
    .masked-headline
    .animate-character {
    position: relative;
    top: 6px;
  }
}
.section-hero .overview-hero-intro .hero-lock-icon-container {
  margin-left: auto;
  margin-right: auto;
  width: var(--icon-size);
  margin-bottom: 42px;
}

.section-hero
  .overview-hero-intro
  .hero-lock-icon-container.enhanced-icon-container {
  display: block;
}

.section-hero
  .overview-hero-intro
  .hero-lock-icon-container:not(.enhanced-icon-container) {
  display: none;
}

.section-hero .overview-hero-intro .hero-lock-icon-container .hero-lock-icon {
  fill: #fff;
}
.section-hero .hero-lock-icon-container.enhanced-icon-container,
.section-hero .overview-hero-headline {
  margin-top: calc(var(--copy-offset-start) / 2);
}
.section-hero .overview-hero-icon,
.section-hero .overview-hero-headline {
  grid-row: 1;
  -ms-flex-item-align: start;
  align-self: start;
}
.section-hero .overview-hero-icon {
  -webkit-transition: -webkit-transform 500ms ease-in;
  transition: -webkit-transform 500ms ease-in;
  transition: transform 500ms ease-in;
  transition:
    transform 500ms ease-in,
    -webkit-transform 500ms ease-in;
}
.section-hero .overview-hero-copy-container {
  -ms-flex-item-align: center;
  align-self: center;
}
.section-hero .overview-hero-copy {
  -webkit-transform: translateY(50px);
  transform: translateY(50px);
  opacity: 0;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
@media only screen and (max-width: 734px) {
  .section-hero .overview-hero-copy {
    margin-top: -18px;
  }
}
</style>
