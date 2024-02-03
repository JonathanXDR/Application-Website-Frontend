import type { Album } from "./Album";
import type { Playlist } from "./Playlist";
import type { SearchOptions } from "./SearchOptions";
import type { SearchResults } from "./SearchResults";
import type { Song } from "./Song";

export type MusicKitAPI = {
  album: (id: string) => Promise<Album>;
  playlist: (id: string) => Promise<Playlist>;
  song: (id: string) => Promise<Song>;
  search: (term: string, options: SearchOptions) => Promise<SearchResults>;
  addToLibrary: (options: any) => Promise<void>;
};
