import { Nullable, VoidFn } from "@ubloimmo/front-util";

import { StyleProps } from "@types";

export type SwitchProps = {
  /**
   * The Switch's state, active or inactive
   * @default false
   **/
  active?: Nullable<boolean>;

  /**
   * Whether the switch is disabled (cannot be toggled then)
   * @default false
   **/
  disabled?: boolean;

  /**
   * Whether an helper text should be displayed
   * @default false
   */
  withHelper?: boolean;

  /**
   * The helper text to be displayed on active state
   */
  activeHelperText?: Nullable<string>;

  /**
   * The helper text to be displayed on inactive state
   */
  inactiveHelperText?: Nullable<string>;

  /**
   * The position of the helper text relative to the switch
   * @default "start"
   */
  helperPosition?: "start" | "end";

  /**
   * The Switch's callback.
   *
   * @type {Nullable<VoidFn<[boolean]>>}
   * @default {null}
   */
  onChange?: Nullable<VoidFn<[boolean]>>;
};

export type SwitchDefaultProps = Required<SwitchProps>;

export type SwitchStyleProps = StyleProps<SwitchDefaultProps>;
