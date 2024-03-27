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
  /**
   * The color of the text
   *
   * @type {PaletteColor}
   * @default "gray-900"
   */
  color?: PaletteColor;
  /**
   * Whether or not the text should be italic
   *
   * @default false
   */
  italic?: boolean;
  /**
   * Whether or not the text should be underlined
   *
   * @default false
   */
  underline?: boolean;
  /**
   * Whether or not the text should be overlined
   *
   * @default false
   */
  overline?: boolean;
  /**
   * Whether or not the text should be crossed out
   *
   * @default false
   */
  lineThrough?: boolean;
  /**
   * The weight of the text
   *
   * @type {TypographyWeight}
   * @default "regular"
   */
  weight?: TypographyWeight;
  /**
   * Whether or not the the text's styles should have the css `!important` flag.
   *
   * Useful in case you need it (e.g. for overriding Storybook's default styles).
   * **Do not overuse**
   *
   * @default false
   */
  important?: boolean;
  /**
   * Whether or not the text should be ellipsized if it overflows.
   *
   * Setting this to true will enable `overflow-x: hidden`, `white-space: nowrap`,
   * `text-overflow: ellipsis` and `max-width: 100%`.
   *
   * @default false
   */
  ellipsis?: boolean;
  /**
   * Any valid react children.
   *
   * @default undefined
   */
  children?: ReactNode;
};

export type TextProps = TypographyProps & {
  /**
   * Dictates the text's font size
   *
   * @type {TextSize}
   * @default "m"
   */
  size?: TextSize;
};

export type HeadingProps = TypographyProps & {
  /**
   * Dictates the heading's font size
   *
   * @type {HeadingSize}
   * @default "h1"
   */
  size?: HeadingSize;
};

export type AnyTypographyProps = TypographyProps & {
  size?: HeadingProps["size"] | TextProps["size"];
};
