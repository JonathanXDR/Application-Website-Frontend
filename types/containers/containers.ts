import type { ExtendedPropsType as ExtendedPropertiesType } from '../common/ExtendedProps'
import type { About } from './About'
import type { CommonContainers } from './Common'
import type { Languages } from './Languages'
import type { Other } from './Other'
import type { Projects } from './Projects'
import type { References } from './References'
import type { Technologies } from './Technologies'

export interface Containers extends ExtendedPropertiesType {
  common: CommonContainers
  about: About
  languages: Languages
  references: References
  school: Other
  technologies: Technologies
  projects: Projects
}
