import { CssLength, Enum } from "@types";

import type { ReactNode } from "react";

const gridFlows = ["row", "column"] as const;

export type GridFlow = Enum<typeof gridFlows>;

const gridAlignments = ["center", "start", "end"] as const;

export type GridAlignment = Enum<typeof gridAlignments>;

export type GridGap =
  | CssLength
  | {
      row: CssLength;
      column: CssLength;
    };

export type GridTemplate = (CssLength | "auto")[] | number | "unset";

export type GridLayoutProps = {
  flow?: GridFlow;
  gap?: GridGap;
  justify?: GridAlignment;
  align?: GridAlignment;
  columns?: GridTemplate;
  rows?: GridTemplate;
  inline?: boolean;
  children?: ReactNode;
};

export type GridLayoutDefaultProps = Required<GridLayoutProps>;
