/**
 * Bridges the @nuxtjs/robots route rule type augmentation for nuxt.config.ts.
 *
 * `@nuxtjs/robots` only augments both `nitropack` and `nitropack/types` when
 * `future.compatibilityVersion === 4`. This project runs with
 * `compatibilityVersion: 5` for forward compatibility with Nuxt 5, so the
 * `nitropack/types` augmentation is skipped and the Nuxt config type system
 * cannot see the `robots` route rule. This shim mirrors the augmentation
 * so the type is accepted in `routeRules`.
 *
 * TODO: remove once `@nuxtjs/robots` widens its compatibility check to
 * `>= 4`, or once `future.compatibilityVersion` is downgraded.
 *
 * @see node_modules/@nuxtjs/robots/dist/module.mjs (`isNuxt4 = ... === 4`)
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
