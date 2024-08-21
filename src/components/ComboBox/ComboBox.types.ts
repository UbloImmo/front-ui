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

export type ComboBoxOnChangeMultiFn<TOptionValue extends NullishPrimitives> =
  VoidFn<[TOptionValue[]]>;

export type ComboBoxOnChangeSingleFn<TOptionValue extends NullishPrimitives> =
  VoidFn<[Nullable<TOptionValue>]>;

export type ComboBoxOnChangeFn<
  TOptionValue extends NullishPrimitives,
  TMulti extends boolean
> = TMulti extends true
  ? ComboBoxOnChangeMultiFn<TOptionValue>
  : ComboBoxOnChangeSingleFn<TOptionValue>;

export type ComboBoxProps<
  TOptionValue extends NullishPrimitives,
  TMulti extends boolean = false
> = {
  /**
   * The options to display in the combobox
   * @required
   * @default null
   */
  options?: Nullable<ComboBoxOption<TOptionValue>[]>;

  /**
   * The value of the selected option. Either a single value or an array if `multi` is true
   *
   * @remarks Setting this to null or some other value that is not included in the options array
   * will result in none the the options being active
   *
   * @type {TOptionValue | TOptionValue[]}
   * @default null
   */
  value?: Nullable<TOptionValue | TOptionValue[]>;

  /**
   * The layout of the options (horizontal or vertical)
   * @default "column"
   * @type {FlexDirection}
   */

  direction?: FlexDirection;
  /**
   * The number of columns to use when displaying the combobox buttons
   *
   * @remarks This option will make ComboBox use a GridLayout instead of a FlexLayout
   */
  columns?: Nullable<number>;

  /**
   * Whether several options can be selected
   * @default false
   * @type {boolean}
   */

  multi?: TMulti;
  /**
   * Callback that fires each time selected option(s) changes
   *
   * @remarks If `multi` is true, the callback will receive an array of selected values, otherwise it will receive a single value or `null`
   */
  onChange?: Nullable<ComboBoxOnChangeFn<TOptionValue, TMulti>>;
  /**
   * Whether to disable the selection of all options
   *
   * @default false
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * Whether to show the check icon when an option is selected
   *
   * @default true
   * @type {boolean}
   */
  showIcon?: boolean;
};

export type ComboBoxDefaultProps<
  TOptionValue extends NullishPrimitives,
  TMulti extends boolean = false
> = Required<ComboBoxProps<TOptionValue, TMulti>>;
