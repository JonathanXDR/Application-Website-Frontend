<script setup lang="ts">
const { t } = useI18n()

const currentYear = ref(new Date().getFullYear())
</script>

<template>
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
        {{ t("components.common.Footer.allRightsReserved", { currentYear }) }}
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
        {{ t("components.common.Footer.allRightsReserved", { currentYear }) }}
      </div>
    </div>
  </section>
</template>
