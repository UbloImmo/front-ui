import type { StyleOverrideProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type InputLabelProps = {
  /**
   * The label of the input.
   * @type {string}
   * @required
   */
  label: Nullable<string>;
  /**
   * To indicate if the input is required.
   * The symbol `*` will be added at the end of the label if this prop is set to true.
   * @default false
   * @type {boolean}
   */
  required?: boolean;
  /**
   * The child inputs to be rendered inside the label.
   *
   * @default null
   */
  children?: ReactNode;
} & StyleOverrideProps;

export type DefaultInputLabelProps = Required<InputLabelProps>;
