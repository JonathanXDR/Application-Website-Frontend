<template>
  <TakeOver
    event-title="September 2024 Keynote"
    :event-duration="{
      start: new Date(2024, 11, 12, 0, 0),
      end: new Date(2024, 11, 13, 0, 0),
    }"
    calendar-link="https://www.apple.com/newsroom/cal/apple-event-1724879336043/apple_event.ics"
    event-link="https://www.apple.com/apple-events/"
  />
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
