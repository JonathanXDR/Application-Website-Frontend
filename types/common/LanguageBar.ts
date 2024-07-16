import type { BasicSizeType } from './BasicSize';
import type { ExtendedPropsType } from './ExtendedProps';

export interface LanguageBarType extends ExtendedPropsType {
  progress: number;
  componentSize?: BasicSizeType | 'full';
}
