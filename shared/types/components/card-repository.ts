import type { CardItemType } from '#shared/types/components/card-item'
import type { MinimalRepositoryCard } from '#shared/types/services/github/repository'

export type CardRepositoryType = CardItemType & MinimalRepositoryCard
