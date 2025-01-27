import type { Enum } from "@ubloimmo/front-util";

const _fontFormats = ["woff2", "woff", "eot", "svg", "opentype", "truetype"];

export type FontFormat = Enum<typeof _fontFormats>;

export type FontWeight = number | `${number}`;

export type FontFaceDeclaration = {
  fontFamily: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  format: FontFormat;
  weight: FontWeight;
  italic?: boolean;
};

const _fontFamilyKeys = ["fontFamily", "format"] as const;

type FontFamilyDeclarationKeys = Enum<typeof _fontFamilyKeys>;

export type FontFamilyDeclaration = Pick<
  FontFaceDeclaration,
  FontFamilyDeclarationKeys
>;

export type FontStyleDeclaration = Omit<
  FontFaceDeclaration,
  FontFamilyDeclarationKeys
>;
