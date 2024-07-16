import { NullishPrimitives, isObject, isString } from "@ubloimmo/front-util";
import { useCallback, useId, useLayoutEffect, useState } from "react";

import { SelectInputOption } from "./components/SelectInputOption.component";
import {
  SelectInputContainer,
  SelectOptionsContainer,
  StyledSelectInput,
} from "./SelectInput.styles";
import {
  defaultSelectInputProps,
  isSelectOptionGroup,
  useSelectOptions,
  useSelectValue,
} from "./SelectInput.utils";
import { StyledInput, StyledInputControl } from "../Input.common";
import {
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useHtmlAttribute, useTestId } from "@utils";

import type { SelectInputProps, SelectOption } from "./SelectInput.types";
import type { TestIdProps } from "@types";

/**
 * An input that displays a list of options, and allows the user to select one.
 *
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
        closeOptions();
        setInternalValue(option.value);
      };
    },
    [closeOptions, disabled, setInternalValue]
  );

  const onQueryChange = useInputOnChange<"text">(
    () => searchable && !disabled,
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    setAutoCompleteQuery,
    mergedProps.onChangeNative
  );

  const query = useInputValue(autoCompleteQuery, props);

  const openOptionsOnFocus = useCallback(() => {
    if (disabled || !searchable) return;
    setIsOpen(true);
  }, [disabled, searchable]);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);

  useLayoutEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!e.target) return;
      if ("id" in e.target && e.target.id === inputId) return;

      if ("dataset" in e.target && isObject(e.target.dataset)) {
        if ("testid" in e.target.dataset) {
          if (
            // conteneur
            e.target.dataset.testid === testId ||
            // liste d'options
            e.target.dataset.testid === "input-select-options" ||
            // input lorsque searchable
            e.target.dataset.testid === "input-select-query" ||
            // option
            e.target.dataset.testid === "input-select-option" ||
            // control
            e.target.dataset.testid === "input-select-control"
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

  return (
    <SelectInputContainer {...inputStyles} data-testid={testId}>
      {mergedProps.searchable ? (
        <StyledInput
          {...inputStyles}
          value={query}
          onChange={onQueryChange}
          data-testid={"input-select-query"}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={openOptionsOnFocus}
          onBlur={onBlur}
          id={inputId}
          ref={forwardRef}
          autoComplete="none"
          onClick={toggleOptionList}
        />
      ) : (
        <StyledSelectInput
          {...inputStyles}
          disabled={disabled}
          onClick={toggleOptionList}
          id={inputId}
        >
          {activeOption ? (
            <Text weight="medium">{activeOption.label}</Text>
          ) : (
            <Text weight="medium" color="gray-400">
              {placeholder}
            </Text>
          )}
        </StyledSelectInput>
      )}
      <StyledInputControl
        {...inputStyles}
        data-testid={"input-select-control"}
        onClick={toggleOptionList}
      >
        <Icon name="CaretDownFill" />
      </StyledInputControl>

      {isOpen && (
        <SelectOptionsContainer
          role="listbox"
          data-testid="input-select-options"
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
    </SelectInputContainer>
  );
};

SelectInput.defaultProps = defaultSelectInputProps;

export { SelectInput };
