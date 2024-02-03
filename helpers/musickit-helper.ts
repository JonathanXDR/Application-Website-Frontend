interface SearchResults {
  albums: any[];
  artists: any[];
  songs: any[];
}

declare const MusicKit: any;

class MusicKitHelper {
  musicKitInstance: any;

  constructor() {
    this.musicKitInstance = MusicKit.getInstance();
  }

  async configureMusicKit(
    developerToken: string,
    app: MusicKit.AppConfiguration
  ) {
    MusicKit.configure({
      developerToken: developerToken,
      app: app,
    });
    this.musicKitInstance = MusicKit.getInstance();
  }

  async authorizeUser() {
    await this.musicKitInstance.authorize();
  }

  async unauthorizeUser() {
    await this.musicKitInstance.unauthorize();
  }

  play() {
    this.musicKitInstance.play();
  }

  pause() {
    this.musicKitInstance.pause();
  }

  stop() {
    this.musicKitInstance.stop();
  }

  next() {
    this.musicKitInstance.skipToNextItem();
  }

  previous() {
    this.musicKitInstance.skipToPreviousItem();
  }

  async setQueue(options: MusicKit.SetQueueOptions) {
    await this.musicKitInstance.setQueue(options);
  }

  async playAlbum(albumId: string) {
    await this.musicKitInstance.setQueue({ album: albumId });
    this.musicKitInstance.play();
  }

  async playPlaylist(playlistId: string) {
    await this.musicKitInstance.setQueue({ playlist: playlistId });
    this.musicKitInstance.play();
  }

  async playSong(songId: string) {
    await this.musicKitInstance.setQueue({ song: songId });
    this.musicKitInstance.play();
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

  async search(
    term: string,
    types: string[] = ["albums", "artists", "songs"],
    limit: number = 10
  ): Promise<SearchResults> {
    const results = await this.musicKitInstance.api.search(term, {
      types: types.join(","),
      limit,
    });
    return results;
  }

  async addToLibrary(
    itemId: string,
    itemType: "songs" | "albums" | "playlists"
  ) {
    await this.musicKitInstance.api.addToLibrary({ [itemType]: [itemId] });
  }

  onPlaybackStateChanged(callback: (state: MusicKit.PlaybackStates) => void) {
    this.musicKitInstance.addEventListener(
      MusicKit.Events.playbackStateDidChange,
      callback
    );
  }

  offPlaybackStateChanged(callback: (state: MusicKit.PlaybackStates) => void) {
    this.musicKitInstance.removeEventListener(
      MusicKit.Events.playbackStateDidChange,
      callback
    );
  }
}

export const musicKitHelper = new MusicKitHelper();
