import type { MediaItem } from "./MediaItem";
import type { PlaybackState } from "./PlaybackState";
import type { PlayerRepeatMode } from "./PlayerRepeatMode";
import type { PlayerShuffleMode } from "./PlayerShuffleMode";
import type { SetQueueOptions } from "./SetQueueOptions";

export type MusicKitPlayer = {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  skipToNextItem: () => void;
  skipToPreviousItem: () => void;
  setQueue: (options: SetQueueOptions) => Promise<void>;
  nowPlayingItem: MediaItem;
  playbackState: PlaybackState;
  repeatMode: PlayerRepeatMode;
  shuffleMode: PlayerShuffleMode;
};
