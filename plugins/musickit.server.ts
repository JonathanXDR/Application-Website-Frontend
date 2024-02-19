export default defineNuxtPlugin(async (nuxtApp) => {
  // const { appleDeveloperToken } = useRuntimeConfig();
  const appleDeveloperToken = import.meta.env.VITE_APPLE_DEVELOPER_TOKEN
  const tags: Ref<{
    latest: string | undefined
    previous: string | undefined
  }> = ref({ latest: undefined, previous: undefined })

  const fetchTags = async (): Promise<void> => {
    const [latest, previous] = await listRepositoryTags({
      owner: 'JonathanXDR',
      repo: 'Application-Website-Frontend',
      perPage: 2
    })

    tags.value = { latest: latest.name, previous: previous.name }
  }

  const loadMusicKitSDK = async (): Promise<any> => {
    await fetchTags()
    return await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://js-cdn.music.apple.com/musickit/v1/musickit.js'
      script.async = true
      script.onload = () => { resolve(window.MusicKit) }
      script.onerror = () => { reject(new Error('Failed to load MusicKit JS SDK')) }
      document.head.appendChild(script)
    })
  }

  if (process.client ?? false) {
    await loadMusicKitSDK()

    try {
      const musicKitInstance = window.MusicKit.getInstance()
      const musicKitHelper = new MusicKitHelper(musicKitInstance)

      const appConfiguration = {
        name: 'Application-Website',
        build: tags.value.latest ?? '1.0.0',
        version: tags.value.latest ?? '1.0.0',
        icon: '~/assets/img/favicon.png'
      }

      await musicKitHelper.configureMusicKit(appleDeveloperToken as string, appConfiguration)
    } catch (error: any) {
      throw new Error(`MusicKit initialization error: ${error}`)
    }
  }
})
