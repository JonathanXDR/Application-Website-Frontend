import type { MediaItemAttributes } from "./MediaItemAttributes";

export type SongAttributes = MediaItemAttributes & {
  albumName: string;
  discNumber: number;
};
