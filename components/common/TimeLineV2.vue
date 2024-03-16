<template>
  <main class="font-mktg">
    <div
      class="overflow-hidden"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <div class="px-3 home-campaign-hero">
        <div
          class="position-relative pt-3 pt-sm-8 pt-lg-12 container-xl js-build-in-trigger build-in-animate"
          data-hpc=""
        >
          <div class="d-flex pt-sm-9">
            <div
              class="col-1 d-flex flex-column events-none position-relative"
              style="height: 628px"
            >
              <div class="mx-auto">
                <div
                  class="d-inline-block circle p-1"
                  style="border: 2px solid rgba(255, 255, 255, 0.3)"
                ></div>
              </div>
              <div
                style="
                  background: linear-gradient(transparent, #7c72ff 30%);
                  height: 72%;
                "
                class="home-campaign-git-line rounded mx-auto"
              ></div>

              <div class="mx-auto my-3 home-campaign-glowing-icon">
                <div class="position-relative d-inline-block z-1">
                  <svg
                    aria-hidden="true"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    width="24"
                    data-view-component="true"
                    class="octicon octicon-code"
                  >
                    <path
                      d="M15.22 4.97a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L21.19 12l-5.97-5.97a.75.75 0 0 1 0-1.06Zm-6.44 0a.75.75 0 0 1 0 1.06L2.81 12l5.97 5.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z"
                    ></path>
                  </svg>
                  <span
                    class="position-absolute left-0 top-0 height-full width-full home-campaign-glowing-icon-glow circle z-n1"
                    style="
                      background-color: var(--mktg-accent-primary);
                      filter: blur(18px);
                    "
                  ></span>
                </div>
              </div>

              <div
                style="
                  background: linear-gradient(#7c72ff, #2da44e 80%, #3fb950);
                "
                class="home-campaign-git-line height-full rounded mx-auto"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="position-absolute">
        <div
          class="sub-nav-mktg js-toggler-container z-3 js-position-sticky top-0 width-full init-hidden scrollnav is-placeholder"
          data-original-top="0px"
          style="
            visibility: hidden;
            display: none;
            height: 80.5px;
            top: 0px !important;
          "
        ></div>
        <div
          class="sub-nav-mktg js-toggler-container z-3 js-sticky js-position-sticky top-0 width-full init-hidden scrollnav"
          data-original-top="0px"
          style="top: -14px; position: static; left: 0px; width: 861.914px"
        >
          <div
            class="sub-nav-mktg-wrapper d-flex flex-items-center py-3 p-responsive"
          >
            <button
              type="button"
              class="btn-octicon sub-nav-mktg-toggle d-lg-none p-1 flex-order-1 float-right js-toggler-target mr-n1"
              aria-label="Toggle page navigation"
            >
              <svg
                aria-hidden="true"
                height="24"
                viewBox="0 0 24 24"
                version="1.1"
                width="24"
                data-view-component="true"
                class="octicon octicon-chevron-down on-hidden"
              >
                <path
                  d="M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939 6.28 8.22a.749.749 0 0 0-1.06 0Z"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                height="24"
                viewBox="0 0 24 24"
                version="1.1"
                width="24"
                data-view-component="true"
                class="octicon octicon-x on-visible"
              >
                <path
                  d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"
                ></path>
              </svg>
            </button>

            <div
              class="sub-nav-mktg-links flex-auto f4-mktg d-flex flex-column flex-lg-row gap-4"
            >
              <a
                class="sub-nav-mktg-link Link--primary no-underline py-1 py-lg-2 js-scrollnav-item js-smoothscroll-anchor selected"
                data-analytics-event='{"category":"Homepage","action":"click item to scroll to Productivity","label":"ref_cta:Productivity;"}'
                href="#productivity"
                >Productivity</a
              >
              <a
                class="sub-nav-mktg-link Link--primary no-underline py-1 py-lg-2 js-scrollnav-item js-smoothscroll-anchor"
                data-analytics-event='{"category":"Homepage","action":"click item to scroll to Collaboration","label":"ref_cta:Collaboration;"}'
                href="#collaboration"
                >Collaboration</a
              >
              <a
                class="sub-nav-mktg-link Link--primary no-underline py-1 py-lg-2 js-scrollnav-item js-smoothscroll-anchor"
                data-analytics-event='{"category":"Homepage","action":"click item to scroll to Security","label":"ref_cta:Security;"}'
                href="#security"
                >Security</a
              >
            </div>

            <div class="sub-nav-mktg-ctas ml-lg-3">
              <a
                class="btn-mktg ml-lg-2 mt-2 mt-lg-0 d-block d-lg-inline-block btn-muted-mktg"
                data-analytics-event='{"category":"Homepage","action":"click to Start a free enterprise trial","label":"ref_cta:Start a free enterprise trial;ref_loc:Homepage;"}'
                href="/organizations/enterprise_plan?ref_cta=Start+a+free+enterprise+trial&amp;ref_loc=homepage+sticky+nav&amp;ref_page=%2F"
              >
                Start a free enterprise trial

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="octicon arrow-symbol-mktg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
                  ></path>
                  <path
                    class="octicon-chevrow-stem"
                    stroke="currentColor"
                    d="M1.75 8H11"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </a>
              <a
                class="btn-mktg ml-lg-2 mt-2 mt-lg-0 d-block d-lg-inline-block"
                data-analytics-event='{"category":"Homepage","action":"click to Sign up for GitHub","label":"ref_cta:Sign up for GitHub;ref_loc:Homepage;"}'
                href="/join?ref_cta=Sign+up+for+GitHub&amp;ref_loc=homepage+sticky+nav&amp;ref_page=%2F&amp;source=homepage-sticky-nav"
              >
                Sign up for GitHub

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="octicon arrow-symbol-mktg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
                  ></path>
                  <path
                    class="octicon-chevrow-stem"
                    stroke="currentColor"
                    d="M1.75 8H11"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="home-campaign-productivity js-section overflow-hidden px-3 pb-8 pt-5"
        data-color-mode="dark"
        data-light-theme="light"
        data-dark-theme="dark"
        id="productivity"
      >
        <div class="container-xl">
          <div
            class="d-flex js-build-in-trigger position-relative"
            data-build-in-stagger="100"
            data-build-margin-bottom="20"
          >
            <div
              class="col-1 d-flex flex-column flex-items-center"
              style="height: 284px"
            >
              <div class="mb-4 position-relative home-campaign-glowing-icon">
                <svg
                  aria-hidden="true"
                  height="24"
                  viewBox="0 0 24 24"
                  version="1.1"
                  width="24"
                  data-view-component="true"
                  class="octicon octicon-briefcase"
                >
                  <path
                    d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 21.25 22H2.75A1.75 1.75 0 0 1 1 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26A4.235 4.235 0 0 1 18.75 13H5.25a4.235 4.235 0 0 1-2.75-1.01Zm19-3.24v-3a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v3a2.75 2.75 0 0 0 2.75 2.75h13.5a2.75 2.75 0 0 0 2.75-2.75Zm-6.5-7a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4h6Z"
                  ></path>
                </svg>
                <span
                  class="position-absolute left-0 top-0 height-full width-full home-campaign-glowing-icon-glow circle z-n1"
                  style="
                    background-color: var(--mktg-accent-primary);
                    filter: blur(18px);
                  "
                ></span>
              </div>
              <div
                class="home-campaign-git-line height-full rounded js-build-in-item build-in-scale-top"
                style="
                  background: linear-gradient(
                    rgb(63, 185, 80),
                    rgb(46, 160, 67),
                    transparent
                  );
                  transition-delay: 500ms;
                "
                data-build-delay="500"
              ></div>
            </div>
          </div>

          <div
            class="d-flex js-build-in-trigger position-relative"
            data-build-in-stagger="100"
          >
            <div
              class="col-1 d-flex flex-column flex-items-center position-relative"
              style="height: 737px"
            >
              <div
                class="home-campaign-git-line height-full position-relative z-1 js-build-in-item build-in-scale-top"
                style="
                  transition-duration: 900ms;
                  background: linear-gradient(
                    transparent,
                    rgb(63, 185, 80),
                    rgb(63, 185, 80),
                    transparent
                  );
                  transition-delay: 0ms;
                "
              ></div>
              <img
                alt=""
                aria-hidden="true"
                width="81"
                height="485"
                style="
                  left: calc(50% - 2px);
                  height: auto;
                  max-width: 9vw;
                  transition-delay: 100ms;
                "
                class="d-none d-md-block position-absolute bottom-4 js-build-in-item build-in-scale-fade"
                loading="lazy"
                decoding="async"
                src="https://github.githubassets.com/assets/git-branch-productivity-c304b83d09c7.svg"
              />
            </div>
          </div>

          <div
            class="col-1 d-flex flex-column flex-items-center js-build-in-trigger"
          >
            <div
              class="home-campaign-git-line mt-n3 mt-md-n4 mb-n8 rounded js-build-in-item build-in-scale-top"
              style="
                height: 160px;
                background: linear-gradient(transparent, #33b3ae 40%);
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="home-campaign-security js-section overflow-hidden px-3 pb-8 pt-5"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
      id="security"
    >
      <div class="container-xl">
        <div
          class="d-flex js-build-in-trigger position-relative"
          data-build-in-stagger="100"
        >
          <div
            class="col-1 d-flex flex-column flex-items-center"
            style="height: 232px"
          >
            <div
              class="mb-4 position-relative home-campaign-glowing-icon js-build-in-item build-in-scale-fade"
              style="transition-delay: 0ms"
            >
              <svg
                aria-hidden="true"
                height="24"
                viewBox="0 0 24 24"
                version="1.1"
                width="24"
                data-view-component="true"
                class="octicon octicon-lock"
              >
                <path
                  d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z"
                ></path>
              </svg>
              <span
                class="position-absolute left-0 top-0 height-full width-full home-campaign-glowing-icon-glow circle z-n1"
                style="
                  background-color: var(--mktg-accent-primary);
                  filter: blur(18px);
                "
              ></span>
            </div>

            <div
              class="home-campaign-git-line height-full rounded js-build-in-item build-in-scale-top"
              style="
                background: linear-gradient(rgb(51, 179, 174) 40%, transparent);
                transition-delay: 500ms;
              "
              data-build-delay="500"
            ></div>
          </div>
        </div>

        <div
          class="d-flex js-build-in-trigger position-relative"
          data-build-in-stagger="100"
        >
          <div
            class="col-1 d-flex flex-column flex-items-center position-relative"
            style="height: 709px"
          >
            <div
              class="home-campaign-git-line height-full position-relative z-1 js-build-in-item build-in-scale-top"
              style="
                background: linear-gradient(
                  transparent,
                  rgb(51, 179, 174),
                  rgb(51, 179, 174),
                  transparent
                );
                transition-delay: 0ms;
              "
            ></div>

            <img
              alt=""
              aria-hidden="true"
              width="81"
              height="612"
              style="
                left: calc(50% - 2px);
                height: auto;
                max-width: 9vw;
                transition-delay: 100ms;
              "
              class="d-none d-md-block position-absolute bottom-4 js-build-in-item build-in-scale-fade"
              loading="lazy"
              decoding="async"
              src="https://github.githubassets.com/assets/git-branch-security-2-f6a799957581.svg"
            />
          </div>
        </div>

        <div
          class="col-1 d-flex flex-column flex-items-center js-build-in-trigger"
        >
          <div
            class="home-campaign-git-line mt-n3 mt-md-n4 mb-n8 rounded js-build-in-item build-in-scale-top"
            style="
              height: 160px;
              background: linear-gradient(transparent, #f778ba 40%);
            "
          ></div>
        </div>
      </div>
    </div>
    <div
      class="home-campaign-collaboration js-section pt-5 px-3 overflow-hidden"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
      id="collaboration"
    >
      <div class="container-xl">
        <div
          class="d-flex js-build-in-trigger position-relative"
          data-build-in-stagger="100"
        >
          <div
            class="col-1 d-flex flex-column flex-items-center"
            style="height: 232px"
          >
            <div
              class="mb-4 position-relative home-campaign-glowing-icon js-build-in-item build-in-scale-fade"
              style="transition-delay: 0ms"
            >
              <svg
                aria-hidden="true"
                height="24"
                viewBox="0 0 24 24"
                version="1.1"
                width="24"
                data-view-component="true"
                class="octicon octicon-code-of-conduct"
              >
                <path
                  d="M2.828 4.328C5.26 1.896 9.5 1.881 11.935 4.317c.024.024.046.05.067.076 1.391-1.078 2.993-1.886 4.777-1.89a6.22 6.22 0 0 1 4.424 1.825c.559.56 1.023 1.165 1.34 1.922.318.756.47 1.617.468 2.663 0 2.972-2.047 5.808-4.269 8.074-2.098 2.14-4.507 3.924-5.974 5.009l-.311.23a.752.752 0 0 1-.897 0l-.312-.23c-1.466-1.085-3.875-2.869-5.973-5.009-2.22-2.263-4.264-5.095-4.27-8.063a6.216 6.216 0 0 1 1.823-4.596Zm8.033 1.042c-1.846-1.834-5.124-1.823-6.969.022a4.712 4.712 0 0 0-1.382 3.52c0 2.332 1.65 4.79 3.839 7.022 1.947 1.986 4.184 3.66 5.66 4.752a78.214 78.214 0 0 0 2.159-1.645l-2.14-1.974a.752.752 0 0 1 1.02-1.106l2.295 2.118c.616-.52 1.242-1.08 1.85-1.672l-2.16-1.992a.753.753 0 0 1 1.021-1.106l2.188 2.02a18.963 18.963 0 0 0 1.528-1.877l-.585-.586-1.651-1.652c-1.078-1.074-2.837-1.055-3.935.043-.379.38-.76.758-1.132 1.126-1.14 1.124-2.96 1.077-4.07-.043-.489-.495-.98-.988-1.475-1.482a.752.752 0 0 1-.04-1.019c.234-.276.483-.576.745-.893.928-1.12 2.023-2.442 3.234-3.576Zm9.725 6.77c.579-1.08.92-2.167.92-3.228.002-.899-.128-1.552-.35-2.08-.22-.526-.551-.974-1.017-1.44a4.71 4.71 0 0 0-3.356-1.384c-1.66.004-3.25.951-4.77 2.346-1.18 1.084-2.233 2.353-3.188 3.506l-.351.423c.331.332.663.664.993.998a1.375 1.375 0 0 0 1.943.03c.37-.365.748-.74 1.125-1.118 1.662-1.663 4.373-1.726 6.06-.045.56.558 1.12 1.12 1.658 1.658Z"
                ></path>
              </svg>
              <span
                class="position-absolute left-0 top-0 height-full width-full home-campaign-glowing-icon-glow circle z-n1"
                style="
                  background-color: var(--mktg-accent-primary);
                  filter: blur(18px);
                "
              ></span>
            </div>

            <div
              class="home-campaign-git-line height-full rounded js-build-in-item build-in-scale-top"
              style="
                background: linear-gradient(
                  rgb(247, 120, 186) 40%,
                  transparent
                );
                transition-delay: 500ms;
              "
              data-build-delay="500"
            ></div>
          </div>
        </div>

        <div class="d-flex position-relative">
          <div
            class="col-1 d-flex flex-column flex-items-center position-relative js-build-in-trigger"
            style="height: 765px"
          >
            <div
              class="home-campaign-git-line height-full position-relative z-1 js-build-in-item build-in-scale-top"
              style="
                transition-duration: 1100ms;
                background: linear-gradient(
                  transparent,
                  #f778ba,
                  #f778ba,
                  transparent
                );
              "
            ></div>
            <img
              alt=""
              aria-hidden="true"
              width="81"
              height="612"
              style="left: calc(50% - 2px); height: auto; max-width: 9vw"
              class="d-none d-md-block position-absolute bottom-4 js-build-in-item build-in-scale-fade"
              loading="lazy"
              decoding="async"
              src="https://github.githubassets.com/assets/git-branch-collaboration-2-e46b1fb1d363.svg"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="home-campaign-footer position-relative js-section overflow-hidden"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <div class="container-xl position-relative z-2 px-3">
        <div class="d-flex js-build-in-trigger" data-build-in-stagger="100">
          <div
            class="col-1 d-flex flex-column flex-items-center js-build-in-trigger"
            style="height: 514px"
          >
            <div
              class="home-campaign-git-line rounded js-build-in-item build-in-scale-top"
              style="
                height: 100%;
                background: linear-gradient(
                  transparent,
                  rgb(102, 57, 186) 10%,
                  rgb(163, 113, 247),
                  rgb(210, 168, 255)
                );
                transition-delay: 0ms;
              "
            ></div>

            <div class="mx-auto my-3 home-campaign-glowing-icon">
              <div class="position-relative d-inline-block z-1">
                <svg
                  aria-hidden="true"
                  height="24"
                  viewBox="0 0 24 24"
                  version="1.1"
                  width="24"
                  data-view-component="true"
                  class="octicon octicon-code"
                >
                  <path
                    d="M15.22 4.97a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1 0 1.06l-6.5 6.5a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L21.19 12l-5.97-5.97a.75.75 0 0 1 0-1.06Zm-6.44 0a.75.75 0 0 1 0 1.06L2.81 12l5.97 5.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z"
                  ></path>
                </svg>
                <span
                  class="position-absolute left-0 bottom-0 height-full width-full home-campaign-glowing-icon-glow z-n1"
                  style="
                    background-color: var(--mktg-accent-primary);
                    filter: blur(17px);
                  "
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
/*! CSS Used from: https://github.githubassets.com/assets/dark-a167e256da9c.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme='dark'],
  [data-color-mode='dark'][data-dark-theme='dark']::selection {
    --color-canvas-default-transparent: rgba(13, 17, 23, 0);
    --color-page-header-bg: #0d1117;
    --color-marketing-icon-primary: #79c0ff;
    --color-marketing-icon-secondary: #1f6feb;
    --color-diff-blob-addition-num-text: #e6edf3;
    --color-diff-blob-addition-fg: #e6edf3;
    --color-diff-blob-addition-num-bg: rgba(63, 185, 80, 0.3);
    --color-diff-blob-addition-line-bg: rgba(46, 160, 67, 0.15);
    --color-diff-blob-addition-word-bg: rgba(46, 160, 67, 0.4);
    --color-diff-blob-deletion-num-text: #e6edf3;
    --color-diff-blob-deletion-fg: #e6edf3;
    --color-diff-blob-deletion-num-bg: rgba(248, 81, 73, 0.3);
    --color-diff-blob-deletion-line-bg: rgba(248, 81, 73, 0.1);
    --color-diff-blob-deletion-word-bg: rgba(248, 81, 73, 0.4);
    --color-diff-blob-hunk-num-bg: rgba(56, 139, 253, 0.4);
    --color-diff-blob-expander-icon: #848d97;
    --color-diff-blob-selected-line-highlight-mix-blend-mode: screen;
    --color-diffstat-deletion-border: rgba(240, 246, 252, 0.1);
    --color-diffstat-addition-border: rgba(240, 246, 252, 0.1);
    --color-diffstat-addition-bg: #3fb950;
    --color-search-keyword-hl: rgba(210, 153, 34, 0.4);
    --color-prettylights-syntax-comment: #8b949e;
    --color-prettylights-syntax-constant: #79c0ff;
    --color-prettylights-syntax-entity: #d2a8ff;
    --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
    --color-prettylights-syntax-entity-tag: #7ee787;
    --color-prettylights-syntax-keyword: #ff7b72;
    --color-prettylights-syntax-string: #a5d6ff;
    --color-prettylights-syntax-variable: #ffa657;
    --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
    --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
    --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
    --color-prettylights-syntax-carriage-return-text: #f0f6fc;
    --color-prettylights-syntax-carriage-return-bg: #b62324;
    --color-prettylights-syntax-string-regexp: #7ee787;
    --color-prettylights-syntax-markup-list: #f2cc60;
    --color-prettylights-syntax-markup-heading: #1f6feb;
    --color-prettylights-syntax-markup-italic: #c9d1d9;
    --color-prettylights-syntax-markup-bold: #c9d1d9;
    --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
    --color-prettylights-syntax-markup-deleted-bg: #67060c;
    --color-prettylights-syntax-markup-inserted-text: #aff5b4;
    --color-prettylights-syntax-markup-inserted-bg: #033a16;
    --color-prettylights-syntax-markup-changed-text: #ffdfb6;
    --color-prettylights-syntax-markup-changed-bg: #5a1e02;
    --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
    --color-prettylights-syntax-markup-ignored-bg: #1158c7;
    --color-prettylights-syntax-meta-diff-range: #d2a8ff;
    --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
    --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
    --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
    --color-codemirror-text: #e6edf3;
    --color-codemirror-bg: #0d1117;
    --color-codemirror-gutters-bg: #0d1117;
    --color-codemirror-guttermarker-text: #0d1117;
    --color-codemirror-guttermarker-subtle-text: #6e7681;
    --color-codemirror-linenumber-text: #848d97;
    --color-codemirror-cursor: #e6edf3;
    --color-codemirror-selection-bg: rgba(56, 139, 253, 0.4);
    --color-codemirror-activeline-bg: rgba(110, 118, 129, 0.1);
    --color-codemirror-matchingbracket-text: #e6edf3;
    --color-codemirror-lines-bg: #0d1117;
    --color-codemirror-syntax-comment: #8b949e;
    --color-codemirror-syntax-constant: #79c0ff;
    --color-codemirror-syntax-entity: #d2a8ff;
    --color-codemirror-syntax-keyword: #ff7b72;
    --color-codemirror-syntax-storage: #ff7b72;
    --color-codemirror-syntax-string: #a5d6ff;
    --color-codemirror-syntax-support: #79c0ff;
    --color-codemirror-syntax-variable: #ffa657;
    --color-checks-bg: #010409;
    --color-checks-run-border-width: 1px;
    --color-checks-container-border-width: 1px;
    --color-checks-text-primary: #e6edf3;
    --color-checks-text-secondary: #848d97;
    --color-checks-text-link: #2f81f7;
    --color-checks-btn-icon: #848d97;
    --color-checks-btn-hover-icon: #e6edf3;
    --color-checks-btn-hover-bg: rgba(110, 118, 129, 0.1);
    --color-checks-input-text: #848d97;
    --color-checks-input-placeholder-text: #6e7681;
    --color-checks-input-focus-text: #e6edf3;
    --color-checks-input-bg: #161b22;
    --color-checks-input-shadow: 0 0 0 1px (obj) => (0, get_1.default)
      (obj, path);
    --color-checks-donut-error: #f85149;
    --color-checks-donut-pending: #d29922;
    --color-checks-donut-success: #2ea043;
    --color-checks-donut-neutral: #8b949e;
    --color-checks-dropdown-text: #e6edf3;
    --color-checks-dropdown-bg: #161b22;
    --color-checks-dropdown-border: #30363d;
    --color-checks-dropdown-shadow: rgba(1, 4, 9, 0.3);
    --color-checks-dropdown-hover-text: #e6edf3;
    --color-checks-dropdown-hover-bg: rgba(110, 118, 129, 0.1);
    --color-checks-dropdown-btn-hover-text: #e6edf3;
    --color-checks-dropdown-btn-hover-bg: rgba(110, 118, 129, 0.1);
    --color-checks-scrollbar-thumb-bg: rgba(110, 118, 129, 0.4);
    --color-checks-header-label-text: #848d97;
    --color-checks-header-label-open-text: #e6edf3;
    --color-checks-header-border: #21262d;
    --color-checks-header-icon: #848d97;
    --color-checks-line-text: #848d97;
    --color-checks-line-num-text: #6e7681;
    --color-checks-line-timestamp-text: #6e7681;
    --color-checks-line-hover-bg: rgba(110, 118, 129, 0.1);
    --color-checks-line-selected-bg: rgba(56, 139, 253, 0.1);
    --color-checks-line-selected-num-text: #2f81f7;
    --color-checks-line-dt-fm-text: #ffffff;
    --color-checks-line-dt-fm-bg: #9e6a03;
    --color-checks-gate-bg: rgba(187, 128, 9, 0.15);
    --color-checks-gate-text: #848d97;
    --color-checks-gate-waiting-text: #d29922;
    --color-checks-step-header-open-bg: #161b22;
    --color-checks-step-error-text: #f85149;
    --color-checks-step-warning-text: #d29922;
    --color-checks-logline-text: #848d97;
    --color-checks-logline-num-text: #6e7681;
    --color-checks-logline-debug-text: #a371f7;
    --color-checks-logline-error-text: #848d97;
    --color-checks-logline-error-num-text: #6e7681;
    --color-checks-logline-error-bg: rgba(248, 81, 73, 0.1);
    --color-checks-logline-warning-text: #848d97;
    --color-checks-logline-warning-num-text: #d29922;
    --color-checks-logline-warning-bg: rgba(187, 128, 9, 0.15);
    --color-checks-logline-command-text: #2f81f7;
    --color-checks-logline-section-text: #3fb950;
    --color-checks-ansi-black: #0d1117;
    --color-checks-ansi-black-bright: #161b22;
    --color-checks-ansi-white: #b1bac4;
    --color-checks-ansi-white-bright: #b1bac4;
    --color-checks-ansi-gray: #6e7681;
    --color-checks-ansi-red: #ff7b72;
    --color-checks-ansi-red-bright: #ffa198;
    --color-checks-ansi-green: #3fb950;
    --color-checks-ansi-green-bright: #56d364;
    --color-checks-ansi-yellow: #d29922;
    --color-checks-ansi-yellow-bright: #e3b341;
    --color-checks-ansi-blue: #58a6ff;
    --color-checks-ansi-blue-bright: #79c0ff;
    --color-checks-ansi-magenta: #bc8cff;
    --color-checks-ansi-magenta-bright: #d2a8ff;
    --color-checks-ansi-cyan: #76e3ea;
    --color-checks-ansi-cyan-bright: #b3f0ff;
    --color-project-header-bg: #0d1117;
    --color-project-sidebar-bg: #161b22;
    --color-project-gradient-in: #161b22;
    --color-project-gradient-out: rgba(22, 27, 34, 0);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-outline: rgb(255 255 255 / 25%) 0 0 0 1px inset;
    --color-mktg-btn-shadow-focus: rgb(255 255 255 / 25%) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: rgb(255 255 255) 0 0 0 2px inset;
    --color-control-border-color-emphasis: #606771;
    --color-avatar-bg: rgba(255, 255, 255, 0.1);
    --color-avatar-border: rgba(240, 246, 252, 0.1);
    --color-avatar-stack-fade: #30363d;
    --color-avatar-stack-fade-more: #21262d;
    --color-avatar-child-shadow: 0 0 0 2px #0d1117;
    --color-topic-tag-border: rgba(0, 0, 0, 0);
    --color-counter-border: rgba(0, 0, 0, 0);
    --color-select-menu-backdrop-border: #484f58;
    --color-select-menu-tap-highlight: rgba(48, 54, 61, 0.5);
    --color-select-menu-tap-focus-bg: #0c2d6b;
    --color-overlay-shadow: 0 0 0 1px #30363d, 0 16px 32px rgba(1, 4, 9, 0.85);
    --color-overlay-backdrop: rgba(22, 27, 34, 0.4);
    --color-header-text: rgba(255, 255, 255, 0.7);
    --color-header-bg: #161b22;
    --color-header-divider: #8b949e;
    --color-header-logo: #f0f6fc;
    --color-header-search-bg: #0d1117;
    --color-header-search-border: #30363d;
    --color-sidenav-selected-bg: #21262d;
    --color-menu-bg-active: #161b22;
    --color-input-disabled-bg: rgba(110, 118, 129, 0);
    --color-timeline-badge-bg: #21262d;
    --color-ansi-black: #484f58;
    --color-ansi-black-bright: #6e7681;
    --color-ansi-white: #b1bac4;
    --color-ansi-white-bright: #ffffff;
    --color-ansi-gray: #6e7681;
    --color-ansi-red: #ff7b72;
    --color-ansi-red-bright: #ffa198;
    --color-ansi-green: #3fb950;
    --color-ansi-green-bright: #56d364;
    --color-ansi-yellow: #d29922;
    --color-ansi-yellow-bright: #e3b341;
    --color-ansi-blue: #58a6ff;
    --color-ansi-blue-bright: #79c0ff;
    --color-ansi-magenta: #bc8cff;
    --color-ansi-magenta-bright: #d2a8ff;
    --color-ansi-cyan: #39c5cf;
    --color-ansi-cyan-bright: #56d4dd;
    --color-btn-text: #c9d1d9;
    --color-btn-bg: #21262d;
    --color-btn-border: rgba(240, 246, 252, 0.1);
    --color-btn-shadow: 0 0 transparent;
    --color-btn-inset-shadow: 0 0 transparent;
    --color-btn-hover-bg: #30363d;
    --color-btn-hover-border: #8b949e;
    --color-btn-active-bg: hsla(212, 12%, 18%, 1);
    --color-btn-active-border: #6e7681;
    --color-btn-selected-bg: #161b22;
    --color-btn-counter-bg: #30363d;
    --color-btn-primary-text: #ffffff;
    --color-btn-primary-bg: #238636;
    --color-btn-primary-border: rgba(240, 246, 252, 0.1);
    --color-btn-primary-shadow: 0 0 transparent;
    --color-btn-primary-inset-shadow: 0 0 transparent;
    --color-btn-primary-hover-bg: #2ea043;
    --color-btn-primary-hover-border: rgba(240, 246, 252, 0.1);
    --color-btn-primary-selected-bg: #238636;
    --color-btn-primary-selected-shadow: 0 0 transparent;
    --color-btn-primary-disabled-text: rgba(255, 255, 255, 0.5);
    --color-btn-primary-disabled-bg: rgba(35, 134, 54, 0.6);
    --color-btn-primary-disabled-border: rgba(240, 246, 252, 0.1);
    --color-btn-primary-icon: #ffffff;
    --color-btn-primary-counter-bg: rgba(4, 38, 15, 0.2);
    --color-btn-outline-text: #388bfd;
    --color-btn-outline-hover-text: #58a6ff;
    --color-btn-outline-hover-bg: #30363d;
    --color-btn-outline-hover-border: rgba(240, 246, 252, 0.1);
    --color-btn-outline-hover-shadow: 0 1px 0 rgba(1, 4, 9, 0.1);
    --color-btn-outline-hover-inset-shadow: inset 0 1px 0
      rgba(255, 255, 255, 0.03);
    --color-btn-outline-hover-counter-bg: rgba(5, 29, 77, 0.2);
    --color-btn-outline-selected-text: #ffffff;
    --color-btn-outline-selected-bg: #0d419d;
    --color-btn-outline-selected-border: rgba(240, 246, 252, 0.1);
    --color-btn-outline-selected-shadow: 0 0 transparent;
    --color-btn-outline-disabled-text: rgba(88, 166, 255, 0.5);
    --color-btn-outline-disabled-bg: #0d1117;
    --color-btn-outline-disabled-counter-bg: rgba(31, 111, 235, 0.05);
    --color-btn-outline-counter-bg: rgba(5, 29, 77, 0.2);
    --color-btn-outline-hover-counter-fg: #58a6ff;
    --color-btn-outline-disabled-counter-fg: rgba(47, 129, 247, 0.5);
    --color-btn-outline-counter-fg: #388bfd;
    --color-btn-danger-text: #f85149;
    --color-btn-danger-hover-text: #ffffff;
    --color-btn-danger-hover-bg: #da3633;
    --color-btn-danger-hover-border: #f85149;
    --color-btn-danger-hover-shadow: 0 0 transparent;
    --color-btn-danger-hover-inset-shadow: 0 0 transparent;
    --color-btn-danger-hover-icon: #ffffff;
    --color-btn-danger-hover-counter-bg: rgba(255, 255, 255, 0.2);
    --color-btn-danger-selected-text: #ffffff;
    --color-btn-danger-selected-bg: #b62324;
    --color-btn-danger-selected-border: #ff7b72;
    --color-btn-danger-selected-shadow: 0 0 transparent;
    --color-btn-danger-disabled-text: rgba(248, 81, 73, 0.5);
    --color-btn-danger-disabled-bg: #0d1117;
    --color-btn-danger-disabled-counter-bg: rgba(218, 54, 51, 0.05);
    --color-btn-danger-counter-bg: rgba(73, 2, 2, 0.2);
    --color-btn-danger-icon: #f85149;
    --color-btn-danger-counter-fg: #f85149;
    --color-btn-danger-disabled-counter-fg: rgba(248, 81, 73, 0.5);
    --color-btn-danger-hover-counter-fg: #ffffff;
    --color-btn-inactive-bg: #21262d;
    --color-btn-inactive-text: #8b949e;
    --color-underlinenav-icon: #6e7681;
    --color-underlinenav-border-hover: rgba(110, 118, 129, 0.4);
    --color-action-list-item-inline-divider: rgba(48, 54, 61, 0.48);
    --color-action-list-item-default-hover-bg: rgba(177, 186, 196, 0.12);
    --color-action-list-item-default-hover-border: rgba(0, 0, 0, 0);
    --color-action-list-item-default-active-bg: rgba(177, 186, 196, 0.2);
    --color-action-list-item-default-active-border: rgba(0, 0, 0, 0);
    --color-action-list-item-default-selected-bg: rgba(177, 186, 196, 0.08);
    --color-action-list-item-danger-hover-bg: rgba(248, 81, 73, 0.16);
    --color-action-list-item-danger-active-bg: rgba(248, 81, 73, 0.24);
    --color-action-list-item-danger-hover-text: #ff7b72;
    --color-switch-track-bg: rgba(110, 118, 129, 0.1);
    --color-switch-track-hover-bg: hsla(215, 8%, 72%, 0.1);
    --color-switch-track-active-bg: rgba(110, 118, 129, 0.4);
    --color-switch-track-disabled-bg: #21262d;
    --color-switch-track-fg: #848d97;
    --color-switch-track-disabled-fg: #010409;
    --color-switch-track-border: rgba(0, 0, 0, 0);
    --color-switch-track-checked-bg: rgba(31, 111, 235, 0.35);
    --color-switch-track-checked-hover-bg: rgba(31, 111, 235, 0.5);
    --color-switch-track-checked-active-bg: rgba(31, 111, 235, 0.65);
    --color-switch-track-checked-fg: #ffffff;
    --color-switch-track-checked-disabled-fg: #010409;
    --color-switch-track-checked-border: rgba(0, 0, 0, 0);
    --color-switch-knob-bg: #0d1117;
    --color-switch-knob-border: #606771;
    --color-switch-knob-disabled-bg: #161b22;
    --color-switch-knob-checked-bg: #0d1117;
    --color-switch-knob-checked-disabled-bg: #161b22;
    --color-switch-knob-checked-border: rgba(31, 111, 235, 0.35);
    --color-segmented-control-bg: rgba(110, 118, 129, 0.1);
    --color-segmented-control-button-bg: #0d1117;
    --color-segmented-control-button-hover-bg: #30363d;
    --color-segmented-control-button-active-bg: #21262d;
    --color-segmented-control-button-selected-border: #6e7681;
    --color-tree-view-item-chevron-hover-bg: rgba(177, 186, 196, 0.12);
    --color-tree-view-item-directory-fill: #848d97;
    --color-fg-default: #e6edf3;
    --color-fg-muted: #848d97;
    --color-fg-subtle: #6e7681;
    --color-fg-on-emphasis: #ffffff;
    --color-canvas-default: #0d1117;
    --color-canvas-overlay: #161b22;
    --color-canvas-inset: #010409;
    --color-canvas-subtle: #161b22;
    --color-border-default: #30363d;
    --color-border-muted: #21262d;
    --color-border-subtle: rgba(240, 246, 252, 0.1);
    --color-shadow-small: 0 0 transparent;
    --color-shadow-medium: 0 3px 6px #010409;
    --color-shadow-large: 0 8px 24px #010409;
    --color-shadow-extra-large: 0 12px 48px #010409;
    --color-neutral-emphasis-plus: #6e7681;
    --color-neutral-emphasis: #6e7681;
    --color-neutral-muted: rgba(110, 118, 129, 0.4);
    --color-neutral-subtle: rgba(110, 118, 129, 0.1);
    --color-accent-fg: #2f81f7;
    --color-accent-emphasis: #1f6feb;
    --color-accent-muted: rgba(56, 139, 253, 0.4);
    --color-accent-subtle: rgba(56, 139, 253, 0.1);
    --color-success-fg: #3fb950;
    --color-success-emphasis: #238636;
    --color-success-muted: rgba(46, 160, 67, 0.4);
    --color-success-subtle: rgba(46, 160, 67, 0.15);
    --color-attention-fg: #d29922;
    --color-attention-emphasis: #9e6a03;
    --color-attention-muted: rgba(187, 128, 9, 0.4);
    --color-attention-subtle: rgba(187, 128, 9, 0.15);
    --color-severe-fg: #db6d28;
    --color-severe-emphasis: #bd561d;
    --color-severe-muted: rgba(219, 109, 40, 0.4);
    --color-severe-subtle: rgba(219, 109, 40, 0.1);
    --color-danger-fg: #f85149;
    --color-danger-emphasis: #da3633;
    --color-danger-muted: rgba(248, 81, 73, 0.4);
    --color-danger-subtle: rgba(248, 81, 73, 0.1);
    --color-open-fg: #3fb950;
    --color-open-emphasis: #238636;
    --color-open-muted: rgba(46, 160, 67, 0.4);
    --color-open-subtle: rgba(46, 160, 67, 0.15);
    --color-closed-fg: #f85149;
    --color-closed-emphasis: #da3633;
    --color-closed-muted: rgba(248, 81, 73, 0.4);
    --color-closed-subtle: rgba(248, 81, 73, 0.15);
    --color-done-fg: #a371f7;
    --color-done-emphasis: #8957e5;
    --color-done-muted: rgba(163, 113, 247, 0.4);
    --color-done-subtle: rgba(163, 113, 247, 0.1);
    --color-sponsors-fg: #db61a2;
    --color-sponsors-emphasis: #bf4b8a;
    --color-sponsors-muted: rgba(219, 97, 162, 0.4);
    --color-sponsors-subtle: rgba(219, 97, 162, 0.1);
    --color-primer-fg-disabled: #484f58;
    --color-primer-canvas-backdrop: rgba(1, 4, 9, 0.8);
    --color-primer-canvas-sticky: rgba(13, 17, 23, 0.95);
    --color-primer-border-active: #f78166;
    --color-primer-border-contrast: rgba(255, 255, 255, 0.2);
    --color-primer-shadow-highlight: 0 0 transparent;
    --color-primer-shadow-inset: 0 0 transparent;
    --color-scale-black: #010409;
    --color-scale-white: #ffffff;
    --color-scale-gray-0: #f0f6fc;
    --color-scale-gray-1: #c9d1d9;
    --color-scale-gray-2: #b1bac4;
    --color-scale-gray-3: #8b949e;
    --color-scale-gray-4: #6e7681;
    --color-scale-gray-5: #484f58;
    --color-scale-gray-6: #30363d;
    --color-scale-gray-7: #21262d;
    --color-scale-gray-8: #161b22;
    --color-scale-gray-9: #0d1117;
    --color-scale-blue-0: #cae8ff;
    --color-scale-blue-1: #a5d6ff;
    --color-scale-blue-2: #79c0ff;
    --color-scale-blue-3: #58a6ff;
    --color-scale-blue-4: #388bfd;
    --color-scale-blue-5: #1f6feb;
    --color-scale-blue-6: #1158c7;
    --color-scale-blue-7: #0d419d;
    --color-scale-blue-8: #0c2d6b;
    --color-scale-blue-9: #051d4d;
    --color-scale-green-0: #aff5b4;
    --color-scale-green-1: #7ee787;
    --color-scale-green-2: #56d364;
    --color-scale-green-3: #3fb950;
    --color-scale-green-4: #2ea043;
    --color-scale-green-5: #238636;
    --color-scale-green-6: #196c2e;
    --color-scale-green-7: #0f5323;
    --color-scale-green-8: #033a16;
    --color-scale-green-9: #04260f;
    --color-scale-yellow-0: #f8e3a1;
    --color-scale-yellow-1: #f2cc60;
    --color-scale-yellow-2: #e3b341;
    --color-scale-yellow-3: #d29922;
    --color-scale-yellow-4: #bb8009;
    --color-scale-yellow-5: #9e6a03;
    --color-scale-yellow-6: #845306;
    --color-scale-yellow-7: #693e00;
    --color-scale-yellow-8: #4b2900;
    --color-scale-yellow-9: #341a00;
    --color-scale-orange-0: #ffdfb6;
    --color-scale-orange-1: #ffc680;
    --color-scale-orange-2: #ffa657;
    --color-scale-orange-3: #f0883e;
    --color-scale-orange-4: #db6d28;
    --color-scale-orange-5: #bd561d;
    --color-scale-orange-6: #9b4215;
    --color-scale-orange-7: #762d0a;
    --color-scale-orange-8: #5a1e02;
    --color-scale-orange-9: #3d1300;
    --color-scale-red-0: #ffdcd7;
    --color-scale-red-1: #ffc1ba;
    --color-scale-red-2: #ffa198;
    --color-scale-red-3: #ff7b72;
    --color-scale-red-4: #f85149;
    --color-scale-red-5: #da3633;
    --color-scale-red-6: #b62324;
    --color-scale-red-7: #8e1519;
    --color-scale-red-8: #67060c;
    --color-scale-red-9: #490202;
    --color-scale-purple-0: #eddeff;
    --color-scale-purple-1: #e2c5ff;
    --color-scale-purple-2: #d2a8ff;
    --color-scale-purple-3: #bc8cff;
    --color-scale-purple-4: #a371f7;
    --color-scale-purple-5: #8957e5;
    --color-scale-purple-6: #6e40c9;
    --color-scale-purple-7: #553098;
    --color-scale-purple-8: #3c1e70;
    --color-scale-purple-9: #271052;
    --color-scale-pink-0: #ffdaec;
    --color-scale-pink-1: #ffbedd;
    --color-scale-pink-2: #ff9bce;
    --color-scale-pink-3: #f778ba;
    --color-scale-pink-4: #db61a2;
    --color-scale-pink-5: #bf4b8a;
    --color-scale-pink-6: #9e3670;
    --color-scale-pink-7: #7d2457;
    --color-scale-pink-8: #5e103e;
    --color-scale-pink-9: #42062a;
    --color-scale-coral-0: #ffddd2;
    --color-scale-coral-1: #ffc2b2;
    --color-scale-coral-2: #ffa28b;
    --color-scale-coral-3: #f78166;
    --color-scale-coral-4: #ea6045;
    --color-scale-coral-5: #cf462d;
    --color-scale-coral-6: #ac3220;
    --color-scale-coral-7: #872012;
    --color-scale-coral-8: #640d04;
    --color-scale-coral-9: #460701;
  }
}
/*! CSS Used from: https://github.githubassets.com/assets/primer-711f412bb361.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    color-scheme: dark;
  }
  [data-color-mode] {
    color: var(--fgColor-default, var(--color-fg-default));
    background-color: var(--bgColor-default, var(--color-canvas-default));
  }
  main {
    display: block;
  }
  a {
    background-color: transparent;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  button {
    font: inherit;
    margin: 0;
  }
  button {
    overflow: visible;
  }
  button {
    text-transform: none;
  }
  button,
  html [type='button'] {
    -webkit-appearance: button;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  a {
    color: var(--fgColor-accent, var(--color-accent-fg));
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  ::placeholder {
    color: var(--fgColor-muted, var(--color-fg-subtle));
    opacity: 1;
  }
  button {
    cursor: pointer;
    border-radius: 0;
  }
  a:focus,
  button:focus {
    outline: 2px solid var(--focus-outlineColor, var(--color-accent-fg));
    outline-offset: -2px;
    box-shadow: none;
  }
  a:focus:not(:focus-visible),
  button:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }
  @media (forced-colors: active) {
    *:focus {
      outline: solid 1px transparent;
    }
  }
  .octicon {
    vertical-align: text-bottom;
  }
  .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }
  .btn-octicon {
    display: inline-block;
    padding: 5px;
    margin-left: 5px;
    line-height: 1;
    color: var(--fgColor-muted, var(--color-fg-muted));
    vertical-align: middle;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
  .btn-octicon:hover {
    color: var(--fgColor-accent, var(--color-accent-fg));
  }
  .btn-octicon:focus {
    border-radius: 6px;
  }
  .container-xl {
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
  }
  .col-1 {
    width: 8.33333333%;
  }
  .rounded {
    border-radius: var(--borderRadius-medium, 6px) !important;
  }
  .circle {
    border-radius: var(--borderRadius-full, 50%) !important;
  }
  .flex-column {
    flex-direction: column !important;
  }
  .flex-items-center {
    align-items: center !important;
  }
  .flex-auto {
    flex: auto !important;
  }
  .flex-order-1 {
    order: 1 !important;
  }
  @media (min-width: 1012px) {
    .flex-lg-row {
      flex-direction: row !important;
    }
  }
  .position-relative {
    position: relative !important;
  }
  .position-absolute {
    position: absolute !important;
  }
  .top-0 {
    top: 0 !important;
  }
  .bottom-0 {
    bottom: 0 !important;
  }
  .left-0 {
    left: 0 !important;
  }
  .overflow-hidden {
    overflow: hidden !important;
  }
  .float-right {
    float: right !important;
  }
  .width-full {
    width: 100% !important;
  }
  .height-full {
    height: 100% !important;
  }
  .mr-n1 {
    margin-right: calc(-1 * var(--base-size-4, 4px)) !important;
  }
  .mt-2 {
    margin-top: var(--base-size-8, 8px) !important;
  }
  .mt-n3 {
    margin-top: calc(-1 * var(--base-size-16, 16px)) !important;
  }
  .my-3 {
    margin-top: var(--base-size-16, 16px) !important;
    margin-bottom: var(--base-size-16, 16px) !important;
  }
  .mb-4 {
    margin-bottom: var(--base-size-24, 24px) !important;
  }
  .mb-n8 {
    margin-bottom: calc(-1 * var(--base-size-64, 64px)) !important;
  }
  .mx-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  @media (min-width: 768px) {
    .mt-md-n4 {
      margin-top: calc(-1 * var(--base-size-24, 24px)) !important;
    }
  }
  @media (min-width: 1012px) {
    .mt-lg-0 {
      margin-top: 0 !important;
    }
    .ml-lg-2 {
      margin-left: var(--base-size-8, 8px) !important;
    }
    .ml-lg-3 {
      margin-left: var(--base-size-16, 16px) !important;
    }
  }
  .p-1 {
    padding: var(--base-size-4, 4px) !important;
  }
  .py-1 {
    padding-top: var(--base-size-4, 4px) !important;
    padding-bottom: var(--base-size-4, 4px) !important;
  }
  .pt-3 {
    padding-top: var(--base-size-16, 16px) !important;
  }
  .px-3 {
    padding-right: var(--base-size-16, 16px) !important;
    padding-left: var(--base-size-16, 16px) !important;
  }
  .py-3 {
    padding-top: var(--base-size-16, 16px) !important;
    padding-bottom: var(--base-size-16, 16px) !important;
  }
  .pt-5 {
    padding-top: var(--base-size-32, 32px) !important;
  }
  .pb-8 {
    padding-bottom: var(--base-size-64, 64px) !important;
  }
  @media (min-width: 544px) {
    .pt-sm-8 {
      padding-top: var(--base-size-64, 64px) !important;
    }
    .pt-sm-9 {
      padding-top: var(--base-size-80, 80px) !important;
    }
  }
  @media (min-width: 1012px) {
    .py-lg-2 {
      padding-top: var(--base-size-8, 8px) !important;
      padding-bottom: var(--base-size-8, 8px) !important;
    }
    .pt-lg-12 {
      padding-top: var(--base-size-128, 128px) !important;
    }
  }
  .p-responsive {
    padding-right: var(--base-size-16, 16px) !important;
    padding-left: var(--base-size-16, 16px) !important;
  }
  @media (min-width: 544px) {
    .p-responsive {
      padding-right: var(--base-size-40, 40px) !important;
      padding-left: var(--base-size-40, 40px) !important;
    }
  }
  @media (min-width: 1012px) {
    .p-responsive {
      padding-right: var(--base-size-16, 16px) !important;
      padding-left: var(--base-size-16, 16px) !important;
    }
  }
  .no-underline {
    text-decoration: none !important;
  }
  .d-block {
    display: block !important;
  }
  .d-flex {
    display: flex !important;
  }
  .d-inline-block {
    display: inline-block !important;
  }
  .d-none {
    display: none !important;
  }
  @media (min-width: 768px) {
    .d-md-block {
      display: block !important;
    }
  }
  @media (min-width: 1012px) {
    .d-lg-inline-block {
      display: inline-block !important;
    }
    .d-lg-none {
      display: none !important;
    }
  }
  .btn-mktg {
    -webkit-appearance: none !important;
    appearance: none !important;
    background: linear-gradient(180deg, #ffffff26 0, #fff0 100%),
      var(--color-mktg-btn-bg) !important;
    border: 0;
    border-radius: 0.375rem;
    color: var(--bgColor-default, var(--color-canvas-default));
    display: inline-block;
    font-size: 1rem;
    font-weight: var(--base-text-weight-semibold, 600);
    line-height: 1;
    padding: 0.9rem 1.5rem 1.1rem;
    position: relative;
    text-align: center;
    transition: box-shadow 0.2s, outline 0.2s ease;
    -webkit-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    z-index: 1;
  }
  .btn-mktg:before {
    background: linear-gradient(180deg, #ffffff26, #fff0) !important;
    background-blend-mode: normal;
    border-radius: inherit;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s;
    z-index: -1;
  }
  .btn-mktg:hover {
    box-shadow: var(--color-mktg-btn-shadow-hover) !important;
    -webkit-text-decoration: none;
    text-decoration: none;
  }
  .btn-mktg:focus:before,
  .btn-mktg:hover:before {
    opacity: 1;
  }
  .btn-mktg:focus {
    box-shadow: none;
    outline: 2px solid var(--focus-outlineColor, var(--color-accent-fg));
    outline-offset: 2px;
  }
  .btn-mktg:focus:not(:focus-visible) {
    box-shadow: none;
    outline: 1px solid #0000;
  }
  .btn-mktg:active:before {
    opacity: 0.5 !important;
  }
  .btn-muted-mktg {
    background: none !important;
    box-shadow: var(--color-mktg-btn-shadow-outline);
    color: var(--fgColor-default, var(--color-fg-default)) !important;
  }
  .btn-muted-mktg:before {
    display: none;
  }
  .btn-muted-mktg:hover {
    box-shadow: var(--color-mktg-btn-shadow-hover-muted) !important;
  }
  .btn-muted-mktg:active {
    box-shadow: var(--fgColor-default, var(--color-fg-default)) 0 0 0 3px inset !important;
  }
  .btn-muted-mktg:disabled {
    box-shadow: var(--fgColor-default, var(--color-fg-default)) 0 0 0 1px inset !important;
  }
  .Link--primary {
    color: var(--fgColor-default, var(--color-fg-default)) !important;
  }
  .Link--primary:hover {
    color: var(--fgColor-accent, var(--color-accent-fg)) !important;
  }
}
/*! CSS Used from: https://github.githubassets.com/assets/global-616974fbcccf.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-social-reaction-bg-hover: var(--color-scale-gray-7);
    --color-social-reaction-bg-reacted-hover: var(--color-scale-blue-8);
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] ::selection {
    background-color: var(--selection-bgColor, var(--color-accent-muted));
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-workflow-card-connector: var(--color-scale-gray-5);
    --color-workflow-card-connector-bg: var(--color-scale-gray-5);
    --color-workflow-card-connector-inactive: var(
      --borderColor-default,
      var(--color-border-default)
    );
    --color-workflow-card-connector-inactive-bg: var(
      --borderColor-default,
      var(--color-border-default)
    );
    --color-workflow-card-connector-highlight: var(--color-scale-blue-5);
    --color-workflow-card-connector-highlight-bg: var(--color-scale-blue-5);
    --color-workflow-card-bg: var(--color-scale-gray-7);
    --color-workflow-card-inactive-bg: var(
      --bgColor-inset,
      var(--color-canvas-inset)
    );
    --color-workflow-card-header-shadow: rgba(27, 31, 35, 0.04);
    --color-workflow-card-progress-complete-bg: var(--color-scale-blue-5);
    --color-workflow-card-progress-incomplete-bg: var(--color-scale-gray-6);
    --color-discussions-state-answered-icon: var(--color-scale-green-3);
    --color-bg-discussions-row-emoji-box: var(--color-scale-gray-6);
    --color-notifications-button-text: var(--color-scale-white);
    --color-notifications-button-hover-text: var(--color-scale-white);
    --color-notifications-button-hover-bg: var(--color-scale-blue-4);
    --color-notifications-row-read-bg: var(
      --bgColor-default,
      var(--color-canvas-default)
    );
    --color-notifications-row-bg: var(
      --bgColor-muted,
      var(--color-canvas-subtle)
    );
    --color-icon-directory: var(--fgColor-muted, var(--color-fg-muted));
    --color-checks-step-error-icon: var(--color-scale-red-4);
    --color-calendar-halloween-graph-day-L1-bg: #631c03;
    --color-calendar-halloween-graph-day-L2-bg: #bd561d;
    --color-calendar-halloween-graph-day-L3-bg: #fa7a18;
    --color-calendar-halloween-graph-day-L4-bg: #fddf68;
    --color-calendar-winter-graph-day-L1-bg: #0a3069;
    --color-calendar-winter-graph-day-L2-bg: #0969da;
    --color-calendar-winter-graph-day-L3-bg: #54aeff;
    --color-calendar-winter-graph-day-L4-bg: #b6e3ff;
    --color-calendar-graph-day-bg: var(--color-scale-gray-8);
    --color-calendar-graph-day-border: rgba(27, 31, 35, 0.06);
    --color-calendar-graph-day-L1-bg: #0e4429;
    --color-calendar-graph-day-L2-bg: #006d32;
    --color-calendar-graph-day-L3-bg: #26a641;
    --color-calendar-graph-day-L4-bg: #39d353;
    --color-calendar-graph-day-L1-border: rgba(255, 255, 255, 0.05);
    --color-calendar-graph-day-L2-border: rgba(255, 255, 255, 0.05);
    --color-calendar-graph-day-L3-border: rgba(255, 255, 255, 0.05);
    --color-calendar-graph-day-L4-border: rgba(255, 255, 255, 0.05);
    --color-user-mention-fg: var(--color-scale-yellow-0);
    --color-user-mention-bg: var(--color-scale-yellow-8);
    --color-dashboard-feed-bg: var(--color-scale-gray-9);
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-project-header-bg: var(--color-scale-gray-9);
    --color-project-sidebar-bg: var(--color-scale-gray-8);
    --color-project-gradient-in: var(--color-scale-gray-8);
    --color-project-gradient-out: rgba(22, 27, 34, 0);
    --color-diff-blob-selected-line-highlight-mix-blend-mode: screen;
    --color-checks-donut-error: var(--color-scale-red-4);
    --color-checks-donut-pending: var(--color-scale-yellow-3);
    --color-checks-donut-success: var(--color-scale-green-4);
    --color-checks-donut-neutral: var(--color-scale-gray-3);
    --color-text-white: var(--color-scale-white);
  }
  @media (max-width: 543px) {
    [data-color-mode='dark'][data-dark-theme*='dark'] {
      --color-fg-default: var(--color-scale-gray-0);
      --color-canvas-default: var(--color-scale-gray-8);
    }
  }
  .gap-4 {
    gap: 24px !important;
  }
}
/*! CSS Used from: https://github.githubassets.com/assets/site-dfc0853a912d.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  .f4-mktg {
    font-family: 'Mona Sans', 'Mona Sans Fallback', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-feature-settings: 'ss02' on, 'ss01' on;
    font-weight: var(--base-text-weight-normal, 400);
  }
  .f4-mktg {
    font-size: 16px !important;
    line-height: 24px !important;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  .btn-mktg {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0.9rem 1.5rem 1.1rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    color: var(--bgColor-default, var(--color-canvas-default));
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      var(--color-mktg-btn-bg) !important;
    border: 0;
    border-radius: 0.375rem;
    transition: box-shadow 0.2s, outline 0.2s ease;
    -webkit-appearance: none !important;
    appearance: none !important;
  }
  .btn-mktg::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 100%
    ) !important;
    border-radius: inherit;
    opacity: 0;
    opacity: 0;
    transition: opacity 0.2s;
    background-blend-mode: normal;
  }
  .btn-mktg:hover {
    text-decoration: none;
    box-shadow: var(--color-mktg-btn-shadow-hover) !important;
  }
  .btn-mktg:hover::before,
  .btn-mktg:focus::before {
    opacity: 1;
  }
  .btn-mktg:focus {
    outline: 2px solid var(--focus-outlineColor, var(--color-accent-fg));
    outline-offset: 2px;
    box-shadow: none;
  }
  .btn-mktg:focus:not(:focus-visible) {
    outline: solid 1px transparent;
    box-shadow: none;
  }
  .btn-mktg:active::before {
    opacity: 0.5 !important;
  }
  .btn-muted-mktg {
    color: var(--fgColor-default, var(--color-fg-default)) !important;
    background: none !important;
    box-shadow: var(--color-mktg-btn-shadow-outline);
  }
  .btn-muted-mktg::before {
    display: none;
  }
  .btn-muted-mktg:hover {
    box-shadow: var(--color-mktg-btn-shadow-hover-muted) !important;
  }
  .btn-muted-mktg:active {
    box-shadow: var(--fgColor-default, var(--color-fg-default)) 0 0 0 3px inset !important;
  }
  .btn-muted-mktg:disabled {
    box-shadow: var(--fgColor-muted, var(--color-fg-subtle)) 0 0 0 1px inset !important;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  .btn-mktg .octicon {
    width: 1em;
    height: 1em;
  }
  .btn-mktg .arrow-symbol-mktg {
    transition: transform 0.2s;
    transform: translateX(0);
  }
  .btn-mktg .arrow-symbol-mktg path:last-child {
    stroke-dasharray: 10;
    stroke-dashoffset: 10;
    transition: stroke-dashoffset 0.2s;
  }
  @media screen and (prefers-reduced-motion: no-preference) {
    .btn-mktg:hover .arrow-symbol-mktg,
    .btn-mktg:focus .arrow-symbol-mktg {
      transform: translateX(4px);
    }
    .btn-mktg:hover .arrow-symbol-mktg path:last-child,
    .btn-mktg:focus .arrow-symbol-mktg path:last-child {
      stroke-dashoffset: 20;
    }
    .btn-mktg:active .arrow-symbol-mktg {
      transform: translateX(6px);
    }
  }
  .bottom-4 {
    bottom: 24px !important;
  }
  .z-1 {
    z-index: 1 !important;
  }
  .z-2 {
    z-index: 2 !important;
  }
  .z-3 {
    z-index: 3 !important;
  }
  .z-n1 {
    z-index: -1 !important;
  }
  :root [data-color-mode='dark'] {
    --color-canvas-default: #0d1117;
  }
  .events-none {
    pointer-events: none;
  }
  .font-mktg {
    font-family: 'Mona Sans', 'Mona Sans Fallback', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    word-break: keep-all;
  }
  .font-mktg [data-color-mode='dark'] {
    --color-fg-default: #fff !important;
  }
  .f4-mktg {
    font-feature-settings: unset;
  }
  .btn-mktg {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .build-in-scale-fade {
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(0.96);
  }
  .build-in-scale-fade.build-in-animate {
    opacity: 1;
    transform: scale(1);
  }
  .sub-nav-mktg.is-stuck {
    background: var(--bgColor-default, var(--color-canvas-default));
    box-shadow: var(--shadow-resting-medium, var(--color-shadow-medium)),
      0 1px 1px rgba(0, 0, 0, 0.1);
  }
  :root [data-color-mode='dark'] {
    --sub-nav-mktg-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3),
      0 3px 2px rgba(0, 0, 0, 0.2), 0 7px 7px rgba(0, 0, 0, 0.15);
  }
  .init-hidden:not(.is-stuck) {
    visibility: hidden;
  }
  @media (max-width: 1011px) {
    .sub-nav-mktg-ctas {
      display: none;
    }
  }
  @media (max-width: 1011px) {
    .sub-nav-mktg.scrollnav:not(.is-stuck) {
      visibility: hidden;
    }
    .sub-nav-mktg-toggle:hover {
      color: var(--fgColor-default, var(--color-fg-default));
    }
    .sub-nav-mktg:not(.on) .on-visible {
      display: none;
    }
    .sub-nav-mktg:not(.on) .sub-nav-mktg-link {
      display: inline-block;
    }
    .sub-nav-mktg:not(.on) .sub-nav-mktg-link:not(.active, .selected) {
      display: none;
    }
  }
  @media (min-width: 1012px) {
    .sub-nav-mktg-link {
      position: relative;
    }
    .sub-nav-mktg-link::after {
      position: absolute;
      bottom: 0;
      left: 15%;
      width: 70%;
      height: 1px;
      content: '';
      background-color: var(--fgColor-default, var(--color-fg-default));
      transition: transform 0.25s ease-in-out;
      transform: scale(0);
    }
    .sub-nav-mktg-link:hover::after {
      background-color: var(--bgColor-accent-emphasis, var(--color-accent-fg));
    }
    .sub-nav-mktg-link:hover::after,
    .sub-nav-mktg-link.selected::after {
      transform: scale(1);
    }
    .sub-nav-mktg-link.selected::after {
      transition-delay: 0.2s;
    }
    .sub-nav-mktg-ctas {
      transition: opacity 0.5s;
    }
  }
}
/*! CSS Used from: https://github.githubassets.com/assets/home-b7f602cc1515.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  .home-campaign-git-line {
    width: 2px;
  }
  @media (min-width: 768px) {
    .home-campaign-git-line {
      width: 3px;
    }
  }
  .home-campaign-hero {
    --mktg-accent-primary: #7c72ff;
  }
  .home-campaign-productivity {
    --mktg-accent-primary: #3fb950;
    --mktg-accent-secondary: #3fb950;
  }
  .home-campaign-collaboration {
    --mktg-accent-primary: #f778ba;
    --mktg-accent-secondary: #f778ba;
  }
  .home-campaign-security {
    --mktg-accent-primary: #33b3ae;
    --mktg-accent-secondary: #33b3ae;
  }
  .home-campaign-footer {
    --mktg-accent-primary: #dd7df7;
  }
  .build-in-scale-top {
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scaleY(0);
    transform-origin: 0 0;
  }
  .build-in-scale-top.build-in-animate {
    transform: scaleY(1);
  }
  .home-campaign-glowing-icon,
  .home-campaign-glowing-icon-glow {
    transform: translateZ(0);
  }
}
/*! CSS Used from: https://github.githubassets.com/assets/home-b7f602cc1515.css ; media=all */
@media all {
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  [data-color-mode='dark'][data-dark-theme*='dark'] {
    --color-mktg-btn-shadow-outline: rgba(255, 255, 255, 0.25) 0 0 0 1px inset;
    --color-marketing-icon-primary: var(--color-scale-blue-2);
    --color-marketing-icon-secondary: var(--color-scale-blue-5);
    --color-mktg-btn-bg: #f6f8fa;
    --color-mktg-btn-shadow-focus: rgba(255, 255, 255, 0.25) 0 0 0 4px;
    --color-mktg-btn-shadow-hover: 0 4px 7px rgba(0, 0, 0, 0.15),
      0 100px 80px rgba(255, 255, 255, 0.02),
      0 42px 33px rgba(255, 255, 255, 0.024),
      0 22px 18px rgba(255, 255, 255, 0.028),
      0 12px 10px rgba(255, 255, 255, 0.034),
      0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
    --color-mktg-btn-shadow-hover-muted: white 0 0 0 2px inset;
  }
  .home-campaign-git-line {
    width: 2px;
  }
  @media (min-width: 768px) {
    .home-campaign-git-line {
      width: 3px;
    }
  }
  .home-campaign-hero {
    --mktg-accent-primary: #7c72ff;
  }
  .home-campaign-productivity {
    --mktg-accent-primary: #3fb950;
    --mktg-accent-secondary: #3fb950;
  }
  .home-campaign-collaboration {
    --mktg-accent-primary: #f778ba;
    --mktg-accent-secondary: #f778ba;
  }
  .home-campaign-security {
    --mktg-accent-primary: #33b3ae;
    --mktg-accent-secondary: #33b3ae;
  }
  .home-campaign-footer {
    --mktg-accent-primary: #dd7df7;
  }
  .build-in-scale-top {
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scaleY(0);
    transform-origin: 0 0;
  }
  .build-in-scale-top.build-in-animate {
    transform: scaleY(1);
  }
  .home-campaign-glowing-icon,
  .home-campaign-glowing-icon-glow {
    transform: translateZ(0);
  }
}
/*! CSS Used from: chrome-extension://dgjhfomjieaadpoljlnidmbgkdffpack/css/contentPage.main.bundle.css */
[data-color-mode='dark'] {
  --mark-bg: var(--mark-bg-dark);
}
/*! CSS Used fontfaces */
@font-face {
  font-family: 'Mona Sans';
  src: url('https://github.githubassets.com/assets/mona-sans-d1bf285e9b9b.woff2')
      format('woff2 supports variations'),
    url('https://github.githubassets.com/assets/mona-sans-d1bf285e9b9b.woff2')
      format('woff2-variations');
  font-weight: 200 900;
  font-stretch: 75% 125%;
  font-display: swap;
}
@font-face {
  font-family: 'Mona Sans Fallback';
  size-adjust: 108.5%;
  ascent-override: 82%;
  src: local(Arial);
}
</style>
