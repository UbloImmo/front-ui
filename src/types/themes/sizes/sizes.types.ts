import { Enum } from "@ubloimmo/front-util";

export const componentSizes = ["s", "m", "l"] as const;
export const extendedComponentSizes = ["xs", ...componentSizes, "xl"] as const;

export type ComponentSize = Enum<typeof componentSizes>;
export type ExtendedComponentSize = Enum<typeof extendedComponentSizes>;
