import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HeadlineAnimation',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const letterIndex = ref(0)
    const words = computed(() => props.title.split(' '))
    const letterCounter = 0

    onMounted(() => {
      window.addEventListener('scroll', () => {
        letterIndex.value = Math.floor(window.scrollY / 50)
      })
    })

    return {
      letterIndex,
      letterCounter,
      words
    }
  }
})
