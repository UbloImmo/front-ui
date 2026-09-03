import { arrayMove } from "@dnd-kit/helpers";
import {
  type DeepKeyOf,
  type DeepKeyOfType,
  type DeepValueOf,
  deepValueOf,
  isArray,
  isBoolean,
  isFunction,
  isNull,
  isNullish,
  isNumber,
  isObject,
  isString,
  isUndefined,
  type Logger,
  type Nullable,
  type Nullish,
  type NullishPrimitives,
  objectEntries,
  Optional,
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
  computeFormContent,
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

import { CssLength } from "@types";
import {
  cssFr,
  cssLengthUsage,
  isEmptyString,
  updateMap,
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
  FormComputedContentFn,
  FormContentArray,
  FormContentFnContext,
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
  StableFormTableId,
  SwapTableRowsFn,
  UseFormDataReturn,
  UseFormEditStateReturn,
  UseFormLayoutReturn,
  UseFormSubmissionReturn,
  UseFormTableRowSwapReturn,
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
 * @param {UseFormTableRowSwapReturn<TData>} tableRowSwapMap - The form table row swap map object.
 * @returns {UseFormDataReturn<TData>} - An object containing the form data, initial data, and methods for mutating and setting form data.
 */
const useFormData = <TData extends object>(
  props: FormDataProps<TData>,
  logger: Logger,
  modifiers: FormModifers,
  tableRowSwapMap: UseFormTableRowSwapReturn<TData>
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
          tableRowSwapMap.reset();
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
        tableRowSwapMap.reset();
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
          mutated as CompleteFormData<TData>,
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
 * @param {FormContentArray<TData> | FormComputedContentFn<TData>} content - The form content.
 * @param {FormContentFnContext<TData>} contentContext - Return payload from the {@link useFormContentContext} hook
 * @param {UseFormDataReturn<TData>} formData - The form data.
 * @param {UseFormTableRowSwapReturn<TData>} tableRowSwapMap - The form table row swap map object.
 * @param {UseFormValidationReturn<TData>} validation - The form validation.
 * @param {FormModifers} modifiers - The form modifiers.
 * @param {UseFormLayoutReturn} formLayout - The form layout.
 * @param {Logger} logger - The form's logger.
 * @return {BuiltFormContent<TData, InputType>[]} - The built field props for each form field.
 */
const useFormContent = <TData extends object>(
  content: FormContentArray<TData> | FormComputedContentFn<TData>,
  contentContext: FormContentFnContext<TData>,
  { mutateFormData, data }: UseFormDataReturn<TData>,
  tableRowSwapMap: UseFormTableRowSwapReturn<TData>,
  validation: UseFormValidationReturn<TData>,
  modifiers: FormModifers,
  formLayout: UseFormLayoutReturn,
  logger: Logger
): BuiltFormContent<InputType>[] => {
  const tl = useUikitTranslation();

  /**
   * @see {@link GetFieldValueFn}
   */
  const getFieldValue = useCallback<GetFieldValueFn<TData>>(
    (source) => {
      const value = deepValueOf(data, source, true);
      return value ?? null;
    },
    [data]
  );

  /**
   * @see {@link PropagateChangeFn}
   */
  const propagateChange = useCallback<PropagateChangeFn<TData>>(
    (source, onChange) => {
      return (value) => {
        mutateFormData(source, value);
        if (isNullish(onChange)) return;
        onChange(value);
      };
    },
    [mutateFormData]
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
      const tableId = builtFormTableId(String(t.source), contentIndex);

      // register table to swap map if needed
      const rowSwapArray = tableRowSwapMap.registerTable(tableId);

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
         * Does nothing but logging for now, may change in the future
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

          // delete from row swap map;
          tableRowSwapMap.onRowDelete(tableId, index);
          // delete row from table data array
          postCheckArr.splice(index, 1);
          mutateFormData(
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
      const appendRow: AppendTableRowFn<Record<string, unknown>> = (
        newRow: Partial<Record<string, unknown>>
      ) => {
        const updatedArr = [...arrayValue, newRow];
        mutateFormData(
          tableFormSource,
          updatedArr as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      /**
       * Swaps two rows in the table
       * @param {number} oldIndex The index of the row to swap from
       * @param {number} newIndex The index of the row to swap to
       */
      const swapRows: SwapTableRowsFn = (
        oldIndex: number,
        newIndex: number
      ) => {
        tableRowSwapMap.swapRows(tableId, oldIndex, newIndex);
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
        mutateFormData(
          rowSource as FormSource<TData>,
          selected as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      /**
       * Sets the selection state of the whole table
       * @param {boolean} selected - The new selection state of the table
       */
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
        mutateFormData(
          tableFormSource,
          selectedArray as Nullable<DeepValueOf<TData, DeepKeyOf<TData>>>
        );
      };

      const columns = computeFormContent(
        t.columns,
        // cast to remove `never` type
        contentContext as unknown as FormContentFnContext<{
          arr: { data: string }[];
        }>,
        logger
      );

      const headers = columns.map(
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

      const colSpans = columns?.map(({ layout }) => layout?.size ?? 1) ?? [];
      const colWidths: CssLength[] =
        columns?.map(
          ({ layout }) => layout?.fixedWidth ?? cssFr(layout?.size ?? 1)
        ) ?? [];

      // generate rows and cell fields from columns and array items
      // build 2 row arrays in 1 loop:
      // - displayRows: in display order (could be swapped)
      // - rows: in data order (not influenced by swap)
      // while keeping track of selected row counts
      const displayRows: BuiltFormTableRow[] = [];
      const rows: BuiltFormTableRow[] = [];
      let selectedRowCount = 0;

      for (let index = 0; index < arrayValue.length; index++) {
        // register row to its table's swap map if missing (newly added row or fist initialization run)
        tableRowSwapMap.registerRow(tableId, index);

        // get current display index (could have been swapped)
        let displayIndex = rowSwapArray.findIndex((i) => i === index);
        if (displayIndex < 0) {
          displayIndex = index;
        }

        // build row
        const rowData = arrayValue[index];
        const rowSource = `${t.source}.${index}`;

        let baseDisabled = false;
        if (t.disableRow) {
          const disableResult = t.disableRow(
            rowData as { data: string },
            index,
            displayIndex
          );
          if (isBoolean(disableResult) && disableResult) {
            baseDisabled = true;
          }
        }
        const modifiers = t.overrideRowModifiers
          ? {
              ...tableModifiers,
              ...(t.overrideRowModifiers(
                rowData as { data: string },
                index,
                displayIndex
              ) ?? {}),
            }
          : tableModifiers;
        const cells = columns
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

        if (selected) {
          selectedRowCount++;
        }

        const builtRow: BuiltFormTableRow = {
          cells,
          id: rowSource,
          stableId: rowSource,
          modifiers,
          selected,
          index,
          displayIndex,
        };

        // add built row to both arrays
        rows[index] = builtRow;
        displayRows[displayIndex] = builtRow;
      }

      const selected: CheckboxStatus = !rows.length
        ? false
        : selectedRowCount === rows.length
          ? true
          : selectedRowCount > 0
            ? "mixed"
            : false;

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
        displayRows,
        headers,
        colSpans,
        colWidths,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      tableRowSwapMap,
      tableRowSwapMap.dependency,
      getFieldValue,
      contentContext,
      logger,
      getFieldErrorProps,
      formLayout,
      isFieldRequired,
      mutateFormData,
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
    const contentArray = computeFormContent(content, contentContext, logger);
    if (!contentArray.length) return [];
    return contentArray.map((content, contentIndex) => {
      if (isFormDivider(content) || isFormCustomContent(content))
        return content;
      if (isFormText(content)) return buildFormText(content);
      if (isFormCustomField(content)) return buildCustomFieldProps(content);
      if (isFormTable(content)) return buildFormTable(content, contentIndex);
      if (isFormFeatureSwitch(content)) return buildFormFeatureSwitch(content);
      return buildFieldProps(content);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content,
    contentContext,
    buildCustomFieldProps,
    buildFormTable,
    buildFormFeatureSwitch,
    buildFieldProps,
  ]);
};

/**
 * Custom hook that handles table row swaps.
 *
 * @template {object} TData - The type of the form data.
 * @param {Logger} logger - The logger object.
 * @returns {UseFormTableRowSwapReturn<TData>} - An object containing methods to manipulate table row swaps
 */
const useFormTableRowSwap = <TData extends object>(
  logger: Logger
): UseFormTableRowSwapReturn<TData> => {
  const map = useRef(new Map<StableFormTableId, number[]>());
  const [dependency, commit] = useReducer(
    () => new Map(map.current),
    map.current
  );

  /**
   * Resets the all form table row swaps
   * Does nothing if no swaps have been performed,
   * Keeps table ids and empties their swap array otherwise
   */
  const reset = useCallback(() => {
    for (const tableId of map.current.keys()) {
      map.current.set(tableId, []);
    }
    commit();
  }, []);

  /**
   * Rebuilds a table's swap array when a row has been deleted
   *
   * @param {StableFormTableId} tableId - ID of the table containing the deleted row
   * @param {number} deletedRowIndex - Index (not displayIndex) of the row that was deleted
   */
  const onRowDelete = useCallback<
    UseFormTableRowSwapReturn<TData>["onRowDelete"]
  >((tableId, deletedRowIndex) => {
    // delete from row swap map;
    updateMap(map.current, tableId, (rowSwapArr) => {
      const position = rowSwapArr.findIndex((i) => i === deletedRowIndex);
      if (position < 0) return rowSwapArr;
      const rebuilt: number[] = [];
      for (const movedIndex of rowSwapArr) {
        // skip deleted index
        if (movedIndex === deletedRowIndex) continue;
        // decrement items after deleted by 1
        if (movedIndex > deletedRowIndex) {
          rebuilt.push(movedIndex - 1);
          continue;
        }
        // keep items before deleted as-is
        rebuilt.push(movedIndex);
      }
      return rebuilt;
    });
  }, []);

  /**
   * Moves one row from one index to another, shifting the others
   *
   * @param {StableFormTableId} tableId - ID of the table containing the swapped row
   * @param {number} oldIndex - Index (not displayIndex) the row was previously at
   * @param {number} newIndex - Index (not displayIndex) the row was should be moved to
   */
  const swapRows = useCallback<UseFormTableRowSwapReturn<TData>["swapRows"]>(
    (tableId, oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;
      updateMap(map.current, tableId, (rowSwapArray) => {
        const swapped = arrayMove([...rowSwapArray], oldIndex, newIndex);
        return swapped;
      });
      commit();
    },
    []
  );

  /**
   * Creates a swap array for a table if missing, then gets & returns it
   *
   * @param {StableFormTableId} tableId - ID of the table containing the swapped row
   * @return {number[]} - The array holding the table's row swaps
   */
  const registerTable = useCallback<
    UseFormTableRowSwapReturn<TData>["registerTable"]
  >((tableId) => {
    if (!map.current.has(tableId)) {
      map.current.set(tableId, []);
    }
    const arr = map.current.get(tableId)!;
    return arr;
  }, []);

  /**
   * Adds a row's index to its table swap array if missing
   *
   * @param {StableFormTableId} tableId - ID of the table containing the swapped row
   * @param {number} rowIndex - Index (not displayIndex) of the row to register
   */
  const registerRow = useCallback<
    UseFormTableRowSwapReturn<TData>["registerRow"]
  >(
    (tableId, rowIndex) => {
      const rowSwapArray = registerTable(tableId);
      if (rowSwapArray && !isNumber(rowSwapArray[rowIndex])) {
        rowSwapArray[rowIndex] = rowIndex;
      }
    },
    [registerTable]
  );

  /**
   * Applies active table row swaps to the supplied form's data,
   * stepping trough each table and moving array items based on the swap order
   *
   * Used in the form's submission process
   *
   * @remarks Does not mutate its provided data
   *
   * @param {TData} data - Form data to apply row swaps to
   * @return {TData} A copy of the form data with table arrays swapped
   */
  const apply = useCallback<UseFormTableRowSwapReturn<TData>["apply"]>(
    (data: TData): TData => {
      let applied: TData = { ...data };
      // do not swap anything if swap map is empty (no tables)
      if (!map.current.size) return applied;
      // iterate trough each registered table & swap its underlying data
      for (const [tableId, rowSwapArray] of map.current.entries()) {
        // get table source & validate its data before proceeding with data swap
        const tableSource = tableId.split("|")[0] as DeepKeyOfType<
          TData,
          unknown[]
        >;
        const tableData = deepValueOf(data, tableSource, true) as Optional<
          unknown[]
        >;
        if (!isArray(tableData)) continue;
        if (tableData.length !== rowSwapArray.length) {
          logger.error(
            "Failed to apply table row swaps, mismatched array lengths",
            tableId
          );
          continue;
        }
        // skip empty table arrays
        if (!tableData.length) continue;
        // skip table if no swaps have been made to its rows
        if (rowSwapArray.every((index, position) => index === position))
          continue;

        // order rows based on swap position
        const swappedRows: unknown[] = [];
        for (const displayIndex of rowSwapArray) {
          swappedRows.push(tableData[displayIndex]);
        }
        // mutate
        applied = setObjectValue(
          applied,
          tableSource as DeepKeyOf<TData>,
          swappedRows as DeepValueOf<TData, DeepKeyOf<TData>>
        );
      }
      return applied;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    reset,
    registerTable,
    registerRow,
    onRowDelete,
    swapRows,
    apply,
    dependency,
  };
};

/**
 * Custom form hook that handles submission logic.
 *
 * @template {object} TData - The type of the form data.
 * @param {UseFormDataReturn<TData>} formData - The form data object.
 * @param {UseFormTableRowSwapReturn<TData>} tableRowSwapMap - The form table row swap map object.
 * @param {UseFormValidationReturn<TData>} validation - The form validation object.
 * @param {FormModifers} modifiers - The form modifiers object.
 * @param {UseFormEditStateReturn} editState - The form edit state object.
 * @param {Nullish<FormOnSubmitFn<TData>>} onSubmit - The form submission function.
 * @param {Logger} logger - The logger object.
 * @return {UseFormSubmissionReturn} An object containing the form submission logic.
 */
const useFormSubmission = <TData extends object>(
  formData: UseFormDataReturn<TData>,
  tableRowSwapMap: UseFormTableRowSwapReturn<TData>,
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

      // apply table row swaps before attempting validation
      let dataToSubmit: TData = tableRowSwapMap.apply(formData.data as TData);
      if (isNullish(validation.schema)) {
        logger.warn("No schema provided, submitting without validation");
      } else {
        const parsed = await validation.schema.safeParseAsync(dataToSubmit);
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
        tableRowSwapMap.reset();

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
      tableRowSwapMap,
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
      tableRowSwapMap.reset();
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
 * Custom form hook
 * Aggregates the form's internal state into a context object ready to be consumed by the consumers & computed content function
 *
 * @template {object} TData - The type of the form data.
 * @param {FormContent<TData>[] | FormComputedContentFn<TData>} content - Supplied form content
 * @param {UseFormDataReturn<TData>} data - Return payload from the {@link useFormData} hook
 * @param {UseFormValidationReturn<TData>} validation - Return payload from the {@link useFormValidation} hook
 * @param {UseFormEditStateReturn} editState - Return payload from the {@link useFormEditState} hook
 * @param {FormModifers} modifiers - Return payload from the {@link useFormModifiers} hook
 * @param {UseFormSubmissionReturn} submission - Return payload from the {@link useFormSubmission} hook
 * @param {UseFormLayoutReturn} layout - Return payload from the {@link useFormLayout} hook
 * @returns {FormContent<TData>[]} - Computed array of form contents to render
 */
function useFormContentContext<TData extends object>(
  data: UseFormDataReturn<TData>,
  validation: UseFormValidationReturn<TData>,
  editState: UseFormEditStateReturn,
  modifiers: FormModifers,
  submission: UseFormSubmissionReturn,
  layout: UseFormLayoutReturn
): FormContentFnContext<TData> {
  return useMemo<FormContentFnContext<TData>>(
    () => ({
      ...data,
      ...validation,
      ...editState,
      ...modifiers,
      ...submission,
      ...layout,
    }),
    [data, editState, modifiers, submission, validation, layout]
  );
}

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
  const formTableRowSwapMap = useFormTableRowSwap<TData>(logger);
  const formData = useFormData<TData>(
    props,
    logger,
    formModifiers,
    formTableRowSwapMap
  );
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
  const formSubmission = useFormSubmission(
    formData,
    formTableRowSwapMap,
    formValidation,
    formModifiers,
    formEditState,
    props.onSubmit,
    props.onSubmitError,
    props.onCancelled,
    logger
  );
  const contentContext = useFormContentContext(
    formData,
    formValidation,
    formEditState,
    formModifiers,
    formSubmission,
    formLayout
  );
  const content = useFormContent(
    props.content,
    contentContext,
    formData,
    formTableRowSwapMap,
    formValidation,
    formModifiers,
    formLayout,
    logger
  );

  return {
    ...contentContext,
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
