import { Nullable } from "@ubloimmo/front-util";

import { IconName } from "../Icon";

import type { ColorKey, PaletteColor, StyleProps } from "@types";

export type CalloutColor = Exclude<ColorKey, "success">;

export type CalloutProps = {
  /**
   * The callout's text message
   *
   * @type {string}
   * @required
   * @default "[label]"
   */
  label: string;

  /**
   * The callout's main color
   *
   * Determines its background, icon & label colors
   *
   * @type {CalloutColor}
   * @default "primary"
   */
  color?: CalloutColor;

  /**
   * The callout's custom icon
   *
   * @type {IconName}
   * @default null
   */
  icon?: Nullable<IconName>;
};

export type CalloutDefaultProps = Required<CalloutProps>;

export type CalloutStyleColors = {
  background: PaletteColor;
  borderLeft: PaletteColor;
  icon: PaletteColor;
  label: PaletteColor;
};

export type CalloutStyleProps = StyleProps<
  Omit<CalloutStyleColors, "label" | "icon">
>;
