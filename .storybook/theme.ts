import { create } from "@storybook/theming/create";
import { buildTheme } from "../src/themes";
import { blendColors } from "../src/utils";

const t = buildTheme();

/**
 * Storybook theme based on ublo's generated theme.
 */
export default create({
  base: "light",
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode:
    '"JetBrains Mono", "Inconsolata", "Fira Code", "Fira Mono", monospace',

  // Branding
  brandTitle: t.organization.name ?? "Ublo",
  brandUrl: "https://ublo.immo",
  brandImage: t.organization.assets.logo,
  brandTarget: "_self",

  // Colors
  colorPrimary: t.primary.base.rgba,
  colorSecondary: blendColors(t.primary.base.rgba, t.primary.medium.rgba),

  // UI Colors
  appBg: t.gray[50].rgba,
  appContentBg: t.gray[50].rgba,
  appPreviewBg: "#fff",
  appBorderColor: t.primary.medium.rgba,
  appBorderRadius: 8,

  // Button Colors
  buttonBg: t.primary.medium.rgba,
  buttonBorder: t.primary.base.rgba,

  // Boolean Colors
  booleanBg: t.primary.light.rgba,
  booleanSelectedBg: t.primary.medium.rgba,

  // Text Colors
  textColor: t.primary.dark.rgba,
  textInverseColor: t.primary.light.rgba,
  textMutedColor: t.primary.dark.opacity(0.5),

  // Toolbar Colors
  barTextColor: t.gray[600].rgba,
  barSelectedColor: t.primary.medium.rgba,
  barBg: t.gray[50].rgba,
  barHoverColor: t.primary.medium.rgba,

  // Input Colors
  inputBg: t.gray[50].rgba,
  inputBorder: t.primary.light.rgba,
  inputTextColor: t.gray[800].rgba,
  inputBorderRadius: 4,
});
