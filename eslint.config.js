import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import { defineConfig } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";

const MAX_COMPLEXITY = 5;
const MAX_DEPTH = 3;
const MAX_LINES = 300;
const MAX_LINES_PER_FUNCTION = 50;
const MAX_PARAMS = 3;
const MAX_ATTRIBUTES_PER_LINE = 3;

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      sonarjs,
    },
    rules: {
      complexity: ["warn", MAX_COMPLEXITY],
      "max-depth": ["warn", MAX_DEPTH],
      "max-lines": ["warn", MAX_LINES],
      "max-lines-per-function": ["warn", MAX_LINES_PER_FUNCTION],
      "max-params": ["warn", MAX_PARAMS],
      "no-nested-ternary": "warn",
      "no-else-return": "warn",
      "no-magic-numbers": ["warn", { ignore: [0, 1], detectObjects: true }],
      ...sonarjs.configs.recommended.rules,
    },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
      sonarjs,
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
      "vue/max-attributes-per-line": ["warn", { singleline: MAX_ATTRIBUTES_PER_LINE }],
      "vue/no-unused-components": "warn",
      "vue/no-mutating-props": "error",
      "vue/no-v-html": "warn",
      ...sonarjs.configs.recommended.rules,
    },
  },
]);
