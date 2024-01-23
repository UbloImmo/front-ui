import { RgbaColorStr } from "@/types/themes/color.types";

export const tokenTypes = [
  "TEXT",
  "COLOR",
  "GRADIENT",
  "ASSET",
  "EFFECT",
] as const;

export type TokenType = (typeof tokenTypes)[number];

export type Token<TType extends TokenType = TokenType> = {
  name: string;
  type: TType;
  css?: {
    style: Partial<CSSStyleDeclaration>;
    rules: string;
  };
  value: TType extends "COLOR" ? RgbaColorStr : string;
};

export type TokenValues = {
  [k: string]: Token | TokenValues;
};

export type TokenValueGroup = {
  [k: string]: Token;
};
