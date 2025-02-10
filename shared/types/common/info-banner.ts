import type { BasicPropsType } from '#shared/types/common/basic-props'

export interface InfoBanner {
  items: BasicPropsType[]
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

export interface GalleryState {
  sequence: number
  activeItem: number
  direction: 'left' | 'right' | 'neutral'
  pendingUpdate: { sequence: number, activeItem: number } | null
}
