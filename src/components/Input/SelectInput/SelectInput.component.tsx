import { NullishPrimitives } from "@ubloimmo/front-util";
import styled from "styled-components";

import { StyledInputControl, defaultCommonInputProps } from "../Input.common";
import { commonInputContainerStyles, commonInputStyles } from "../Input.styles";
import { CommonInputStyleProps } from "../Input.types";
import { useInputStyles } from "../Input.utils";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useMergedProps, useTestId } from "@utils";

import type {
  SelectInputProps,
  DefaultSelectInputProps,
} from "./SelectInput.types";
import type { TestIdProps } from "@types";

const defaultSelectInputProps: DefaultSelectInputProps<NullishPrimitives> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  options: [],
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
  const { value, placeholder, disabled } = mergedProps;
  const testId = useTestId("input-select", props);

  return (
    <>
      <SelectInputContainer
        {...inputStyles}
        data-testid={testId}
        role="listbox"
      >
        <StyledSelectInput {...inputStyles} disabled={disabled}>
          {value ? <Text>{value}</Text> : <Text>{placeholder}</Text>}
        </StyledSelectInput>
        <StyledInputControl {...inputStyles}>
          <Icon name="CaretDownFill" />
        </StyledInputControl>
      </SelectInputContainer>
      <div>
        <option>Option value 1</option>
        <option>Option value 2</option>
        <option>Option value 3</option>
      </div>
    </>
  );
};

SelectInput.defaultProps =
  defaultSelectInputProps as DefaultSelectInputProps<NullishPrimitives>;

export { SelectInput };

const SelectInputContainer = styled.div<CommonInputStyleProps>`
  ${commonInputContainerStyles}
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledSelectInput = styled.button<CommonInputStyleProps>`
  ${commonInputStyles}
  cursor: pointer;
  text-align: left;

  &:disabled {
    cursor: not-allowed;
  }
`;
