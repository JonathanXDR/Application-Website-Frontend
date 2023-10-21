<template>
  <fieldset class="sticky-nav tile tile-rounded sticking">
    <legend class="visuallyhidden">Data filter by job type</legend>
    <div class="form-dropdown">
      <select class="form-dropdown-select" name="year">
        <option v-for="(option, index) in options" :key="index" :value="index">
          {{ option.label }}
        </option>
      </select>
      <span class="form-dropdown-chevron">
        <Icon name="chevron.down" size="small" class="icon-dropdown" />
      </span>
    </div>
    <div class="role-selects-container">
      <ul class="role-selects">
        <li v-for="(item, index) in items" :key="index" class="role-select">
          <input :id="item.id" type="radio" name="category" :value="index" />
          <label :for="item.id" class="button">{{ item.label }}</label>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script lang="ts" src="./FilterNav.ts"></script>
<style scoped src="./FilterNav.css"></style>
