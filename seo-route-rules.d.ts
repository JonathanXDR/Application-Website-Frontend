/**
 * Bridges the @nuxtjs/robots route rule type augmentation for nuxt.config.ts.
 *
 * The robots module augments `NitroRouteRules` on `'nitropack'` only,
 * but the Nuxt config type system resolves through `'nitropack/types'`.
 * This shim mirrors the augmentation so `robots` is accepted in routeRules.
 *
 * @see https://github.com/nuxt-modules/robots — upstream fix pending
 */
import type { RobotsValue } from '@nuxtjs/robots'

declare module 'nitropack/types' {
  interface NitroRouteRules {
    robots?: RobotsValue | { indexable: boolean, rule: string }
  }
  interface NitroRouteConfig {
    robots?: RobotsValue | { indexable: boolean, rule: string }
  }
}
