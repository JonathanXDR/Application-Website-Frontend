import { createHash } from 'node:crypto'

// Builds the variable part of a Nitro cache key from validated request input.
//
// Two constraints shape this. Nitro runs a custom `getKey` return through
// `escapeKey`, which is `String(key).replace(/\W/g, '')`, so it strips
// spaces, commas, dots, dashes, and diacritics: two inputs differing only by
// those characters, such as the search terms 'the beatles' and 'thebeatles'
// or the id lists '1,2' and '12', would otherwise collapse to the same key
// and serve each other's cached response. And the key becomes a filename
// under Nitro's filesystem cache driver, which caps a name at 255 bytes, so
// an unbounded encoding silently disables caching rather than failing: a
// 130-character `/api/flick/resolve` title produced a ~277-character key that
// was never served from cache, turning every repeat into an upstream request
// against the account's rate limit.
//
// Hashing free-form parts satisfies both: the digest is key-safe under
// `escapeKey`, distinct inputs keep distinct keys, and every part is a fixed
// 16 characters regardless of input size. Numbers are already key-safe and
// short, so they stay readable. The route name namespaces entries, so parts
// only need to be unique within one route.
export function cacheKey(...parts: Array<string | number>): string {
  return parts
    .map(part =>
      typeof part === 'number'
        ? String(part)
        : createHash('sha256').update(part).digest('hex').slice(0, 16),
    )
    .join('_')
}
