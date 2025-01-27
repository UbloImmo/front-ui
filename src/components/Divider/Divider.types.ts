import type { StyleOverrideProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";

const _dividerLabelAlignments = ["start", "center"] as const;
export type DividerLabelAligment = Enum<typeof _dividerLabelAlignments>;

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
  justify?: DividerLabelAligment;
};

export type DividerDefaultProps = Required<DividerProps>;
