<template>
  <div class="tablist-wrapper">
    <div class="tabnav">
      <ul role="tablist" class="tabnav-items">
        <li v-for="(item, index) in items" :key="index" class="tabnav-item">
          <input :id="item.id" type="radio" name="category" :value="index" />
          <label :for="item.id" class="tabnav-link">{{ item.label }}</label>
        </li>
      </ul>
      <div class="tabnav-paddles">
        <button class="tabnav-paddle tabnav-paddle-left">
          <Icon name="chevron.left" class="tabnav-paddle-icon" />
        </button>
        <button class="tabnav-paddle tabnav-paddle-right">
          <Icon name="chevron.right" class="tabnav-paddle-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./TabList.ts"></script>
<style scoped src="./TabList.css"></style>
