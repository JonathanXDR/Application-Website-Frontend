import type { MediaItemAttributes } from "./MediaItemAttributes";
import type { PlayParams } from "./PlayParams";

export type PlaylistAttributes = MediaItemAttributes & {
  curatorName: string;
  description: string;
  playParams: PlayParams;
  playlistType: string;
  trackCount: number;
};
