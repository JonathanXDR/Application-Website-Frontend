export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    nuxtApp.provide('hasError', true)
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    nuxtApp.provide('hasError', true)
  })
})
