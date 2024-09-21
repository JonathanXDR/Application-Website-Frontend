<template>
  <div class="container">
    <div class="donut-container">
      <figure class="donut">
        <svg class="ac-graph-svg ac-graph-donut">
          <path
            class="ac-graph-path donut-wedge wedge-1"
            d="M 113.99911851558227 0.07271925905595822 A 110 110 0 0 1 106.00088148441777 219.92728074094404 A 110 110 0 0 1 25.14997985191927 180.00338621002766 L 32.09225422767132 174.27583642920723 A 101 101 0 0 0 106.32808209023814 210.93323049850318 A 101 101 0 0 0 113.6719179097619 9.066769501496836 Z"
          />
          <path
            class="ac-graph-path donut-wedge wedge-2"
            d="M 20.287609232531437 173.6528628011735 A 110 110 0 0 1 105.31027149295572 0.10001616683369718 L 105.69397655262298 9.09183302591093 A 101 101 0 0 0 27.62771393168795 168.44490129925933 Z"
          />
        </svg>
      </figure>
      <h4
        class="sector-labels typography-donut-label"
        style="color: var(--color-fill-tertiary) !important"
      >
        <span>Global</span>
      </h4>
    </div>
    <div class="wedge-legend typography-donut-label female">
      <span>
        <span class="semibold">Female</span>
        <br>
        <span data-value>35.3</span>%
      </span>
    </div>
    <div class="wedge-legend typography-donut-label male">
      <span>
        <span class="semibold">Male</span>
        <br>
        <span data-value>64.6</span>%
      </span>
    </div>
  </div>
</template>

<style scoped>
br.medium {
  display: block;
}
@media only screen and (max-width: 1023px) {
  br.medium {
    display: none;
  }
}
@media only screen and (max-width: 767px) {
  br.medium {
    display: none;
  }
}
br.medium {
  display: none;
}
@media only screen and (max-width: 1023px) {
  br.medium {
    display: block;
  }
}
@media only screen and (max-width: 767px) {
  br.medium {
    display: none;
  }
}
.typography-donut-label {
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica
Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1023px) {
  .typography-donut-label {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 600;
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
@media only screen and (max-width: 767px) {
  .typography-donut-label {
    font-size: 14px;
    line-height: 1.2857742857;
    font-weight: 600;
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
br.medium,
br.medium {
  display: none !important;
}
@media only screen and (min-width: 1024px) {
  br.medium.medium,
  br.medium.medium {
    display: block !important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  br.medium.medium,
  br.medium.medium {
    display: block !important;
  }
}
.typography-donut-label {
  font-size: 17px;
  line-height: 1.2353641176;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 1023px) {
  .typography-donut-label {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 600;
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
@media only screen and (max-width: 767px) {
  .typography-donut-label {
    font-size: 14px;
    line-height: 1.2857742857;
    font-weight: 600;
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
.ac-graph-donut .donut-wedge {
  fill: #f56300;
}
svg.ac-graph-svg {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 8px;
  flex-wrap: wrap;
  grid-row-gap: 20px;
  row-gap: 20px;
  grid-column-gap: 40px;
  column-gap: 40px;
  justify-content: center;
}
@media only screen and (max-width: 767px) {
  .container {
    margin-top: 8px;
    flex-wrap: wrap;
    grid-row-gap: 20px;
    row-gap: 20px;
    grid-column-gap: 40px;
    column-gap: 40px;
    justify-content: center;
  }
}
.wedge-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  gap: 10px;
}
@media only screen and (min-width: 768px) {
  .wedge-legend {
    /* width: 120px; */
  }
}
.wedge-legend:before {
  display: inline-block;
  content: "";
  width: var(--size);
  height: var(--size);
  border-radius: 50%; /* --size: 10px; */
  --size: 20px;
}
@media only screen and (max-width: 767px) {
  .wedge-legend:before {
    --size: 20px;
  }
}
@media only screen and (min-width: 768px) {
  .wedge-legend.female {
    /* order: -1; */
  }
}
.wedge-legend.female {
  justify-content: end;
}
.wedge-legend.female:before {
  background: var(--color-fill);
}
.wedge-legend.male {
  justify-content: start;
}
.wedge-legend.male:before {
  background: #cecece;
}
.wedge-legend [data-value] {
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
.donut-container {
  position: relative;
  width: var(--size);
  height: var(--size); /* --size: 360px;
--max-width: var(--size); */
  --size: 100%;
  --max-width: 220px;
}
@media only screen and (max-width: 1023px) {
  .donut-container {
    --size: 300px;
  }
}
@media only screen and (max-width: 767px) {
  .donut-container {
    --size: 100%;
    --max-width: 220px;
  }
}
.donut-container .donut {
  position: relative;
  width: min(100%, var(--max-width));
  padding-bottom: min(100%, var(--max-width));
  height: 0;
  margin: auto;
}
.donut-container .donut-wedge:nth-child(odd) {
  fill: #cecece;
}
.donut-container .donut-wedge:nth-child(2n) {
  fill: var(--color-fill);
}
.donut-container .donut svg {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.donut-container .sector-labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  max-width: var(--max-width);
  margin: auto;
}
.semibold {
  font-weight: 600;
}
</style>
