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
      <div
        ref="ac-ln-background"
        class="ac-ln-background ac-ln-background-transition"
      ></div>
      <div class="ac-ln-content">
        <div class="ac-ln-title">
          <NuxtLink to="/" class="ac-ln-title">
            <Logo />
          </NuxtLink>
          <DevBadge />
        </div>
        <div class="ac-ln-menu">
          <div class="ac-ln-menu-tray">
            <ul class="ac-ln-menu-items">
              <li
                v-for="(item, index) in items"
                :key="index"
                class="ac-ln-menu-item"
              >
                <NuxtLink
                  :to="item.route"
                  :class="{ current: index === currentSectionIndex }"
                  class="ac-ln-menu-link"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
              <!-- <LanguagePickerBar :introText="false" :shortForm="true" /> -->
            </ul>
          </div>
          <div class="ac-ln-actions">
            <div class="ac-ln-action ac-ln-action-menucta">
              <label for="ac-ln-menustate" class="ac-ln-menucta">
                <span class="ac-ln-menucta-chevron"></span>
              </label>
            </div>
            <!-- <ColorSchemeToggle /> -->
            <SegmentNavV2
              :items="[
                { id: 'light', label: 'Light', icon: 'sun.max.fill' },
                { id: 'dark', label: 'Dark', icon: 'moon.fill' },
                { id: 'auto', label: 'Auto', icon: 'circle.lefthalf.filled' }
              ]"
              gap="5px"
              size="xsmall"
              :label="windowWidth < 900 ? 'icon' : 'combination'"
              :separator="windowWidth < 900 ? false : true"
            />
            <LanguagePickerDropdown />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <label id="ac-ln-curtain" for="ac-ln-menustate"></label>
</template>

<script setup lang="ts">
import { type SectionType } from '~/types/common/Section'

const { tm } = useI18n()
const items: Ref<SectionType[]> = computed(() => tm('components.common.NavBar'))
const navOpen: Ref<boolean> = ref(false)
const navDisabled: Ref<boolean> = ref(false)

const { currentSection } = useSection()
const { getTheme } = useTheme()
const currentSectionIndex = computed(() => currentSection.value.index)
const { width: windowWidth } = useWindowSize({ initialWidth: 0 })

const headerAnimations = computed(() => {
  useAnimation().setHeaderAnimation({
    element: document.querySelector('.ac-ln-background') as HTMLElement,
    class: 'ac-ln-background-transition',
    timeout: 500
  })

  return useAnimation().headerAnimations
})

const toggleNav = () => {
  navOpen.value = !navOpen.value
  checkboxTimeout()
}

const checkboxTimeout = () => {
  navDisabled.value = true
  setTimeout(() => {
    navDisabled.value = false
  }, 1000)
}

const handleScroll = () => {
  if (navOpen.value && window.scrollY > 0) {
    navOpen.value = false
  }
}

const updateAnimations = () => {
  headerAnimations.value.value.forEach(element => {
    element.element.classList.remove(element.class)

    setTimeout(() => {
      element.element.classList.add(element.class)
    }, element.timeout)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  watch(getTheme, (newTheme, oldTheme) => {
    if (newTheme !== oldTheme) {
      updateAnimations()
    }
  })
})
</script>

<style scoped>
/* ---------------------------------- Menu ---------------------------------- */

.item {
  list-style: none;
  font-weight: 700;
  padding: 14px 16px;
  margin: 0 8px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none !important;
}

.item::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition: 0.2s;
  border-radius: 5px;
}

.item:hover {
  color: var(--color-fill-tertiary) !important;
}

.item:hover::before {
  background: var(--color-code-plain);
  transform: scale(1.2);
}

/* --------------------------------- Navbar --------------------------------- */

#ac-ln-menustate {
  display: none;
}

#ac-ln-sticky-placeholder {
  display: block;
  margin: 0;
  padding: 0;
  position: relative;
  visibility: hidden;
  z-index: -1;
}

#ac-localnav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  z-index: 9997;
}

@media only screen and (max-width: 1250px) {
  #ac-localnav {
    height: 48px;
  }
}

.ac-nav-overlap #ac-localnav {
  margin-top: 44px;
  margin-bottom: -96px;
}

@media only screen and (max-width: 1250px) {
  .ac-nav-overlap #ac-localnav {
    margin-top: 48px;
    margin-bottom: -96px;
  }
}

.ac-ln-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 1;
}

.ac-ln-content {
  margin: 0 auto;
  width: 90%;
  height: 52px;
  padding: 0 4px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 900px) {
  .ac-ln-content {
    width: 82.5% !important;
  }
}

@media only screen and (max-width: 1250px) {
  .ac-ln-content {
    display: block;
    height: 48px;
  }
}

/* ------------------------------ ac-ln-actions ----------------------------- */

.ac-ln-actions {
  display: flex;
  align-items: center;
  gap: 17px;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-actions {
    right: 0;
    position: absolute;
    top: 0;
    z-index: 1;
    padding-right: calc(22px + constant(safe-area-inset-right));
    height: 100%;
  }
}

/* ---------------------------- ac-ln-background ---------------------------- */

.ac-ln-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: var(--color-menu);
  transition: background-color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  transition-property: background-color, backdrop-filter;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.ac-ln-background:after {
  background-color: rgba(0, 0, 0, 0.16);
}

@media only screen and (max-width: 1250px) {
  .ac-ln-background {
    min-height: 48px;
  }

  .ac-ln-background-transition {
    transition: background-color 0.5s ease 0.7s;
  }
}

.nav-open .ac-ln-background {
  background-color: var(--color-fill-tertiary) !important;
  max-height: none !important;
  transition: background-color 0.5s ease !important;
}

.ac-localnav-dark .ac-ln-background:after {
  background-color: rgba(255, 255, 255, 0.24);
}

.ac-ln-background:after {
  margin-left: -490px;
  left: 50%;
  content: '';
  display: block;
  position: absolute;
  top: 100%;
  width: 980px;
  height: 1px;
  z-index: 1;
}

@media only screen and (max-width: 1023px) {
  .ac-ln-background:after {
    margin-left: 0;
    left: 0;
    width: 100%;
  }
}

.ac-localnav-noborder .ac-ln-background:after {
  display: none;
}

.ac-ln-sticking .ac-ln-background:after {
  margin-left: 0;
  left: 0;
  width: 100%;
}

.nav-open .ac-ln-background:after {
  margin-left: 0 !important;
  left: 0 !important;
  width: 100% !important;
}

/* ------------------------------- ac-ln-menu ------------------------------- */

.ac-ln-menu {
  height: 100%;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  /* letter-spacing: -0.02em; */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
  float: right;
  display: flex;
  align-items: center;
  gap: 24px;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-menu {
    padding-top: 0;
    margin-top: 0;
    width: 100%;
    height: auto;
    display: block;
  }
}

/* ----------------------------- ac-ln-menu-tray ---------------------------- */

.ac-ln-menu-tray {
  height: 100%;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-menu-tray {
    overflow: hidden !important;
    pointer-events: none;
    visibility: hidden;
    width: 100%;
    padding-top: 0;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      visibility 0s linear 1s;
  }

  .nav-open .ac-ln-menu-tray {
    max-height: 400px !important;
    max-height: calc(100vh - 48px - 48px) !important;
    pointer-events: auto !important;
    visibility: visible !important;
    transition-delay: 0.2s, 0s !important;
  }
}

@media only screen and (max-width: 1250px) and (orientation: landscape) {
  .nav-open .ac-ln-menu-tray {
    max-height: 280px !important;
    max-height: calc(100vh - 48px - 48px) !important;
  }
}

@media only screen and (max-width: 1250px) {
  .nav-open.ac-ln-sticking .ac-ln-menu-tray {
    max-height: calc(100vh - 48px) !important;
  }
}

/* ---------------------------- ac-ln-menu-items ---------------------------- */

.ac-ln-menu-items {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-menu-items {
    opacity: 0;
    padding: 10px 24px 24px;
    transform: translate3d(0, -150px, 0);
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.5s,
      opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
    flex-direction: column;
    gap: 0px;
  }

  .nav-open .ac-ln-menu-items {
    opacity: 1 !important;
    transform: translate3d(0, 0, 0) !important;
    transition-delay: 0.2s, 0.4s !important;
  }
}

/* ----------------------------- ac-ln-menu-item ---------------------------- */

@media only screen and (max-width: 1250px) {
  .ac-ln-menu-item {
    display: inline-block;
    width: 100%;
    height: 44px;
  }

  .ac-ln-menu-item:first-child .ac-ln-menu-link {
    border-top: 0;
  }

  .ac-ln-menu-item:nth-child(1) .ac-ln-menu-link {
    transition-delay: 0.07s;
  }

  .ac-ln-menu-item:nth-child(2) .ac-ln-menu-link {
    transition-delay: 0.14s;
  }

  .ac-ln-menu-item:nth-child(3) .ac-ln-menu-link {
    transition-delay: 0.21s;
  }

  .ac-ln-menu-item:nth-child(4) .ac-ln-menu-link {
    transition-delay: 0.28s;
  }

  .ac-ln-menu-item:nth-child(5) .ac-ln-menu-link {
    transition-delay: 0.35s;
  }

  .ac-ln-menu-item:nth-child(6) .ac-ln-menu-link {
    transition-delay: 0.42s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(1)
    .ac-ln-menu-link {
    transition-delay: 0.56s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(2)
    .ac-ln-menu-link {
    transition-delay: 0.49s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(3)
    .ac-ln-menu-link {
    transition-delay: 0.42s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(4)
    .ac-ln-menu-link {
    transition-delay: 0.35s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(5)
    .ac-ln-menu-link {
    transition-delay: 0.28s;
  }

  #ac-ln-menustate:checked
    ~ #ac-localnav
    .ac-ln-menu-item:nth-child(6)
    .ac-ln-menu-link {
    transition-delay: 0.21s;
  }
}

/* ----------------------------- ac-ln-menu-link ---------------------------- */

.ac-ln-menu-link {
  display: inline-block;
  line-height: 22px;
  white-space: nowrap;
  opacity: 0.92;
}

.ac-ln-menu-link:hover {
  color: var(--color-figure-blue);
  opacity: 1;
  text-decoration: none;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-menu-link {
    border-top: 1px solid var(--color-mobile-border);
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 1.3;
    opacity: 0;
    transform: translate3d(0, -25px, 0);
    transition: 0.5s ease;
    transition-property: transform, opacity;
  }

  .nav-open .ac-ln-menu-link {
    opacity: 0.88 !important;
    transform: translate3d(0, 0, 0) !important;
  }
}

.nav-open .ac-ln-menu-link {
  opacity: 0.92 !important;
}

.nav-open .ac-ln-menu-link.current {
  opacity: 0.56 !important;
}

.ac-localnav-dark .ac-ln-menu-link.current {
  color: var(--color-fill-gray);
  opacity: 0.56;
  border-color: var(--color-mobile-border-opacity);
  pointer-events: none;
}

#ac-ln-menustate:checked
  ~ .ac-localnav-dark#ac-localnav
  .ac-ln-menu-link.current {
  opacity: 0.56;
}

.ac-ln-action-menucta {
  display: none;
}

@media only screen and (max-width: 1250px) {
  .ac-ln-action-menucta {
    display: block;
  }
}

.ac-ln-menucta {
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 20px;
  height: 20px;
}

/* -------------------------- ac-ln-menucta-chevron ------------------------- */

.ac-ln-menucta-chevron {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),
    transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
  transform: translateY(0);
  opacity: 0.8;
}

.ac-ln-menucta-chevron::before,
.ac-ln-menucta-chevron::after {
  content: '';
  display: block;
  position: absolute;
  top: 13px;
  width: 11px;
  height: 1px;
  z-index: 1;
  transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),
    transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
}

.ac-ln-menucta-chevron::before {
  right: 50%;
  border-radius: 0.5px 0 0 0.5px;
}

.ac-ln-menucta-chevron::after {
  left: 50%;
  border-radius: 0 0.5px 0.5px 0;
}

.ac-ln-menucta-chevron::before {
  transform-origin: 100% 100%;
  transform: rotate(40deg) scaleY(1.1);
}

.ac-ln-menucta-chevron::after {
  transform-origin: 0% 100%;
  transform: rotate(-40deg) scaleY(1.1);
}

.ac-ln-menucta-chevron:hover {
  opacity: 1;
}

.nav-open .ac-ln-menucta-chevron {
  transform: translateY(-8px) !important;
}

.nav-open .ac-ln-menucta-chevron::before {
  transform-origin: 100% 0% !important;
  transform: rotate(-40deg) scaleY(1.1) !important;
}

.nav-open .ac-ln-menucta-chevron::after {
  transform-origin: 0% 0% !important;
  transform: rotate(40deg) scaleY(1.1) !important;
}

.ac-localnav-dark .ac-ln-menucta-chevron::before,
.ac-localnav-dark .ac-ln-menucta-chevron::after {
  background: var(--color-fill-gray);
}

/* ------------------------------- ac-ln-title ------------------------------ */

.ac-ln-title {
  display: flex;
  align-items: center;
  height: 100%;
}

a:disabled {
  opacity: 0.32;
}

/* ----------------------------- #ac-ln-curtain ----------------------------- */

#ac-ln-curtain {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 9996;
  transition: opacity 0.2s ease;
}

@media only screen and (max-width: 1250px) {
  #ac-ln-curtain {
    transition: opacity 1s ease 0.2s, width 0s ease 1.2s, height 0s ease 1.2s;
  }
}

.nav-open ~ #ac-ln-curtain {
  transition: opacity 1s ease 0.1s !important;
}

@media only screen and (max-width: 1250px) {
  .nav-open ~ #ac-ln-curtain {
    opacity: 1 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
}

/* ------------------------------ Theme Button ------------------------------ */

.theme-button {
  min-width: 145px;
  min-height: 74px;
  border-radius: 40px;
  transform: scale(0.3);
  border: solid var(--color-menu-border);
  border-width: 3px;
  box-sizing: content-box;
  margin: -26px -52px;
}

.btn-input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

input[type='checkbox']#active {
  width: 0;
  height: 0;
}

.theme-button span {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  opacity: 1;
  background: #fff;
  border-radius: 40px;
  transition: 0.2s ease background, 0.2s ease opacity;
}

.theme-button span:after,
.theme-button span:before {
  content: '';
  position: absolute;
  top: 8px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  transition: 0.5s ease transform, 0.2s ease background;
}

.theme-button span:before {
  background: #fff;
  transform: translate(-58px, 0);
  z-index: 1;
}

.theme-button span:after {
  background: #000;
  transform: translate(8px, 0);
  z-index: 0;
}

.theme-button input[type='checkbox']:checked + span {
  background: #000;
}

.theme-button input[type='checkbox']:active + span {
  opacity: 0.5;
}

.theme-button input[type='checkbox']:checked + span:before {
  background: #000;
  transform: translate(56px, -19px);
}

.theme-button input[type='checkbox']:checked + span:after {
  background: #fff;
  transform: translate(79px, 0);
}
</style>
