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

export type RgbaColorCollection = {
  str: RgbaColorStr;
  arr: RgbaColorArr;
  obj: RgbaColorObj;
};
