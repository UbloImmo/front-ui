import { NullishPrimitives, isObject, isString } from "@ubloimmo/front-util";
import { useCallback, useId, useLayoutEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { SelectInputOption } from "./components/SelectInputOption.component";
import {
  SelectInputStyles,
  SelectOptionContainerStyles,
} from "./SelectInput.styles";
import {
  defaultSelectInputProps,
  isSelectOptionGroup,
  useSelectOptions,
  useSelectValue,
} from "./SelectInput.utils";
import { StyledInput, StyledInputControl } from "../Input.common";
import { commonInputContainerStyles, commonInputStyles } from "../Input.styles";
import { CommonInputStyleProps } from "../Input.types";
import {
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexColumnLayout } from "@layouts";
import { useHtmlAttribute, useTestId } from "@utils";

import type { SelectInputProps, SelectOption } from "./SelectInput.types";
import type { TestIdProps } from "@types";

/**
 * An input that displays a list of options, and allows the user to select one.
 *
 * @todo
 * @version 0.0.1
 *
 * @param {SelectInputProps & TestIdProps} props - SelectInput component props
 * @returns {JSX.Element}
 */
const SelectInput = <TValue extends NullishPrimitives>(
  props: SelectInputProps<TValue> & TestIdProps
) => {
  const { options, mergedProps } = useSelectOptions(props);

  const {
    displayOptions,
    setInternalValue,
    activeOption,
    autoCompleteQuery,
    setAutoCompleteQuery,
    isQuerying,
  } = useSelectValue(mergedProps, options);
  const inputStyles = useInputStyles(mergedProps);

  const { placeholder, disabled, searchable } = mergedProps;

  const [isOpen, setIsOpen] = useState(false);

  const inputId = useId();

  const testId = useTestId("input-select", props);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const closeOptions = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsOpen(false);
  }, [inputRef]);

  const openOptions = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsOpen(true);
  }, [inputRef]);

  const toggleOptionList = useCallback(() => {
    if (!isOpen) {
      openOptions();
    } else {
      closeOptions();
    }
  }, [closeOptions, openOptions, isOpen]);

  const selectOptionAndClose = useCallback(
    (option: SelectOption<TValue>) => {
      return () => {
        if (disabled || option.disabled) return;
        if (isQuerying) setAutoCompleteQuery("");
        closeOptions();
        setInternalValue(option.value);
      };
    },
    [closeOptions, disabled, setInternalValue, isQuerying, setAutoCompleteQuery]
  );

  const onQueryChange = useInputOnChange<"text">(
    () => searchable && !disabled,
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    setAutoCompleteQuery,
    mergedProps.onChangeNative
  );

  const query = useInputValue(autoCompleteQuery, props, (rawQuery) => {
    if (!isOpen) {
      if (activeOption) return activeOption.label;
      return undefined;
    }
    if (isString(rawQuery)) return rawQuery;
    return undefined;
  });

  const openOptionsOnFocus = useCallback(() => {
    if (disabled || !searchable) return;
    setIsOpen(true);
  }, [disabled, searchable]);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  useLayoutEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!e.target) return;
      if ("id" in e.target) {
        if (e.target.id === inputId) return;
      }

      if ("dataset" in e.target && isObject(e.target.dataset)) {
        if ("testid" in e.target.dataset) {
          if (
            // container
            e.target.dataset.testid === testId ||
            // liste d'options
            e.target.dataset.testid === "input-select-options" ||
            // input lorsque searchable
            e.target.dataset.testid === "input-select-query" ||
            // option
            e.target.dataset.testid === "input-select-option" ||
            // control
            e.target.dataset.testid === "input-select-control" ||
            // option label
            e.target.dataset.testid === "input-select-option-label"
          )
            return;
        }
      }

      setIsOpen(false);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeOptions();
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [closeOptions, inputId, testId]);

  const valueTextColor = useMemo(() => {
    return disabled ? "gray-700" : "gray-800";
  }, [disabled]);

  return (
    <FlexColumnLayout reverse>
      {isOpen && (
        <SelectOptionsContainer
          role="listbox"
          data-testid={`${testId}-options`}
        >
          {displayOptions.map((optionOrGroup, index) =>
            isSelectOptionGroup(optionOrGroup) ? null : (
              <SelectInputOption
                key={`${optionOrGroup.value}-${index}`}
                onSelect={selectOptionAndClose(optionOrGroup)}
                {...optionOrGroup}
              />
            )
          )}
        </SelectOptionsContainer>
      )}
      <SelectInputContainer {...inputStyles} data-testid={testId}>
        {mergedProps.searchable ? (
          <StyledInput
            {...inputStyles}
            value={query}
            onChange={onQueryChange}
            data-testid={`${testId}-query`}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={openOptionsOnFocus}
            onBlur={onBlur}
            id={inputId}
            ref={forwardRef}
            autoComplete="none"
            aria-expanded={isOpen}
          />
        ) : (
          <StyledSelectInput
            {...inputStyles}
            disabled={disabled}
            onClick={toggleOptionList}
            id={inputId}
            data-testid={`${testId}-button`}
            aria-expanded={isOpen}
          >
            {activeOption ? (
              <Text weight="medium" color={valueTextColor} ellipsis>
                {activeOption.label}
              </Text>
            ) : (
              <Text
                weight="medium"
                color="gray-400"
                testId={`${testId}-placeholder`}
                overrideTestId
                ellipsis
              >
                {placeholder}
              </Text>
            )}
          </StyledSelectInput>
        )}
        <StyledInputControl
          {...inputStyles}
          data-testid={`${testId}-control`}
          onClick={toggleOptionList}
        >
          <Icon name="CaretDownFill" />
        </StyledInputControl>
      </SelectInputContainer>
    </FlexColumnLayout>
  );
};

SelectInput.defaultProps = defaultSelectInputProps;

export { SelectInput };

const SelectInputContainer = styled.div<CommonInputStyleProps>`
  ${commonInputContainerStyles}
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SelectOptionsContainer = styled.div`
  ${SelectOptionContainerStyles}
`;

const StyledSelectInput = styled.button<CommonInputStyleProps>`
  ${commonInputStyles}
  ${SelectInputStyles}
`;
