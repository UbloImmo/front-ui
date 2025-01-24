import type { InputType, GenericInputProps } from "../Input";
import type { InputAssistiveTextProps } from "../InputAssistiveText";
import type { InputLabelProps } from "../InputLabel";
import type { StyleOverrideProps } from "@/types/global/styles.types";
import type {
  GenericFn,
  Nullable,
  NullishPrimitives,
  Replace,
} from "@ubloimmo/front-util";

export type FieldLabelProps = Omit<InputLabelProps, "children" | "htmlFor">;

export type FieldAssistiveTextFn = GenericFn<[unknown], Nullable<string>>;

export type FieldAssistiveTextProps = Replace<
  InputAssistiveTextProps,
  "assistiveText",
  {
    /**
     * The assistive text to be displayed
     * Either a nullable string or a function that returns a string or null
     *
     * @type {Nullable<string | FieldAssistiveTextFn>}
     * @default null
     */
    assistiveText?: Nullable<string | FieldAssistiveTextFn>;
  }
>;

export type FieldProps<
  TType extends InputType,
  TGenericValue extends NullishPrimitives = NullishPrimitives
> = GenericInputProps<TType, TGenericValue> &
  FieldAssistiveTextProps &
  Omit<StyleOverrideProps, "as"> &
  FieldLabelProps;

export type FieldDefaultProps<TType extends InputType = InputType> = Required<
  FieldProps<TType>
>;
