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
   * The option's description
   * @default null
   */
  description?: Nullable<string>;
  /**
   * Whether an option is disabled an cannot be selected
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the option can be edited.
   *
   * @default false
   */
  editable?: boolean;
  /**
   * Whether the option can be deleted.
   *
   * @default false
   */
  deletable?: boolean;
};

export type ComboBoxOnChangeFn<TOptionValue extends NullishPrimitives> = VoidFn<
  [TOptionValue[]]
>;

/**
 * Callback function for when an option is edited or deleted
 */
export type ComboBoxOptionCallback<TOptionValue extends NullishPrimitives> =
  VoidFn<[TOptionValue]>;

export type ComboBoxProps<TOptionValue extends NullishPrimitives> = {
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

  multi?: boolean;
  /**
   * Callback that fires each time selected option(s) changes
   *
   * @remarks If `multi` is true, the callback will receive an array of selected values, otherwise it will receive a single value or `null`
   */
  onChange?: Nullable<ComboBoxOnChangeFn<NoInfer<TOptionValue>>>;
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

  /**
   * Whether to make the combobox readonly.
   *
   * @remarks Disabled styles will not be applied but component will not be interactible
   *
   * @remarks Used in Form Field while a form is in "view" mode
   *
   * @type {boolean}
   * @default false
   */
  readonly?: boolean;
  /**
   * The id of the combobox
   *
   * @type {Nullable<string>}
   * @default null
   */
  id?: Nullable<string>;
  /**
   * Whether creating a new option is allowed
   *
   * @remarks Translates to rendering a single Button
   *
   * @type {boolean}
   * @default false
   */
  creatable?: boolean;
  /**
   * Callback that fires when a new option should be created
   *
   * @remarks The parent component is responsible for handling options and values upon creation
   */
  onCreate?: Nullable<VoidFn>;
  /**
   * Callback that fires when an option is to be edited
   * @type {((value: TOptionValue) => void) | null};
   */
  onOptionEdit?: Nullable<ComboBoxOptionCallback<TOptionValue>>;
  /**
   * Callback that fires when an option is to be deleted
   * @type {((value: TOptionValue) => void) | null};
   */
  onOptionDelete?: Nullable<ComboBoxOptionCallback<TOptionValue>>;
  /**
   * Label for the option "edit" context menu item
   *
   * @type {Nullable<string>}
   * @default tl.action.edit
   */
  optionEditLabel?: Nullable<string>;
  /**
   * Label for the option "delete" context menu item
   *
   * @type {Nullable<string>}
   * @default tl.action.delete
   */
  optionDeleteLabel?: Nullable<string>;
};

export type ComboBoxDefaultProps<TOptionValue extends NullishPrimitives> =
  Required<ComboBoxProps<TOptionValue>>;
