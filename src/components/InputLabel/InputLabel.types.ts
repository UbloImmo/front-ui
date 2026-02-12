import type { TooltipProps } from "../Tooltip";
import type { StyleOverrideProps, StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type InputLabelTooltipProps = Omit<TooltipProps, "children">;

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
  /**
   * The tooltip to be displayed when hovering over the label.
   * @remarks No tooltip will render if omitted.
   *
   * @type {Nullable<InputLabelTooltipProps>}
   * @default null
   */
  tooltip?: Nullable<InputLabelTooltipProps>;
  /**
   * Flag to make the input label as compact as possible.
   * If `tooltip` is also provided, it will be rendererd next to the label
   */
  compact?: boolean;

  htmlFor?: Nullable<string>;
} & Omit<StyleOverrideProps, "as">;

export type DefaultInputLabelProps = Required<InputLabelProps>;

/** @deprecated styled-components */
export type InputLabelTextStyleProps = StyleProps<
  Pick<InputLabelProps, "required">
>;
