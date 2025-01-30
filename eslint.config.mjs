import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/dist/*.js",
      "**/dist",
      "**/lib",
      "**/__generated__",
      "**/node_modules",
      "**/storybook-static/**/*",
      "/docs/pages/typedoc/**/*",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
      "plugin:storybook/recommended"
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
            ["@layouts", "src/layouts"],
            ["@docs", "docs"],
            ["@", "src"],
          ],

          extensions: [".ts", "tsx", ".js", ".jsx", ".json", ".mdx"],
        },

        typescript: true,
        node: true,
      },
    },

    rules: {
      // generic
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "only-multiline",
          exports: "always-multiline",
          functions: "only-multiline",
        },
      ],
      "prettier/prettier": [
        "warn",
        {
          trailingComma: "es5",
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
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/ban-types": "off",

      // imports
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

      "import/namespace": [
        "off",
        {
          allowComputed: true,
        },
      ],

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
  },
];
