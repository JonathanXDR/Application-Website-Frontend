<template>
  <input type="checkbox" id="ac-ln-menustate" />
  <div id="ac-ln-sticky-placeholder" class="ac-ln-sticking"></div>
  <nav
    id="ac-localnav"
    class="ac-localnav-dark ac-localnav-noborder ac-ln-sticking"
  >
    <div class="ac-ln-wrapper">
      <div
        id="ac-ln-background"
        class="ac-ln-background ac-ln-background-transition"
      ></div>
      <div class="ac-ln-content">
        <a href="https://jonathan-russ.com" class="ac-ln-title"
          ><LogoIcon />
        </a>
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
                type="checkbox"
                @click="
                  toggleTheme();
                  countToggles();
                "
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
