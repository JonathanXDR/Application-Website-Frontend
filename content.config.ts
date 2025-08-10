import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const IconSchema = z.object({
  name: z.string(),
  mode: z.enum(['svg', 'css']).optional(),
  size: z.union([z.string(), z.number()]).optional(),
  background: z.string().optional(),
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      tertiary: z.string().optional(),
      quaternary: z.string().optional(),
    })
    .optional(),
})

const LinkSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: IconSchema.optional(),
})

const BadgeSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: IconSchema.optional(),
})

const DateSchema = z.object({
  fixed: z.union([z.string(), z.date(), z.null()]).optional(),
  duration: z.object({ from: z.string(), to: z.string() }).optional(),
})

const InfoSchema = z.object({
  date: DateSchema.optional(),
  location: z.string().optional(),
  supervisor: z.string().optional(),
  department: z.string().optional(),
  language: z.string().optional(),
  license: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: { include: '{de,en}/pages/**.md', prefix: '/' },
    }),

    site: defineCollection({
      type: 'data',
      source: '{de,en}/site/**.yml',
      schema: z.object({
        description: z.string(),
      }),
    }),

    navbar: defineCollection({
      type: 'data',
      source: '{de,en}/navigation/navbar/**.yml',
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
      type: 'data',
      source: '{de,en}/navigation/footer-directory/**.yml',
    }),

    banners: defineCollection({
      type: 'data',
      source: '{de,en}/banners/**.yml',
      schema: z.object({
        description: z.string(),
        links: z.array(LinkSchema).optional(),
      }),
    }),

    segmentsTheme: defineCollection({
      type: 'data',
      source: '{de,en}/segments/theme/**.yml',
    }),
    segmentsProjects: defineCollection({
      type: 'data',
      source: '{de,en}/segments/projects/**.yml',
    }),
    segmentsTechnologies: defineCollection({
      type: 'data',
      source: '{de,en}/segments/technologies/**.yml',
    }),

    footerCopyright: defineCollection({
      type: 'data',
      source: '{de,en}/footer/copyright/**.yml',
    }),
    footerLegalLinks: defineCollection({
      type: 'data',
      source: '{de,en}/footer/legal-links/**.yml',
    }),

    social: defineCollection({ type: 'data', source: '{de,en}/social/**.yml' }),

    sections: defineCollection({
      type: 'page',
      source: '{de,en}/sections/**/*.md',
    }),

    languages: defineCollection({
      type: 'data',
      source: '{de,en}/languages/**.yml',
      schema: z.object({
        title: z.string(),
        eyebrow: z.string().optional(),
        progress: z.number(),
        divider: z
          .object({ direction: z.enum(['left', 'right', 'center']) })
          .optional(),
        links: z.array(LinkSchema).optional(),
      }),
    }),
    references: defineCollection({
      type: 'data',
      source: '{de,en}/references/**.yml',
      schema: z.object({
        icon: IconSchema.optional(),
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        links: z.array(LinkSchema).optional(),
        info: InfoSchema.optional(),
      }),
    }),
    funFacts: defineCollection({
      type: 'data',
      source: '{de,en}/fun-facts/**.yml',
      schema: z.object({
        progress: z.number(),
        description: z.string(),
      }),
    }),

    technologies: defineCollection({
      type: 'data',
      source: '{de,en}/technologies/**.yml',
      schema: z.object({
        icon: IconSchema.optional(),
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string(),
        badges: z.array(BadgeSchema).optional(),
        links: z.array(LinkSchema).optional(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: '{de,en}/projects/**.yml',
      schema: z.object({
        icon: IconSchema.optional(),
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string(),
        badges: z.array(BadgeSchema).optional(),
        links: z.array(LinkSchema).optional(),
        info: InfoSchema.optional(),
      }),
    }),
  },
})
