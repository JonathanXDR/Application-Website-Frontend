<template>
  <div id="Mario" role="img" aria-labelledby="marioDesc">
    <p id="marioDesc" class="ariaLabel">
      Three boxes with a question mark, from the Super Mario Bros game, are
      standing in the center of the screen ... try to find the coin in one of
      them by using the numbers 1, 2, and 3 on your keyboard!
    </p>
    <div class="container">
      <audio id="mario-start" class="bgm" src="/audio/smw_princess_help.ogg" />
      <audio id="mario-stomp" class="bgm" src="/audio/smw_stomp.ogg" />
      <audio
        id="mario-empty"
        class="bgm"
        src="/audio/smw_stomp_no_damage.ogg"
      />
      <audio
        id="mario-appears"
        class="bgm"
        src="/audio/smw_power-up_appears.ogg"
      />
      <audio id="mario-power-up" class="bgm" src="/audio/smw_power-up.ogg" />
      <audio id="mario-exit" class="bgm" src="/audio/smw_keyhole_exit.ogg" />

      <div class="mario-box b1">
        <div class="in" />
      </div>
      <div class="mario-box b2">
        <div class="in" />
      </div>
      <div class="mario-box b3">
        <div class="in" />
      </div>

      <div class="mario" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'MarioSection',
  setup() {
    let lastBox = 1;
    let coins = 1;

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const marioJump = (index: number) => {
      const box = document.querySelector(
        `.mario-box.b${index + 1}`
      ) as HTMLElement;
      const mario = document.querySelector('.mario') as HTMLElement;
      const position = 25 * (index + 1);

      mario.style.left = `calc(${position}% - 64px)`;
      mario.style.opacity = '1';

      box.animate(
        [{ transform: 'translateY(-50%)' }, { transform: 'translateY(0)' }],
        {
          duration: 140,
          easing: 'steps(2, end)',
        }
      );

      mario.animate(
        [
          { transform: 'translateY(200%) translateX(-150%)' },
          { transform: 'translateY(0) translateX(0)' },
          { transform: 'translateY(200%) translateX(150%)' },
        ],
        { duration: 300, easing: 'steps(12, end)' }
      );

      setTimeout(() => (mario.style.opacity = '0'), 300);
    };

    const accessibilityClick = (event: KeyboardEvent) => {
      const key = event.key || event.code;
      if (key === '1' || key === 'Digit1')
        (document.querySelector('.mario-box.b1 .in') as HTMLElement).click();
      if (key === '2' || key === 'Digit2')
        (document.querySelector('.mario-box.b2 .in') as HTMLElement).click();
      if (key === '3' || key === 'Digit3')
        (document.querySelector('.mario-box.b3 .in') as HTMLElement).click();
    };

    const action = () => {
      const m = document.getElementById('Mario');
      if (!m || !m.classList.contains('active')) return false;

      if (
        document.body.classList.contains('-bit16') ||
        document.body.classList.contains('-mario-played')
      ) {
        document.body.classList.add('-mario-bg');
        return false;
      }

      lastBox = 1;
      coins = 1;

      const boxes = document.querySelectorAll('.mario-box');

      document.body.classList.add('-mario-lock');

      boxes.forEach((box, i) => {
        box.addEventListener('click', () => {
          if (box.classList.contains('-off')) {
            if (box.classList.contains('-full')) {
              box.animate(
                [
                  { transform: 'translateY(-50%)' },
                  { transform: 'translateY(0)' },
                ],
                {
                  duration: 140,
                  easing: 'steps(2, end)',
                }
              );
              const bgmEmpty = document.getElementById(
                'mario-empty'
              ) as HTMLAudioElement;
              bgmEmpty.play();
            }
            return false;
          }

          marioJump(i);

          if (boxes.length === lastBox) {
            document.body.classList.remove('-mario-lock');
            document.body.classList.add('-mario-played', '-mario-bg');
            box.classList.add('-jumped', '-full');

            if (coins === 3) {
              document
                .querySelector('#Mario .container')
                ?.insertAdjacentHTML(
                  'beforeend',
                  `<div class="mario-coin-counter">x3</div>`
                );
            }
            if (coins > 3) {
              document.querySelector(
                '.mario-coin-counter'
              )!.innerHTML = `x${coins}`;
            }

            if (coins === 16) {
              document.body.classList.add('-mario-easter-egg', '-bit16');
              box.classList.add('-off');
              const bgmStomp = document.getElementById(
                'mario-stomp'
              ) as HTMLAudioElement;
              bgmStomp.play();
              bgmStomp.onended = () => {
                const bgmPowerUp = document.getElementById(
                  'mario-power-up'
                ) as HTMLAudioElement;
                bgmPowerUp.play();
              };

              document.getElementById('home')?.insertAdjacentHTML(
                'beforeend',
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
              `
              );

              const msg = new Animation(
                new KeyframeEffect(
                  document.querySelector('.mario-msg'),
                  [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
                  { duration: 1000, easing: 'steps(12, end)' }
                ),
                document.timeline
              );
              msg.play();

              msg.onfinish = () => {
                document
                  .querySelector('.mario-msg .later')!
                  .animate([{ opacity: '0' }, { opacity: '1' }], {
                    duration: 100,
                    delay: 4000,
                  });
              };

              document.addEventListener('click', hideMsg);
              window.addEventListener('keydown', hideMsg);

              function hideMsg(event: Event | KeyboardEvent) {
                if (
                  (event instanceof Event &&
                    event.target instanceof HTMLElement &&
                    (event.target.classList.contains('mario-msg-overlay') ||
                      event.target.classList.contains('mario-msg-close'))) ||
                  (event instanceof KeyboardEvent && event.key === 'Escape')
                ) {
                  const tl = new Animation(
                    new KeyframeEffect(
                      [
                        document.querySelector('.mario-msg'),
                        document.querySelector('.mario-msg-overlay'),
                      ],
                      [{ transform: 'scale(1)' }, { transform: 'scale(0)' }],
                      { duration: 1000, easing: 'steps(12, end)' }
                    ),
                    document.timeline
                  );
                  tl.play();
                  tl.onfinish = () => {
                    document
                      .getElementById('home')
                      ?.removeChild(document.querySelector('.mario-msg')!);
                    document
                      .getElementById('home')
                      ?.removeChild(
                        document.querySelector('.mario-msg-overlay')!
                      );
                    document
                      .querySelector('#Mario .container')
                      ?.removeChild(
                        document.querySelector('.mario-coin-counter')!
                      );
                    document.body.classList.remove('-mario-easter-egg');
                  };
                }
              }

              return false;
            }

            box.insertAdjacentHTML(
              'beforeend',
              `<div class="mario-coin c${coins}"></div>`
            );
            const coin = document.querySelector(`.mario-coin.c${coins}`);
            const newCoin = new Animation(
              new KeyframeEffect(
                coin,
                [
                  { transform: 'translateY(0%) translateX(0%)', opacity: '1' },
                  {
                    transform: `translateY(-100%) translateX(${random(
                      -150,
                      150
                    )}%)`,
                  },
                  {
                    transform: `translateY(800%) translateX(${
                      random(-150, 150) * 2
                    }%)`,
                  },
                ],
                { duration: 1400, easing: 'steps(24, end)', fill: 'forwards' }
              ),
              document.timeline
            );
            newCoin.play();
            newCoin.onfinish = () => box.removeChild(coin!);

            coins++;
            const bgmStomp = document.getElementById(
              'mario-stomp'
            ) as HTMLAudioElement;
            bgmStomp.play();
            bgmStomp.onended = () => {
              const bgmAppears = document.getElementById(
                'mario-appears'
              ) as HTMLAudioElement;
              bgmAppears.play();
            };
            return false;
          }

          lastBox++;
          box.classList.add('-jumped', '-off');
          const bgmStomp = document.getElementById(
            'mario-stomp'
          ) as HTMLAudioElement;
          bgmStomp.play();
          return false;
        });
      });

      window.addEventListener('keydown', accessibilityClick);
    };

    onMounted(() => {
      action();
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', accessibilityClick);
      document.body.classList.remove('-mario-lock', '-mario-bg');
    });

    return {};
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

#Mario {
  .container {
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .mario {
    position: fixed !important;
    top: calc(50% + 64px);
    left: calc(25% - 96px);
    width: 128px;
    height: 248px;
    background: url('/images/mario/bg-mario.png') no-repeat 0 -384px;
  }

  .mario-box {
    cursor: pointer;
    top: calc(50% - 64px);
    left: calc(25% - 64px);
    width: 128px;
    height: 128px;

    &:before {
      content: '1';
      position: absolute;
      top: calc(100% + 1rem);
      left: calc(50% - 1rem);
      font-size: 1rem;
      text-align: center;
      line-height: 2rem;
      color: #ccc;
      opacity: 0.5;
      width: 2rem;
      height: 2rem;
      border: 1px solid #666;
      border-top-color: #aaa;
      border-bottom-color: #444;
      border-radius: 0.25rem;
      box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 1);
    }

    .in {
      z-index: 2;
      top: 0;
      left: 0;
      width: 128px;
      height: 128px;
      background: url('/images/mario/bg-mario.png') no-repeat 0 0;
      animation: marioBox 0.6s steps(4) infinite;
    }

    &.-jumped {
      &:before {
        display: none;
      }
      .in {
        animation: marioBoxEmpty 0.6s steps(4) infinite;
      }
    }
    &.-full.-jumped .in {
      animation: none;
      background-position: -512px 0;
    }

    &.b2 {
      left: calc(50% - 64px);
      &:before {
        content: '2';
      }
    }
    &.b3 {
      left: calc(75% - 64px);
      &:before {
        content: '3';
      }
    }

    &:hover {
      filter: brightness(1.2);
    }

    &.-off {
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }

  .mario-coin {
    left: 0;
    bottom: 0;
    width: 128px;
    height: 128px;
    background: url('/images/mario/bg-mario.png') no-repeat 0 -256px;
    animation: marioCoin 0.6s steps(4) infinite;
    visibility: hidden;
  }

  .mario-coin-counter {
    position: absolute;
    top: 3rem;
    left: calc(50% - 3rem);
    width: 7rem;
    text-align: center;
    line-height: 3rem;
    font-family: 'SMW', monospace;
    font-size: 2rem;
    color: #fff;
    display: flex;
    align-items: center;

    &:before {
      flex: 0 0 auto;
      content: '';
      margin-right: 0.5rem;
      width: 2rem;
      height: 2rem;
      background: url('/images/mario/bg-mario.png') no-repeat 0 -64px;
      background-size: 160px 158px;
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
    font-family: 'SMW', monospace;
    font-size: 2rem;
    text-align: center;
    letter-spacing: 2px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    user-select: none;

    .-purple {
      color: var(--purple);
    }

    .later {
      color: var(--purple);
      opacity: 0;
      padding-top: 2rem;
      position: static;
      text-align: center;
    }
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
@keyframes marioCoin {
  to {
    background-position: -512px -256px;
  }
}
</style>
