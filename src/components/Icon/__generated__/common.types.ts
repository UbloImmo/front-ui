import type { CssLength, PaletteColor } from "@types";

export type CommonIconProps = {
  color?: PaletteColor;
  size?: CssLength;
};

export type CommonIconDefaultProps = Required<CommonIconProps>;

export const commonIconDefaulProps: CommonIconDefaultProps = {
  color: "primary-base",
  size: "1rem",
} as const;
