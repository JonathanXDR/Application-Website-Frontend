import type { About } from '#shared/types/containers/about'
import type { CommonContainers } from '#shared/types/containers/common'
import type { Languages } from '#shared/types/containers/languages'
import type { Other } from '#shared/types/containers/other'
import type { Projects } from '#shared/types/containers/projects'
import type { References } from '#shared/types/containers/references'
import type { Technologies } from '#shared/types/containers/technologies'
import type { ExtendedPropsType } from '~~/shared/types/common/extended-props'

export interface Containers extends ExtendedPropsType {
  common: CommonContainers
  about: About
  languages: Languages
  references: References
  school: Other
  technologies: Technologies
  projects: Projects
}
