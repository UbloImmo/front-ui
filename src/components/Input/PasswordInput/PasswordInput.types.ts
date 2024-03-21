import type { VoidFn } from "@ubloimmo/front-util";
import type { IconName } from "../../Icon";
import type { InputProps } from "../Input.types";
import type { HTMLInputTypeAttribute } from "react";

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
   * Whether to allow the user to change the visibility
   */
  allowChangeVisibility?: boolean;
  /**
   * Optional callback function called when the password visibility changes
   */
  onVisibilityChange?: VoidFn<[boolean]>;
};

export type DefaultPasswordInputProps = Required<PasswordInputProps>;

export type PasswordVisibility = {
  inputType: HTMLInputTypeAttribute;
  controlIcon: IconName;
  controlTitle: string;
};
