import type { StyleOverrideProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TableRowProps = {
  children?: ReactNode;
  onClick?: VoidFn;
} & StyleOverrideProps;
