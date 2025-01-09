const config = {
  entryPoints: [
    "src/utils",
    "src/sizes",
    "src/types",
    "src/typography",
    "src/components",
    "src/layouts",
  ],
  exclude: ["**/*.+(stories|test).+(ts|tsx)", "**/*+.component.tsx"],
  name: "@ubloimmo/uikit",
  includeVersion: true,
  includeHierarchySummary: true,
  readme: "./README.md",
  out: "./docs/pages/typedoc",
  plugin: ["typedoc-plugin-markdown", "./scripts/docs/typedoc.plugin.js"],
  theme: "mdx-theme",
  outputFileStrategy: "members",
  membersWithOwnFile: ["TypeAlias", "Interface", "Enum", "Function", "Class"],
  fileExtension: ".mdx",
  logLevel: "Verbose",
  hideBreadcrumbs: true,
  useCodeBlocks: true,
  mergeReadme: true,
};

export default config;
