<template>
  <div id="Mario" class="mario-section">
    <audio ref="audioStart" class="bgm">
      <source
        src="~/assets/mario/audio/smw_princess_help.ogg"
        type="audio/ogg"
      >
    </audio>
    <audio ref="audioStomp" class="bgm">
      <source src="~/assets/mario/audio/smw_stomp.ogg" type="audio/ogg" >
    </audio>
    <audio ref="audioEmpty" class="bgm">
      <source
        src="~/assets/mario/audio/smw_stomp_no_damage.ogg"
        type="audio/ogg"
      >
    </audio>
    <audio ref="audioAppears" class="bgm">
      <source
        src="~/assets/mario/audio/smw_power-up_appears.ogg"
        type="audio/ogg"
      >
    </audio>
    <audio ref="audioPowerUp" class="bgm">
      <source src="~/assets/mario/audio/smw_power-up.ogg" type="audio/ogg" >
    </audio>
    <audio ref="audioExit" class="bgm">
      <source
        src="~/assets/mario/audio/smw_keyhole_exit.ogg"
        type="audio/ogg"
      >
    </audio>

    <div
      v-for="(box, index) in boxes"
      :key="index"
      :class="[
        'mario-box',
        `b${index + 1}`,
        { '-jumped': box.jumped, '-off': box.off, '-full': box.full },
      ]"
      @click="handleBoxClick(index)"
    >
      <div class="in" />
    </div>

    <div ref="mario" class="mario" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MarioSection",
  setup() {
    const boxes = ref([
      { jumped: false, off: false, full: false },
      { jumped: false, off: false, full: false },
      { jumped: false, off: false, full: false },
    ]);
    const lastBox = ref(1);
    const coins = ref(1);

    const audioStart = ref<HTMLAudioElement | null>(null);
    const audioStomp = ref<HTMLAudioElement | null>(null);
    const audioEmpty = ref<HTMLAudioElement | null>(null);
    const audioAppears = ref<HTMLAudioElement | null>(null);
    const audioPowerUp = ref<HTMLAudioElement | null>(null);
    const audioExit = ref<HTMLAudioElement | null>(null);

    const handleBoxClick = (index: number) => {
      if (boxes.value[index].off) {
        if (boxes.value[index].full) {
          playAudio(audioEmpty);
        }
        return;
      }

      const box = boxes.value[index];
      jumpMario(index);

      if (lastBox.value === boxes.value.length) {
        document.body.classList.remove("-mario-lock");
        document.body.classList.add("-mario-played");
        document.body.classList.add("-mario-bg");
        box.jumped = true;
        box.full = true;

        if (coins.value === 3) {
          addCoinCounter();
        }

        if (coins.value === 16) {
          showEasterEggMessage();
          return;
        }

        coins.value++;
        box.off = true;
        playAudio(audioAppears);
      } else {
        lastBox.value++;
        box.jumped = true;
        box.off = true;
        playAudio(audioStomp);
      }
    };

    const jumpMario = (index: number) => {
      const mario = document.querySelector(".mario");
      if (mario) {
        const position = 25 * (index + 1);
        mario.style.left = `calc(${position}% - 64px)`;
        mario.classList.add("jump");
        setTimeout(() => {
          mario.classList.remove("jump");
        }, 300);
      }
    };

    const playAudio = (audioRef: { value: HTMLAudioElement | null }) => {
      if (audioRef.value) {
        audioRef.value.currentTime = 0;
        audioRef.value.play();
      }
    };

    const addCoinCounter = () => {
      const marioContainer = document.querySelector("#Mario .container");
      if (marioContainer) {
        marioContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="mario-coin-counter">x3</div>`,
        );
      }
    };

    const showEasterEggMessage = () => {
      document.body.classList.add("-mario-easter-egg", "-bit16");
      const home = document.getElementById("home");
      if (home) {
        home.insertAdjacentHTML(
          "beforeend",
          `
          <div class="mario-msg-overlay"></div>
          <div class="mario-msg">
            Hooray! Thank you for jumping so many times! Now you got...<br>
            <span class="-purple">16 coins!</span><br>
            &nbsp;<br>
            Keep scrolling, you are near the end!
            <div class="later">
              ;)
              <button class="mario-msg-close" type="button" title="Close message">✕</button>
            </div>
          </div>
        `,
        );

        document
          .querySelector(".mario-msg-close")
          ?.addEventListener("click", hideMessage);
        document
          .querySelector(".mario-msg-overlay")
          ?.addEventListener("click", hideMessage);
        window.addEventListener("keydown", (event) => {
          if (event.key === "Escape") hideMessage();
        });
      }
    };

    const hideMessage = () => {
      const home = document.getElementById("home");
      if (home) {
        const msg = home.querySelector(".mario-msg");
        const overlay = home.querySelector(".mario-msg-overlay");
        if (msg) home.removeChild(msg);
        if (overlay) home.removeChild(overlay);
      }
      document.body.classList.remove("-mario-easter-egg");
    };

    return {
      boxes,
      handleBoxClick,
      audioStart,
      audioStomp,
      audioEmpty,
      audioAppears,
      audioPowerUp,
      audioExit,
    };
  },
});
</script>

<style scoped>
.mario-section {
  position: relative;
  .mario {
    position: fixed !important;
    top: calc(50% + 64px);
    width: 128px;
    height: 248px;
    background: url("../assets/mario/bg-mario.png") no-repeat 0 -384px;
  }
  .mario-box {
    position: fixed;
    top: calc(50% - 64px);
    width: 128px;
    height: 128px;
    background: url("../assets/mario/bg-mario.png") no-repeat 0 0;
    animation: marioBox 0.6s steps(4) infinite;
    &.-jumped .in {
      animation: marioBoxEmpty 0.6s steps(4) infinite;
    }
    &.-full.-jumped .in {
      animation: none;
      background-position: -512px 0;
    }
    &.-off {
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
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

.mario-coin-counter {
  position: absolute;
  top: 3rem;
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

.mario-msg .later {
  color: var(--purple);
  opacity: 0;
  padding-top: 2rem;
  position: static;
  text-align: center;
}

.mario-msg-close {
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 3rem;
  height: 3rem;
  color: #000;
  font-size: 2rem;
  background: none;
}
</style>
