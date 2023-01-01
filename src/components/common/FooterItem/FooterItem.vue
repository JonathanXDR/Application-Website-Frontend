<template>
  <div id="footer">
    <section id="copyright">
      <p>© {{ currentYear }} Jonathan Russ. All rights reserved.</p>
    </section>
    <section id="social-share-container">
      <ShareSheet />
    </section>

    <section class="lang-switcher-container">
      <span class="language-switcher-text">Wähle deine Sprache:</span>
      <ul class="locale-lang language-picker-wrapper">
        <li>
          <input
            type="radio"
            onclick="SwitchLang('DE')"
            name="language"
            id="german"
            class="hideRadio"
            checked
          />
          <label for="german" class="link">Deutsch</label>
        </li>
        <li>
          <input
            type="radio"
            onclick="SwitchLang('EN')"
            name="language"
            id="english"
            class="hideRadio"
          />
          <label for="english" class="link">English</label>
        </li>
        <li>
          <input
            type="radio"
            onclick="SwitchLang('FR')"
            name="language"
            id="french"
            class="hideRadio"
          />
          <label for="french" class="link">Français</label>
        </li>
        <li>
          <input
            type="radio"
            onclick="SwitchLang('IT')"
            name="language"
            id="italian"
            class="hideRadio"
          />
          <label for="italian" class="link">Italiano</label>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" src="./FooterItem.ts"></script>
<style scoped src="./FooterItem.css"></style>
