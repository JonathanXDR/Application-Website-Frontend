<template>
  <fieldset class="sticky-nav tile tile-rounded sticking">
    <legend class="visuallyhidden">Data filter by job type</legend>
    <div class="form-dropdown">
      <select class="form-dropdown-select" name="year" aria-label="Year">
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
      </select>
      <span class="form-dropdown-chevron" aria-hidden="true"></span>
    </div>
    <div class="role-selects-container">
      <div class="role-selects">
        <div class="role-select">
          <input type="radio" name="role" value="overall" checked />
          <span id="role-overall-label" aria-hidden="true" class="button">Overall</span>
        </div>
        <div class="role-select">
          <input type="radio" name="role" value="tech" />
          <span id="role-tech-label" aria-hidden="true" class="button">Tech</span>
        </div>
        <div class="role-select">
          <input type="radio" name="role" value="nontech" />
          <span id="role-nontech-label" aria-hidden="true" class="button">Nontech</span>
        </div>
        <div class="role-select">
          <input type="radio" name="role" value="leadership" />
          <span id="role-leadership-label" aria-hidden="true" class="button">Leadership</span>
        </div>
        <div class="role-select">
          <input type="radio" name="role" value="retail" />
          <span id="role-retail-label" aria-hidden="true" class="button">Retail</span>
        </div>
        <div class="role-select">
          <input type="radio" name="role" value="retailLeadership" />
          <span id="role-retailLeadership-label" aria-hidden="true" class="button"
            >Retail Leadership</span
          >
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts" src="./FilterNav.ts"></script>
<style scoped src="./FilterNav.css"></style>
