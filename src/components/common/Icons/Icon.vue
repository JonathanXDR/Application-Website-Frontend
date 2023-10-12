<template>
  <div v-html="icon" />
</template>

<script lang="ts">
import icons from '@/assets/icons'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      icon: ''
    }
  },
  mounted() {
    this.icon = icons[this.name]
  }
}
</script>
