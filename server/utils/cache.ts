// Builds the variable part of a Nitro cache key from validated request input.
// Nitro runs a custom `getKey` return through `escapeKey`, which is
// `String(key).replace(/\W/g, '')`, so it strips spaces, commas, dots,
// dashes, and diacritics. Two inputs that differ only by those characters,
// such as the search terms 'the beatles' and 'thebeatles' or the id lists
// '1,2' and '12', would otherwise collapse to the same key and serve each
// other's cached response. Numbers are already key-safe and join with an
// underscore, which survives `escapeKey`. Free-form parts are hex encoded so
// distinct inputs keep distinct keys. The route name namespaces entries, so
// parts only need to be unique within one route.
export function cacheKey(...parts: Array<string | number>): string {
  return parts
    .map(part =>
      typeof part === 'number'
        ? String(part)
        : Buffer.from(part).toString('hex'),
    )
    .join('_')
}
