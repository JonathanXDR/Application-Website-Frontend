<template>
  <div class="down-chevron-container">
    <!-- <SFSymbol
      name="chevron.down"
      size="small"
      class="icon icon-show-more"
    /> -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      class="chevron-icon"
    >
      <path
        d="M14.2317 1.58276C14.4053 1.40254 14.5 1.18315 14.5 0.932417C14.5 0.407441 14.0896 -2.50137e-06 13.5688 -2.4786e-06C13.3083 -2.46722e-06 13.0716 0.101858 12.8901 0.282074L7.49211 5.76689L2.10992 0.282074C1.92841 0.101859 1.68377 -1.95909e-06 1.43123 -1.94805e-06C0.910372 -1.92529e-06 0.5 0.407442 0.5 0.932417C0.5 1.18315 0.594701 1.40254 0.76832 1.57492L6.76607 7.67091C6.97125 7.8903 7.22379 8 7.5 8C7.77621 8 8.01297 7.8903 8.22604 7.67875L14.2317 1.58276Z"
        class="chevron-icon"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
svg,
path {
  --color-transition-settings: 0.3s ease;
  transition:
    color var(--color-transition-settings),
    fill var(--color-transition-settings),
    stroke var(--color-transition-settings);
}
svg.chevron-icon.chevron-icon {
  position: absolute;
  bottom: 32px;
}
svg.chevron-icon path.chevron-icon {
  fill: var(--color-fill-gray);
}
.down-chevron-container {
  padding: 300px 0 100px 0;
  position: sticky;
  width: 100%;
  height: 150px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    0deg,
    var(--color-fill) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.icon-show-more {
  width: 0.9375em;
  height: 0.5em;
}
</style>
