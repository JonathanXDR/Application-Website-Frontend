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
    sections: defineCollection({
      type: 'page',
      source: {
        include: 'sections/**/*.md',
        prefix: '/',
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        birthDate: z.string().optional(),
        navigation: z.boolean().optional().default(false),
      }),
    }),

    site: defineCollection({
      type: 'data',
      source: 'site/**/**.yml',
      schema: z
        .object({
          description: z.string().optional(),
          links: z.array(LinkSchema).optional(),
          copyright: z
            .object({
              allRightsReserved: z.string().optional(),
              links: z.array(LinkSchema).optional(),
            })
            .optional(),
          footerMini: z
            .object({
              legalLinks: z.array(LinkSchema).optional(),
              news: z
                .object({ title: z.string(), link: LinkSchema })
                .optional(),
            })
            .optional(),
        })
        .partial(),
    }),

    navigation: defineCollection({
      type: 'data',
      source: 'navigation/**/**.yml',
      schema: z.object({}).passthrough(),
    }),

    banners: defineCollection({
      type: 'data',
      source: 'banners/**/**.yml',
      schema: z.object({
        description: z.string(),
        links: z.array(LinkSchema).optional(),
      }),
    }),

    languages: defineCollection({
      type: 'data',
      source: 'languages/**/**.yml',
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
      source: 'references/**/**.yml',
      schema: z.object({
        icon: IconSchema.optional(),
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        links: z.array(LinkSchema).optional(),
        info: InfoSchema.optional(),
      }),
    }),

    funfacts: defineCollection({
      type: 'data',
      source: 'facts/fun/**/**.yml',
      schema: z.object({
        progress: z.number(),
        description: z.string(),
      }),
    }),

    technologies: defineCollection({
      type: 'data',
      source: 'technologies/**/**.yml',
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
      source: 'projects/**/**.yml',
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
