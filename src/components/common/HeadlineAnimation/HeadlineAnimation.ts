import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

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
    let lastScrollY = window.scrollY

    function totalChars(upToWordIndex: number): number {
      const words = props.title.split(' ').slice(0, upToWordIndex)
      return words.reduce((total, word) => total + word.length, 0)
    }

    function handleScroll() {
      const totalLetters = [...props.title].filter((char) => char !== ' ').length
      if (window.scrollY > lastScrollY && letterIndex.value < totalLetters) {
        letterIndex.value += 1
      } else if (window.scrollY < lastScrollY && letterIndex.value > 0) {
        letterIndex.value -= 1
      }
      lastScrollY = window.scrollY
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      letterIndex,
      totalChars
    }
  }
})
