import type { BasicPropsType } from '#shared/types/schemas'

export interface InfoBannerType {
  // Banner entries carry a description and links but no title, so every
  // field is optional unlike the base content props.
  items: Partial<BasicPropsType>[]
  loading?: boolean
  step?: number
  paddleNav?: boolean
  dropAnimation?: boolean
  themeAnimation?: boolean
  visibilityDelay?: number
  transitionDelay?: number
  transitionDuration?: number
  autoScroll?: boolean
  autoScrollDelay?: number
  autoScrollRestartDelay?: number
}

export interface GalleryStateType {
  sequence: number
  activeItem: number
  direction: 'left' | 'right' | 'neutral'
  pendingUpdate: { sequence: number, activeItem: number } | null
}
