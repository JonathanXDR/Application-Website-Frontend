import type { CardItemType } from "~~/types/common/card-item";
import type { MinimalRepository } from "~~/types/services/github/repository";

export type CardRepositoryType = CardItemType & MinimalRepository;
