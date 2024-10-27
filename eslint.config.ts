import type { Linter } from "eslint";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import neostandard from "neostandard";
import withNuxt from "./.nuxt/eslint.config.mjs";

const config: Linter.Config[] = [
  ...neostandard(),
  configPrettier,
  pluginPrettier,
  {
    rules: {
      // Because auto imports -.-
      "no-undef": "off",
    },
  },
];

export default withNuxt(config);
