import { CssFr, CssLength, Enum } from "../../types";

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

export type FlexLayoutProps = {
  direction?: FlexDirection;
  gap?: CssLength;
  justify?: FlexAlignment;
  align?: FlexAlignment;
  wrap?: FlexWrap;
  reverse?: boolean;
};

export type FlexLayoutDefaultProps = Required<FlexLayoutProps>;

export type FlexDirectionLayoutProps = Omit<FlexLayoutProps, "direction">;
