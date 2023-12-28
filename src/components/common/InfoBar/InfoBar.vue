<template>
  <div class="info">
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
    <div v-if="info?.forks" class="info-item">
      <Icon name="doc.on.doc.fill" class="info-icon" />
      {{ info?.forks }}
    </div>
    <div v-if="info?.networks" class="info-item">
      <Icon name="network" class="info-icon" />
      {{ info?.networks }}
    </div>
    <div v-if="info?.watchers" class="info-item">
      <Icon name="eye.fill" class="info-icon" />
      {{ info?.watchers }}
    </div>
    <div v-if="info?.stars" class="info-item">
      <Icon name="star.fill" class="info-icon" />
      {{ info?.stars }}
    </div>
    {{ info?.issues  }}
    <!-- <div v-if="info?.issues.length" class="info-item">
      <Icon name="smallcircle.filled.circle" class="info-icon" />
      {{ info?.issues.length }}
    </div> -->
    <div v-if="info?.subscribers" class="info-item">
      <Icon name="bell.fill" class="info-icon" />
      {{ info?.subscribers }}
    </div>
    <div v-if="info?.date" class="info-item">
      <Icon :name="updatedYesterday ? 'clock.fill' : 'calendar'" class="info-icon" />
      {{ dateTitle || `${info?.date?.from} - ${info?.date?.to}` }}
    </div>
  </div>
</template>

<script lang="ts" src="./InfoBar.ts"></script>
<style scoped src="./InfoBar.css"></style>
