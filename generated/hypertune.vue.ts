/* eslint-disable prefer-rest-params, @typescript-eslint/consistent-type-imports, @typescript-eslint/no-import-type-side-effects, unicorn/prevent-abbreviations */

import {
  type App,
  type Ref,
  type ComputedRef,
  type MaybeRefOrGetter,
  computed,
  inject,
  shallowRef,
  toValue,
  triggerRef,
} from 'vue'
import { type UpdateListener } from 'hypertune'
import {
  type RootArgs,
  type DehydratedState,
  type CreateSourceOptions,
  RootNode,
  createSource,
} from './hypertune'

export type HypertunePluginOptions = {
  createSourceOptions: CreateSourceOptions
  dehydratedState?: DehydratedState | null
  rootArgs: MaybeRefOrGetter<RootArgs> | ComputedRef<RootArgs>
}

export const hypertuneKey = Symbol('hypertune')

export function useHypertune (): Ref<RootNode> {
  const hypertuneSource = inject<Ref<RootNode>>(hypertuneKey)
  if (!hypertuneSource) {
    throw new Error('hypertune root not provided')
  }
  return inject(hypertuneKey)!
}

export const hypertunePlugin = {
  install: (
    app: App,
    { createSourceOptions, dehydratedState, rootArgs }: HypertunePluginOptions
  ): void => {
    const hypertuneSourceRef = shallowRef(createSource(createSourceOptions))
    if (dehydratedState) {
      hypertuneSourceRef.value.hydrate(dehydratedState)
    }

    const updateListener: UpdateListener = () => {
      triggerRef(hypertuneSourceRef)
    }
    hypertuneSourceRef.value.addUpdateListener(updateListener)

    const hypertune = computed(() => {
      return hypertuneSourceRef.value.root({ args: toValue(rootArgs) })
    })

    app.provide(hypertuneKey, hypertune)

    const originalAppUnmount = app.unmount
    app.unmount = function () {
      hypertuneSourceRef.value.removeUpdateListener(updateListener)
      originalAppUnmount.apply(arguments)
      hypertuneSourceRef.value.close()
    }
  },
}
