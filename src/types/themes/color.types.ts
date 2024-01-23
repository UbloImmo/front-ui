import { Enum } from "@/types/global/global.types";

export type RgbaColorStr =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;

export type RgbaColorArr = [number, number, number, number];

export type RgbaColorObj = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const hexComponents = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  // removed to decrease union complexity
  // "a",
  // "b",
  // "c",
  // "d",
  // "e",
  // "f",
] as const;

export const hexRegex =
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{8})$/;

export type HexComponent = Enum<typeof hexComponents> | `${number}`;

/**
 * #RRGGBB
 */
export type HexComponentDouble = `${HexComponent}${HexComponent}`;

export type HexColorShorthand =
  `#${HexComponent}${HexComponent}${HexComponent}`;

export type HexColorShorthandAlpha =
  `#${HexComponentDouble}${HexComponentDouble}`;

/**
 * #RRGGBB
 */
export type HexColorOpaque = `#${string}`;

/**
 * #RRGGBBAA
 */
export type HexColorAlpha = `#${string}`;

export type HexColor =
  | HexColorShorthand
  | HexColorOpaque
  | HexColorAlpha
  | HexColorShorthandAlpha;

export type ColorCollection = {
  rgbaStr: RgbaColorStr;
  rgbaArr: RgbaColorArr;
  rgbaObj: RgbaColorObj;
  hexShort: HexColorShorthand;
  hexShortAlpha: HexColorShorthandAlpha;
  hexOpaque: HexColorOpaque;
  hexAlpha: HexColorAlpha;
};

export type AnyColor = HexColor | RgbaColorStr | RgbaColorArr | RgbaColorObj;
