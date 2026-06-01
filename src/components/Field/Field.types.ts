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
  TGenericValue extends NullishPrimitives = NullishPrimitives,
> = GenericInputProps<TType, TGenericValue> &
  FieldAssistiveTextProps &
  Omit<StyleOverrideProps, "as"> &
  FieldLabelProps & {
    /**
     * Text to display as a suffix after the input on the same line
     *
     * @type {Nullable<string>}
     * @default null
     */
    suffix?: Nullable<string>;
    /**
     * URL to render the display value as a clickable hypertext link in view mode.
     * Accepts a static URL string, or a function receiving the field's current value
     * and returning a URL. Has no effect in edit mode.
     *
     * @type {Nullable<string | GenericFn<[unknown], Nullable<string>>>}
     * @default null
     * @deprecated Not yet scoped for general use. Pending proper API design before enabling across field types.
     */
    viewHref?: Nullable<string | GenericFn<[unknown], Nullable<string>>>;
  };

export type FieldDefaultProps<TType extends InputType = InputType> = Required<
  FieldProps<TType>
>;
