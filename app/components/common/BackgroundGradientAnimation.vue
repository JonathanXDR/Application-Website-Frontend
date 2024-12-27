<template>
  <div
    :class="
      cn(
        'h-screen w-screen relative overflow-hidden top-0 left-0',
        'bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        props.containerClassName,
      )
    "
  >
    <svg class="hidden">
      <defs>
        <filter id="blurMe">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feBlend
            in="SourceGraphic"
            in2="goo"
          />
        </filter>
      </defs>
    </svg>

    <div :class="cn('', props.className)">
      <slot />
    </div>

    <div
      :class="
        cn(
          'gradients-container h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
        )
      "
    >
      <div
        class="absolute [background:radial-gradient(circle_at_center,var(--first-color)_0,var(--first-color)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-first opacity-100"
      />

      <div
        class="absolute [background:radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0,rgba(var(--second-color),0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] animate-second opacity-100"
      />

      <div
        class="absolute [background:radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0,rgba(var(--third-color),0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] animate-third opacity-100"
      />

      <div
        class="absolute [background:radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0,rgba(var(--fourth-color),0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-fourth opacity-70"
      />

      <div
        class="absolute [background:radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0,rgba(var(--fifth-color),0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100"
      />

      <div
        v-if="props.interactive"
        ref="interactiveRef"
        class="absolute [background:radial-gradient(circle_at_center,rgba(var(--pointer-color),0.8)_0,rgba(var(--pointer-color),0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70"
        @mousemove="handleMouseMove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

const props = withDefaults(
  defineProps<{
    gradientBackgroundStart?: string
    gradientBackgroundEnd?: string
    firstColor?: string
    secondColor?: string
    thirdColor?: string
    fourthColor?: string
    fifthColor?: string
    pointerColor?: string
    size?: string
    blendingValue?: string
    interactive?: boolean
    containerClassName?: string
    className?: string
  }>(),
  {
    gradientBackgroundStart: 'rgb(108, 0, 162)',
    gradientBackgroundEnd: 'rgb(0, 17, 82)',
    firstColor: '18, 113, 255',
    secondColor: '221, 74, 255',
    thirdColor: '100, 220, 255',
    fourthColor: '200, 50, 50',
    fifthColor: '180, 180, 50',
    pointerColor: '140, 100, 255',
    size: '80%',
    blendingValue: 'hard-light',
    interactive: true,
    containerClassName: '',
    className: '',
  },
)

const interactiveRef = ref<HTMLElement | null>(null)
const curX = ref(0)
const curY = ref(0)
const tgX = ref(0)
const tgY = ref(0)

const isSafari = ref(false)

const { pause, resume } = useRafFn(() => {
  if (!props.interactive || !interactiveRef.value) return
  curX.value += (tgX.value - curX.value) / 20
  curY.value += (tgY.value - curY.value) / 20
  interactiveRef.value.style.transform = `translate(${Math.round(curX.value)}px, ${Math.round(curY.value)}px)`
})

function handleMouseMove(event: MouseEvent) {
  if (!interactiveRef.value) return
  const rect = interactiveRef.value.getBoundingClientRect()
  tgX.value = event.clientX - rect.left
  tgY.value = event.clientY - rect.top
}

onMounted(() => {
  document.body.style.setProperty(
    '--gradient-background-start',
    props.gradientBackgroundStart,
  )
  document.body.style.setProperty(
    '--gradient-background-end',
    props.gradientBackgroundEnd,
  )
  document.body.style.setProperty('--first-color', props.firstColor)
  document.body.style.setProperty('--second-color', props.secondColor)
  document.body.style.setProperty('--third-color', props.thirdColor)
  document.body.style.setProperty('--fourth-color', props.fourthColor)
  document.body.style.setProperty('--fifth-color', props.fifthColor)
  document.body.style.setProperty('--pointer-color', props.pointerColor)
  document.body.style.setProperty('--size', props.size)
  document.body.style.setProperty('--blending-value', props.blendingValue)

  // eslint-disable-next-line regexp/no-unused-capturing-group
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  resume()
})

watch(
  () => props.interactive,
  (newVal) => {
    if (newVal) resume()
    else pause()
  },
)
</script>
