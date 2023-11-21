<template>
  <div class="info">
    <div v-if="info?.date" class="info-item">
      <Icon :name="updatedYesterday ? 'clock.fill' : 'calendar'" class="info-icon" />
      {{ dateTitle || `${info?.date?.from} - ${info?.date?.to}` }}
    </div>
    <div v-if="info?.location" class="info-item">
      <Icon name="location.fill" class="info-icon" />
      {{ info.location }}
    </div>
    <div v-if="info?.supervisor" class="info-item">
      <Icon name="person.fill" class="info-icon" />
      {{ info.supervisor }}
    </div>
    <div v-if="info?.department" class="info-item">
      <Icon name="tag.fill" class="info-icon" />
      {{ info.department }}
    </div>
    <div v-if="info?.language" class="info-item">
      <Icon name="bubble.left.fill" class="info-icon" />
      {{ info?.language }}
    </div>
    <div v-if="info?.license" class="info-item">
      <Icon name="scroll.fill" class="info-icon" />
      {{ info?.license }}
    </div>
  </div>
</template>

<script lang="ts" src="./InfoBar.ts"></script>
<style scoped src="./InfoBar.css"></style>
