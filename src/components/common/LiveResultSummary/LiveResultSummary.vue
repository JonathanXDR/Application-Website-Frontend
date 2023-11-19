<template>
  <div id="live-result-summary" class="results">
    <div class="number-results">Showing 4 results</div>
    <div class="changesnav-totals">
      <div class="changed-total">
        <Icon
          name="pin.fill"
          size="small"
          :colors="{
            primary: randomColor
          }"
          class="icon-live-result-summary"
        />
        <span>Pinned</span>
        <span class="total"> (4)</span>
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

<script lang="ts" src="./LiveResultSummary.ts"></script>
<style scoped src="./LiveResultSummary.css"></style>
