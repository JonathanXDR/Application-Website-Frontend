import type { ArtistAttributes } from "./ArtistAttributes";

export type Artist = {
  attributes: ArtistAttributes;
  id: string;
  type: "artists";
};
