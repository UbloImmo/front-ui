import { Nullable, VoidFn } from "@ubloimmo/front-util";

import { StyleProps } from "@types";

export type ComboBoxButtonProps = {
  /**
   * The label to be displayed in the ComboBoxOption
   * @required
   * @type {string}
   * @default {null}
   */
  label: string;

  /**
   * Whether the ComboBoxButton is selected or not
   * @default {false}
   */
  active?: boolean;

  /**
   * Whether the multi-selection is enabled or not
   * @type {boolean}
   * @default {false}
   */
  multi?: boolean;

  /**
   * The ComboBoxOption's onClick callback.
   *
   * @type {Nullable<VoidFn>}
   * @default {null}
   */
  onSelect?: Nullable<VoidFn>;

  /**
   * Whether the ComboBoxButton is disabled or not
   * @type {boolean}
   * @default {false}
   */

  disabled?: boolean;
};

export type ComboBoxButtonDefaultProps = Required<ComboBoxButtonProps>;

export type ComboBoxButtonContainerStyleProps =
  StyleProps<ComboBoxButtonDefaultProps>;

export type ComboButtonIconContainerStyleProps = Pick<
  ComboBoxButtonContainerStyleProps,
  "$active"
>;
