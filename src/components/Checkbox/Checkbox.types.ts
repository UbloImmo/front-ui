import { Nullable, VoidFn } from "@ubloimmo/front-util";

export type CheckboxStatus = boolean | "mixed";

export type CheckboxProps = {
  /**
   * The status of the checkbox. Can be `true`, `false` or `mixed`.
   * @type {CheckboxStatus}
   * @default false
   */
  active?: Nullable<CheckboxStatus>;
  /**
   * Whether the checkbox is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The Checkbox callback when the active status changes.
   * @type {VoidFn<[CheckboxStatus]>}
   * @default undefined
   */
  onChange?: Nullable<VoidFn<[boolean]>>;
};

export type CheckboxDefaultProps = Required<CheckboxProps>;
