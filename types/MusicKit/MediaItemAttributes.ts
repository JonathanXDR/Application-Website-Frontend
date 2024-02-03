import type { Artwork } from "./Artwork";
import type { PlayParams } from "./PlayParams";

export type MediaItemAttributes = {
  albumName?: string;
  artistName: string;
  artwork: Artwork;
  playParams: PlayParams;
  genreNames: string[];
  durationInMillis: number;
  releaseDate: string;
  name: string;
  trackNumber?: number;
};
