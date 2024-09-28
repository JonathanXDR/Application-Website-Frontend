<template>
  <h1>{{ title }}</h1>
  <ul
    role="list"
    aria-label="M2 Ultra capabilities"
    class="chip-claims-list stat"
  >
    <li
      v-for="(item, index) in funFacts"
      :key="index"
      class="chip-claim"
      role="listitem"
      tabindex="-1"
      style="visibility: visible; opacity: 1"
    >
      <div style="transform: translateY(0px); opacity: 1; pointer-events: auto">
        <figure class="stat typography-site-stat-caption highlight">
          <strong>{{ item.title }}</strong> {{ item.description }}
        </figure>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { BasicPropertiesType } from '~/types/common/basic-properties';

defineProps<{
  title: string;
}>();

const { tm } = useI18n();
const funFacts = computed<BasicPropertiesType[]>(() =>
  tm('components.containers.funFacts')
);
</script>

<style scoped>
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
  content: '';
  display: inline-block;
  position: relative;
  height: 40px;
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
.typography-site-stat-caption {
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  letter-spacing: 0.011em;
  font-family:
    SF Pro Display,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
}
@media only screen and (max-width: 734px) {
  .typography-site-stat-caption {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 600;
    letter-spacing: -0.022em;
    font-family:
      SF Pro Text,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
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
  font-size: 48px;
  line-height: 1.0834933333;
  font-weight: 600;
  letter-spacing: -0.003em;
  font-family:
    SF Pro Display,
    SF Pro Icons,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  display: block;
}
@media only screen and (max-width: 1068px) {
  .stat strong {
    font-size: 40px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: 0em;
    font-family:
      SF Pro Display,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
  }
}
@media only screen and (max-width: 734px) {
  .stat strong {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
    font-family:
      SF Pro Display,
      SF Pro Icons,
      Helvetica Neue,
      Helvetica,
      Arial,
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
