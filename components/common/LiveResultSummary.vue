<template>
  <div id="live-result-summary" class="results">
    <div class="number-results">Showing {{ totalResults }} results</div>
    <div class="changesnav-totals" v-if="pinnedResults">
      <div class="changed-total">
        <Icon
          name="pin.fill"
          size="small"
          :colors="{
            primary: randomColor,
          }"
          class="icon icon-medium"
        />
        <span>Pinned</span>
        <span class="total"> ({{ pinnedResults }})</span>
      </div>
      <!-- <div class="changed-total changed-total-modified">
        <span>Modified</span><span class="total"> (4)</span>
      </div>
      <div class="changed-total changed-total-added">
        <span>Added</span><span class="total"> (0)</span>
      </div>
      <div class="changed-total changed-total-deprecated">
        <span>Deprecated</span><span class="total"> (0)</span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    totalResults: number;
    pinnedResults?: number;
  }>(),
  {
    totalResults: 0,
    pinnedResults: 0,
  },
);

const colorStore = useColor();
const randomColor = ref(colorStore.randomizeColor().colorVar);
</script>

<style scoped>
.changesnav-totals {
  display: flex;
}

@media only screen and (max-width: 767px) {
  .changesnav-totals {
    width: 100%;
    justify-content: space-between;
  }
}

.changed-total {
  border: none;
  font-size: 14px;
  position: relative;
  box-sizing: border-box;
  padding-left: 22px;
  margin-right: 10px;
}

@media only screen and (min-width: 320px) {
  .changed-total:last-child {
    margin-right: 0;
  }
}

/* .changed-total:before {
  left: 0;
  background-image: url(https://developer.apple.com/tutorials/img/modified-rounded-icon.d5359e50.svg);
  background-repeat: no-repeat;
  bottom: 0;
  content: ' ';
  margin: auto;
  margin-right: 8px;
  position: absolute;
  top: 0;
  width: 17px;
  height: 17px;
} */

/* @media screen and (prefers-color-scheme: dark) {
  [data-color-scheme='auto'] .changed-total:before {
    background-image: url(https://developer.apple.com/tutorials/img/modified-dark-rounded-icon.21b15694.svg);
  }
}

.changed-total-added:before {
  background-image: url(https://developer.apple.com/tutorials/img/added-rounded-icon.fe4d3db0.svg);
}

@media screen and (prefers-color-scheme: dark) {
  [data-color-scheme='auto'] .changed-total-added:before {
    background-image: url(https://developer.apple.com/tutorials/img/added-dark-rounded-icon.e08a3e82.svg);
  }
}

.changed-total-deprecated:before {
  background-image: url(https://developer.apple.com/tutorials/img/deprecated-rounded-icon.259329a6.svg);
}

@media screen and (prefers-color-scheme: dark) {
  [data-color-scheme='auto'] .changed-total-deprecated:before {
    background-image: url(https://developer.apple.com/tutorials/img/deprecated-dark-rounded-icon.4363aca1.svg);
  }
} */

@media only screen and (max-width: 767px) {
  .total {
    display: none;
  }
}

.results {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
  color: var(--color-figure-gray-secondary-alt);
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
  position: relative;
}

@media only screen and (max-width: 1250px) {
  .results {
    width: 692px;
  }
}

@media only screen and (max-width: 735px) {
  .results {
    width: 87.5%;
  }
}

@media only screen and (max-width: 320px) {
  .results {
    width: 215px;
  }
}

.number-results {
  font-size: 14px;
  line-height: 1.4285914286;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: var(--color-figure-gray-secondary);
  margin-right: 20px;
}

@media only screen and (max-width: 735px) {
  .number-results {
    flex: 1 1 100%;
  }
}

.changesnav-totals {
  border-left: 1px solid var(--color-fill-gray-tertiary);
  padding-left: 20px;
}

@media only screen and (max-width: 767px) {
  .changesnav-totals {
    width: auto;
  }
}

@media only screen and (max-width: 735px) {
  .changesnav-totals {
    margin-top: 7px;
    border-left: none;
    padding-left: 0;
    width: 100%;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
  }
}

.icon {
  margin-right: 4px;
}

.changesnav-totals .changed-total {
  display: flex;
  align-items: center;
  padding-left: 0;
  margin-right: 20px;
}

@media only screen and (max-width: 1250px) {
  .changesnav-totals .changed-total {
    font-size: 14px;
    margin-right: 15px;
  }
}

@media only screen and (max-width: 735px) {
  .changesnav-totals .changed-total {
    font-size: 12px;
    margin-right: 0;
  }
}

/* .changesnav-totals .changed-total:before {
  position: relative;
  margin: 0 4px 0 0;
} */

@media only screen and (max-width: 735px) {
  /* .changesnav-totals .changed-total:before {
    margin-right: 3px;
    height: 12px;
    width: 12px;
  } */

  .changesnav-totals .changed-total:last-child {
    margin-right: 0;
  }
}

.changesnav-totals .changed-total .total {
  margin-left: 4px;
}

@media only screen and (max-width: 767px) {
  .changesnav-totals .changed-total .total {
    display: inline;
  }
}
</style>
