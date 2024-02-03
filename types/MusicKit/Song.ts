import type { SongAttributes } from "./SongAttributes";

export type Song = {
  attributes: SongAttributes;
  id: string;
  type: "songs";
};
