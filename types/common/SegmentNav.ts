import type { ItemType } from "./Item"
import type { SizeType } from "./Size"

export interface SegmentNavType {
    items: ItemType[]
    size?: Exclude<SizeType, 'xlarge'>
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