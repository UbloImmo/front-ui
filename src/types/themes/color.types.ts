import { Enum } from "@/types/global/global.types";

const paletteColors = [
  "primary",
  "warning",
  "pending",
  "success",
  "info",
  "white",
  "black",
  "gray",
] as const;

export type PaletteColor = Enum<typeof paletteColors>;

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
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
] as const;

export type HexComponent = Enum<typeof hexComponents>;

export type HexComponentDouble = `${HexComponent}${HexComponent}`;

export type HexColorShorthand =
  `#${HexComponent}${HexComponent}${HexComponent}`;

export type HexColorShorthandAlpha =
  `#${HexComponent}${HexComponent}${HexComponent}${HexComponent}`;

export type HexColorOpaque =
  `#${HexComponentDouble}${HexComponentDouble}${HexComponentDouble}`;

export type HexColorAlpha =
  `#${HexComponentDouble}${HexComponentDouble}${HexComponentDouble}${HexComponentDouble}`;

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
