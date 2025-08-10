import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const Color = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
  quaternary: z.string().optional(),
})

const Icon = z
  .object({
    name: z.string(),
    mode: z.enum(['svg', 'css']).optional(),
    size: z.union([z.string(), z.number()]).optional(),
    variant: z.enum(['default', 'outline', 'fill', 'custom']).optional(),
    colors: Color.optional(),
    loading: z.boolean().optional(),
    absolute: z.boolean().optional(),
    position: z.enum(['top', 'right', 'bottom', 'left']).optional(),
    alignment: z.enum(['start', 'center', 'end']).optional(),

    background: z.string().optional(),
  })
  .passthrough()

const LinkItem = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: Icon.optional(),
  loading: z.boolean().optional(),
})

const BasicProps = z.object({
  icon: Icon.optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(LinkItem).optional(),
})

const BasicSize = z.enum(['small', 'medium', 'large'])
const ExtendedSize = z.union([BasicSize, z.enum(['xsmall', 'xlarge'])])

const BadgeItem = LinkItem.extend({
  variant: z.string().optional(),
  componentSize: ExtendedSize.optional(),
  colors: Color.optional(),
  border: z.boolean().optional(),
  hover: z.boolean().optional(),
  loading: z.boolean().optional(),
})

const InfoBarDate = z
  .object({
    event: z.string().optional(),
    fixed: z.union([z.string(), z.date(), z.null()]).optional(),
    duration: z.object({ from: z.string(), to: z.string() }).optional(),
  })
  .passthrough()

const InfoBar = z.object({
  loading: z.boolean().optional(),
  date: InfoBarDate.optional(),
  location: z.string().optional(),
  supervisor: z.string().optional(),
  department: z.string().optional(),
  language: z.string().optional(),
  license: z.string().optional(),
})

const ExtendedProps = BasicProps.extend({
  badges: z.array(BadgeItem).optional(),
  info: InfoBar.optional(),
})

const Graph = z.object({
  donut: z.boolean().optional(),
  bar: z.boolean().optional(),
})

const CardItem = ExtendedProps.extend({
  variant: z.enum(['card', 'article']).optional(),
  componentSize: z.union([BasicSize, z.literal('full')]).optional(),
  colors: Color.optional(),
  alignment: z.enum(['start', 'center', 'end']).optional(),
  hover: z.union([z.boolean(), z.literal('auto')]).optional(),
  cover: z.string().optional(),
  badge: BadgeItem.optional(),
  loading: z.boolean().optional(),
  graphs: Graph.optional(),
  icon: Icon.extend({ background: z.string().optional() }).optional(),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SectionSchema: any = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string().optional(),
    route: z.string().optional(),
    children: z.array(SectionSchema).optional(),
    class: z.string().optional(),
    icon: Icon.optional(),
  }),
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DirectoryItem: any = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string().optional(),
    route: z.string().optional(),
    url: z.string().optional(),
    icon: Icon.optional(),
    children: z.array(DirectoryItem).optional(),
  }),
)

const SegmentItem = z.object({
  id: z.string(),
  category: z.string().optional(),
  label: z.string().optional(),
  icon: Icon.optional(),
})

const LanguageItem = BasicProps.pick({
  title: true,
  eyebrow: true,
  links: true,
}).extend({
  progress: z.number(),
  componentSize: z.union([BasicSize, z.literal('full')]).optional(),
  loading: z.boolean().optional(),
  width: z.enum(['full', 'compact']).optional(),
  hover: z.union([z.boolean(), z.literal('auto')]).optional(),
  direction: z.enum(['left', 'right']).optional(),
  divider: z
    .object({ direction: z.enum(['left', 'right', 'center']) })
    .optional(),
})

const FunFact = z.object({
  progress: z.number(),
  description: z.string(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: { include: '{de,en}/pages/**.md', prefix: '/' },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        eyebrow: z.string().optional(),
        id: z.string().optional(),

        birthDate: z.string().optional(),
      }),
    }),

    site: defineCollection({
      type: 'data',
      source: '{de,en}/site/**.yml',
      schema: z.object({ description: z.string() }),
    }),

    navbar: defineCollection({
      type: 'data',
      source: '{de,en}/navigation/navbar/**.yml',
      schema: SectionSchema,
    }),
    footerDirectory: defineCollection({
      type: 'data',
      source: '{de,en}/navigation/footer-directory/**.yml',
      schema: z.object({
        id: z.string(),
        label: z.string().optional(),
        children: z.array(DirectoryItem).optional(),
      }),
    }),

    banners: defineCollection({
      type: 'data',
      source: '{de,en}/banners/**.yml',
      schema: z.object({
        description: z.string(),
        links: z.array(LinkItem),
      }),
    }),

    segmentsTheme: defineCollection({
      type: 'data',
      source: '{de,en}/segments/theme/**.yml',
      schema: SegmentItem,
    }),
    segmentsProjects: defineCollection({
      type: 'data',
      source: '{de,en}/segments/projects/**.yml',
      schema: SegmentItem,
    }),
    segmentsTechnologies: defineCollection({
      type: 'data',
      source: '{de,en}/segments/technologies/**.yml',
      schema: SegmentItem,
    }),

    footerCopyright: defineCollection({
      type: 'data',
      source: '{de,en}/footer/copyright/**.yml',
      schema: z.object({ links: z.array(LinkItem) }),
    }),
    footerLegalLinks: defineCollection({
      type: 'data',
      source: '{de,en}/footer/legal-links/**.yml',
      schema: LinkItem,
    }),

    social: defineCollection({
      type: 'data',
      source: '{de,en}/social/**.yml',
      schema: LinkItem,
    }),

    sections: defineCollection({
      type: 'page',
      source: '{de,en}/sections/**/*.md',
      schema: BasicProps.pick({ title: true, eyebrow: true }).extend({
        id: z.string().optional(),
        birthDate: z.string().optional(),
      }),
    }),

    languages: defineCollection({
      type: 'data',
      source: '{de,en}/languages/**.yml',
      schema: LanguageItem,
    }),
    references: defineCollection({
      type: 'data',
      source: '{de,en}/references/**.yml',
      schema: ExtendedProps,
    }),
    funFacts: defineCollection({
      type: 'data',
      source: '{de,en}/fun-facts/**.yml',
      schema: FunFact,
    }),

    technologies: defineCollection({
      type: 'data',
      source: '{de,en}/technologies/**.yml',
      schema: CardItem,
    }),
    projects: defineCollection({
      type: 'data',
      source: '{de,en}/projects/**.yml',
      schema: CardItem,
    }),
  },
})
