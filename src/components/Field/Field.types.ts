import type { InputType, GenericInputProps } from "../Input";
import type { InputAssistiveTextProps } from "../InputAssistiveText";
import type { InputLabelProps } from "../InputLabel";
import type { StyleOverrideProps } from "@types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

export type FieldProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = GenericInputProps<TType, TGenericValue> &
  InputAssistiveTextProps &
  StyleOverrideProps &
  Omit<InputLabelProps, "children">;

export type FieldDefaultProps<TType extends InputType = InputType> = Required<
  FieldProps<TType>
>;
