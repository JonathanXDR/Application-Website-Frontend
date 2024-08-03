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
      <SuperMarioCoin v-for="(item, i) in coinsToBeFound" :key="i" is-playing />
    </div>
  </div>
</template>

<script>
import { random } from "@/utils";
import { SteppedEase, TimelineMax } from "gsap";
import AudioPowerUp from "~/public/mario/audio/smw_power-up.ogg";
import AudioAppears from "~/public/mario/audio/smw_power-up_appears.ogg";
import AudioStomp from "~/public/mario/audio/smw_stomp.ogg";
import AudioNoDamage from "~/public/mario/audio/smw_stomp_no_damage.ogg";

export default {
  name: "SuperMarioBlock",
  components: {
    SuperMarioCoin,
  },
  props: {
    hasCoins: Boolean,
  },
  data() {
    return {
      foundCoins: 0,
      coinsToBeFound: 16,
      hasTouched: false,
      blockAnimation: new TimelineMax(),
      coinAnimation: new TimelineMax(),
      audioStomp: new Audio(AudioStomp),
      audioPowerUp: new Audio(AudioPowerUp),
      audioAppears: new Audio(AudioAppears),
      audioNoDamage: new Audio(AudioNoDamage),
    };
  },
  computed: {
    hasFoundAllCoins() {
      return this.foundCoins === this.coinsToBeFound;
    },
  },
  methods: {
    animateCoin() {
      const coin = this.$el.querySelectorAll(".mario-coin")[this.foundCoins];
      const xCoords = random(-150, 150);

      const coinAnimation = new TimelineMax();
      coinAnimation
        // .clear(true)
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

      this.foundCoins++;

      if (this.hasFoundAllCoins) {
        this.audioPowerUp.play();
        this.$emit("foundAllCoins");
      }

      this.audioAppears.play();
      this.$emit("foundCoin", this.foundCoins);
    },
    animateBlock() {
      this.$emit("jumped", this.$el);

      const box = this.$el.querySelector(".mario-box");

      this.blockAnimation
        .clear(true)
        .set(box, { yPercent: 0 })
        .to(box, 0.07, { yPercent: -40, ease: SteppedEase.config(2) })
        .to(box, 0.07, { yPercent: 0, ease: SteppedEase.config(2) });
    },
    onTouchBlock() {
      this.hasTouched = true;

      this.animateBlock();

      if (this.hasFoundAllCoins) {
        this.audioNoDamage.play();
        return;
      }

      if (this.hasCoins) {
        this.audioStomp.play();
        this.animateCoin();
      } else {
        this.audioNoDamage.play();
      }
    },
  },
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
