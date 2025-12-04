import type { InputProps } from "../Input.types";
import type { Nullable } from "@ubloimmo/front-util";

export type MonthYearInputProps = InputProps<"month-year"> & {
  /**
   * Minimum month/year (in YYYY-MM format)
   */
  min?: Nullable<string>;
  /**
   * Maximum month/year (in YYYY-MM format)
   */
  max?: Nullable<string>;
};

export type MonthYearInputDefaultProps = Required<MonthYearInputProps>;
