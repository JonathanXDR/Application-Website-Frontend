<template>
  <div
    class="notification site-wide shown"
    role="status"
  >
    <div class="site-wide-container">
      <div class="form-alert">
        <div class="form-alert-notification-content">
          <div class="notification-content">
            <div
              class="welcome-toast-icon"
              aria-hidden="true"
            />
            <div class="welcome-notification">
              <div class="welcome-notification-header">
                <div class="welcome-notification-title form-alert-title">
                  Welcome to Apple Support Community
                </div>
              </div>
              <div class="welcome-notification-texts">
                <div>
                  A forum where Apple customers help each other with their
                  products. Get started with your Apple Account.
                </div>
                <div class="welcome-notification-links">
                  <a
                    class="icon icon-standalone icon-chevronright learn-more"
                    href="/learn"
                  >
                    Learn more
                  </a>
                  <a
                    class="icon icon-standalone icon-chevronright"
                    href="/login"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
            <button
              class="form-icons-wrapper"
              aria-label="Close notification"
              type="button"
            >
              <i class="icon icon-resetsolid form-alert-close-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-message-wrapper {
  color: #e30000;
  position: relative;
  margin-top: 0.4705882353rem;
  margin-bottom: 0.7058823529rem;
  display: none;
}

@media (min-width: 1069px) {
  .form-message-wrapper {
    font-size: 12px;
    line-height: 1.3333733333;
    font-weight: 400;
    letter-spacing: -0.01em;
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

.form-message-wrapper::before,
.form-message-wrapper::after {
  font-family: "SF Pro Icons";
  color: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: inherit;
  font-size: inherit;
  line-height: 1;
  text-decoration: underline;
  position: relative;
  z-index: 1;
  alt: "";
}

.form-message-wrapper::before,
.form-message-wrapper::after {
  text-decoration: none;
}

.form-message-wrapper::before {
  display: none;
}

.form-message-wrapper::before,
.form-message-wrapper::after {
  content: "";
}

.form-message-wrapper::before {
  display: inline-block;
  padding-inline-end: 0.24em;
  top: 0;
}

.form-message-wrapper::after {
  display: none;
}

.form-message-wrapper::before {
  padding-inline-end: 0.1764705882rem;
  padding-top: 0.1764705882rem;
}

.is-error .form-message-wrapper {
  display: flex;
}

.form-label {
  display: inline-block;
  position: relative;
  color: #1d1d1f;
}

@media (min-width: 1069px) {
  .form-label {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 400;
    letter-spacing: -0.022em;
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

.form-label-small {
  display: inline-block;
  position: relative;
  color: #1d1d1f;
}

@media (min-width: 1069px) {
  .form-label-small {
    font-size: 12px;
    line-height: 1.3333733333;
    font-weight: 400;
    letter-spacing: -0.01em;
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

.form-group-label {
  display: inline-block;
  position: relative;
  color: #1d1d1f;
}

@media (min-width: 1069px) {
  .form-group-label {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 400;
    letter-spacing: -0.022em;
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

.is-error .form-group-label {
  color: #e30000;
}

.form-title {
  display: inline-block;
  position: relative;
  color: #1d1d1f;
}

@media (min-width: 1069px) {
  .form-title {
    font-size: 24px;
    line-height: 1.1666666667;
    font-weight: 600;
    letter-spacing: 0.009em;
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

@media (max-width: 1068px) {
  .form-title {
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: 0.011em;
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

.form-alert {
  width: auto;
  height: auto;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  background-clip: padding-box;
  padding: 0.7058823529rem 0.9411764706rem;
  margin-bottom: 17px;
  margin-top: 17px;
  color: #1d1d1f;
  border-color: #d2d2d7;
  background-color: rgba(0, 0, 0, 0.02);
}

@media (min-width: 1069px) {
  .form-alert {
    font-size: 17px;
    line-height: 1.2353641176;
    font-weight: 400;
    letter-spacing: -0.022em;
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

.form-alert.is-error {
  background-color: #fff2f4;
  border-color: rgba(227, 0, 0, 0.4);
}

.form-alert-title {
  margin-bottom: 0.3529411765rem;
}

.form-icons {
  display: block;
}

.form-icons:focus,
.form-icons.focused {
  border-radius: 50%;
  outline: none;
}

.form-icons:focus[data-focus-method="key"],
.form-icons.focused[data-focus-method="key"] {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: 3px;
}

html.form-keyboarduser .form-icons:focus,
html.as-keyboarduser .form-icons:focus,
html.form-keyboarduser .form-icons.focused,
html.as-keyboarduser .form-icons.focused {
  outline: 2px solid var(--sk-focus-color, #0071e3);
  outline-offset: 3px;
}

.form-icons-before {
  margin-inline-start: 0;
  margin-inline-end: 0.4705882353rem;
}

.form-icons-after {
  margin-inline-start: 0.4705882353rem;
  margin-inline-end: 0;
}

.form-icons-wrapper {
  display: flex;
  align-items: center;
}

.form-icons-message {
  padding-inline-start: 0.1764705882rem;
  color: #6e6e73;
}

.form-icons-message .form-icons-message-link {
  color: #06c;
}

.form-icons-message .form-icons-message-link:hover {
  text-decoration: underline;
}

.form-icons-message .form-label-small {
  display: block;
}

.notification-content-inner-container {
  display: flex;
  align-items: center;
  margin-right: 11px;
}

.form-alert {
  background-color: #fafafc;
}

.form-alert .form-alert-title {
  font-weight: 600 !important;
  margin: 0 !important;
}

@media (min-width: 1069px) {
  .form-alert .form-alert-title {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

@media (max-width: 1068px) {
  .form-alert .form-alert-title {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

@media (max-width: 734px) {
  .form-alert .form-alert-title {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

@media (min-width: 1069px) {
  .form-alert p {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

@media (max-width: 1068px) {
  .form-alert p {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

@media (max-width: 734px) {
  .form-alert p {
    font-size: 17px;
    line-height: 1.4705882353;
    font-weight: 400;
    letter-spacing: -0.022em;
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

.form-alert-notification-content {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4em !important;
}

.form-alert-notification-content p {
  margin: 0;
}

.form-alert-notification-content.hide-icon {
  justify-content: flex-start;
}

.form-alert-notification-content .form-icons-wrapper {
  margin: 0;
  align-self: self-start;
  height: 25px;
}

.form-alert-notification-content .form-alert-close-icon {
  background: #6e6e73;
  width: 15px;
  height: 15px;
  border-radius: 8px;
  left: 0px;
  position: relative;
}

.form-alert-notification-content .form-alert-close-icon.icon-resetsolid:after {
  color: #d2d2d7;
  left: -2px;
}

.notification {
  position: relative;
  width: 100%;
  visibility: hidden;
  transition:
    visibility 0s ease 0.3s,
    max-height 0.3s ease-in-out,
    padding 0.3s ease-in-out;
}

.notification.page-specific {
  max-height: 0;
  will-change: max-height;
  transition:
    visibility 0s ease 0.3s,
    max-height 0.3s ease-in-out,
    padding 0.3s ease-in-out;
}

.notification.page-specific.shown {
  max-height: 120px;
  visibility: visible;
  transition:
    visibility 0s ease 0s,
    max-height 0.3s ease-in-out,
    padding 0.3s ease-in-out;
}

.notification.site-wide {
  position: fixed;
  bottom: 0;
  z-index: 10000;
  transform: translate(0, 120px);
  transition:
    visibility 0.3s ease 0s,
    transform 0.5s ease-in-out,
    padding-top 0.3s ease-in-out,
    padding-bottom 0.3s ease-in-out;
}

.notification.site-wide.shown {
  visibility: visible;
  transform: translate(0, 0);
  transition:
    visibility 0.3s ease 0s,
    transform 0.5s ease-in-out,
    padding-top 0.3s ease-in-out,
    padding-bottom 0.3s ease-in-out;
}

.notification.site-wide .site-wide-container {
  margin: 0 auto;
  max-width: 1024px;
  position: relative;
  width: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  min-width: 280px;
}

@media (max-width: 734px) {
  .notification.site-wide .site-wide-container {
    padding: 0 16px;
  }
}

.notification.site-wide .site-wide-container .form-alert {
  box-shadow: 0px 8px 300px 0px rgba(0, 0, 0, 0.2);
}

.notification .close-notificaiton {
  width: 12px;
  height: 12px;
  font-size: 12px;
  padding: 19px;
  position: absolute;
  right: 3px;
  top: 0px;
}

@media (max-width: 1068px) {
  .notification .close-notificaiton {
    top: 13px;
  }
}

@media (max-width: 734px) {
  .notification .close-notificaiton {
    top: 28px;
  }
}

.notification .notification-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.notification .notification-content ul {
  margin: 0.5em 0 0 1.11111em;
}

.notification .notification-content .welcome-notification {
  display: flex;
  flex-direction: column;
}

.notification
  .notification-content
  .welcome-notification
  .welcome-notification-title {
  font-weight: 600;
}

.notification .notification-content .welcome-toast-icon {
  background-image: url(/public/assets/welcome/welcome-toast.png);
  width: 56px;
  min-width: 56px;
  height: 56px;
  background-size: contain;
  background-repeat: no-repeat;
  align-self: flex-start;
}

.notification .notification-content .notification-icon {
  width: 25px;
  height: 25px;
  min-width: 25px;
  margin-right: 11px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  align-self: self-start;
}

.notification .notification-body {
  margin: 0 35px;
  text-align: center;
}

@media (max-width: 734px) {
  .notification .notification-body {
    margin: 0 20px;
  }
}

.notification-content {
  justify-content: normal !important;
}

.notification-content .welcome-notification {
  padding: 0;
  background-color: #fafafc;
  box-sizing: border-box;
  overflow: hidden;
}

@media (min-width: 1069px) {
  .notification-content .welcome-notification .welcome-notification-texts {
    font-size: 14px;
    line-height: 1.4285914286;
    font-weight: 400;
    letter-spacing: -0.016em;
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

@media (max-width: 1068px) {
  .notification-content .welcome-notification .welcome-notification-texts {
    font-size: 14px;
    line-height: 1.4285914286;
    font-weight: 400;
    letter-spacing: -0.016em;
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

@media (max-width: 734px) {
  .notification-content .welcome-notification .welcome-notification-texts {
    font-size: 14px;
    line-height: 1.4285914286;
    font-weight: 400;
    letter-spacing: -0.016em;
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

.notification-content .welcome-notification .welcome-notification-links {
  display: flex;
  flex-wrap: wrap;
}

.notification-content
  .welcome-notification
  .welcome-notification-links
  .learn-more {
  margin-right: 14px;
}

.notification-content
  .welcome-notification
  .welcome-notification-links
  .icon-chevronright::after {
  margin-left: 2px;
}

.notification-content .form-icons-wrapper {
  margin-left: auto;
}
</style>
