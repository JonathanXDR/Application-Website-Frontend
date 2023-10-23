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

    const getItemsWithSpaces = (title: string) => {
      const words = title.split(' ')
      const itemsWithSpaces: string[] = []
      words.forEach((word, index) => {
        itemsWithSpaces.push(word)
        if (index < words.length - 1) {
          itemsWithSpaces.push(' ')
        }
      })
      return itemsWithSpaces
    }

    onMounted(() => {
      window.addEventListener('scroll', () => {
        letterIndex.value = Math.floor(window.scrollY / 50)
      })
    })

    return {
      letterIndex,
      letterCounter,
      words,
      getItemsWithSpaces
    }
  }
})
