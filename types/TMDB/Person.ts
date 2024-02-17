import type { ExternalIds } from './ExternalIds';
import type { Image } from './Image';
import type { Media } from './Media';

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  popularity: number;
  cast_id?: number;
  job?: string;
  character?: string;
  credit_id: string;
  order: number;
  // details
  also_known_as?: string[];
  birthday?: string;
  place_of_birth?: string;
  homepage?: string;
  biography?: string;
  external_ids?: ExternalIds;
  combined_credits?: {
    cast?: Media[];
    crew?: Media[];
  };
  images?: {
    profiles: Image[];
  };
}
