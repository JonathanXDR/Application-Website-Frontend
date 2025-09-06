import type { z } from 'zod'
import type {
  BadgeItemSchema,
  BasicPropsSchema,
  BasicSizeSchema,
  CardItemSchema,
  ColorSchema,
  DirectoryItemSchema,
  ExtendedPropsSchema,
  ExtendedSizeSchema,
  FunFactSchema,
  GraphSchema,
  IconSchema,
  InfoBarDateSchema,
  InfoBarSchema,
  ItemSchema,
  LanguageSchema,
  LinkItemSchema,
  SectionSchema,
} from '~~/content.config'

export type ColorType = z.infer<typeof ColorSchema>
export type IconType = z.infer<typeof IconSchema>
export type LinkItemType = z.infer<typeof LinkItemSchema>
export type BasicPropsType = z.infer<typeof BasicPropsSchema>
export type ExtendedPropsType = z.infer<typeof ExtendedPropsSchema>
export type CardItemType = z.infer<typeof CardItemSchema>
export type ItemType = z.infer<typeof ItemSchema>
export type LanguageType = z.infer<typeof LanguageSchema>
export type FunFactType = z.infer<typeof FunFactSchema>
export type InfoBarType = z.infer<typeof InfoBarSchema>
export type BadgeItemType = z.infer<typeof BadgeItemSchema>
export type BasicSizeType = z.infer<typeof BasicSizeSchema>
export type ExtendedSizeType = z.infer<typeof ExtendedSizeSchema>
export type GraphType = z.infer<typeof GraphSchema>
export type InfoBarDateType = z.infer<typeof InfoBarDateSchema>
export type SectionType = z.infer<typeof SectionSchema>
export type DirectoryItemType = z.infer<typeof DirectoryItemSchema>
