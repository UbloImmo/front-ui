import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { FC } from "react";
import type { Email, Enum, StyleProps } from "../../types";

/**
 * Common props shared by all Input components
 */
export type CommonInputProps = {
  /**
   * Whether to display an error state (red border)
   */
  error?: boolean;
  /**
   * Whether the input is disabled (grayed out and read-only)
   */
  disabled?: boolean;
  /**
   * The text to display when the input has no value
   */
  placeholder?: string;
};

export type DefaultCommonInputProps = Required<CommonInputProps>;

/**
 * Array that controls the available input types
 *
 * **Sensitive**
 */
export const inputTypes = ["text", "number", "password", "email"] as const;

/**
 * Custom Input types
 * Used to determine the shape of {@link InputValue},
 * {@link InputOnChangeFn} and {@link InputProps}
 */
export type InputType = Enum<typeof inputTypes>;

/**
 * The value returned and taken by an input component.
 * Varies based on the component's {@link InputType}.
 *
 * @template {InputType} TType - The input's type
 *
 * @see {@link InputOnChangeFn}, {@link InputProps}
 */
export type InputValue<TType extends InputType> = TType extends
  | "text"
  | "password"
  ? string
  : TType extends "number"
  ? number
  : TType extends "email"
  ? Email
  : never;

/**
 * An input components `onChange` callback function.
 * Its only argument is the input's new value,
 * which type depends on the input's {@link InputType}.
 *
 * @template {InputType} TType - The input's type
 * @param {Nullable<InputValue<TType>>} value - The input's updated value. Either {@link InputValue<TType>} or null
 */
export type InputOnChangeFn<TType extends InputType> = VoidFn<
  [Nullable<InputValue<TType>>]
>;

/**
 * @extends {CommonInputProps}
 * Genric props used by all Input components.
 * `value` & `onChange` type signatures depend on the input's {@link InputType}
 * @template {InputType} TType - The input's type
 *
 * @see {@link InputValue}, {@link InputOnChangeFn}
 */
export type InputProps<TType extends InputType> = CommonInputProps & {
  /**
   * The input's value, defaults to null
   */
  value?: Nullable<InputValue<TType>>;
  /**
   * The input's onChange callback
   */
  onChange?: Nullable<InputOnChangeFn<TType>>;
};

export type DefaultInputProps<TType extends InputType> = Required<
  InputProps<TType>
>;

export type CommonInputStyleProps = StyleProps<DefaultCommonInputProps>;

export type GenericInputProps<TType extends InputType> = {
  type: TType;
} & InputProps<TType>;

export type DefaultGenericInputProps<TType extends InputType> = Required<
  GenericInputProps<TType>
>;

export type TypedInputComponentMap = {
  [TType in InputType]: Nullable<FC<InputProps<TType>>>;
};

export type InputControlStyleProps = CommonInputStyleProps & {
  onClick?: VoidFn;
};
