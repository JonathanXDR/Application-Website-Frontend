<template>
  <div
    class="as-l-fullwidth"
    data-events="event52"
  >
    <div>
      <div class="dd-holiday-animation-header-202411 dd-fill-tertiary">
        <div class="dd-l-plate dd-holiday-animation-container">
          <div class="dd-holiday-animation-colors">
            <div
              class="dd-holiday-animation-yellow dd-holiday-animation-color"
            />
            <div
              class="dd-holiday-animation-pink-one dd-holiday-animation-color"
            />
            <div
              class="dd-holiday-animation-pink-two dd-holiday-animation-color"
            />
            <div class="dd-holiday-animation-blue dd-holiday-animation-color" />
          </div>
          <div class="dd-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*! CSS Used from: https://store.storeimages.cdn-apple.com/4982/store.apple.com/static-resources/rs-vendor-1.24.0-a7250/dist/common-css@1.0.7/dist/common.css ; media=screen, print */
@media screen, print {
  :focus-visible {
    outline: 2px solid var(--sk-focus-color, #0071e3);
    outline-offset: var(--sk-focus-offset, 1px);
  }
  .as-l-fullwidth {
    overflow: hidden;
    width: 100%;
  }
}
/*! CSS Used from: https://store.storeimages.cdn-apple.com/4982/store.apple.com/shop/Catalog/global/css/dd/merch/step-zero.css ; media=screen, print */
@media screen, print {
  .dd-l-plate {
    position: relative;
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 980px;
  }
  @media (max-width: 734px) and (max-device-width: 736px) {
    .dd-l-plate {
      margin-inline-start: auto;
      margin-inline-end: auto;
      width: 87.5%;
    }
  }
  .dd-l-plate::after,
  .dd-l-plate::before {
    content: ' ';
    display: table;
  }
  .dd-l-plate::after {
    clear: both;
  }
  .dd-fill-tertiary {
    background-color: #f5f5f7;
    --ribbon-background-color: rgb(245, 245, 247);
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-container {
    width: 100%;
    height: 75px;
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-colors {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-color {
    filter: blur(20px);
    position: absolute;
    border-radius: 50%;
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-yellow {
    width: 40vw;
    height: 50px;
    background: #fd8c1f;
    top: -75px;
    right: 10vw;
    animation: yellowAnimation 1.5s ease-out forwards 0.5s;
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-pink-one {
    width: 40vw;
    height: 150px;
    background: #ff3f98;
    top: -200px;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0.5;
    animation: pinkOneAnimation 2s ease-in-out forwards;
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-pink-two {
    width: 30vw;
    height: 150px;
    background: #e9a5ff;
    top: -200px;
    left: -25%;
    right: 0;
    margin: 0 auto;
    animation: pinkTwoAnimation 1.2s ease-in-out forwards;
  }
  .dd-holiday-animation-header-202411 .dd-holiday-animation-blue {
    width: 60vw;
    height: 75px;
    top: -100px;
    left: 0;
    background: #4186fd;
    opacity: 0.5;
    animation: blueAnimation 1s ease 0.2s forwards;
  }
  .dd-holiday-animation-header-202411 .dd-image {
    position: absolute;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0;
    animation: imageAnimation 1s ease 1s forwards;
    min-width: 100vw;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    .dd-holiday-animation-header-202411 .dd-image {
      background-size: cover;
    }
  }
}
/*! CSS Used keyframes */
@keyframes yellowAnimation {
  0% {
    top: -75px;
    right: 10vw;
  }
  50% {
    top: -30px;
  }
  100% {
    top: -30px;
    right: 0;
  }
}
@keyframes pinkOneAnimation {
  0% {
    top: -200px;
    transform: scaleX(50%) translateX(0);
  }
  25% {
    top: -110px;
    transform: scaleX(50%) translateX(0);
  }
  50% {
    top: -120px;
    transform: scaleX(225%) translateX(10%);
  }
  100% {
    top: -135px;
    background: #e44cbb;
    transform: scaleX(225%) translateX(0);
  }
}
@keyframes pinkTwoAnimation {
  0% {
    top: -200px;
    transform: scaleX(50%) translateX(0);
  }
  25% {
    top: -120px;
    transform: scaleX(70%) translateX(-10%);
  }
  50% {
    top: -130px;
    transform: scaleX(225%) translateX(10%);
  }
  100% {
    top: -135px;
    background: #f55be4;
    transform: scaleX(225%) translateX(0);
    left: 0;
  }
}
@keyframes blueAnimation {
  0% {
    top: -100px;
    transform: translateX(0);
  }
  50% {
    top: -50px;
    transform: translateX(-15%);
  }
  100% {
    top: -50px;
    background: #019ffb;
    transform: translateX(0);
  }
}
@keyframes imageAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
