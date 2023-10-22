<template>
  <div class="rs-covers rs-covers-preorder">
    <div class="rs-covers-transtion theme-dark r-fade-transition-enter-done">
      <div
        class="rs-covers-container rs-covers-media-default rs-covers-textovervideo as-l-container"
      >
        <div class="rs-covers-media-container">
          <Icon :name="$t(`views.${props.name}.icon.name`)" :colors="colors" class="media-icon" />
        </div>
        <div class="rs-covers-content-container">
          <h1 class="rs-covers-heading">
            <span>{{ $t(`views.${props.name}.title`) }}</span>
          </h1>
          <div class="rs-covers-desc">
            {{ description[0] }}.
            <span class="nowrap">{{ description[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ErrorView.ts"></script>
<style scoped src="./ErrorView.css"></style>
