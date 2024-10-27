import type { MinimalRepository } from "../services/github/repository";
import type { CardItemType } from "./card-item";

export type CardRepositoryType = CardItemType & MinimalRepository;
