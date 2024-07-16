<template>
  <div>
    <div class="group group-hispanic typography-body-tight">
      <p>
        <span class="semibold"> <span data-value>27.1</span>% </span>
        <span>Hispanic/Latinx</span>
      </p>
      <div class="bar-container">
        <div class="bar" data-bar style="width: 27.1%" />
      </div>
    </div>
    <div class="group group-white typography-body-tight">
      <p>
        <span class="semibold"> <span data-value>39.7</span>% </span>
        <span>White</span>
      </p>
      <div class="bar-container">
        <div class="bar" data-bar style="width: 39.7%" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.typography-body-tight {
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
.group {
  padding: 20px;
  box-sizing: border-box;
}
@media only screen and (max-width: 1068px) {
  .group {
    padding: 20px 0;
  }
}
@media only screen and (max-width: 734px) {
  .group {
    padding: 0;
    font-size: 14px;
    line-height: 1.2857742857;
    font-weight: 400;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
.group [data-value] {
  font-variant-numeric: tabular-nums;
}
.bar-container {
  position: relative;
  height: 10px;
  border-radius: 10px;
  margin-top: 12px;
}
@media only screen and (max-width: 734px) {
  .bar-container {
    margin-top: 5px;
  }
}
.bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.5s;
  background: var(--color-fill);
  border-radius: 10px;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
}
.semibold {
  font-weight: 600;
}
</style>
