import type { LinkType } from './link'

export interface BannerItem {
  description: string
  links: LinkType[]
}

export interface RotatingBannerProps {
  items: BannerItem[]
  loading?: boolean
  step?: number
  paddleNav?: boolean
  dropAnimation?: boolean
  themeAnimation?: boolean
  opacityDelay?: number
  transitionDelay?: number
  transitionDuration?: number
  autoScroll?: boolean
  autoScrollDelay?: number
  autoScrollRestartDelay?: number
}

type Direction = 'left' | 'right' | 'neutral'

export interface GalleryPosition {
  itemIndex: number
  position: number
}

export interface GalleryState {
  sequence: number
  activeItem: number
  direction: Direction
  pendingUpdate: {
    sequence: number
    activeItem: number
  } | null
}
