import type {
  AboutType,
  BadgeType,
  BasicPropsType,
  BasicSizeType,
  ColorType,
  ErrorPageType,
  ExtendedPropsType,
  ExtendedSizeType,
  FunFactType,
  IconType,
  InfoDateType,
  InfoType,
  ItemType,
  LanguageType,
  LinkItemType,
} from '#shared/types/schemas'
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

// Single source of truth for content shapes. Each atom schema below is
// pinned to its interface in shared/types/schemas.ts with
// `satisfies z.ZodType<...>`, so the schema and the interface can never
// drift: changing one without the other is a compile error. The interfaces
// type component props (Vue's defineProps cannot resolve z.infer), and
// these schemas drive content validation and the generated @nuxt/content
// query result types.
//
// All collections are type:'data' + i18n:true. The custom @nuxt/content
// fork (release/better-i18n) merges each file's nested i18n.<locale> block
// onto the base document by index before validation, so schemas model the
// merged per-locale shape and never declare an i18n field. Base fields stay
// required, fields a locale override may omit stay optional.

// ─── Atoms ────────────────────────────────────────────────

export const ColorSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
  quaternary: z.string().optional(),
}) satisfies z.ZodType<ColorType>

// Content icon. `name` is an iconify id (sf-symbols, simple-icons, fa7).
// `background` and color values accept hex, CSS vars, or the literal
// 'none', so they stay plain strings.
export const IconSchema = z.object({
  name: z.string(),
  background: z.string().optional(),
  colors: ColorSchema.optional(),
}) satisfies z.ZodType<IconType>

export const LinkSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: IconSchema.optional(),
  loading: z.boolean().optional(),
}) satisfies z.ZodType<LinkItemType>

export const BadgeSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  icon: IconSchema.optional(),
}) satisfies z.ZodType<BadgeType>

export const InfoDateSchema = z.object({
  fixed: z.string().optional(),
  duration: z.object({ from: z.string(), to: z.string() }).optional(),
}) satisfies z.ZodType<InfoDateType>

export const InfoSchema = z.object({
  location: z.string().optional(),
  supervisor: z.string().optional(),
  department: z.string().optional(),
  date: InfoDateSchema.optional(),
}) satisfies z.ZodType<InfoType>

export const BasicSizeSchema = z.enum([
  'small',
  'medium',
  'large',
]) satisfies z.ZodType<BasicSizeType>
export const ExtendedSizeSchema = z.enum([
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
]) satisfies z.ZodType<ExtendedSizeType>

// ─── Composites ───────────────────────────────────────────

export const BasicPropsSchema = z.object({
  icon: IconSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(LinkSchema).optional(),
}) satisfies z.ZodType<BasicPropsType>

export const ExtendedPropsSchema = BasicPropsSchema.extend({
  badges: z.array(BadgeSchema).optional(),
  info: InfoSchema.optional(),
}) satisfies z.ZodType<ExtendedPropsType>

// Navigation node, shared by the navbar (items) and the footer directory
// (sections). The tree is modelled to its real depth without recursion,
// because @nuxt/content cannot generate types for a self-referential
// content schema (z.lazy produces an unresolvable $ref). The footer is
// the deepest at three levels, the navbar uses two. Components render the
// tree with the recursive SectionType in shared/types/schemas.ts.
export const NavLeafSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  route: z.string().optional(),
  url: z.string().optional(),
  class: z.string().optional(),
  icon: IconSchema.optional(),
})

const NavGroupSchema = NavLeafSchema.extend({
  children: z.array(NavLeafSchema).optional(),
})

export const NavNodeSchema = NavLeafSchema.extend({
  children: z.array(NavGroupSchema).optional(),
})

// Flat selectable entry for the segment navigation (theme, projects,
// technologies tab groups).
export const ItemSchema = z.object({
  id: z.string(),
  category: z.string().optional(),
  label: z.string().optional(),
  icon: IconSchema.optional(),
}) satisfies z.ZodType<ItemType>

export const FunFactSchema = z.object({
  progress: z.number(),
  description: z.string(),
}) satisfies z.ZodType<FunFactType>

export const LanguageSchema = z.object({
  title: z.string(),
  eyebrow: z.string().optional(),
  progress: z.number(),
  divider: z
    .object({ direction: z.enum(['left', 'right', 'center']) })
    .optional(),
  links: z.array(LinkSchema).optional(),
}) satisfies z.ZodType<LanguageType>

export const AboutSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  birthDate: z.string().optional(),
  imageAlt: z.string().optional(),
}) satisfies z.ZodType<AboutType>

export const ErrorPageSchema = z.object({
  pageId: z.string(),
  label: z.string(),
  // Optional because the generic fallback page matches any status and
  // declares none.
  status: z.number().optional(),
  icon: IconSchema.optional(),
  title: z.string(),
  description: z.string(),
}) satisfies z.ZodType<ErrorPageType>

// ─── Collection wrappers ──────────────────────────────────

export const SiteConfigSchema = z.object({
  description: z.string(),
  pages: z
    .record(z.string(), z.object({ description: z.string().optional() }))
    .optional(),
})

export const NavigationSchema = z.object({
  items: z.array(NavNodeSchema).optional(),
  sections: z.array(NavNodeSchema).optional(),
})

// Chrome micro-content that is not a distinct content domain: the segment
// tabs, rotating info banners, footer link lists, and translated UI labels.
// One typed superset keeps these together without the previous
// z.record(z.unknown()) grab-bag. Each file populates only its own fields.
export const UiSchema = z.object({
  // info-banners
  items: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(LinkSchema).optional(),
      }),
    )
    .optional(),
  // segment-nav
  theme: z.array(ItemSchema).optional(),
  projects: z.array(ItemSchema).optional(),
  technologies: z.array(ItemSchema).optional(),
  // footer-copyright, share-sheet
  links: z.array(LinkSchema).optional(),
  allRightsReserved: z.string().optional(),
  // footer-mini
  legalLinks: z.array(LinkSchema).optional(),
  news: z.object({ title: z.string(), link: LinkSchema }).optional(),
  // translated labels (card-item, filter-input, live-result-summary,
  // language-picker-bar, skew-notification)
  title: z.string().optional(),
  description: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  learnMore: z.string().optional(),
  chooseYourLanguage: z.string().optional(),
  message: z.string().optional(),
  reload: z.string().optional(),
  dismiss: z.string().optional(),
  addTag: z.string().optional(),
  tagSelectRemove: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    siteConfig: defineCollection({
      type: 'data',
      source: 'config/*.yml',
      schema: SiteConfigSchema,
      i18n: true,
    }),

    navigation: defineCollection({
      type: 'data',
      source: 'components/navigation/*.yml',
      schema: NavigationSchema,
      i18n: true,
    }),

    ui: defineCollection({
      type: 'data',
      source: 'components/*.yml',
      schema: UiSchema,
      i18n: true,
    }),

    about: defineCollection({
      type: 'data',
      source: 'pages/overview/about.yml',
      schema: AboutSchema,
      i18n: true,
    }),

    // The overview list domains are one file per entry, like projects and
    // technologies, so each entry's translations live with it instead of in
    // a fragile positional i18n array. Queried with .all(), ordered by the
    // NN. filename prefix.
    funFacts: defineCollection({
      type: 'data',
      source: 'pages/overview/fun-facts/*.yml',
      schema: FunFactSchema,
      i18n: true,
    }),

    languages: defineCollection({
      type: 'data',
      source: 'pages/overview/languages/*.yml',
      schema: LanguageSchema,
      i18n: true,
    }),

    references: defineCollection({
      type: 'data',
      source: 'pages/overview/references/*.yml',
      schema: ExtendedPropsSchema,
      i18n: true,
    }),

    school: defineCollection({
      type: 'data',
      source: 'pages/overview/school/*.yml',
      schema: ExtendedPropsSchema,
      i18n: true,
    }),

    projects: defineCollection({
      type: 'data',
      source: 'pages/projects/*.yml',
      schema: ExtendedPropsSchema,
      i18n: true,
    }),

    technologies: defineCollection({
      type: 'data',
      source: 'pages/technologies/*.yml',
      schema: ExtendedPropsSchema,
      i18n: true,
    }),

    errorPages: defineCollection({
      type: 'data',
      source: 'pages/error/*.yml',
      schema: ErrorPageSchema,
      i18n: true,
    }),
  },
})
