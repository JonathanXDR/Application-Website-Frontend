<script setup lang="ts">
import type { SectionType } from '#shared/types/common/section'

withDefaults(
  defineProps<{
    items?: SectionType[]
  }>(),
  {
    items: () => [],
  },
)
</script>

<template>
  <nav
    class="footer-directory"
    aria-label="Apple Developer Directory"
    role="navigation"
  >
    <!-- googleoff: all -->
    <div class="footer-directory-column">
      <input
        id="footer-directory-column-section-state-platform"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-platform"
        >
          <h3 class="footer-directory-column-section-title">{{}}</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-platform"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/ios/"
            >iOS</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/ipados/"
            >iPadOS</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/macos/"
            >macOS</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/tvos/"
            >tvOS</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/visionos/"
            >visionOS</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/watchos/"
            >watchOS</a>
          </li>
        </ul>
      </div>

      <input
        id="footer-directory-column-section-state-tools"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-tools"
        >
          <h3 class="footer-directory-column-section-title">Tools</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-tools"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/swift/"
            >Swift</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/swiftui/"
            >SwiftUI</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/swift-playgrounds/"
            >Swift Playgrounds</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/testflight/"
            >TestFlight</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/xcode/"
            >Xcode</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/xcode-cloud/"
            >Xcode Cloud</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/sf-symbols/"
            >SF Symbols</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-directory-column">
      <input
        id="footer-directory-column-section-state-topics"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-topics"
        >
          <h3 class="footer-directory-column-section-title">
            Topics &amp; Technologies
          </h3>
        </label>
        <a
          href="#footer-directory-column-section-state-topics"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/accessibility/"
            >Accessibility</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/accessories/"
            >Accessories</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/app-extensions/"
            >App Extensions</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/app-store/"
            >App Store</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/audio/"
            >Audio &amp; Video</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/augmented-reality/"
            >Augmented Reality</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/design/"
            >Design</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/distribute/"
            >Distribution</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/education/"
            >Education</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/fonts/"
            >Fonts</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/games/"
            >Games</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/health-fitness/"
            >Health &amp; Fitness</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/in-app-purchase/"
            >In-App Purchase</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/localization/"
            >Localization</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/maps/"
            >Maps &amp; Location</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/machine-learning/"
            >Machine Learning</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="https://opensource.apple.com"
            >Open Source</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/security/"
            >Security</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/safari/"
            >Safari &amp; Web</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-directory-column">
      <input
        id="footer-directory-column-section-state-resources"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-resources"
        >
          <h3 class="footer-directory-column-section-title">Resources</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-resources"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/documentation/"
            >Documentation</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/learn/"
            >Tutorials</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/download/"
            >Downloads</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/forums/"
            >Forums</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/videos/"
            >Videos</a>
          </li>
        </ul>
      </div>

      <input
        id="footer-directory-column-section-state-support"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-support"
        >
          <h3 class="footer-directory-column-section-title">Support</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-support"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/support/articles/"
            >Support Articles</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/contact/"
            >Contact Us</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/bug-reporting/"
            >Bug Reporting</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/system-status/"
            >System Status</a>
          </li>
        </ul>
      </div>

      <input
        id="footer-directory-column-section-state-account"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-account"
        >
          <h3 class="footer-directory-column-section-title">Account</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-account"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/account/"
            >Apple Developer</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="https://appstoreconnect.apple.com/"
            >App Store Connect</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/account/ios/certificate/"
            >Certificates, IDs, &amp; Profiles</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="https://feedbackassistant.apple.com/"
            >Feedback Assistant</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-directory-column">
      <input
        id="footer-directory-column-section-state-programs"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-programs"
        >
          <h3 class="footer-directory-column-section-title">Programs</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-programs"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/programs/"
            >Apple Developer Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/programs/enterprise/"
            >Apple Developer Enterprise Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/app-store/small-business-program/"
            >App Store Small Business Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="https://mfi.apple.com/"
            >MFi Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/programs/news-partner/"
            >News Partner Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/programs/video-partner/"
            >Video Partner Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/security-bounty/"
            >Security Bounty Program</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/programs/security-research-device/"
            >Security Research Device Program</a>
          </li>
        </ul>
      </div>

      <input
        id="footer-directory-column-section-state-events"
        class="footer-directory-column-section-state"
        type="checkbox"
      >
      <div class="footer-directory-column-section">
        <label
          class="footer-directory-column-section-label"
          for="footer-directory-column-section-state-events"
        >
          <h3 class="footer-directory-column-section-title">Events</h3>
        </label>
        <a
          href="#footer-directory-column-section-state-events"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-open"
        >
          <span class="footer-directory-column-section-anchor-label">Open Menu</span>
        </a>
        <a
          href="#"
          class="footer-directory-column-section-anchor footer-directory-column-section-anchor-close"
        >
          <span class="footer-directory-column-section-anchor-label">Close Menu</span>
        </a>
        <ul class="footer-directory-column-section-list">
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/events/"
            >Meet with Apple</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/events/developer-centers/"
            >Apple Developer Centers</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/app-store/app-store-awards/"
            >App Store Awards</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/design/awards/"
            >Apple Design Awards</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/academies/"
            >Apple Developer Academies</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/entrepreneur-camp/"
            >Entrepreneur Camp</a>
          </li>
          <li class="footer-directory-column-section-item">
            <a
              class="footer-directory-column-section-link"
              href="/wwdc/"
            >WWDC</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- googleon: all -->
  </nav>
</template>
