import type { AlbumAttributes } from "./AlbumAttributes";

export type Album = {
  attributes: AlbumAttributes;
  id: string;
  type: "albums";
};
