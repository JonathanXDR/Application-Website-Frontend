import type { Root } from '~/generated/hypertune'

export type FeatureFlags = {
  [K in keyof Root]: ComputedRef<Root[K]>;
}
