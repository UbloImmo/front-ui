import { arrayMove } from "@dnd-kit/sortable";
import {
  type DeepKeyOf,
  type DeepKeyOfType,
  type DeepValueOf,
  deepValueOf,
  isBoolean,
  isFunction,
  isNull,
  isNullish,
  isObject,
  isString,
  isUndefined,
  type Logger,
  type Nullable,
  type Nullish,
  type NullishPrimitives,
  objectEntries,
  type VoidFn,
} from "@ubloimmo/front-util";
import { isEqual, merge } from "lodash";
import {
  type Context,
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { useDialogManager } from "../Dialog";
import {
  buildFormText,
  builtFormTableId,
  formErrorTranslation,
  isFormCustomContent,
  isFormCustomField,
  isFormDivider,
  isFormFeatureSwitch,
  isFormField,
  isFormTable,
  isFormText,
  isSchemaFieldRequired,
  setObjectValue,
} from "./Form.utils";

import {
  cssLengthUsage,
  isEmptyString,
  useLogger,
  useMergedProps,
  useUikitTranslation,
} from "@utils";

import type { CheckboxStatus } from "../Checkbox";
import type { FieldLabelProps } from "../Field";
import type { InputOnChangeFn, InputType } from "../Input";
import type {
  AppendTableRowFn,
  BatchMutateFormDataFn,
  BuildCustomFieldPropsFn,
  BuildFieldPropsFn,
  BuildFormFeatureSwitchFn,
  BuildFormFieldLayoutFn,
  BuildFormTablePropsFn,
  BuiltFieldProps,
  BuiltFormContent,
  BuiltFormCustomFieldProps,
  BuiltFormFeatureSwitchProps,
  BuiltFormFieldLayoutProps,
  BuiltFormTableModifiers,
  BuiltFormTableProps,
  BuiltFormTableRow,
  CompleteFormData,
  ComputeFormValidationFn,
  CustomFormInputProps,
  DefaultFormLayoutProps,
  DeleteTableRowFn,
  FormContent,
  FormContext,
  FormCustomFieldProps,
  FormData,
  FormDataProps,
  FormDefaultProps,
  FormFeatureSwitchProps,
  FormFieldLayout,
  FormFieldLayoutHiddenFn,
  FormFieldProps,
  FormLayoutProps,
  FormModifers,
  FormModifierProps,
  FormOnSubmitErrorFn,
  FormOnSubmitFn,
  FormProps,
  FormQueryFn,
  FormSchema,
  FormSource,
  FormTableProps,
  FormTableTryDeletingRowParams,
  FormValidation,
  GetFieldErrorFn,
  GetFieldValueFn,
  IsFieldRequiredFn,
  MutateFormDataFn,
  PropagateChangeFn,
  SetRowSelectionFn,
  SetTableSelectionFn,
  SwapTableRowsFn,
  UseFormDataReturn,
  UseFormEditStateReturn,
  UseFormLayoutReturn,
  UseFormSubmissionReturn,
  UseFormValidationReturn,
} from "./Form.types";
import type { GridEndPosition } from "@/layouts/GridItem";

const FORM_DEBUG_FLAG = "FORM_DEBUG_ENABLED" as const;

/**
 * Custom form hook
 * Returns an object containing form data, initial data, and methods for mutating and setting form data.
 *
 * @template TData - The type of the form data.
 * @param {FormProps<TData>} props - The props object containing the form data query, default values, and other form properties.
 * @param {Logger} logger - The logger used for logging warnings.
 * @param {FormModifers} modifiers - The form modifiers.
 * @returns {UseFormDataReturn<TData>} - An object containing the form data, initial data, and methods for mutating and setting form data.
 */
const useFormData = <TData extends object>(
  props: FormDataProps<TData>,
  logger: Logger,
  modifiers: FormModifers
): UseFormDataReturn<TData> => {
  /**
   * Initial form data derived from the query or default values
   */
  const [initialData, setInitialData] = useState<FormData<TData>>(() => {
    if (isObject(props.defaultValues)) return { ...props.defaultValues };
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
  const [data, setData] = useState<FormData<TData>>(initialData);

  /**
   * Loads form data from query into `data` and `initialData` states
   * white updating `isLoading` state
   *
   * @param {boolean} [mergeWithCurrent] - Whether to merge the new data with the current (e.g. previous or default) data.
   */
  const loadFormData = useCallback(
    async (mergeWithCurrent?: boolean) => {
      if (!isFunction<FormQueryFn<TData>>(props.query)) {
        if (isObject(props.query)) {
          const newData = mergeWithCurrent
            ? merge({ ...initialData }, { ...props.query })
            : { ...props.query };
          setData(newData);
          setInitialData(newData);
        }
        return;
      }
      setIsLoading(true);
      try {
        const data: FormData<TData> = await props.query();
        const newData = mergeWithCurrent
          ? merge({ ...initialData }, data)
          : data;
        setData(newData);
        setInitialData(newData);
      } catch (e) {
        logger.error(e);
        logger.warn("Failed to load form data");
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.query]
  );

  const reloadKey = useRef(props.reloadKey ?? null);

  /**
   * Effect used for loading initial form data if query is a function
   */
  useEffect(() => {
    if (
      !isUndefined(props.reloadKey) &&
      props.reloadKey !== reloadKey.current
    ) {
      reloadKey.current = props.reloadKey;
      loadFormData(false);
    } else {
      loadFormData(modifiers.shouldMergeQueryData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.query, loadFormData, props.reloadKey]);

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
      if (modifiers.readonly || modifiers.disabled) {
        logger.warn("Form is readonly or disabled");
        return data;
      }
      const mutated = setObjectValue(
        data,
        key as DeepKeyOf<FormData<TData>>,
        value as DeepValueOf<FormData<TData>, DeepKeyOf<FormData<TData>>>
      );
      setData(mutated);
      return mutated;
    },
    [data, isLoading, logger, modifiers]
  );

  /**
   * Mutates form data at specified paths with respective values, all in one setState call.
   *
   * @param {BatchMutateFormDataFn<TData>} mutation - Object containing sources for keys and their data as values.
   * @returns {FormData<TData>} - The mutated form data
   */
  const batchMutateFormData = useCallback<BatchMutateFormDataFn<TData>>(
    (mutation) => {
      if (isLoading) {
        logger.warn(
          "Cannot mutate form data while loading",
          "batchMutateFormData"
        );
        return data;
      }

      if (modifiers.readonly || modifiers.disabled) {
        logger.warn("Form is readonly or disabled", "batchMutateFormData");
        return data;
      }
      const entries = objectEntries(mutation);
      if (!entries.length) {
        logger.warn("Empty mutation payload", "batchMutateFormData");
      }
      let mutated = { ...data };
      for (const [source, value] of entries) {
        mutated = setObjectValue(
          data as CompleteFormData<TData>,
          source,
          value as DeepValueOf<CompleteFormData<TData>, typeof source>
        ) as typeof mutated;
      }
      setData(mutated);
      return mutated;
    },
    [data, isLoading, logger, modifiers]
  );

  return {
    data,
    initialData,
    setData,
    setInitialData,
    mutateFormData,
    batchMutateFormData,
    isLoading,
    setIsLoading,
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
  shouldMergeQueryData: true,
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
  const mergedMods = useMergedProps<FormModifers, FormModifierProps>(
    defaultFormModifiers,
    props
  );

  const debug = useMemo(() => {
    if (mergedMods.debug) return true;
    if (FORM_DEBUG_FLAG in window && window[FORM_DEBUG_FLAG]) return true;
    return false;
  }, [mergedMods]);

  return useMemo(
    () => ({
      ...mergedMods,
      debug,
    }),
    [mergedMods, debug]
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
  formData: UseFormDataReturn<TData>,
  modifiers: FormModifers
): UseFormValidationReturn<TData> => {
  const schema = useMemo(() => formSchema ?? null, [formSchema]);

  /**
   * Compute the whole form's validation state
   *
   * @see {@link ComputeFormValidationFn}
   */
  const computeFormValidation = useCallback<ComputeFormValidationFn>(() => {
    if (!schema) return defaultFormValidation;

    const validation = schema.safeParse(formData.data);
    if (!validation.error?.errors || !validation.error.errors.length)
      return defaultFormValidation;
    const formErrors = validation.error.errors.map(({ path, ...error }) => ({
      ...error,
      path: path.join("."),
    }));
    return {
      errors: formData.isLoading ? [] : formErrors,
      isValid: validation.success,
    };
  }, [schema, formData.data, formData.isLoading]);

  /**
   * Form validation object
   * Contains `isValid` boolean indicating whole form validation state
   * and `errors` array containing all validation errors relative to each field
   */
  const [formValidation, triggerFormValidation] = useReducer(
    computeFormValidation,
    computeFormValidation()
  );

  /**
   * Effect used for triggering form validation on change based on modifier
   */
  useEffect(() => {
    if (modifiers.validateOnChange) {
      triggerFormValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.data, triggerFormValidation]);

  return {
    ...formValidation,
    schema,
    triggerFormValidation,
    computeFormValidation,
  };
};

const useFormLayout = (
  formLayout: DefaultFormLayoutProps,
  formEditState: UseFormEditStateReturn
): UseFormLayoutReturn => {
  /**
   * The number of columns in the form. Only even column counts <= 2 are allowed.
   *
   * @remarks Odd column counts are rounded up to the next even number
   */
  const columns = useMemo(() => {
    // only allow even number of columns
    const minColumns = Math.max(formLayout.columns, 2);
    return Math.ceil(minColumns / 2) * 2;
  }, [formLayout]);

  /**
   * Builts a {@link BuiltFormFieldLayout} object
   * based its containing form's {@link FormLayoutProps} as well as its own {@link FormFieldLayout}
   *
   * @param {Optional<FormFieldLayout>} [layout] - The optional {@link FormFieldLayout}
   * @return {BuiltFormFieldLayoutProps["layout"]} - The built {@link BuiltFormFieldLayout}
   */
  const buildFormFieldLayout = useCallback<BuildFormFieldLayoutFn>(
    (fieldLayout?: FormFieldLayout): BuiltFormFieldLayoutProps["layout"] => {
      const defaultSize = Math.max(1, Math.round(columns / 2));

      const hidden = isFunction<FormFieldLayoutHiddenFn>(fieldLayout?.hidden)
        ? fieldLayout.hidden(formEditState.isEditing)
        : isBoolean(fieldLayout?.hidden)
          ? fieldLayout.hidden
          : false;

      const size = fieldLayout?.size ?? defaultSize;
      const fixedWidth = fieldLayout?.fixedWidth
        ? cssLengthUsage(fieldLayout.fixedWidth)
        : null;

      const columnEnd: GridEndPosition = `span ${size}`;

      return {
        ...fieldLayout,
        fixedWidth,
        hidden,
        size,
        columnEnd,
        readonly: fieldLayout?.readonly ?? false,
      };
    },
    [columns, formEditState]
  );

  return {
    columns,
    buildFormFieldLayout,
    asModal: formLayout.asModal,
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
 * @return {BuiltFormContent<TData, InputType>[]} - The built field props for each form field.
 */
const useFormContent = <TData extends object>(
  formData: UseFormDataReturn<TData>,
  validation: UseFormValidationReturn<TData>,
  modifiers: FormModifers,
  formLayout: UseFormLayoutReturn,
  logger: Logger,
  content?: FormContent<TData>[]
): BuiltFormContent<InputType>[] => {
  const tl = useUikitTranslation();

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

      const errorTranslation = formErrorTranslation(error, tl);
      const errorText =
        isString(baseErrorText) && isEmptyString(baseErrorText)
          ? ""
          : error.code === "custom"
            ? error.message
            : (baseErrorText ?? errorTranslation);
      return {
        error: baseError ?? true,
        errorText,
      };
    },
    [validation, tl]
  );

  /**
   * @see {@link IsFieldRequiredFn}
   */
  const isFieldRequired = useCallback<IsFieldRequiredFn<TData>>(
    (source, baseRequired) => {
      if (isBoolean(baseRequired)) return baseRequired;
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
        testId,
        overrideTestId,
        ...rest
      } = formField;

      return {
        ...rest,
        ...getFieldErrorProps(source, error, errorText),
        onChange: propagateChange<TType, typeof source>(
          source,
          onChange as InputOnChangeFn<TType>
        ) as BuiltFieldProps<TType>["onChange"],
        value: getFieldValue<DeepKeyOf<FormData<TData>>>(
          source as DeepKeyOf<FormData<TData>>
        ),
        type: type as TType,
        disabled: disabled || modifiers.disabled,
        required: isFieldRequired(source, required),
        layout: formLayout.buildFormFieldLayout(layout),
        testId,
        overrideTestId,
      };
    },
    [
      getFieldErrorProps,
      propagateChange,
      getFieldValue,
      modifiers.disabled,
      isFieldRequired,
      formLayout,
    ]
  );

  /**
   * @see {@link BuildCustomFieldPropsFn}
   */
  const buildCustomFieldProps = useCallback<BuildCustomFieldPropsFn<TData>>(
    (
      formCustomField: FormCustomFieldProps<TData>
    ): BuiltFormCustomFieldProps => {
      const {
        source,
        CustomInput,
        kind: _kind,
        layout,
        onChange,
        disabled,
        errorText,
        error,
        required,
        ...rest
      } = formCustomField;

      return {
        ...rest,
        ...getFieldErrorProps(source, error, errorText),
        CustomInput,
        onChange: propagateChange(
          source,
          onChange as Nullable<InputOnChangeFn<InputType>>
        ) as CustomFormInputProps<NullishPrimitives>["onChange"],
        value: getFieldValue<DeepKeyOf<FormData<TData>>>(
          source as DeepKeyOf<FormData<TData>>
        ),
        disabled: disabled || modifiers.disabled,
        required: isFieldRequired(source, required),
        layout: formLayout.buildFormFieldLayout(layout),
      };
    },
    [
      formLayout,
      getFieldErrorProps,
      getFieldValue,
      isFieldRequired,
      modifiers.disabled,
      propagateChange,
    ]
  );

  /**
   * @see {@link BuildFormTablePropsFn}
   */
  const buildFormTable = useCallback<BuildFormTablePropsFn<TData>>(
    (
      table: FormTableProps<TData>,
      contentIndex: number
    ): BuiltFormTableProps => {
      // cast to remove `never` case and proceed as usual
      const t = table as FormTableProps<{ arr: { data: string }[] }>;

      const tableSource = t.source as DeepKeyOfType<
        FormData<TData>,
        Record<string, unknown>[]
      >;
      const tableFormSource = tableSource as FormSource<TData>;

      const arrayValue = (getFieldValue(tableSource) ?? []) as Record<
        string,
        unknown
      >[];

      /**
       * Deletes a row from the table
       * @param {number} index The index of the row to delete
       */
      const deleteRow: DeleteTableRowFn = (index: number) => {
        const arrayCopy = [...arrayValue];
        const preConfirmLength = arrayCopy.length;
        const preConfirmRowData = { ...arrayCopy[index] };

        /**
         * Cancels the deletion of a table row
         *
         * @remarks
         * Does nothing but loggingfor now, may change in the future
         */
        const cancelDelete = () => {
          logger.debug(
            `Table row deletion at index ${index} cancelled. No changes were made to the table data.`
          );
        };

        /**
         * Confirms and executes the deletion of a table row after checking for data integrity
         *
         * @remarks
         * - Aborts if table rows count changed
         * - Aborts if row data changed between pre- and post-confirmation
         *
         * Calls `cancelDelete` if any of the above conditions are met
         */
        const confirmDelete = () => {
          const postCheckArr = [...arrayValue];
          // abort if table rows count changed
          const postCheckLength = postCheckArr.length;
          if (postCheckLength !== preConfirmLength) {
            logger.error(
              `Table row length changed before delete confirmation. Was ${preConfirmLength}, is now ${postCheckLength}. Indices may not match anymore. Aborting deletion.`
            );
            return cancelDelete();
          }
          // abort if row data changed between pre- and post-confirmation
          const postConfirmRowData = { ...postCheckArr[index] };
          if (!isEqual(preConfirmRowData, postConfirmRowData)) {
            logger.error(
              `Table row data at index ${index} changed between pre- and post-confirmation. Aborting deletion.`
            );
            return cancelDelete();
          }

          postCheckArr.splice(index, 1);
          formData.mutateFormData(
            tableFormSource,
            postCheckArr as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
          );
        };

        // run callback if provided
        if (t.tryDeletingRow) {
          const rowParams: FormTableTryDeletingRowParams<{ data: string }> = {
            index,
            data: preConfirmRowData as { data: string },
            confirmDelete,
            cancelDelete,
          };
          t.tryDeletingRow(rowParams);
          return;
        }
        // else, proceed with deletion
        confirmDelete();
      };

      const tableModifiers: BuiltFormTableModifiers = {
        deletable: t?.deletable ?? false,
        swappable: t?.swappable ?? false,
        selectable: t?.selectable ?? false,
      };

      /**
       * Appends a row to the table
       * @param {Partial<Record<string, unknown>>} newRow The new row to append
       */
      const appendRow: AppendTableRowFn<Record<string, unknown>> = (newRow) => {
        const updatedArr = [...arrayValue, newRow];
        formData.mutateFormData(
          tableFormSource,
          updatedArr as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      /**
       * Swaps two rows in the table
       * @param {number} oldIndex The index of the row to swap from
       * @param {number} newIndex The index of the row to swap to
       */
      const swapRows: SwapTableRowsFn = (oldIndex, newIndex) => {
        const swapped = arrayMove([...arrayValue], oldIndex, newIndex);
        formData.mutateFormData(
          tableFormSource,
          swapped as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      /**
       * Sets the selection state of a row
       * @param {number} rowIndex The index of the row to set the selection state of
       * @param {boolean} selected The new selection state of the row
       */
      const setRowSelection: SetRowSelectionFn = (rowIndex, selected) => {
        // abort if modifiers do not allow selection
        if (!tableModifiers.selectable) return;
        if (!tableModifiers.selectable.property) return;
        const arrayCopy = [...arrayValue];
        const row = arrayCopy[rowIndex];
        // abort if row does not exist
        if (!row) return;
        // abort if row has a non-nullish boolean value in the selection property
        if (tableModifiers.selectable.property in row) {
          const selection = row[tableModifiers.selectable.property];
          if (!isBoolean(selection) && !isNullish(selection)) return;
        }
        // get the row source & commit selection change
        const rowSource = `${tableFormSource}.${rowIndex}.${tableModifiers.selectable.property}`;
        formData.mutateFormData(
          rowSource as FormSource<TData>,
          selected as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      const setTableSelection: SetTableSelectionFn = (selected) => {
        // abort if modifiers do not allow selection
        if (!tableModifiers.selectable) return;
        if (!isString(tableModifiers.selectable.property)) return;
        const { property } = tableModifiers.selectable;
        if (!arrayValue.length) return;
        const arrayCopy = [...arrayValue];
        const selectedArray: typeof arrayCopy = arrayCopy.map((rowValue) => ({
          ...rowValue,
          [property]: selected,
        }));
        formData.mutateFormData(
          tableFormSource,
          selectedArray as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      const headers = t.columns.map(
        ({ label, tooltip, compact, required, source }): FieldLabelProps => ({
          label,
          tooltip,
          compact,
          required: isFieldRequired(
            `${t.source}.0.${source}` as FormFieldProps<TData>["source"],
            required
          ),
        })
      );

      const colSpans = t.columns?.map(({ layout }) => layout?.size ?? 1) ?? [];

      // generate rows and cell fields from columns and array items
      const rows = arrayValue.map((rowData, index): BuiltFormTableRow => {
        const rowSource = `${t.source}.${index}`;
        let baseDisabled = false;
        if (t.disableRow) {
          const disableResult = t.disableRow(
            rowData as { data: string },
            index
          );
          if (isBoolean(disableResult) && disableResult) {
            baseDisabled = true;
          }
        }
        const modifiers = t.overrideRowModifiers
          ? {
              ...tableModifiers,
              ...(t.overrideRowModifiers(rowData as { data: string }, index) ??
                {}),
            }
          : tableModifiers;
        const cells = (t.columns ?? [])
          .map(({ source, ...cell }) => {
            const cellSource = `${rowSource}.${source}`;
            const cellField = {
              ...cell,
              source: cellSource,
              id: cellSource,
            };

            if (isFormCustomField<TData>(cellField)) {
              const disabled = cellField.disabled || baseDisabled;
              return buildCustomFieldProps({ ...cellField, disabled });
            }

            if (isFormField<TData>(cellField)) {
              const disabled = cellField.disabled || baseDisabled;
              return buildFieldProps({ ...cellField, disabled });
            }

            logger.error(`Invalid table cell for source ${cellSource}`);
            return null;
          })
          .filter(
            (cell): cell is BuiltFormTableRow["cells"][number] => !isNull(cell)
          );

        const selected = tableModifiers.selectable
          ? (getFieldValue(
              `${rowSource}.${tableModifiers.selectable.property}` as DeepKeyOf<
                FormData<TData>
              >
            ) ?? false)
          : false;

        return {
          cells,
          id: rowSource,
          stableId: rowSource,
          modifiers,
          selected,
        };
      });

      const selectedRowCount = rows.filter(({ selected }) => selected).length;
      const selected: CheckboxStatus =
        selectedRowCount === rows.length
          ? true
          : selectedRowCount > 0
            ? "mixed"
            : false;

      const tableId = builtFormTableId(String(t.source), contentIndex);

      const errorProps = getFieldErrorProps(
        tableFormSource,
        t.error,
        t.errorText
      );

      if (!errorProps.error) {
        // check for nested errors if none on top level
        const containsNestedErrors = rows.some(({ cells }) =>
          cells.some(({ error }) => error)
        );
        errorProps.error = errorProps.error || containsNestedErrors;
        errorProps.errorText = errorProps.errorText ?? tl.validation.invalid();
      }

      const columnsCount = colSpans.reduce((acc, curr) => acc + curr, 0);

      // Extract test ID props from the footer if it's a select variant
      const footerWithTestId =
        t?.footer && t.footer.kind === "select"
          ? {
              ...t.footer,
              testId: t.footer.testId,
              overrideTestId: t.footer.overrideTestId,
            }
          : t?.footer;

      return {
        kind: "table",
        stableId: tableId,
        rows,
        headers,
        colSpans,
        layout: formLayout.buildFormFieldLayout({
          ...(t.layout ?? {}),
          size: formLayout.columns,
        }),
        id: t.id ?? null,
        maxBodyHeight: t.maxBodyHeight ?? null,
        label: t.label,
        assistiveText: t.assistiveText,
        required: isFieldRequired(tableFormSource, t.required),
        ...errorProps,
        modifiers: tableModifiers,
        deleteRow,
        appendRow,
        swapRows,
        setRowSelection,
        setTableSelection,
        data: arrayValue,
        footer: footerWithTestId ?? null,
        columnsCount,
        EmptyCard: t.EmptyCard ?? null,
        tableLayout: t.tableLayout ?? "auto",
        selected,
      };
    },

    [
      getFieldValue,
      getFieldErrorProps,
      formLayout,
      isFieldRequired,
      formData,
      logger,
      buildCustomFieldProps,
      buildFieldProps,
      tl.validation,
    ]
  );

  const buildFormFeatureSwitch = useCallback<BuildFormFeatureSwitchFn<TData>>(
    (featureSwitch) => {
      const f = featureSwitch as FormFeatureSwitchProps<{ data: string }>;
      const {
        kind,
        source,
        variant,
        onChange: baseOnChange,
        disabled: baseDisabled,
        required: baseRequired,
        error,
        ...rest
      } = f;

      const disabled = baseDisabled || modifiers.disabled;
      const required = isFieldRequired(
        source as FormSource<TData>,
        baseRequired
      );
      const layout = formLayout.buildFormFieldLayout({
        ...(f.layout ?? {}),
        size: formLayout.columns,
      });

      const value = getFieldValue(source as DeepKeyOf<FormData<TData>>);
      const onChange = propagateChange(
        source as FormSource<TData>,
        baseOnChange as Nullable<InputOnChangeFn<InputType>>
      );
      const baseProps = {
        ...rest,
        variant,
        kind,
        onChange: onChange,
        disabled,
        required,
        ...getFieldErrorProps(source as FormSource<TData>, error),
        layout,
      };
      if (variant === "select") {
        return {
          ...baseProps,
          value,
        } as BuiltFormFeatureSwitchProps;
      }
      return {
        ...baseProps,
        active: value,
      } as BuiltFormFeatureSwitchProps;
    },
    [
      formLayout,
      getFieldErrorProps,
      getFieldValue,
      isFieldRequired,
      modifiers.disabled,
      propagateChange,
    ]
  );

  /**
   * The built content props ({@link BuiltFormContent})
   *
   * Generated using:
   * - {@link buildFormText}
   * - {@link buildCustomFieldProps}
   * - {@link buildFormTable}
   * - {@link buildFieldProps}
   * - {@link buildFormFeatureSwitch}
   */
  return useMemo<BuiltFormContent<InputType>[]>(() => {
    if (!content || !content.length) return [];
    return content.map((content, contentIndex) => {
      if (isFormDivider(content) || isFormCustomContent(content))
        return content;
      if (isFormText(content)) return buildFormText(content);
      if (isFormCustomField(content)) return buildCustomFieldProps(content);
      if (isFormTable(content)) return buildFormTable(content, contentIndex);
      if (isFormFeatureSwitch(content)) return buildFormFeatureSwitch(content);
      return buildFieldProps(content);
    });
  }, [
    buildCustomFieldProps,
    buildFieldProps,
    buildFormTable,
    buildFormFeatureSwitch,
    content,
  ]);
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
  onSubmitError: Nullish<FormOnSubmitErrorFn>,
  onCancelled: Nullish<VoidFn>,
  logger: Logger
): UseFormSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Native form onSubmit callback that triggers data validation, submission and sync
   *
   * @see {@link UseFormSubmissionReturn["submitForm"]}
   */
  const submitForm = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      event?.stopPropagation();
      if (
        modifiers.disabled ||
        modifiers.readonly ||
        !editState.isEditing ||
        isSubmitting
      )
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
          if (!result && onSubmitError) {
            onSubmitError(
              new Error("Failed to submit form: `onSubmit` returned false.")
            );
          }
          return;
        }
        // overwrite internal form data upon submission
        const updatedInitialData: FormData<TData> = isObject(result)
          ? result
          : (dataToSubmit as FormData<TData>);
        editState.stopEditing();
        formData.setData(updatedInitialData);
        formData.setInitialData(updatedInitialData);

        setIsSubmitting(false);
      } catch (e: unknown) {
        logger.error(e);
        if (onSubmitError)
          onSubmitError(
            new Error(`Failed to submit form: ${(e as Error).message}`)
          );
        setIsSubmitting(false);
      }
    },
    [
      modifiers.disabled,
      modifiers.readonly,
      modifiers.validateOnSubmit,
      editState,
      isSubmitting,
      onSubmit,
      validation,
      logger,
      formData,
      onSubmitError,
    ]
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
    if (isSubmitting) return;
    if (editState.isEditing) {
      formData.setData(formData.initialData);
    }
    editState.stopEditing();
    if (onCancelled) onCancelled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editState, formData, isSubmitting]);

  return { submitForm, isSubmitting, cancelEdition };
};

/**
 * Custom form hook
 * Returns an object containing the state and functions to manage the editing state of a form.
 *
 * @param {FormModifers} modifiers - An object containing modifier functions for the form.
 * @param {FormLayoutProps["asModal"]} asModal - The modal reference of the form.
 * @param {FormDataProps<object>["onEditStateChanged"]} onEditStateChanged - The callback function to be called when the edit state changes.
 * @return {UseFormEditStateReturn} An object with the following properties:
 *   - isEditing: A boolean indicating whether the form is currently in edit mode.
 *   - startEditing: A function that switches the form into edit mode.
 *   - stopEditing: A function that switches the form out of edit mode.
 */
const useFormEditState = (
  modifiers: FormModifers,
  asModal: FormLayoutProps["asModal"],
  onEditStateChanged: FormDataProps<object>["onEditStateChanged"]
): UseFormEditStateReturn => {
  const { closeDialog, isDialogRegistered, isDialogOpen } = useDialogManager();

  const dialogRef = useMemo(
    () => asModal?.reference ?? "",
    [asModal?.reference]
  );

  const [isEditing, setIsEditing] = useState(
    !!modifiers.defaultEditing || false
  );

  /**
   * Changes the form's edit state and calls the `onEditStateChanged` callback if it exists
   *
   * @param {boolean} newState - The new edit state of the form.
   */
  const changeEditState = useCallback(
    (newState: boolean) => {
      setIsEditing((prevState) => {
        if (
          newState !== prevState &&
          isFunction<VoidFn<[boolean]>>(onEditStateChanged)
        ) {
          onEditStateChanged(newState);
        }
        return newState;
      });
    },
    [onEditStateChanged]
  );

  /**
   * Switches the form into edit mode
   */
  const startEditing = useCallback<VoidFn>(() => {
    if (modifiers.readonly) return;
    changeEditState(true);
  }, [modifiers.readonly, changeEditState]);

  /**
   * Switches the form out of edit mode while preserving the form's data
   *
   * @remarks use {@link cancelEdition} to go back to view mode and reset the form's data to its initial state
   */
  const stopEditing = useCallback<VoidFn>(() => {
    if (modifiers.defaultEditing !== "force") {
      changeEditState(false);
    }
    if (
      !isEmptyString(dialogRef) &&
      isDialogRegistered(dialogRef) &&
      isDialogOpen(dialogRef)
    ) {
      closeDialog(dialogRef);
    }
  }, [
    modifiers.defaultEditing,
    dialogRef,
    isDialogRegistered,
    isDialogOpen,
    closeDialog,
    changeEditState,
  ]);

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
 * @see {@link useFormData}, {@link useFormValidation}, {@link useFormEditState} {@link useFormModifiers}, {@link useFormContent}, {@link useFormSubmission}, {@link useFormTables}
 */
export const useForm = <TData extends object>(
  {
    columns,
    asModal,
    embedded,
    onEditStateChanged,
    ...props
  }: FormDefaultProps<TData>,
  logger: Logger
): FormContext<TData> => {
  const formModifiers = useFormModifiers(props);
  const formData = useFormData<TData>(props, logger, formModifiers);
  const formValidation = useFormValidation<TData>(
    props.schema,
    formData,
    formModifiers
  );
  const formEditState = useFormEditState(
    formModifiers,
    asModal,
    onEditStateChanged
  );
  const formLayout = useFormLayout(
    { columns, asModal, embedded },
    formEditState
  );
  const content = useFormContent(
    formData,
    formValidation,
    formModifiers,
    formLayout,
    logger,
    props.content
  );
  const formSubmission = useFormSubmission(
    formData,
    formValidation,
    formModifiers,
    formEditState,
    props.onSubmit,
    props.onSubmitError,
    props.onCancelled,
    logger
  );

  return {
    ...formData,
    ...formValidation,
    ...formSubmission,
    ...formEditState,
    ...formModifiers,
    ...formLayout,
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
  batchMutateFormData: () => ({}),
  isLoading: false,
  setIsLoading: () => {},
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
  columns: 2,
  buildFormFieldLayout: () => ({
    readonly: false,
    hidden: false,
    size: 1,
    columnEnd: "span 1",
    fixedWidth: null,
  }),
  asModal: null,
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

/**
 * The context provider for the form.
 *
 * @template {object} TData - The type of the form data.
 * @param {FormDefaultProps<TData> & { children: ReactNode }} props - The props object.
 * @param {FormDefaultProps<TData>} props - The form default props.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component wrapping the children components.
 */
export const FormProvider = <TData extends object>(
  props: FormDefaultProps<TData> & { children: ReactNode }
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
