<script setup lang="ts">
const props = defineProps<{
  items: ItemType[]
  activeTabId: string
}>()

const emit = defineEmits(['change'])
const selectedTab = ref(props.activeTabId)

watch(
  () => props.activeTabId,
  (valueNew) => {
    selectedTab.value = valueNew
  },
)

const emitChange = (id: string) => {
  emit('change', id)
}
</script>

<template>
  <div class="tablist-wrapper">
    <div class="tabnav">
      <ul class="tabnav-items">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="tabnav-item"
        >
          <input
            :id="`tab-${item.id}`"
            v-model="selectedTab"
            type="radio"
            name="category"
            :value="item.id"
            @change="() => emitChange(item.id)"
          >
          <label
            :for="`tab-${item.id}`"
            class="tabnav-link"
          >
            {{ item.label }}
          </label>
        </li>
      </ul>
      <div class="tabnav-paddles">
        <button
          class="tabnav-paddle tabnav-paddle-left"
          disabled
        >
          <Icon
            name="chevron.left"
            class="icon icon-sm"
          />
        </button>
        <button
          class="tabnav-paddle tabnav-paddle-right"
          disabled
        >
          <Icon
            name="sf-symbols:chevron.right"
            class="icon icon-sm"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabnav {
  --scroll-container-safearea-offset: -10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 3.1764705882em;
  font-size: 17px;
  text-align: center;
  z-index: 1;
}

.tabnav {
  height: 3.4em;
  width: auto;
  margin-bottom: 18px;
  text-align: center;
}

.tabnav-paddle {
  font-size: 17px;
  font-weight: 300;
  border: 0 solid var(--color-fill-gray-tertiary);
  border-radius: 0;
  color: var(--color-fill-gray);
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
  width: calc(34px - 1px);
  transition: opacity 150ms ease-out;
}

.tabnav-paddle:disabled {
  opacity: 0;
}

.tabnav-paddle:hover:after {
  opacity: 1;
}

.tabnav-paddle:active {
  outline: none;
}

.tabnav-paddle:active:after {
  outline: none;
  opacity: 1;
}

.tabnav-paddle-left {
  border-right-width: 1px;
  left: 0;
}

.tabnav-paddle-left .icon {
  margin-left: -0.5px;
}

.tabnav-paddle-right {
  border-left-width: 1px;
  right: 0;
}

.tabnav-paddle-right .icon {
  margin-right: -0.5px;
}

.icon {
  opacity: 0.8;
  transition: opacity 200ms linear;
}

.tabnav-items {
  margin: 0 34px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  padding: 0 0 3.1764705882em;
}

.tabnav-items {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabnav-item {
  display: inline-block;
  padding-left: 60px;
  border-bottom: 1px solid var(--color-fill-gray-tertiary);
  list-style: none;
  outline: none;
}

#music .tabnav-item {
  padding-left: 40px !important;
  border-bottom-width: 1px !important;
}

#music .tabnav-item:first-child {
  padding-left: 0 !important;
}

.tabnav-item {
  display: block;
  border-bottom-width: 2px;
  border-bottom-color: var(--color-figure-gray-secondary);
}

.tabnav-item > input[type="radio"] {
  display: none;
}

.tabnav-item > input[type="radio"]:checked ~ label.tabnav-link {
  color: var(--color-fill-gray);
  pointer-events: none;
  text-decoration: none;
  cursor: default;
  z-index: 10;
}

#music .tabnav-item > input[type="radio"]:checked ~ label.tabnav-link {
  color: #e85f82 !important;
}

.tabnav-item > input[type="radio"]:checked ~ label.tabnav-link:after {
  border-bottom-color: var(--color-fill-gray);
}

#music .tabnav-item > input[type="radio"]:checked ~ label.tabnav-link:after {
  border-bottom-width: 2px !important;
  border-bottom-color: #e85f82 !important;
}

@media only screen and (max-width: 1023px) {
  .tabnav-item {
    padding-left: 50px;
  }
}

@media only screen and (max-width: 767px) {
  .tabnav-item {
    padding-left: 30px;
  }
}

.tabnav-item:first-child {
  padding-left: 0;
}

.tabnav-link {
  cursor: pointer;
  font-size: 17px;
  font-weight: 400;
  padding: 9px 0 11px;
  margin-top: 2px;
  margin-bottom: 4px;
  text-align: left;
  text-decoration: none;
  display: block;
  position: relative;
  z-index: 0;
}

.tabnav-link {
  font-size: 21px;
  font-weight: 600;
  color: var(--color-figure-gray-secondary);
}

.tabnav-link:after {
  border-bottom-width: 2px;
  bottom: -6px;
}

.tabnav-link:hover {
  color: var(--color-figure-gray-secondary-alt);
  text-decoration: none;
}

.tabnav-link:after {
  left: 0;
  position: absolute;
  bottom: -5px;
  width: 100%;
  border-bottom: 1px solid transparent;
  content: "";
}

@media only screen and (max-width: 1023px) {
  .tabnav-link {
    font-size: 19px;
    font-weight: 600;
  }
}

@media only screen and (max-width: 767px) {
  .tabnav-link {
    font-size: 17px;
    font-weight: 600;
  }
}

.tablist-wrapper {
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  max-width: 100%; */
}

.tablist-wrapper {
  top: 1112px;
}

@media only screen and (max-width: 1023px) {
  .tablist-wrapper {
    top: 874px;
  }
}

@media only screen and (max-width: 767px) {
  .section-versatility-gallery .gallery .tablist-wrapper {
    top: 518px;
  }
}
</style>
