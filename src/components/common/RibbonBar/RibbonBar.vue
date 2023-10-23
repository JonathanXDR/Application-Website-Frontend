<template>
  <div class="ribbon" v-if="tags.latest?.length && tags.previous?.length">
    <div class="ribbon-drop-wrapper">
      <div
        ref="ribbon-content-wrapper"
        class="ribbon-content-wrapper ribbon-content-wrapper-animation"
      >
        <div ref="ribbon-content" class="ribbon-content row ribbon-content-animation">
          <p>
            {{
              $t('components.common.RibbonBar.description', {
                latestTag: tags.latest,
                previousTag: tags.previous
              })
            }}&ensp;

            <LinkCollection
              ref="ribbon-link"
              :links="links"
              class="ribbon-link ribbon-link-animation icon-after-ribbon"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./RibbonBar.ts"></script>
<style scoped src="./RibbonBar.css"></style>
