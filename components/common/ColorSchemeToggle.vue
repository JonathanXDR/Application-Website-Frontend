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
  </div>
</template>

<script lang="ts">

</script>

<style scoped>
.color-scheme-toggle {
  border: 1px solid var(--toggle-color-text);
}

.color-scheme-toggle .text {
  color: var(--toggle-color-text);
}

.color-scheme-toggle input:checked+.text {
  color: var(--color-button-text);
  background: var(--color-button-background);
  border-color: var(--color-button-background);
}

.dmf input {
  color: -internal-light-dark(white, black);
}



/*! CSS Used from: https://developer.apple.com/assets/styles/footer.dist.css?23182355271 */
.content {
  --toggle-border-radius-outer: 12px;
  --toggle-border-radius-inner: 10px;
  --toggle-color-fill: var(--color-button-background-active);
  --toggle-color-text: var(--color-fill-blue);
  flex-shrink: 0;
}

.content .color-scheme-toggle {
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
  [data-color-scheme="dark"] .content .color-scheme-toggle {
    --toggle-color-text: var(--color-figure-blue);
  }
}

.content [role="radiogroup"]:focus {
  outline: none;
}

.content input[type="radio"] {
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

.content .text {
  box-sizing: border-box;
  display: inline-block;
  padding: 1px 6px;
  min-width: 42px;
  border: 1px solid transparent;
  border-radius: var(--toggle-border-radius-inner, 2px);
  text-align: center;
  color: var(--toggle-color-text);
}

.content .text:hover {
  cursor: pointer;
}

.content input[type="radio"]:checked+.text {
  --toggle-color-text: var(--color-button-text);
  background: var(--toggle-color-fill);
  border-color: var(--toggle-color-fill);
}
</style>
