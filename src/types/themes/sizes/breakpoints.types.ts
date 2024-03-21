import { CssPx, Enum } from "../../";

export const breakpointLabels = [
  "XXS",
  "XS",
  "SM",
  "MD",
  "LG",
  "XL",
  "XXL",
] as const;

export type BreakpointLabel = Enum<typeof breakpointLabels>;

export type Breakpoints = Record<BreakpointLabel, number>;

export type BreakpointsPx = Record<BreakpointLabel, CssPx>;
