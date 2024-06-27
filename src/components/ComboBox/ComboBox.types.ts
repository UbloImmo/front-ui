import { Nullable } from "@ubloimmo/front-util";

import { FlexDirection } from "@layouts";

export type ComboBoxProps = {
  /**
   * The label of the ComboBox
   * @required
   * @default null
   */
  options: Nullable<string[]>;

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
};

export type ComboBoxDefaultProps = Required<ComboBoxProps>;
