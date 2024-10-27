import type { ExtendedPropertiesType } from "../common/extended-properties";
import type { About } from "./about";
import type { CommonContainers } from "./common";
import type { Languages } from "./languages";
import type { Other } from "./other";
import type { Projects } from "./projects";
import type { References } from "./references";
import type { Technologies } from "./technologies";

export interface Containers extends ExtendedPropertiesType {
  common: CommonContainers;
  about: About;
  languages: Languages;
  references: References;
  school: Other;
  technologies: Technologies;
  projects: Projects;
}
