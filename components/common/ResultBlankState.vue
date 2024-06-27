<template>
  <div class="no-results">
    No results found Try changing or removing text and tags.
  </div>
</template>

<style scoped>
.no-results {
  font-size: 21px;
  font-weight: 400;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
  padding: 35px;
  box-sizing: border-box;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23D2D2D7FF' stroke-width='2' stroke-dasharray='3, 7' stroke-dashoffset='65' stroke-linecap='square'/%3E%3C/svg%3E");
  border-radius: 12px;
}
@media only screen and (max-width: 735px) {
  .no-results {
    font-size: 19px;
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
</style>
