<template>
  <div>
    <div id="vhs">
      <div id="crt-lines"></div>
      <div id="darken"></div>
      <div id="vignette"></div>
    </div>

    <section id="about" class="section-separated">
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
            <span class="eyebrow">{{ data.about.eyebrow }}</span
            >{{ data.about.title }}
          </h1>
          <p class="typography-intro">
            Hallo mein Name ist Jonathan und ich bin
            <span id="age"></span> Jahre alt. Aktuell bin ich im
            <span id="training-year"></span>. Lehrjahr als Informatiker -
            Applikationsentwicklung. Ich wohne in Egg bei Einsiedeln im Kanton
            Schwyz. Das Programmieren fasziniert mich sehr und ich finde es
            spannend, was man damit alles erreichen kann. In meiner Freizeit
            spiele ich gerne Computer -und Konsolenspiele und treffe mich oft
            mit Freunden. Ausserdem höre ich häufig Musik und produziere sie
            auch manchmal selbst.
          </p>

          <p v-for="(link, index) in data.about.links" :key="index">
            <a :href="link.url" class="link typography-intro" target="_blank"
              >{{ link.title }}
              <component v-if="link.icon" :is="link.icon" />
            </a>
          </p>
        </div>
      </div>

      <ul class="sharesheet-options">
        <li
          v-for="(link, index) in data.sharesheet.links"
          :key="index"
          data-inviewport="sharesheet-options"
        >
          <a :href="link.url" target="_blank">
            <font-awesome-icon
              :icon="'fa-' + link.category + ' fa-' + link.icon"
            />
          </a>
        </li>
      </ul>
    </section>

    <section id="languages" class="section-separated">
      <h2>Sprachkenntnisse</h2>
      <div class="graph-gallery-container">
        <ul class="tabnav-items">
          <li
            v-for="(language, index) in data.languages"
            :key="index"
            class="tabnav-item"
          >
            <span class="tabnav-link current">{{ language.title }}</span>
          </li>
        </ul>

        <ul class="slide-container">
          <li
            v-for="(language, index) in data.languages"
            :key="index"
            class="graph-container"
          >
            <div :style="'width: ' + language.progress + '%'">
              <div data-inviewport="graph-bar" class="graph-bar current"></div>
              <p
                data-inviewport="graph-caption"
                class="graph-caption typography-graph-caption current"
              >
                {{ language.description }}
              </p>
            </div>
            <div
              data-inviewport="secondary-badge-value"
              class="typography-eyebrow-elevated secondary-badge-value current"
            >
              {{ language.progress }}%
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section id="references" class="section-separated">
      <h2>Referenzen</h2>
      <ul class="grid">
        <ArticleItem
          v-for="(references, index) in data.references"
          :key="index"
          :article="references"
        />
      </ul>
    </section>

    <section id="other" class="section-separated">
      <h2>Anderes</h2>
      <ul class="grid">
        <ArticleItem
          v-for="(other, index) in data.other"
          :key="index"
          :article="other"
        />
      </ul>
    </section>

    <section id="technologies">
      <h3 class="typography-magical-headline">Technologien</h3>

      <ul class="item-container">
        <CardTile
          v-for="(technologies, index) in data.technologies"
          :key="index"
          :card="technologies"
        />
      </ul>
    </section>

    <section id="personalProjects">
      <!-- insert Music Library here -->
      <!-- insert Galaxy Game here -->
    </section>

    <section id="projects">
      <h3 class="typography-magical-headline">Projekte bei Swisscom</h3>
      <div class="timeline-wrapper">
        <svg id="svg-timeline" preserveAspectRatio="none">
          <path
            class="path-timeline"
            d="M 4 0 L 4 2250"
            stroke-width="5"
            fill="none"
            fill-rule="evenodd"
            stroke="var(--color-fill-gray)"
            stroke-linecap="butt"
            stroke-miterlimit="10"
          ></path>
        </svg>

        <ul class="timeline" id="timeline-id">
          <ArticleItem
            v-for="(projects, index) in data.projects"
            :key="index"
            :article="projects"
          />
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./HomeView.ts"></script>
<style src="./HomeView.css"></style>
