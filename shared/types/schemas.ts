// App-wide content types. These plain interfaces mirror the Zod
// collection schemas in content.config.ts and must stay in sync with them.
//
// They are written as interfaces rather than z.infer aliases on purpose:
// Vue's defineProps compiler resolves types statically and cannot follow
// z.infer<typeof Schema>, so any component prop typed from a derived alias
// fails to compile. The Zod schemas remain the validation source and drive
// the @nuxt/content query result types (the *CollectionItem types used in
// useQueryCollection), while these interfaces type component props and
// local annotations. The two describe the same shapes.

export interface ColorType {
  primary?: string
  secondary?: string
  tertiary?: string
  quaternary?: string
}

export interface IconType {
  name: string
  background?: string
  colors?: ColorType
}

export interface LinkItemType {
  title: string
  url?: string
  icon?: IconType
  loading?: boolean
}

export interface BadgeType {
  title: string
  url?: string
  icon?: IconType
}

export interface InfoDateType {
  fixed?: string
  duration?: { from: string, to: string }
}

export interface InfoType {
  location?: string
  supervisor?: string
  department?: string
  date?: InfoDateType
}

export type BasicSizeType = 'small' | 'medium' | 'large'
export type ExtendedSizeType
  = | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'

export interface BasicPropsType {
  icon?: IconType
  eyebrow?: string
  title: string
  description?: string
  links?: LinkItemType[]
}

export interface ExtendedPropsType extends BasicPropsType {
  badges?: BadgeType[]
  info?: InfoType
}

export interface ItemType {
  id: string
  category?: string
  label?: string
  icon?: IconType
}

export interface FunFactType {
  progress: number
  description: string
}

export interface LanguageType {
  title: string
  eyebrow?: string
  progress: number
  divider?: { direction: 'left' | 'right' | 'center' }
  links?: LinkItemType[]
}

export interface AboutType {
  eyebrow?: string
  title: string
  description?: string
  birthDate?: string
  imageAlt?: string
}

export interface ErrorPageType {
  pageId: string
  label: string
  status?: number
  icon?: IconType
  title: string
  description: string
}

// Recursive navigation node for component props. The navigation collection
// validates a bounded-depth shape because a self-referential content schema
// cannot be generated, but components walk the tree to any depth.
export interface SectionType {
  id: string
  label?: string
  route?: string
  url?: string
  class?: string
  icon?: IconType
  children?: SectionType[]
}
