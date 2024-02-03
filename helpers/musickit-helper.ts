declare const MusicKit: any;

interface MusicKitInstance {
  api: MusicKitAPI;
  player: MusicKitPlayer;
  isAuthorized: boolean;
  musicUserToken: string;
  storefrontId: string;
  developerToken: string;
  authorize: () => Promise<string>;
  unauthorize: () => Promise<void>;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
  setQueue: (options: SetQueueOptions) => Promise<void>;
}

interface MusicKitConfiguration {
  developerToken: string;
  app: AppConfiguration;
}

interface AppConfiguration {
  name: string;
  build: string;
  version: string;
  icon: string;
}

interface MusicKitPlayer {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  skipToNextItem: () => void;
  skipToPreviousItem: () => void;
  setQueue: (options: SetQueueOptions) => Promise<void>;
  nowPlayingItem: MediaItem;
  playbackState: PlaybackState;
  repeatMode: PlayerRepeatMode;
  shuffleMode: PlayerShuffleMode;
}

interface SetQueueOptions {
  album?: string;
  playlist?: string;
  song?: string;
  songs?: string[];
  url?: string;
}

interface Queue {
  items: MediaItem[];
  position: number;
  nextPlayableItem: MediaItem;
  previousPlayableItem: MediaItem;
}

interface MediaItem {
  id: string;
  type: "songs" | "albums" | "playlists";
  attributes: MediaItemAttributes;
}

interface MediaItemAttributes {
  albumName?: string;
  artistName: string;
  artwork: Artwork;
  playParams: PlayParams;
  genreNames: string[];
  durationInMillis: number;
  releaseDate: string;
  name: string;
  trackNumber?: number;
}

interface Artwork {
  url: string;
  width: number;
  height: number;
}

interface PlayParams {
  id: string;
  kind: string;
}

interface MusicKitAPI {
  album: (id: string) => Promise<Album>;
  playlist: (id: string) => Promise<Playlist>;
  song: (id: string) => Promise<Song>;
  search: (term: string, options: SearchOptions) => Promise<SearchResults>;
  addToLibrary: (options: any) => Promise<void>;
}

interface Album {
  attributes: AlbumAttributes;
  id: string;
  type: "albums";
}

interface Playlist {
  attributes: PlaylistAttributes;
  id: string;
  type: "playlists";
}

interface Song {
  attributes: SongAttributes;
  id: string;
  type: "songs";
}

interface Artist {
  attributes: ArtistAttributes;
  id: string;
  type: "artists";
}

interface SearchOptions {
  term: string;
  limit?: number;
  types: string[];
}

interface SearchResults {
  albums: Album[];
  playlists: Playlist[];
  songs: Song[];
  artists: Artist[];
}

interface AlbumAttributes extends MediaItemAttributes {
  genreNames: string[];
  isComplete: boolean;
  isSingle: boolean;
  trackCount: number;
}

interface PlaylistAttributes extends MediaItemAttributes {
  curatorName: string;
  description: string;
  playParams: PlayParams;
  playlistType: string;
  trackCount: number;
}

interface SongAttributes extends MediaItemAttributes {
  albumName: string;
  discNumber: number;
}

interface ArtistAttributes {
  genreNames: string[];
  name: string;
}

type PlaybackState = "none" | "loading" | "playing" | "paused" | "stopped";
type PlayerRepeatMode = "none" | "one" | "all";
type PlayerShuffleMode = "off" | "songs";

export class MusicKitHelper {
  musicKitInstance: MusicKitInstance;

  constructor(musicKitInstance?: MusicKitInstance) {
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
    app: AppConfiguration
  ): Promise<MusicKitConfiguration> {
    MusicKit.configure({
      developerToken: developerToken,
      app: app,
    });
    this.musicKitInstance = MusicKit.getInstance();

    return MusicKit.getInstance().config;
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

  async setQueue(options: SetQueueOptions) {
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

  async search(
    term: string,
    types: string[] = ["albums", "artists", "songs"],
    limit: number = 10
  ): Promise<SearchResults> {
    const results = await this.musicKitInstance.api.search(term, {
      types: types,
      limit: limit,
      term: term,
    });
    return results;
  }

  async addToLibrary(
    itemId: string,
    itemType: "songs" | "albums" | "playlists"
  ) {
    await this.musicKitInstance.api.addToLibrary({ [itemType]: [itemId] });
  }

  onPlaybackStateChanged(callback: (state: PlaybackState) => void) {
    this.musicKitInstance.addEventListener(
      MusicKit.Events.playbackStateDidChange,
      callback
    );
  }

  offPlaybackStateChanged(callback: (state: PlaybackState) => void) {
    this.musicKitInstance.removeEventListener(
      MusicKit.Events.playbackStateDidChange,
      callback
    );
  }
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
