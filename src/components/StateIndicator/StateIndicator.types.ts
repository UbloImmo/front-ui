import type { IconName } from "../Icon";
import type {
  ColorKeyOrWhite,
  PaletteColor,
  PaletteColorOrWhite,
  StyleOverrideProps,
  StyleProps,
} from "@types";

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
   * @type {ColorKeyOrWhite}
   * @default "primary"
   */
  color?: ColorKeyOrWhite;
} & StyleOverrideProps;

export type DefaultStateIndicatorProps = Required<StateIndicatorProps>;

export type StateIndicatorStyleColors = {
  background: PaletteColorOrWhite;
  label: PaletteColor;
  icon: PaletteColor;
  border: PaletteColor;
};

export type StateIndicatorStyleProps = StyleProps<
  Omit<StateIndicatorStyleColors, "label" | "icon">
>;
