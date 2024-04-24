<template>
  <div
    :class="[
      { 'r-fade-transition-enter-done': open },
      { 'r-fade-transition-exit-done': !open }
    ]"
    data-core-fade-transition-wrapper=""
    class="rc-overlay rc-overlay-popup rc-overlay-fixed-width"
    data-core-overlay=""
    data-core-overlay-cover=""
  >
    <div data-core-overlay-content="">
      <div class="rc-overlay-popup-outer">
        <div class="rc-overlay-popup-content">
          <div class="rc-overlay-loader-content">
            <div class="dd-modal">
              <h2
                id="b79c0e00-5c20-11ed-933b-e7a7f9dc27fe"
                class="t-headline-reduced"
              >
                {{ title }}
              </h2>
              <p class="t-body">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="rc-overlay-close" @click="toggleModal()">
        <span class="rc-overlay-closesvg"
          ><svg
            width="21"
            height="21"
            class="as-svgicon as-svgicon-close as-svgicon-tiny as-svgicon-closetiny"
          >
            <path fill="none" d="M0 0h21v21H0z" />
            <path
              d="M12.12 10l4.07-4.06a1.5 1.5 0 10-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 10-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 000 2.12 1.51 1.51 0 002.13 0L10 12.12l4.06 4.07a1.45 1.45 0 001.06.44 1.5 1.5 0 001.06-2.56z"
            /></svg
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
  }>(),
  {
    title: 'Title',
    description: 'Description'
  }
)

const open = ref(false)

const toggleModal = () => {
  open.value = !open.value
}
</script>

<style scoped>
.a11y {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

[data-core-fade-transition-wrapper] {
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
}
.r-fade-transition-enter-done {
  opacity: 1;
}
.r-fade-transition-exit-done {
  display: none;
}
[data-core-overlay] {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99999;
  position: fixed;
  overflow: auto;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  padding: 54px 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
}
[data-core-overlay][data-core-fade-transition-wrapper] {
  transition-duration: 0.1s;
}
[data-core-overlay].r-fade-transition-exit-done {
  display: none;
}
[data-core-overlay-content] {
  margin: auto;
  padding: 30px;
  position: relative;
  background: var(--color-fill);
}
[data-core-overlay-cover] {
  background-color: rgba(50, 50, 50, 0.88);
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  -webkit-tap-highlight-color: transparent;
}
.rc-overlay-close {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  position: absolute;
  top: 56px;
  left: 16px;
  cursor: pointer;
}
.rc-overlay-close .rc-overlay-closesvg {
  background: var(--color-fill-gray-quaternary);
  border-radius: 50%;
  color: var(--color-fill-gray-secondary);
  display: flex;
  align-items: center;
  height: 36px;
  width: 36px;
  outline: none;
  position: relative;
}
.rc-overlay-close .rc-overlay-closesvg svg {
  fill: currentColor;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 20px;
  width: 20px;
}
.rc-overlay-popup[data-core-overlay] {
  padding: 0;
  margin: 0;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup[data-core-overlay] {
    padding: 0 20px;
  }
}
.rc-overlay-popup [data-core-overlay-content] {
  padding: 0;
  max-width: 816px;
  background: transparent;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup [data-core-overlay-content] {
    padding: 0;
    max-width: 640px;
    border: none;
  }
  .rc-overlay-popup [data-core-overlay-content]:focus {
    outline-offset: -4px;
  }
}
.rc-overlay-popup-outer {
  background: var(--color-fill);
  border-radius: 18px;
  margin: 40px 0;
  overflow: hidden;
}
.rc-overlay-popup-content {
  padding: 76px;
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-popup-content {
    padding: 76px 6.25% 60px;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width[data-core-overlay] {
    padding: 0;
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width .rc-overlay-popup-outer {
    margin-top: 20px;
    margin-bottom: 0;
    border-radius: 18px 18px 0 0;
    min-height: calc(100vh - 20px);
  }
}
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width .rc-overlay-close {
    top: 36px;
    left: 14px;
  }
}
/* .rc-overlay-fixed-width [data-core-overlay-content] {
  flex-grow: 1;
  min-width: 48rem;
} */
@media only screen and (max-width: 1023px) and (max-device-width: 736px) {
  .rc-overlay-fixed-width [data-core-overlay-content] {
    margin: 0 auto;
    min-width: inherit;
    min-height: 100vh;
    width: 100%;
  }
}

.t-headline-reduced {
  font-size: 40px !important;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: 0;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
}
@media only screen and (max-width: 734px) {
  .t-headline-reduced {
    font-size: 28px;
    line-height: 1.14286;
    font-weight: 600;
    letter-spacing: 0.007em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
  }
}
.t-label {
  font-size: 24px !important;
  line-height: 1.16667;
  font-weight: 600;
  letter-spacing: 0.009em;
  font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
}
.t-headline-reduced + .t-body,
.t-headline-reduced + p {
  margin-top: 1em;
}
.dd-modal p + .t-label {
  margin-top: 1em;
}

/* ------------------------------- Validation ------------------------------- */

.large-6 {
  flex-basis: 50%;
  max-width: 50%;
}
@media only screen and (max-width: 1068px) {
  .medium-6 {
    flex-basis: 50%;
    max-width: 50%;
  }
}
@media only screen and (max-width: 734px) {
  .small-12 {
    flex-basis: 100%;
    max-width: 100%;
  }
}

.form-message-wrapper {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  color: #e30000;
  position: relative;
  margin-top: 0.47059rem;
  margin-bottom: 0.70588rem;
  display: none;
}
.is-error .form-message-wrapper {
  display: flex;
}
.form-message-wrapper {
  color: var(--color-figure-red);
}
.case-lookup-container .case-lookup-form {
  margin-top: 40px;
}
@media only screen and (max-width: 1068px) {
  .case-lookup-container .case-lookup-form {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 734px) {
  .case-lookup-container .case-lookup-form {
    margin-top: 23px;
  }
}
.case-lookup-container .case-lookup-form .case-lookup-submit {
  margin-top: 40px;
}
@media only screen and (max-width: 1068px) {
  .case-lookup-container .case-lookup-form .case-lookup-submit {
    margin-top: 30px;
  }
}
@media only screen and (max-width: 734px) {
  .case-lookup-container .case-lookup-form .case-lookup-submit {
    margin-top: 23px;
  }
}
.form-message-wrapper {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  color: #e30000;
  position: relative;
  margin-top: 0.47059rem;
  margin-bottom: 0.70588rem;
  display: none;
}

.form-message-icon {
  height: 1.6em;
  width: 1.6em;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
.is-error .form-message-wrapper {
  display: flex;
}
.form-textbox {
  position: relative;
}
.form-textbox .form-textbox-input {
  color: var(--color-fill-gray);
  border-color: var(--color-fill-gray-tertiary);
  background-color: var(--color-form-textbox-input);
  text-overflow: ellipsis;
}
.form-textbox.is-error .form-textbox-input:not(:focus) {
  border-color: var(--color-figure-red);
}
.form-textbox .form-textbox-input:disabled {
  color: var(--color-fill-gray-secondary);
  -webkit-text-fill-color: var(--color-fill-gray-secondary);
  background-color: var(--color-form-textbox-input-disabled);
}
.form-textbox .form-textbox-input:focus {
  border-color: #0071e3;
}
.form-textbox .form-textbox-input::-webkit-input-placeholder {
  color: var(--color-figure-gray-secondary);
}
.form-textbox .form-textbox-input::placeholder {
  color: var(--color-figure-gray-secondary);
}
.form-textbox .form-textbox-label {
  color: var(--color-fill-gray-secondary);
}
.form-textbox.is-error .form-textbox-label {
  color: var(--color-figure-red);
}
.form-textbox-input {
  font-size: 17px;
  line-height: 1.23536;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  width: 100%;
  height: 3.29412rem;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  margin-bottom: 0.82353rem;
  padding: 1.05882rem 0.94118rem 0 0.94118rem;
  text-align: left;
  -webkit-appearance: none;
  appearance: none;
}
.form-textbox-input:focus ~ .form-textbox-label,
.form-textbox-input.form-textbox-entered ~ .form-textbox-label {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  top: 0.58824rem;
}
.form-textbox-input:focus {
  box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
  outline: none;
}
.is-error .form-textbox-input {
  margin-bottom: 0;
}
.form-textbox-label {
  position: absolute;
  pointer-events: none;
  transition-timing-function: ease-in;
  transition-duration: 0.125s;
  top: 1.05882rem;
  white-space: nowrap;
  overflow: hidden;
  max-width: calc(100% - 32px);
  left: 1rem;
  font-size: 17px;
  line-height: 1.23536;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
}
.form-message-wrapper {
  color: var(--color-figure-red);
}
form .form-error-inline-message {
  display: block;
  align-items: center;
}
</style>
