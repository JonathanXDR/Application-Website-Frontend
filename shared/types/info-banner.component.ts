import type { BasicPropsType } from './basic-props.common'

export interface InfoBannerType {
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

export interface GalleryStateType {
  sequence: number
  activeItem: number
  direction: 'left' | 'right' | 'neutral'
  pendingUpdate: { sequence: number, activeItem: number } | null
}
