declare module "global" {
  interface Window {
    MusicKit: {
      getInstance: () => MusicKitInstance;
    };
  }
}
