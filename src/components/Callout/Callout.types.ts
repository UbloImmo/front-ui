import type { IconName } from "../Icon";
import type { ColorKey, PaletteColor, StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type CalloutColor = Exclude<ColorKey, "success">;

export type CalloutIcon = IconName | "auto";

export type CalloutProps = {
  /**
   * The callout's text message
   *
   * @type {NonNullable<ReactNode>}
   * @required
   * @default "[label]"
   */
  children: NonNullable<ReactNode>;

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
   * @type {Nullable<CalloutIcon>}
   * @default "auto"
   */
  icon?: Nullable<CalloutIcon>;

  /**
   * The callout's optional title to display before the label
   *
   * @type {string}
   * @default null
   */
  title?: Nullable<string>;
};

export type CalloutDefaultProps = Required<CalloutProps>;

export type CalloutStyleColors = {
  background: PaletteColor;
  borderLeft: PaletteColor;
  icon: PaletteColor;
  text: PaletteColor;
};

export type CalloutStyleProps = StyleProps<
  Omit<CalloutStyleColors, "icon" | "text">
>;
