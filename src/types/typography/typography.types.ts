import { texts } from "@ubloimmo/front-tokens";
import { Enum, PaletteColor } from "..";

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
  $important?: boolean;
};

export interface TextProps extends TypographyProps {
  size?: TextSize;
}

export interface HeadingProps extends TypographyProps {
  size?: HeadingSize;
}

export type AnyTypographyProps = TypographyProps & {
  size?: HeadingProps["size"] | TextProps["size"];
};
