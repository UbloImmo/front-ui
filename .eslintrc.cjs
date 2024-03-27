/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
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
    "import/code-modules": ["bun:test"],
    "import/resolver": {
      alias: {
        map: [
          ["@components", "src/components"],
          ["@utils", "src/utils"],
          ["@types", "src/types"],
          ["@docs", "docs"],
          ["@", "src"],
        ],
        extensions: [".ts", "tsx", ".js", ".jsx", ".json", ".mdx"],
      },
      typescript: true,
      node: true,
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "import"],
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
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "*/**",
            from: "src/index.ts",
            message:
              "Do not import from `src`, import from relative path instead.",
          },
        ],
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["bun:test"],
      },
    ],
    "import/default": "off",
    "import/no-named-as-default": "off",
    "import/namespace": ["off", { allowComputed: true }],
    "import/no-namespace": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          ["parent", "sibling"],
          "internal",
          "index",
          ["object", "unknown"],
          "type",
        ],
        pathGroups: [
          {
            pattern: "@utils/**",
            group: "internal",
          },
          {
            pattern: "@types/**",
            group: "type",
          },
          {
            pattern: "@components",
            group: "internal",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          orderImportKind: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
};
