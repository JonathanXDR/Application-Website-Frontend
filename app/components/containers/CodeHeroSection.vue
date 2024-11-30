<template>
  <section class="hero">
    <div class="hero-code" aria-hidden="true">
      ======================================= :: 🚀💻 Microkernel JRTXD for
      JR-01, Jonathan Russ :: Local boot, Board 0x6 (JR-01xy)/Rev 0xd ::
      BUILD_TAG: JRTXD-10151.60.47.0.1 :: BUILD_STYLE: DEVELOPMENT ::
      USB_SERIAL_NUMBER: SDOM:01 CPID:8130 CPRV:11 CPFM:01 SCEP:01 BDID:06
      ECID:XXXXXXXXXXXXXXXX IBFL:2D SIKA:00 SRNM:[XXXXXXXXXX] ::
      =======================================
    </div>
    <div class="section-content hero-content" style="opacity: 1">
      <h1 class="hero-headline" style="opacity: 1; transform: none">
        <em class="">Hey there, I'm Jonathan :)</em>
      </h1>
      <div class="hero-description" style="opacity: 1; transform: none">
        <p>
          Our groundbreaking security technologies protect the users of over 2.2
          billion active devices around the world. Hear about the latest
          advances in Apple security from our engineering teams, send us your
          own research, and work directly with us to be recognized and rewarded
          for helping keep our users safe.
        </p>
      </div>
    </div>
    <!-- <ExploreMore /> -->
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.section-content {
  width: calc(100% - 55px);
  margin-inline: auto;
}
@media only screen and (min-width: 768px) {
  .section-content {
    width: 692px;
  }
}
@media only screen and (min-width: 1024px) {
  .section-content {
    width: 990px;
  }
}
/*! CSS Used from: https://security.apple.com/_next/static/css/87e47c498c059d9c.css */
.hero {
  padding-bottom: 60px;
  overflow: hidden;
}
@media only screen and (min-width: 768px) {
  .hero {
    padding-bottom: 70px;
  }
}
@media only screen and (min-width: 1024px) {
  .hero {
    padding-bottom: 75px;
  }
}
.hero .hero-content {
  color: var(--color-syntax-marks);
}
.hero .hero-content .hero-headline {
  font-size: 80px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.015em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  margin: 0;
  color: inherit;
  text-align: left;
}
@media only screen and (max-width: 1023px) {
  .hero .hero-content .hero-headline {
    font-size: 64px;
    line-height: 1.0625;
    font-weight: 600;
    letter-spacing: -0.009em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}
@media only screen and (max-width: 767px) {
  .hero .hero-content .hero-headline {
    font-size: 44px;
    line-height: 1.1818181818;
    font-weight: 600;
    letter-spacing: -0.00066em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}
@media only screen and (min-width: 768px) {
  .hero .hero-content .hero-headline {
    text-align: center;
  }
}
.hero .hero-content .hero-headline em {
  font-style: normal;
  background: linear-gradient(90deg, #d2feb4, #12cabf);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero .hero-content .hero-description {
  margin: 20px auto 0;
  font-size: 24px;
  line-height: 1.3334133333;
  font-weight: 400;
  letter-spacing: 0.009em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif;
  text-align: left;
}
@media only screen and (max-width: 1023px) {
  .hero .hero-content .hero-description {
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 400;
    letter-spacing: 0.012em;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      sans-serif;
  }
}
@media only screen and (min-width: 768px) {
  .hero .hero-content .hero-description {
    text-align: center;
    max-width: 580px;
  }
}
@media only screen and (min-width: 1024px) {
  .hero .hero-content .hero-description {
    margin-top: 30px;
    max-width: 920px;
  }
}
.hero-code {
  width: 150%;
  height: 3em;
  font-size: 30px;
  line-height: 1.5;
  font-weight: 300;
  letter-spacing: -0.02em;
  font-family: Menlo, monospace;
  opacity: 0.2;
  color: var(--color-fill-gray);
  -webkit-mask-image: linear-gradient(
    0deg,
    transparent,
    var(--color-fill-gray) 120%
  );
  mask-image: linear-gradient(0deg, transparent, var(--color-fill-gray) 120%);
}
@media only screen and (min-width: 768px) {
  .hero-code {
    margin-top: -16px;
    height: 4.7619047619em;
    /* font-size: 40px; */
    font-size: 43px;
    line-height: 1.1904761905;
  }
}
</style>
