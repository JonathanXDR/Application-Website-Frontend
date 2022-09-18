<template>
  <div class="ribbon ribbon-blue-to-default">
    <div class="ribbon-drop-wrapper">
      <div
        id="ribbon-content-wrapper"
        class="ribbon-content-wrapper ribbon-content-wrapper-animation"
      >
        <div
          id="ribbon-content"
          class="ribbon-content row ribbon-content-animation"
        >
          <p>
            {{ data.ribbon.description }}&ensp;
            <a
              v-for="(link, index) in data.ribbon.links"
              :key="index"
              :href="link"
              id="ribbon-link"
              class="link icon-wrapper icon-wrapper ribbon-link ribbon-link-animation"
              target="_blank"
              >{{ link.title }}
              <component
                v-if="link.icon"
                :is="link.icon"
                class="icon-after-ribbon"
              />
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./RibbonBar.ts"></script>
<style src="./RibbonBar.css"></style>
