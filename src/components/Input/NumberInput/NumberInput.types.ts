import type { InputProps } from "../Input.types";

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
};

export type DefaultNumberInputProps = Required<NumberInputProps>;
