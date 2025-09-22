// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: ["prettier", "react-native"],
    ignores: ["dist/*"],
    rules: {
      "prettier/prettier": "error",
      "react-native/no-unused-styles": "error",
    },
  },
]);
