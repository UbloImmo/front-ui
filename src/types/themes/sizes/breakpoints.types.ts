import type { CssPx } from "@types";
import type { Enum } from "@ubloimmo/front-util";

export const breakpointLabels = ["XXS", "XS", "SM", "MD", "LG", "XL"] as const;

export type BreakpointLabel = Enum<typeof breakpointLabels>;

export type Breakpoints = Record<BreakpointLabel, number>;

export type BreakpointsPx = Record<BreakpointLabel, CssPx>;
