import type { Enum, Nullable } from "@ubloimmo/front-util";

export type SumLineSize = "m" | "l";

export const sumLineUnits = ["€", "€ CC", "€ HC", "m²"] as const;

export type SumLineUnit = Enum<typeof sumLineUnits>;

export type SumLineProps = {
  /**
   * The label of the sum line
   *
   * @default "[Label]"
   */
  label: string;
  /**
   * The integer value of the sum line
   *
   * @remarks
   * Gets formatted and divided by 100 before being rendered
   * `123456789` will be formatted as `1 234 567,89`
   *
   * @default 0
   */
  value: number;
  /**
   * The size of the sum line, `l` renders the value using a heading instead of a text
   *
   * @default "m"
   */
  size?: SumLineSize;
  /**
   * The unit of the sum line
   *
   * @remarks
   * Setting `unit` to `null` will not render any unit
   *
   * @default "€"
   */
  unit?: Nullable<SumLineUnit>;
  /**
   * The period the sum line is for
   *
   * @remarks
   * Setting `period` to `null` will not render any period
   * If provided, the period will be prefixed with `/`
   *
   * @default null
   */
  period?: Nullable<string>;
};

export type SumLineDefaultProps = Required<SumLineProps>;
