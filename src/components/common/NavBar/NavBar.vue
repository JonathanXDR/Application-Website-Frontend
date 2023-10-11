<template>
  <input
    @input="toggleNav()"
    v-model="navOpen"
    type="checkbox"
    id="ac-ln-menustate"
    :disabled="navDisabled"
  />
  <div id="ac-ln-sticky-placeholder" class="ac-ln-sticking"></div>
  <nav
    id="ac-localnav"
    class="ac-localnav-dark ac-localnav-noborder ac-ln-sticking"
    :class="{ 'nav-open': navOpen }"
  >
    <div class="ac-ln-wrapper">
      <div ref="ac-ln-background" class="ac-ln-background ac-ln-background-transition"></div>
      <div class="ac-ln-content">
        <div class="ac-ln-title">
          <router-link to="/" class="ac-ln-title">
            <LogoIcon />
          </router-link>
          <small
            v-if="nodeEnv === 'development'"
            :style="{ color: colorBadge.colorVar }"
            class="dev-badge"
            data-tag-name="Dev"
          ></small>
        </div>
        <div class="ac-ln-menu">
          <div class="ac-ln-menu-tray">
            <ul class="ac-ln-menu-items" v-if="json">
              <li v-for="(item, index) in json" :key="index" class="ac-ln-menu-item">
                <router-link
                  :to="item.route"
                  :class="{ current: index === currentSectionIndex }"
                  class="ac-ln-menu-link"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
            <LoadingSpinner v-else class="medium center reduced-margin" />
          </div>
          <div class="ac-ln-actions">
            <div class="ac-ln-action ac-ln-action-menucta">
              <label for="ac-ln-menustate" class="ac-ln-menucta">
                <span class="ac-ln-menucta-chevron"></span>
              </label>
            </div>
            <div class="theme-button">
              <input @input="toggleTheme()" v-model="themeDark" type="checkbox" class="btn-input" />
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
<style scoped src="./NavBar.css"></style>
