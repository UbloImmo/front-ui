import type { Enum, PaletteColor, RequireAtLeastOne } from "@types";
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

export type ButtonProps = {
  /**
   * The type of the button. Either `button` or `submit`.
   * Useful for form submissions.
   *
   * @type {ButtonType}
   * @default "button"
   */
  type?: ButtonType;
  /**
   * The color of the button.
   *
   * Either `primary`, `red`, `black`, `white`, or `clear`.
   *
   * @type {ButtonColor}
   * @default "primary"
   */
  color?: ButtonColor;
  /**
   * Whether the button is secondary or not.
   *
   * @default false
   */
  secondary?: boolean;
  /**
   * Whether the button is disabled or not.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to display a loading spinner or not.
   *
   * @default false
   *
   * @todo _not implemented yet, needs global Loader component_
   */
  loading?: boolean;
  /**
   * The accessible title of the button.
   * Visible when hovering and read by screen readers.
   *
   * Defaults to the `label`'s value if not provided.
   */
  title?: string;
  /**
   * The ARIA role of the button.
   *
   * @type {AriaRole}
   * @default button
   */
  role?: AriaRole;
  /**
   * The callback function to be called when the button is clicked and not disabled.
   *
   * @type {VoidFn | null}
   * @default null
   */
  onClick?: Nullable<VoidFn>;
  /**
   * The label of the button.
   *
   * @type {string | null}
   * @default "Button"
   */
  label?: Nullable<string>;
  /**
   * The name of the icon to display in the button.
   *
   * @type {IconName | null}
   * @default undefined
   */
  icon?: Nullable<IconName>;
  /**
   * Where to display the button's icon in relation to its label.
   *
   * Has no effect if only `icon` and no `label` is provided.
   *
   * @default "left"
   */
  iconPlacement?: ButtonIconPlacement;
} & RequireAtLeastOne<{
  /**
   * The label of the button.
   *
   * @type {string | null}
   * @default "Button"
   */
  label: Nullable<string>;
  /**
   * The name of the icon to display in the button.
   *
   * @type {IconName | null}
   * @default undefined
   */
  icon: Nullable<IconName>;
}>;

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
