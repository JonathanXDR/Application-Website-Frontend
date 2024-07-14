import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import neostandard from "neostandard";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  ...neostandard({
    semi: true,
    ts: true,
  }),
)
  .prepend(prettierConfig, {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  })
  .override("nuxt/typescript", {
    rules: {
      "@typescript-eslint/ban-types": "off",
    },
  });
