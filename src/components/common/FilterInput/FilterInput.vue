<template>
  <div class="row">
    <div class="col filter-column large-8 medium-7 small-12">
      <div class="filter" :class="{ focus: open }">
        <div class="filter-wrapper">
          <div class="filter-top-wrapper">
            <button class="filter-filter-button">
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
            <div class="filter-input-box-wrapper">
              <label id="filter-label" for="filter-input" class="filter-input-label">
                <input
                  id="filter-input"
                  placeholder="Filter on this page"
                  type="text"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  class="filter-input"
                  @focus="onFocus"
                  @blur="onBlur"
                />
              </label>
            </div>
            <div class="filter-delete-button-wrapper">
              <button v-if="open" class="filter-delete-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="svg-icon clear-rounded-icon"
                  viewBox="0 0 16 16"
                >
                  <title>Clear</title>
                  <path
                    d="M10.5,11.3a.7.7,0,0,1-.6-.2L8,9.2,6.1,11.1a.7.7,0,0,1-.6.2.8.8,0,0,1-.9-.8.9.9,0,0,
    1,.3-.6L6.8,8,4.9,6.1a.9.9,0,0,1-.3-.6.8.8,0,0,1,.9-.8l.6.2L8,6.8,9.9,4.9a.7.7,0,0,1,
    .6-.2.8.8,0,0,1,.9.8.9.9,0,0,1-.3.6L9.2,8l1.9,1.9a.9.9,0,0,1,.3.6A.8.8,0,0,1,10.5,11.3ZM8,
    16A8,8,0,1,0,0,8,8,8,0,0,0,8,16Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <TagBar v-if="open" />
        </div>
      </div>
    </div>
    <div class="col large-4 medium-5 small-12">
      <DropDown :options="options" />
    </div>
  </div>
</template>

<script lang="ts" src="./FilterInput.ts"></script>
<style scoped src="./FilterInput.css"></style>
