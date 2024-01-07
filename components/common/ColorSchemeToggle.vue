<template>
  <div class="content">
    <div class="color-scheme-toggle" role="radiogroup" tabindex="0" aria-label="Select a color scheme preference">
      <label>
        <input type="radio" value="light" autocomplete="off"
          onchange="window.setPreferredColorScheme(event.target.value)" />

        <div class="text">Light</div>
      </label>

      <label>
        <input type="radio" value="dark" autocomplete="off"
          onchange="window.setPreferredColorScheme(event.target.value)" />

        <div class="text">Dark</div>
      </label>

      <label>
        <input type="radio" value="auto" autocomplete="off"
          onchange="window.setPreferredColorScheme(event.target.value)" />

        <div class="text">Auto</div>
      </label>
    </div>
    <script async="" src="/assets/scripts/color-scheme-toggle.js"></script>
  </div>
</template>

<script lang="ts">

</script>

<style scoped>
html body .color-scheme-toggle {
  border: 1px solid var(--toggle-color-text);
}

html body .color-scheme-toggle .text {
  color: var(--toggle-color-text);
}

html body .color-scheme-toggle input:checked+.text {
  color: var(--color-button-text);
  background: var(--color-button-background);
  border-color: var(--color-button-background);
}

html body.dmf input {
  color: -internal-light-dark(white, black);
}

/*! CSS Used from: https://developer.apple.com/assets/styles/globalnav.css?23182355271 */
input {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga", "kern";
}

/*! CSS Used from: https://developer.apple.com/assets/styles/footer.dist.css?23182355271 */
.footer-mini-news .content {
  --toggle-border-radius-outer: 12px;
  --toggle-border-radius-inner: 10px;
  --toggle-color-fill: var(--color-button-background-active);
  --toggle-color-text: var(--color-fill-blue);
  flex-shrink: 0;
}

.footer-mini-news .content .color-scheme-toggle {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -.01em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  border: 1px solid var(--toggle-color-fill);
  border-radius: var(--toggle-border-radius-outer, 2px);
  display: inline-flex;
  padding: 1px;
}

@media screen {
  [data-color-scheme="dark"] .footer-mini-news .content .color-scheme-toggle {
    --toggle-color-text: var(--color-figure-blue);
  }
}

.footer-mini-news .content [role="radiogroup"]:focus {
  outline: none;
}

.footer-mini-news .content input[type="radio"] {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
  appearance: none;
}

.footer-mini-news .content .text {
  box-sizing: border-box;
  display: inline-block;
  padding: 1px 6px;
  min-width: 42px;
  border: 1px solid transparent;
  border-radius: var(--toggle-border-radius-inner, 2px);
  text-align: center;
  color: var(--toggle-color-text);
}

.footer-mini-news .content .text:hover {
  cursor: pointer;
}

.footer-mini-news .content input[type="radio"]:checked+.text {
  --toggle-color-text: var(--color-button-text);
  background: var(--toggle-color-fill);
  border-color: var(--toggle-color-fill);
}
</style>
