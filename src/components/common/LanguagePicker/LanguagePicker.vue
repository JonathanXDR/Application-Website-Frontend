<template>
  <section class="lang-switcher-container">
    <span class="language-switcher-text"
      >{{ $t('components.common.FooterItem.chooseYourLanguage') }}:</span
    >
    <ul class="locale-lang language-picker-wrapper">
      <li>
        <input
          type="radio"
          @click="changeLang('de')"
          name="language"
          id="german"
          class="hideRadio"
          :checked="$i18n.locale === 'de'"
        />
        <label for="german" class="link">Deutsch</label>
      </li>
      <li>
        <input
          type="radio"
          @click="changeLang('en')"
          name="language"
          id="english"
          class="hideRadio"
          :checked="$i18n.locale === 'en'"
        />
        <label for="english" class="link">English</label>
      </li>
      <li>
        <input
          type="radio"
          @click="changeLang('fr')"
          name="language"
          id="french"
          class="hideRadio"
          :checked="$i18n.locale === 'fr'"
        />
        <label for="french" class="link">Français</label>
      </li>
      <li>
        <input
          type="radio"
          @click="changeLang('it')"
          name="language"
          id="italian"
          class="hideRadio"
          :checked="$i18n.locale === 'it'"
        />
        <label for="italian" class="link">Italiano</label>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" src="./LanguagePicker.ts"></script>
<style scoped src="./LanguagePicker.css"></style>
