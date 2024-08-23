import { Enum, Nullable } from "@ubloimmo/front-util";
import { ReactNode } from "react";

const contextLineFirst = ["first", "default", "last"] as const;
export type ContextLineFirst = Enum<typeof contextLineFirst>;

export type ContextLineProps = {
  /**
   * The position of label (first, default or last)
   *
   * @type {ContextLineFirst}
   * @default "default"
   */
  first?: ContextLineFirst;
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
