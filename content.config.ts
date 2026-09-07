import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

// The interfaces in `shared/types/schemas.ts` that each schema is pinned to
// with `satisfies` exist because Vue's `defineProps` cannot resolve `z.infer`.
//
// The `@nuxt/content` fork (`release/better-i18n`) merges each file's nested
// `i18n.<locale>` block onto the base document by index before validation, so
// schemas model the merged per-locale shape, never declare an `i18n` field, and
// mark any field a locale override may omit as optional.

export const ColorSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  tertiary: z.string().optional(),
  quaternary: z.string().optional(),
}) satisfies z.ZodType<ColorType>

// `name` is an Iconify id (sf-symbols, simple-icons, fa7). `background` and
// the colors stay plain strings: they accept a hex value, a CSS variable or
// `'none'`.
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

// Unrolled to three levels (the footer's depth) instead of recursing:
// `@nuxt/content` cannot generate types for a self-referential schema (`z.lazy`
// produces an unresolvable `$ref`). Components use the recursive `SectionType`
// in `shared/types/schemas.ts`.
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

export const ItemSchema = z.object({
  id: z.string(),
  category: z.string().optional(),
  label: z.string().optional(),
  icon: IconSchema.optional(),
}) satisfies z.ZodType<ItemType>

// `progress` is the total counted up to, not a percentage
export const FunFactSchema = z.object({
  progress: z.number(),
  description: z.string(),
}) satisfies z.ZodType<FunFactType>

export const LanguageSchema = z.object({
  title: z.string(),
  eyebrow: z.string().optional(),
  // `progress` is a percentage, 0 to 100
  progress: z.number(),
  divider: z
    .object({ direction: z.enum(['left', 'right', 'center']) })
    .optional(),
  links: z.array(LinkSchema).optional(),
}) satisfies z.ZodType<LanguageType>

// `description` may carry an `{age}` placeholder, computed from `birthDate`
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
  // The generic fallback page matches any status and declares none
  status: z.number().optional(),
  icon: IconSchema.optional(),
  // `title` may carry a `{status}` placeholder
  title: z.string(),
  description: z.string(),
}) satisfies z.ZodType<ErrorPageType>

// `pages` is keyed by the route path with the locale prefix and surrounding
// slashes stripped, so `/de/projects/` becomes `projects`.
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

// One collection per component file rather than a single `ui` superset of
// optional fields, which enforced no required field and leaked every field onto
// every component's query type through `UiCollectionItem`.

export const ShareSheetSchema = z.object({
  links: z.array(LinkSchema),
})

export const SegmentNavSchema = z.object({
  theme: z.array(ItemSchema),
  projects: z.array(ItemSchema),
  technologies: z.array(ItemSchema),
})

// `description` and `links[].url` may carry `{latestTag}` and
// `{previousTag}`. An item with an unresolved placeholder is dropped.
export const InfoBannerSchema = z.object({
  items: z.array(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      links: z.array(LinkSchema).optional(),
    }),
  ),
})

export const FooterMiniSchema = z.object({
  legalLinks: z.array(LinkSchema),
  news: z.object({ title: z.string(), link: LinkSchema }),
})

// `allRightsReserved` carries a `{currentYear}` placeholder
export const FooterCopyrightSchema = z.object({
  allRightsReserved: z.string(),
  links: z.array(LinkSchema),
})

export const CardItemSchema = z.object({
  created: z.string(),
  updated: z.string(),
  learnMore: z.string(),
})

// `title` carries a `{count}` placeholder
export const LiveResultSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
})

export const LanguagePickerBarSchema = z.object({
  chooseYourLanguage: z.string(),
})

export const SkewNotificationSchema = z.object({
  message: z.string(),
  reload: z.string(),
  dismiss: z.string(),
})

// Unconsumed until the technologies filter wires it up
export const FilterInputSchema = z.object({
  addTag: z.string(),
  tagSelectRemove: z.string(),
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

    cardItem: defineCollection({
      type: 'data',
      source: 'components/card-item.yml',
      schema: CardItemSchema,
      i18n: true,
    }),

    filterInput: defineCollection({
      type: 'data',
      source: 'components/filter-input.yml',
      schema: FilterInputSchema,
      i18n: true,
    }),

    footerCopyright: defineCollection({
      type: 'data',
      source: 'components/footer-copyright.yml',
      schema: FooterCopyrightSchema,
      i18n: true,
    }),

    footerMini: defineCollection({
      type: 'data',
      source: 'components/footer-mini.yml',
      schema: FooterMiniSchema,
      i18n: true,
    }),

    infoBanner: defineCollection({
      type: 'data',
      source: 'components/info-banner.yml',
      schema: InfoBannerSchema,
      i18n: true,
    }),

    languagePickerBar: defineCollection({
      type: 'data',
      source: 'components/language-picker-bar.yml',
      schema: LanguagePickerBarSchema,
      i18n: true,
    }),

    liveResultSummary: defineCollection({
      type: 'data',
      source: 'components/live-result-summary.yml',
      schema: LiveResultSummarySchema,
      i18n: true,
    }),

    segmentNav: defineCollection({
      type: 'data',
      source: 'components/segment-nav.yml',
      schema: SegmentNavSchema,
      i18n: true,
    }),

    shareSheet: defineCollection({
      type: 'data',
      source: 'components/share-sheet.yml',
      schema: ShareSheetSchema,
      i18n: true,
    }),

    skewNotification: defineCollection({
      type: 'data',
      source: 'components/skew-notification.yml',
      schema: SkewNotificationSchema,
      i18n: true,
    }),

    about: defineCollection({
      type: 'data',
      source: 'pages/overview/about.yml',
      schema: AboutSchema,
      i18n: true,
    }),

    // One file per entry keeps the entry's translations with it instead of
    // in a positional `i18n` array. Ordered by the `NN.` filename prefix.
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
