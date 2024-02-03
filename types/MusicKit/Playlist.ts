import type { PlaylistAttributes } from "./PlaylistAttributes";

export type Playlist = {
  attributes: PlaylistAttributes;
  id: string;
  type: "playlists";
};
