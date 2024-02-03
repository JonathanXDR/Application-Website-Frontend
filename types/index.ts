import type { MusicKitInstance } from "./MusicKit/MusicKitInstance";

export {};

declare global {
  interface Window {
    MusicKit: {
      getInstance: () => MusicKitInstance;
    };
  }
}
