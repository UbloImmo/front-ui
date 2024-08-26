import { Nullable } from "@ubloimmo/front-util";
import { ReactNode } from "react";

export type ContextLineProps = {
  /**
   * The label of the ContextLine
   *
   * @required
   * @type {string | null}
   * @default null
   */
  label: Nullable<string>;
  /**
   * A custom element to display in the ContextLine
   *
   * @required
   * @default null
   */
  children: ReactNode;
};

export type ContextLineDefaultProps = Required<ContextLineProps>;
