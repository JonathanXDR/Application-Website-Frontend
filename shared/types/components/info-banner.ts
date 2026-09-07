import type { BasicPropsType } from '#shared/types/schemas'

export interface InfoBannerType {
  // A banner entry need not carry the `title` that `BasicPropsType` requires.
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
