<template>
  <div id="live-result-summary" class="results">
    <div class="number-results">Showing {{ props.totalResults }} results</div>
    <div class="changesnav-totals" v-if="props.pinnedResults">
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
        <span class="total"> ({{ props.pinnedResults }})</span>
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

<script lang="ts" src="./LiveResultSummary.script.ts"></script>
<style scoped src="./LiveResultSummary.module.css"></style>
