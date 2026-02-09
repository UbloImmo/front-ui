import { isString } from "@ubloimmo/front-util";

import {
  defaultCommonInputProps,
  StyledInput,
  StyledInputContainer,
  StyledInputControl,
} from "../Input.common";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { Icon } from "@/components/Icon";
import { useTestId, useMergedProps, useHtmlAttribute } from "@utils";

import type {
  DefaultSearchTextInputProps,
  SearchTextInputProps,
} from "./SearchTextInput.types";
import type { TestIdProps } from "@types";

const defaultSearchTextInputProps: DefaultSearchTextInputProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  controlIcon: "Search",
};

/**
 * Renders a text input component with a search icon.
 *
 * @version 0.1.0
 *
 * @param {SearchTextInputProps} props - SearchTextInput component props
 * @returns {JSX.Element}
 */
const SearchTextInput = (
  props: SearchTextInputProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultSearchTextInputProps, props);

  const onChange = useInputOnChange<"search-text">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const value = useInputValue<"search-text">(mergedProps.value, props);

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-search-text", props);

  const { forwardRef } = useInputRef(mergedProps);

  const onBlur = useHtmlAttribute(mergedProps.onBlur);
  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const id = useInputId(mergedProps);

  return (
    <StyledInputContainer {...inputStyles} data-testid={`${testId}-container`}>
      <StyledInput
        data-testid={testId}
        value={value}
        type="text"
        role="searchbox"
        onChange={onChange}
        onBlur={onBlur}
        required={mergedProps.required}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        ref={forwardRef}
        autoComplete={autoComplete}
        id={id}
        {...inputStyles}
      />
      <StyledInputControl {...inputStyles} data-testid={`${testId}-control`}>
        <Icon name={mergedProps.controlIcon} />
      </StyledInputControl>
    </StyledInputContainer>
  );
};
SearchTextInput.__DEFAULT_PROPS = defaultSearchTextInputProps;

export { SearchTextInput };
