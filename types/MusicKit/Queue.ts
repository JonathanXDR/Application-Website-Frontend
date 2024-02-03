import type { MediaItem } from "./MediaItem";

export type Queue = {
  items: MediaItem[];
  position: number;
  nextPlayableItem: MediaItem;
  previousPlayableItem: MediaItem;
};
