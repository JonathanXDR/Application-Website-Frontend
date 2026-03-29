<script setup lang="ts">
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

const interactiveCircle = useTemplateRef('interactiveCircle')
const isSafari = ref(false)
const curX = ref(0)
const curY = ref(0)
const tgX = ref(0)
const tgY = ref(0)

const cssVars = computed(() => ({
  '--gradient-background-start': props.gradientBackgroundStart,
  '--gradient-background-end': props.gradientBackgroundEnd,
  '--first-color': props.firstColor,
  '--second-color': props.secondColor,
  '--third-color': props.thirdColor,
  '--fourth-color': props.fourthColor,
  '--fifth-color': props.fifthColor,
  '--pointer-color': props.pointerColor,
  '--size': props.size,
  '--blending-value': props.blendingValue,
}))

const handleMouseMove = (event: MouseEvent) => {
  if (!interactiveCircle.value) return

  const rect = interactiveCircle.value.getBoundingClientRect()
  tgX.value = event.clientX - rect.left
  tgY.value = event.clientY - rect.top
}

useRafFn(() => {
  if (!interactiveCircle.value || !props.interactive) return

  curX.value += (tgX.value - curX.value) / 20
  curY.value += (tgY.value - curY.value) / 20

  interactiveCircle.value.style.transform = `translate(${Math.round(curX.value)}px, ${Math.round(curY.value)}px)`
})

onMounted(() => {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  isSafari.value = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
})
</script>

<template>
  <div
    :style="cssVars"
    class="h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]"
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

    <div :class="className">
      <slot />
    </div>

    <div
      :class="[
        'gradients-container h-full w-full blur-lg',
        isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
      ]"
    >
      <div
        class="absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] opacity-100 animation-first"
      />
      <div
        class="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] opacity-100 animation-second"
      />
      <div
        class="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] opacity-100 animation-third"
      />
      <div
        class="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] opacity-70 animation-fourth"
      />
      <div
        class="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] opacity-100 animation-fifth"
      />
      <div
        v-if="interactive"
        ref="interactiveCircle"
        class="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70"
        @mousemove="handleMouseMove"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animation-first {
  animation: moveVertical 30s ease infinite;
}

.animation-second {
  animation: moveInCircle 20s reverse infinite;
}

.animation-third {
  animation: moveInCircle 40s linear infinite;
}

.animation-fourth {
  animation: moveHorizontal 40s ease infinite;
}

.animation-fifth {
  animation: moveInCircle 20s ease infinite;
}
</style>
