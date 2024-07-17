<template>
  <div
    class="pins animate will-change"
    data-anim-classname-1='{"start":"t + 50% - 100vh","cssClass":"animate"}'
    data-anim-classname-2='{"start":"t - 150vh","end":"b + 150vh","cssClass":"will-change","toggle":true}'
  >
    <div class="pin-wrapper pin-length">
      <span class="image-pin" />
      <span class="pin-caption typography-hardware-label">
        One PCIe x4 gen 3<br >
        <span>Apple I/O card</span>
      </span>
    </div>
    <div class="pin-wrapper pin-single-wide">
      <span class="image-pin" />
      <span class="pin-caption typography-hardware-label">
        Four PCIe x8 gen 4<br >
        <span>Two single height</span><br >
        <span> Two double height</span>
      </span>
    </div>
    <div class="pin-wrapper pin-double-wide">
      <span class="image-pin" />
      <span class="pin-caption typography-hardware-label">
        Two PCIe x16 gen 4<br >
        <span>Double height</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<style scoped>
.typography-hardware-label {
  font-size: 19px;
  line-height: 1.2105263158;
  font-weight: 600;
  letter-spacing: 0.012em;
  font-family:
    SF Pro Display,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
}
@media only screen and (max-width: 1068px) {
  .typography-hardware-label {
    font-size: 19px;
    line-height: 1.2105263158;
    font-weight: 600;
    letter-spacing: 0.012em;
    font-family:
      SF Pro Display,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .typography-hardware-label {
    font-size: 14px;
    line-height: 1.4285914286;
    font-weight: 400;
    letter-spacing: -0.016em;
    font-family:
      SF Pro Text,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
  }
}
.typography-hardware-label {
  font-weight: 700;
  color: var(--color-fill-gray);
}
.pins {
  position: absolute;
  top: 0;
  left: 88.5%;
  width: 41%;
  height: 100%;
}
@media only screen and (max-width: 1068px) {
  .pins {
    left: 80.5%;
    width: 55%;
  }
}
@media only screen and (max-width: 734px) {
  .pins {
    left: 87%;
    width: 200px;
  }
}
.pins.animate .pin-wrapper {
  opacity: 1;
}
.pins.will-change .pin-wrapper {
  will-change: opacity;
}
.pin-wrapper {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 1.5s;
}
.image-pin {
  position: absolute;
  width: 100%;
  border-top: 1px solid var(--color-figure-gray-secondary);
}
.pin-caption {
  display: block;
  position: absolute;
  right: 0;
  width: 100%;
  padding-top: 3.6%;
  text-align: right;
}
@media only screen and (max-width: 1068px) {
  .pin-caption {
    padding-top: 4.5%;
  }
}
@media only screen and (max-width: 734px) {
  .pin-caption {
    padding-top: 6px;
    max-width: 140px;
  }
}
.pin-caption span {
  font-weight: 500;
  color: #86868b;
}
.pin-length {
  top: 43.5%;
}
.pin-single-wide {
  top: 57.3%;
  height: 29.7%;
  transition-delay: 0.5s;
}
.pin-single-wide .image-pin {
  left: 2%;
  width: 98%;
  height: 72%;
}
.pin-single-wide .image-pin:before {
  content: "";
  position: absolute;
  top: -52%;
  left: -2%;
  width: 2%;
  height: 100%;
  border: 1px solid var(--color-figure-gray-secondary);
  border-left: none;
}
.pin-double-wide {
  top: 77.9%;
  height: 9.5%;
  transition-delay: 1s;
}
@media only screen and (max-width: 734px) {
  .pin-double-wide {
    top: 77.7%;
  }
}
.pin-double-wide .image-pin {
  left: 2%;
  width: 98%;
  height: 100%;
}
.pin-double-wide .image-pin:before {
  content: "";
  position: absolute;
  top: -50%;
  left: -2%;
  width: 2%;
  height: 100%;
  border: 1px solid var(--color-figure-gray-secondary);
  border-left: none;
}
</style>
