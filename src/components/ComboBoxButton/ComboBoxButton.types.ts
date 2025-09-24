import { Nullable, VoidFn } from "@ubloimmo/front-util";

import { StyleProps } from "@types";

export type ComboBoxButtonProps = {
  /**
   * The label to be displayed in the ComboBoxOption
   * @required
   *
   * @type {string}
   * @default null
   */
  label: string;

  /**
   * The description to be displayed in the ComboBoxOptionButton
   * @type {Nullable<string>}
   * @default null
   */
  description?: Nullable<string>;

  /**
   * Whether the ComboBoxButton is selected or not
   *
   * @type {boolean}
   * @default false
   */
  active?: boolean;

  /**
   * Whether the multi-selection is enabled or not
   *
   * @type {boolean}
   * @default false
   */
  multi?: boolean;

  /**
   * The ComboBoxOption's onClick callback.
   *
   * @type {Nullable<VoidFn>}
   * @default null
   */
  onSelect?: Nullable<VoidFn>;

  /**
   * Whether the ComboBoxButton is disabled or not
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Applies flex: 1 to button if provided
   *
   * @type {boolean}
   * @default false
   */
  fill?: boolean;

  /**
   * Whether to show the check icon when an option is selected
   *
   * @type {boolean}
   * @default true
   */
  showIcon?: boolean;
  /**
   * Whether the ComboBoxButton is deletable
   *
   * @type {boolean}
   * @default false
   */
  deletable?: boolean;
  /**
   * Whether the ComboBoxButton is editable
   *
   * @type {boolean}
   * @default false
   */
  editable?: boolean;
  /**
   * Whether the parent ComboBox is required
   * Setting to true will hide the "unselect" title when active
   *
   * @type {boolean}
   * @default false
   */
  required?: boolean;
  /**
   * Callback that gets fired whenever the user chooses to edit the ComboBoxButton
   *
   * @type {Nullable<VoidFn>}
   * @default null
   */
  onEdit?: Nullable<VoidFn>;
  /**
   * Callback that gets fired whenever the user chooses to delete the ComboBoxButton
   *
   * @type {Nullable<VoidFn>}
   * @default null
   */
  onDelete?: Nullable<VoidFn>;
  /**
   * The label to be displayed in the edit button
   *
   * @remarks If not provided, will default to `tl.actions.edit`
   *
   * @type {Nullable<string>}
   * @default null
   */
  editLabel?: Nullable<string>;
  /**
   * The label to be displayed in the delete button
   *
   * @remarks If not provided, will default to `tl.actions.delete`
   *
   * @type {Nullable<string>}
   * @default null
   */
  deleteLabel?: Nullable<string>;
};

export type ComboBoxButtonDefaultProps = Required<ComboBoxButtonProps>;

export type ComboBoxButtonContainerStyleProps =
  StyleProps<ComboBoxButtonDefaultProps>;

export type ComboButtonIconContainerStyleProps = Pick<
  ComboBoxButtonContainerStyleProps,
  "$active"
>;
