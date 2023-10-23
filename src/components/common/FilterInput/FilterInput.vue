<template>
  <div class="filter-input-sticky-wrapper">
    <div class="filter-input-container">
      <div class="container">
        <div class="row">
          <div class="col filter-column large-8 medium-7 small-12">
            <div role="search" class="filter">
              <div class="filter__wrapper">
                <div class="filter__top-wrapper">
                  <button class="filter__filter-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="svg-icon filter-icon"
                      height="21"
                      width="21"
                      viewBox="0 0 41 41"
                      fill="currentColor"
                    >
                      <path
                        d="M20.8.3a20,20,0,0,1,0,40,20.1,20.1,0,0,1-20-20A20.2,20.2,0,0,1,20.8.3Zm0,2.6a17.4,17.4,0,0,0,0,34.8A17.2,17.2,0,0,0,38.2,20.3,17.3,17.3,0,0,0,20.8,2.9Z"
                      ></path>
                      <path
                        d="M31.9,16a1.1,1.1,0,0,0,1.2-1.1,1.1,1.1,0,0,0-1.2-1.1H9.8a1.1,1.1,0,0,0-1.2,1.1A1.1,1.1,0,0,0,9.8,16Z"
                      ></path>
                      <path
                        d="M29,22.6a1,1,0,0,0,1.1-1.1A1.1,1.1,0,0,0,29,20.4H12.7a1.1,1.1,0,0,0-1.2,1.1,1.1,1.1,0,0,0,1.2,1.1Z"
                      ></path>
                      <path
                        d="M25.9,29.2a1.1,1.1,0,0,0,1.2-1.1A1.1,1.1,0,0,0,25.9,27H15.8a1.1,1.1,0,0,0-1.2,1.1,1.1,1.1,0,0,0,1.2,1.1Z"
                      ></path>
                    </svg>
                  </button>
                  <div class="filter__input-box-wrapper">
                    <label
                      id="filter-label"
                      for="filter-input"
                      value=""
                      class="filter__input-label"
                    >
                      <input
                        id="filter-input"
                        placeholder="Filter on this page"
                        type="text"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        role="combobox"
                        class="filter__input"
                      />
                    </label>
                  </div>
                  <div class="filter__delete-button-wrapper"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col large-4 medium-5 small-12">
            <div class="form-element">
              <select class="form-dropdown form-dropdown-selectnone">
                <option class="hide-changes" value="hide">Current APIs</option>
                <option value="latest_major">Xcode 15.0 beta 8 – Xcode 15.1 beta 1</option>
                <option value="latest_beta">
                  Apple Pay Web Merchant Registration API 1.0 beta 1 – Apple Pay Web Merchant
                  Registration API 1.0
                </option>
                <option value="latest_minor">
                  Apple News Format 1.22 – Apple News Format 1.24
                </option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="svg-icon inline-chevron-down-icon form-icon"
                viewBox="0 0 14 14"
              >
                <path
                  d="m6.94042969 10.6855469c.17089843 0 .34179687-.0683594.45800781-.1982422l5.2910156-5.42089845c.116211-.11621094.1845703-.26660156.1845703-.4375 0-.35546875-.2666015-.62890625-.6220703-.62890625-.1708984 0-.328125.06835938-.4443359.17773438l-4.86718751 4.9765625-4.87402344-4.9765625c-.109375-.109375-.26660156-.17773438-.44433594-.17773438-.35546875 0-.62207031.2734375-.62207031.62890625 0 .17089844.06835938.32128906.18457031.44433594l5.29101563 5.41406251c.12988281.1298828.28710937.1982422.46484375.1982422z"
                ></path>
              </svg>
              <span class="form-label"> Show API Changes </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./FilterInput.ts"></script>
<style scoped src="./FilterInput.css"></style>
