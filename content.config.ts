import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import type { z as zod } from 'zod'

export const ColorSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
  quaternary: z.string().optional(),
})

export const IconSchema = z
  .object({
    name: z.string(),
    mode: z.enum(['svg', 'css']).optional(),
    size: z.union([z.string(), z.number()]).optional(),
    variant: z.enum(['default', 'outline', 'fill', 'custom']).optional(),
    colors: ColorSchema.optional(),
    loading: z.boolean().optional(),
    absolute: z.boolean().optional(),
    position: z.enum(['top', 'right', 'bottom', 'left']).optional(),
    alignment: z.enum(['start', 'center', 'end']).optional(),

    background: z.string().optional(),
  })
  .passthrough()

export const LinkItemSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: IconSchema.optional(),
  loading: z.boolean().optional(),
})

export const BasicPropsSchema = z.object({
  icon: IconSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(LinkItemSchema).optional(),
})

export const BasicSizeSchema = z.enum(['small', 'medium', 'large'])
export const ExtendedSizeSchema = z.union([
  BasicSizeSchema,
  z.enum(['xsmall', 'xlarge']),
])

export const BadgeItemSchema = LinkItemSchema.extend({
  variant: z.string().optional(),
  componentSize: ExtendedSizeSchema.optional(),
  colors: ColorSchema.optional(),
  border: z.boolean().optional(),
  hover: z.boolean().optional(),
  loading: z.boolean().optional(),
})

export const InfoBarDateSchema = z
  .object({
    event: z.string().optional(),
    fixed: z.union([z.string(), z.date(), z.null()]).optional(),
    duration: z.object({ from: z.string(), to: z.string() }).optional(),
  })
  .passthrough()

export const InfoBarSchema = z.object({
  loading: z.boolean().optional(),
  date: InfoBarDateSchema.optional(),
  location: z.string().optional(),
  supervisor: z.string().optional(),
  department: z.string().optional(),
  language: z.string().optional(),
  license: z.string().optional(),
})

export const ExtendedPropsSchema = BasicPropsSchema.extend({
  badges: z.array(BadgeItemSchema).optional(),
  info: InfoBarSchema.optional(),
})

export const GraphSchema = z.object({
  donut: z.boolean().optional(),
  bar: z.boolean().optional(),
})

export const CardItemSchema = ExtendedPropsSchema.extend({
  variant: z.enum(['card', 'article']).optional(),
  componentSize: z.union([BasicSizeSchema, z.literal('full')]).optional(),
  colors: ColorSchema.optional(),
  alignment: z.enum(['start', 'center', 'end']).optional(),
  hover: z.union([z.boolean(), z.literal('auto')]).optional(),
  cover: z.string().optional(),
  badge: BadgeItemSchema.optional(),
  loading: z.boolean().optional(),
  graphs: GraphSchema.optional(),
  icon: IconSchema.extend({ background: z.string().optional() }).optional(),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SectionSchema: any = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string().optional(),
    route: z.string().optional(),
    children: z.array(SectionSchema).optional(),
    class: z.string().optional(),
    icon: IconSchema.optional(),
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DirectoryItemSchema: any = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string().optional(),
    route: z.string().optional(),
    url: z.string().optional(),
    icon: IconSchema.optional(),
    children: z.array(DirectoryItemSchema).optional(),
  })
)

export const SegmentItemSchema = z.object({
  id: z.string(),
  category: z.string().optional(),
  label: z.string().optional(),
  icon: IconSchema.optional(),
})

export const LanguageItemSchema = BasicPropsSchema.pick({
  title: true,
  eyebrow: true,
  links: true,
}).extend({
  progress: z.number(),
  componentSize: z.union([BasicSizeSchema, z.literal('full')]).optional(),
  loading: z.boolean().optional(),
  width: z.enum(['full', 'compact']).optional(),
  hover: z.union([z.boolean(), z.literal('auto')]).optional(),
  direction: z.enum(['left', 'right']).optional(),
  divider: z
    .object({ direction: z.enum(['left', 'right', 'center']) })
    .optional(),
})

export const FunFactSchema = z.object({
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
        children: z.array(DirectoryItemSchema).optional(),
      }),
    }),

    banners: defineCollection({
      type: 'data',
      source: '{de,en}/banners/**.yml',
      schema: z.object({
        description: z.string(),
        links: z.array(LinkItemSchema),
      }),
    }),

    segmentsTheme: defineCollection({
      type: 'data',
      source: '{de,en}/segments/theme/**.yml',
      schema: SegmentItemSchema,
    }),
    segmentsProjects: defineCollection({
      type: 'data',
      source: '{de,en}/segments/projects/**.yml',
      schema: SegmentItemSchema,
    }),
    segmentsTechnologies: defineCollection({
      type: 'data',
      source: '{de,en}/segments/technologies/**.yml',
      schema: SegmentItemSchema,
    }),

    footerCopyright: defineCollection({
      type: 'data',
      source: '{de,en}/footer/copyright/**.yml',
      schema: z.object({ links: z.array(LinkItemSchema) }),
    }),
    footerLegalLinks: defineCollection({
      type: 'data',
      source: '{de,en}/footer/legal-links/**.yml',
      schema: LinkItemSchema,
    }),

    social: defineCollection({
      type: 'data',
      source: '{de,en}/social/**.yml',
      schema: LinkItemSchema,
    }),

    sections: defineCollection({
      type: 'page',
      source: '{de,en}/sections/**/*.md',
      schema: BasicPropsSchema.pick({ title: true, eyebrow: true }).extend({
        id: z.string().optional(),
        birthDate: z.string().optional(),
      }),
    }),

    languages: defineCollection({
      type: 'data',
      source: '{de,en}/languages/**.yml',
      schema: LanguageItemSchema,
    }),
    references: defineCollection({
      type: 'data',
      source: '{de,en}/references/**.yml',
      schema: ExtendedPropsSchema,
    }),
    funFacts: defineCollection({
      type: 'data',
      source: '{de,en}/fun-facts/**.yml',
      schema: FunFactSchema,
    }),

    technologies: defineCollection({
      type: 'data',
      source: '{de,en}/technologies/**.yml',
      schema: CardItemSchema,
    }),
    projects: defineCollection({
      type: 'data',
      source: '{de,en}/projects/**.yml',
      schema: CardItemSchema,
    }),
  },
})

export type ColorType = zod.infer<typeof ColorSchema>
export type IconType = zod.infer<typeof IconSchema>
export type LinkItemType = zod.infer<typeof LinkItemSchema>
export type BasicPropsType = zod.infer<typeof BasicPropsSchema>
export type ExtendedPropsType = zod.infer<typeof ExtendedPropsSchema>
export type CardItemType = zod.infer<typeof CardItemSchema>
export type SegmentItemType = zod.infer<typeof SegmentItemSchema>
export type LanguageItemType = zod.infer<typeof LanguageItemSchema>
export type FunFactType = zod.infer<typeof FunFactSchema>
export type InfoBarType = zod.infer<typeof InfoBarSchema>
export type BadgeItemType = zod.infer<typeof BadgeItemSchema>
export type BasicSizeType = zod.infer<typeof BasicSizeSchema>
export type ExtendedSizeType = zod.infer<typeof ExtendedSizeSchema>
export type GraphType = zod.infer<typeof GraphSchema>
export type InfoBarDateType = zod.infer<typeof InfoBarDateSchema>
export type SectionType = zod.infer<typeof SectionSchema>
export type DirectoryItemType = zod.infer<typeof DirectoryItemSchema>
