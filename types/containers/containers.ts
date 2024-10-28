import type { ExtendedPropertiesType } from "~~/types/common/extended-properties";
import type { About } from "~~/types/containers/about";
import type { CommonContainers } from "~~/types/containers/common";
import type { Languages } from "~~/types/containers/languages";
import type { Other } from "~~/types/containers/other";
import type { Projects } from "~~/types/containers/projects";
import type { References } from "~~/types/containers/references";
import type { Technologies } from "~~/types/containers/technologies";

export interface Containers extends ExtendedPropertiesType {
  common: CommonContainers;
  about: About;
  languages: Languages;
  references: References;
  school: Other;
  technologies: Technologies;
  projects: Projects;
}
