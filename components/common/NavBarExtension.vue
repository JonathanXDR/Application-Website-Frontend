<template>
  <div class="filter-input-sticky-wrapper is-sticky">
    <div class="filter-input-container">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-input-sticky-wrapper {
  width: 100%;
  position: sticky;
  top: 52px;
  z-index: 5;
}

@media only screen and (max-width: 1279px) {
  .filter-input-sticky-wrapper {
    top: 48px;
  }
}

.filter-input-sticky-wrapper .filter-input-container {
  padding: 10px 0;
  background-color: var(--color-menu);
  transition: border-bottom 0.2s ease-out;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.filter-input-sticky-wrapper.is-sticky .filter-input-container {
  border-bottom-color: var(--color-fill-gray-tertiary);
}

@media only screen and (max-width: 767px) {
  .filter-input-sticky-wrapper.is-sticky .filter-input-container {
    height: auto;
  }
}

.container {
  margin-left: auto;
  margin-right: auto;
  width: 980px;
}

@media only screen and (max-width: 1279px) {
  .container {
    width: 692px;
  }
}

@media only screen and (max-width: 767px) {
  .container {
    width: 87.5%;
  }
}

@media only screen and (max-width: 319px) {
  .container {
    width: 215px;
  }
}
</style>
