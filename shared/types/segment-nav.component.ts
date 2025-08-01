import type { ExtendedSizeType } from './extended-size.common'
import type { ItemType } from './item.common'

export interface SegmentNavType {
  items: ItemType[]
  componentSize?: Exclude<ExtendedSizeType, 'xlarge'>
  label?: 'icon' | 'text' | 'combination'
  focus?: boolean
  separator?: boolean
  shadow?: boolean
  grayLabels?: boolean
  gap?: string
  padding?: string
  outerPadding?: number
  selectedItem?: string
  onSelect?: (id: string) => void
}
