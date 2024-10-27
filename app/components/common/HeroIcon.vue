<template>
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
</template>

<script setup lang="ts">
const animate = (timeline: gsap.core.Timeline) => {
  const leaf = document.querySelector('#leaf')
  const arm = document.querySelector('#arm')
  const iconInner = document.querySelector('#privacy-icon-inner')

  timeline
    .to(leaf, { scale: 0, duration: 0.2, ease: 'power2.in' }, 0.3)
    .fromTo(arm, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.4)
    .to(arm, { morphSVG: '#arm-3', duration: 0.3, ease: 'power2.out' }, 0.4)
    .to(arm, { morphSVG: '#arm-4', duration: 0.5, ease: 'power2.out' }, 0.5)
    .to(arm, { morphSVG: '#arm-5', duration: 0.7, ease: 'power2.inOut' }, 1)
    .to(arm, { morphSVG: '#arm-6', duration: 0.1, ease: 'power2.inOut' }, 1.7)
    .to(iconInner, { y: '+=5', duration: 0.3, ease: 'power2.inOut' }, 1.5)
    .to(iconInner, { y: '-=5', duration: 0.3, ease: 'power2.inOut' }, 1.8)
}

defineExpose({ animate })
</script>

<style scoped>
@media all {
  * {
    transform-box: fill-box;
    transform-origin: center;
  }
  #arm {
    clip-path: url(https://www.apple.com/privacy/#apple-clip);
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 5px;
  }
}
@media all {
  * {
    transform-box: fill-box;
    transform-origin: center;
  }
  #arm-static {
    clip-path: url(https://www.apple.com/privacy/#static-apple-clip);
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 5px;
  }
}
.trace {
  opacity: 0;
}
svg > * {
  transform-box: fill-box;
  transform-origin: center;
}
#arm {
  clip-path: url(#apple-clip);
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-width: 5px;
}
#arm-static {
  clip-path: url(#static-apple-clip);
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-width: 5px;
}
</style>
