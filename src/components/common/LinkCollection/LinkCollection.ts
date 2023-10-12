export default {
  name: 'LinkCollection',
  components: {},
  props: {
    links: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
