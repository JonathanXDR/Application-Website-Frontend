import MusicKit from "musickit-js";

class MusicKitHelper {
  musicKitInstance: any;

  constructor() {
    this.musicKitInstance = null;
  }

  async configureMusicKit() {
    const configuration = {
      developerToken: "YOUR_DEVELOPER_TOKEN",
      app: {
        name: "Your App Name",
        build: "Your App Build Version",
      },
    };
    MusicKit.configure(configuration);
    this.musicKitInstance = MusicKit.getInstance();
  }

  async authorizeUser() {
    if (!this.musicKitInstance) {
      console.error("MusicKit not initialized");
      return;
    }
    try {
      await this.musicKitInstance.authorize();
      console.log("User authorized");
    } catch (error) {
      console.error("Authorization error:", error);
    }
  }

  async playAlbum(albumId: string) {
    if (!this.musicKitInstance) {
      console.error("MusicKit not initialized");
      return;
    }
    try {
      await this.musicKitInstance.setQueue({ album: albumId });
      this.musicKitInstance.play();
    } catch (error) {
      console.error("Error playing album:", error);
    }
  }

  async playPlaylist(playlistId: string) {
    if (!this.musicKitInstance) {
      console.error("MusicKit not initialized");
      return;
    }
    try {
      await this.musicKitInstance.setQueue({ playlist: playlistId });
      this.musicKitInstance.play();
    } catch (error) {
      console.error("Error playing playlist:", error);
    }
  }

  async search(term: string) {
    if (!this.musicKitInstance) {
      console.error("MusicKit not initialized");
      return;
    }
    try {
      const results = await this.musicKitInstance.api.search(term, {
        limit: 10,
        types: "albums,artists,songs",
      });
      console.log("Search results:", results);
      return results;
    } catch (error) {
      console.error("Search error:", error);
    }
  }
}

export const musicKitHelper = new MusicKitHelper();
