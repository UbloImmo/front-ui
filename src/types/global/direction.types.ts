import { Enum, EnumExtension } from "@ubloimmo/front-util";

const horizontalDirections = ["left", "right"] as const;

export type HorizontalDirection = Enum<typeof horizontalDirections>;

const verticalDirections = ["top", "bottom"] as const;

export type VerticalDirection = Enum<typeof verticalDirections>;

export type Direction = EnumExtension<HorizontalDirection, VerticalDirection>;
