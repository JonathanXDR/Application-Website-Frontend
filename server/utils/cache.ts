import { createHash } from 'node:crypto'

/**
 * Builds the variable part of a Nitro cache key from validated request input,
 * hashing every string part to a fixed 16 characters. Numbers are already
 * key-safe and short, so they stay readable.
 *
 * Two constraints force the hashing. Nitro runs a custom `getKey` return
 * through `escapeKey`, which is `String(key).replace(/\W/g, '')`, so
 * 'the beatles' and 'thebeatles', or the id lists '1,2' and '12', would
 * otherwise collapse to one key and serve each other's cached response. And
 * the key becomes a filename under Nitro's filesystem cache driver, which
 * caps a name at 255 bytes and then silently stops caching rather than
 * failing: a 130-character `/api/flick/resolve` title produced a
 * ~277-character key that was never served from cache.
 *
 * The route name namespaces entries, so parts only need to be unique within
 * one route.
 */
export function cacheKey(...parts: Array<string | number>): string {
  return parts
    .map(part =>
      typeof part === 'number'
        ? String(part)
        : createHash('sha256').update(part).digest('hex').slice(0, 16),
    )
    .join('_')
}
