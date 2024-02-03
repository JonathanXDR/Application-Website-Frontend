import type { MusicKitAPI } from "./MusicKitAPI";
import type { MusicKitPlayer } from "./MusicKitPlayer";
import type { SetQueueOptions } from "./SetQueueOptions";

export type MusicKitInstance = {
  api: MusicKitAPI;
  player: MusicKitPlayer;
  isAuthorized: boolean;
  musicUserToken: string;
  storefrontId: string;
  developerToken: string;
  authorize: () => Promise<string>;
  unauthorize: () => Promise<void>;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
  setQueue: (options: SetQueueOptions) => Promise<void>;
};
