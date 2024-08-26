import { VoidFn } from "@ubloimmo/front-util";

import type { IconName } from "@/components/Icon/Icon.types";
import type { StyleProps } from "@types";

export type IconPickerItemProps = {
  /** The name of the icon to be displayed in IconPickerItem.
   * @type {IconName}
   * @required
   */
  name: IconName;

  /**
   * Whether the IconPickerItem is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the IconPickerItem is currently selected.
   * @type {boolean}
   * @default false
   */
  active?: boolean;

  /**
   * The callback function that is called when the IconPickerItem is selected.
   * @type {VoidFn}
   * @default null
   */
  onClick?: VoidFn;

  /**
   * Whether to make the IconPicker readonly.
   * @remarks Used in Form Field while a form is in "view" mode
   *
   * @type {boolean}
   * @default false
   */
  readonly?: boolean;
};

export type IconPickerItemDefaultProps = Required<IconPickerItemProps>;

export type IconPickerItemStyleProps = StyleProps<
  Pick<IconPickerItemProps, "active" | "readonly">
>;
