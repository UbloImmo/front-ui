import { NullishPrimitives, isString } from "@ubloimmo/front-util";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { SelectInputOption } from "./components/SelectInputOption.component";
import { SelectInputOptionGroup } from "./components/SelectInputOptionGroup.component";
import {
  selectInputContainerStyles,
  selectInputStyles,
  selectInputWrapperStyles,
  selectOptionContainerStyles,
} from "./SelectInput.styles";
import {
  defaultSelectInputProps,
  isSelectOptionGroup,
  useSelectOptions,
  useSelectValue,
} from "./SelectInput.utils";
import { StyledInput, StyledInputControl } from "../Input.common";
import { commonInputStyles } from "../Input.styles";
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
import type { CommonInputStyleProps } from "../Input.types";
import type { TestIdProps } from "@types";

/**
 * An input that displays a list of options, and allows the user to select one.
 *
 * @version 0.0.3
 *
 * @param {SelectInputProps & TestIdProps} props - SelectInput component props
 * @returns {JSX.Element}
 */
const SelectInput = <
  TValue extends NullishPrimitives = NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  props: SelectInputProps<TValue, TExtraData> & TestIdProps
): JSX.Element => {
  const { options, mergedProps, refetchOptions } = useSelectOptions(props);

  const {
    displayOptions,
    setInternalValue,
    activeOption,
    autoCompleteQuery,
    setAutoCompleteQuery,
    isQuerying,
  } = useSelectValue(mergedProps, options, refetchOptions);
  const inputStyles = useInputStyles(mergedProps);

  const { placeholder, disabled, searchable } = mergedProps;

  const [isOpen, setIsOpen] = useState(false);

  const inputId = useId();

  const testId = useTestId("input-select", props);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const closeOptions = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsOpen(false);
  }, [inputRef]);

  const openOptions = useCallback(() => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (inputRef.current && searchable && isOpen) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, inputRef.current]);

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
    [disabled, isQuerying, setAutoCompleteQuery, closeOptions, setInternalValue]
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
      if ("id" in e.target && e.target.id === inputId) return;
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(e.target as HTMLElement)) return;

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

  const OptionComponent = useMemo(
    () => mergedProps.Option ?? null,
    [mergedProps]
  );

  const SelectedOptionComponent = useMemo(
    () => mergedProps.SelectedOption ?? null,
    [mergedProps]
  );

  const valueTextColor = useMemo(() => {
    return disabled ? "gray-700" : "gray-800";
  }, [disabled]);

  return (
    <SelectInputWrapper reverse ref={wrapperRef}>
      {isOpen && (
        <SelectOptionsContainer
          role="listbox"
          data-testid={`${testId}-options`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {displayOptions.map((optionOrGroup, index) =>
            isSelectOptionGroup<TValue, TExtraData>(optionOrGroup) ? (
              <SelectInputOptionGroup
                {...optionOrGroup}
                onSelectOption={selectOptionAndClose}
                key={`${optionOrGroup.label}-${index}`}
                Option={OptionComponent}
              />
            ) : (
              <SelectInputOption
                key={`${optionOrGroup.value}-${index}`}
                onSelect={selectOptionAndClose(optionOrGroup)}
                Option={OptionComponent}
                {...optionOrGroup}
              />
            )
          )}
        </SelectOptionsContainer>
      )}
      <SelectInputContainer
        {...inputStyles}
        data-testid={testId}
        aria-expanded={isOpen}
      >
        {mergedProps.searchable && isOpen ? (
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
            tabIndex={0}
          />
        ) : (
          <StyledSelectInput
            {...inputStyles}
            disabled={disabled}
            onClick={toggleOptionList}
            id={inputId}
            data-testid={`${testId}-button`}
            aria-expanded={isOpen}
            type="button"
            tabIndex={0}
          >
            {activeOption ? (
              SelectedOptionComponent ? (
                <CustomSelectedOptionContainer>
                  <SelectedOptionComponent {...activeOption} />
                </CustomSelectedOptionContainer>
              ) : (
                <SelectedOptionContainer>
                  {activeOption.icon && (
                    <Icon
                      name={activeOption.icon}
                      color={valueTextColor}
                      size="s-3"
                    />
                  )}
                  <Text weight="medium" color={valueTextColor} ellipsis>
                    {activeOption.label}
                  </Text>
                </SelectedOptionContainer>
              )
            ) : (
              <SelectedOptionContainer>
                <Text
                  weight="medium"
                  color="gray-400"
                  testId={`${testId}-placeholder`}
                  aria-placeholder={placeholder}
                  overrideTestId
                  ellipsis
                >
                  {placeholder}
                </Text>
              </SelectedOptionContainer>
            )}
          </StyledSelectInput>
        )}
        <StyledInputControl {...inputStyles} data-testid={`${testId}-control`}>
          <Icon name={mergedProps.controlIcon} />
        </StyledInputControl>
      </SelectInputContainer>
    </SelectInputWrapper>
  );
};

SelectInput.defaultProps = defaultSelectInputProps;

export { SelectInput };

const SelectInputWrapper = styled(FlexColumnLayout)`
  ${selectInputWrapperStyles}
`;

const SelectInputContainer = styled.div<CommonInputStyleProps>`
  ${selectInputContainerStyles}
`;

const SelectOptionsContainer = styled.div`
  ${selectOptionContainerStyles}
`;

const StyledSelectInput = styled.button<CommonInputStyleProps>`
  ${commonInputStyles}
  ${selectInputStyles}
`;

const SelectedOptionContainer = styled.div`
  ${selectInputStyles}
  padding: var(--s-2);
  padding-right: var(--s-8);
`;

const CustomSelectedOptionContainer = styled.div`
  ${selectInputStyles}
  padding-right: var(--s-6)
`;
