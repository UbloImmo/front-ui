import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { HTMLInputTypeAttribute } from "react";
import type { IconName } from "../../Icon";
import type { InputProps } from "../Input.types";

/**
 * Props used by the `PasswordInput` component.
 */
export type PasswordInputProps = InputProps<"password"> & {
  /**
   * Whether the password is visible at first.
   * Defaults to `false`.
   */
  visible?: boolean;
  /**
   * Whether to allow the user to change the password visibility
   * Defauls to `true`.
   */
  allowChangeVisibility?: boolean;
  /**
   * Optional callback function called when the password visibility changes
   */
  onVisibilityChange?: Nullable<VoidFn<[boolean]>>;
};

export type DefaultPasswordInputProps = Required<PasswordInputProps>;

export type PasswordVisibility = {
  inputType: HTMLInputTypeAttribute;
  controlIcon: IconName;
  controlTitle: string;
};
