import type { MediaItemAttributes } from "./MediaItemAttributes";

export type AlbumAttributes = MediaItemAttributes & {
  genreNames: string[];
  isComplete: boolean;
  isSingle: boolean;
  trackCount: number;
};
