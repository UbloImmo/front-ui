import { PaletteColor, CssLength, CssFr } from "../../types";
import { GenericFn } from "@ubloimmo/front-util";
import * as GeneratedIcons from "./__generated__";
import { CommonIconProps } from "./__generated__/common.types";

const IconName = GeneratedIcons;

export type IconName = keyof typeof IconName;

export type GeneratedIcon = GenericFn<[CommonIconProps], JSX.Element>;

export type IconProps = {
  /**
   * The size of the icon.
   * Either `CssRem`, `CssPx`, `SpacingLabel` or a `number`
   *
   * Gets automatically converted to `CssRem`.
   *
   * @default "s-4"
   */
  size?: Exclude<CssLength, CssFr>;
  /**
   * The shaded color of the icon.
   *
   * @default "primary-base"
   */
  color?: PaletteColor;
  /**
   * The name of the icon to render.
   *
   * @default "Circle"
   */
  name: IconName;
};

export type DefaultIconProps = Required<IconProps>;
