import { MusicKitTS } from 'musickit-ts'
import { listRepositoryTags } from './github-helper'

const musicKitTS = new MusicKitTS()

const fetchTags = async () => {
  const [latest] = await listRepositoryTags({
    owner: 'JonathanXDR',
    repo: 'Application-Website-Frontend',
    perPage: 1
  })

  latest.name = latest.name.replace(/^v/, '')
  return latest.name
}

musicKitTS.configure({
  app: {
    name: 'Application-Website-Frontend',
    build: await fetchTags()
  },
  developerToken: import.meta.env.VITE_APPLE_DEVELOPER_TOKEN
})

export async function getSampleAlbum() {
  const result = await musicKitTS.api.getCatalogResource.Album({
    id: '1479013030'
  })
  return result
}
