import type { MediaItemAttributes } from "./MediaItemAttributes";

export type MediaItem = {
  id: string;
  type: "songs" | "albums" | "playlists";
  attributes: MediaItemAttributes;
};
