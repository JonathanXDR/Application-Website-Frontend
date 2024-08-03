<template>
  <div>
    <div
      :class="[
        'mario-box',
        { '-jumped': hasTouched, '-full': hasCoins, '-off': hasFoundAllCoins },
      ]"
      @click="onTouchBlock"
    >
      <div class="in" />
      <SuperMarioCoin v-for="i in coinsToBeFound" :key="i" :is-playing="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SteppedEase, TimelineMax } from "gsap";
import AudioPowerUp from "~/public/mario/audio/smw_power-up.ogg";
import AudioAppears from "~/public/mario/audio/smw_power-up_appears.ogg";
import AudioStomp from "~/public/mario/audio/smw_stomp.ogg";
import AudioNoDamage from "~/public/mario/audio/smw_stomp_no_damage.ogg";

const props = defineProps<{
  hasCoins: boolean;
}>();

const foundCoins = ref(0);
const coinsToBeFound = ref(16);
const hasTouched = ref(false);
const blockAnimation = new TimelineMax();
// const coinAnimation = new TimelineMax();
const audioStomp = new Audio(AudioStomp);
const audioPowerUp = new Audio(AudioPowerUp);
const audioAppears = new Audio(AudioAppears);
const audioNoDamage = new Audio(AudioNoDamage);

const hasFoundAllCoins = computed(
  () => foundCoins.value === coinsToBeFound.value,
);

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const animateCoin = () => {
  const coin = document.querySelectorAll(".mario-coin")[
    foundCoins.value
  ] as HTMLElement;
  const xCoords = random(-150, 150);

  const coinAnimation = new TimelineMax();
  coinAnimation
    .set(coin, {
      autoAlpha: 1,
      xPercent: 0,
      yPercent: 0,
    })
    .to(coin, 0.1, { yPercent: -100 })
    .to(coin, 1, {
      bezier: {
        curviness: 1.25,
        values: [
          { xPercent: xCoords, yPercent: random(-150, -100) },
          { xPercent: xCoords * 2, yPercent: 800 },
        ],
        autoRotate: false,
      },
      ease: SteppedEase.config(24),
    });

  foundCoins.value++;

  if (hasFoundAllCoins.value) {
    audioPowerUp.play();
    emit("foundAllCoins");
  }

  audioAppears.play();
  emit("foundCoin", foundCoins.value);
};

const animateBlock = () => {
  emit("jumped", element);

  const box = element.querySelector(".mario-box") as HTMLElement;

  blockAnimation
    .clear(true)
    .set(box, { yPercent: 0 })
    .to(box, 0.07, { yPercent: -40, ease: SteppedEase.config(2) })
    .to(box, 0.07, { yPercent: 0, ease: SteppedEase.config(2) });
};

const onTouchBlock = () => {
  hasTouched.value = true;

  animateBlock();

  if (hasFoundAllCoins.value) {
    audioNoDamage.play();
    return;
  }

  if (props.hasCoins) {
    audioStomp.play();
    animateCoin();
  } else {
    audioNoDamage.play();
  }
};
</script>

<style scoped>
.mario-box {
  position: relative;
  cursor: pointer;
  width: 128px;
  height: 128px;
}
.preview > .mario-box {
  margin: 30rem auto 10rem;
}
.mario-box:hover {
  filter: brightness(1.2);
}
.mario-box.-jumped .in {
  animation: marioBoxEmpty 0.6s steps(4) infinite;
}
.mario-box.-full.-jumped .in {
  animation: none;
  background-position: -512px 0;
}
.mario-box.-off {
  cursor: default;
}
.mario-box.-off:hover {
  filter: none;
}
.mario-box .in {
  position: relative;
  z-index: 2;
  top: 0;
  left: 0;
  width: 128px;
  height: 128px;
  background: url("~/public/mario/bg-mario.png") no-repeat 0 0;
  animation: marioBox 0.6s steps(4) infinite;
}
.mario-box .mario-coin {
  left: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  visibility: hidden;
}
@keyframes marioBox {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -512px 0;
  }
}
@keyframes marioBoxEmpty {
  from {
    background-position: 0 -128px;
  }
  to {
    background-position: -512px -128px;
  }
}
</style>
