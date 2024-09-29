import {
  type DehydratedState,
  type RootArgs,
  createSourceForServerOnly,
} from '~/generated/hypertune'
import { hypertuneKey, hypertunePlugin } from '~/generated/hypertune.vue'

const hypertuneSource = createSourceForServerOnly({
  token: process.env.HYPERTUNE_TOKEN!,
  shouldRefreshInitData: false,
})

export default defineNuxtPlugin(async (nuxtApp) => {
  let serverData: {
    dehydratedState: DehydratedState | null
    rootArgs: RootArgs
  }

  if (import.meta.server) {
    await hypertuneSource.initIfNeeded()

    const rootArguments = computed<RootArgs>(() => {
      return {
        context: {
          environment: 'development',
          user: { id: '1', name: 'Test', email: 'hi@test.com' },
        },
      }
    })

    const hypertune = computed(() =>
      hypertuneSource.root({ args: rootArguments.value })
    )
    nuxtApp.vueApp.provide(hypertuneKey, hypertune)

    serverData = {
      dehydratedState: hypertune.value.dehydrate(),
      rootArgs: hypertune.value.getRootArgs(),
    }
  }

  useHydration(
    'hypertune',
    () => serverData,
    ({ dehydratedState, rootArgs }) => {
      const runtimeConfig = useRuntimeConfig()
      nuxtApp.vueApp.use(hypertunePlugin, {
        createSourceOptions: {
          token: runtimeConfig.public.hypertuneToken,
        },
        dehydratedState,
        rootArgs,
      })
    }
  )
})
