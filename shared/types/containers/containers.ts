import type { ExtendedPropertiesType } from "#shared/types/common/extended-properties";
import type { About } from "#shared/types/containers/about";
import type { CommonContainers } from "#shared/types/containers/common";
import type { Languages } from "#shared/types/containers/languages";
import type { Other } from "#shared/types/containers/other";
import type { Projects } from "#shared/types/containers/projects";
import type { References } from "#shared/types/containers/references";
import type { Technologies } from "#shared/types/containers/technologies";

export interface Containers extends ExtendedPropertiesType {
  common: CommonContainers;
  about: About;
  languages: Languages;
  references: References;
  school: Other;
  technologies: Technologies;
  projects: Projects;
}
