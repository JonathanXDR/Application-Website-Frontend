<template>
  <div class="tablist-wrapper">
    <div class="tabnav">
      <ul role="tablist" class="tabnav-items">
        <li role="presentation" class="tabnav-item current">
          <input id="productivity" type="radio" name="category" checked />
          <label for="productivity" class="tabnav-link current">Productivity</label>
        </li>
        <li role="presentation" class="tabnav-item">
          <input id="gaming" type="radio" name="category" />
          <label for="gaming" class="tabnav-link">Gaming</label>
        </li>
        <li role="presentation" class="tabnav-item">
          <input id="production" type="radio" name="category" />
          <label for="production" class="tabnav-link">Audio and video production</label>
        </li>
        <li role="presentation" class="tabnav-item">
          <input id="development" type="radio" name="category" />
          <label for="development" class="tabnav-link">Software development</label>
        </li>
      </ul>
      <div class="tabnav-paddles">
        <button class="tabnav-paddle tabnav-paddle-left" aria-hidden="true" disabled></button>
        <button class="tabnav-paddle tabnav-paddle-right" aria-hidden="true" disabled></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./TabList.ts"></script>
<style scoped src="./TabList.css"></style>
