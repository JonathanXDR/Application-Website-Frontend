export default defineNuxtPlugin(async () => {
  const route = useRoute()
  const { data: siteContent } = await useQueryCollection('siteConfig')
    .stem('site')
    .first()

  watchEffect(() => {
    if (!siteContent.value?.description) return

    const pageName = (route.name as string)?.replace(/___\w+$/, '')
    const pageDescription = pageName
      ? siteContent.value.pages?.[pageName]?.description
      : undefined

    updateSiteConfig({
      description: pageDescription || siteContent.value.description,
    })
  })
})
