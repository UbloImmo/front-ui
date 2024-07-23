import { VoidFn } from "@ubloimmo/front-util";

export type CheckboxStatus = boolean | "mixed";

export type CheckboxProps = {
  /**
   * The status of the checkbox. Can be `true`, `false` or `mixed`.
   * @type {CheckboxStatus}
   * @default false
   */
  active?: CheckboxStatus;
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
  onChange?: VoidFn<[CheckboxStatus]>;
};

export type CheckboxDefaultProps = Required<CheckboxProps>;
