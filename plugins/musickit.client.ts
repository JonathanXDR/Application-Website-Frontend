import { MusicKitHelper } from "../helpers/musickit-helper";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    await loadMusicKitSDK();

    try {
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
    } catch (error) {
      console.error("MusicKit initialization error:", error);
    }
  }
});

async function loadMusicKitSDK() {
  return new Promise((resolve, reject) => {
    if (window.MusicKit) {
      resolve(window.MusicKit);
    } else {
      let script = document.createElement("script");
      script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
      script.async = true;
      script.onload = () => resolve(window.MusicKit);
      script.onerror = () =>
        reject(new Error("Failed to load MusicKit JS SDK"));
      document.head.appendChild(script);
    }
  });
}
