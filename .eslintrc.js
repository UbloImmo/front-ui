/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    propWrapperFunctions: ["forbidExtraProps"],
    linkComponents: [
      "Hyperlink",
      {
        name: "Link",
        linkAttribute: "to",
      },
    ],
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "local-rules"],
  ignorePatterns: ["**/dist/*.js"],
  rules: {
    // generic
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-var": "error",
    eqeqeq: ["error", "always"],
    "no-dupe-keys": "error",
    // react
    "react/react-in-jsx-scope": 0,
    "react-hooks/exhaustive-deps": 2,
    "react/display-name": 0,
    // typescript
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
  },
};
