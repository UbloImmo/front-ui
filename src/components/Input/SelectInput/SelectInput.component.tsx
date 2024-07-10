import { NullishPrimitives } from "@ubloimmo/front-util";
import { useState } from "react";

import { SelectInputOption } from "./components/SelectInputOption.component";
import {
  SelectInputContainer,
  SelectOptionsContainer,
  StyledSelectInput,
} from "./SelectInput.styles";
import { StyledInputControl, defaultCommonInputProps } from "../Input.common";
import { useInputStyles, useInputValue } from "../Input.utils";

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
  options: [
    {
      label: "Option 1",
      value: "option-1",
    },
    {
      label: "Option 2",
      value: "option-2",
    },
    {
      label: "Option 3",
      value: "option-3",
    },
    {
      label: "Option 4",
      value: "option-4",
      disabled: true,
    },
    {
      label: "Option 5",
      value: "option-5",
    },
    {
      label: "Option 6",
      value: "option-6",
    },
  ],
  placeholder: "Select an option",
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
  const { value, placeholder, disabled, options } = mergedProps;

  const initializeValue = useInputValue(value);

  const [selectedOption, setSelectedOption] = useState(initializeValue);
  const [isOpen, setIsOpen] = useState(false);

  const testId = useTestId("input-select", props);

  const handleSelectOption = () => {};

  return (
    <>
      <SelectInputContainer {...inputStyles} data-testid={testId}>
        <StyledSelectInput
          {...inputStyles}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
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
            {options.map((option: SelectOption<TValue>) => (
              <SelectInputOption
                key={option.value}
                onClick={() => {
                  setIsOpen(false);
                  setSelectedOption(option.label);
                }}
                value={option.value}
                disabled={option.disabled}
                label={option.label}
              />
            ))}
          </SelectOptionsContainer>
        )}
      </SelectInputContainer>
    </>
  );
};

SelectInput.defaultProps =
  defaultSelectInputProps as DefaultSelectInputProps<NullishPrimitives>;

export { SelectInput };
