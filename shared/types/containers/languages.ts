import type { ExtendedPropertiesType } from '#shared/types/common/extended-properties'
import type { LanguageBarType } from '#shared/types/common/language-bar'

export interface Languages extends ExtendedPropertiesType {
  languages: LanguageBarType[]
}
