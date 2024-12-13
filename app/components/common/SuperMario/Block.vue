<template>
  <div>
    <div
      :class="[
        'mario-box',
        {
          '-jumped': hasTouched,
          '-full': hasCoins,
          '-off': hasFoundAllCoins,
        },
      ]"
      @click="onTouchBlock"
    >
      <div class="in" />
      <SuperMarioCoin
        v-for="i in coinsToBeFound"
        :key="i"
        :is-playing="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap, SteppedEase } from 'gsap'
import AudioPowerUp from '~~/public/mario/audio/smw_power-up.ogg'
import AudioAppears from '~~/public/mario/audio/smw_power-up_appears.ogg'
import AudioStomp from '~~/public/mario/audio/smw_stomp.ogg'
import AudioNoDamage from '~~/public/mario/audio/smw_stomp_no_damage.ogg'

const properties = defineProps<{
  hasCoins: boolean
}>()

const emits = defineEmits<{
  (event: 'foundCoin', foundCoins: number): void
  (event: 'foundAllCoins'): void
  (event: 'jumped', element: HTMLElement): void
}>()

const foundCoins = ref(0)
const coinsToBeFound = 16
const hasTouched = ref(false)
const blockAnimation = gsap.timeline()
const coinAnimation = gsap.timeline()

const audioStomp = new Audio(AudioStomp)
const audioPowerUp = new Audio(AudioPowerUp)
const audioAppears = new Audio(AudioAppears)
const audioNoDamage = new Audio(AudioNoDamage)

const hasFoundAllCoins = computed(() => foundCoins.value === coinsToBeFound)

const random = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const animateCoin = () => {
  const coin = document.querySelectorAll('.mario-coin')[
    foundCoins.value
  ] as HTMLElement
  const xCoords = random(-150, 150)

  coinAnimation
    .set(coin, {
      autoAlpha: 1,
      xPercent: 0,
      yPercent: 0,
    })
    .to(coin, { duration: 0.1, yPercent: -100 })
    .to(coin, {
      duration: 1,
      motionPath: {
        curviness: 1.25,
        path: [
          { xPercent: xCoords, yPercent: random(-150, -100) },
          { xPercent: xCoords * 2, yPercent: 800 },
        ],
        autoRotate: false,
      },
      ease: SteppedEase.config(24),
    })

  foundCoins.value++

  if (hasFoundAllCoins.value) {
    audioPowerUp.play()
    emits('foundAllCoins')
  }

  audioAppears.play()
  emits('foundCoin', foundCoins.value)
}

const animateBlock = () => {
  const box = document.querySelector('.mario-box') as HTMLElement
  emits('jumped', box)

  blockAnimation
    .clear(true)
    .set(box, { yPercent: 0 })
    .to(box, { duration: 0.07, yPercent: -40, ease: SteppedEase.config(2) })
    .to(box, { duration: 0.07, yPercent: 0, ease: SteppedEase.config(2) })
}

const onTouchBlock = () => {
  hasTouched.value = true

  animateBlock()

  if (hasFoundAllCoins.value) {
    audioNoDamage.play()
    return
  }

  if (properties.hasCoins) {
    audioStomp.play()
    animateCoin()
  }
  else {
    audioNoDamage.play()
  }
}
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
  background: url('~~/public/mario/bg-mario.png') no-repeat 0 0;
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
