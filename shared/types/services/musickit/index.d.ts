declare namespace MusicKit {
  interface API {
    /**
     * Makes a request to the Apple Music API.
     *
     * @param path - The path to the Apple Music API endpoint, without a hostname, and including a leading slash `/`.
     * @param queryParameters - An optional object with query parameters which will be appended to the request URL. The supported or expected query parameters will vary depending on the API endpoint you are requesting from. See the Apple Music API documentation for reference.
     * @param options - An optional object with additional options to control how requests are made.
     * @param options.fetchOptions - An optional object that is passed as options to the underlying `fetch()` function.
     * @returns A promise that resolves with the response from the Apple Music API.
     */
    music(
      path: string,
      queryParameters?: QueryParameters,
      options?: { fetchOptions?: RequestInit }
    ): Promise<any>
  }
}
