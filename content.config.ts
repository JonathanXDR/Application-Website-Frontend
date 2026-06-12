import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const iconSchema = z
  .object({
    name: z.string(),
    background: z.string().optional(),
    colors: z
      .object({
        primary: z.string().optional(),
        secondary: z.string().optional(),
        tertiary: z.string().optional(),
      })
      .optional(),
  })
  .optional()

const linkSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: iconSchema,
  loading: z.boolean().optional(),
})

const badgeSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: iconSchema,
})

const infoSchema = z
  .object({
    location: z.string().optional(),
    supervisor: z.string().optional(),
    department: z.string().optional(),
    date: z
      .object({
        event: z.string().optional(),
        fixed: z.string().optional(),
        duration: z
          .object({
            from: z.string(),
            to: z.string(),
          })
          .optional(),
      })
      .optional(),
  })
  .optional()

export default defineContentConfig({
  collections: {
    siteConfig: defineCollection({
      type: 'data',
      source: 'config/*.yml',
      schema: z.object({
        description: z.string(),
        pages: z
          .record(
            z.object({
              description: z.string().optional(),
            }),
          )
          .optional(),
      }),
      i18n: true,
    }),

    components: defineCollection({
      type: 'data',
      source: 'components/*.yml',
      schema: z.object({
        // Structural content for navigation and footer chrome.
        items: z.array(z.record(z.unknown())).optional(),
        sections: z.array(z.record(z.unknown())).optional(),
        links: z.array(linkSchema).optional(),
        allRightsReserved: z.string().optional(),
        legalLinks: z.array(linkSchema).optional(),
        news: z
          .object({
            title: z.string(),
            link: linkSchema,
          })
          .optional(),
        theme: z.array(z.record(z.unknown())).optional(),
        projects: z.array(z.record(z.unknown())).optional(),
        technologies: z.array(z.record(z.unknown())).optional(),
        // Micro-copy labels, one file per component (formerly ui-labels.yml).
        addTag: z.string().optional(),
        tagSelectRemove: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        created: z.string().optional(),
        updated: z.string().optional(),
        learnMore: z.string().optional(),
        chooseYourLanguage: z.string().optional(),
        message: z.string().optional(),
        reload: z.string().optional(),
        dismiss: z.string().optional(),
      }),
      i18n: true,
    }),

    sections: defineCollection({
      type: 'data',
      source: 'sections/*.yml',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        birthDate: z.string().optional(),
        imageAlt: z.string().optional(),
        items: z.array(z.record(z.unknown())).optional(),
      }),
      i18n: true,
    }),

    technologies: defineCollection({
      type: 'data',
      source: 'technologies/*.yml',
      schema: z.object({
        icon: iconSchema,
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string(),
        badges: z.array(badgeSchema).optional(),
        links: z.array(linkSchema).optional(),
        info: infoSchema,
      }),
      i18n: true,
    }),

    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        icon: iconSchema,
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string(),
        badges: z.array(badgeSchema).optional(),
        links: z.array(linkSchema).optional(),
        info: infoSchema,
      }),
      i18n: true,
    }),

    errorPages: defineCollection({
      type: 'data',
      source: 'pages/*.yml',
      schema: z.object({
        pageId: z.string(),
        label: z.string(),
        // Optional because the generic fallback page (error.yml) matches
        // any status and intentionally declares none.
        status: z.number().optional(),
        icon: iconSchema,
        title: z.string(),
        description: z.string(),
      }),
      i18n: true,
    }),
  },
})
