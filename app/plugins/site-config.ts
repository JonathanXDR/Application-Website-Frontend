export default defineNuxtPlugin(async () => {
  const { data: siteContent } = await useQueryCollection('siteConfig')
    .stem('site')
    .first()

  watchEffect(() => {
    if (siteContent.value?.description) {
      updateSiteConfig({ description: siteContent.value.description })
    }
  })
})
