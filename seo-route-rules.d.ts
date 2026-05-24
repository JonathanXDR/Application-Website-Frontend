/**
 * Bridges the @nuxtjs/robots route rule type augmentation for nuxt.config.ts.
 *
 * @nuxtjs/robots only augments both `nitropack` and `nitropack/types` when
 * `future.compatibilityVersion === 4`. We run with `compatibilityVersion: 5`
 * for forward compat with Nuxt 5, so the `nitropack/types` augmentation is
 * skipped and the Nuxt config type system can't see the `robots` route rule.
 * This shim mirrors the augmentation so the type is accepted in routeRules.
 *
 * Remove once @nuxtjs/robots widens its compat check (`>= 4`) or once we
 * downgrade `future.compatibilityVersion`.
 *
 * @see node_modules/@nuxtjs/robots/dist/module.mjs — `isNuxt4 = ... === 4`
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
