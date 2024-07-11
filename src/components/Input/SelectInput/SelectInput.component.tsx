import { NullishPrimitives } from "@ubloimmo/front-util";
import { useCallback, useState } from "react";

import { SelectInputOption } from "./components/SelectInputOption.component";
import {
  SelectInputContainer,
  SelectOptionsContainer,
  StyledSelectInput,
} from "./SelectInput.styles";
import { StyledInputControl, defaultCommonInputProps } from "../Input.common";
import { useInputStyles } from "../Input.utils";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useMergedProps, useTestId } from "@utils";

import type {
  SelectInputProps,
  DefaultSelectInputProps,
  SelectOption,
} from "./SelectInput.types";
import type { TestIdProps } from "@types";

const defaultSelectInputProps: DefaultSelectInputProps<NullishPrimitives> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  options: [],
  placeholder: "",
};

/**
 * SelectInput component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {SelectInputProps & TestIdProps} props - SelectInput component props
 * @returns {JSX.Element}
 */
const SelectInput = <TValue extends NullishPrimitives>(
  props: SelectInputProps<TValue> & TestIdProps
) => {
  const mergedProps = useMergedProps(defaultSelectInputProps, props);

  const inputStyles = useInputStyles(mergedProps);

  const { placeholder, disabled, options } = mergedProps;

  const [selectedOption, setSelectedOption] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);

  const testId = useTestId("input-select", props);

  const handleSelectOption = useCallback(
    (option: SelectOption<TValue>) => {
      return () => {
        if (disabled || option.disabled) return;
        setIsOpen(false);
        setSelectedOption(option.label as TValue);
      };
    },
    [disabled]
  );

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <SelectInputContainer {...inputStyles} data-testid={testId}>
        <StyledSelectInput
          {...inputStyles}
          disabled={disabled}
          onClick={handleToggle}
        >
          {selectedOption ? (
            <Text weight="medium">{selectedOption}</Text>
          ) : (
            <Text weight="medium" color="gray-400">
              {placeholder}
            </Text>
          )}
        </StyledSelectInput>
        <StyledInputControl {...inputStyles}>
          <Icon name="CaretDownFill" />
        </StyledInputControl>

        {isOpen && (
          <SelectOptionsContainer role="listbox">
            {(options as SelectOption<TValue>[]).map(
              (option: SelectOption<TValue>, index: number) => (
                <SelectInputOption
                  key={`${option.value}-${index}`}
                  onSelect={handleSelectOption(option)}
                  value={option.value}
                  disabled={option.disabled}
                  label={option.label}
                  active={selectedOption === option.label}
                  aria-selected={selectedOption === option.label}
                />
              )
            )}
          </SelectOptionsContainer>
        )}
      </SelectInputContainer>
    </>
  );
};

SelectInput.defaultProps =
  defaultSelectInputProps as DefaultSelectInputProps<NullishPrimitives>;

export { SelectInput };
