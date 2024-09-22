/* eslint-disable */

import type { UpdateListener } from 'hypertune';
import {
  type App,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
  computed,
  inject,
  shallowRef,
  toValue,
  triggerRef,
} from 'vue';
import type {
  type CreateSourceOptions,
  type DehydratedState,
  type RootArgs as RootArguments,
  RootNode,
  createSource,
} from './hypertune';

export type HypertunePluginOptions = {
  createSourceOptions: CreateSourceOptions;
  dehydratedState?: DehydratedState | null;
  rootArgs: MaybeRefOrGetter<RootArguments> | ComputedRef<RootArguments>;
};

export const hypertuneKey = Symbol('hypertune');

export function useHypertune(): Ref<RootNode> {
  const hypertuneSource = inject<Ref<RootNode>>(hypertuneKey);
  if (!hypertuneSource) {
    throw new Error('hypertune root not provided');
  }
  return inject(hypertuneKey)!;
}

export const hypertunePlugin = {
  install: (
    app: App,
    { createSourceOptions, dehydratedState, rootArgs }: HypertunePluginOptions
  ): void => {
    const hypertuneSourceReference = shallowRef(
      createSource(createSourceOptions)
    );
    if (dehydratedState) {
      hypertuneSourceReference.value.hydrate(dehydratedState);
    }

    const updateListener: UpdateListener = () => {
      triggerRef(hypertuneSourceReference);
    };
    hypertuneSourceReference.value.addUpdateListener(updateListener);

    const hypertune = computed(() => {
      return hypertuneSourceReference.value.root({ args: toValue(rootArgs) });
    });

    app.provide(hypertuneKey, hypertune);

    const originalAppUnmount = app.unmount;
    app.unmount = function () {
      hypertuneSourceReference.value.removeUpdateListener(updateListener);
      originalAppUnmount.apply(arguments);
      hypertuneSourceReference.value.close();
    };
  },
};
