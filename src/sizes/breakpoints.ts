import { transformObject } from "@ubloimmo/front-util";

import { cssPx } from "../utils";

import { Breakpoints, BreakpointsPx } from "@types";

export const breakpoints: Breakpoints = {
  XXS: 478,
  XS: 767,
  SM: 991,
  MD: 1280,
  LG: 1440,
  XL: 1920,
} as const;

export const breakpointsPx: BreakpointsPx = transformObject(breakpoints, cssPx);
