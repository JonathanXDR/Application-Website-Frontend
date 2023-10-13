<template>
  <h2>{{ $t('components.containers.common.music') }}</h2>
  <LoadingSpinner v-else />

  <section class="section section-stations" data-analytics-section-engagement="name:stations">
    <div class="section-content">
      <h2 class="section-headline">
        Playlists and charts <br class="large" /><br class="medium" />that keep you in the&nbsp;mix.
      </h2>
    </div>
    <div
      id="stations"
      class="stations-gallery marquees-initialized mounted"
      data-component-list="Stations FadeGallery"
      data-anim-scroll-group="Stations"
      data-analytics-gallery-id="stations"
      data-locale="us"
      data-lang="en-US"
      aria-label="Apple Music playlists and albums gallery"
      data-cta-copy="Listen Now"
      data-rooms="[976405703, 978247996, 1457265756, 976405707, 1457265757]"
    >
      <div class="tablist-wrapper">
        <div class="tabnav" data-analytics-gallery-interaction-type="tabnav">
          <ul role="tablist" class="tabnav-items">
            <li role="presentation" class="tabnav-item current">
              <a
                href="#stations-item-a"
                id="stations-item-a-tabnav-trigger"
                data-ac-gallery-trigger="stations-item-a"
                class="tabnav-link current"
                role="tab"
                aria-controls="stations-item-a"
                tabindex="0"
                aria-selected="true"
                >New Music</a
              >
            </li>
            <li role="presentation" class="tabnav-item">
              <a
                href="#stations-item-b"
                id="stations-item-b-tabnav-trigger"
                data-ac-gallery-trigger="stations-item-b"
                class="tabnav-link"
                role="tab"
                aria-controls="stations-item-b"
                tabindex="-1"
                aria-selected="false"
                >From Our Editors</a
              >
            </li>
            <li role="presentation" class="tabnav-item">
              <a
                href="#stations-item-c"
                id="stations-item-c-tabnav-trigger"
                data-ac-gallery-trigger="stations-item-c"
                class="tabnav-link"
                role="tab"
                aria-controls="stations-item-c"
                tabindex="-1"
                aria-selected="false"
                >Fall Sounds</a
              >
            </li>
            <li role="presentation" class="tabnav-item">
              <a
                href="#stations-item-d"
                id="stations-item-d-tabnav-trigger"
                data-ac-gallery-trigger="stations-item-d"
                class="tabnav-link"
                role="tab"
                aria-controls="stations-item-d"
                tabindex="-1"
                aria-selected="false"
                >Daily Top 100</a
              >
            </li>
            <li role="presentation" class="tabnav-item">
              <a
                href="#stations-item-e"
                id="stations-item-e-tabnav-trigger"
                data-ac-gallery-trigger="stations-item-e"
                class="tabnav-link"
                role="tab"
                aria-controls="stations-item-e"
                tabindex="-1"
                aria-selected="false"
                >Just Updated</a
              >
            </li>
          </ul>
          <div class="tabnav-paddles">
            <button
              class="tabnav-paddle tabnav-paddle-left"
              aria-hidden="true"
              disabled=""
            ></button>
            <button
              class="tabnav-paddle tabnav-paddle-right"
              aria-hidden="true"
              disabled=""
            ></button>
          </div>
        </div>
      </div>
      <div class="stations-item-container">
        <style type="text/css">
          @media only screen and (min-width: 0px) {
            .stations-item-container {
              --tile-width: 234px;
            }
          }
          @media only screen and (max-width: 1068px) {
            .stations-item-container {
              --tile-width: 164px;
            }
          }
          @media only screen and (max-width: 735px) {
            .stations-item-container {
              --tile-width: 132px;
            }
          }
        </style>
        <div
          id="stations-item-a"
          class="stations-gallery-item current"
          data-ac-gallery-item=""
          data-analytics-gallery-item-id="stations-item-a"
          role="tabpanel"
          aria-labelledby="stations-item-a-tabnav-trigger"
          style="z-index: 2; opacity: 1; transform: translate(0px, 0px)"
        >
          <div
            class="marquee images-loading"
            data-component-list=" Marquee"
            style="transform: matrix(1, 0, 0, 1, -5179.51, 0)"
          >
            <ul class="marquee-list">
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-0" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/public-displays-of-affection-the-album/1645149934?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - public displays of affection: the album"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/234x234bb.jpg"
                        alt="Public Displays Of Affection: The Album - Muni Long"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Public Displays Of Affection: The Album</p>
                    <p class="marquee-subtitle">Muni Long</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-1" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/u-wasnt-there/1640175654?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - u wasn't there"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #545454">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/234x234bb.jpg"
                        alt="U Wasn't There - Cam'ron &amp; A-Trak"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">U Wasn't There</p>
                    <p class="marquee-subtitle">Cam'ron &amp; A-Trak</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-2" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/subject-to-change/1633771855?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - subject to change"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #426898">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/234x234bb.jpg"
                        alt="SUBJECT TO CHANGE - Kelsea Ballerini"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">SUBJECT TO CHANGE</p>
                    <p class="marquee-subtitle">Kelsea Ballerini</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-3" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/insecure/1643800804?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - insecure"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/234x234bb.jpg"
                        alt="Insecure - Inayah"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Insecure</p>
                    <p class="marquee-subtitle">Inayah</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-4" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/trick-city/1645446312?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - trick city"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #bfe2e8">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/234x234bb.jpg"
                        alt="Trick City - BigWalkDog"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Trick City</p>
                    <p class="marquee-subtitle">BigWalkDog</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-5" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/flawless-like-me/1645788846?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - flawless like me"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #faeaf4">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/234x234bb.jpg"
                        alt="FLAWLESS LIKE ME - LUCKI"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">FLAWLESS LIKE ME</p>
                    <p class="marquee-subtitle">LUCKI</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-6" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/through-the-madness-vol-2/1635839929?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - through the madness, vol. 2"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #a8acd1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/234x234bb.jpg"
                        alt="Through The Madness, Vol. 2 - Maddie &amp; Tae"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Through The Madness, Vol. 2</p>
                    <p class="marquee-subtitle">Maddie &amp; Tae</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-7" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/denim-diamonds/1623679372?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - denim &amp; diamonds"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e4e2d5">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/234x234bb.jpg"
                        alt="Denim &amp; Diamonds - Nikki Lane"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Denim &amp; Diamonds</p>
                    <p class="marquee-subtitle">Nikki Lane</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-8" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-lead-apple-music-up-next-film-edition-ep/1645974597?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the lead (apple music up next film edition) - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #cec5bc">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/234x234bb.jpg"
                        alt="The Lead (Apple Music Up Next Film Edition) - EP - FLO"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Lead (Apple Music Up Next Film Edition) - EP</p>
                    <p class="marquee-subtitle">FLO</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-9" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/5sos5/1622058554?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - 5sos5"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fbe6d1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/234x234bb.jpg"
                        alt="5SOS5 - 5 Seconds of Summer"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">5SOS5</p>
                    <p class="marquee-subtitle">5 Seconds of Summer</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-10" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/new-money/1645154455?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - new money"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #010101">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/234x234bb.jpg"
                        alt="New Money - Baby Money"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">New Money</p>
                    <p class="marquee-subtitle">Baby Money</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-11" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sad-songs-in-a-hotel-room-ep/1643033699?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sad songs in a hotel room - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #021519">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/234x234bb.jpg"
                        alt="Sad Songs In A Hotel Room - EP - Joshua Bassett"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sad Songs In A Hotel Room - EP</p>
                    <p class="marquee-subtitle">Joshua Bassett</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-12" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/baby-on-baby-2/1646164342?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - baby on baby 2"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #222d29">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/234x234bb.jpg"
                        alt="Baby On Baby 2 - DaBaby"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Baby On Baby 2</p>
                    <p class="marquee-subtitle">DaBaby</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-13" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/life-in-plastic-3/1646194487?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - life in plastic 3"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ff48a3">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/234x234bb.jpg"
                        alt="Life In Plastic 3 - DreamDoll"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Life In Plastic 3</p>
                    <p class="marquee-subtitle">DreamDoll</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-14" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/this-is-what-feels-like-vol-1-4/1640157064?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - this is what ____ feels like (vol. 1-4)"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #919392">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/234x234bb.jpg"
                        alt="this is what ____ feels like (Vol. 1-4) - JVKE"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">this is what ____ feels like (Vol. 1-4)</p>
                    <p class="marquee-subtitle">JVKE</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-15" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/doy/1645389068?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - doy"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #dcdcdc">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/234x234bb.jpg"
                        alt="DOY - P Yungin"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">DOY</p>
                    <p class="marquee-subtitle">P Yungin</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-16" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/god-save-the-animals/1621299044?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - god save the animals"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #8e9fb3">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/234x234bb.jpg"
                        alt="God Save the Animals - Alex G"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">God Save the Animals</p>
                    <p class="marquee-subtitle">Alex G</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-17" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sznz-autumn/1645304165?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sznz: autumn"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #020f13">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/234x234bb.jpg"
                        alt="SZNZ: Autumn - Weezer"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">SZNZ: Autumn</p>
                    <p class="marquee-subtitle">Weezer</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-18" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/apple-music-home-session-tate-mcrae/1646475591?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - apple music home session: tate mcrae"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e7e6eb">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/234x234bb.jpg"
                        alt="Apple Music Home Session: Tate McRae - Tate McRae"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Apple Music Home Session: Tate McRae</p>
                    <p class="marquee-subtitle">Tate McRae</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-19" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sad-romance/1640398383?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sad romance"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #d0ab99">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/234x234bb.jpg"
                        alt="Sad Romance - CKay"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sad Romance</p>
                    <p class="marquee-subtitle">CKay</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-20" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/moss/1631619212?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - moss"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e1ddd2">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/234x234bb.jpg"
                        alt="MOSS - Maya Hawke"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">MOSS</p>
                    <p class="marquee-subtitle">Maya Hawke</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-21" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-cage-ep/1635357251?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the cage - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/234x234bb.jpg"
                        alt="The Cage - EP - Billy Idol"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Cage - EP</p>
                    <p class="marquee-subtitle">Billy Idol</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-22">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/cyberkiss/1635470404?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - cyberkiss*"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfdfd">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/234x234bb.jpg"
                        alt="CYBERKISS* - BLACKSTARKIDS"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">CYBERKISS*</p>
                    <p class="marquee-subtitle">BLACKSTARKIDS</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-23">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/fitness-run-september-2022-dj-mix/1646132253?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - fitness: run, september 2022 (dj mix)"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ebf4f1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/234x234bb.jpg"
                        alt="Fitness: Run, September 2022 (DJ Mix) - Deorro"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Fitness: Run, September 2022 (DJ Mix)</p>
                    <p class="marquee-subtitle">Deorro</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-24">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/breathe/1628557880?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - breathe"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #007684">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/234x234bb.jpg"
                        alt="breathe - Chad Lawson"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">breathe</p>
                    <p class="marquee-subtitle">Chad Lawson</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-25">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-hum-goes-on-forever/1627556654?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the hum goes on forever"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #04090c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/234x234bb.jpg"
                        alt="The Hum Goes on Forever - The Wonder Years"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Hum Goes on Forever</p>
                    <p class="marquee-subtitle">The Wonder Years</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-26" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/blink-twice/1629710179?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - blink twice"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #dce5ea">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/234x234bb.jpg"
                        alt="Blink Twice - Arkells"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Blink Twice</p>
                    <p class="marquee-subtitle">Arkells</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-27" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-last-goodbye-remixes-n-1-ep/1642994193?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the last goodbye remixes n°.1 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/234x234bb.jpg"
                        alt="The Last Goodbye Remixes N°.1 - EP - ODESZA"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Last Goodbye Remixes N°.1 - EP</p>
                    <p class="marquee-subtitle">ODESZA</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-28" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hyper-relevisation/1635429293?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hyper relevisation"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #f4f4f4">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/234x234bb.jpg"
                        alt="hyper relevisation - Eve 6"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">hyper relevisation</p>
                    <p class="marquee-subtitle">Eve 6</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-29" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/caroline-shaw-evergreen/1631426571?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - caroline shaw: evergreen"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/234x234bb.jpg"
                        alt="Caroline Shaw: Evergreen - Caroline Shaw &amp; Attacca Quartet"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Caroline Shaw: Evergreen</p>
                    <p class="marquee-subtitle">Caroline Shaw &amp; Attacca Quartet</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-30" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/weather-alive/1622687182?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - weather alive"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #15181c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/234x234bb.jpg"
                        alt="Weather Alive - Beth Orton"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Weather Alive</p>
                    <p class="marquee-subtitle">Beth Orton</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-31" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/cry-havoc/1630290547?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - cry havoc!"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1f1f24">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/234x234bb.jpg"
                        alt="Cry Havoc! - Mobley"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Cry Havoc!</p>
                    <p class="marquee-subtitle">Mobley</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-32" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/come-on-sunshine/1624745043?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - come on sunshine"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #c4c3bf">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/234x234bb.jpg"
                        alt="Come on Sunshine - Kendell Marvel"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Come on Sunshine</p>
                    <p class="marquee-subtitle">Kendell Marvel</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-33" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/married-alone/1622065482?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - married alone"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/234x234bb.jpg"
                        alt="Married Alone - Sunny Sweeney"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Married Alone</p>
                    <p class="marquee-subtitle">Sunny Sweeney</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-34" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/thrive/1644945374?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - thrive"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #050402">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/234x234bb.jpg"
                        alt="Thrive - SLANDER"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Thrive</p>
                    <p class="marquee-subtitle">SLANDER</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-35" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/null/1622643191?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - null"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #190a0a">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/234x234bb.jpg"
                        alt="NULL - KEN mode"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">NULL</p>
                    <p class="marquee-subtitle">KEN mode</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-36" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hectic-amazon-dust-single/1639359361?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hectic / amazon dust - single"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/234x234bb.jpg"
                        alt="Hectic / Amazon Dust - Single - Robert Hood"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Hectic / Amazon Dust - Single</p>
                    <p class="marquee-subtitle">Robert Hood</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-37" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/ali/1632445912?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - ali"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #005f97">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/234x234bb.jpg"
                        alt="Ali - Vieux Farka Touré &amp; Khruangbin"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Ali</p>
                    <p class="marquee-subtitle">Vieux Farka Touré &amp; Khruangbin</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-38" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/revelator-ep/1641496645?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - revelator - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #19291f">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/234x234bb.jpg"
                        alt="Revelator - EP - Enamour"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Revelator - EP</p>
                    <p class="marquee-subtitle">Enamour</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-39" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/simple/1639217724?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - simple"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #f9f9f1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/234x234bb.jpg"
                        alt="Simple - Bethel Music"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Simple</p>
                    <p class="marquee-subtitle">Bethel Music</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-40" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/where-is-home-hae-ke-kae/1612504555?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - where is home / hae ke kae"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #c79a57">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/234x234bb.jpg"
                        alt="Where is Home / Hae ke Kae - Abel Selaocoe"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Where is Home / Hae ke Kae</p>
                    <p class="marquee-subtitle">Abel Selaocoe</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-41" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/chapter-1-things-were-not-saying-ep/1644227426?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - chapter 1: things we're not saying - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1f1714">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/234x234bb.jpg"
                        alt="Chapter 1: Things We're Not Saying - EP - Georgia Webster"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Chapter 1: Things We're Not Saying - EP</p>
                    <p class="marquee-subtitle">Georgia Webster</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-42" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/u-wanna-ep/1642813977?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - u wanna - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/234x234bb.jpg"
                        alt="U Wanna - EP - Procombo"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">U Wanna - EP</p>
                    <p class="marquee-subtitle">Procombo</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-43" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/jams-2-ep/1640582113?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - jams 2 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfdfd">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/234x234bb.jpg"
                        alt="jams 2 - EP - Luna Li"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">jams 2 - EP</p>
                    <p class="marquee-subtitle">Luna Li</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-44" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/open-source-records-volume-9-ep/1641165822?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - open source records volume 9 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #070707">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/234x234bb.jpg"
                        alt="Open Source Records Volume 9 - EP - DJ Hazy, Orlando Voorn &amp; Pat Hurley"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Open Source Records Volume 9 - EP</p>
                    <p class="marquee-subtitle">DJ Hazy, Orlando Voorn &amp; Pat Hurley</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-45" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hyper-dimensional-expansion-beam/1635377449?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hyper-dimensional expansion beam"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #102b46">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/234x234bb.jpg"
                        alt="Hyper-Dimensional Expansion Beam - The Comet Is Coming"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Hyper-Dimensional Expansion Beam</p>
                    <p class="marquee-subtitle">The Comet Is Coming</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-46" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sub-sonar-ep/1639695341?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sub-sonar - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fbfbfb">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/234x234bb.jpg"
                        alt="Sub-Sonar - EP - nthng"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sub-Sonar - EP</p>
                    <p class="marquee-subtitle">nthng</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-47" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/mirage/1618310562?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - mirage"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #030200">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/234x234bb.jpg"
                        alt="Mirage - Gaerea"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Mirage</p>
                    <p class="marquee-subtitle">Gaerea</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-48" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/honey-badger-ep/1642780281?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - honey badger - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfef9">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/234x234bb.jpg"
                        alt="Honey Badger - EP - Rhyw"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Honey Badger - EP</p>
                    <p class="marquee-subtitle">Rhyw</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-49" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/last-spa-on-earth/1623241791?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - last spa on earth"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #041e3c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/234x234bb.jpg"
                        alt="Last Spa on Earth - Divino Niño"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Last Spa on Earth</p>
                    <p class="marquee-subtitle">Divino Niño</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-50" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/conviction-ep/1642581676?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - conviction - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/234x234bb.jpg"
                        alt="Conviction - EP - Rob Strobe"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Conviction - EP</p>
                    <p class="marquee-subtitle">Rob Strobe</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-51" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/theres-only-black/1615949270?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - there's only black"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #030102">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/234x234bb.jpg"
                        alt="There's Only Black - Venom Inc."
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">There's Only Black</p>
                    <p class="marquee-subtitle">Venom Inc.</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-52" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/leap-day-ep/1640561797?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - leap day - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1e50a7">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/234x234bb.jpg"
                        alt="Leap Day - EP - Remember Sports"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Leap Day - EP</p>
                    <p class="marquee-subtitle">Remember Sports</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-53" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/warehouse-vol-1-ep/1641258356?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - warehouse vol. 1 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/234x234bb.jpg"
                        alt="Warehouse Vol. 1 - EP - Shan"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Warehouse Vol. 1 - EP</p>
                    <p class="marquee-subtitle">Shan</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-54" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/exister/1627786809?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - exister"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e9e9e9">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/234x234bb.jpg"
                        alt="Exister - The Soft Moon"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Exister</p>
                    <p class="marquee-subtitle">The Soft Moon</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-55" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/belgica-ep/1637587087?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - belgica - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/234x234bb.jpg"
                        alt="Belgica - EP - Helsmoortel"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Belgica - EP</p>
                    <p class="marquee-subtitle">Helsmoortel</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-56" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/fancy-feast-ep/1641566215?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - fancy feast - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #101012">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/234x234bb.jpg"
                        alt="Fancy Feast - EP - Maara"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Fancy Feast - EP</p>
                    <p class="marquee-subtitle">Maara</p>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="marquee-list clone">
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-0" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/public-displays-of-affection-the-album/1645149934?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - public displays of affection: the album"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/20/82/43/208243e5-4c2b-e2bb-eb21-8020f480f793/22UMGIM94909.rgb.jpg/234x234bb.jpg"
                        alt="Public Displays Of Affection: The Album - Muni Long"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Public Displays Of Affection: The Album</p>
                    <p class="marquee-subtitle">Muni Long</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-1" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/u-wasnt-there/1640175654?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - u wasn't there"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #545454">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/6d/7a/4a6d7add-5d86-122b-735c-e1602b9a8070/194690893834_cover.jpg/234x234bb.jpg"
                        alt="U Wasn't There - Cam'ron &amp; A-Trak"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">U Wasn't There</p>
                    <p class="marquee-subtitle">Cam'ron &amp; A-Trak</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-2" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/subject-to-change/1633771855?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - subject to change"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #426898">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/4f/2c/32/4f2c32bf-5a25-5c23-acf3-c92b7a388b0d/196925407298.jpg/234x234bb.jpg"
                        alt="SUBJECT TO CHANGE - Kelsea Ballerini"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">SUBJECT TO CHANGE</p>
                    <p class="marquee-subtitle">Kelsea Ballerini</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-3" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/insecure/1643800804?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - insecure"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/9c/8b/3e/9c8b3e3b-c0ba-c7a1-dabe-d1717b1f8a63/194690939457_cover.jpg/234x234bb.jpg"
                        alt="Insecure - Inayah"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Insecure</p>
                    <p class="marquee-subtitle">Inayah</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-4" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/trick-city/1645446312?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - trick city"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #bfe2e8">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/ac/7b/6a/ac7b6ab5-78ad-1a56-0a58-f742e7447b39/075679724137.jpg/234x234bb.jpg"
                        alt="Trick City - BigWalkDog"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Trick City</p>
                    <p class="marquee-subtitle">BigWalkDog</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-5" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/flawless-like-me/1645788846?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - flawless like me"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #faeaf4">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/27/a5/fc/27a5fcaa-f29f-a03e-41fa-b54ffe16f47e/194690946806_cover.jpg/234x234bb.jpg"
                        alt="FLAWLESS LIKE ME - LUCKI"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">FLAWLESS LIKE ME</p>
                    <p class="marquee-subtitle">LUCKI</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-6" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/through-the-madness-vol-2/1635839929?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - through the madness, vol. 2"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #a8acd1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d5/dc/ec/d5dcec8d-c53b-221c-4973-8ee9c64ad4e4/22UMGIM77979.rgb.jpg/234x234bb.jpg"
                        alt="Through The Madness, Vol. 2 - Maddie &amp; Tae"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Through The Madness, Vol. 2</p>
                    <p class="marquee-subtitle">Maddie &amp; Tae</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-7" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/denim-diamonds/1623679372?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - denim &amp; diamonds"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e4e2d5">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ee/10/54/ee105409-d396-c17a-9618-c4c6ca83338c/607396646739.png/234x234bb.jpg"
                        alt="Denim &amp; Diamonds - Nikki Lane"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Denim &amp; Diamonds</p>
                    <p class="marquee-subtitle">Nikki Lane</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-8" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-lead-apple-music-up-next-film-edition-ep/1645974597?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the lead (apple music up next film edition) - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #cec5bc">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/d6/a2/7e/d6a27eb2-d021-d1a2-426b-cb174fcc54b4/22UMGIM67844.rgb.jpg/234x234bb.jpg"
                        alt="The Lead (Apple Music Up Next Film Edition) - EP - FLO"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Lead (Apple Music Up Next Film Edition) - EP</p>
                    <p class="marquee-subtitle">FLO</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-9" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/5sos5/1622058554?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - 5sos5"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fbe6d1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/06/72/6e/06726e09-be9d-e6e5-9588-72e6e5dbdd61/4050538811070.jpg/234x234bb.jpg"
                        alt="5SOS5 - 5 Seconds of Summer"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">5SOS5</p>
                    <p class="marquee-subtitle">5 Seconds of Summer</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-10" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/new-money/1645154455?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - new money"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #010101">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ad/5f/a0/ad5fa028-1c7e-bb63-f21f-bf804c989bd1/22UMGIM89027.rgb.jpg/234x234bb.jpg"
                        alt="New Money - Baby Money"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">New Money</p>
                    <p class="marquee-subtitle">Baby Money</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-11" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sad-songs-in-a-hotel-room-ep/1643033699?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sad songs in a hotel room - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #021519">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2f/e8/e2/2fe8e298-594a-fcb8-9ba4-28dafaa39b5c/093624870197.jpg/234x234bb.jpg"
                        alt="Sad Songs In A Hotel Room - EP - Joshua Bassett"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sad Songs In A Hotel Room - EP</p>
                    <p class="marquee-subtitle">Joshua Bassett</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-12" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/baby-on-baby-2/1646164342?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - baby on baby 2"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #222d29">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/4d/5e/44/4d5e44e6-66d0-d4ae-ca96-e6d51c1c3475/22UM1IM06577.rgb.jpg/234x234bb.jpg"
                        alt="Baby On Baby 2 - DaBaby"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Baby On Baby 2</p>
                    <p class="marquee-subtitle">DaBaby</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-13" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/life-in-plastic-3/1646194487?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - life in plastic 3"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ff48a3">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e2/46/77/e246770e-7cc1-7683-c59f-f49aac73d819/093624871941.jpg/234x234bb.jpg"
                        alt="Life In Plastic 3 - DreamDoll"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Life In Plastic 3</p>
                    <p class="marquee-subtitle">DreamDoll</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-14" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/this-is-what-feels-like-vol-1-4/1640157064?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - this is what ____ feels like (vol. 1-4)"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #919392">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/5d/68/64/5d6864de-3809-0257-ceaa-9f7f1bbd1172/5056167175650_1.jpg/234x234bb.jpg"
                        alt="this is what ____ feels like (Vol. 1-4) - JVKE"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">this is what ____ feels like (Vol. 1-4)</p>
                    <p class="marquee-subtitle">JVKE</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-15" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/doy/1645389068?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - doy"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #dcdcdc">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/eb/84/c7/eb84c7ea-50b1-eed0-454c-3b005b97da76/22UMGIM98707.rgb.jpg/234x234bb.jpg"
                        alt="DOY - P Yungin"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">DOY</p>
                    <p class="marquee-subtitle">P Yungin</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-16" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/god-save-the-animals/1621299044?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - god save the animals"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #8e9fb3">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/82/d9/bb/82d9bbb3-0b7b-bb1d-9632-44bb2c70c744/887828050765.png/234x234bb.jpg"
                        alt="God Save the Animals - Alex G"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">God Save the Animals</p>
                    <p class="marquee-subtitle">Alex G</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-17" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sznz-autumn/1645304165?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sznz: autumn"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #020f13">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a9/aa/27/a9aa27da-e879-f126-6e82-a3ff06452ab7/075679753366.jpg/234x234bb.jpg"
                        alt="SZNZ: Autumn - Weezer"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">SZNZ: Autumn</p>
                    <p class="marquee-subtitle">Weezer</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-18" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/apple-music-home-session-tate-mcrae/1646475591?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - apple music home session: tate mcrae"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e7e6eb">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/17/e3/2f17e31b-7f48-b580-53e0-f891dc7adebc/196589496928.jpg/234x234bb.jpg"
                        alt="Apple Music Home Session: Tate McRae - Tate McRae"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Apple Music Home Session: Tate McRae</p>
                    <p class="marquee-subtitle">Tate McRae</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-19" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sad-romance/1640398383?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sad romance"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #d0ab99">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/02/fc/2e/02fc2ec4-2fad-b4e2-4cb7-83d7ace8a0bb/5054197321573.jpg/234x234bb.jpg"
                        alt="Sad Romance - CKay"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sad Romance</p>
                    <p class="marquee-subtitle">CKay</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-20" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/moss/1631619212?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - moss"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e1ddd2">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ae/90/0e/ae900ea7-efaf-c8f2-47ae-d5d2411c349f/810090090924.png/234x234bb.jpg"
                        alt="MOSS - Maya Hawke"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">MOSS</p>
                    <p class="marquee-subtitle">Maya Hawke</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-21" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-cage-ep/1635357251?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the cage - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/37/9b/d2/379bd281-52b8-6e90-a65a-91d419cad120/4050538821390.jpg/234x234bb.jpg"
                        alt="The Cage - EP - Billy Idol"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Cage - EP</p>
                    <p class="marquee-subtitle">Billy Idol</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-22" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/cyberkiss/1635470404?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - cyberkiss*"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfdfd">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/e1/30/53/e1305322-c99e-499c-0338-c0f112a910c0/196922119743_Cover.jpg/234x234bb.jpg"
                        alt="CYBERKISS* - BLACKSTARKIDS"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">CYBERKISS*</p>
                    <p class="marquee-subtitle">BLACKSTARKIDS</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-23" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/fitness-run-september-2022-dj-mix/1646132253?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - fitness: run, september 2022 (dj mix)"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ebf4f1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/a8/ef/de/a8efde4c-f19f-0b5a-41e1-4a3d319bcda9/dj.zcoejtym.png/234x234bb.jpg"
                        alt="Fitness: Run, September 2022 (DJ Mix) - Deorro"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Fitness: Run, September 2022 (DJ Mix)</p>
                    <p class="marquee-subtitle">Deorro</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-24" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/breathe/1628557880?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - breathe"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #007684">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/6c/24/d7/6c24d761-7b29-1348-1326-4d017fe9babb/22UMGIM60762.rgb.jpg/234x234bb.jpg"
                        alt="breathe - Chad Lawson"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">breathe</p>
                    <p class="marquee-subtitle">Chad Lawson</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-25" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-hum-goes-on-forever/1627556654?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the hum goes on forever"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #04090c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/50/e4/cb/50e4cb75-82a2-d1e2-fb44-77218a1451ea/1464.jpg/234x234bb.jpg"
                        alt="The Hum Goes on Forever - The Wonder Years"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Hum Goes on Forever</p>
                    <p class="marquee-subtitle">The Wonder Years</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-26" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/blink-twice/1629710179?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - blink twice"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #dce5ea">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/95/46/29/95462918-b894-d4d4-15a4-670fa6b2b939/22UMGIM64890.rgb.jpg/234x234bb.jpg"
                        alt="Blink Twice - Arkells"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Blink Twice</p>
                    <p class="marquee-subtitle">Arkells</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-27" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/the-last-goodbye-remixes-n-1-ep/1642994193?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - the last goodbye remixes n°.1 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/d1/d6/20d1d6cd-e3e4-f5d7-836e-6fac3eae185f/dj.gegdyjmf.png/234x234bb.jpg"
                        alt="The Last Goodbye Remixes N°.1 - EP - ODESZA"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">The Last Goodbye Remixes N°.1 - EP</p>
                    <p class="marquee-subtitle">ODESZA</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-28" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hyper-relevisation/1635429293?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hyper relevisation"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #f4f4f4">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/35/7b/51/357b513c-f660-f84a-fc81-06b9d3fa231b/794558906463.jpg/234x234bb.jpg"
                        alt="hyper relevisation - Eve 6"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">hyper relevisation</p>
                    <p class="marquee-subtitle">Eve 6</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-29" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/caroline-shaw-evergreen/1631426571?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - caroline shaw: evergreen"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/0e/f4/06/0ef40642-7902-dbb0-ae30-54c604620502/075597913491.jpg/234x234bb.jpg"
                        alt="Caroline Shaw: Evergreen - Caroline Shaw &amp; Attacca Quartet"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Caroline Shaw: Evergreen</p>
                    <p class="marquee-subtitle">Caroline Shaw &amp; Attacca Quartet</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-30" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/weather-alive/1622687182?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - weather alive"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #15181c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/a3/54/a5/a354a51b-31fb-3a76-f4dc-a241df55b6f0/720841302308.jpg/234x234bb.jpg"
                        alt="Weather Alive - Beth Orton"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Weather Alive</p>
                    <p class="marquee-subtitle">Beth Orton</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-31" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/cry-havoc/1630290547?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - cry havoc!"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1f1f24">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/20/62/55/206255d1-debc-11c7-e63b-c33f9780dcea/634164908935.png/234x234bb.jpg"
                        alt="Cry Havoc! - Mobley"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Cry Havoc!</p>
                    <p class="marquee-subtitle">Mobley</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-32" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/come-on-sunshine/1624745043?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - come on sunshine"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #c4c3bf">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/d6/88/30/d6883033-12e4-0e8b-de41-6c4a50ad95a1/28803.jpg/234x234bb.jpg"
                        alt="Come on Sunshine - Kendell Marvel"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Come on Sunshine</p>
                    <p class="marquee-subtitle">Kendell Marvel</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-33" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/married-alone/1622065482?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - married alone"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/9a/aa/aa/9aaaaa6b-84ed-1815-4daf-552f9ae14253/196626392879.jpg/234x234bb.jpg"
                        alt="Married Alone - Sunny Sweeney"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Married Alone</p>
                    <p class="marquee-subtitle">Sunny Sweeney</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-34" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/thrive/1644945374?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - thrive"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #050402">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/ec/8d/f5/ec8df5fd-96b8-b19d-2447-14425677a713/730530457035_cover.jpg/234x234bb.jpg"
                        alt="Thrive - SLANDER"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Thrive</p>
                    <p class="marquee-subtitle">SLANDER</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-35" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/null/1622643191?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - null"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #190a0a">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/c5/0b/23/c50b232d-c040-ef28-9216-fbff8f3d98b8/628070640799.jpg/234x234bb.jpg"
                        alt="NULL - KEN mode"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">NULL</p>
                    <p class="marquee-subtitle">KEN mode</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-36" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hectic-amazon-dust-single/1639359361?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hectic / amazon dust - single"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/3b/31/48/3b31484f-d0bb-470a-2425-ae98c7a2b11c/8718723201766.jpg/234x234bb.jpg"
                        alt="Hectic / Amazon Dust - Single - Robert Hood"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Hectic / Amazon Dust - Single</p>
                    <p class="marquee-subtitle">Robert Hood</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-37" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/ali/1632445912?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - ali"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #005f97">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/a5/48/75/a54875f3-4c06-8416-bca8-e6dd80841790/34636.jpg/234x234bb.jpg"
                        alt="Ali - Vieux Farka Touré &amp; Khruangbin"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Ali</p>
                    <p class="marquee-subtitle">Vieux Farka Touré &amp; Khruangbin</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-38" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/revelator-ep/1641496645?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - revelator - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #19291f">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/fc/e2/a6/fce2a6f6-2e84-59ea-0d58-0451f82c039f/5039060808795.png/234x234bb.jpg"
                        alt="Revelator - EP - Enamour"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Revelator - EP</p>
                    <p class="marquee-subtitle">Enamour</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-39" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/simple/1639217724?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - simple"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #f9f9f1">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/75/c3/e5/75c3e5de-7f01-b8e4-0a48-84b2bc44e3b0/dj.depzmpqk.png/234x234bb.jpg"
                        alt="Simple - Bethel Music"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Simple</p>
                    <p class="marquee-subtitle">Bethel Music</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-40" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/where-is-home-hae-ke-kae/1612504555?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - where is home / hae ke kae"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #c79a57">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/9a/6a/bc/9a6abc31-6060-15ef-8df4-58712c4ddd62/190296224324.jpg/234x234bb.jpg"
                        alt="Where is Home / Hae ke Kae - Abel Selaocoe"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Where is Home / Hae ke Kae</p>
                    <p class="marquee-subtitle">Abel Selaocoe</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-41" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/chapter-1-things-were-not-saying-ep/1644227426?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - chapter 1: things we're not saying - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1f1714">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/f5/af/4c/f5af4cf5-f75e-8331-b12a-57200fb506f6/196589446954.jpg/234x234bb.jpg"
                        alt="Chapter 1: Things We're Not Saying - EP - Georgia Webster"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Chapter 1: Things We're Not Saying - EP</p>
                    <p class="marquee-subtitle">Georgia Webster</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-42" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/u-wanna-ep/1642813977?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - u wanna - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/d2/ef/24/d2ef2400-14ae-766d-2907-1139a3137100/5060972804391.png/234x234bb.jpg"
                        alt="U Wanna - EP - Procombo"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">U Wanna - EP</p>
                    <p class="marquee-subtitle">Procombo</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-43" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/jams-2-ep/1640582113?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - jams 2 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfdfd">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/9d/d8/9a/9dd89a49-6df8-6edf-1e98-804029ec787d/5056167175766_1.jpg/234x234bb.jpg"
                        alt="jams 2 - EP - Luna Li"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">jams 2 - EP</p>
                    <p class="marquee-subtitle">Luna Li</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-44" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/open-source-records-volume-9-ep/1641165822?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - open source records volume 9 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #070707">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/88/11/4f/88114f6a-b623-17e5-b20e-b73c257cdb1e/8718723208659.jpg/234x234bb.jpg"
                        alt="Open Source Records Volume 9 - EP - DJ Hazy, Orlando Voorn &amp; Pat Hurley"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Open Source Records Volume 9 - EP</p>
                    <p class="marquee-subtitle">DJ Hazy, Orlando Voorn &amp; Pat Hurley</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-45" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/hyper-dimensional-expansion-beam/1635377449?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - hyper-dimensional expansion beam"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #102b46">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/e8/0b/15/e80b1567-face-82a2-a7ef-91b50964784f/22UMGIM77927.rgb.jpg/234x234bb.jpg"
                        alt="Hyper-Dimensional Expansion Beam - The Comet Is Coming"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Hyper-Dimensional Expansion Beam</p>
                    <p class="marquee-subtitle">The Comet Is Coming</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-46" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/sub-sonar-ep/1639695341?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - sub-sonar - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fbfbfb">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/8c/37/958c371d-4401-ff1e-b70f-0dabecdf5669/8720246792362.jpg/234x234bb.jpg"
                        alt="Sub-Sonar - EP - nthng"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Sub-Sonar - EP</p>
                    <p class="marquee-subtitle">nthng</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-47" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/mirage/1618310562?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - mirage"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #030200">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ac/63/b2/ac63b2a8-003a-6265-d832-bdb2ac6bd17a/822603166903.jpg/234x234bb.jpg"
                        alt="Mirage - Gaerea"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Mirage</p>
                    <p class="marquee-subtitle">Gaerea</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-48" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/honey-badger-ep/1642780281?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - honey badger - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #fdfef9">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/01/09/38/0109383d-8f9c-7503-4307-6fcbfa5661ce/8718723209298.jpg/234x234bb.jpg"
                        alt="Honey Badger - EP - Rhyw"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Honey Badger - EP</p>
                    <p class="marquee-subtitle">Rhyw</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-49" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/last-spa-on-earth/1623241791?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - last spa on earth"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #041e3c">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/cb/b6/46/cbb6466b-6ac7-a2ae-97ac-48d5ec44c75b/34533.jpg/234x234bb.jpg"
                        alt="Last Spa on Earth - Divino Niño"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Last Spa on Earth</p>
                    <p class="marquee-subtitle">Divino Niño</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-50" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/conviction-ep/1642581676?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - conviction - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4c/58/77/4c587799-5ccf-88ad-bf28-a6674c168e1b/0633726534582.jpg/234x234bb.jpg"
                        alt="Conviction - EP - Rob Strobe"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Conviction - EP</p>
                    <p class="marquee-subtitle">Rob Strobe</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-51" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/theres-only-black/1615949270?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - there's only black"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #030102">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/27/38/b7/2738b71e-f9da-3317-a4f2-cfad01626c3f/cover.jpg/234x234bb.jpg"
                        alt="There's Only Black - Venom Inc."
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">There's Only Black</p>
                    <p class="marquee-subtitle">Venom Inc.</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-52" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/leap-day-ep/1640561797?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - leap day - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #1e50a7">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/e6/b2/73/e6b273de-a5e9-962c-bb7f-f04296d47be9/35416.jpg/234x234bb.jpg"
                        alt="Leap Day - EP - Remember Sports"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Leap Day - EP</p>
                    <p class="marquee-subtitle">Remember Sports</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-53" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/warehouse-vol-1-ep/1641258356?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - warehouse vol. 1 - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #ffffff">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/2f/87/25/2f8725fe-27d4-af12-3c46-d6dd490c1671/4251804149570_3000.jpg/234x234bb.jpg"
                        alt="Warehouse Vol. 1 - EP - Shan"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Warehouse Vol. 1 - EP</p>
                    <p class="marquee-subtitle">Shan</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-54" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/exister/1627786809?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - exister"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #e9e9e9">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/a3/39/f5/a339f5f6-2a40-f4e6-2127-5712d0d995ea/34162.jpg/234x234bb.jpg"
                        alt="Exister - The Soft Moon"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Exister</p>
                    <p class="marquee-subtitle">The Soft Moon</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-55" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/belgica-ep/1637587087?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - belgica - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #000000">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/56/04/2d/56042dc9-2897-848e-348e-b901a38659d6/0502485601814.jpg/234x234bb.jpg"
                        alt="Belgica - EP - Helsmoortel"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Belgica - EP</p>
                    <p class="marquee-subtitle">Helsmoortel</p>
                  </div>
                </a>
              </li>
              <li class="marquee-tile" data-id="stations-item-a-marquee-tile-56" aria-hidden="true">
                <a
                  class="marquee-link"
                  href="https://web.archive.org/web/20220928042411mp_/https://music.apple.com/us/album/fancy-feast-ep/1641566215?itscg=10000&amp;itsct=mus-0-ovp-music_river-apl-220405"
                  data-analytics-title="listen now - fancy feast - ep"
                  data-analytics-exit-link=""
                  data-rid-relay='{"300":"itsct"}'
                  tabindex="-1"
                >
                  <div class="marquee-hover-container">
                    <picture class="marquee-picture" style="background-color: #101012">
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/132x132bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/264x264bb.jpg 2x
                        "
                        media="(max-width:735px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/164x164bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/328x328bb.jpg 2x
                        "
                        media="(max-width:1068px)"
                      />
                      <source
                        srcset="
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/234x234bb.jpg,
                          /web/20220928042411oe_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/468x468bb.jpg 2x
                        "
                        media="(min-width:0px)"
                      />
                      <img
                        class="marquee-picture-img"
                        src="https://web.archive.org/web/20220928042411im_/https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/9e/ea/c4/9eeac416-4b80-04b1-6f29-24d6408fa3c8/840200513562_cover.jpg/234x234bb.jpg"
                        alt="Fancy Feast - EP - Maara"
                      />
                    </picture>
                    <div class="marquee-hover-content">
                      <span class="marquee-cta icon icon-after icon-playsolid">Listen Now</span>
                    </div>
                  </div>
                  <div class="marquee-copy typography-show-title-copy">
                    <p class="marquee-title">Fancy Feast - EP</p>
                    <p class="marquee-subtitle">Maara</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="control-container">
        <button
          class="play-pause-button play-pause-marquees-button playing"
          data-analytics-intrapage-link=""
          data-aria-playing="pause playlist marquees"
          data-aria-paused="play playlist marquees"
          data-analytics-title-play="play | playlist marquees"
          data-analytics-title-pause="pause | playlist marquees"
          data-analytics-click="prop3:play | playlist marquees"
          data-analytics-title="play | playlist marquees"
          aria-label="pause playlist marquees"
        >
          <span class="control-icon play-icon">
            <svg viewBox="0 0 85 85">
              <use
                xlink:href="/web/20220928042411im_/https://www.apple.com/apple-music/#play-icon"
              ></use>
            </svg>
          </span>
          <span class="control-icon pause-icon">
            <svg viewBox="0 0 85 85">
              <use
                xlink:href="/web/20220928042411im_/https://www.apple.com/apple-music/#pause-icon"
              ></use>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./MusicSection.ts"></script>
<style scoped src="./MusicSection.css"></style>
