import { Nullable, VoidFn } from "@ubloimmo/front-util";

import type { IconName } from "../Icon/Icon.types";
import type { StyleOverrideProps } from "@types";

type IconPickerOnChangeFn = VoidFn<[IconName | null]>;

export type IconPickerProps = {
  /**
   * The set of icons to display in IconPicker
   * @type {IconName[]}
   */
  icons?: IconName[];

  /**
   * The currently selected icon
   * @type {Nullable<IconName>}
   */
  value?: Nullable<IconName>;

  /**
   * Callback function that runs when a user selects an icon
   * @type {IconPickerOnChangeFn}
   */
  onChange?: Nullable<IconPickerOnChangeFn>;

  /**
   * Whether the selection in IconPicker is disabled
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Whether the IconPicker is required
   * @type {boolean}
   *
   * @remarks to be set in a form context, when IconPicker is used in as an {@link InputType}
   */
  required?: boolean;
} & StyleOverrideProps;

export type IconPickerDefaultProps = Required<IconPickerProps>;
