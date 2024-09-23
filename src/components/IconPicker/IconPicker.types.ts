import type { IconName } from "../Icon/Icon.types";
import type { StyleOverrideProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

type IconPickerOnChangeFn = VoidFn<[IconName | null]>;

export type IconPickerProps = {
  /**
   * The set of icons to display in IconPicker
   *
   * @remarks if a 2D array is passed, each inner array represents a row of icons
   *
   * @type {IconName[] | IconName[][]}
   * @default []
   */
  icons?: IconName[] | IconName[][];

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
  /**
   * The id of the IconPicker
   * @type {Nullable<string>}
   *
   * @remarks Used by IconPickerInput
   *
   * @default null
   */
  id?: Nullable<string>;
} & StyleOverrideProps;

export type IconPickerDefaultProps = Required<IconPickerProps>;
