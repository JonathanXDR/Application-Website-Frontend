<template>
  <div v-html="icon" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['big', 'medium', 'small'].includes(value)
    }
  },
  data() {
    return {
      icon: ''
    }
  },
  mounted() {
    this.loadIcon()
  },
  methods: {
    async loadIcon() {
      const iconPath = `src/assets/icons/${this.size}/${this.name}.svg`
      try {
        const response = await fetch(iconPath)
        if (!response.ok) {
          console.error(`Failed to load icon: ${response.statusText}`)
          return
        }
        const text = await response.text()
        this.icon = text
      } catch (error) {
        console.error(`Failed to load icon: ${error.message}`)
      }
    }
  }
}
</script>
