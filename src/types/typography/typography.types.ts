import { texts } from "@ubloimmo/front-tokens";
import type { Enum, PaletteColor } from "../";
import type { ReactNode } from "react";

export type TypographyTokens = typeof texts;

export type TypographyCategory = keyof TypographyTokens & string;

export type TypographySize<TCategory extends TypographyCategory> =
  keyof TypographyTokens[TCategory] & string;

export type TextSize = TypographySize<"text">;

export type HeadingSize = TypographySize<"heading">;

const typographyWeights = ["regular", "semiBold", "bold"] as const;

export type TypographyWeight = Enum<typeof typographyWeights>;

export type TypographyToken =
  TypographyTokens["text"][TextSize][TypographyWeight];

export type TypographyProps = {
  color?: PaletteColor;
  italic?: boolean;
  underline?: boolean;
  overline?: boolean;
  lineThrough?: boolean;
  weight?: TypographyWeight;
  important?: boolean;
  children?: ReactNode;
};

export type TextProps = TypographyProps & {
  size?: TextSize;
};

export type HeadingProps = TypographyProps & {
  size?: HeadingSize;
};

export type AnyTypographyProps = TypographyProps & {
  size?: HeadingProps["size"] | TextProps["size"];
};
