<template>
  <h2>{{ props.title }}</h2>

  <TabList />

  <div class="item-container">
    <div
      id="standard-gallery-item-1"
      class="gallery-item current"
      style="z-index: 2; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster render performance in OTOY Octane X<sup class="footnote footnote-number">
          <a href="#footnote-5">4</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">7.6</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 13.1579%">
              <hr class="bar bar-2" style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-2"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster video upscaling performance&nbsp;in Topaz Video AI<sup
          class="footnote footnote-number"
        >
          <a href="#footnote-6">5</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">6.9</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 14.4928%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-3"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster 8K render performance&nbsp;in Final Cut Pro<sup class="footnote footnote-number">
          <a href="#footnote-7">6</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">6.4</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 15.625%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-4"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster real-time 3D performance in Autodesk Maya<sup class="footnote footnote-number">
          <a href="#footnote-8">7</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">4.9</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 20.4082%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-5"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster ProRes transcode performance in Compressor<sup class="footnote footnote-number">
          <a href="#footnote-9">8</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">4.9</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 20.4082%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-6"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster computational fluid dynamics performance in NASA TetrUSS<sup
          class="footnote footnote-number"
        >
          <a href="#footnote-2">1</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">4.5</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 22.2222%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-7"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster project build performance in Xcode<sup class="footnote footnote-number">
          <a href="#footnote-10">9</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" tyle="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">4</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 25%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-8"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster effects performance in Adobe After Effects<sup class="footnote footnote-number">
          <a href="#footnote-11">10</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" tyle="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">4</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 25%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-9"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster simulation performance in Houdini FX<sup class="footnote footnote-number">
          <a href="#footnote-3">2</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">3.3</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 30.303%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="standard-gallery-item-10"
      class="gallery-item"
      style="z-index: 0; opacity: 1; transform: translate(0px, 0px)"
    >
      <p class="disclaimer">
        Faster filter and function performance in Photoshop<sup class="footnote footnote-number">
          <a href="#footnote-12">11</a>
        </sup>
      </p>
      <div class="group total-column-1">
        <div class="bars-container">
          <div class="bar-content-container bar-mx">
            <div class="bar-mask" style="width: 100%">
              <hr class="bar bar-1" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with M2&nbsp;Ultra and <br class="small" />60‑core GPU</span
            >
          </div>
          <figure class="badge bar-mx">
            <div class="badge-content">
              <div class="badge-value-container">
                <span class="badge-value">3.2</span>
                <span class="badge-unit">x</span>
              </div>
              <span class="badge-caption"></span>
            </div>
          </figure>
          <div class="bar-content-container bar-baseline no-badge">
            <div class="bar-mask" style="width: 31.25%">
              <hr class="bar bar-2" />
            </div>
            <span class="bar-caption"
              >Mac&nbsp;Pro with 8-core Intel&nbsp;Xeon&nbsp;W and Radeon&nbsp;Pro&nbsp;W5500X
              (baseline)</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="graph-gallery-container">
    <ul class="tabnav-items">
      <li v-for="(language, index) in languages" :key="index" class="tabnav-item">
        <span class="tabnav-link current">{{ language.title }}</span>
      </li>
    </ul>

    <ul class="slide-container">
      <LanguageBar v-for="(language, index) in languages" :key="index" :language="language" />
    </ul>
  </div> -->
</template>

<script lang="ts" src="./LanguagesSection.ts"></script>
<style scoped src="./LanguagesSection.css"></style>
