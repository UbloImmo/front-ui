import type { InputType, GenericInputProps } from "../Input";
import type { InputAssistiveTextProps } from "../InputAssistiveText";
import type { InputLabelProps } from "../InputLabel";
import type { StyleOverrideProps } from "@types";

export type FieldProps<TType extends InputType> = GenericInputProps<TType> &
  InputAssistiveTextProps &
  StyleOverrideProps &
  Omit<InputLabelProps, "children">;

export type FieldDefaultProps<TType extends InputType = InputType> = Required<
  FieldProps<TType>
>;
