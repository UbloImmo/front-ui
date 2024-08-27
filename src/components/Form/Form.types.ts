import type { BadgeProps } from "@/components/Badge";
import type { DividerProps } from "@/components/Divider";
import type { FieldProps } from "@/components/Field";
import type { IconName } from "@/components/Icon";
import type {
  InputOnChangeFn,
  InputType,
  SpecificInputProps,
  InputValue,
} from "@/components/Input";
import type {
  ColorKey,
  StyleOverrideProps,
  StyleProps,
  TextProps,
} from "@types";
import type {
  DeepKeyOf,
  DeepKeyOfType,
  DeepNonNullish,
  DeepPartial,
  DeepRequired,
  DeepValueOf,
  GenericFn,
  MaybeAsyncFn,
  Nullable,
  Nullish,
  Optional,
  Replace,
  VoidFn,
} from "@ubloimmo/front-util";
import type { FormEventHandler, ReactNode } from "react";
import type { ZodIssue, ZodObject, ZodType, ZodTypeAny } from "zod";

// -------------------------------- GLOBALS ----------------------------------

/**
 * Abstract type used to index all possible keys in form data
 *
 * @template {object} TData - The type of the form data
 */
export type CompleteFormData<TData extends object> = DeepNonNullish<
  DeepRequired<TData>
>;

/**
 * The source of the form data.
 *
 * @template {object} TData - The type of the form data
 *
 * @remarks Data conversion is needed to access keys pointing to nested nullish objects.
 */
export type FormSource<TData extends object> = DeepKeyOf<
  CompleteFormData<TData>
>;

/**
 * The source of any form field according to form data
 *
 * @remarks A more refined version of {@link FormSource} tailored to form fields
 *
 * @template {object} TData - The type of the form data
 * @template {InputType} TType - The field's input type
 */
export type FormFieldSource<
  TData extends object,
  TType extends InputType
> = DeepKeyOfType<CompleteFormData<TData>, Nullish<InputValue<TType>>>;

/**
 * Raw partial initial form data
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link DeepPartial}
 */
export type FormData<TData extends object> = DeepPartial<TData>;

// --------------------------------- FIELD ----------------------------------

export type FormFieldLayoutHiddenFn = GenericFn<[], boolean>;

/**
 * Props added to form field that control its layout inside the form
 */
export type FormFieldLayoutProps = {
  /**
   * Layout of the field
   */
  layout?: {
    /**
     * Horizontal size of the field relative to the form's grid.
     * Maps to `grid-column-end: span ${size}`
     *
     * @default 1
     */
    size?: number;
    /**
     * Whether to render the field in display mode even while in edit mode
     *
     * @default false
     */
    readonly?: boolean;
    /**
     * Whether to hide the field in both display AND edit modes
     *
     * @type {boolean | FormFieldLayoutHiddenFn}
     * @default false
     */
    hidden?: boolean | FormFieldLayoutHiddenFn;
  };
};

/**
 * Determines a field's value type according to its `source`'s type
 *
 * @template {object} TData - The type of the form data
 * @template {FormFieldSource<TData, InputType>} TSource - The field's source
 */
type FormFieldType<
  TData extends object,
  TSource extends FormFieldSource<TData, InputType>
> = {
  [TType in InputType]: DeepValueOf<
    CompleteFormData<TData>,
    TSource
  > extends InputValue<TType>
    ? TType
    : never;
}[InputType];

type RequiredFieldKeys = "label" | "type";

type OmittedFieldKeys = RequiredFieldKeys | "value";

export type FormFieldPropsLax<TData extends object> = {
  [TType in InputType]: FormFieldSource<TData, TType> extends never
    ? never
    : {
        /**
         * Source to retrieve and change the field's data relative to the form's `query` and limited by its own `type` property
         *
         * @type {FormFieldSource<TData, TType>}
         * @required
         */
        source: FormFieldSource<TData, TType>;
      } & Pick<FieldProps<TType>, RequiredFieldKeys> &
        Omit<
          FieldProps<
            NoInfer<TType>,
            DeepValueOf<
              CompleteFormData<TData>,
              NoInfer<FormFieldSource<TData, TType>>
            >
          >,
          OmittedFieldKeys
        > &
        FormFieldLayoutProps;
}[InputType];

/**
 * A single form field as defined inside a form's `content`.
 * Used to render and link a single field inside a form
 *
 * Its `type` being restricted by its `source`,
 * it allows for specific additional props according to its type
 *
 * @template {object} TData - The type of the form data
 *
 * @remarks If no form type matches the field's `source`, it will be treated as any type
 *
 * @see {@link FormFieldProps}, {@link FormFieldPropsLax}
 */
export type FormFieldProps<TData extends object> = {
  [TSource in FormFieldSource<TData, InputType>]: FormFieldType<
    TData,
    TSource
  > extends infer TType
    ? TType extends InputType
      ? {
          /**
           * Source to retrieve and change the field's data relative to the form's `query` and limited by its own `type` property
           *
           * @type {FormFieldSource<TData, TType>}
           * @required
           */
          source: TSource;
        } & Pick<FieldProps<TType>, RequiredFieldKeys> &
          Omit<
            FieldProps<
              NoInfer<TType>,
              DeepValueOf<CompleteFormData<TData>, TSource>
            >,
            OmittedFieldKeys
          > &
          FormFieldLayoutProps
      : FormFieldPropsLax<TData>
    : never;
}[FormFieldSource<TData, InputType>];

/**
 * Individual built {@link FieldProps} and {@link FormFieldLayoutProps}. Gets passed to the `FormField` component.
 *
 * @remarks Built using {@link BuildFieldPropsFn}
 *
 * @template {InputType} TType - The field's input type
 *
 */
export type BuiltFieldProps<TType extends InputType> = FieldProps<TType> &
  FormFieldLayoutProps;

// ------------------------------- DIVIDER ----------------------------------

export type FormDividerProps =
  | "divider"
  | Omit<DividerProps, keyof StyleOverrideProps>;

// -------------------------------- INFOS -----------------------------------

export type FormTextProps = Omit<
  TextProps,
  "children" | keyof StyleOverrideProps
> & {
  content: ReactNode;
  kind: "text";
};

export type BuiltFormTextProps = Omit<TextProps, keyof StyleOverrideProps> & {
  kind: "text";
};

// ------------------------------- CONTENT ----------------------------------

/**
 * A single form field or divider to display inside the form
 *
 * @template {object} TData - The type of the {@link FormData}
 *
 * @see {@link FormFieldProps}, {@link FormDividerProps}
 */
export type FormContent<TData extends object> =
  | FormFieldProps<TData>
  | FormDividerProps
  | FormTextProps;

/**
 * Either a single {@link BuiltFieldProps} object or {@link FormDividerProps}
 *
 * @template {InputType} TType - The field's input type
 */
export type BuiltFormContent<TType extends InputType> =
  | BuiltFieldProps<TType>
  | FormDividerProps
  | BuiltFormTextProps;

// -------------------------------- SCHEMA ----------------------------------

/**
 * Schema used to validate form data and sanitize submitted output
 *
 * @template {object} TData - The type of the form data
 */
export type FormSchema<TData extends object> =
  | ZodType<TData>
  | ZodObject<TData & Record<string, ZodTypeAny>>;

// ----------------------------- DATA FETCHING ------------------------------

/**
 * Query function used to retrieve the form's initial data or a subset of it
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormData}
 */
export type FormQueryFn<TData extends object> = MaybeAsyncFn<
  [],
  FormData<TData>
>;

/**
 * Either raw partial initial form data or a function that returns it
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormData}, {@link FormQueryFn}
 */
export type FormQueryOrData<TData extends object> =
  | FormData<TData>
  | FormQueryFn<TData>;

// ------------------------------ CALLBACKS --------------------------------

export type FormOnChangeFn<TData extends object> = VoidFn<[FormData<TData>]>;

/**
 *  Form `onSubmit` callback
 *
 * @param {TData} data - Validated form data for submission
 * @returns {boolean | FormData<TData>} Either a boolean indicating if form submission was successful or updated form data to replace the current internal form data
 */
export type FormOnSubmitFn<TData extends object> = MaybeAsyncFn<
  [TData],
  boolean | FormData<TData> | void
>;

// --------------------------------- PROPS ----------------------------------

/**
 * Form props relatived to displaying its header content
 */
export type FormHeaderProps = {
  /**
   * The title of the form
   *
   * @required
   * @default "Form"
   */
  title: string;
  /**
   * Optional {@link BadgeProps}, renders a badge next to the title if provided
   *
   * @type {Nullable<BadgeProps>}
   * @default null
   */
  badge?: Nullable<BadgeProps>;
  /**
   * Optional icon to display next to the title
   *
   * @type {Nullable<IconName>}
   * @default null
   */
  icon?: Nullable<IconName>;
};

/**
 * Form props related to its content
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormContent}
 */
export type FormContentProps<TData extends object> = {
  /**
   * Array of form fields or dividers to display with the fetched / initial data
   *
   * @type {FormContent<TData>[]}
   * @default []
   */
  content?: FormContent<TData>[];
};

/**
 * Form props related to its data, submission and display
 *
 * @template {object} TData - The type of the form data
 */
export type FormDataProps<TData extends object> = {
  /**
   * Initial form data or a function that returns it
   *
   * @type {FormQueryOrData<TData>}
   * @default {}
   */
  query?: FormQueryOrData<TData>;
  /**
   * Default values for the form
   * Used when `query` is not provided or when waiting for its result
   *
   * @type {FormData<TData>}
   * @default {}
   */
  defaultValues?: FormData<NoInfer<TData>>;
  /**
   * Schema used to validate form data and sanitize submitted output
   *
   * @type {Nullable<FormSchema<TData>>}
   * @default null
   */
  schema?: Nullable<FormSchema<NoInfer<TData>>>;
  /**
   * Callback called when form data changes
   *
   * @type {Nullable<FormOnChangeFn<NoInfer<TData>>>}
   * @default null
   */
  onChange?: Nullable<FormOnChangeFn<NoInfer<TData>>>;
  /**
   * Callback called when form is submitted
   */
  onSubmit?: Nullable<FormOnSubmitFn<TData>>;
};

/**
 * Form props related to controlling its behaviour
 */
export type FormModifierProps = {
  /**
   * Whether to disable every field and button in the form, as well as its submission
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to make the form read-only, i.e. prevent any changes and not allow it to enter `edit` mode
   *
   * @remarks: `readonly` forms display a badge indicating that the form is read-only instead of the default `edit` toggle button
   *
   * @type {boolean}
   * @default false
   */
  readonly?: boolean;
  /**
   * Whether to enter `edit` mode by default, when first rendering the form
   *
   * @type {boolean}
   * @default false
   */
  defaultEditing?: boolean;
  /**
   * Whether to validate form data on each change
   *
   * @default true
   */
  validateOnChange?: boolean;
  /**
   * Whether to validate form data on each submit
   *
   * @default true
   */
  validateOnSubmit?: boolean;
  /**
   * Whether to validate form data on each field's blur
   * @todo rework field to get onBlur callback
   *
   * @remarks Not yet implemented
   *
   * @default false
   */
  validateOnBlur?: boolean;
  /**
   * Whether to show debug information
   *
   * @default false
   */
  debug?: boolean;
};

/**
 * Form props directly passed to its underlying context
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormDataProps}, {@link FormModifierProps
 */
export type FormContextProps<TData extends object> = FormDataProps<TData> &
  FormContentProps<NoInfer<TData>> &
  FormModifierProps;

/**
 * Properties for the `Form` component
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormHeaderProps}, {@link FormContextProps}
 */
export type FormProps<TData extends object> = FormHeaderProps &
  FormContextProps<TData>;

/**
 * Default props for the `Form` component
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormProps}
 */
export type FormDefaultProps<TData extends object> = Required<FormProps<TData>>;

// ------------------------------ VALIDATION --------------------------------

/**
 * Transformed {@link ZodIssue} with its path array concatenated as `.` separated string,
 * used for comparison with a {@link FormFieldProps}'s `source`.
 */
export type FormError = Replace<ZodIssue, "path", { path: string }>;

/**
 * Object containing the {@link FormError}s and a `isValid` boolean,
 * generated from a {@link FormSchema} for each change in the {@link FormData}
 *
 * @remarks if {@link FormSchema} is missing, `isValid` is always `true`
 */
export type FormValidation = {
  /**
   * An array of {@link FormError}s
   *
   * @remarks if {@link FormSchema} is missing, `errors` is an empty array
   *
   * @default []
   */
  errors: FormError[];
  /**
   * A boolean representing if the {@link FormData} is valid
   *
   * @remarks if {@link FormSchema} is missing, `isValid` is always `true`
   *
   * @default true
   */
  isValid: boolean;
};

// ------------------------------ FUNCTIONS --------------------------------

/**
 * Mutates form data at a single field's path.
 *
 * @template {object} TData - The type of the {@link FormData}
 * @template {FormSource<TData>} TSource - The key of the {@link FormField}
 *
 * @param {TSource} source - The source of the {@link FormField}
 * @param {Nullable<DeepValueOf<CompleteFormData<TData>, TSource>>} value - The new value of the form field to be assigned at the specified path
 *
 * @returns {FormData<TData>} The mutated {@link FormData}
 */
export type MutateFormDataFn<TData extends object> = <
  TSource extends FormSource<TData>
>(
  source: TSource,
  value: Nullable<DeepValueOf<CompleteFormData<TData>, TSource>>
) => FormData<TData>;

/**
 * Builds a {@link FieldProps} object from a {@link FormFieldProps} object,
 * links its `value`, `onChange`, `disabled`, `required`, `error` and `errorText` properties with the form data & schema.
 *
 * @template {object} TData - The type of the {@link FormData}
 * @template {TType} TType - The type of the {@link FormField}
 *
 * @param {FormFieldProps<TData, TType>} formField - The {@link FormFieldProps}
 *
 * @returns {FieldProps<TType>} The built and linked {@link FieldProps}
 */
export type BuildFieldPropsFn<TData extends object> = <TType extends InputType>(
  formField: FormFieldProps<TData>
) => BuiltFieldProps<TType>;

/**
 * Retrieves the value of a {@link FormField} from the internal {@link FormData} using its `source`.
 *
 * @template {object} TData - The type of the {@link FormData}
 * @template {DeepKeyOf<FormData<TData>>} TSource - The key of the {@link FormField}
 *
 * @param {TSource} source - The source of the {@link FormField}
 *
 * @returns {Nullable<DeepValueOf<FormData<TData>, TSource>>} The value of the {@link FieldProps} at the specified path
 */
export type GetFieldValueFn<TData extends object> = <
  TSource extends DeepKeyOf<FormData<TData>>
>(
  source: TSource
) => Nullable<DeepValueOf<FormData<TData>, TSource>>;

/**
 * Sets the value of a {@link FormField} in the internal {@link FormData} using its `source`
 * and runs a field's `onChange` callback if provided.
 *
 * @template {object} TData - The type of the {@link FormData}
 * @template {InputType} TType - The type of the {@link FormFieldProps}'s `type` property
 * @template {FormSource<TData>} TSource - The type of the {@link FormFieldProps}'s `source` property
 *
 * @param {TSource} source - The source of the {@link FormFieldProps}
 * @param {Nullable<InputOnChangeFn<TType>>} [onChange] - The optional {@link FormFieldProps}'s `onChange` callback
 *
 * @returns {VoidFn<[Nullable<InputValue<TType> & DeepValueOf<CompleteFormData<TData>, TSource>>]>} A function satisfying {@link FieldProps["onChange"]}'s signature that gets passed to the build {@link FieldProps}
 */
export type PropagateChangeFn<TData extends object> = <
  TType extends InputType,
  TSource extends FormSource<TData>
>(
  source: TSource,
  onChange?: Nullable<InputOnChangeFn<TType>>
) => VoidFn<
  [Nullable<InputValue<TType> & DeepValueOf<CompleteFormData<TData>, TSource>>]
>;

/**
 * Retrieves a {@link FieldProps}'s `error` boolean and `errorText` string properties
 * from the internal {@link FormData} and {@link FormSchema} using its `source`.
 *
 * @template {object} TData - The type of the {@link FormData}
 * @template {FormSource<TData>} TSource - The type of the {@link FormFieldProps}'s `source` property
 *
 * @param {TSource} source - The source of the {@link FormFieldProps}
 * @param {Optional<boolean>} [baseError] - The optional base `error` boolean
 * @param {Nullable<string>} [baseErrorText] - The optional base `errorText` string
 *
 * @returns {Pick<FieldProps<InputType>, "error" | "errorText">} The {@link FieldProps}'s `error` and `errorText` properties
 */
export type GetFieldErrorFn<TData extends object> = <
  TSource extends FormSource<TData>
>(
  source: TSource,
  baseError?: Optional<boolean>,
  baseErrorText?: Nullable<string>
) => Pick<FieldProps<InputType>, "error" | "errorText">;

/**
 * Checks a {@link FormFieldProps}'s `source` against the internal {@link FormSchema} to determine if it is required
 *
 * @remarks If the field is manually marked as required, it will always return `true`
 *
 * @template {object} TData - The type of the {@link FormData}
 *
 * @param {FormSource<TData>} source - The source of the {@link FormFieldProps}
 * @param {Optional<boolean>} [baseRequired] - The optional base `required` boolean
 *
 * @returns {boolean} Whether the field is required
 */
export type IsFieldRequiredFn<TData extends object> = (
  source: FormSource<TData>,
  baseRequired?: boolean
) => boolean;

/**
 * Computes the form's validation state using its shema and internal {@link FormData}
 *
 * @returns {FormValidation} The form's validation state
 */
export type ComputeFormValidationFn = GenericFn<[], FormValidation>;

// -------------------------- DISPLAY TRANSFORMS -----------------------------

/**
 * Transforms a field's value to its display value counterpart
 *
 * @remarks Most of the time, this is a native `String()` function
 *
 * @template {InputType} TType - The type of the {@link FormFieldProps}'s `type` property
 * @template TTransformedValue - The type of the transformed value, defaults to a string
 *
 * @param {InputValue<TType>} value - The value to be transformed
 * @param {SpecificInputProps<TType>} inputProps - The complete input props object
 * @returns {TTransformedValue} The transformed value
 */
export type FormDisplayValueFormatterFn<
  TType extends InputType,
  TTransformedValue extends ReactNode = string
> = GenericFn<
  [InputValue<TType>, SpecificInputProps<TType>],
  TTransformedValue
>;

/**
 * Mapping of {@link InputType} to {@link FormDisplayValueFormatterFn}
 */
export type FormDisplayValueFormatterMap<
  TTransformedValue extends ReactNode = string
> = {
  [TType in InputType]: FormDisplayValueFormatterFn<TType, TTransformedValue>;
};

// ------------------------------- RETURNS ---------------------------------

/**
 * Object containing all {@link FormModifierProps} with missing values replaced with their respective defaults
 */
export type FormModifers = Required<FormModifierProps>;

/**
 * Return type of the `useFormData` custom hook
 *
 * @template {object} TData - The type of the form data
 */
export type UseFormDataReturn<TData extends object> = {
  /**
   * The form's internal data
   * Gets updated with during form completion and gets passed to the `onSubmit` callback during form submission.
   *
   * @type {FormData<TData>}
   * @default {}
   */
  data: FormData<TData>;
  /**
   * The form's initial data
   * Gets updated during first query fetch and upon each sucessful form completion
   */
  initialData: FormData<TData>;
  /**
   * Sets the form's internal data
   *
   * @type {VoidFn<[FormData<TData>]>}
   */
  setData: VoidFn<[FormData<TData>]>;
  /**
   * Sets the form's initial data
   *
   * @type {VoidFn<[FormData<TData>]>}
   */
  setInitialData: VoidFn<[FormData<TData>]>;
  /**
   * Mutates the form's internal data at a specific `source`
   *
   * @type {MutateFormDataFn<TData>}
   */
  mutateFormData: MutateFormDataFn<TData>;
  /**
   * Flag indicating whether the form is still loading its initial data
   *
   * @type {boolean}
   */
  isLoading: boolean;
};

/**
 * Return type of the `useFormValidation` custom hook
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link FormValidation}
 */
export type UseFormValidationReturn<TData extends object> = FormValidation & {
  /**
   * The provided {@link FormSchema} or null if missing
   *
   * @type {Nullable<FormSchema<TData>>}
   * @default null
   */
  schema: Nullable<FormSchema<TData>>;
  /**
   * computes the form's validation without updated the form's internal vaidation state
   *
   * @type {ComputeFormValidationFn}
   */
  computeFormValidation: ComputeFormValidationFn;
  /**
   * Triggers the form's validation manually with the current form data
   *
   * @type {VoidFn}
   */
  triggerFormValidation: VoidFn;
};

/**
 * Return type of the `useFormSubmission` custom hook that handles form submission
 * Contains `submitForm` callback and `isSubmitting` boolean
 */
export type UseFormSubmissionReturn = {
  /**
   * The form's `onSubmit` callback
   *
   * @type {FormEventHandler<HTMLFormElement>}
   */
  submitForm: FormEventHandler<HTMLFormElement>;
  /**
   * Flag indicating if the form is currently submitting
   *
   * @type {boolean}
   * @default false
   */
  isSubmitting: boolean;
  /**
   * Cancels form edition, switching it out of edit mode
   * and resetting the form's data to its initial state
   *
   * @remarks only runs if the form is in edit mode and not currently submitting
   *
   * @type {VoidFn}
   */
  cancelEdition: VoidFn;
};

/**
 * Return type of the `useFormEditState` custom hook
 * Contains `isEditing` boolean and `startEditing` and `stopEditing` callbacks
 */
export type UseFormEditStateReturn = {
  /**
   * Flag indicating if the form is currently in edit mode
   *
   * @type {boolean}
   * @default false
   */
  isEditing: boolean;
  /**
   * Switches the form into edit mode
   *
   * @type {VoidFn}
   */
  startEditing: VoidFn;
  /**
   * Switches the form out of edit mode
   *   *
   * @type {VoidFn}
   */
  stopEditing: VoidFn;
};

// ------------------------------- CONTEXT ---------------------------------

/**
 * Return type of the `useForm` custom hook,
 * value of the the context stored in the `FormProvider` and accessed by calling `useFormContext`.
 *
 * @template {object} TData - The type of the form data
 *
 * @see {@link UseFormDataReturn}, {@link UseFormValidationReturn}, {@link UseFormSubmissionReturn}, {@link FormModifers}, {@link UseFormEditStateReturn}
 *
 */
export type FormContext<TData extends object> = UseFormDataReturn<TData> &
  UseFormValidationReturn<TData> &
  UseFormSubmissionReturn &
  FormModifers &
  UseFormEditStateReturn & {
    /**
     * An array of {@link BuiltFieldProps},
     * used to render the form's fields
     *
     * @type {BuiltFieldProps<InputType>[]}
     * @default []
     */
    content: BuiltFormContent<InputType>[];
  };

// ------------------------------- STYLE -----------------------------------

export type FormContainerStyleProps = StyleProps<
  Pick<FormModifers, "readonly" | "disabled"> &
    Pick<UseFormEditStateReturn, "isEditing">
>;

export type FormEditButtonStyleProps = StyleProps<{ hidden?: boolean }>;

export type FormEditBannerStyleProps = StyleProps<
  Pick<UseFormEditStateReturn, "isEditing"> &
    Pick<UseFormSubmissionReturn, "isSubmitting"> &
    Pick<UseFormDataReturn<object>, "isLoading">
>;

export type FormDebugPreStyleProps = StyleProps<{ color: ColorKey }>;
