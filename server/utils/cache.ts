import { createHash } from 'node:crypto'

/**
 * Hashes every string part to 16 characters. Nitro runs a custom `getKey`
 * return through `escapeKey`, which is `String(key).replace(/\W/g, '')`, so
 * 'the beatles' and 'thebeatles' would otherwise collapse to one key and
 * serve each other's cached response. The key also becomes a filename under
 * Nitro's filesystem cache driver, which caps a name at 255 bytes and then
 * silently stops caching: a 130-character `/api/flick/resolve` title produced
 * a ~277-character key that was never served from cache.
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
