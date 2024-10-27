<template>
  <SceneSection id="Mario" role="img" aria-labelledby="marioDesc">
    <p id="marioDesc" class="ariaLabel">
      Three boxes with a question mark, from the Super Mario Bros game, are
      standing in the center of the screen ... try to find the coin in one of
      them by using the numbers 1, 2, and 3 on your keyboard!
    </p>
    <template #container>
      <div class="blocks">
        <SuperMarioBlock
          v-for="i in 3"
          :key="i"
          :has-coins="randomBlock === i"
          @jumped="onJumped"
          @found-coin="onFoundCoin"
          @found-all-coins="onFoundAllCoins"
        />
      </div>

      <SuperMario class="mario-container" :state="marioState || ''" />

      <div v-show="foundCoins" class="mario-coin-counter">
        {{ foundCoins }}
      </div>

      <div v-show="hasFoundAllCoins">
        <div class="mario-msg-overlay" />
        <div class="mario-msg">
          Hooray! Thanks for jumping so many times. <br />
          <span class="-purple">You found all the coins!</span>
          <br />&nbsp;<br />
          Keep scrolling, you're near the end!

          <div class="later">
            ;)
            <button
              class="mario-msg-close"
              type="button"
              title="Close message"
              @click="onCloseMessage"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </template>
  </SceneSection>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import AudioExit from "~/public/mario/audio/smw_keyhole_exit.ogg";

const foundCoins = ref(0);
const marioState = ref<string | undefined>(undefined);
const hasFoundAllCoins = ref(false);
const audioExit = new Audio(AudioExit);

const random = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomBlock = ref(random(1, 3));

const jumpMario = (blockCenter: number, blockBottom: number) => {
  const mario = document.querySelector(".mario") as HTMLElement;
  const marioRect = mario.getBoundingClientRect();
  const isJumpingLeft = marioRect.x > blockCenter;
  const marioFloor = window.innerHeight - marioRect.height;
  const marioAnimation = gsap.timeline();

  marioAnimation
    .clear(true)
    .set(mario, {
      rotationY: isJumpingLeft ? 180 : 0,
    })
    .fromTo(
      mario,
      {
        duration: 0.3,
        left: marioRect.x,
        top: marioFloor,
        onStart: () => {
          marioState.value = "up";
        },
      },
      {
        bezier: {
          curviness: 1.25,
          values: [
            {
              left: blockCenter - marioRect.width / 2,
              top: window.innerWidth <= 1024 ? blockBottom * 0.85 : blockBottom,
            },
            {
              left: isJumpingLeft ? blockCenter - 128 : blockCenter + 128,
              top: window.innerWidth <= 1024 ? marioFloor * 0.9 : marioFloor,
              onStart: () => {
                marioState.value = "down";
              },
            },
          ],
          autoRotate: false,
        },
        ease: "steps(12)",
        onComplete: () => {
          marioState.value = hasFoundAllCoins.value ? "celebrate" : undefined;
        },
      },
    )
}

const onJumped = (block: HTMLElement) => {
  const rect = block.getBoundingClientRect();
  const blockCenter = Math.floor(rect.x + rect.width / 2);
  const blockBottom = rect.bottom;

  jumpMario(blockCenter, blockBottom);
}

const onFoundCoin = (foundCoinsNew: number) => {
  foundCoins.value = foundCoinsNew;
  document.body.classList.remove("is-playing-mario");
  document.body.classList.add("has-played-mario");
  document.body.classList.add("blue-background");
};

const onFoundAllCoins = () => {
  hasFoundAllCoins.value = true;
  marioState.value = "celebrate";
  onOpenMessage();
}

const onOpenMessage = () => {
  audioExit.play();
  const timeline = gsap.timeline();
  timeline
    .to("#Mario .mario-msg", {
      duration: 1,
      scale: 1,
      ease: "steps(12)",
    })
    .to("#Mario .mario-msg .later", { duration: 0.1, autoAlpha: 1 }, "+=2");
};

const onCloseMessage = () => {
  const timeline = gsap.timeline();
  timeline.to("#Mario .mario-msg, #Mario .mario-msg-overlay", {
    duration: 1,
    scale: 0,
    ease: "steps(12)",
  });
}
</script>

<style scoped>
body.is-playing-mario {
  overflow: hidden;
}
body.is-playing-mario #header,
body.is-playing-mario .wrapper:after,
body.is-playing-mario .spine,
body.is-playing-mario .spine-target {
  transition: opacity 200ms ease-out;
  opacity: 0 !important;
}
body.is-playing-mario:before {
  content: "?";
  font-family: "SMW", monospace;
  font-size: 3rem;
  color: #fff;
  position: fixed;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
#Mario {
  position: relative;
  z-index: 999;
}
#Mario .blocks {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: max(2rem, 6vw);
  margin-top: 35vh;
}
#Mario .mario-box {
  left: calc(50% - 64px);
}
#Mario .mario {
  position: fixed !important;
  top: calc(100% - 248px);
  left: calc(50% - 64px);
}
#Mario .mario-coin-counter {
  position: fixed;
  top: 7rem;
  left: calc(50% - 3rem);
  width: 7rem;
  text-align: center;
  line-height: 3rem;
  font-family: "SMW", monospace;
  font-size: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
}
#Mario .mario-coin-counter:before {
  flex: 0 0 auto;
  content: "";
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: url("~/public/mario/bg-mario.png") no-repeat 0 -64px;
  background-size: 160px 158px;
}
@media screen and (max-width: 1024px) {
  #Mario .mario-box,
  #Mario .mario {
    transform-origin: 50% 100%;
    transform: scale(0.7);
  }
  #Mario .container {
    transform: scale(1);
  }
  #Mario .mario-coin-counter {
    top: 6rem;
    font-size: 1.5rem;
  }
  #Mario .mario-coin-counter:before {
    transform: scale(0.8);
  }
}
.mario-msg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.mario-msg {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate3d(-50%, -50%, 0) scale(0);
  transform-origin: 50% 50%;
  width: 40rem;
  height: 30rem;
  padding: 2rem;
  max-width: 70vw;
  max-height: 70vh;
  background: #000;
  color: #fff;
  font-family: "SMW", monospace;
  font-size: 2rem;
  text-align: center;
  letter-spacing: 2px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.mario-msg .-purple {
  color: var(--purple);
}
.mario-msg .later {
  color: var(--purple);
  opacity: 0;
  padding-top: 2rem;
  position: static;
  text-align: center;
}
@media screen and (max-width: 568px) {
  .mario-msg {
    padding: 1rem;
    max-width: 80vw;
    font-size: 1.2rem;
  }
  .mario-msg .later {
    padding-top: 1rem;
  }
}
.mario-msg-close {
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 99;
  width: 3rem;
  height: 3rem;
  color: #000;
  font-size: 2rem;
  background: none;
  padding: 0;
}
</style>
