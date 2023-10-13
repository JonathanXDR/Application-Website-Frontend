<template>
  <fieldset class="sticky-nav tile tile-rounded sticking">
    <legend class="visuallyhidden">Data filter by job type</legend>
    <div class="form-dropdown">
      <select class="form-dropdown-select" name="year">
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
      <span class="form-dropdown-chevron"></span>
    </div>
    <div class="role-selects-container">
      <ul class="role-selects">
        <li class="role-select">
          <input id="overall" type="radio" name="category" />
          <label for="overall" class="button">Overall</label>
        </li>
        <li class="role-select">
          <input id="tech" type="radio" name="category" />
          <label for="tech" class="button">Tech</label>
        </li>
        <li class="role-select">
          <input id="nontech" type="radio" name="category" />
          <label for="nontech" class="button">Nontech</label>
        </li>
        <li class="role-select">
          <input id="leadership" type="radio" name="category" />
          <label for="leadership" class="button">Leadership</label>
        </li>
        <li class="role-select">
          <input id="retail" type="radio" name="category" />
          <label for="retail" class="button">Retail</label>
        </li>
        <li class="role-select">
          <input id="retailLeadership" type="radio" name="category" />
          <label for="retailLeadership" class="button">Retail Leadership</label>
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script lang="ts" src="./FilterNav.ts"></script>
<style scoped src="./FilterNav.css"></style>
