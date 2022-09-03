<template>
  <footer id="copyright">
    <p>© <span id="current-year"></span> Jonathan Russ. All rights reserved.</p>
    <ul class="sharesheet-options">
      <li
        v-for="link in data.links"
        :key="link.url"
        class="social-link"
        data-inviewport="sharesheet-options"
      >
        <a :href="link.url" :title="link.title" target="_blank">
          {{ link.label || null }}
          <component v-if="link.icon" :is="link.icon" />
        </a>
      </li>

      <li data-inviewport="sharesheet-options">
        <a href="mailto:jonathan.russ@bluewin.ch" target="_blank"
          ><font-awesome-icon icon="fa-solid fa-envelope"
        /></a>
      </li>

      <li data-inviewport="sharesheet-options">
        <a
          href="https://www.linkedin.com/in/jonathan-russ-b7442a228"
          target="_blank"
          ><font-awesome-icon icon="fa-brands fa-linkedin"
        /></a>
      </li>

      <li data-inviewport="sharesheet-options">
        <a href="https://github.com/JonathanXDR" target="_blank"
          ><font-awesome-icon icon="fa-brands fa-github"
        /></a>
      </li>

      <li data-inviewport="sharesheet-options">
        <a href="https://twitter.com/JonathanXD12_" target="_blank"
          ><font-awesome-icon icon="fa-brands fa-twitter"
        /></a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts" src="./FooterSection.ts"></script>
<style src="./FooterSection.css"></style>
