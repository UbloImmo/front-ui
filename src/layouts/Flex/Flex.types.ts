import { CssFr, CssLength, Enum } from "../../types";

import type { ReactNode } from "react";

const flexAlignments = [
  "center",
  "start",
  "end",
  "space-around",
  "space-between",
  "space-evenly",
  "stretch",
  "baseline",
] as const;

export type FlexAlignment = Enum<typeof flexAlignments>;

const flexDirections = ["row", "column"] as const;

export type FlexDirection = Enum<typeof flexDirections>;

export type FlexWrap = boolean | "reverse";

export type FlexGap = Exclude<CssLength, CssFr>;

export type FlexFill = boolean | FlexDirection;

export type FlexLayoutProps = {
  direction?: FlexDirection;
  gap?: CssLength;
  justify?: FlexAlignment;
  align?: FlexAlignment;
  wrap?: FlexWrap;
  reverse?: boolean;
  inline?: boolean;
  fill?: FlexFill;
  children?: ReactNode;
};

export type FlexLayoutDefaultProps = Required<FlexLayoutProps>;

export type FlexDirectionLayoutProps = Omit<FlexLayoutProps, "direction">;
