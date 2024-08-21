import type { RgbaColorStr } from "./themes/color.types";

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
  value: TType extends "COLOR" ? RgbaColorStr : string;
  css?: {
    style: Partial<CSSStyleDeclaration>;
    rules: string;
  };
};

export type TokenValues<TType extends TokenType = TokenType> = {
  [k: string]: Token<TType> | TokenValues<TType>;
};

export type TokenValueGroup<TType extends TokenType = TokenType> = {
  [k: string]: Token<TType>;
};

export type ParsedEffect = Omit<Token<"EFFECT">, "css"> & {
  originalValue?: string;
};
