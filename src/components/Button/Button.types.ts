import type { Enum, PaletteColor } from "@types";
import type { IconName } from "..";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { AriaRole } from "react";

export const buttonColors = [
  "primary",
  "red",
  "black",
  "white",
  "clear",
] as const;

export type ButtonColor = Enum<typeof buttonColors>;

const buttonTypes = ["button", "submit"] as const;

export type ButtonType = Enum<typeof buttonTypes>;

const buttonIconPlacements = ["left", "right"] as const;

export type ButtonIconPlacement = Enum<typeof buttonIconPlacements>;

type CommonButtonProps = {
  type?: ButtonType;
  color?: ButtonColor;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  role?: AriaRole;
  onClick?: VoidFn;
};

export type ButtonProps = CommonButtonProps & {
  label?: Nullable<string>;
  icon?: Nullable<IconName>;
  iconPlacement?: ButtonIconPlacement;
};

export type DefaultButtonProps = Required<ButtonProps>;

export type ButtonElementColor = PaletteColor | "transparent";

export type ButtonStyleColors = {
  background?: ButtonElementColor;
  border?: ButtonElementColor;
  content: ButtonElementColor;
  icon?: ButtonElementColor;
};

type ButtonStyleDeclaration = {
  default: ButtonStyleColors;
  hover: Partial<ButtonStyleColors>;
};

export type ButtonStyle = {
  primary: ButtonStyleDeclaration;
  secondary: ButtonStyleDeclaration;
};
