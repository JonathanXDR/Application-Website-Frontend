import { MusicKitHelper } from "~/helpers/musickit-helper";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    await loadMusicKitSDK();

    const musicKitInstance = window.MusicKit.getInstance();
    const musicKitHelper = new MusicKitHelper(musicKitInstance);

    const developerToken = import.meta.env.VITE_APPLE_DEVELOPER_TOKEN;
    const appConfiguration = {
      name: "Application-Website",
      build: "1.0.0",
      version: "1.0.0",
      icon: "App Icon URL",
    };

    musicKitHelper.configureMusicKit(developerToken, appConfiguration);
  }
});

async function loadMusicKitSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.MusicKit !== "undefined") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
    script.onload = () => {
      console.log("MusicKit SDK Loaded");
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
