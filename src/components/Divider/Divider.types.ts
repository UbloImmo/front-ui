import type { StyleOverrideProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export type DividerProps = StyleOverrideProps & {
  /**
   * The label to display in the divider
   *
   * @default null
   */
  label?: Nullable<string>;
};

export type DividerDefaultProps = Required<DividerProps>;
