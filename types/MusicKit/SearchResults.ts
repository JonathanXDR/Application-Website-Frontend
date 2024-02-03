import type { Album } from "./Album";
import type { Artist } from "./Artist";
import type { Playlist } from "./Playlist";
import type { Song } from "./Song";

export type SearchResults = {
  albums: Album[];
  playlists: Playlist[];
  songs: Song[];
  artists: Artist[];
};
