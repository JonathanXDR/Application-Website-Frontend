<template>
  <div class="apple-intelligence-glow" />
  <div class="apple-intelligence-glow apple-intelligence-glow-2" />
</template>

<style scoped>
* {
  --mx-pro-blue: #2997ff;
  --mx-max-purple: #a972ff;
  --mx-teal: #43b9b9;
  --ai-gradient: linear-gradient(
    97deg,
    #0096ff,
    #bb64ff 42%,
    #f2416b 74%,
    #eb7500
  );
}
.apple-intelligence-glow {
  --igradient: linear-gradient(
    to bottom right,
    #0894ff 0%,
    #c959dd 34%,
    #ff2e54 68%,
    #ff9004
  );
  position: absolute;
  z-index: 0;
  inset: 0;
  border: 0;
  filter: blur(1px);
}
/* .apple-intelligence-glow {
  --igradient: linear-gradient(
    115deg,
    #00d0ff,
    #09f 20%,
    #c95eff 42%,
    #ff2569 63%,
    #ff8300 83%,
    #ffb000
  );
  position: absolute;
  z-index: 0;
  inset: 0;
  border: 0;
  filter: blur(1px);
} */
.apple-intelligence-glow::after {
  --bg-size: calc(100% + 14px);
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: var(--igradient) 50% / var(--bg-size) var(--bg-size);
  border-radius: 28px;
  border: 3px solid rgba(0, 0, 0, 0);
  mask: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0)),
    linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 100%));
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}
/* .apple-intelligence-glow::after {
  --bg-size: calc(100% + 14px);
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: var(--igradient) 50% / var(--bg-size) var(--bg-size);
  border-radius: 28px;
  mask: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0)),
    linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 100%));
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
} */
.apple-intelligence-glow.apple-intelligence-glow-2 {
  filter: blur(7px);
}
/* .apple-intelligence-glow.apple-intelligence-glow-2 {
  filter: blur(9px);
} */
.apple-intelligence-glow.apple-intelligence-glow-2::after {
  border: 8px solid rgba(0, 0, 0, 0);
}
@media (max-width: 734px) {
  .apple-intelligence-glow {
    --igradient: linear-gradient(
      90deg,
      #0894ff 0%,
      #c959dd 34%,
      #ff2e54 68%,
      #ff9004
    );
    inset-inline: -20px;
  }
}
@media (max-width: 734px) {
  .apple-intelligence-glow::after {
    border-radius: 0;
    inset-inline: -20px;
  }
}
</style>
