import {
  GenericFn,
  isFunction,
  isNullish,
  isNumber,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useReducer } from "react";

import {
  type ComboBoxProps,
  type ComboBoxDefaultProps,
  type ComboBoxOption,
  type ComboBoxOnChangeFn,
} from "./ComboBox.types";
import { ActionIcon, ActionIconProps } from "../ActionIcon";
import { ComboBoxButton } from "../ComboBoxButton";
import {
  areComboBoxSelectionsDifferent,
  compareComboBoxValues,
} from "./Combobox.utils";

import { FlexLayout } from "@/layouts/Flex";
import { GridLayout } from "@/layouts/Grid";
import { GridItem } from "@/layouts/GridItem";
import {
  useTestId,
  useMergedProps,
  useLogger,
  useUikitTranslation,
} from "@utils";

import type { TestIdProps } from "@types";

const defaultComboBoxProps: ComboBoxDefaultProps<NullishPrimitives> = {
  options: null,
  value: null,
  direction: "row",
  multi: false,
  onChange: null,
  disabled: false,
  showIcon: true,
  columns: null,
  readonly: false,
  id: null,
  creatable: false,
  onCreate: null,
  onOptionDelete: null,
  onOptionEdit: null,
  optionEditLabel: null,
  optionDeleteLabel: null,
  required: false,
};

/**
 * A group of ComboBoxButtons that act as a select or radio input.
 *
 * @version 0.0.13
 *
 * @param {ComboBoxProps & TestIdProps} props - ComboBox component props
 * @returns {JSX.Element}
 */
const ComboBox = <TOptionValue extends NullishPrimitives>(
  props: ComboBoxProps<TOptionValue> & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("ComboBox");
  const mergedProps = useMergedProps(
    defaultComboBoxProps as ComboBoxDefaultProps<TOptionValue>,
    props
  );
  const {
    options,
    multi,
    onChange,
    disabled,
    direction,
    showIcon,
    readonly,
    required,
  } = mergedProps;
  const testId = useTestId("combo-box", props);
  const { action } = useUikitTranslation();

  const valueToSelection = useCallback(
    (value: Nullable<TOptionValue | TOptionValue[]>): TOptionValue[] => {
      if (isNullish(value)) return [];
      if (Array.isArray(value)) return value as TOptionValue[];
      return [value];
    },
    []
  );

  const getInitialSelection = useCallback<GenericFn<[], TOptionValue[]>>(
    (): TOptionValue[] => valueToSelection(mergedProps.value),
    [mergedProps.value, valueToSelection]
  );

  /**
   * Reducer that acts as a setState but calls `onChange` if there was a meaningful update
   */
  const [selection, setSelection] = useReducer(
    (
      state: TOptionValue[],
      {
        newSelection,
        bypassRequired = false,
      }: { newSelection: TOptionValue[]; bypassRequired?: boolean }
    ) => {
      console.error("setSelection called", newSelection);
      // only trigger update when actual changes have been sent
      if (areComboBoxSelectionsDifferent(state, newSelection)) {
        // abort change if required & new selection is empty
        if (!newSelection.length && required && !bypassRequired) return state;
        // trigger onChange if present
        if (isFunction<ComboBoxOnChangeFn<TOptionValue>>(onChange)) {
          onChange(newSelection);
        }
        return newSelection;
      }
      return state;
    },
    getInitialSelection()
  );

  useEffect(() => {
    const newSelection = valueToSelection(mergedProps.value);
    const isDifferent = areComboBoxSelectionsDifferent(selection, newSelection);
    if (!isDifferent) return;
    setSelection({ newSelection, bypassRequired: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value, valueToSelection]);

  const isOptionActive = useCallback(
    (option: ComboBoxOption<TOptionValue>) => selection.includes(option.value),
    [selection]
  );

  // useEffect(() => {
  //   if (disabled || readonly) return;

  //   if (isFunction<ComboBoxOnChangeFn<TOptionValue>>(onChange)) {
  //     onChange(selection);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selection, disabled, readonly]);

  const selectOptionOnClick = useCallback(
    (option: ComboBoxOption<TOptionValue>) => () => {
      if (disabled || readonly || option.disabled) return;
      const optionActive = isOptionActive(option);
      const newSelection = multi
        ? optionActive
          ? [...selection].filter((value) =>
              compareComboBoxValues(value, option.value, (a, b) => a !== b)
            )
          : [...selection, option.value]
        : optionActive
          ? []
          : [option.value];
      setSelection({ newSelection });
    },
    [multi, selection, isOptionActive, disabled, readonly]
  );

  if (!props.options) {
    warn(`Missing required options`);
  }

  const onOptionDelete = useCallback(
    (value: TOptionValue) => () => {
      if (mergedProps.onOptionDelete) mergedProps.onOptionDelete(value);
    },
    [mergedProps]
  );

  const onOptionEdit = useCallback(
    (value: TOptionValue) => () => {
      if (mergedProps.onOptionEdit) mergedProps.onOptionEdit(value);
    },
    [mergedProps]
  );

  const creatable = useMemo(() => {
    if (disabled || readonly) return false;
    return mergedProps.creatable;
  }, [disabled, readonly, mergedProps.creatable]);

  const actionIconProps = useMemo<ActionIconProps>(
    () => ({
      size: "m",
      color: "white",
      icon: "PlusLg",
      onClick: mergedProps.onCreate,
      disabled,
      title: action.create(),
    }),
    [action, disabled, mergedProps.onCreate]
  );

  if (isNumber(mergedProps.columns)) {
    return (
      <GridLayout
        columns={mergedProps.columns}
        gap="s-2"
        fill
        role="combobox"
        testId={testId}
        id={mergedProps.id}
      >
        {(options ?? []).map((option, index) => (
          <GridItem
            columnEnd="span 1"
            rowEnd="span 1"
            fill="force"
            key={option.label + index}
          >
            <ComboBoxButton
              label={option.label}
              active={isOptionActive(option)}
              description={option.description}
              disabled={option.disabled || disabled}
              multi={multi}
              fill
              onSelect={selectOptionOnClick(option)}
              showIcon={showIcon}
              onDelete={onOptionDelete(option.value)}
              onEdit={onOptionEdit(option.value)}
              editable={option.editable}
              deletable={option.deletable}
              editLabel={mergedProps.optionEditLabel}
              deleteLabel={mergedProps.optionDeleteLabel}
            />
          </GridItem>
        ))}
        {creatable && (
          <GridItem
            columnEnd="span 1"
            rowEnd="span 1"
            fill="force"
            key={"create-button"}
          >
            <ActionIcon
              {...actionIconProps}
              testId={`${testId}-create-button`}
              overrideTestId
            />
          </GridItem>
        )}
      </GridLayout>
    );
  }

  return (
    <FlexLayout
      testId={testId}
      overrideTestId
      direction={direction}
      gap="s-2"
      wrap
      role="combobox"
    >
      {(options ?? []).map((option, index) => (
        <ComboBoxButton
          label={option.label}
          key={option.label + index}
          active={isOptionActive(option)}
          description={option.description}
          disabled={option.disabled || disabled}
          multi={multi}
          fill={direction === "column"}
          onSelect={selectOptionOnClick(option)}
          showIcon={showIcon}
          onDelete={onOptionDelete(option.value)}
          onEdit={onOptionEdit(option.value)}
          editable={option.editable}
          deletable={option.deletable}
          editLabel={mergedProps.optionEditLabel}
          deleteLabel={mergedProps.optionDeleteLabel}
        />
      ))}
      {creatable && (
        <ActionIcon
          {...actionIconProps}
          testId={`${testId}-create-button`}
          overrideTestId
        />
      )}
    </FlexLayout>
  );
};
ComboBox.defaultProps = defaultComboBoxProps;

export { ComboBox };
