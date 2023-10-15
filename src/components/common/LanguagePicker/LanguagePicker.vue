<template>
  <section class="lang-switcher-container">
    <span v-if="introText" class="language-switcher-text">
      {{ $t('components.common.FooterItem.chooseYourLanguage') }}:
    </span>
    <ul class="locale-lang language-picker-wrapper">
      <li v-for="lang in languages" :key="lang.key">
        <input
          type="radio"
          @click="changeLang(lang.key)"
          name="language"
          :id="lang.key"
          class="hideRadio"
          :checked="$i18n.locale === lang.key"
        />
        <label :for="lang.key" class="link">
          {{ getLabel(lang) }}
        </label>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" src="./LanguagePicker.ts"></script>
<style scoped src="./LanguagePicker.css"></style>
