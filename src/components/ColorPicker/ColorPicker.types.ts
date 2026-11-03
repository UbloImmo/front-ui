import type { DecorativeColorKey, StyleOverrideProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

type ColorPickerOnChangeFn = VoidFn<[DecorativeColorKey | null]>;

export type ColorPickerProps = {
  /**
   * The set of colors to display in ColorPicker
   *
   * @type {DecorativeColorKey[]}
   * @default decorativeColorKeys
   */
  colors?: DecorativeColorKey[];
  /**
   * The label displayed under each color
   *
   * @type {Partial<Record<DecorativeColorKey, string>>}
   * @default decorativeColorLabels
   */
  labels?: Partial<Record<DecorativeColorKey, string>>;
  /**
   * The currently selected color
   * @type {Nullable<DecorativeColorKey>}
   */
  value?: Nullable<DecorativeColorKey>;
  /**
   * Callback function that runs when a user selects a color
   * @type {ColorPickerOnChangeFn}
   */
  onChange?: Nullable<ColorPickerOnChangeFn>;
  /**
   * Whether the selection in ColorPicker is disabled
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * Whether the ColorPicker is required (prevents unselecting)
   * @type {boolean}
   */
  required?: boolean;
  /**
   * The id of the ColorPicker
   * @remarks Used by ColorPickerInput
   * @default null
   */
  id?: Nullable<string>;
} & Omit<StyleOverrideProps, "as">;

export type ColorPickerDefaultProps = Required<ColorPickerProps>;
