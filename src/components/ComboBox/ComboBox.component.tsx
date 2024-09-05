import {
  GenericFn,
  isFunction,
  isNullish,
  isNumber,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useState } from "react";

import {
  type ComboBoxProps,
  type ComboBoxDefaultProps,
  type ComboBoxOption,
  type ComboBoxOnChangeFn,
} from "./ComboBox.types";
import { ComboBoxButton } from "../ComboBoxButton";

import { FlexLayout, GridItem, GridLayout } from "@layouts";
import { useTestId, useMergedProps, useLogger } from "@utils";

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
};

/**
 * A group of ComboBoxButtons that act as a select or radio input.
 *
 * @version 0.0.8
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
  const { options, multi, onChange, disabled, direction, showIcon, readonly } =
    mergedProps;
  const testId = useTestId("combo-box", props);

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

  const [selection, setSelection] =
    useState<TOptionValue[]>(getInitialSelection);

  useEffect(() => {
    const newSelection = valueToSelection(mergedProps.value);
    const differentLengths = newSelection.length !== selection.length;
    // update if number of values has changed (multi)
    if (differentLengths) {
      setSelection(newSelection);
      return;
    }
    // compare values
    const sameValues = newSelection.every((value, index) => {
      return JSON.stringify(value) === JSON.stringify(selection[index]);
    });
    if (sameValues) return;

    setSelection(newSelection);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value, valueToSelection]);

  const isOptionActive = useCallback(
    (option: ComboBoxOption<TOptionValue>) => selection.includes(option.value),
    [selection]
  );

  useEffect(() => {
    if (disabled) return;

    if (isFunction<ComboBoxOnChangeFn<TOptionValue>>(onChange)) {
      onChange(selection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, disabled]);

  const selectOptionOnClick = useCallback(
    (option: ComboBoxOption<TOptionValue>) => () => {
      if (disabled || readonly) return;
      if (multi) {
        if (isOptionActive(option)) {
          const newSelection = [...selection].filter(
            (value) => value !== option.value
          );
          setSelection(newSelection);
        } else {
          setSelection([...selection, option.value]);
        }
      } else if (isOptionActive(option)) {
        setSelection([]);
      } else {
        setSelection([option.value]);
      }
    },
    [multi, selection, isOptionActive, disabled, readonly]
  );

  if (!props.options) {
    warn(`Missing required options`);
  }

  if (multi && !showIcon) {
    warn("Multi mode requires showIcon to be true");
  }

  if (isNumber(mergedProps.columns)) {
    return (
      <GridLayout
        columns={mergedProps.columns}
        gap="s-2"
        fill
        role="combobox"
        testId={testId}
        overrideTestId
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
              fill={direction === "column"}
              onSelect={selectOptionOnClick(option)}
              showIcon={showIcon}
            />
          </GridItem>
        ))}
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
          disabled={option.disabled || disabled}
          multi={multi}
          fill={direction === "column"}
          onSelect={selectOptionOnClick(option)}
          showIcon={showIcon}
        />
      ))}
    </FlexLayout>
  );
};
ComboBox.defaultProps = defaultComboBoxProps;

export { ComboBox };
