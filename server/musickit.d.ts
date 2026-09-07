/// <reference types="musickit-js" />

// The `@types/musickit-js` ambient namespace is wired into the app TypeScript
// context through `nuxt.config.ts` but not the Nitro server context. This
// reference pulls it into the server program so the MusicKit routes can type
// their upstream responses against the MusicKit shapes.
