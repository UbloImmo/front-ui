import type { CommonIconProps } from "./__generated__/common.types";
import type { IconName } from "./__generated__/iconName.types";
import type {
  CssPx,
  CssRem,
  FixedCssLength,
  PaletteColor,
  StyleProps,
} from "@types";
import type { GenericFn } from "@ubloimmo/front-util";

export type { IconName } from "./__generated__/iconName.types";

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

/**
 * @deprecated styled-components
 */
export type IconFallbackStyleProps = StyleProps<{
  size: CssPx | CssRem;
}>;
