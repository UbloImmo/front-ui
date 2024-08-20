import { GenericFn, objectKeys } from "@ubloimmo/front-util";

import * as GeneratedIcons from "./__generated__";
import { CommonIconProps } from "./__generated__/common.types";

import {
  CssPx,
  CssRem,
  FixedCssLength,
  PaletteColor,
  StyleProps,
} from "@types";

const IconName = GeneratedIcons;

export type IconName = keyof typeof IconName;

export const allIconNames = objectKeys(IconName) as IconName[];

export type GeneratedIcon = GenericFn<[CommonIconProps], JSX.Element>;

export type IconProps = {
  /**
   * The size of the icon.
   * Either `CssRem`, `CssPx`, `SpacingLabel` or a `number`
   *
   * Gets automatically converted to `CssRem`.
   *
   * @type {FixedCssLength}
   * @default "s-4"
   */
  size?: FixedCssLength;
  /**
   * The shaded color of the icon.
   *
   * @type {PaletteColor}
   * @default "primary-base"
   */
  color?: PaletteColor;
  /**
   * The name of the icon to render.
   *
   * @required
   * @type {IconName}
   * @default "Circle"
   */
  name: IconName;
};

export type DefaultIconProps = Required<IconProps>;

export type MissingIcon = {
  (): JSX.Element;
  __missing: true;
};

export type IconFallbackStyleProps = StyleProps<{
  size: CssPx | CssRem;
}>;
