export class MusicKitHelper {
  musicKitInstance: MusicKit.MusicKitInstance;

  constructor(musicKitInstance?: MusicKit.MusicKitInstance) {
    if (musicKitInstance) {
      this.musicKitInstance = musicKitInstance;
    } else {
      throw new Error(
        "MusicKit instance is not available. Make sure to load the MusicKit SDK before creating a MusicKitHelper instance."
      );
    }
  }

  async configureMusicKit(
    developerToken: string,
    app: MusicKit.AppConfiguration
  ): Promise<MusicKit.Configuration> {
    MusicKit.configure({
      developerToken: developerToken,
      app: app,
    });
    this.musicKitInstance = MusicKit.getInstance();

    return MusicKit.getInstance();
  }

  async authorizeUser() {
    await this.musicKitInstance.authorize();
  }

  async unauthorizeUser() {
    await this.musicKitInstance.unauthorize();
  }

  play() {
    this.musicKitInstance.player.play();
  }

  pause() {
    this.musicKitInstance.player.pause();
  }

  stop() {
    this.musicKitInstance.player.stop();
  }

  next() {
    this.musicKitInstance.player.skipToNextItem();
  }

  previous() {
    this.musicKitInstance.player.skipToPreviousItem();
  }

  async setQueue(options: MusicKit.SetQueueOptions) {
    await this.musicKitInstance.setQueue(options);
  }

  async playAlbum(albumId: string) {
    await this.musicKitInstance.setQueue({ album: albumId });
    this.musicKitInstance.player.play();
  }

  async playPlaylist(playlistId: string) {
    await this.musicKitInstance.setQueue({ playlist: playlistId });
    this.musicKitInstance.player.play();
  }

  async playSong(songId: string) {
    await this.musicKitInstance.setQueue({ song: songId });
    this.musicKitInstance.player.play();
  }

  async getAlbum(albumId: string) {
    return await this.musicKitInstance.api.album(albumId);
  }

  async getPlaylist(playlistId: string) {
    return await this.musicKitInstance.api.playlist(playlistId);
  }

  async getSong(songId: string) {
    return await this.musicKitInstance.api.song(songId);
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

  async addToLibrary(
    itemId: string,
    itemType: "songs" | "albums" | "playlists"
  ) {
    await this.musicKitInstance.api.addToLibrary({ [itemType]: [itemId] });
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

export async function loadMusicKitSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof (window as any).MusicKit !== "undefined") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
    script.onload = () => resolve();
    script.onerror = (error) =>
      reject(new Error(`MusicKit SDK loading error: ${error}`));
    document.head.appendChild(script);
  });
}
