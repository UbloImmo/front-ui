import { texts } from "@ubloimmo/front-tokens";

import type { PaletteColor } from "../";
import type { ReactNode } from "react";

export type TypographyTokens = typeof texts;

export type TypographyCategory = keyof TypographyTokens & string;

export type TypographyBreakpoint = Exclude<TypographyCategory, "@figma">;

export type TypographySize = string &
  keyof TypographyTokens[TypographyBreakpoint];

type HeadingSizeTemplate = `h${number}`;

export type TextSize = Exclude<TypographySize, HeadingSizeTemplate>;

export type HeadingSize = TypographySize & HeadingSizeTemplate;

export type TypographyWeight =
  keyof TypographyTokens[TypographyBreakpoint][TypographySize];

export type TypographyToken =
  TypographyTokens[TypographyBreakpoint][TypographySize][TypographyWeight];

export type TypographyProps = {
  /**
   * The color of the text contents
   *
   * @type {PaletteColor}
   * @default "gray-900"
   */
  color?: PaletteColor;
  /**
   * Whether or not the text contents should be *italic*
   *
   * @default false
   */
  italic?: boolean;
  /**
   * Whether or not the text contents should be underlined
   *
   * @default false
   */
  underline?: boolean;
  /**
   * Whether or not the text contents should be overlined
   *
   * @default false
   */
  overline?: boolean;
  /**
   * Whether or not the text contents should be crossed out
   *
   * @default false
   */
  lineThrough?: boolean;
  /**
   * The font weight of the text contents.
   *
   * Either `regular`, `medium` or `bold`.
   *
   * @type {TypographyWeight}
   * @default "regular"
   */
  weight?: TypographyWeight;
  /**
   * Whether or not the the text contents's styles should have the css `!important` flag.
   *
   * Useful in case you need it (e.g. for overriding Storybook's default styles).
   * **Do not overuse**
   *
   * @default false
   */
  important?: boolean;
  /**
   * Whether or not the text contents should be ellipsized in case of an overflow.
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
   * Either `m`, `s` or `xs`.
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
   * Either `h1`, `h2`, `h3` or `h4`.
   *
   * @type {HeadingSize}
   * @default "h1"
   */
  size?: HeadingSize;
};

export type AnyTypographyProps = TypographyProps & {
  size?: TypographySize;
};
