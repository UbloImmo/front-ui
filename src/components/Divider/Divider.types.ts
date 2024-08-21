import type { StyleOverrideProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";

const labelAlignments = ["start", "center"] as const;
export type LabelAlignment = Enum<typeof labelAlignments>;

export type DividerProps = StyleOverrideProps & {
  /**
   * The label to display in the divider
   *
   * @default null
   */
  label?: Nullable<string>;

  /**
   * The horizontal alignment of the label
   *
   * @default "start"
   * @type {LabelAlignment}
   */
  justify?: LabelAlignment;
};

export type DividerDefaultProps = Required<DividerProps>;
