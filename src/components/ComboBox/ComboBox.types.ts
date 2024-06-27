import {
  Nullable,
  type NullishPrimitives,
  type VoidFn,
} from "@ubloimmo/front-util";

import { FlexDirection } from "@layouts";

export type ComboBoxOption<TOptionValue extends NullishPrimitives> = {
  /**
   * The option's label
   */
  label: string;
  /**
   * The option's value
   */
  value: TOptionValue;
  /**
   * Whether an option is disabled an cannot be selected
   *
   * @default false
   */
  disabled?: boolean;
};

export type ComboBoxOnChangeFn<TOptionValue extends NullishPrimitives> = VoidFn<
  [TOptionValue[]]
>;

export type ComboBoxProps<TOptionValue extends NullishPrimitives> = Record<
  string,
  unknown
> & {
  /**
   * The label of the ComboBox
   * @required
   * @default null
   */
  options: Nullable<ComboBoxOption<TOptionValue>[]>;

  /**
   * The layout of the options (horizontal or vertical)
   * @default "column"
   * @type {FlexDirection}
   */

  direction?: FlexDirection;

  /**
   * Whether several options can be selected
   * @default false
   * @type {boolean}
   */

  multi?: boolean;
  /**
   * Callback that fires each time selected option(s) changes
   *
   *
   */
  onChange?: ComboBoxOnChangeFn<TOptionValue>;
  /**
   * Whether to disable the selection of all options
   *
   * @default false
   */
  disabled?: boolean;
};

export type ComboBoxDefaultProps<TOptionValue extends NullishPrimitives> =
  Required<ComboBoxProps<TOptionValue>>;
