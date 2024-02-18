export class MusicKitHelper {
  musicKitInstance: MusicKit.MusicKitInstance

  constructor (musicKitInstance?: MusicKit.MusicKitInstance) {
    if (musicKitInstance !== null && musicKitInstance !== undefined) {
      this.musicKitInstance = musicKitInstance
    } else {
      throw new Error(
        'MusicKit instance is not available. Make sure to load the MusicKit SDK before creating a MusicKitHelper instance.'
      )
    }
  }

  // eslint-disable-next-line require-await
  async configureMusicKit (
    developerToken: string,
    app: MusicKit.AppConfiguration
  ): Promise<MusicKit.Configuration> {
    MusicKit.configure({
      developerToken,
      app
    })
    this.musicKitInstance = MusicKit.getInstance()

    return MusicKit.getInstance()
  }

  async unauthorizeUser (): Promise<void> {
    await this.musicKitInstance.unauthorize()
  }

  async play (): Promise<void> {
    await this.musicKitInstance.player.play()
  }

  pause (): void {
    this.musicKitInstance.player.pause()
  }

  stop (): void {
    this.musicKitInstance.player.stop()
  }

  async getPlaylist (playlistId: string): Promise<MusicKit.Playlists> {
    return await this.musicKitInstance.api.playlist(playlistId)
  }

  async getSong (songId: string): Promise<MusicKit.Songs> {
    return await this.musicKitInstance.api.song(songId)
  }

  // async search(
  //   term: string,
  //   types: string[] = ["albums", "artists", "songs"],
  //   limit: number = 10
  // ): Promise<MusicKit.SearchResult> {
  //   const results = await this.musicKitInstance.api.search(term, {
  //     types: types,
  //     limit: limit,
  //     term: term,
  //   });
  //   return results;
  // }

  async addToLibrary (
    itemId: string,
    itemType: 'songs' | 'albums' | 'playlists'
  ): Promise<void> {
    await this.musicKitInstance.api.addToLibrary({ [itemType]: [itemId] })
  }

  // onPlaybackStateChanged(callback: (state: MusicKit.PlaybackStates) => void) {
  //   this.musicKitInstance.addEventListener(
  //     MusicKit.Events.playbackStateDidChange,
  //     callback
  //   );
  // }

  // offPlaybackStateChanged(callback: (state: MusicKit.PlaybackStates) => void) {
  //   this.musicKitInstance.removeEventListener(
  //     MusicKit.Events.playbackStateDidChange,
  //     callback
  //   );
  // }
}

export async function loadMusicKitSDK (): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    if (typeof (window as any).MusicKit !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js-cdn.music.apple.com/musickit/v1/musickit.js'
    script.onload = () => { resolve() }
    script.onerror = (error: Event | string) => { reject(new Error(`MusicKit SDK loading error: ${String(error)}`)) }
    document.head.appendChild(script)
  })
}
