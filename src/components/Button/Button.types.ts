import type { Enum, PaletteColor } from "@types";
import type { IconName } from "..";
import type { VoidFn } from "@ubloimmo/front-util";
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

type LabelOnlyButtonProps = {
  label: string;
  icon?: null;
  iconPlacement?: null;
};

type LabelAndIconButtonProps = {
  label: string;
  icon: IconName;
  iconPlacement?: ButtonIconPlacement;
};

type IconOnlyButtonProps = {
  label?: null;
  icon: IconName;
  iconPlacement?: ButtonIconPlacement;
};

type SpecificButtonProps =
  | LabelOnlyButtonProps
  | LabelAndIconButtonProps
  | IconOnlyButtonProps;

export type ButtonProps = CommonButtonProps & SpecificButtonProps;

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
