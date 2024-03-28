import { transformObject } from "@ubloimmo/front-util";

import { cssPx } from "../utils";

import { Breakpoints, BreakpointsPx } from "@types";

export const breakpoints: Breakpoints = {
  XXS: 320,
  XS: 420,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const breakpointsPx: BreakpointsPx = transformObject(breakpoints, cssPx);
