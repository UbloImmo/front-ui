import { ColorPalette, Enum } from ".";

const textVariants = ["body", "caption", "small"] as const;

export type TextVariant = Enum<typeof textVariants>;

export type TypographyColor = {
  [ColorKey in keyof ColorPalette & string]: {
    [ShadeKey in keyof ColorPalette[ColorKey] &
      string]: `${ColorKey}-${ShadeKey}`;
  }[keyof ColorPalette[ColorKey] & string];
}[keyof ColorPalette & string];
