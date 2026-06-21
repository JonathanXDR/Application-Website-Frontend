<script setup lang="ts">
import type { ColorType } from '#shared/types/schemas'

defineProps<{
  color: ColorType
}>()
</script>

<template>
  <small
    :style="{ color: color.primary }"
    class="dev-badge"
    data-tag-name="Dev"
  />
</template>

<style scoped>
.dev-badge {
  font-size: 18px;
  font-weight: 600;
  padding-left: 10px;
  /* The badge sits in a flex row (`.ac-ln-title`, align-items: center) next to a
     fixed-height SVG logo. Centering the text's *line box* leaves the glyphs
     ~0.25px low because of the font's asymmetric leading. Trimming the line box
     down to the cap height + alphabetic baseline makes the visible glyphs the
     thing that gets centered, so "Dev" lines up exactly with the logo.
     Supported in Chrome 133+/Safari 18.2+. */
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
  -webkit-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -o-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  -moz-transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
}
/* Engines without text-box-trim (e.g. Firefox/Gecko) fall back to line-box
   centering; nudge the glyphs up by the leading offset to match. */
@supports not (text-box-trim: trim-both) {
  .dev-badge {
    transform: translateY(-0.26px);
  }
}
.dev-badge:before {
  content: attr(data-tag-name);
}
</style>
