<template>
  <div class="section-content">
    <h3 class="typography-magical-headline">
      <!-- {{ $t('components.containers.common.music') }} -->
      Playlists and charts <br />that keep me in the&nbsp;mix.
    </h3>
    <!-- <LoadingSpinner /> -->
  </div>

  <div class="dynamic-gallery marquees-initialized">
    <TabList />

    <div
      class="dynamic-gallery-item-container apple-music dynamic-gallery-item-container--default"
    >
      <div id="dynamic-gallery-item-a" class="dynamic-gallery-item">
        <div
          class="marquee images-loading"
          style="
            will-change: transform;
            transform: matrix(1, 0, 0, 1, -909.553, 0);
          "
        >
          <ul class="marquee-list">
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5?itscg=10000&amp;itsct=mus-0-mus_fam-posn1_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #131314"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/cf/6c/ea/cf6cead6-c787-8582-834d-706733af4dca/73853971-969b-44bb-a796-775558a9ed5d.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Rap Life - Apple Music Hip-Hop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        :colors="{
                          primary: 'var(--color-fill)',
                        }"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Rap Life</p>
                  <p class="marquee-subtitle">Apple Music Hip-Hop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/dale-play/pl.4b364b8b182f4115acbf6deb83bd5222?itscg=10000&amp;itsct=mus-0-mus_fam-posn2_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #4b0601"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/c6/32/10/c63210e5-b74c-42ae-9771-959d77e7f11f/26cf9150-966d-4650-8a50-16cd57f37c04.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="¡Dale Play! - Apple Music Pop Latino"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">¡Dale Play!</p>
                  <p class="marquee-subtitle">Apple Music Pop Latino</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/a-list-pop/pl.5ee8333dbe944d9f9151e97d92d1ead9?itscg=10000&amp;itsct=mus-0-mus_fam-posn3_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #0439c0"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/38/ef/8f/38ef8f5e-b876-d1e4-a926-7de81cedc556/0079e905-7fb7-4417-81fb-eb3cafc74511.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="A-List Pop - Apple Music Pop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">A-List Pop</p>
                  <p class="marquee-subtitle">Apple Music Pop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/r-b-now/pl.b7ae3e0a28e84c5c96c4284b6a6c70af?itscg=10000&amp;itsct=mus-0-mus_fam-posn4_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #010101"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/ad/b5/f0/adb5f013-db4d-3784-6cda-d59017381b27/f6c0c55b-75d6-4bcc-8abf-daed8e938bc4.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="R&amp;B Now - Apple Music R&amp;B"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">R&amp;B Now</p>
                  <p class="marquee-subtitle">Apple Music R&amp;B</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/dancexl/pl.6bf4415b83ce4f3789614ac4c3675740?itscg=10000&amp;itsct=mus-0-mus_fam-posn5_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #000000"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/87/42/2a/87422af4-71b6-8860-9585-7b3a57f78ad7/e9d76023-64e0-41d1-ada4-d9fa1b1b60ba.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="danceXL - Apple Music Dance"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">danceXL</p>
                  <p class="marquee-subtitle">Apple Music Dance</p>
                </div>
              </a>
            </li>
          </ul>
          <ul class="marquee-list clone">
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5?itscg=10000&amp;itsct=mus-0-mus_fam-posn1_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #131314"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/cf/6c/ea/cf6cead6-c787-8582-834d-706733af4dca/73853971-969b-44bb-a796-775558a9ed5d.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Rap Life - Apple Music Hip-Hop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Rap Life</p>
                  <p class="marquee-subtitle">Apple Music Hip-Hop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/dale-play/pl.4b364b8b182f4115acbf6deb83bd5222?itscg=10000&amp;itsct=mus-0-mus_fam-posn2_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #4b0601"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/c6/32/10/c63210e5-b74c-42ae-9771-959d77e7f11f/26cf9150-966d-4650-8a50-16cd57f37c04.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="¡Dale Play! - Apple Music Pop Latino"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">¡Dale Play!</p>
                  <p class="marquee-subtitle">Apple Music Pop Latino</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/a-list-pop/pl.5ee8333dbe944d9f9151e97d92d1ead9?itscg=10000&amp;itsct=mus-0-mus_fam-posn3_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #0439c0"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/38/ef/8f/38ef8f5e-b876-d1e4-a926-7de81cedc556/0079e905-7fb7-4417-81fb-eb3cafc74511.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="A-List Pop - Apple Music Pop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">A-List Pop</p>
                  <p class="marquee-subtitle">Apple Music Pop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/r-b-now/pl.b7ae3e0a28e84c5c96c4284b6a6c70af?itscg=10000&amp;itsct=mus-0-mus_fam-posn4_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #010101"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/ad/b5/f0/adb5f013-db4d-3784-6cda-d59017381b27/f6c0c55b-75d6-4bcc-8abf-daed8e938bc4.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="R&amp;B Now - Apple Music R&amp;B"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">R&amp;B Now</p>
                  <p class="marquee-subtitle">Apple Music R&amp;B</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/dancexl/pl.6bf4415b83ce4f3789614ac4c3675740?itscg=10000&amp;itsct=mus-0-mus_fam-posn5_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #000000"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/87/42/2a/87422af4-71b6-8860-9585-7b3a57f78ad7/e9d76023-64e0-41d1-ada4-d9fa1b1b60ba.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="danceXL - Apple Music Dance"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">danceXL</p>
                  <p class="marquee-subtitle">Apple Music Dance</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/pure-meditation/pl.e896478fdf824a93ab2f99165c3a1422?itscg=10000&amp;itsct=mus-0-mus_fam-posn6_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #e52a56"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/3e/a3/7e/3ea37ed4-945e-7937-0791-dc0c9c9df9c3/U0MtTVMtV1ctUHVyZV9NZWRpdGF0aW9uLUFEQU1fSUQ9OTc2NDQ3NjgzLnBuZw.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Pure Meditation - Apple Music Wellbeing"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Pure Meditation</p>
                  <p class="marquee-subtitle">Apple Music Wellbeing</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/alt-ctrl/pl.0b593f1142b84a50a2c1e7088b3fb683?itscg=10000&amp;itsct=mus-0-mus_fam-posn7_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #2e292b"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/da/34/d2/da34d21d-f543-001b-4450-a294ca4f0ee7/fcb03152-be89-4eaf-a1a8-6be107f22e6d.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="ALT CTRL - Apple Music Alternative"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">ALT CTRL</p>
                  <p class="marquee-subtitle">Apple Music Alternative</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/puro-pop/pl.2754a2d6e0084e2b8106fcd35fef6492?itscg=10000&amp;itsct=mus-0-mus_fam-posn8_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #fae11d"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/cf/40/62/cf406282-492f-c243-11a5-7143d1af96e5/deab0b3f-b9ea-4904-a707-465a9f752f02.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Puro Pop - Apple Music Pop Latino"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Puro Pop</p>
                  <p class="marquee-subtitle">Apple Music Pop Latino</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/superbloom/pl.78ee237116dc46f1a5a3d8916b4a28fc?itscg=10000&amp;itsct=mus-0-mus_fam-posn9_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #fc4308"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/b8/e5/39/b8e53971-6fce-6f27-8631-6ae236f5eade/930a942c-ccfa-4011-bba1-de6714468ff8.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Superbloom - Apple Music Pop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Superbloom</p>
                  <p class="marquee-subtitle">Apple Music Pop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/high-maintenance/pl.8573a92705fe4253af597147d7cb981f?itscg=10000&amp;itsct=mus-0-mus_fam-posn10_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #af6746"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/3e/17/87/3e178780-d6f1-85a1-e342-9577a9ba965b/U0MtTVMtV1ctSGlnaF9NYWludGVuYW5jZS1hZGFtPTE1MDA3MjMxODMtTm9fTG9nby5wbmc.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="High Maintenance - Apple Music"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">High Maintenance</p>
                  <p class="marquee-subtitle">Apple Music</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/africa-now/pl.a0794db8bc6f45888834fa708a674987?itscg=10000&amp;itsct=mus-0-mus_fam-posn11_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #e4a864"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/0f/9e/58/0f9e5842-bf86-324d-6de8-2e4b35ec2235/77777270-f4ee-45b9-b103-d3df147eb75a.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Africa Now - Apple Music African"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Africa Now</p>
                  <p class="marquee-subtitle">Apple Music African</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/todays-hits/pl.f4d106fed2bd41149aaacabb233eb5eb?itscg=10000&amp;itsct=mus-0-mus_fam-posn12_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #b98740"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/03/86/dd/0386ddd4-711a-c7fb-7446-34433b78512e/26c526e3-ed70-45e0-9157-089471a7673b.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Today’s Hits - Apple Music Hits"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Today’s Hits</p>
                  <p class="marquee-subtitle">Apple Music Hits</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/the-a-list-k-pop/pl.48229b41bbfc47d7af39dae8e8b5276e?itscg=10000&amp;itsct=mus-0-mus_fam-posn13_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #7400e4"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/af/81/df/af81df78-c9a8-9689-12ab-889e82d5d8ba/7233fc40-2c3b-492c-8c31-ad91d8328eee.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="The A-List: K-Pop - Apple Music K-Pop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">The A-List: K-Pop</p>
                  <p class="marquee-subtitle">Apple Music K-Pop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/family-pop/pl.cd835923714f47f295c08470b18e8891?itscg=10000&amp;itsct=mus-0-mus_fam-posn14_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #f399ac"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/97/b7/f3/97b7f335-4930-61da-1561-7222d62e3bbf/U0MtTVMtV1ctRmFtaWx5X1BvcC1BREFNX0lEPTk3NjQ1MTcwNi5wbmc.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Family Pop - Apple Music Family"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Family Pop</p>
                  <p class="marquee-subtitle">Apple Music Family</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/punjabi-hits/pl.35b8520d9d6a486d9bf5c1b3331165b2?itscg=10000&amp;itsct=mus-0-mus_fam-posn15_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #d9d9d9"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/5f/76/0e/5f760e1d-b095-a3ac-1d94-2786b102e129/d03ee1a8-6888-4055-83e8-97df33539acd.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Punjabi Hits - Apple Music Punjabi"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Punjabi Hits</p>
                  <p class="marquee-subtitle">Apple Music Punjabi</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/la-oficial/pl.daca4fa353174d7493a2394f03f623ea?itscg=10000&amp;itsct=mus-0-mus_fam-posn16_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #0027ec"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/48/eb/c6/48ebc68b-c5b5-e250-5eeb-6712f890fbb7/1493454c-120a-4e3e-a529-c19e137e4976.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="La Oficial - Apple Music Música Mexicana"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">La Oficial</p>
                  <p class="marquee-subtitle">Apple Music Música Mexicana</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/todays-country/pl.87bb5b36a9bd49db8c975607452bfa2b?itscg=10000&amp;itsct=mus-0-mus_fam-posn17_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #efece7"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/0a/c2/78/0ac27819-0452-fe87-b159-a17849c312f9/95d2017e-b13f-4270-959b-150ad25c59a7.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="Today’s Country - Apple Music Country"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">Today’s Country</p>
                  <p class="marquee-subtitle">Apple Music Country</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/onrepeat/pl.426a1044619f47d6b1f86b3f79ecf857?itscg=10000&amp;itsct=mus-0-mus_fam-posn18_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #000000"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/d3/40/3c/d3403caa-ce41-011c-da48-c8edd692c16a/39cf2216-3c5c-45a4-b687-0350abe4d4a4.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="#OnRepeat - Apple Music Hip-Hop"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">#OnRepeat</p>
                  <p class="marquee-subtitle">Apple Music Hip-Hop</p>
                </div>
              </a>
            </li>
            <li class="marquee-tile">
              <a
                class="marquee-link"
                href="https://music.apple.com/us/playlist/new-music-daily/pl.2b0e6e332fdf4b7a91164da3162127b5?itscg=10000&amp;itsct=mus-0-mus_fam-posn19_stm-apl-avl-200130"
              >
                <div class="marquee-hover-container">
                  <picture
                    class="marquee-picture"
                    style="background-color: #373737"
                  >
                    <img
                      class="marquee-picture-img"
                      src="https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/4b/32/f5/4b32f58d-0a7b-3783-bd22-2fa278771657/2e05ed3e-7df0-4a28-af26-543a9ecc18a1.png/3744x3744SC.DN01.jpg?l=en-US"
                      alt="New Music Daily - Apple Music"
                    />
                  </picture>
                  <div class="marquee-hover-content">
                    <span class="marquee-cta"
                      >Listen now
                      <Icon
                        name="play.circle.fill"
                        style="padding-left: 0.3em"
                        class="icon icon-large"
                    /></span>
                  </div>
                </div>
                <div class="marquee-copy typography-show-title-copy">
                  <p class="marquee-title">New Music Daily</p>
                  <p class="marquee-subtitle">Apple Music</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="control-container mediaobject-enhanced">
      <button
        class="play-pause-button play-pause-marquees-button has-background playing"
      >
        <span class="control-icon play-icon">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 85 85"
            width="27"
            height="27"
          >
            <defs>
              <g id="play-icon">
                <path
                  d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
                ></path>
                <path
                  d="M55.73,41.55c0.3,0.45,0.3,1.03,0,1.48c-0.11,0.23-0.29,0.41-0.52,0.52L35.27,56.1c-0.23,0.12-0.48,0.17-0.74,0.15 c-0.8-0.03-1.45-0.68-1.48-1.48v-25c-0.01-0.26,0.07-0.52,0.22-0.74c0.11-0.23,0.29-0.41,0.52-0.52c0.22-0.15,0.48-0.23,0.74-0.22 c0.25,0.01,0.5,0.06,0.74,0.15L55.21,41c0.21,0.16,0.39,0.36,0.52,0.59"
                ></path>
              </g>
            </defs>
            <g fill="currentColor">
              <path
                d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
              ></path>
              <path
                d="M55.73,41.55c0.3,0.45,0.3,1.03,0,1.48c-0.11,0.23-0.29,0.41-0.52,0.52L35.27,56.1c-0.23,0.12-0.48,0.17-0.74,0.15 c-0.8-0.03-1.45-0.68-1.48-1.48v-25c-0.01-0.26,0.07-0.52,0.22-0.74c0.11-0.23,0.29-0.41,0.52-0.52c0.22-0.15,0.48-0.23,0.74-0.22 c0.25,0.01,0.5,0.06,0.74,0.15L55.21,41c0.21,0.16,0.39,0.36,0.52,0.59"
              ></path>
            </g>
          </svg>
        </span>
        <span class="control-icon pause-icon">
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 85 85"
            width="27"
            height="27"
          >
            <defs>
              <g id="pause-icon">
                <path
                  d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
                ></path>
                <path
                  d="M50,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C48,29.15,48.9,28.25,50,28.25z"
                ></path>
                <path
                  d="M35,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C33,29.15,33.9,28.25,35,28.25z"
                ></path>
              </g>
            </defs>
            <g fill="currentColor">
              <path
                d="M42.5,84.5c-23.16,0-42-18.84-42-42c0-23.16,18.84-42,42-42c23.16,0,42,18.84,42,42C84.5,65.66,65.66,84.5,42.5,84.5z M42.5,4.5c-20.95,0-38,17.05-38,38s17.05,38,38,38s38-17.05,38-38S63.45,4.5,42.5,4.5z"
              ></path>
              <path
                d="M50,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C48,29.15,48.9,28.25,50,28.25z"
              ></path>
              <path
                d="M35,28.25c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2s-2-0.9-2-2v-24C33,29.15,33.9,28.25,35,28.25z"
              ></path>
            </g>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Icon from "~/components/common/Icon.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import TabList from "~/components/common/TabList.vue";

export default defineComponent({
  name: "MusicSection",
  components: {
    LoadingSpinner,
    Icon,
    TabList,
  },
  setup() {
    const { tm } = useI18n();

    return {
      tm,
    };
  },
});

// function (t, e, i) {
//   'use strict';
//   const s = i(3),
//     r = i(94),
//     n = i(46),
//     a = i(124),
//     o = i(17).PictureLazyLoading,
//     h = i(47);
//   i(125);
//   ({
//     initialize: function () {
//       this.initBubbleGum(), h.init(), this.setupSystemLinks();
//     },
//     initBubbleGum: function () {
//       Object.assign(n, {
//         DynamicGallery: i(146),
//         Marquee: i(156),
//         StaticMarquee: i(157),
//         InlineVideo: i(158),
//       });
//       const t = document.querySelector('.main');
//       new r(t).anim.on(s.EVENTS.ON_DOM_KEYFRAMES_CREATED, () => {
//         new o();
//       }),
//         a.detect();
//     },
//     setupSystemLinks: function () {
//       if (document.documentElement.classList.contains('apple-one-eligible')) {
//         document.querySelectorAll('.button-try-apple-one').forEach((t) => {
//           const e = t.dataset.appStore;
//           t.addEventListener('click', (t) => {
//             (location.href = e), t.preventDefault();
//           });
//         });
//       }
//     },
//   }).initialize();
// },

// function (t, e, i) {
//   'use strict';
//   var s = i(50),
//     r = s(i(10)),
//     n = i(147),
//     a = s(i(148)),
//     o = s(i(153)),
//     h = s(i(16)),
//     l = s(i(29)),
//     c = s(i(54));
//   const {
//     TIME_OUT: u,
//     TILE_COUNT_MINIMUM: d,
//     NUMBER_OF_MARQUEE_ROWS: p,
//     VIEWPORT_MEDIA_QUERIES: m,
//     GET_IMG_WIDTHS: f,
//     GET_IMG_HEIGHTS: _,
//   } = i(53);
//   class g extends r.default {
//     constructor(t) {
//       super(t),
//         (this.config = this.el.getAttribute('data-endpoint')),
//         (this.apiBaseURL = this.el.getAttribute('data-base-api-url')),
//         (this.apiSecondaryURL = this.el.getAttribute(
//           'data-secondary-api-url'
//         ));
//       const e = document.querySelector('meta[property="apple-all-token"]');
//       (this.developerToken = e ? e.getAttribute('content') : null),
//         (this.configData = (0, n.getConfig)(
//           this.config,
//           this.apiBaseURL,
//           this.apiSecondaryURL,
//           this.developerToken
//         )),
//         (this.itemContainer = this.el.querySelector(
//           '.dynamic-gallery-item-container'
//         )),
//         (this.ctaCopy = this.el.dataset.ctaCopy),
//         (this.watchNowText = this.el.dataset.watchNow),
//         (this.previewNowText = this.el.dataset.previewNow),
//         (this.timeText = this.el.dataset.timeText || 'minutes'),
//         (this.tileFormat = this.el.dataset.tileFormat
//           ? this.el.dataset.tileFormat.toUpperCase()
//           : 'DEFAULT'),
//         this.itemContainer.classList.add(
//           this.config,
//           `dynamic-gallery-item-container--${this.tileFormat.toLowerCase()}`
//         ),
//         (this.galleryItemCount = 0),
//         (this.marquees = []);
//     }
//     mounted() {
//       this.addTileStyles(),
//         'apple-fitness' === this.config
//           ? this.fetchMultipleEndpointData()
//           : this.fetchSingleEndpointData();
//     }
//     fetchSingleEndpointData() {
//       (0, a.default)(this.configData)
//         .then((t) => {
//           (0, l.default)(t.successMessage),
//             t.successMessage && this.normalizeData(t);
//         })
//         .catch((t) => {
//           (0, h.default)(t), this.removeDynamicGallery();
//         });
//     }
//     fetchMultipleEndpointData() {
//       const { secondaryUrl: t = '' } = this.configData;
//       let e, i, s, r;
//       (0, a.default)(this.configData)
//         .then((i) => {
//           if (
//             ((0, l.default)(i.successMessage), 'apple-tv' === this.config)
//           ) {
//             this.collectionData = i.response.data.items;
//             const e = this.collectionData.map((t) => t.id);
//             r = `${t}&ids=${e.join(',')}`;
//           } else
//             'apple-fitness' === this.config &&
//               ((e = i.response.data[0].relationships.contents.data.filter(
//                 (t) => t.attributes && t.attributes.artworks
//               )),
//               (r = t));
//           return (0, a.default)({ ...this.configData, url: r });
//         })
//         .then((t) => {
//           'apple-fitness' === this.config
//             ? ((i = t.response.data[0].relationships.contents.data.filter(
//                 (t) => t.attributes && t.attributes.artworks
//               )),
//               (s = ((...t) => {
//                 const e = [];
//                 for (let i = 0; i < Math.max(...t.map((t) => t.length)); i++)
//                   t.forEach((t) => {
//                     void 0 !== t[i] && e.push(t[i]);
//                   });
//                 return e;
//               })(e, i)))
//             : (s = t),
//             t.successMessage &&
//               ((0, l.default)(t.successMessage), this.normalizeData(s));
//         })
//         .catch((t) => {
//           (0, h.default)(t), this.removeDynamicGallery();
//         });
//     }
//     normalizeData(t) {
//       let e = null,
//         i = null;
//       if (
//         ('apple-tv' === this.config
//           ? (i = t.response.data.shelf.items)
//           : 'apple-fitness' === this.config
//           ? (i = t)
//           : 'apple-music' === this.config
//           ? (i = t.response.data[0].relationships.contents.data)
//           : 'apple-arcade' === this.config
//           ? ((e =
//               t.response.data[0].relationships.tabs.data[0].relationships
//                 .children.data),
//             (i = e.find((t) => '418' === t.attributes.editorialElementKind)
//               .relationships.contents.data))
//           : 'apple-podcasts' === this.config
//           ? (i = t.response.results.podcasts[0].data)
//           : 'apple-books' === this.config
//           ? (i = t.response.data[0].relationships.contents.data)
//           : 'apple-news' === this.config &&
//             ((i = t.response), (i = i.filter((t) => t.imageURLs.small))),
//         !i)
//       )
//         return;
//       const s = i.map((t, e) => {
//           var i, s, r, n, a, o, h, l, c, u, d, p, m, f, _;
//           const g = `dynamic-gallery-item-${(e + 10).toString(36)}`,
//             b =
//               t.imageURLs && t.imageURLs.small ? t.imageURLs.small['1x'] : '',
//             y =
//               (null === (i = t.images) ||
//               void 0 === i ||
//               null === (s = i.coverArt16X9) ||
//               void 0 === s
//                 ? void 0
//                 : s.url) || '',
//             v =
//               t.genres && t.genres[0] && t.genres[0].name
//                 ? t.genres[0].name
//                 : '',
//             E = t.releaseDate || '';
//           return (null !== (r = t.attributes) && void 0 !== r && r.artwork) ||
//             (null !== (n = t.attributes) && void 0 !== n && n.artworks)
//             ? {
//                 attributes: t.attributes,
//                 galleryItemID: g,
//                 relationships: t.relationships || '',
//               }
//             : {
//                 attributes: {
//                   artwork: {
//                     url:
//                       (null === (a = t.images) ||
//                       void 0 === a ||
//                       null === (o = a.shelfImage) ||
//                       void 0 === o
//                         ? void 0
//                         : o.url) ||
//                       (null === (h = t.attributes) ||
//                       void 0 === h ||
//                       null === (l = h.platformAttributes) ||
//                       void 0 === l
//                         ? void 0
//                         : l.ios.editorialArtwork.topShelf.url) ||
//                       b ||
//                       y ||
//                       '',
//                     bgColor:
//                       (null === (c = t.images) ||
//                       void 0 === c ||
//                       null === (u = c.shelfImage) ||
//                       void 0 === u
//                         ? void 0
//                         : u.joeColor) ||
//                       (null === (d = t.attributes) ||
//                       void 0 === d ||
//                       null === (p = d.platformAttributes) ||
//                       void 0 === p
//                         ? void 0
//                         : p.ios.editorialArtwork.topShelf.bgColor) ||
//                       '',
//                   },
//                   name:
//                     t.title ||
//                     (null === (m = t.attributes) || void 0 === m
//                       ? void 0
//                       : m.name) ||
//                     '',
//                   subtitle:
//                     v ||
//                     (null === (f = t.attributes) || void 0 === f
//                       ? void 0
//                       : f.genreDisplayName) ||
//                     t.type ||
//                     t.edition ||
//                     '',
//                   url:
//                     (null == t ? void 0 : t.url) ||
//                     (null === (_ = t.attributes) || void 0 === _
//                       ? void 0
//                       : _.url) ||
//                     t.newsLink ||
//                     '',
//                   releaseDate: E,
//                 },
//                 galleryItemID: g,
//               };
//         }),
//         r = [];
//       r.push(s), s.length > 0 && this.addGalleryItemMarkup(r);
//     }
//     onMarqueePlay() {
//       this.marquees.forEach((t) => t.play(!0)),
//         (this.playPauseButton.state = 'playing');
//     }
//     onMarqueePause() {
//       this.marquees.forEach((t) => t.pause(!0)),
//         (this.playPauseButton.state = 'paused');
//     }
//     togglePlayPauseClick() {
//       'playing' === this.playPauseButton.state
//         ? this.onMarqueePause()
//         : this.onMarqueePlay();
//     }
//     initPlayPauseButton() {
//       const t = this.el.querySelector('.play-pause-marquees-button');
//       (this.playPauseButton = new c.default(t)),
//         (this.playPauseButton.state = this.prefersReducedMotion
//           ? 'paused'
//           : 'playing'),
//         (this.togglePlayPauseClick = this.togglePlayPauseClick.bind(this)),
//         t.addEventListener('click', this.togglePlayPauseClick);
//     }
//     addTileStyles() {
//       const t = _(this.tileFormat),
//         e = f(this.tileFormat);
//       this.styleEl ||
//         ((this.styleEl = document.createElement('style')),
//         this.itemContainer.appendChild(this.styleEl)),
//         this.styleEl.setAttribute('type', 'text/css'),
//         (this.styleEl.innerHTML = Object.keys(e)
//           .reverse()
//           .reduce((i, s) => {
//             const r = 'auto' !== e[s] ? `${e[s]}px` : `${e[s]}`;
//             return (
//               i +
//               `@media only screen and (${m[s]}) {\n\t\t\t\t\t.${this.itemContainer.classList[0]}.${this.itemContainer.classList[1]} { --tile-width: ${r}; --tile-height: ${t[s]}px; }\n\t\t\t\t}`
//             );
//           }, ''));
//     }
//     addGalleryItemMarkup(t) {
//       let e = '';
//       const i = t.reduce((i, s, r) => {
//           if (r < p) {
//             const n = r * t.length;
//             (e = s[r].galleryItemID),
//               (i += o.default.markup(
//                 s,
//                 e,
//                 this.ctaCopy,
//                 n,
//                 this.tileFormat,
//                 this.watchNowText,
//                 this.previewNowText,
//                 this.timeText,
//                 this.config
//               ));
//           }
//           return i;
//         }, ''),
//         s = `\n\t\t\t<div id="${e}" class="dynamic-gallery-item" data-ac-gallery-item data-analytics-gallery-item-id="${e}">\n\t\t\t\t${i}\n\t\t\t</div>`;
//       this.itemContainer.insertAdjacentHTML('beforeend', s);
//       const r = this.itemContainer.querySelector(`#${e}`);
//       r.querySelectorAll('.marquee').forEach((t, e) => {
//         const i = this.gum.addComponent({
//           componentName: 'Marquee',
//           el: t,
//           data: { index: e },
//         });
//         this.marquees.push(i),
//           0 === this.galleryItemCount &&
//             ((i.active = !0),
//             this.anim.addEvent(this.el, {
//               start: 'a0t - 175vh',
//               end: 'a0b + 150vh',
//               anchors: [r],
//               event: `lazy-load-first-gallery-item-marquee-images-${e}`,
//               onEnterOnce: () => i.loadPictureImages(),
//             }));
//       }),
//         0 === this.galleryItemCount &&
//           (this.initPlayPauseButton(),
//           this.el.classList.add('marquees-initialized')),
//         this.galleryItemCount++;
//     }
//     removeDynamicGallery() {
//       (0, h.default)('Could not create marquee. Removing component.'),
//         this.el.remove(),
//         this.anim.forceUpdate(),
//         this.gum.removeComponent({
//           componentName: 'DynamicGallery',
//           el: this.el,
//         });
//     }
//     onResizeImmediate(t) {}
//     onResizeDebounced(t) {}
//     onBreakpointChange(t) {
//       this.addTileStyles();
//     }
//     static IS_SUPPORTED() {
//       return !0;
//     }
//   }
//   t.exports = g;
// },

// function (t, e, i) {
//   'use strict';
//   const s = i(154),
//     r = i(16),
//     {
//       DEFAULT_PICTURE_BG_COLOR: n,
//       VIEWPORT_MEDIA_QUERIES: a,
//       GET_IMG_WIDTHS: o,
//       GET_IMG_HEIGHTS: h,
//     } = i(53),
//     l = {
//       'apple-fitness': 299,
//       'apple-arcade': 288,
//       'apple-music': 286,
//       'apple-tv': 289,
//       'apple-news': 285,
//       'apple-podcasts': 300,
//       'apple-books': 294,
//     };
//   function c(t, e, i, s) {
//     const r = i * (s || 1),
//       n = e * (s || 1);
//     return t.url
//       .replace('{w}', n)
//       .replace('{h}', Math.floor(r))
//       .replace('{c}', '')
//       .replace('{f}', 'jpg');
//   }
//   t.exports = {
//     markup: function (t, e, i, s, r, u, d, p, m) {
//       return `<div class="marquee" data-marquee-clickable><ul class="marquee-list">${t.reduce(
//         (t, f, _) =>
//           t +
//           (function (t, e, i, s, r, u, d, p, m) {
//             const f = t.attributes.artworks
//                 ? t.attributes.artworks[0]
//                 : t.attributes.artwork,
//               _ = t.attributes.name,
//               g =
//                 t.attributes.url +
//                 (t.attributes.url.includes('?') ? '&' : '?'),
//               b = t.attributes.editorialNotes
//                 ? t.attributes.editorialNotes.short
//                 : '';
//             let y =
//                 t.attributes.artistName ||
//                 t.attributes.curatorName ||
//                 t.streamingRadioSubType ||
//                 t.episodeNumber ||
//                 t.attributes.subtitle ||
//                 b ||
//                 '',
//               v = i;
//             const E = `${t.attributes.name} - ${y}`;
//             let w = '';
//             if (t.attributes.durationInMilliseconds) {
//               y = `${
//                 `${t.relationships.genres.data[0].attributes.name} | ` || ''
//               }${Math.round(t.attributes.durationInMilliseconds / 6e4)} ${p}`;
//             }
//             t.attributes.releaseDate && t.attributes.releaseDate > Date.now()
//               ? (v = d)
//               : t.attributes.releaseDate &&
//                 t.attributes.releaseDate < Date.now() &&
//                 (v = u);
//             'apple-tv' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-podcasts' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-fitness' === m && (w = 'icon icon-after icon-playsolid');
//             'apple-music' === m && (w = 'icon icon-after icon-playsolid');
//             return `\n\t\t<li class="marquee-tile" data-id="${e}-marquee-tile-${s}">\n\t\t\t<a\n\t\t\t\tclass="marquee-link"\n\t\t\t\thref="${
//               g +
//               `itscg=10000&itsct=mus-0-mus_fam-posn${
//                 s + 1
//               }_stm-apl-avl-200130`
//             }"\n\t\t\t\tdata-analytics-title="${v.toLowerCase()} - ${_.toLowerCase()}"\n\t\t\t\tdata-analytics-exit-link\n\t\t\t\tdata-rid-relay='{"${
//               l[m]
//             }":"itsct"}'\n\t\t\t>\n\t\t\t\t<div class="marquee-hover-container">\n\t\t\t\t\t${(function (
//               t,
//               e,
//               i
//             ) {
//               const s = h(i),
//                 r = o(i),
//                 l = Object.keys(r),
//                 u = l[l.length - 1],
//                 d = 'auto' === r[u] ? s[u] : r[u];
//               return `\n\t<picture class="marquee-picture" style="background-color: #${
//                 t.bgColor || n
//               };">\n\t\t<source data-empty srcset="data:image/gif;base64,R0lGODlhAQABAHAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" media="(min-width:0px)">\n\t\t\t${l.reduce(
//                 (e, i) => {
//                   const n = s[i],
//                     o = a[i],
//                     h = 'auto' !== r[i] ? r[i] : s[i];
//                   return (
//                     e +
//                     `<source srcset="${c(t, h, n)},  ${c(
//                       t,
//                       h,
//                       n,
//                       2
//                     )} 2x" media="(${o})">`
//                   );
//                 },
//                 ''
//               )}\n\t\t\t<img class="marquee-picture-img" src="${c(
//                 t,
//                 d,
//                 s[u]
//               )}" alt="${e}">\n\t\t</picture>`;
//             })(
//               f,
//               E,
//               r
//             )}\n\t\t\t\t\t<div class="marquee-hover-content">\n\t\t\t\t\t\t<span class="marquee-cta ${w}">${v}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="marquee-copy typography-show-title-copy">\n\t\t\t\t\t<p class="marquee-title">${_}</p>\n\t\t\t\t\t<p class="marquee-subtitle">${y}</p>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>`;
//           })(f, e, i, _ + s, r, u, d, p, m),
//         ''
//       )}</ul></div>`;
//     },
//     validateTile: function (t, e) {
//       const i = t.attributes,
//         n = `tile ${i.name} #${this.galleryItemID}-marquee-tile-${e} in ${this.title}`,
//         a = (e) => {
//           const i =
//             e.artistName ||
//             e.curatorName ||
//             e.streamingRadioSubType ||
//             e.episodeNumber ||
//             e.editorialNotesShort;
//           return i || r(t), i;
//         },
//         o = {
//           url: { value: i.url, type: String, required: !0 },
//           artwork: { value: i.artwork.url, type: String, required: !0 },
//           bgColor: { value: i.artwork.bgColor, type: String, required: !0 },
//           name: { value: i.name, type: String, required: !0 },
//           artistName: { value: i.artistName, type: String, validator: a },
//           curatorName: { value: i.curatorName, type: String, validator: a },
//           streamingRadioSubType: {
//             value: i.streamingRadioSubType,
//             type: String,
//             validator: a,
//           },
//           episodeNumber: {
//             value: i.episodeNumber,
//             type: String,
//             validator: a,
//           },
//           editorialNotesShort: {
//             value: i.editorialNotes ? i.editorialNotes.short : void 0,
//             type: String,
//             validator: a,
//           },
//         };
//       return s.validateProps({ props: o, componentName: n });
//     },
//   };
// },
</script>

<style scoped>
/* ---------------------------- play-pause-button --------------------------- */

/* .play-pause-button {
  position: relative;
  z-index: 2;
  top: -442px;
  right: 34px;
  height: 34px;
  width: 34px;
} */

/* @media only screen and (max-width: 1068px) {
  .play-pause-button {
    top: -248px;
    right: 27px;
    height: 27px;
    width: 27px;
  }
} */

/* @media only screen and (max-width: 734px) {
  .play-pause-button {
    top: unset;
    right: unset;
    height: 26px;
    width: 26px;
  }

  .play-pause-button {
    top: 36px;
  }
} */

.play-pause-button.playing,
.playing .play-pause-button {
  opacity: 1;
  pointer-events: auto;
}

.play-pause-button {
  width: 25px;
  height: 25px;
  position: relative;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
}

/* .play-pause-button.has-background {
  top: -350px;
  right: 34px;
}

@media only screen and (max-width: 1068px) {
  .play-pause-button.has-background {
    top: -260px;
    right: 27px;
  }
}

@media only screen and (max-width: 734px) {
  .play-pause-button.has-background {
    top: unset;
    right: unset;
  }
}

.play-pause-button.has-background svg {
  fill: var(--color-fill);
}

@media only screen and (max-width: 734px) {
  .play-pause-button.has-background svg {
    fill: var(--color-code-plain);
  }
} */

.play-pause-button.playing .play-icon {
  opacity: 0;
}

.play-pause-button.playing .pause-icon {
  opacity: 1;
}

.play-pause-button .control-icon {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.play-pause-button svg {
  fill: var(--color-fill-gray);
}

@media only screen and (max-width: 734px) {
  .play-pause-button svg {
    fill: var(--color-code-plain);
  }
}

/* --------------------------------- marquee -------------------------------- */

.marquee {
  display: flex;
}

.marquee {
  transition: opacity 300ms;
}

.marquee:first-child {
  margin-bottom: 34px;
}

@media only screen and (max-width: 1068px) {
  .marquee:first-child {
    margin-bottom: 41px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee:first-child {
    margin-bottom: 30px;
  }
}

.marquee:last-child {
  margin-left: -100px;
}

@media only screen and (max-width: 1068px) {
  .marquee:last-child {
    margin-left: -60px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee:last-child {
    margin-left: -6px;
  }
}

/* ------------------------------ marquee-list ------------------------------ */

.marquee-list {
  margin-left: 0;
  margin-top: 0;
  list-style-type: none;
  display: flex;
  flex-shrink: 0;
}

/* ------------------------------ marquee-tile ------------------------------ */

.marquee-tile {
  flex-shrink: 0;
  position: relative;
  flex-direction: column;
  width: var(--tile-width);
  /* margin-top: 15px; */
  margin-right: 15px;
}

@media only screen and (max-width: 1068px) {
  .marquee-tile {
    margin-top: 13px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-tile {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 1068px) {
  .marquee-tile {
    margin-right: 13px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-tile {
    margin-right: 10px;
  }
}

/* ------------------------------ marquee-link ------------------------------ */

.marquee-link {
  display: block;
  overflow: hidden;
}

.marquee-link:hover {
  text-decoration: none;
}

.marquee-link:hover .marquee-hover-content {
  opacity: 1;
}

.marquee-link:hover .marquee-cta {
  transform: translateY(0);
}

/* ------------------------------- marquee-cta ------------------------------ */

.marquee-cta {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border-radius: 980px;
  font-size: 14px;
  line-height: 1.1428571429;
  font-weight: 700;
  /* letter-spacing: 0em; */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  min-width: 26px;
  padding: 12px 22px;
  background: var(--color-fill);
  color: var(--color-figure-gray);
  transform: translateY(15px);
}

.marquee-cta:hover {
  text-decoration: none;
}

.marquee-cta:active {
  outline: none;
}

.marquee-cta:disabled {
  cursor: default;
}

.marquee-cta:hover {
  background: var(--color-fill);
}

.marquee-cta:active {
  background: var(--color-fill-tertiary);
}

.marquee-cta:disabled {
  background: var(--color-fill);
  color: var(--color-fill-gray);
  opacity: 0.32;
}

.marquee-cta:hover {
  opacity: 0.9;
}

.marquee-cta {
  transition: transform 400ms;
}

@media only screen and (max-width: 734px) {
  .marquee-cta {
    font-size: 14px;
    line-height: 1.1428571429;
    font-weight: 700;
    /* letter-spacing: 0em; */
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
    min-width: 28px;
    padding: 8px 10px 8px 11px;
  }
}

/* ----------------------------- marquee-picture ---------------------------- */

.marquee-picture {
  display: block;
  object-fit: cover;
  width: var(--tile-width);
  height: var(--tile-height);
}

.marquee-picture:after {
  content: "";
  display: block;
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-picture:after {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-picture:after {
    border-radius: 4px;
  }
}

.marquee-picture img {
  height: 100%;
  vertical-align: bottom;
  width: 100%;
}

/* ------------------------- marquee-hover-container ------------------------ */

.marquee-hover-container {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-hover-container {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-hover-container {
    border-radius: 4px;
  }
}

/* -------------------------- marquee-hover-content ------------------------- */

.marquee-hover-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  border-radius: 6px;
}

@media only screen and (max-width: 1068px) {
  .marquee-hover-content {
    border-radius: 5px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-hover-content {
    border-radius: 4px;
  }
}

.marquee-hover-content {
  transition: opacity 300ms;
}

/* ------------------------------ marquee-copy ------------------------------ */

.marquee-copy {
  font-size: 14px;
  line-height: 1.2857742857;
  font-weight: 400;
  /* letter-spacing: -0.016em; */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    sans-serif;
  margin-top: 10px;
}

@media only screen and (max-width: 734px) {
  .marquee-copy {
    font-size: 12px;
    line-height: 1.3333733333;
    font-weight: 400;
    /* letter-spacing: -0.01em; */
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      sans-serif;
  }
}

@media only screen and (max-width: 1068px) {
  .marquee-copy {
    margin-top: 7px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-copy {
    margin-top: 6px;
  }
}

/* ------------------------------ marquee-title ----------------------------- */

.marquee-title {
  color: var(--color-fill-gray);
}

/* ---------------------------- marquee-subtitle ---------------------------- */

.marquee-subtitle {
  color: var(--color-fill-gray-secondary);
  margin-top: 0.16em;
}

@media only screen and (max-width: 1068px) {
  .marquee-subtitle {
    margin-top: -3px;
  }
}

@media only screen and (max-width: 734px) {
  .marquee-subtitle {
    margin-top: -2px;
  }
}

.marquee-subtitle,
.marquee-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* ----------------------------- dynamic-gallery ---------------------------- */

.dynamic-gallery {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 70px;
}

/* ---------------------------- control-container --------------------------- */

.control-container {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 40px;
  z-index: 4;
  height: 0;
}

@media only screen and (max-width: 734px) {
  .control-container {
    justify-content: flex-start;
  }
}

@media only screen and (max-width: 734px) and (max-width: 734px) {
  .control-container {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
}

/* ----------------------- play-pause-marquees-button ----------------------- */

.play-pause-marquees-button {
  right: 54px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  pointer-events: none;
  color: var(--color-figure-gray-secondary);
}

.play-pause-marquees-button:hover {
  color: var(--color-fill-gray);
}

.dynamic-gallery.marquees-initialized .play-pause-marquees-button {
  opacity: 1;
  pointer-events: auto;
}

@media only screen and (max-width: 1068px) {
  .play-pause-marquees-button {
    right: 20px;
  }
}

/* -------------------------- dynamic-gallery-item -------------------------- */

.dynamic-gallery-item {
  width: 100%;
  position: absolute;
  /* background-color: var(--color-fill); */
  visibility: hidden;
  z-index: 0;
}

.dynamic-gallery-item:first-of-type {
  visibility: visible;
  z-index: 1;
}

/* --------------------- dynamic-gallery-item-container --------------------- */

.dynamic-gallery-item-container {
  height: 305px;
  overflow: hidden;
  position: relative;
}

@media only screen and (max-width: 1068px) {
  .dynamic-gallery-item-container {
    height: 235px;
  }
}

@media only screen and (max-width: 734px) {
  .dynamic-gallery-item-container {
    height: 190px;
  }
}

@media only screen and (min-width: 0px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 234px;
    --tile-height: 234px;
  }
}

@media only screen and (max-width: 1068px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 164px;
    --tile-height: 164px;
  }
}

@media only screen and (max-width: 735px) {
  .dynamic-gallery-item-container.apple-music {
    --tile-width: 132px;
    --tile-height: 132px;
  }
}
</style>
