// import js from '@eslint/js';
// import standard from 'eslint-config-standard';
// import ts from 'typescript-eslint';
import nuxt from './.nuxt/eslint.config.mjs';

// const baseConfigurations = {
//   ...standard,
//   ...js.configs.recommended,
//   ...ts.configs.recommended,
// };

const nuxtRules = nuxt([
  {
    stylistic: true,
    typescript: {
      strict: true,
    },
  },
  {
    files: ['*.vue'],
    rules: {
      'vue/multi-word-component-names': 'error',
    },
  },
  {
    files: ['app.vue', 'error.vue', 'pages/**/*.vue', 'layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]);

export default {
  // ...baseConfigurations,
  overrides: [nuxtRules],
};
