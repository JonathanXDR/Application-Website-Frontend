import * as MusicKit from 'https://js-cdn.music.apple.com/musickit/v3/musickit.js'
import { listRepositoryTags } from './github-helper'

const fetchTags = async () => {
  const [latest] = await listRepositoryTags({
    owner: 'JonathanXDR',
    repo: 'Application-Website-Frontend',
    perPage: 1
  })

  latest.name = latest.name.replace(/^v/, '')
  return latest.name
}

export async function configureMusicKit() {
  return new Promise<MusicKitInstance>((resolve, reject) => {
    document.addEventListener('musickitloaded', async () => {
      try {
        await MusicKit.configure({
          developerToken: import.meta.env.VITE_APPLE_DEVELOPER_TOKEN,
          app: {
            name: 'Application-Website-Frontend',
            build: await fetchTags()
          }
        })
        const music = MusicKit.getInstance()
        resolve(music)
      } catch (err) {
        reject(err)
      }
    })
  })
}

export async function authorizeUser(music: MusicKitInstance) {
  await music.authorize()
}

export async function unauthorizeUser(music: MusicKitInstance) {
  await music.unauthorize()
}

export async function searchMusic(music: MusicKitInstance, term: string, types: string) {
  const result = await music.api.music(`/v1/catalog/us/search`, { term, types })
  return result
}

export async function getUserLibraryAlbums(music: MusicKitInstance) {
  await music.authorize()
  const result = await music.api.music('v1/me/library/albums')
  return result
}

export async function fetchPaginatedData(
  music: MusicKitInstance,
  urlPath: string,
  pageSize: number
) {
  const tracks = []
  let hasNextPage = true
  while (hasNextPage) {
    const queryParameters = { limit: pageSize, offset: tracks.length }
    const {
      data: { data: dataForPage = [], next }
    } = await music.api.music(urlPath, queryParameters)
    tracks.push(...dataForPage)
    hasNextPage = !!next
  }
  return tracks
}

export async function playLiveRadio(music: MusicKitInstance, stationId: string) {
  await music.setQueue({ station: stationId })
  await music.play()
}

export async function playCatalogStation(music: MusicKitInstance, stationId: string) {
  await music.setQueue({ station: stationId })
  await music.play()
}

export async function playPersonalStation(music: MusicKitInstance, stationId: string) {
  await music.setQueue({ station: stationId })
  await music.play()
}

export async function playMusicVideo(music: MusicKitInstance, musicVideoId: string) {
  await music.setQueue({ musicVideo: musicVideoId })
  await music.play()
}

export function getAlbumArtworkUrl(artwork: ArtworkObject, width: number, height: number) {
  return MusicKit.formatArtworkURL(artwork, width, height)
}
