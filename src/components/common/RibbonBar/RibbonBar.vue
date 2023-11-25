<template>
  <div class="rc-ribbon ribbon ribbon-blue-to-default rs-storehome-banner">
    <div class="ribbon-drop-wrapper">
      <div class="ribbon-content-wrapper">
        <div class="ribbon-content rc-ribbon-content-container row">
          <div class="column large-12 small-12 large-centered">
            <div class="rc-ribbon-content with-paddlenav">
              <div class="rc-inline-gallery rc-ribbon-content-autoscroll">
                <div id="ca7b6df0-8b08-11ee-8a7d-7334ba56aa54" class="rc-ribbon-content-gallery">
                  <div
                    class="rc-ribbon-content-scroller"
                    style="
                      transform: translateX(-1000px);
                      width: 300%;
                      left: -100%;
                      transition: none 0s ease 0s;
                    "
                  >
                    <div class="rc-ribbon-gallery-item rc-inline-gallery-item">
                      <div
                        class="rc-ribbon-content-item-base rc-ribbon-content-item-0 rc-ribbon-content-item"
                      >
                        {{
                          $t('components.common.RibbonBar.description', {
                            latestTag: tags.latest,
                            previousTag: tags.previous
                          })
                        }}&ensp;

                        <LinkCollection
                          ref="ribbon-link"
                          class="ribbon-link ribbon-link-animation icon-after-ribbon"
                          :links="links"
                        />
                      </div>
                    </div>
                    <div class="rc-ribbon-gallery-item rc-inline-gallery-item">
                      <div
                        class="rc-ribbon-content-item-base rc-ribbon-content-item-1 rc-ribbon-content-item"
                      >
                        <div>
                          Get $200–$650 in credit toward iPhone&nbsp;15 or iPhone&nbsp;15&nbsp;Pro
                          when you trade in an iPhone&nbsp;11 or higher.<sup>3</sup>
                          <a href="/shop/buy-iphone" class="ribbon-link more">Shop iPhone</a>
                        </div>
                      </div>
                    </div>
                    <div class="rc-ribbon-gallery-item rc-inline-gallery-item">
                      <div
                        class="rc-ribbon-content-item-base rc-ribbon-content-item-0 rc-ribbon-content-item"
                      >
                        <div>
                          Save on your new iPhone with special carrier deals at Apple.<sup>1</sup>
                          <a
                            href="/shop/buy-iphone/carrier-offers"
                            class="ribbon-link more"
                            target="_blank"
                          >
                            Find your deal<span class="a11y"> (Opens in a new window)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rc-gallery-paddlenav paddlenav paddlenav-compact">
                  <button class="paddlenav-arrow paddlenav-arrow-previous">
                    <Icon name="chevron.left" size="small" class="paddle-icon" />
                  </button>
                  <button class="paddlenav-arrow paddlenav-arrow-next">
                    <Icon name="chevron.right" size="small" class="paddle-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./RibbonBar.ts"></script>
<style scoped src="./RibbonBar.css"></style>
