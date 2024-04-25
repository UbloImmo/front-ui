import type { IconName } from "../Icon";
import type { StaticIconColor } from "../StaticIcon/StaticIcon.types";
import type { PaletteColor, StyleProps } from "@types";

export type StateIndicatorProps = {
  /**
   * The state's label
   *
   * @type {string}
   * @required
   * @default "[Label]"
   */
  label: string;
  /**
   * The state's icon
   *
   * @type {IconName}
   * @required
   * @default "Circle"
   *
   */
  icon: IconName;
  /**
   * The state indicator's color
   *
   * Controls its background, border, label & icon colors
   *
   * @type {PaletteColor | "white"}
   * @default "primary"
   */
  color?: StaticIconColor;
};

export type DefaultStateIndicatorProps = Required<StateIndicatorProps>;

export type StateIndicatorStyleColors = {
  background: PaletteColor | "white";
  label: PaletteColor;
  icon: PaletteColor;
  border: PaletteColor;
};

export type StateIndicatorStyleProps = StyleProps<
  Omit<StateIndicatorStyleColors, "label" | "icon">
>;
