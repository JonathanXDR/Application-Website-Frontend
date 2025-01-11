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
        Apple Footer
      </h2>
      <nav
        class="footer-breadcrumbs"
        aria-label="Breadcrumbs"
      >
        <a
          class="home footer-breadcrumbs-home"
          href="/"
        >
          <span class="footer-breadcrumbs-home-label">
            Apple Security Research
          </span>
        </a>
        <div class="footer-breadcrumbs-path">
          <ol class="footer-breadcrumbs-list">
            <li class="footer-breadcrumbs-item">
              Overview
            </li>
          </ol>
        </div>
      </nav>
      <section
        class="footer-mini"
        vocab="http://schema.org/"
        typeof="Organization"
      >
        <div class="footer-mini-legal">
          <div
            class="footer-mini-legal-copyright footer-mini-legal-copyright--small"
          >
            Copyright <span aria-hidden="true">©</span>
            2024 Apple Inc. All rights reserved.
          </div>
          <div class="footer-mini-legal-links">
            <a
              href="https://support.apple.com/contact"
              class="footer-mini-legal-link"
              rel="nofollow"
            >
              Support
            </a>
            <a
              href="https://support.apple.com/guide/security/welcome/web"
              class="footer-mini-legal-link"
              rel="nofollow"
            >
              Apple Platform Security
            </a>
            <a
              href="https://www.apple.com/legal/privacy/"
              class="footer-mini-legal-link"
              rel="nofollow"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.apple.com/legal/"
              class="footer-mini-legal-link"
              rel="nofollow"
            >
              Legal
            </a>
          </div>
          <div
            class="footer-mini-legal-copyright footer-mini-legal-copyright--large"
          >
            Copyright <span aria-hidden="true">©</span>
            2024 Apple Inc. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
.footer {
  font-size: 12px;
  line-height: 1.3333733333;
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
  background-color: #f5f5f7;
  color: #1d1d1f;
  min-width: 1024px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.footer.theme-dark,
.theme-dark .footer {
  background-color: #1d1d1f;
  color: #f5f5f7;
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
  color: #515154;
  text-decoration: none;
}

.footer a:hover {
  color: #1d1d1f;
  text-decoration: underline;
}

.footer.theme-dark a,
.theme-dark .footer a {
  color: #a1a1a6;
}

.footer.theme-dark a:hover,
.theme-dark .footer a:hover {
  color: #f5f5f7;
}

.footer-content {
  margin: 0 auto;
  max-width: 980px;
  padding: 0 calc(22px + constant(safe-area-inset-right)) 0
    calc(22px + constant(safe-area-inset-left));
}

@supports (padding: calc(0px)) {
  .footer-content {
    padding-left: calc(max(22px, env(safe-area-inset-left)));
    padding-right: calc(max(22px, env(safe-area-inset-right)));
  }
}

@media only screen and (max-width: 767px) {
  .footer-content {
    padding: 0 16px;
  }
}

.footer-label {
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

.footer-sosumi {
  border-bottom: 1px solid #d2d2d7;
  color: #86868b;
  padding: 17px 0 11px;
}

.footer.theme-dark .footer-sosumi,
.theme-dark .footer .footer-sosumi {
  border-color: #424245;
  color: #6e6e73;
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

.footer-sosumi li,
.footer-sosumi p {
  font-size: 12px;
  line-height: 1.3333733333;
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
  padding: 17px 0;
  position: relative;
  z-index: 1;
  color: #515154;
}

.footer-breadcrumbs:after,
.footer-breadcrumbs:before {
  content: " ";
  display: table;
}

.footer-breadcrumbs:after {
  clear: both;
}

.footer.theme-dark .footer-breadcrumbs,
.theme-dark .footer .footer-breadcrumbs {
  color: #a1a1a6;
}

@media only screen and (max-width: 767px) {
  .footer-breadcrumbs {
    border-bottom: 1px solid #d2d2d7;
  }

  .footer.theme-dark .footer-breadcrumbs,
  .theme-dark .footer .footer-breadcrumbs {
    border-color: #424245;
  }
}

.footer-breadcrumbs-home {
  left: 0;
  position: absolute;
  z-index: 2;
  top: 17px;
}

.footer-breadcrumbs-home-icon {
  width: 14px;
  height: 72px;
  background-size: 14px 72px;
  background-repeat: no-repeat;
  background-image: url(/assets/image/ac-footer/breadcrumbs/apple/icon_large.svg);
  height: 18px;
  display: block;
  position: relative;
  z-index: 2;
  color: transparent;
  background-position-y: -36px;
}

.footer.theme-dark .footer-breadcrumbs-home-icon,
.theme-dark .footer .footer-breadcrumbs-home-icon {
  background-repeat: no-repeat;
  background-image: url(/assets/image/ac-footer/breadcrumbs/apple/icon_dark_large.svg);
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
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.footer-breadcrumbs-path {
  font-size: 12px;
  line-height: 1.3333733333;
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

.footer-breadcrumbs-path:after,
.footer-breadcrumbs-path:before {
  content: " ";
  display: table;
}

.footer-breadcrumbs-path:after {
  clear: both;
}

.footer-breadcrumbs-list {
  max-height: 9999px;
  padding-left: 25px;
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
  background-image: url(/assets/image/ac-footer/breadcrumbs/separator/icon_large.svg);
  margin-right: 11px;
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  height: 18px;
  background-position-y: 100%;
}

.footer.theme-dark .footer-breadcrumbs-item:before,
.theme-dark .footer .footer-breadcrumbs-item:before {
  background-repeat: no-repeat;
  background-image: url(/assets/image/ac-footer/breadcrumbs/separator/icon_dark_large.svg);
}

html[dir="rtl"] .footer-breadcrumbs-item:before {
  transform: scaleX(-1);
}

.footer-directory {
  font-size: 12px;
  line-height: 1.3333733333;
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
    border-bottom: 1px solid #d2d2d7;
    overflow: hidden;
    pointer-events: auto;
  }

  .footer.theme-dark .footer-directory-column-section,
  .theme-dark .footer .footer-directory-column-section {
    border-color: #424245;
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
  line-height: 1.3333733333;
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
    background: #f5f5f7;
    cursor: pointer;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    z-index: 2;
  }

  .footer.theme-dark .footer-directory-column-section-title,
  .theme-dark .footer .footer-directory-column-section-title {
    background: #1d1d1f;
    color: #f5f5f7;
  }

  .footer-directory-column-section-title:hover {
    color: #000;
  }

  .footer.theme-dark .footer-directory-column-section-title:hover,
  .theme-dark .footer .footer-directory-column-section-title:hover {
    color: #fff;
  }

  .footer-directory-column-section-title:after {
    content: "+";
    float: right;
    font-size: 14px;
    font-weight: 400;
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
  -webkit-clip-path: inset(0 0 99.9% 99.9%);
  clip-path: inset(0 0 99.9% 99.9%);
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
  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title,
  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title {
    color: #000;
  }

  .footer.theme-dark
    .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title,
  .footer.theme-dark
    .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title,
  .theme-dark
    .footer
    .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title,
  .theme-dark
    .footer
    .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title {
    color: #fff;
  }

  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-title:after,
  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-title:after {
    transform: rotate(45deg) scale(1.08);
  }

  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-list,
  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-list {
    position: static;
    visibility: visible;
    z-index: 1;
    transform: none;
    transition: transform 0.3s ease;
  }

  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-open,
  .footer-directory-column-section-state:target
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-open {
    display: none;
  }

  .footer-directory-column-section-state:checked
    + .footer-directory-column-section
    .footer-directory-column-section-anchor-close,
  .footer-directory-column-section-state:target
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
  border-top: 1px solid #d2d2d7;
  color: #86868b;
  padding: 17px 0 calc(21px + constant(safe-area-inset-bottom));
}

@supports (padding: calc(0px)) {
  .footer-mini {
    padding-bottom: calc(max(21px, env(safe-area-inset-bottom)));
  }
}

.footer-mini:nth-child(2) {
  border-top: none;
}

@media only screen and (max-width: 767px) {
  .footer-mini {
    padding-bottom: calc(19px + constant(safe-area-inset-bottom));
  }

  @supports (padding: calc(0px)) {
    .footer-mini {
      padding-bottom: calc(max(19px, env(safe-area-inset-bottom)));
    }
  }
}

.footer.theme-dark .footer-mini,
.theme-dark .footer .footer-mini {
  border-color: #424245;
  color: #6e6e73;
}

.footer-mini-shop {
  max-height: 9999px;
  padding-bottom: 3px;
}

@media only screen and (max-width: 767px) {
  .footer-mini-shop {
    padding-bottom: 10px;
  }
}

.footer.theme-dark .footer-mini-shop,
.theme-dark .footer .footer-mini-shop {
  border-color: #424245;
}

.footer-mini-shop a {
  color: #06c;
}

.footer.theme-dark .footer-mini-shop a,
.theme-dark .footer .footer-mini-shop a {
  color: #2997ff;
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
  border-left: 1px solid #d2d2d7;
  margin-left: 7px;
  padding-left: 11px;
  display: inline;
}

.footer.theme-dark .footer-mini-locale-link,
.theme-dark .footer .footer-mini-locale-link {
  border-color: #424245;
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
  background-image: url(https://www.apple.com/ac/flags/1/images/default/16.png);
  padding-right: 5px;
  background-position: 0;
  cursor: pointer;
  float: left;
  margin-top: -1px;
}

@media (-webkit-min-device-pixel-ratio: 1.5),
  (min-resolution: 144dpi),
  only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-resolution: 1.5dppx) {
  .footer-mini-locale-flag {
    background-image: url(https://www.apple.com/ac/flags/1/images/default/32.png);
  }
}

.footer-mini-legal {
  position: relative;
  top: -3px;
  z-index: 1;
}

.footer-mini-legal:after,
.footer-mini-legal:before {
  content: " ";
  display: table;
}

.footer-mini-legal:after {
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
  border-right: 1px solid #d2d2d7;
  margin-right: 7px;
  padding-right: 10px;
  display: inline-block;
  margin-top: 5px;
  white-space: nowrap;
}

.footer.theme-dark .footer-mini-legal-link,
.theme-dark .footer .footer-mini-legal-link {
  border-color: #424245;
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

.footer-directory + .footer-mini .footer-mini-shop {
  margin-bottom: 7px;
  padding-bottom: 8px;
  border-bottom: 1px solid #d2d2d7;
}

.footer.theme-dark .footer-directory + .footer-mini .footer-mini-shop,
.theme-dark .footer .footer-directory + .footer-mini .footer-mini-shop {
  border-color: #424245;
}

@media only screen and (max-width: 767px) {
  .footer-directory + .footer-mini .footer-mini-shop {
    border-bottom: none;
  }
}

.footer-sosumi {
  margin: 0;
  padding: 0;
  border-bottom: 0;
  background-color: #fff;
}

.footer-sosumi .sosumi-content {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 22px 20px;
}

@supports (padding: calc(0px)) {
  .footer-sosumi .sosumi-content {
    padding-left: calc(max(22px, env(safe-area-inset-left)));
    padding-right: calc(max(22px, env(safe-area-inset-right)));
  }
}

@media only screen and (max-width: 767px) {
  .footer-sosumi .sosumi-content {
    padding-right: 16px;
    padding-left: 16px;
  }
}

@media only screen and (min-width: 735px) {
  .footer-sosumi .sosumi-content {
    padding-bottom: 45px;
  }
}

@media only screen and (min-width: 1069px) {
  .footer-sosumi .sosumi-content {
    padding-bottom: 30px;
  }
}

.footer-sosumi .sosumi-content:before {
  display: block;
  content: "";
  width: 100%;
  height: 1px;
  margin-bottom: 18px;
  background-color: #d2d2d7;
}

.footer-mini {
  padding-top: 17px;
}

.footer-mini-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 0;
}

.footer-mini-legal-copyright--small {
  margin-right: auto;
}

@media only screen and (min-width: 735px) {
  .footer-mini-legal-copyright--small {
    display: none;
  }
}

.footer-mini-legal-copyright--large {
  margin-left: auto;
  margin-right: 0;
}

@media only screen and (max-width: 734px) {
  .footer-mini-legal-copyright--large {
    display: none;
  }
}

.theme-dark .footer,
.theme-dark.footer {
  background-color: #000;
}

.device + .footer .sosumi-content {
  border-top: 0;
}

.footer-breadcrumbs {
  padding-block: 15px;
}

.footer-breadcrumbs-home:is(.footer-breadcrumbs-home) {
  font-size: 14px;
  line-height: 1.1428571429;
  font-weight: 500;
  letter-spacing: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  color: #515154;
  position: static;
  display: inline-block;
  vertical-align: middle;
}

@media only screen and (max-width: 1068px) {
  .footer-breadcrumbs-home:is(.footer-breadcrumbs-home) {
    font-size: 14px;
    line-height: 1.1428571429;
    font-weight: 500;
    letter-spacing: 0;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}

@media only screen and (max-width: 734px) {
  .footer-breadcrumbs-home:is(.footer-breadcrumbs-home) {
    font-size: 14px;
    line-height: 1.1428571429;
    font-weight: 500;
    letter-spacing: 0;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}

.theme-dark .footer-breadcrumbs-home:is(.footer-breadcrumbs-home) {
  color: #fff;
}

.footer-breadcrumbs-home-icon {
  display: inline-block;
  vertical-align: middle;
}

.footer-breadcrumbs-home-label {
  position: static;
  width: auto;
  height: auto;
  -webkit-clip-path: none;
  clip-path: none;
  margin-left: 5px;
}

.footer-breadcrumbs-path {
  display: inline-block;
  vertical-align: middle;
}

.footer-breadcrumbs-list {
  display: block;
  padding-left: 7px;
}

.footer-breadcrumbs-item {
  padding-bottom: 0;
}
</style>
