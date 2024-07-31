import {
  GenericFn,
  isFunction,
  isNumber,
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
  direction: "column",
  multi: false,
  onChange: () => {},
  disabled: false,
  showIcon: true,
  columns: null,
};

/**
 * A group of ComboBoxButtons that act as a select or radio input.
 *
 * @version 0.0.5
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
  const { options, multi, onChange, disabled, direction, showIcon } =
    mergedProps;
  const testId = useTestId("combo-box", props);

  const getInitialSelection = useCallback<
    GenericFn<[], TOptionValue[]>
  >((): TOptionValue[] => {
    if (mergedProps.value) {
      if (Array.isArray(mergedProps.value)) return mergedProps.value;
      return [mergedProps.value];
    }
    return [];
  }, [mergedProps.value]);

  const [selection, setSelection] =
    useState<TOptionValue[]>(getInitialSelection);

  useEffect(() => {
    setSelection(getInitialSelection);
  }, [mergedProps.value, getInitialSelection]);

  const isOptionActive = useCallback(
    (option: ComboBoxOption<TOptionValue>) => selection.includes(option.value),
    [selection]
  );

  useEffect(() => {
    if (isFunction<ComboBoxOnChangeFn<TOptionValue>>(onChange) && !disabled) {
      onChange(selection);
    }
  }, [disabled, onChange, selection]);

  const selectOptionOnClick = useCallback(
    (option: ComboBoxOption<TOptionValue>) => () => {
      if (disabled) return;
      if (multi) {
        if (isOptionActive(option)) {
          const newSelection = [...selection].filter(
            (value) => value !== option.value
          );
          setSelection(newSelection);
        } else {
          setSelection([...selection, option.value]);
        }
      } else {
        if (isOptionActive(option)) {
          setSelection([]);
        } else {
          setSelection([option.value]);
        }
      }
    },
    [multi, selection, isOptionActive, disabled]
  );

  if (!props.options) {
    warn(`Missing required labels`);
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
