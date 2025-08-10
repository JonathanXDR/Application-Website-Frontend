Below is a **complete content folder** you can paste into your repo. It moves everything from your `de.json` that "makes sense" to manage as content into **Nuxt Content v3** collections, and leaves pure UI micro‑copy in i18n. It's prepared for **multi‑language** (German now, English later).

---

## content.config.ts

```ts
// content.config.ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // 1) Pages per-locale (index, imprint, etc.)
    pages: defineCollection({
      type: "page",
      // Serve / from de/pages/index.md, /en from en/pages/index.md, etc.
      source: { include: "{de,en}/pages/**.md", prefix: "/" },
    }),

    // 2) Site meta (per locale)
    site: defineCollection({
      type: "data",
      source: "{de,en}/site/**.yml",
      schema: z.object({
        description: z.string(),
      }),
    }),

    // 3) Navigation (navbar + footer directory)
    navbar: defineCollection({
      type: "data",
      source: "{de,en}/navigation/navbar/**.yml",
      schema: z.object({
        id: z.string(),
        label: z.string(),
        route: z.string().optional(),
        class: z.string().optional(),
        icon: z.object({ name: z.string() }).optional(),
        children: z.array(z.any()).optional(),
      }),
    }),
    footerDirectory: defineCollection({
      type: "data",
      source: "{de,en}/navigation/footer-directory/**.yml",
    }),

    // 4) Banners
    banners: defineCollection({
      type: "data",
      source: "{de,en}/banners/**.yml",
      schema: z.object({
        description: z.string(),
        links: z.array(
          z.object({
            title: z.string(),
            url: z.string(),
            icon: z.object({ name: z.string() }).optional(),
          }),
        ),
      }),
    }),

    // 5) Segmented navigations (theme / projects / technologies)
    segmentsTheme: defineCollection({
      type: "data",
      source: "{de,en}/segments/theme/**.yml",
    }),
    segmentsProjects: defineCollection({
      type: "data",
      source: "{de,en}/segments/projects/**.yml",
    }),
    segmentsTechnologies: defineCollection({
      type: "data",
      source: "{de,en}/segments/technologies/**.yml",
    }),

    // 6) Footer bits
    footerCopyright: defineCollection({
      type: "data",
      source: "{de,en}/footer/copyright/**.yml",
    }),
    footerLegalLinks: defineCollection({
      type: "data",
      source: "{de,en}/footer/legal-links/**.yml",
    }),

    // 7) Social links (ShareSheet)
    social: defineCollection({ type: "data", source: "{de,en}/social/**.yml" }),

    // 8) Sections for the homepage
    sections: defineCollection({
      type: "page",
      source: "{de,en}/sections/**/*.md",
    }),

    // 9) Language skills, references, fun facts
    languages: defineCollection({
      type: "data",
      source: "{de,en}/languages/**.yml",
    }),
    references: defineCollection({
      type: "data",
      source: "{de,en}/references/**.yml",
    }),
    funFacts: defineCollection({
      type: "data",
      source: "{de,en}/fun-facts/**.yml",
    }),

    // 10) Technologies & Projects
    technologies: defineCollection({
      type: "data",
      source: "{de,en}/technologies/**.yml",
    }),
    projects: defineCollection({
      type: "data",
      source: "{de,en}/projects/**.yml",
    }),
  },
});
```

> You can extend schemas later for stricter typing. For brevity, only key fields are validated.

---

## i18n that stays out of Content (keep in `locales/de.json` etc.)

- `components.common.FilterInput.*`
- `components.common.LiveResultSummary.*`
- `components.common.CardItem.*`
- `components.common.LanguagePickerBar.*`
- `components.common.FooterCopyright.allRightsReserved`
- Error page micro‑copy in `pages[]` (404/500/etc.)

Everything else below is now Content.

---

## Folder structure

```txt
content/
  de/
    pages/
      index.md
    site/
      meta.yml
    navigation/
      navbar/
        01.overview.yml
        02.technologies.yml
        03.projects.yml
        overview/
          01.about.yml
          02.languages.yml
          03.fun-facts.yml
          04.references.yml
      footer-directory/
        01.overview.yml
        02.advanced.yml
        03.social.yml
    banners/
      01.latest-tag.yml
      02.swisscom-projects.yml
      03.technologies.yml
    segments/
      theme/
        01.light.yml
        02.dark.yml
        03.auto.yml
      projects/
        01.swisscom.yml
        02.personal.yml
        03.school.yml
      technologies/
        01.language.yml
        02.library.yml
        03.runtime.yml
        04.framework.yml
        05.container-management.yml
        06.orm.yml
    footer/
      copyright/
        01.links.yml
      legal-links/
        01-imprint.yml
        02-privacy.yml
    social/
      01-mail.yml
      02-linkedin.yml
      03-github.yml
      04-x.yml
    sections/
      about.md
    languages/
      de.yml
      en.yml
      fr.yml
    references/
      01-patrice-stampfli.yml
      02-steve-hess.yml
      03-nick-zimmermann.yml
      04-alessio-iantosca.yml
      05-carlo-schmid.yml
      06-kim-eggler.yml
      07-micha-humbel.yml
      08-radu-margineanu.yml
      09-oliver-kramer.yml
    fun-facts/
      01-travelled-km.yml
      02-work-hours.yml
      03-git-commits.yml
      04-lines-of-code.yml
      05-debug-hours.yml
      06-bugs-fixed.yml
      07-coffee-cups.yml
      08-music-hours.yml
    technologies/
      html.yml
      css.yml
      javascript.yml
      sdx.yml
      nodejs.yml
      sql.yml
      express.yml
      vue.yml
      typescript.yml
      csharp.yml
      java.yml
      bash.yml
      react.yml
      nextjs.yml
      docker.yml
      kubernetes.yml
      nestjs.yml
      prisma.yml
      typeorm.yml
      github-primer.yml
      tailwindcss.yml
      python.yml
      kotlin.yml
      jetpack-compose.yml
      material-design-3.yml
      nuxt.yml
      angular.yml
      bun.yml
      scala.yml
    projects/
      01-nex-first-steps.yml
      02-nexcc.yml
      03-banking-automation.yml
      04-apps-frontend.yml
      05-apps-backend.yml
      06-security-art.yml
      07-piz-tofana.yml
      08-apps-ipa.yml
  en/  (add mirrored files later)
```

---

## Files

### pages

```md
## // content/de/pages/index.md

title: Übersicht
description: Entdecke meinen Weg als Softwareentwickler, mit Projekten, Fähigkeiten und meiner Leidenschaft für effiziente, benutzerorientierte Lösungen in der Webentwicklung und darüber hinaus.

---

<!-- Your homepage is composed from collections (sections, banners, etc.).
     Keep body empty or render layout components here if you prefer MDC. -->
```

### site

```yml
# content/de/site/meta.yml
description: >-
  Entdecke meinen Weg als Softwareentwickler, mit Projekten, Fähigkeiten und meiner Leidenschaft
  für effiziente, benutzerorientierte Lösungen in der Webentwicklung und darüber hinaus.
```

### navigation — navbar (top level)

```yml
# content/de/navigation/navbar/01.overview.yml
id: overview
label: Übersicht
route: "/"
children: []
```

```yml
# content/de/navigation/navbar/02.technologies.yml
id: technologies
label: Technologien
route: /technologies
```

```yml
# content/de/navigation/navbar/03.projects.yml
id: projects
label: Projekte
route: /projects
```

### navigation — navbar (overview children)

```yml
# content/de/navigation/navbar/overview/01.about.yml
id: about
label: About
route: "/#about"
class: section-separated
```

```yml
# content/de/navigation/navbar/overview/02.languages.yml
id: languages
label: Sprachen
route: "/#languages"
class: section-separated
```

```yml
# content/de/navigation/navbar/overview/03.fun-facts.yml
id: fun-facts
label: Fun Facts
route: "/#funFacts"
class: section-separated
```

```yml
# content/de/navigation/navbar/overview/04.references.yml
id: references
label: Referenzen
route: "/#references"
class: section-separated
```

### banners

```yml
# content/de/banners/01.latest-tag.yml
description: "Was ist neu in {latestTag}?"
links:
  - title: Mehr erfahren
    url: "https://github.com/JonathanXDR/Application-Website-Frontend/compare/{previousTag}...{latestTag}"
    icon: { name: sf-symbols:chevron.right }
```

```yml
# content/de/banners/02.swisscom-projects.yml
description: "Erkunde meine neusten Projekte bei Swisscom!"
links:
  - title: Mehr erfahren
    url: /projects
    icon: { name: sf-symbols:chevron.right }
```

```yml
# content/de/banners/03.technologies.yml
description: "Entdecke alle Technologien, mit denen ich bisher gearbeitet habe!"
links:
  - title: Mehr erfahren
    url: /technologies
    icon: { name: sf-symbols:chevron.right }
```

### segments (theme)

```yml
# content/de/segments/theme/01.light.yml
id: light
category: theme
label: Hell
icon: { name: sf-symbols:sun.max.fill }
```

```yml
# content/de/segments/theme/02.dark.yml
id: dark
category: theme
label: Dunkel
icon: { name: sf-symbols:moon.fill }
```

```yml
# content/de/segments/theme/03.auto.yml
id: auto
category: theme
label: Auto
icon: { name: sf-symbols:circle.lefthalf.filled }
```

### segments (projects)

```yml
# content/de/segments/projects/01.swisscom.yml
id: swisscom
category: projects
label: Swisscom
icon: { name: sf-symbols:building.2.fill }
```

```yml
# content/de/segments/projects/02.personal.yml
id: personal
category: projects
label: Persönlich
icon: { name: sf-symbols:person.fill }
```

```yml
# content/de/segments/projects/03.school.yml
id: school
category: projects
label: Schule
icon: { name: sf-symbols:graduationcap.fill }
```

### segments (technologies)

```yml
# content/de/segments/technologies/01.language.yml
id: language
category: technologies
label: Sprache
icon: { name: sf-symbols:bubble.fill }
```

```yml
# content/de/segments/technologies/02.library.yml
id: library
category: technologies
label: Bibliothek
icon: { name: sf-symbols:books.vertical.fill }
```

```yml
# content/de/segments/technologies/03.runtime.yml
id: runtime
category: technologies
label: Runtime
icon: { name: sf-symbols:gear }
```

```yml
# content/de/segments/technologies/04.framework.yml
id: framework
category: technologies
label: Framework
icon: { name: sf-symbols:inset.filled.square.dashed }
```

```yml
# content/de/segments/technologies/05.container-management.yml
id: container-management
category: technologies
label: Container Management
icon: { name: sf-symbols:shippingbox.fill }
```

```yml
# content/de/segments/technologies/06.orm.yml
id: orm
category: technologies
label: ORM
icon: { name: sf-symbols:gear }
```

### footer directory (3 columns)

```yml
# content/de/navigation/footer-directory/01.overview.yml
id: overview
children:
  - id: overview
    label: Übersicht
    children:
      - { id: about, label: "Über mich", route: "/#about" }
      - { id: languages, label: "Sprachen", route: "/#languages" }
      - { id: fun-facts, label: "Fun Facts", route: "/#funFacts" }
      - { id: references, label: "Referenzen", route: "/#references" }
      - { id: school, label: "Schule", route: "/#school" }
```

```yml
# content/de/navigation/footer-directory/02.advanced.yml
id: advanced
label: Fortgeschritten
children:
  - { id: technologies, label: Technologien, route: /technologies }
  - { id: projects, label: Projekte, route: /projects }
```

```yml
# content/de/navigation/footer-directory/03.social.yml
id: social
label: Soziale Medien
children:
  - {
      id: mail,
      label: Mail,
      url: "mailto:contact@jonathan-russ.com",
      icon: { name: fa6-solid:envelope },
    }
  - {
      id: linkedin,
      label: LinkedIn,
      url: "https://linkedin.com/in/jonathan-russ-b7442a228",
      icon: { name: fa6-brands:linkedin-in },
    }
  - {
      id: github,
      label: GitHub,
      url: "https://github.com/JonathanXDR",
      icon: { name: fa6-brands:github },
    }
  - {
      id: x,
      label: "X (Twitter)",
      url: "https://x.com/JonathanXD12_",
      icon: { name: fa6-brands:x-twitter },
    }
```

### footer: copyright links & legal links

```yml
# content/de/footer/copyright/01.links.yml
links:
  - { title: "Jonathan Russ", url: "https://jonathan-russ.com" }
```

```yml
# content/de/footer/legal-links/01-imprint.yml
title: Imprint
url: /imprint
```

```yml
# content/de/footer/legal-links/02-privacy.yml
title: Privacy Policy
url: /privacy
```

### social (ShareSheet)

```yml
# content/de/social/01-mail.yml
title: Mail
url: "mailto:contact@jonathan-russ.com"
icon: { name: fa6-solid:envelope }
```

```yml
# content/de/social/02-linkedin.yml
title: LinkedIn
url: "https://linkedin.com/in/jonathan-russ-b7442a228"
icon: { name: fa6-brands:linkedin-in }
```

```yml
# content/de/social/03-github.yml
title: GitHub
url: "https://github.com/JonathanXDR"
icon: { name: fa6-brands:github }
```

```yml
# content/de/social/04-x.yml
title: "X (Twitter)"
url: "https://x.com/JonathanXD12_"
icon: { name: fa6-brands:x-twitter }
```

### sections — about

```md
## // content/de/sections/about.md

id: about
title: About Me
eyebrow: ''
birthDate: '2005-12-12'

---

Hey, ich bin Jonathan! Ich bin {{ $doc.age || '' }} Jahre alt und komme aus der Schweiz.

Schon früh war ich von Computern begeistert, und diese Leidenschaft begleitet mich bis heute. Mein erster Einstieg ins Programmieren begann mit Minecraft Commands und Command‑Blöcken, was meine Faszination für die Welt der Softwareentwicklung geweckt hat.

Kürzlich habe ich meine Ausbildung zum Informatiker EFZ Applikationsentwicklung erfolgreich abgeschlossen. Ich arbeite in einem Bereich, der sich ständig weiterentwickelt und immer neue Herausforderungen bietet. Ich finde es faszinierend, was man mit Code alles erreichen kann. Egal, ob komplexe Anwendungen oder innovative Ansätze. Die nahezu unbegrenzten Möglichkeiten begeistern mich. Besonders liebe ich es, kreative Projekte zu realisieren und Ideen in der digitalen Welt zum Leben zu erwecken.

Wenn ich nicht gerade programmiere, spiele ich gerne Computer‑ und Konsolenspiele oder verbringe Zeit mit meinen Freunden. Musik begleitet mich oft durch den Tag und ist ein wichtiger Teil meines Lebens.
```

> Compute `age` in your component and pass via `<ContentRenderer :data="{ age }" />`.

### languages

```yml
# content/de/languages/de.yml
title: Deutsch
eyebrow: Muttersprache
progress: 100
divider: { direction: left }
```

```yml
# content/de/languages/en.yml
title: Englisch
eyebrow: Fliessend
progress: 60
divider: { direction: left }
links:
  - {
      title: "B1 Preliminary",
      url: "https://www.cambridgeenglish.org/de/exams-and-tests/preliminary",
    }
  - {
      title: "B2 First",
      url: "https://www.cambridgeenglish.org/de/exams-and-tests/first",
    }
```

```yml
# content/de/languages/fr.yml
title: Französisch
eyebrow: Gut
progress: 30
divider: { direction: left }
```

### references

```yml
# content/de/references/01-patrice-stampfli.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Aktueller Vorgesetzter
title: Patrice Stampfli
description: Lernbegleiter (Coach) Next Generation
info:
  location: Itt-Ey10
  department: GHR-SCS-NEX
```

```yml
# content/de/references/02-steve-hess.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Vorgesetzter
title: Steve Hess
description: Lernbegleiter (Coach) Next Generation
info:
  location: Wor-Ati6
  department: GHR-SCS-NEX
```

```yml
# content/de/references/03-nick-zimmermann.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Projektanbieter
title: Nick Zimmermann
description: DevOps Engineer
links:
  - {
      title: "Mehr erfahren",
      url: "https://nickzimmermann.com",
      icon: { name: sf-symbols:chevron.right },
    }
info:
  location: Zür-För181
  department: SCS-INI-DOS-DVX
```

```yml
# content/de/references/04-alessio-iantosca.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Projektanbieter
title: Alessio Iantosca
description: RPA & Test-Automation Engineer
info:
  location: Zür-Pfi51
  department: SCS-B2B-TBS-BPS-BPM-AU1
```

```yml
# content/de/references/05-carlo-schmid.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Projektanbieter
title: Carlo Schmid
description: Full-Stack Developer
info:
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

```yml
# content/de/references/06-kim-eggler.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Aktueller Projektanbieter
title: Kim Eggler
description: Full-Stack Developer
links:
  - {
      title: "Mehr erfahren",
      url: "https://retrostories.ch",
      icon: { name: sf-symbols:chevron.right },
    }
info:
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

```yml
# content/de/references/07-micha-humbel.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Vorgesetze Fachkrat IPA
title: Micha Humbel
description: Full-Stack Developer
info:
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

```yml
# content/de/references/08-radu-margineanu.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Projektanbieter
title: Radu Margineanu
description: Enterprise & System Achitect
info:
  location: Zür-För181
  department: SCS-INI-EOG-EA-EAF
```

```yml
# content/de/references/09-oliver-kramer.yml
icon: { name: sf-symbols:person.fill }
eyebrow: Ehemaliger Projektanbieter
title: Oliver Kramer
description: Cyber Security Specialist
info:
  location: Zür-För181
  department: INI-EOG-SPA
```

### fun facts

```yml
# content/de/fun-facts/01-travelled-km.yml
progress: 100000
description: Zurückgelegte Kilometer
```

```yml
# content/de/fun-facts/02-work-hours.yml
progress: 10000
description: Geleistete Arbeitsstunden
```

```yml
# content/de/fun-facts/03-git-commits.yml
progress: 15000
description: Git commits
```

```yml
# content/de/fun-facts/04-lines-of-code.yml
progress: 1000000
description: Geschriebene Codezeilen
```

```yml
# content/de/fun-facts/05-debug-hours.yml
progress: 1000
description: Investierte Stunden ins Debugging
```

```yml
# content/de/fun-facts/06-bugs-fixed.yml
progress: 2000
description: Gefixte Bugs
```

```yml
# content/de/fun-facts/07-coffee-cups.yml
progress: 2400
description: Getrunkene Tassen Kaffee
```

```yml
# content/de/fun-facts/08-music-hours.yml
progress: 7200
description: Gehörte Stunden Musik
```

### technologies (one file per tech)

```yml
# content/de/technologies/html.yml
icon:
  name: simple-icons:html5
  background: "#E34F26"
  colors: { primary: "#E34F26", secondary: "#E34F26", tertiary: "#E34F26" }
eyebrow: Sprache
title: HTML
description: >-
  Ich habe HTML beim Erstellen dieser Webseite gelernt und fühle mich damit sehr sicher,
  da ich es in fast allen bisherigen Projekten verwendet habe.
badges:
  - { title: Markup }
  - { title: Web }
  - { title: Frontend }
links:
  - {
      title: "Mehr erfahren",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/css.yml
icon:
  name: simple-icons:css
  background: "#663399"
  colors: { primary: "#663399", secondary: "#663399", tertiary: "#663399" }
eyebrow: Sprache
title: CSS
description: >-
  CSS habe ich ebenfalls während dem Aufbau dieser Webseite gelernt. Da CSS genau wie HTML
  in fast jedem Projekt verwendet wird, habe ich auch hier schon viel Erfahrung gesammelt.
badges:
  - { title: Styling }
  - { title: Web }
  - { title: Frontend }
  - { title: Design }
links:
  - {
      title: "Mehr erfahren",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/javascript.yml
icon:
  name: simple-icons:javascript
  background: "#F7DF1E"
  colors: { primary: "#F7DF1E", secondary: "#F7DF1E", tertiary: "#F7DF1E" }
eyebrow: Sprache
title: JavaScript
description: >-
  Das ist wahrscheinlich meine meist verwendete Programmiersprache. Ich habe damit schon bei
  vielen Projekten gearbeitet und auch schon mit Frameworks und Libraries, wie Vue.js, React
  oder Express.js angewendet, die ja darauf aufbauen.
badges:
  - { title: Scripting }
  - { title: Web }
  - { title: Frontend }
  - { title: Backend }
links:
  - {
      title: "Mehr erfahren",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/sdx.yml
icon:
  name: simple-icons-extended:swisscom
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Bibliothek
title: SDX
description: >-
  Mit der Swisscom Digital Experience (SDX) Library bin ich schon mehrmals während meiner Ausbildung
  in Kontakt gekommen. Ich habe damit z.B. beim Entwickeln der Apps Team Webseite, der Medienkurse
  und noch vielen weiteren Swisscom-Applikationen gearbeitet.
badges:
  - { title: Swisscom }
  - { title: Design }
  - { title: UI }
links:
  - {
      title: "Mehr erfahren",
      url: "https://sdx.swisscom.ch",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/nodejs.yml
icon:
  name: simple-icons:nodedotjs
  background: "#5FA04E"
  colors: { primary: "#5FA04E", secondary: "#5FA04E", tertiary: "#5FA04E" }
eyebrow: Runtime
title: Node.js
description: >-
  Diese Technologie habe ich im NexCC das allererste mal gelernt und angewendet. Dabei habe ich
  zuerst kennengelernt was Node.js überhaupt ist und auch wie man dependencies mit NPM installiert
  und verwaltet.
badges:
  - { title: Server }
  - { title: Backend }
  - { title: Javascript, icon: { name: simple-icons:javascript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://nodejs.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/sql.yml
icon:
  name: simple-icons:mysql
  background: "#4479A1"
  colors: { primary: "#4479A1", secondary: "#4479A1", tertiary: "#4479A1" }
eyebrow: Sprache
title: SQL
description: >-
  SQL habe ich erstmals während der Entwicklung meiner CRUD-App im NexCC verwendent, dabei habe ich
  die Basics gelernt. Später gab es auch noch die beiden Berufsschulmodule 162 und 164 und den ÜK-106,
  der auch fortgeschrittene Abfragen beinhaltete.
badges:
  - { title: Database }
  - { title: Query }
  - { title: Backend }
links:
  - {
      title: "Mehr erfahren",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/SQL",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/express.yml
icon:
  name: simple-icons:express
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Framework
title: Express.js
description: >-
  Meine CRUD-App im NexCC habe ich damit erstellt, was sehr lehrreich für mich war. Später hatte ich
  auch noch einen entsprechenden ÜK, welcher darum ging ein Backend mit Express.js zu erstellen.
badges:
  - { title: Web }
  - { title: Backend }
  - { title: Node, icon: { name: simple-icons:nodedotjs } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://expressjs.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/vue.yml
icon:
  name: simple-icons:vuedotjs
  background: "#4FC08D"
  colors: { primary: "#4FC08D", secondary: "#4FC08D", tertiary: "#4FC08D" }
eyebrow: Framework
title: Vue.js
description: >-
  Diese Webseite ist mit Vue.js erstellt worden und ich habe damit auch anderweitig gearbeitet.
  Beispiele sind meine Memory App im Apps Team oder das Zukunftstagstool und die Berufsschulapp,
  welche ich wiederrum im NexCC erstellt habe.
badges:
  - { title: Frontend }
  - { title: Web }
  - { title: Javascript, icon: { name: simple-icons:javascript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://vuejs.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/typescript.yml
icon:
  name: simple-icons:typescript
  background: "#3178C6"
  colors: { primary: "#3178C6", secondary: "#3178C6", tertiary: "#3178C6" }
eyebrow: Sprache
title: TypeScript
description: >-
  Diese Technologie habe ich das erste mal bei meiner Memory-App im Apps Team verwendet und benutze
  seither wenn möglich nur noch TypeScript anstelle von JavaScript. Projekte, bei denen ich TypeScript
  gearbeitet habe, sind z.B. die Apps Team Webseite, die CRUD-App im Apps Team oder auch das
  Fleetmanagement Tool.
badges:
  - { title: Typed }
  - { title: "Full Stack" }
  - { title: Javascript, icon: { name: simple-icons:javascript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://typescriptlang.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/csharp.yml
icon:
  name: simple-icons-extended:csharp
  background: "#7153DC"
  colors: { primary: "#7153DC", secondary: "#7153DC", tertiary: "#7153DC" }
eyebrow: Sprache
title: C#
description: >-
  Ich habe C# bereits in der 3. Oberstufe kennengelernt, als ich ein eigenes Spiel mit Unity als
  Abschlussarbeit erstellt habe. Bei den Automatisierungsprojekten im Banking Bereich habe ich dann
  noch ein wenig mehr darüber gelernt.
badges:
  - { title: Microsoft }
  - { title: Backend }
  - { title: "Object-Oriented" }
links:
  - {
      title: "Mehr erfahren",
      url: "https://docs.microsoft.com/en-us/dotnet/csharp",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/java.yml
icon:
  name: simple-icons-extended:java
  background: "#007396"
  colors: { primary: "#007396", secondary: "#007396", tertiary: "#007396" }
eyebrow: Sprache
title: Java
description: >-
  Java kenne ich hauptsächlich vom Berufsschulmodul 319, wo wir damit gearbeitet haben und kleinere
  Aufgaben programmieren mussten. Im Modul 320 kam dann auch noch OOP dazu, was ich sehr interessant
  fand. Ausserdem habe ich auch noch den ÜK-223 besucht, bei dem es darum ging Multi-User‑Applikationen
  objektorientiert zu realisieren. Das haben wir mit einem Java‑Backend und einem ORM gemacht.
badges:
  - { title: Backend }
  - { title: "Object-Oriented" }
  - { title: Enterprise }
links:
  - {
      title: "Mehr erfahren",
      url: "https://java.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/bash.yml
icon:
  name: simple-icons:gnubash
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Sprache
title: Bash
description: >-
  Ich habe schon oft mit Bash gearbeitet und bin damit mittlerweile auch einigermassen vertraut.
  Ich habe damit z.B. schon ein paar kleine Skripte geschrieben, um mir die Arbeit zu erleichtern.
  Zudem gab es auch das Modul 122 in der Berufsschule, bei dem wir ebenfalls mit Bash gearbeitet haben.
badges:
  - { title: Scripting }
  - { title: Shell }
  - { title: Linux }
links:
  - {
      title: "Mehr erfahren",
      url: "https://gnu.org/software/bash",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/react.yml
icon:
  name: simple-icons:react
  background: "#61DAFB"
  colors: { primary: "#61DAFB", secondary: "#61DAFB", tertiary: "#61DAFB" }
eyebrow: Framework
title: React
description: >-
  React selbst habe ich erst gelernt, nachdem ich bereits mit Next.js gearbeitet habe, daher war die
  Lernkurve nicht mehr so steil. Beispiele für Projekte, bei denen ich React verwendet habe, sind z.B.
  die Medienkurse, das Fleetmanagement Tool oder auch die neuen Webfrontends.
badges:
  - { title: Frontend }
  - { title: Web }
  - { title: UI }
  - { title: Javascript, icon: { name: simple-icons:javascript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://reactjs.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/nextjs.yml
icon:
  name: simple-icons:nextdotjs
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Framework
title: Next.js
description: >-
  Das erste mal kennenlernen durte ich Next.js im Apps Team, wo ich damit die neue Apps Team Webseite
  erstellt habe. Dort habe ich gleichzeitig auch sehr viel über React gelernt und konnte so meine
  Kenntnisse gleich in beiden Frameworks verbessern.
badges:
  - { title: Frontend }
  - { title: Web }
  - { title: SSR }
  - { title: React, icon: { name: simple-icons:react } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://nextjs.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/docker.yml
icon:
  name: simple-icons:docker
  background: "#2496ED"
  colors: { primary: "#2496ED", secondary: "#2496ED", tertiary: "#2496ED" }
eyebrow: "Container Management"
title: Docker
description: >-
  Richtig verstanden und mich damit beschäftigt habe ich Docker im Berufsschulmodul 347, wo wir eine
  Applikation mittels CI/CD deployen mussten. Dazu gab es den ÜK 210, bei dem es um das Thema Cloud ging
  und wir auch dort nochmal mit Docker gearbeitet haben.
badges:
  - { title: Container }
  - { title: DevOps }
  - { title: Cloud }
links:
  - {
      title: "Mehr erfahren",
      url: "https://docker.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/kubernetes.yml
icon:
  name: simple-icons:kubernetes
  background: "#326CE5"
  colors: { primary: "#326CE5", secondary: "#326CE5", tertiary: "#326CE5" }
eyebrow: "Container Management"
title: Kubernetes
description: >-
  Auch Kubernetes habe ich im Berufsschulmodul 347 kennengelernt und dort verwendet, um eine Applikation
  mittels CI/CD zu deployen. Der ÜK 210 hat mir dann nochmal einen tieferen Einblick in die
  Container‑Orchestrierung gegeben, da er sich mehr damit beschäftigt hat.
badges:
  - { title: Container }
  - { title: Orchestration }
  - { title: DevOps }
links:
  - {
      title: "Mehr erfahren",
      url: "https://kubernetes.io",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/nestjs.yml
icon:
  name: simple-icons:nestjs
  background: "#E0234E"
  colors: { primary: "#E0234E", secondary: "#E0234E", tertiary: "#E0234E" }
eyebrow: Framework
title: Nest.js
description: >-
  Dieses Backend‑Framework habe ich im Apps Team kennengelernt und habe damit meine CRUD‑App erstellt.
  Dabei habe ich viel über die Architektur und die verschiedenen Module gelernt. Ausserdem habe ich auch
  in produktiven Projekten im Apps Team, wie z.B. dem Fleetmanagement Tool oder den neuen Webfrontends
  damit gearbeitet.
badges:
  - { title: Backend }
  - { title: Node, icon: { name: simple-icons:nodedotjs } }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://nestjs.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/prisma.yml
icon:
  name: simple-icons:prisma
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: ORM
title: Prisma
description: >-
  Das habe ich verwendet um meine CRUD‑App zu erstellen und ich bin dabei das erste mal mit einem ORM
  in Berührung gekommen. Später habe ich auch beim Fleetmanagement Tool mit Prisma gearbeiet.
badges:
  - { title: Database }
  - { title: ORM }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://prisma.io",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/typeorm.yml
icon:
  name: simple-icons:typeorm
  background: "#FE0803"
  colors: { primary: "#FE0803", secondary: "#FE0803", tertiary: "#FE0803" }
eyebrow: ORM
title: TypeORM
description: >-
  Als Alternative zu Prisma habe ich meine CRUD‑App, nachdem ich sie fertiggestellt habe, auch noch
  mit TypeORM umgesetzt, da auch dieses ORM in diversen Projekten im Apps Team verwendet wird.
badges:
  - { title: Database }
  - { title: ORM }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://typeorm.io",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/github-primer.yml
icon:
  name: simple-icons:github
  background: "#4493F8"
  colors: { primary: "#4493F8", secondary: "#4493F8", tertiary: "#4493F8" }
eyebrow: Bibliothek
title: GitHub Primer
description: >-
  Ich habe GitHub Primer benutzt, um ein Frontend zusammen mit React für meine CRUD‑App im Apps Team
  zu erstellen.
badges:
  - { title: Frontend }
  - { title: Design }
  - { title: UI }
  - { title: React, icon: { name: simple-icons:react } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://primer.style",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/tailwindcss.yml
icon:
  name: simple-icons:tailwindcss
  background: "#06B6D4"
  colors: { primary: "#06B6D4", secondary: "#06B6D4", tertiary: "#06B6D4" }
eyebrow: Bibliothek
title: Tailwind CSS
description: >-
  Tailwind CSS wurde zusammen mit SDX in vielen Projekten im Apps Team verwendet. Das Fleetmanagement
  Tool und die neuen Webfrontends sind zwei Beispiele dafür.
badges:
  - { title: Frontend }
  - { title: Design }
  - { title: UI }
  - { title: CSS, icon: { name: simple-icons:css } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://tailwindcss.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/python.yml
icon:
  name: simple-icons:python
  background: "#3776AB"
  colors: { primary: "#3776AB", secondary: "#3776AB", tertiary: "#3776AB" }
eyebrow: Sprache
title: Python
description: >-
  Diese Programmiersprache habe ich im Security Journey gelernt und sie für die Entwicklung des DAM
  Log Scanners verwendet, ein Tool, welches Datenbankaktivitäten aufzeichnet.
badges:
  - { title: Scripting }
  - { title: Backend }
  - { title: "Object-Oriented" }
links:
  - {
      title: "Mehr erfahren",
      url: "https://python.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/kotlin.yml
icon:
  name: simple-icons:kotlin
  background: "#7F52FF"
  colors: { primary: "#7F52FF", secondary: "#7F52FF", tertiary: "#7F52FF" }
eyebrow: Sprache
title: Kotlin
description: >-
  Kotlin habe ich im ÜK 335 gelernt, wo wir als Projektarbeit eine Android App erstellt haben. Dabei
  konnten wir selbst entscheiden, ob wir Java oder Kotlin verwenden. Ich habe mich für Kotlin entschieden,
  da ich es interessant fand und es auch eine moderne Programmiersprache ist.
badges:
  - { title: Mobile }
  - { title: "Object-Oriented" }
  - { title: Android, icon: { name: simple-icons:android } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://kotlinlang.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/jetpack-compose.yml
icon:
  name: simple-icons:jetpackcompose
  background: "#4285F4"
  colors: { primary: "#4285F4", secondary: "#4285F4", tertiary: "#4285F4" }
eyebrow: Sprache
title: Jetpack Compose
description: >-
  Ich habe Jetpack Compose das erste mal zusammen mit Kotlin im ÜK 335 verwendet, wo wir eine Android
  App erstellt haben.
badges:
  - { title: Mobile }
  - { title: UI }
  - { title: Android, icon: { name: simple-icons:android } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://developer.android.com/compose",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/material-design-3.yml
icon:
  name: simple-icons:android
  background: "#34A853"
  colors: { primary: "#34A853", secondary: "#34A853", tertiary: "#34A853" }
eyebrow: Bibliothek
title: Material Design 3
description: >-
  Während meiner Projektarbeit im ÜK 335 habe ich Material Design 3 verwendet, um die Android App zu
  gestalten.
badges:
  - { title: Mobile }
  - { title: UI }
  - { title: Design }
  - { title: Google }
  - { title: Android, icon: { name: simple-icons:android } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://m3.material.io",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/nuxt.yml
icon:
  name: simple-icons:nuxt
  background: "#00DC82"
  colors: { primary: "#00DC82", secondary: "#00DC82", tertiary: "#00DC82" }
eyebrow: Framework
title: Nuxt
description: >-
  Nuxt habe ich mir selbst beigebracht, da ich es interessant fand und auch gerne mit Vue programmiere,
  worauf Nuxt aufbaut. Bisher habe ich es allerdings bei keinen Projeken ausser dieser Webseite verwendet.
badges:
  - { title: Frontend }
  - { title: Web }
  - { title: SSR }
  - { title: Vue, icon: { name: simple-icons:vuedotjs } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://nuxt.com",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/angular.yml
icon:
  name: simple-icons:angular
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Framework
title: Angular
description: >-
  Während ich im Piz Tofana Team war, habe ich Angular kennengelernt und auch damit gearbeitet. Damit
  haben wir nämlich während der Entwicklung des Frontends von Daedalus gearbeitet.
badges:
  - { title: Frontend }
  - { title: Web }
  - { title: UI }
  - { title: Javascript, icon: { name: simple-icons:javascript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://angular.io",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/bun.yml
icon:
  name: simple-icons:bun
  background: "var(--color-card-logo-secondary)"
  colors:
    {
      primary: "var(--color-card-logo-primary)",
      secondary: "var(--color-card-logo-secondary)",
      tertiary: "var(--color-card-logo-tertiary)",
    }
eyebrow: Runtime
title: Bun
description: >-
  Ich habe Bun kennengelernt, als ich meine Webseite auf Nuxt umgestellt habe. Vorallem die Einfachheit
  und die Geschwindigkeit im Gegensatz zu Node.js haben mich dabei überzeugt, weswegen ich wenn möglich
  nur noch Bun verwende.
badges:
  - { title: Server }
  - { title: Backend }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://bun.sh",
      icon: { name: sf-symbols:chevron.right },
    }
```

```yml
# content/de/technologies/scala.yml
icon:
  name: simple-icons:scala
  background: "#DC322F"
  colors: { primary: "#DC322F", secondary: "#DC322F", tertiary: "#DC322F" }
eyebrow: Sprache
title: Scala
description: >-
  Scala habe ich im Berufsschulmodul 323 kennengelernt und fand es sehr interessant, da es viele
  Parallelen zu Java hat, aber auch viele neue Konzepte, wie z.B. Traits oder Pattern Matching,
  mitbringt.
badges:
  - { title: Backend }
  - { title: "Object-Oriented" }
  - { title: Functional }
  - { title: Java, icon: { name: simple-icons-extended:java } }
links:
  - {
      title: "Mehr erfahren",
      url: "https://scala-lang.org",
      icon: { name: sf-symbols:chevron.right },
    }
```

### projects

```yml
# content/de/projects/01-nex-first-steps.yml
icon: { name: sf-symbols:airplane.departure }
eyebrow: Einführung
title: NEX First Steps
description: >-
  In den First Steps hat meine Lehre begonnen. Dort habe ich alles rund um Swisscom kennengelernt,
  also z.B. wie man die verschieden Tools verwendet, wie man richtig zusammenarbeitet und auch
  andere Dinge, wie beispielsweise die Arbeitssicherheit.
badges:
  - { title: Introduction }
  - { title: Swisscom }
  - { title: Teamwork }
  - { title: "Work Safety" }
  - { title: "Next Generation" }
info:
  date: { fixed: "2021-08-01" }
  supervisor: Steve Hess
  location: "Zürich & Bern"
  department: GHR-SCS-NEX
```

```yml
# content/de/projects/02-nexcc.yml
icon: { name: sf-symbols:chevron.left.forwardslash.chevron.right }
eyebrow: Full-Stack
title: Competence Center NexCC
description: >-
  Im NexCC durfte ich zuerst diese Webseite hier erstellen und habe dabei viele neue Programmiersprachen
  gelernt. Darunter HTML, CSS und JavaScript. Danach durfte ich dann eine CRUD-App erstellen, welche ich
  mit einer SQL-Datenbank verbunden habe. Später habe ich auch noch ein Frontend hinzugefügt und so ein
  eigenes Login-System erstellt. Dabei habe ich vor allem das Backend kennengelernt und Framework basierte
  Programmiersprachen, wie Express.js oder Vue.js neu dazugelernt.
badges:
  - { title: "Web Development" }
  - { title: Frontend }
  - { title: Backend }
  - { title: CRUD }
  - { title: HTML, icon: { name: simple-icons:html5 } }
  - { title: CSS, icon: { name: simple-icons:css } }
  - { title: JavaScript, icon: { name: simple-icons:javascript } }
  - { title: Express, icon: { name: simple-icons:express } }
  - { title: SQL, icon: { name: simple-icons:mysql } }
  - { title: Vue, icon: { name: simple-icons:vuedotjs } }
  - { title: SDX, icon: { name: simple-icons-extended:swisscom } }
info:
  date:
    duration: { from: "2021-08-01", to: "2022-01-01" }
  supervisor: Nick Zimmermann
  location: Zür-Har3
  department: SCS-INI-DOS-DVX
```

```yml
# content/de/projects/03-banking-automation.yml
icon: { name: sf-symbols:clock.arrow.trianglehead.2.counterclockwise.rotate.90 }
eyebrow: Automation
title: Automatisierungsprojekte im Banking Bereich
description: >-
  Hier durfte ich einen generellen Einblick in die Automation und ihr Umfeld erhalten. Ich war aktiv
  dabei und habe die einzelnen Banken mittls Ranorex & UiPath gelernt zu testen bzw. zu automatisieren.
  Ausserdem habe ich dabei auch ein wenig C# gelernt und mehr über das .NET Framework erfahren. Mein Ziel
  ist es aber in Zukunft das noch zu verbessern!
badges:
  - { title: Automation }
  - { title: Banking }
  - { title: Testing }
  - { title: Ranorex }
  - { title: UiPath }
  - { title: .NET }
  - { title: "C#", icon: { name: simple-icons-extended:csharp } }
info:
  date:
    duration: { from: "2022-02-01", to: "2022-07-01" }
  supervisor: Alessio Iantosca
  location: Zür-Pfi51
  department: SCS-B2B-TBS-BPS-BPM-AU1
```

```yml
# content/de/projects/04-apps-frontend.yml
icon: { name: sf-symbols:display, colors: { tertiary: none } }
eyebrow: Frontend
title: Apps Team
description: >-
  Im Apps Team durfte ich zuerst eine eigene Memory App mit Vue.js, TypeScript und SDX erstellen.
  Anschliessend habe ich beim programmieren der neuen Apps Team Webseite mitgeholfen. Dort haben wir
  ebenfalls mit TypeScript und SDX gearbeitet, aber Next.js als Framework verwendet.
badges:
  - { title: Frontend }
  - { title: Memory }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
  - { title: Vue, icon: { name: simple-icons:vuedotjs } }
  - { title: Next, icon: { name: simple-icons:nextdotjs } }
  - { title: SDX, icon: { name: simple-icons-extended:swisscom } }
links:
  - {
      title: "Apps Team",
      url: "https://appsteam.swisscom.com",
      icon: { name: sf-symbols:chevron.right },
    }
  - {
      title: "Indigo online",
      url: "https://indigo.online",
      icon: { name: sf-symbols:chevron.right },
    }
info:
  date:
    duration: { from: "2022-08-01", to: "2023-02-01" }
  supervisor: Carlo Schmid
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

```yml
# content/de/projects/05-apps-backend.yml
icon: { name: sf-symbols:gear }
eyebrow: Backend
title: Apps Team
description: >-
  Nachdem ich bereits im Apps Team als Frontend Entwickler tätig war, wollte ich nun auch noch das
  Backend besser kennenlernen. Zuerst durfte ich meine eigene CRUD‑App erstellen. Ich konnte viel Neues
  über Nest.js und die beiden ORMs Prisma und TypeORM lernen und habe dabei wertvolle Erfahrungen
  gesammelt. Später habe ich auch noch ein Frontend für meine CRUD‑App mit GitHub Primer erstellt.
  Danach habe ich dann beim Tool für Medienkurse mitgeholfen und konnte dort einige Features hinzufügen
  und Fehler beheben. Schliesslich durfte ich auch beim Fleet Management Tool und den Neuen Webfrontends
  mitwirken, was mir sehr gefallen hat :)

badges:
  - { title: Backend }
  - { title: CRUD }
  - { title: ORM }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
  - { title: Nest, icon: { name: simple-icons:nestjs } }
  - { title: TypeORM, icon: { name: simple-icons:typeorm } }
  - { title: Prisma, icon: { name: simple-icons:prisma } }
  - { title: React, icon: { name: simple-icons:react } }
  - { title: "Next.js", icon: { name: simple-icons:nextdotjs } }
  - { title: SDX, icon: { name: simple-icons-extended:swisscom } }
  - { title: "GitHub Primer", icon: { name: simple-icons:github } }
links:
  - {
      title: "Apps Team",
      url: "https://appsteam.swisscom.com",
      icon: { name: sf-symbols:chevron.right },
    }
  - {
      title: "Indigo online",
      url: "https://indigo.online",
      icon: { name: sf-symbols:chevron.right },
    }
info:
  date:
    duration: { from: "2023-02-01", to: "2023-08-01" }
  supervisor: Kim Eggler
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

```yml
# content/de/projects/06-security-art.yml
icon: { name: sf-symbols:shield.lefthalf.filled }
eyebrow: "Security Journey"
title: Security & Compliance Services ART
description: >-
  In diesem Projekt habe ich mit ein paar Trainings zu Cloud, Security und DevOps begonnen, was
  ziemlich lehrreich für mich war. Danach durfte ich bereits am DAM Log Scanner Projekt arbeiten,
  einem Tool, welches Datenbankaktivitäten aufzeichnet (Database Activity Monitoring) und nach
  spezifischen Richtlinien handelt. Diese wurden primär mit OPA (Open Policy Agent) umgsetzt, womit ich
  allerdings nicht allzu viel zu tun hatte. Ich habe nämlich hauptsächlich Python, Docker und Kubernetes
  verwendet, wobei Python für mich neu war. Gegen Ende des Projekts habe ich dann auch noch begonnen
  Elasticsearch zu implementieren, um die Daten zu visualisieren und zu analysieren.

badges:
  - { title: Security }
  - { title: Cloud }
  - { title: "Database Activity Monitoring" }
  - { title: DevOps }
  - { title: OPA }
  - { title: Python, icon: { name: simple-icons:python } }
  - { title: Docker, icon: { name: simple-icons:docker } }
  - { title: Kubernetes, icon: { name: simple-icons:kubernetes } }
  - { title: Elastic, icon: { name: simple-icons:elasticsearch } }
info:
  date:
    duration: { from: "2023-09-01", to: "2024-03-01" }
  supervisor: Radu Margineanu
  location: Zür-Mas10
  department: SCS-INI-EOG-EA-EAF
```

```yml
# content/de/projects/07-piz-tofana.yml
icon: { name: sf-symbols:shield.lefthalf.filled }
eyebrow: "Security Journey"
title: Piz Tofana Tooling Team
description: >-
  Während meines Aufenthalts im Team Piz Tofana, habe ich hauptsächlich an der Daedalus Applikation
  gearbeitet. Diese bietet verschiedene Selbstbeurteilungs‑Module, die von den Fachabteilungen zur
  Bewertung von Datenschutz, Sicherheit, Compliance, Klassifizierung und Weiterem für verknüpfte
  Objekte wie Anwendungen, Ressourcen, Dienste oder Angebote bereitgestellt werden. Als Technologien
  wurden Java Spring Boot für das Backend und Angular für das Frontend verwendet.

badges:
  - { title: Security }
  - { title: Java, icon: { name: simple-icons-extended:java } }
  - { title: "Spring Boot", icon: { name: simple-icons:springboot } }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
  - { title: Angular, icon: { name: simple-icons:angular } }
info:
  date:
    duration: { from: "2024-03-01", to: "2024-07-01" }
  supervisor: Oliver Kramer
  location: Zür-För181
  department: INI-EOG-SPA
```

```yml
# content/de/projects/08-apps-ipa.yml
icon: { name: sf-symbols:airplane.arrival }
eyebrow: Full-Stack
title: "Apps Team (IPA)"
description: >-
  Für meine IPA (Individuelle Praktische Arbeit) habe ich mich entschieden, nochmals ins Apps Team zu
  gehen, da ich dort bereits viele Erfahrungen sammeln konnte und mich das Team, sowie dessen Zusammenhalt
  wirklich begeistert hat. Von Anfang an durfte ich bereits an produktiven Projekten mitarbeiten, wie z.B.
  dem Trade Compliance Tool oder den Enterprise Connect Demos. Bei beiden Tools verwenden wir hauptsächlich
  mit Next.js und Nest.js, inklusive Prisma als ORM.

badges:
  - { title: IPA }
  - { title: TypeScript, icon: { name: simple-icons:typescript } }
  - { title: Next, icon: { name: simple-icons:nextdotjs } }
  - { title: Nest, icon: { name: simple-icons:nestjs } }
  - { title: Prisma, icon: { name: simple-icons:prisma } }
links:
  - {
      title: "Apps Team",
      url: "https://appsteam.swisscom.com",
      icon: { name: sf-symbols:chevron.right },
    }
  - {
      title: "Indigo online",
      url: "https://indigo.online",
      icon: { name: sf-symbols:chevron.right },
    }
info:
  date:
    duration: { from: "2024-08-01", to: "2025-07-01" }
  supervisor: Kim Eggler
  location: Itt-Ey10
  department: GHR-OPD-CLE-LES-APP (EXT)
```

---

## How to query (examples)

```ts
// Navbar (ordered by filename number)
const navbar = await queryCollection("navbar").order("stem", "ASC").all();

// Footer directory
const footer = await queryCollection("footerDirectory")
  .order("stem", "ASC")
  .all();

// Banners
const banners = await queryCollection("banners").order("stem", "ASC").all();

// Segments (theme)
const themeSegments = await queryCollection("segmentsTheme")
  .order("stem", "ASC")
  .all();

// Homepage sections
const about = await queryCollection("sections")
  .path("/de/sections/about")
  .first();

// Technologies & Projects
const technologies = await queryCollection("technologies")
  .order("title", "ASC")
  .all();
const projects = await queryCollection("projects")
  .order("info.date", "DESC")
  .all();
```

## i18n setup sketch

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "de", name: "Deutsch", language: "de-CH", dir: "ltr" },
      { code: "en", name: "English", language: "en-US", dir: "ltr" },
    ],
    defaultLocale: "de",
    strategy: "prefix_except_default",
  },
});
```

> When you add English, mirror the `content/de/**` tree under `content/en/**` with translated text. The `pages` and `site` collections are already configured for both locales.
