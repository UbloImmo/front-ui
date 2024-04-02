import type { InputProps } from "../Input.types";
import type { Nullable } from "@ubloimmo/front-util";

export type NumberInputProps = InputProps<"number"> & {
  /**
   * The input's minimum value.
   *
   * @default undefined
   */
  min?: Nullable<number>;
  /**
   * The input's maximum value.
   *
   * @default undefined
   */
  max?: Nullable<number>;
  /**
   * The input step size.
   * Affects the value increment/decrement when using the arrow keys and controls
   *
   * Can be decimal
   *
   * @default 1
   */
  step?: number;
};

export type DefaultNumberInputProps = Required<NumberInputProps>;
