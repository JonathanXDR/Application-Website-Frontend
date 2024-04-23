import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
    },
  },
  {
    files: ['app.vue', 'error.vue', 'pages/**/*.vue', 'layouts/**/*.vue', 'components/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
