<template>
  <div class="form-element form-has-value">
    <select class="form-dropdown">
      <option v-for="(option, index) in options" :key="index" :value="index">
        {{ option.label }}
      </option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="svg-icon inline-chevron-down-icon form-icon"
      viewBox="0 0 14 14"
    >
      <path
        d="m6.94042969 10.6855469c.17089843 0 .34179687-.0683594.45800781-.1982422l5.2910156-5.42089845c.116211-.11621094.1845703-.26660156.1845703-.4375 0-.35546875-.2666015-.62890625-.6220703-.62890625-.1708984 0-.328125.06835938-.4443359.17773438l-4.86718751 4.9765625-4.87402344-4.9765625c-.109375-.109375-.26660156-.17773438-.44433594-.17773438-.35546875 0-.62207031.2734375-.62207031.62890625 0 .17089844.06835938.32128906.18457031.44433594l5.29101563 5.41406251c.12988281.1298828.28710937.1982422.46484375.1982422z"
      ></path>
    </svg>
    <span v-if="label" class="form-label">{{ label }}</span>
  </div>
</template>

<script lang="ts" src="./DropDown.script.ts"></script>
<style scoped src="./DropDown.module.css"></style>
