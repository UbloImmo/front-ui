import { CssLength, Enum } from "../../types";

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

export type GridTemplate = CssLength[] | number | "unset";

export type GridLayoutProps = {
  flow?: GridFlow;
  gap?: GridGap;
  justify?: GridAlignment;
  align?: GridAlignment;
  columns?: GridTemplate;
  rows?: GridTemplate;
};

export type GridLayoutDefaultProps = Required<GridLayoutProps>;
