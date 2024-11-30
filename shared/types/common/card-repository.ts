import type { CardItemType } from '#shared/types/common/card-item'
import type { MinimalRepository } from '#shared/types/services/github/repository'

export type CardRepositoryType = CardItemType & MinimalRepository
