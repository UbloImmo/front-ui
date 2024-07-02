import {
  deepValueOf,
  isBoolean,
  isFunction,
  isNullish,
  isObject,
  isUndefined,
  type DeepKeyOf,
  type Logger,
  type Nullish,
  type VoidFn,
} from "@ubloimmo/front-util";
import {
  FormEventHandler,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type Context,
  type ReactNode,
} from "react";

import {
  buildFormText,
  isFormDivider,
  isFormText,
  isSchemaFieldRequired,
  setObjectValue,
} from "./Form.utils";

import { useLogger, useMergedProps } from "@utils";

import type {
  FormProps,
  FormData,
  FormQueryFn,
  FormValidation,
  FormSchema,
  MutateFormDataFn,
  UseFormDataReturn,
  FormFieldProps,
  BuildFieldPropsFn,
  GetFieldValueFn,
  PropagateChangeFn,
  GetFieldErrorFn,
  FormOnSubmitFn,
  FormModifierProps,
  FormModifers,
  UseFormValidationReturn,
  UseFormSubmissionReturn,
  FormContext,
  UseFormEditStateReturn,
  BuiltFieldProps,
  IsFieldRequiredFn,
  FormContent,
  BuiltFormContent,
  ComputeFormValidationFn,
} from "./Form.types";
import type { InputOnChangeFn, InputType } from "../Input";

/**
 * Custom form hook
 * Returns an object containing form data, initial data, and methods for mutating and setting form data.
 *
 * @template TData - The type of the form data.
 * @param {FormProps<TData>} props - The props object containing the form data query, default values, and other form properties.
 * @param {Logger} logger - The logger used for logging warnings.
 * @returns {UseFormDataReturn<TData>} - An object containing the form data, initial data, and methods for mutating and setting form data.
 */
const useFormData = <TData extends object>(
  props: FormProps<TData>,
  logger: Logger
): UseFormDataReturn<TData> => {
  /**
   * Initial form data derived from the query or default values
   */
  const [initialData, setInitialData] = useState<FormData<TData>>(() => {
    if (isObject(props.defaultValues)) return props.defaultValues;
    if (isFunction(props.query) || isUndefined(props.query))
      return {} as FormData<TData>;
    if (isObject(props.query)) return props.query as FormData<TData>;
    return {} as FormData<TData>;
  });

  /**
   * Flag used for tracking initial data load
   */
  const [isLoading, setIsLoading] = useState(isFunction(props.query));

  /**
   * Internal form data
   */
  const [data, setData] = useState(initialData);

  /**
   * Loads form data from query into `data` and `initialData` states
   * white updating `isLoading` state
   */
  const loadFormData = useCallback(async () => {
    if (!isFunction<FormQueryFn<TData>>(props.query)) {
      if (isObject(props.query)) {
        setData(props.query);
        setInitialData(props.query);
      }
      return;
    }
    setIsLoading(true);
    try {
      const data: FormData<TData> = await props.query();
      setData(data);
      setInitialData(data);
    } catch (e) {
      logger.error(e);
      logger.warn("Failed to load form data");
    }
    setIsLoading(false);
  }, [props, logger]);

  /**
   * Effect used for loading initial form data if query is a function
   */
  useEffect(() => {
    loadFormData();
  }, [props.query, loadFormData]);

  /**
   * Mutates internal form data at the specified path with the specified value
   *
   * @template {DeepKeyOf<FormData<TData>>} TKey - The type of the key to mutate at
   *
   * @param {TKey} key - The key to mutate at
   * @param {DeepValueOf<FormData<TData>, TKey>} value - The value to set at the key
   * @returns {FormData<TData>} - The mutated form data
   */
  const mutateFormData = useCallback<MutateFormDataFn<TData>>(
    (key, value) => {
      if (isLoading) {
        logger.warn("Cannot mutate form data while loading");
        return data;
      }
      if (props.readonly || props.disabled) {
        logger.warn("Form is readonly or disabled");
        return data;
      }
      const mutated = setObjectValue(
        data,
        key as DeepKeyOf<FormData<TData>>,
        value ?? undefined
      );
      setData(mutated);
      return mutated;
    },
    [data, isLoading, props, logger]
  );

  return {
    data,
    initialData,
    setData,
    setInitialData,
    mutateFormData,
    isLoading,
  };
};

const defaultFormModifiers: FormModifers = {
  readonly: false,
  disabled: false,
  defaultEditing: false,
  validateOnBlur: false,
  validateOnChange: true,
  validateOnSubmit: true,
  debug: false,
};

/**
 * Custom form hook
 * Returns an object containing all form modifiers with their default values if missing.
 *
 * @param {FormProps<TData>} props - The props object containing form modifiers.
 * @returns {FormModifers} An object containing all form modifiers with their default values if missing.
 */
export const useFormModifiers = <TData extends object>(
  props: FormProps<TData>
): FormModifers => {
  /**
   * All form modifiers with their default values if missing
   */
  return useMergedProps<FormModifers, FormModifierProps>(
    defaultFormModifiers,
    props
  );
};

const defaultFormValidation: FormValidation = {
  errors: [],
  isValid: true,
};

/**
 * A custom form hook for form validation.
 *
 * @template {object} TData - The type of the form data.
 * @param {Nullish<FormSchema<TData>>} formSchema - The schema for the form.
 * @param {FormData<TData>} data - The data of the form.
 * @param {FormModifers} modifiers - The modifiers for the form.
 * @return {UseFormValidationReturn<TData>} - An object containing the form validation state, the schema, and functions to trigger and compute the validation.
 */
const useFormValidation = <TData extends object>(
  formSchema: Nullish<FormSchema<TData>>,
  data: FormData<TData>,
  modifiers: FormModifers
): UseFormValidationReturn<TData> => {
  const schema = useMemo(() => formSchema ?? null, [formSchema]);

  const computeFormValidation = useCallback<ComputeFormValidationFn>(() => {
    if (!schema) return defaultFormValidation;

    const validation = schema.safeParse(data);
    if (!validation.error?.errors || !validation.error.errors.length)
      return defaultFormValidation;
    return {
      errors: validation.error.errors.map(({ path, ...error }) => ({
        ...error,
        path: path.join("."),
      })),
      isValid: validation.success,
    };
  }, [schema, data]);

  /**
   * Form validation object
   * Contains `isValid` boolean indicating whole form validation state
   * and `errors` array containing all validation errors relative to each field
   */
  const [formValidation, triggerFormValidation] = useReducer(
    computeFormValidation,
    computeFormValidation()
  );

  useEffect(() => {
    if (modifiers.validateOnChange) {
      triggerFormValidation();
    }
  }, [data, modifiers, triggerFormValidation]);

  return {
    ...formValidation,
    schema,
    triggerFormValidation,
    computeFormValidation,
  };
};

/**
 * Custom form hook
 * Generates the built field props for each form field in the content array.
 *
 * @template {object} TData - The type of the form data.
 * @template {InputType} TType - The type of the input.
 * @param {UseFormDataReturn<TData>} formData - The form data.
 * @param {UseFormValidationReturn<TData>} validation - The form validation.
 * @param {FormModifers} modifiers - The form modifiers.
 * @param {FormContent<TData, TType>[]} content - The form content.
 * @return {BuiltFormContent<InputType>[]} - The built field props for each form field.
 */
const useFormFields = <TData extends object>(
  formData: UseFormDataReturn<TData>,
  validation: UseFormValidationReturn<TData>,
  modifiers: FormModifers,
  content?: FormContent<TData>[]
): BuiltFormContent<InputType>[] => {
  /**
   * @see {@link GetFieldValueFn}
   */
  const getFieldValue = useCallback<GetFieldValueFn<TData>>(
    (source) => {
      const value = deepValueOf(formData.data, source, true);
      return value ?? null;
    },
    [formData]
  );

  /**
   * @see {@link PropagateChangeFn}
   */
  const propagateChange = useCallback<PropagateChangeFn<TData>>(
    (source, onChange) => {
      return (value) => {
        formData.mutateFormData(source, value);
        if (isNullish(onChange)) return;
        onChange(value);
      };
    },
    [formData]
  );

  /**
   * @see {@link GetFieldErrorFn}
   */
  const getFieldErrorProps = useCallback<GetFieldErrorFn<TData>>(
    (source, baseError, baseErrorText) => {
      const validProps = {
        error: baseError ?? false,
        errorText: baseErrorText,
      };
      if (validation.isValid || !validation.errors.length) return validProps;
      const error = validation.errors.find((err) => err.path === source);
      if (!error) return validProps;
      return {
        error: baseError ?? true,
        errorText: baseErrorText ?? error.message,
      };
    },
    [validation]
  );

  /**
   * @see {@link IsFieldRequiredFn}
   */
  const isFieldRequired = useCallback<IsFieldRequiredFn<TData>>(
    (source, baseRequired) => {
      if (baseRequired) return baseRequired;
      if (!validation.schema) return false;
      return isSchemaFieldRequired(validation.schema, source);
    },
    [validation]
  );

  /**
   * @see {@link BuildFieldPropsFn}
   */
  const buildFieldProps = useCallback<BuildFieldPropsFn<TData>>(
    <TType extends InputType>(
      formField: FormFieldProps<TData>
    ): BuiltFieldProps<TType> => {
      const {
        source,
        onChange,
        disabled,
        errorText,
        error,
        required,
        layout,
        type,
        ...rest
      } = formField;

      return {
        ...rest,
        ...getFieldErrorProps(source, error, errorText),
        onChange: propagateChange<TType, typeof source>(
          source,
          onChange as InputOnChangeFn<TType>
        ),
        value: getFieldValue<DeepKeyOf<FormData<TData>>>(
          source as DeepKeyOf<FormData<TData>>
        ),
        type: type as TType,
        disabled: disabled || modifiers.disabled,
        required: isFieldRequired(source, required),
        layout,
      };
    },
    [
      getFieldErrorProps,
      propagateChange,
      getFieldValue,
      modifiers.disabled,
      isFieldRequired,
    ]
  );

  /**
   * The built field props
   * @see {@link BuiltFieldPropsFn}, {@link buildFieldProps}
   */
  return useMemo<BuiltFormContent<InputType>[]>(() => {
    if (!content || !content.length) return [];
    return content.map((content) => {
      if (isFormDivider(content)) return content;
      if (isFormText(content)) return buildFormText(content);
      return buildFieldProps(content);
    });
  }, [buildFieldProps, content]);
};

/**
 * Custom form hook that handles submission logic.
 *
 * @template {object} TData - The type of the form data.
 * @param {UseFormDataReturn<TData>} formData - The form data object.
 * @param {UseFormValidationReturn<TData>} validation - The form validation object.
 * @param {FormModifers} modifiers - The form modifiers object.
 * @param {UseFormEditStateReturn} editState - The form edit state object.
 * @param {Nullish<FormOnSubmitFn<TData>>} onSubmit - The form submission function.
 * @param {Logger} logger - The logger object.
 * @return {UseFormSubmissionReturn} An object containing the form submission logic.
 */
const useFormSubmission = <TData extends object>(
  formData: UseFormDataReturn<TData>,
  validation: UseFormValidationReturn<TData>,
  modifiers: FormModifers,
  editState: UseFormEditStateReturn,
  onSubmit: Nullish<FormOnSubmitFn<TData>>,
  logger: Logger
): UseFormSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Native form onSubmit callback that triggers data validation, submission and sync
   *
   * @see {@link UseFormSubmissionReturn["submitForm"]}
   */
  const submitForm = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (modifiers.disabled || modifiers.readonly || !editState.isEditing)
        return;

      if (!isFunction<FormOnSubmitFn<TData>>(onSubmit)) {
        logger.warn("No onSubmit function provided, aborted submission");
        return;
      }

      if (!validation.isValid) {
        logger.warn("Form is not valid, aborted submission");
        return;
      }

      if (modifiers.validateOnSubmit) {
        const { isValid } = validation.computeFormValidation();
        if (!isValid) {
          logger.warn("Form is not valid, aborted submission");
          return;
        }
      }

      let dataToSubmit: TData;
      if (isNullish(validation.schema)) {
        logger.warn("No schema provided, submitting without validation");
        dataToSubmit = formData.data as TData;
      } else {
        const parsed = await validation.schema.safeParseAsync(formData.data);
        if (!parsed.success || !parsed.data) {
          logger.warn("Unable to sanitize form data, aborted submission");
          return;
        }
        dataToSubmit = parsed.data as TData;
      }

      try {
        setIsSubmitting(true);
        const result = await onSubmit(dataToSubmit);
        if (isBoolean(result)) {
          logger.debug("TODO: handle submit failure visually");
          return;
        }
        // overwrite internal form data upon submission
        const updatedInitialData: FormData<TData> = isObject(result)
          ? result
          : (dataToSubmit as FormData<TData>);
        formData.setData(updatedInitialData);
        formData.setInitialData(updatedInitialData);
        editState.stopEditing();
        setIsSubmitting(false);
      } catch (e: unknown) {
        logger.error(e);
        setIsSubmitting(false);
      }
    },
    [modifiers, onSubmit, validation, logger, formData, editState]
  );

  /**
   * /**
   * Cancels form edition, switching it out of edit mode
   * and resetting the form's data to its initial state
   *
   * @remarks only runs if the form is in edit mode and not currently submitting
   *
   * @see {@link UseFormEditStateReturn[cancelEdition]}
   */
  const cancelEdition = useCallback<VoidFn>(() => {
    if (!editState.isEditing || isSubmitting) return;
    formData.setData(formData.initialData);
    editState.stopEditing();
  }, [editState, formData, isSubmitting]);

  return { submitForm, isSubmitting, cancelEdition };
};

/**
 * Custom form hook
 * Returns an object containing the state and functions to manage the editing state of a form.
 *
 * @param {FormModifers} modifiers - An object containing modifier functions for the form.
 * @return {UseFormEditStateReturn} An object with the following properties:
 *   - isEditing: A boolean indicating whether the form is currently in edit mode.
 *   - startEditing: A function that switches the form into edit mode.
 *   - stopEditing: A function that switches the form out of edit mode.
 */
const useFormEditState = (modifiers: FormModifers): UseFormEditStateReturn => {
  const [isEditing, setIsEditing] = useState(modifiers.defaultEditing || false);

  /**
   * Switches the form into edit mode
   */
  const startEditing = useCallback<VoidFn>(() => {
    if (modifiers.readonly) return;
    setIsEditing(true);
  }, [modifiers.readonly]);

  /**
   * Switches the form out of edit mode while preserving the form's data
   *
   * @remarks use {@link cancelEdition} to go back to view mode and reset the form's data to its initial state
   */
  const stopEditing = useCallback<VoidFn>(() => {
    setIsEditing(false);
  }, []);

  return {
    isEditing,
    startEditing,
    stopEditing,
  };
};

/**
 * Custom form hook that runs and links all sub-hooks to handle code form logic.
 * Returns a form context object that includes the form data, validation,
 * submission, edit state, and modifiers.
 *
 * @template TData - the type of the form data
 * @param {FormProps<TData>} props - the form props
 * @param {Logger} logger - the logger object
 * @return {FormContext<TData>} - the form context object
 *
 * @see {@link useFormData}, {@link useFormValidation}, {@link useFormEditState} {@link useFormModifiers}, {@link useFormFields}, {@link useFormSubmission}
 */
export const useForm = <TData extends object>(
  props: FormProps<TData>,
  logger: Logger
): FormContext<TData> => {
  const formData = useFormData<TData>(props, logger);
  const formModifiers = useFormModifiers(props);
  const formValidation = useFormValidation<TData>(
    props.schema,
    formData.data,
    formModifiers
  );
  const formEditState = useFormEditState(formModifiers);
  const content = useFormFields(
    formData,
    formValidation,
    formModifiers,
    props.content
  );
  const formSubmission = useFormSubmission(
    formData,
    formValidation,
    formModifiers,
    formEditState,
    props.onSubmit,
    logger
  );

  return {
    ...formData,
    ...formValidation,
    ...formSubmission,
    ...formEditState,
    ...formModifiers,
    content,
  };
};

const defaultFormContext: FormContext<object> = {
  ...defaultFormModifiers,
  data: {},
  initialData: {},
  setData: () => {},
  setInitialData: () => {},
  mutateFormData: () => ({}),
  isLoading: false,
  isSubmitting: false,
  isEditing: false,
  schema: null,
  submitForm: () => {},
  content: [],
  startEditing: () => {},
  stopEditing: () => {},
  cancelEdition: () => {},
  ...defaultFormValidation,
  triggerFormValidation: () => {},
  computeFormValidation: () => defaultFormValidation,
};

const InternalFormContext =
  createContext<FormContext<object>>(defaultFormContext);

/**
 * Retrieves the form context from its provider.
 *
 * @remarks For use only within internal form sub-components and custom fields.
 *
 * @template {object} TData - The type of the form data.
 * @returns {FormContext<TData>} The form context.
 */
export const useFormContext = <TData extends object>(): FormContext<TData> => {
  return useContext(
    InternalFormContext as unknown as Context<FormContext<TData>>
  ) as unknown as FormContext<TData>;
};

export const FormProvider = <TData extends object>(
  props: FormProps<TData> & { children: ReactNode }
): JSX.Element => {
  const logger = useLogger("Form Context");
  const context = useForm<TData>(props, logger);
  return (
    <InternalFormContext.Provider
      value={context as unknown as FormContext<object>}
    >
      {props.children}
    </InternalFormContext.Provider>
  );
};
