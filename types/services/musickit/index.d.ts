/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace MusicKit {
  interface API {
    /**
     * Fetches resources from the Apple Music API.
     * @param path The API path.
     * @param queryParameters Optional query parameters.
     * @param options Optional fetch options.
     * @returns A promise that resolves with the API response.
     */
    music(
      path: string,
      queryParameters?: QueryParameters,
      options?: { fetchOptions?: RequestInit },
    ): Promise<any>;
  }
}
