import type { InputProps } from "../Input.types";
import type { IconName } from "@/components/Icon";
import type { Nullable } from "@ubloimmo/front-util";

export type NumberInputProps = InputProps<"number"> & {
  /**
   * The input's minimum value.
   *
   * @default -Infinity
   */
  min?: number;
  /**
   * The input's maximum value.
   *
   * @default Infinity
   */
  max?: number;
  /**
   * The input step size.
   * Affects the value increment/decrement when using the arrow keys and controls
   *
   * Can be decimal
   *
   * @default 1
   */
  step?: number;
  /**
   * The number's scale.
   * Will multiply the number's precision by 10^scale
   * @default 0
   */
  scale?: number;
  /**
   * The number's precision.
   * Limits the number of decimal digits
   *
   * @type {Nullable<number>}
   * @default 2
   */
  precision?: Nullable<number>;
  /**
   * Whether to show the stepper buttons
   *
   * @default true
   */
  showStepper?: boolean;
  /**
   * Whether to show an icon on the right of the input
   *
   * @remarks
   * If true, the stepper buttons will be replaced by the icon
   *
   * @type {Nullable<IconName>}
   * @default null
   */
  controlIcon?: Nullable<IconName>;
};

export type DefaultNumberInputProps = Required<NumberInputProps>;
