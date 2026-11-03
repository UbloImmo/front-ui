import type { DecorativeColorKey } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

export type ColorPickerItemProps = {
  /**
   * The decorative color displayed by the ColorPickerItem
   * @type {DecorativeColorKey}
   * @required
   */
  color: DecorativeColorKey;

  /**
   * The label displayed under the swatch, also used as accessible name
   * @type {string}
   * @required
   */
  label: string;

  /**
   * Whether the ColorPickerItem is currently selected
   * @type {boolean}
   * @default false
   */
  active?: boolean;

  /**
   * Whether the ColorPickerItem is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * The callback function that is called when the ColorPickerItem is selected
   * @type {VoidFn}
   * @default null
   */
  onClick?: VoidFn;
};
