<template>
  <fieldset class="tile">
    <!-- <DropDown :options="sortOptions" /> -->
    <!-- <div class="segmentnav-container"> -->
    <ul ref="segmentNavEl" class="segmentnav">
      <div class="segmentnav-wrapper">
        <li
          v-for="(item, index) in segmentNavItems"
          :key="index"
          class="segmentnav-item"
        >
          <input
            :id="`segment-${item.id}`"
            type="radio"
            name="category"
            v-model="currentIndex"
            :value="index"
            @change="updateSegments"
          />
          <label :for="`segment-${item.id}`" class="typography-segmentnav-item">
            {{ item.label }}
          </label>
        </li>
        <div
          v-if="!loading"
          class="segmentnav-selection-background"
          :style="selectionStyle"
        ></div>
      </div>
    </ul>
    <!-- </div> -->
  </fieldset>
</template>

<script setup lang="ts">
import type { ItemType } from '~/types/common/Option'

const props = withDefaults(
  defineProps<{
    index: number
  }>(),
  {
    index: 0
  }
)
const emit = defineEmits(['change'])

const { tm } = useI18n()
const segmentNavItems: Ref<ItemType[]> = computed(() =>
  tm('components.common.SegmentNav.items')
)
const sortOptions: Ref<ItemType[]> = computed(() =>
  tm('components.common.SegmentNav.sorts')
)
const currentIndex: Ref<number> = ref(props.index)
const loading: Ref<boolean> = ref(true)
const segmentNavEl: Ref<HTMLUListElement | null> = ref(null)
const segments: Ref<Map<number, HTMLElement>> = ref(new Map())

const selectionStyle = computed(() => {
  const segment = segments.value.get(currentIndex.value)
  return (
    segment && {
      width: `${segment.offsetWidth}px`,
      transform: `translateX(${segment.offsetLeft}px)`
    }
  )
})

const updateSegments = () => {
  if (segmentNavEl.value) {
    const segmentNavItems =
      segmentNavEl.value.querySelectorAll('.segmentnav-item')
    segmentNavItems.forEach((item, index) => {
      segments.value.set(index, item as HTMLElement)
    })

    emit('change', currentIndex.value)
  }
}

onMounted(() => {
  updateSegments()
  loading.value = false
})
</script>

<style scoped>
.typography-segmentnav-item {
  font-size: 14px;
  line-height: 1.28577;
  font-weight: 600;
  /* letter-spacing: -0.016em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.segmentnav {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: var(--color-fill-tertiary);
  height: 40px;
  border-radius: 100px;
  padding: 0.176em;
}

.segmentnav-item input[type='radio'] {
  display: none;
}

.segmentnav-item input[type='radio'] ~ label {
  cursor: pointer;
}

/* .segmentnav-item:has(input[type='radio']:checked) {
  height: 100%;
  border-radius: 1.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: var(--color-code-plain);
  transition: 300ms;
  pointer-events: none;
  text-decoration: none;
  cursor: default;
  z-index: 10;
} */

.segmentnav-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 21px;
  color: var(--color-fill-gray-secondary);
  text-align: center;
  box-sizing: border-box;
  -webkit-appearance: none;
  transition: color 275ms;
  z-index: 2;
}

@media only screen and (max-width: 734px) {
  .segmentnav-item {
    padding: 0px 14px;
  }
}

.segmentnav-item:not(:first-of-type)::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1px;
  margin: auto;
  width: 3px;
  height: 3px;
  border-radius: 100px;
  background: var(--color-code-plain);
  transition: transform 350ms;
}

.segmentnav-item:has(input[type='radio']:checked) {
  color: var(--color-fill-tertiary);
  cursor: default;
}

.segmentnav-item:has(input[type='radio']:checked)::before,
.segmentnav-item:has(input[type='radio']:checked) + .segmentnav-item::before {
  transform: scale(0);
}

.segmentnav-item,
.segmentnav-selection-background {
  border-radius: 100px;
}

.segmentnav-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.segmentnav-selection-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--color-fill-gray);
  transition: 300ms;
  z-index: 1;
}

.segmentnav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
}

.segmentnav-container:before {
  height: 56px;
  display: block;
  content: '';
  width: 1px;
  background-color: var(--color-fill-gray-tertiary);
}

@media only screen and (max-width: 1068px) {
  .segmentnav-container:before {
    height: 47.5px;
  }
}

@media only screen and (max-width: 734px) {
  .segmentnav-container:before {
    height: 36px;
  }
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
}
</style>
