<template>
  <div class="cta-circular-icon cta-open">
    <Icon name="plus" size="small" />
  </div>
</template>

<style scoped>
.cta-circular-icon {
  height: 44px;
  width: 44px;
  pointer-events: all;
  font-size: 19px;
  line-height: 1.4211;
  font-weight: 400;
  /* letter-spacing: 0.012em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  position: absolute;
  justify-content: center;
  transition-property: background-color, color;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.25, 1);
  transition-delay: 0s;
}
@media only screen and (max-width: 1068px) {
  .cta-circular-icon {
    height: 36px;
    width: 36px;
  }
}
@media only screen and (max-width: 1068px) {
  .cta-circular-icon {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    /* letter-spacing: -0.022em; */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
      'Helvetica', 'Arial', sans-serif;
  }
}
.cta-circular-icon {
  color: var(--color-figure-gray-secondary);
}
.cta-circular-icon svg {
  width: 0.5em;
  height: 0.5em;
}
.cta-open {
  background-color: var(--color-fill-tertiary);
  font-size: 24px;
}
@media (hover: hover) {
  .cta-open:hover {
    background-color: var(--color-fill-gray-quaternary);
  }
}
.card .cta-open {
  bottom: 24px;
  height: 44px;
  position: absolute;
  width: 44px;
  right: 24px;
}
@media (hover: hover) {
  .card:hover .cta-open {
    transition-property: background-color;
    transition-duration: 400ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.25, 1);
    transition-delay: 0s;
    background-color: var(--color-fill-gray-quaternary);
  }
  .card:hover .cta-open svg {
    transition-property: color;
    transition-duration: 400ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.25, 1);
    transition-delay: 0s;
    color: var(--color-fill-gray);
  }
}
</style>
