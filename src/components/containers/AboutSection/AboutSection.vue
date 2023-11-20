<template>
  <div class="info-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="411" height="411">
      <defs>
        <clipPath id="image">
          <path
            d="M190.5 14.160254037844a30 30 0 0 1 30 0l143.20508075689 82.679491924311a30 30 0 0 1 15 25.980762113533l0 165.35898384862a30 30 0 0 1 -15 25.980762113533l-143.20508075689 82.679491924311a30 30 0 0 1 -30 0l-143.20508075689 -82.679491924311a30 30 0 0 1 -15 -25.980762113533l2.633606093737e-13 -165.35898384862a30 30 0 0 1 15 -25.980762113533"
          ></path>
        </clipPath>
      </defs>
      <image
        clip-path="url(#image)"
        height="100%"
        width="100%"
        x="0"
        y="10"
        href="@/assets/img/portrait.jpg"
        preserveAspectRatio="xMidYMin slice"
      ></image>
    </svg>

    <div>
      <h1>
        <span class="eyebrow">{{ $t('components.containers.about.eyebrow') }}</span
        >{{ $t('components.containers.about.title') }}
      </h1>
      <p class="typography-intro">
        {{
          $t('components.containers.about.description', {
            age: dates.age && dates.age,
            apprenticeshipYear: dates.apprenticeshipYear && dates.apprenticeshipYear + 1
          })
        }}
      </p>

      <LinkCollection :links="links" class="typography-intro" />
    </div>
  </div>

  <ShareSheet />
</template>

<script lang="ts" src="./AboutSection.ts"></script>
<style scoped src="./AboutSection.css"></style>
