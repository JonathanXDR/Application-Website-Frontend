<script setup lang="ts">
import type { SectionType } from '~~/shared/types/common/section'

const { tm } = useI18n()
const items = computed<SectionType[]>(() =>
  tm('components.common.FooterDirectory'),
)
</script>

<template>
  <footer
    id="footer"
    class="footer theme-dark"
    role="contentinfo"
    aria-labelledby="footer-label"
  >
    <div class="footer-content">
      <h2
        id="footer-label"
        class="footer-label"
      >
        Developer Footer
      </h2>
      <FooterBreadcrumbs label="Jonathan Russ" />
      <FooterDirectory :items="items" />
      <FooterMini
        :legal-links="[
          {
            title: 'Terms of Use',
            url: '/terms/',
          },
          {
            title: 'Privacy Policy',
            url: '/privacy/',
          },
          {
            title: 'Agreements and Guidelines',
            url: '/agreements/',
          },
        ]"
        :news="{
          title: 'Get the',
          link: {
            title: 'Apple Developer app',
            url: 'https://apps.apple.com/us/app/apple-developer/id640199958',
          },
        }"
        :color-scheme-toggle="true"
        :language-dropdown="true"
      />
    </div>
  </footer>
</template>

<style>
h1 + *,
h2 + *,
h3 + *,
h4 + *,
h5 + *,
h6 + * {
  margin-top: 0.8em;
}

.footer {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  background-color: var(--color-fill-tertiary);
  color: var(--color-fill-gray);
  min-width: 1024px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

@media only screen and (max-width: 1044px) {
  .footer {
    min-width: 320px;
  }
}

.footer h1,
.footer h2,
.footer h3,
.footer h4,
.footer h5,
.footer h6 {
  color: inherit;
}

.footer a {
  color: var(--color-figure-gray-secondary-alt);
  text-decoration: none;
}

.footer a:hover {
  color: var(--color-fill-gray);
  text-decoration: underline;
}

.footer-content {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

@media screen and (min-width: 768px) {
  .footer-content {
    width: 82.5%;
  }
}

.footer-label {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.footer-sosumi {
  border-bottom: 1px solid var(--color-fill-gray-tertiary);
  color: var(--color-fill-gray-secondary);
  padding: 17px 0 11px;
}

.footer-sosumi ol {
  list-style-position: outside;
  margin: 0;
  padding: 0 17px;
}

.footer-sosumi ol li {
  list-style-type: decimal;
}

.footer-sosumi ul {
  list-style: none;
  margin: 0;
}

.footer-sosumi li {
  padding-bottom: 0.8em;
}

.footer-sosumi p,
.footer-sosumi li {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
}

.footer-sosumi small {
  font-size: 1em;
}

.footer-breadcrumbs {
  display: flex;
  align-items: center;
  padding: 17px 0;
  position: relative;
  z-index: 1;
  color: var(--color-breadcrumbs);
}

.footer-breadcrumbs::before,
.footer-breadcrumbs::after {
  content: " ";
  display: table;
}

.footer-breadcrumbs::after {
  clear: both;
}

@media only screen and (max-width: 767px) {
  .footer-breadcrumbs {
    border-bottom: 1px solid var(--color-fill-gray-tertiary);
  }
}

.footer-breadcrumbs-home {
  /* left: 0; */
  /* position: absolute; */
  z-index: 2;
  /* top: 17px; */
}

.footer-breadcrumbs-home-icon {
  width: 14px;
  height: 72px;
  background-size: 14px 72px;
  background-repeat: no-repeat;
  height: 18px;
  display: block;
  position: relative;
  z-index: 2;
  color: transparent;
  background-position-y: -36px;
}

.theme-dark .footer .footer-breadcrumbs-home-icon,
.footer.theme-dark .footer-breadcrumbs-home-icon {
  background-repeat: no-repeat;
}

.footer-breadcrumbs-home:hover {
  text-decoration: none;
}

.footer-breadcrumbs-home:hover .footer-breadcrumbs-home-icon {
  background-position-y: 100%;
}

.footer-breadcrumbs-home-label {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.footer-breadcrumbs-path {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  position: relative;
  z-index: 1;
}

.footer-breadcrumbs-path::before,
.footer-breadcrumbs-path::after {
  content: " ";
  display: table;
}

.footer-breadcrumbs-path::after {
  clear: both;
}

.footer-breadcrumbs-list {
  max-height: 9999px;
  /* padding-left: 25px; */
  padding-left: 11px;
  direction: ltr;
  list-style: none;
}

.footer-breadcrumbs-item {
  margin-right: 7px;
  float: left;
  padding: 3px 4px 3px 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer-breadcrumbs-item:before {
  width: 8px;
  height: 36px;
  background-size: 8px 36px;
  background-repeat: no-repeat;
  margin-right: 11px;
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  height: 18px;
  background-position-y: 100%;
}

.theme-dark .footer .footer-breadcrumbs-item:before,
.footer.theme-dark .footer-breadcrumbs-item:before {
  background-repeat: no-repeat;
}

html[dir="rtl"] .footer-breadcrumbs-item:before {
  transform: scaleX(-1);
}

.footer-directory {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  display: flex;
  flex-wrap: nowrap;
  padding-top: 20px;
}

.footer-directory:last-child {
  padding-bottom: 28px;
}

@media only screen and (max-width: 767px) {
  .footer-directory {
    flex-direction: column;
  }
}

.footer-directory-column {
  flex-basis: 25%;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column {
    flex-basis: auto;
  }
}

.footer-directory-column-section {
  pointer-events: none;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section {
    position: relative;
    z-index: 1;
    border-bottom: 1px solid var(--color-fill-gray-tertiary);
    overflow: hidden;
    pointer-events: auto;
  }
}

.footer-directory-column-section ~ .footer-directory-column-section {
  padding-top: 24px;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section ~ .footer-directory-column-section {
    padding-top: 0;
  }
}

.footer-directory-column-section-title {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  font-weight: 600;
  margin-right: 20px;
  margin-bottom: 0.8em;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-title {
    font-weight: 400;
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    background: var(--color-fill-tertiary);
    color: var(--color-fill-gray);
    cursor: pointer;
    position: relative;
    user-select: none;
    z-index: 2;
  }

  .footer-directory-column-section-title:hover {
    color: var(--color-code-plain);
  }

  .footer-directory-column-section-title:after {
    content: "+";
    float: right;
    font-size: 14px;
    font-weight: normal;
    margin-top: -2px;
    margin-right: 8px;
    transition: transform 0.3s ease;
  }
}

.footer-directory-column-section-list {
  margin-right: 20px;
  list-style: none;
  padding: 0;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-list {
    margin: 0;
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 16px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    visibility: hidden;
    z-index: -1;
    transform: translateY(-100px);
  }
}

.footer-directory-column-section-item {
  display: block;
  pointer-events: auto;
  margin-bottom: 0.8em;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-item {
    margin-bottom: 0;
  }
}

.footer-directory-column-section-item:last-child {
  margin-bottom: 0;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-link {
    padding: 6px 14px;
    display: block;
  }

  .footer-directory-column-section-link:focus {
    outline-offset: -6px;
  }
}

.footer-directory-column-section-anchor {
  right: 0;
  cursor: default;
  display: none;
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
  z-index: 10;
}

.footer-directory-column-section-anchor:focus {
  outline-offset: -6px;
  width: 25px;
  height: 38px;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-anchor {
    display: block;
  }
}

.footer-directory-column-section-anchor-close {
  display: none;
}

.footer-directory-column-section-anchor-label {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.footer-directory-column-section-state {
  display: none;
}

@media only screen and (max-width: 767px) {
  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title,
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title {
    color: var(--color-code-plain);
  }

  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title:after,
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title:after {
    transform: rotate(45deg) scale(1.08);
  }

  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-list,
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-list {
    position: static;
    visibility: visible;
    z-index: 1;
    transform: none;
    transition: transform 300ms ease;
  }

  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-open,
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-open {
    display: none;
  }

  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-close,
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-close {
    display: block;
  }
}

.footer-breadcrumbs + .footer-directory {
  padding-top: 0;
}

@media only screen and (max-width: 767px) {
  .footer-breadcrumbs + .footer-directory {
    padding-top: 0;
  }
}

.footer-mini {
  border-top: 1px solid var(--color-fill-gray-tertiary);
  color: var(--color-fill-gray-secondary);
  padding: 17px 0 21px;
  padding-bottom: calc(21px + constant(safe-area-inset-bottom));
}

@supports (padding: calc(max(0px))) {
  .footer-mini {
    padding-bottom: calc(max(21px, env(safe-area-inset-bottom)));
  }
}

.footer-mini:nth-child(2) {
  border-top: none;
}

@media only screen and (max-width: 767px) {
  .footer-mini {
    padding-bottom: 19px;
    padding-bottom: calc(19px + constant(safe-area-inset-bottom));
  }

  @supports (padding: calc(max(0px))) {
    .footer-mini {
      padding-bottom: calc(max(19px, env(safe-area-inset-bottom)));
    }
  }
}

.footer-mini-shop,
.footer-mini-news {
  border-color: var(--color-fill-gray-tertiary);
  max-height: 9999px;
  padding-bottom: 3px;
}

@media only screen and (max-width: 767px) {
  .footer-mini-shop,
  .footer-mini-news {
    padding-bottom: 10px;
  }
}

.footer-mini-shop a,
.footer-mini-news a {
  color: var(--color-figure-blue);
}

.footer-mini-locale {
  float: right;
  margin-top: 5px;
  position: relative;
  top: -3px;
  z-index: 2;
  white-space: nowrap;
}

@media only screen and (max-width: 767px) {
  .footer-mini-locale {
    left: -1px;
    padding-top: 5px;
    float: none;
  }
}

.footer-mini-locale-link {
  border-left: 1px solid var(--color-fill-gray-tertiary);
  margin-left: 7px;
  padding-left: 11px;
  display: inline;
}

.footer-mini-locale-link:first-child {
  border-left: none;
  margin-left: 0;
  padding-left: 0;
}

.footer-mini-locale-flag {
  background-repeat: no-repeat;
  background-size: 16px 16px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url();
  padding-right: 5px;
  background-position: left center;
  cursor: pointer;
  float: left;
  margin-top: -1px;
}

@media only screen and (min-resolution: 1.5dppx), (min-resolution: 144dpi) {
  .footer-mini-locale-flag {
    background-image: url();
  }
}

.footer-mini-legal {
  position: relative;
  top: -3px;
  z-index: 1;
}

.footer-mini-legal::before,
.footer-mini-legal::after {
  content: " ";
  display: table;
}

.footer-mini-legal::after {
  clear: both;
}

@media only screen and (max-width: 767px) {
  .footer-mini-legal {
    padding-top: 12px;
  }
}

.footer-mini-legal-copyright,
.footer-mini-legal-links {
  margin-right: 30px;
  float: left;
  margin-top: 5px;
}

@media only screen and (max-width: 767px) {
  .footer-mini-legal-copyright,
  .footer-mini-legal-links {
    margin-right: 0;
    float: none;
  }
}

.footer-mini-legal-copyright {
  max-height: 9999px;
}

.footer-mini-legal-links {
  position: relative;
  top: -5px;
  z-index: 1;
}

.footer-mini-legal-link {
  border-right: 1px solid var(--color-fill-gray-tertiary);
  margin-right: 7px;
  padding-right: 10px;
  display: inline-block;
  margin-top: 5px;
  white-space: nowrap;
}

.footer-mini-legal-link:last-child {
  border: none;
  margin: 0;
  padding: 0;
}

.footer-sosumi + .footer-mini {
  border-top: none;
}

@media only screen and (max-width: 767px) {
  .footer-breadcrumbs + .footer-mini {
    border-top: none;
  }
}

.footer-directory + .footer-mini {
  padding-top: 34px;
  border-top: none;
}

@media only screen and (max-width: 767px) {
  .footer-directory + .footer-mini {
    padding-top: 17px;
  }
}

.footer-directory + .footer-mini .footer-mini-shop,
.footer-directory + .footer-mini .footer-mini-news {
  margin-bottom: 7px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-fill-gray-tertiary);
}

@media only screen and (max-width: 767px) {
  .footer-directory + .footer-mini .footer-mini-shop,
  .footer-directory + .footer-mini .footer-mini-news {
    border-bottom: none;
  }
}

.footer {
  box-sizing: content-box;
}

.footer .footer-content .footer-sosumi:empty {
  display: none;
}

.footer .footer-directory {
  padding-top: 5px;
}

#overview .footer-directory {
  padding-top: 20px;
}

nav.footer-directory {
  flex: 1;
}

.footer-directory-column-section-title a {
  pointer-events: auto;
  color: var(--color-fill-gray);
}

body[data-supports-auto-color-scheme="false"]
  label[data-color-scheme-option="auto"] {
  display: none;
}

.footer-mini-news {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

@media only screen and (max-width: 767px) {
  .footer-mini-news {
    display: block;
  }
}

@media only screen and (max-width: 767px) {
  .footer-mini-news .copy {
    margin-bottom: 12px;
  }
}

.footer-mini-news .content {
  --toggle-border-radius-outer: 12px;
  --toggle-border-radius-inner: 10px;
  --toggle-color-fill: var(--color-fill-blue);
  --toggle-color-text: var(--color-fill-blue);
  flex-shrink: 0;
}

.footer-mini-news .content .color-scheme-toggle {
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
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

@media screen and (prefers-color-scheme: dark) {
  [data-color-scheme="auto"] .footer-mini-news .content .color-scheme-toggle {
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

.footer-mini-news .content input[type="radio"]:checked + .text {
  --toggle-color-text: var(--color-button-text);
  background: var(--toggle-color-fill);
  border-color: var(--toggle-color-fill);
}

.footer .footer-breadcrumbs-home:hover {
  text-decoration: none;
}

.footer .footer-breadcrumbs-home:hover .footer-breadcrumbs-home-icon {
  opacity: 1;
  background-position-y: calc(100% + 2px);
}

.footer .footer-breadcrumbs-item:before {
  /* content: '';
  display: inline-block;
  width: 8px;
  height: 18px; */
  background-size: 8px 18px;
  background-color: var(--color-fill-gray-tertiary);
  -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDggMTgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0xLjI5LDAuOThMNy41LDlsLTYuMjEsOC4wMWwtMC42OC0wLjU0TDYuNDIsOWwtNS44LTcuNDlMMS4yOSwwLjk4eiIgZmlsbD0iY3VycmVudENvbG9yIiAvPjwvc3ZnPg==);
  /* -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain; */
  mask-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDggMTgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0xLjI5LDAuOThMNy41LDlsLTYuMjEsOC4wMWwtMC42OC0wLjU0TDYuNDIsOWwtNS44LTcuNDlMMS4yOSwwLjk4eiIgZmlsbD0iY3VycmVudENvbG9yIiAvPjwvc3ZnPg==);
  /* mask-repeat: no-repeat;
  mask-size: contain; */
}

body.theme-dark .footer-mini-news .content .color-scheme-toggle {
  display: none;
}
</style>
