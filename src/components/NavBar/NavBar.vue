<template>
  <input v-model="navOpen" type="checkbox" id="ac-ln-menustate" />
  <div id="ac-ln-sticky-placeholder" class="ac-ln-sticking"></div>
  <nav
    id="ac-localnav"
    class="ac-localnav-dark ac-localnav-noborder ac-ln-sticking"
    :class="{ 'nav-open': navOpen }"
  >
    <div class="ac-ln-wrapper">
      <div
        id="ac-ln-background"
        class="ac-ln-background ac-ln-background-transition"
      ></div>
      <div class="ac-ln-content">
        <router-link to="/" class="ac-ln-title">
          <LogoIcon />
        </router-link>
        <div class="ac-ln-menu">
          <div class="ac-ln-menu-tray">
            <ul class="ac-ln-menu-items">
              <li
                v-for="(item, index) in items"
                :key="index"
                class="ac-ln-menu-item"
              >
                <router-link :to="item.route" class="ac-ln-menu-link">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="ac-ln-actions">
            <div class="ac-ln-action ac-ln-action-menucta">
              <label for="ac-ln-menustate" class="ac-ln-menucta">
                <span class="ac-ln-menucta-chevron"></span>
              </label>
            </div>
            <div id="theme-button">
              <input
                @input="toggleTheme()"
                v-model="themeDark"
                type="checkbox"
                class="btn-input"
                id="theme-checkbox"
              />
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <label id="ac-ln-curtain" for="ac-ln-menustate"></label>
</template>

<script lang="ts" src="./NavBar.ts"></script>
<style src="./NavBar.css"></style>
