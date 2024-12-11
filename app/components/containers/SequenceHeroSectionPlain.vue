<template>
  <section
    class="section section-hero"
    data-component-list="HeroSequence"
    data-component-json="{ &quot;characterClass&quot;: &quot;animate-character&quot;, &quot;dotClass&quot;: &quot;dot-character&quot;, &quot;els&quot;: [{&quot;_stickyContainer&quot;: &quot;.sticky-container&quot;}, {&quot;_stickyContent&quot;: &quot;.sticky-content&quot;}, {&quot;_gridContent&quot;: &quot;.grid-content&quot;}, {&quot;_headline&quot;: &quot;.overview-hero-headline&quot;}, {&quot;_background&quot;: &quot;.overview-hero-background&quot;}, {&quot;_iconSection&quot;: &quot;.overview-hero-icon&quot;}, {&quot;_iconContainer&quot;: &quot;.hero-lock-icon-container&quot;}, {&quot;_icon&quot;: &quot;.hero-lock-icon&quot;}, {&quot;_copy&quot;: &quot;.overview-hero-copy&quot;}, {&quot;_copyContainer&quot;: &quot;.overview-hero-copy-container&quot;}, {&quot;_scrollDuration&quot;: &quot;.scroll-duration&quot;}]}"
    data-analytics-section-engagement="name:hero"
    style="
      --background-size: 3292.0888888888894px 985.0000000000001px;
      --background-multiplier: 1.0944444444444446;
      --hero-offset: 180.5px;
      --icon-height: 92px;

      /* background-blur starts from 0px and increases towards 50px */
      --background-blur: 50px;
      /* background-alpha starts from rgba(0, 0, 0, 0) and increases towards rgba(0, 0, 0, 0.6) */
      --background-alpha: rgba(0, 0, 0, 0.6);
    "
  >
    <div class="overview-hero-intro sticky-container">
      <div class="sticky-content">
        <!-- opacity starts from 1 and decreases towards 0 -->
        <div
          class="overview-hero-background"
          style="opacity: 0"
        />
        <div class="enhanced-section-content">
          <div class="grid-content static-container">
            <div class="overview-hero-icon grid-content-overlay">
              <div
                class="hero-lock-icon-container enhanced-icon-container"
                style="transform: matrix(1.35, 0, 0, 1.35, 0, -80)"
              >
                <svg
                  class="hero-lock-icon enhanced-icon"
                  viewBox="0 0 64 84"
                  data-thing=""
                >
                  <defs>
                    <clipPath id="apple-clip">
                      <path
                        id="clip-1"
                        d="M19.94,84.56c-5.74,0-9.6-5.54-12.15-9.21A42.61,42.61,0,0,1,1.23,59.07C0,52,.82,45.59,3.69,40.62a18.34,18.34,0,0,1,15.49-9.35h.25a20,20,0,0,1,7.36,1.82,12.33,12.33,0,0,0,2.75.9,14.42,14.42,0,0,0,2.51-.85,23.34,23.34,0,0,1,8.6-2c.38,0,.76,0,1.14,0a17.36,17.36,0,0,1,13.69,7.49l1.85,2.72L54.46,43a11,11,0,0,0-5.23,9.23,10.79,10.79,0,0,0,6.42,9.87l2.65.88-.79,2.76a36.62,36.62,0,0,1-4.74,9.78c-2.56,3.75-6.06,8.89-12,9h-.29a13.57,13.57,0,0,1-5.81-1.41A9.52,9.52,0,0,0,30.39,82a10.47,10.47,0,0,0-4.6,1.12,14.47,14.47,0,0,1-5.53,1.45ZM64,0H0V84H64Z"
                      />
                    </clipPath>
                    <path
                      id="leaf-2"
                      d="M30.26,35.3C30.64,34.86,30.82,34.29,30.77,33.71C30.21,33.77,29.69,34.04,29.31,34.47C28.93,34.88,28.74,35.44,28.79,36C29.36,36,29.9,35.75,30.26,35.3"
                    />
                    <path
                      id="arm-3"
                      d="M38.85,38.49C38.85,38.49,38.85,19,38.85,19C38.85,13.52,43.3,9.07,48.78,9.07C48.78,9.07,48.78,9.07,48.78,9.07C54.26,9.08,58.7,13.52,58.71,19C58.71,19,58.71,26,58.71,26"
                    />
                    <path
                      id="arm-4"
                      d="M38.85,34.88C38.85,34.88,38.85,15.37,38.85,15.37C38.85,9.89,34.4,5.44,28.92,5.44C28.92,5.44,28.92,5.44,28.92,5.44C23.44,5.44,18.99,9.89,19,15.37C19,15.37,19,22.37,19,22.37"
                    />
                    <path
                      id="arm-5"
                      d="M38.85,49.6C38.85,49.6,38.85,30.09,38.85,30.09C38.84,24.61,34.4,20.17,28.92,20.16C28.92,20.16,28.92,20.16,28.92,20.16C23.44,20.17,19,24.61,19,30.09C19,30.09,19,37.09,19,37.09"
                    />
                    <path
                      id="arm-6"
                      d="M38.85,42.6C38.85,42.6,38.85,23.09,38.85,23.09C38.84,17.61,34.4,13.17,28.92,13.16C28.92,13.16,28.92,13.16,28.92,13.16C23.44,13.17,19,17.61,19,23.09C19,23.09,19,31.09,19,31.09"
                    />
                  </defs>
                  <g
                    id="privacy-icon-inner"
                    style="transform: matrix(1, 0, 0, 1, 0, 0)"
                  >
                    <path
                      id="leaf"
                      class="cls-2"
                      d="M30.260000228881836,35.29999923706055C30.639999389648438,34.86000061035156,30.81999969482422,34.290000915527344,30.770000457763672,33.709999084472656C30.209999084472656,33.77000045776367,29.690000534057617,34.040000915527344,29.309999465942383,34.470001220703125C28.93000030517578,34.880001068115234,28.739999771118164,35.439998626708984,28.790000915527344,36C29.360000610351562,36,29.899999618530273,35.75,30.260000228881836,35.29999923706055"
                      style="opacity: 0"
                    />
                    <path
                      id="apple"
                      d="M29.54,37c-2.47,0-6.29-2.8-10.32-2.7A15.22,15.22,0,0,0,6.29,42.12c-5.52,9.58-1.42,23.73,4,31.52,2.64,3.79,5.75,8,9.88,7.92,4-.17,5.45-2.58,10.26-2.58s6.13,2.58,10.32,2.48,7-3.86,9.58-7.69a33.94,33.94,0,0,0,4.34-8.9,13.8,13.8,0,0,1-8.4-12.66C46.16,44.29,52.7,40.5,53,40.33a14.67,14.67,0,0,0-11.44-6.2C36.35,33.73,32,37,29.54,37Z"
                    />
                    <path
                      id="arm"
                      style="opacity: 1"
                      class="cls-3"
                      d="M38.849998474121094,42.599998474121094C38.849998474121094,42.599998474121094,38.849998474121094,23.09000015258789,38.849998474121094,23.09000015258789C38.84000015258789,17.610000610351562,34.400001525878906,13.170000076293945,28.920000076293945,13.15999984741211C28.920000076293945,13.15999984741211,28.920000076293945,13.15999984741211,28.920000076293945,13.15999984741211C23.440000534057617,13.170000076293945,19,17.610000610351562,19,23.09000015258789C19,23.09000015258789,19,31.09000015258789,19,31.09000015258789"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <h1
              class="typography-overview-hero-headline overview-hero-headline grid-content-overlay static-content"
              data-default=".default-headline"
              data-masked=".masked-headline"
              data-component-list="FocusComponent"
              data-focus-options="{ &quot;tabindex&quot;: &quot;-1&quot;, &quot;keyframeEvent&quot;: &quot;hero-headline-vo&quot;, &quot;disabledWhen&quot;: &quot;reduced-motion&quot; }"
              tabindex="-1"
              style="
                outline: none;
                /* opacity 0 style is added as soon as the dots have merged into the hero-lock-icon */
                opacity: 0;
              "
            >
              <div class="aria-headline visuallyhidden">
                {{ title }}
              </div>
              <div
                class="default-headline"
                aria-hidden="true"
              >
                <!-- use a v-for here using the "title" prop -->
                <span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 299.2, 0)"
                >P</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 269.45, 0)"
                >r</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 239.7, 0)"
                >i</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 209.1, 0)"
                >v</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 179.35, 0)"
                >a</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 149.6, 0)"
                >c</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 119.85, 0)"
                >y</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 90.1, 0)"
                >.</span><span class="pseudo-space" /><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 59.5, 0)"
                >T</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 29.75, 0)"
                >h</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, 0, 0)"
                >a</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -29.75, 0)"
                >t</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -59.5, 0)"
                >’</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -89.25, 0)"
                >s</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -119.85, 0)"
                >&nbsp;</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -149.6, 0)"
                >A</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -179.35, 0)"
                >p</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -209.1, 0)"
                >p</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -238.85, 0)"
                >l</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -269.45, 0)"
                >e</span><span
                  class="animate-character"
                  aria-hidden="true"
                  style="transform: matrix(0, 0, 0, 0, -299.2, 0)"
                >.</span>
              </div>
              <div
                class="masked-headline"
                aria-hidden="true"
              >
                <span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 299.2, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 269.45, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 239.7, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 209.1, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 179.35, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 149.6, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 119.85, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 90.1, 0)"
                /><span class="pseudo-space" /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 59.5, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 29.75, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, 0, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -29.75, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -59.5, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -89.25, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -119.85, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -149.6, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -179.35, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -209.1, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -238.85, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -269.45, 0)"
                /><span
                  class="animate-character dot-character"
                  aria-hidden="true"
                  style="transform: matrix(1, 0, 0, 1, -299.2, 0)"
                />
              </div>
            </h1>
          </div>
          <div
            class="overview-hero-copy-container static-container"
            data-component-list="FocusComponent"
            data-focus-options="{ &quot;tabindex&quot;: &quot;-1&quot;, &quot;keyframeEvent&quot;: &quot;hero-copy-vo&quot;, &quot;disabledWhen&quot;: &quot;reduced-motion&quot; }"
            tabindex="-1"
            style="outline: none"
          >
            <div class="overview-hero-copy-content static-content">
              <div class="hero-lock-icon-container">
                <svg
                  class="hero-lock-icon"
                  viewBox="0 0 64 84"
                  data-thing="true"
                >
                  <defs>
                    <clipPath id="static-apple-clip">
                      <path
                        id="clip-1"
                        d="M19.94,84.56c-5.74,0-9.6-5.54-12.15-9.21A42.61,42.61,0,0,1,1.23,59.07C0,52,.82,45.59,3.69,40.62a18.34,18.34,0,0,1,15.49-9.35h.25a20,20,0,0,1,7.36,1.82,12.33,12.33,0,0,0,2.75.9,14.42,14.42,0,0,0,2.51-.85,23.34,23.34,0,0,1,8.6-2c.38,0,.76,0,1.14,0a17.36,17.36,0,0,1,13.69,7.49l1.85,2.72L54.46,43a11,11,0,0,0-5.23,9.23,10.79,10.79,0,0,0,6.42,9.87l2.65.88-.79,2.76a36.62,36.62,0,0,1-4.74,9.78c-2.56,3.75-6.06,8.89-12,9h-.29a13.57,13.57,0,0,1-5.81-1.41A9.52,9.52,0,0,0,30.39,82a10.47,10.47,0,0,0-4.6,1.12,14.47,14.47,0,0,1-5.53,1.45ZM64,0H0V84H64Z"
                      />
                    </clipPath>
                    <path
                      id="leaf-2"
                      d="M30.26,35.3C30.64,34.86,30.82,34.29,30.77,33.71C30.21,33.77,29.69,34.04,29.31,34.47C28.93,34.88,28.74,35.44,28.79,36C29.36,36,29.9,35.75,30.26,35.3"
                    />
                    <path
                      id="arm-3"
                      d="M38.85,38.49C38.85,38.49,38.85,19,38.85,19C38.85,13.52,43.3,9.07,48.78,9.07C48.78,9.07,48.78,9.07,48.78,9.07C54.26,9.08,58.7,13.52,58.71,19C58.71,19,58.71,26,58.71,26"
                    />
                    <path
                      id="arm-4"
                      d="M38.85,34.88C38.85,34.88,38.85,15.37,38.85,15.37C38.85,9.89,34.4,5.44,28.92,5.44C28.92,5.44,28.92,5.44,28.92,5.44C23.44,5.44,18.99,9.89,19,15.37C19,15.37,19,22.37,19,22.37"
                    />
                    <path
                      id="arm-5"
                      d="M38.85,49.6C38.85,49.6,38.85,30.09,38.85,30.09C38.84,24.61,34.4,20.17,28.92,20.16C28.92,20.16,28.92,20.16,28.92,20.16C23.44,20.17,19,24.61,19,30.09C19,30.09,19,37.09,19,37.09"
                    />
                    <path
                      id="arm-6"
                      d="M38.85,42.6C38.85,42.6,38.85,23.09,38.85,23.09C38.84,17.61,34.4,13.17,28.92,13.16C28.92,13.16,28.92,13.16,28.92,13.16C23.44,13.17,19,17.61,19,23.09C19,23.09,19,31.09,19,31.09"
                    />
                  </defs>
                  <g id="privacy-icon-inner">
                    <path
                      id="leaf"
                      class="cls-2"
                      d="M38.34,29C40.71,26.23,41.88,22.63,41.59,19C38.03,19.35,34.74,21.05,32.39,23.74C30.39,26.07,28.6,29.83,29.07,33.42C32.56,33.69,36.14,31.63,38.34,28.99"
                    />
                    <path
                      id="apple"
                      d="M29.54,37c-2.47,0-6.29-2.8-10.32-2.7A15.22,15.22,0,0,0,6.29,42.12c-5.52,9.58-1.42,23.73,4,31.52,2.64,3.79,5.75,8,9.88,7.92,4-.17,5.45-2.58,10.26-2.58s6.13,2.58,10.32,2.48,7-3.86,9.58-7.69a33.94,33.94,0,0,0,4.34-8.9,13.8,13.8,0,0,1-8.4-12.66C46.16,44.29,52.7,40.5,53,40.33a14.67,14.67,0,0,0-11.44-6.2C36.35,33.73,32,37,29.54,37Z"
                    />
                    <path
                      id="arm-static"
                      d="M38.849998474121094,42.599998474121094C38.849998474121094,42.599998474121094,38.849998474121094,23.09000015258789,38.849998474121094,23.09000015258789C38.84000015258789,17.610000610351562,34.400001525878906,13.170000076293945,28.920000076293945,13.15999984741211C28.920000076293945,13.15999984741211,28.920000076293945,13.15999984741211,28.920000076293945,13.15999984741211C23.440000534057617,13.170000076293945,19,17.610000610351562,19,23.09000015258789C19,23.09000015258789,19,31.09000015258789,19,31.09000015258789"
                    />
                  </g>
                </svg>
              </div>
              <p
                class="overview-hero-copy typography-overview-hero-copy large-9 small-12"
                style="transform: matrix(1, 0, 0, 1, 0, -80); opacity: 1"
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
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    background: string
  }>(),
  {
    title: "Privacy. That's Apple.",
    description:
      "Privacy is a fundamental human right. It's also one of our core values. Which is why we design our products and services to protect it. That's the kind of innovation we believe&nbsp;in.",
    background:
      'https://www.apple.com/v/privacy/u/images/overview/hero__j7g6erczcr2u_large.jpg',
  }
)
</script>
