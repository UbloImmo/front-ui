import { Nullable, VoidFn } from "@ubloimmo/front-util";

import { StyleProps } from "@types";

export type SwitchProps = {
  /**
   * The Switch's state, active or inactive
   * @default false
   **/
  active?: boolean;

  /**
   * Whether the switch is disabled (cannot be toggled then)
   * @default false
   **/
  disabled?: boolean;

  /**
   * The Switch's additional callback.
   *
   * @type {Nullable<VoidFn>}
   * @default {null}
   */
  onChange?: Nullable<VoidFn>;
};

export type SwitchDefaultProps = Required<SwitchProps>;

export type SwitchStyleProps = StyleProps<SwitchDefaultProps>;
