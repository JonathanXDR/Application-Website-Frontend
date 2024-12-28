<template>
  <h1>{{ title }}</h1>
  <ul
    role="list"
    aria-label="Fun Facts"
    class="chip-claims-list stat"
  >
    <li
      v-for="(item, index) in funFacts"
      :key="index"
      v-animation="{
        add: 'visible',
        key: `chip-claim-${index}`,
        onEnter: () => animateNumber(index),
      }"
      class="chip-claim"
      role="listitem"
      tabindex="-1"
      data-textanim-1
      :style="{
        '--chip-claim-height': `${chipClaimHeight - 12}px`,
      }"
    >
      <div>
        <figure class="stat typography-site-stat-caption highlight">
          <strong ref="titleElements">
            <span
              :ref="
                (el) => {
                  if (el) progressSpan[index] = el as HTMLElement;
                }
              "
            >
              {{
                item.progress.toLocaleString(locale, {
                  notation: viewport.isLessThan("tablet")
                    ? "compact"
                    : "standard",
                })
              }}
            </span>
          </strong>
          {{ item.description }}
        </figure>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import type { LanguageBarType } from '#shared/types/common/language-bar'

defineProps<{
  title: string
}>()

const viewport = useViewport()
const { tm, rt, locale } = useI18n()

const chipClaimHeight = ref(0)
const titleElements = ref<HTMLElement[]>([])
const progressSpan = ref<HTMLElement[]>([])

const rawFunFacts = computed<LanguageBarType[]>(() =>
  tm('components.containers.funFacts'),
)

const funFacts = computed<LanguageBarType[]>(() =>
  rawFunFacts.value.map(fact => ({
    ...fact,
    title: rt(fact.title),
    description: rt(fact.description ?? ''),
  })),
)

function animateNumber(index: number) {
  const span = progressSpan.value[index]
  if (!span) return

  gsap.fromTo(
    span,
    { innerHTML: '0' },
    {
      innerHTML: funFacts.value[index]?.progress.toString(),
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        span.innerHTML = Number.parseInt(span.innerHTML).toLocaleString(
          locale.value,
          { notation: viewport.isLessThan('tablet') ? 'compact' : 'standard' },
        )
      },
    },
  )
}

const updateChipClaimHeight = () => {
  nextTick(() => {
    const maxHeight = Math.max(
      ...titleElements.value.map(element => element.clientHeight),
    )
    chipClaimHeight.value = maxHeight
  })
}

onMounted(() => {
  updateChipClaimHeight()
})

useEventListener(window, 'resize', updateChipClaimHeight)
</script>

<style scoped>
.visible {
  transform: translateY(0px) !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
.chip-claims-list {
  margin-top: 3em;
  font-size: 28px;
  font-weight: 600;
}
.chip-claim {
  max-width: 13em;
  display: flex;
}
.chip-claim:before {
  margin-right: 20px;
  content: "";
  display: inline-block;
  position: relative;
  height: var(--chip-claim-height);
  width: 5px;
  background: var(--color-fill-gray);
  flex-shrink: 0;
  top: 6px;
}
.chip-claims-list {
  --stats-gap: 70px;
  color: var(--color-fill-gray);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: var(--stats-gap);
  gap: var(--stats-gap);
}
@media only screen and (max-width: 767px) {
  .chip-claims-list {
    --stats-gap: 50px;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  }
}
.typography-site-stat-caption {
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}
@media only screen and (max-width: 767px) {
  .typography-site-stat-caption {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}

[data-textanim-1] {
  pointer-events: none;
  opacity: 0;
  transform: translateY(25px);
  transition:
    transform 500ms cubic-bezier(0, 0, 0.5, 1),
    opacity 500ms cubic-bezier(0, 0, 0.5, 1),
    visibility 500ms cubic-bezier(0, 0, 0.5, 1);
}
.stat {
  --above-offset: 1.4em;
  position: relative;
}
.stat strong {
  /* font-size: 48px;
  line-height: 1.0834933333;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    sans-serif; */
  display: block;
}

.stat strong {
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}

@media only screen and (max-width: 767px) {
  .stat strong {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}
* {
  --mx-pro-blue: #2997ff;
  --mx-max-purple: #a972ff;
  --mx-teal: #43b9b9;
}
.stat strong {
  color: var(--color-fill-gray);
}
.stat {
  color: var(--color-figure-gray-secondary);
}
</style>
