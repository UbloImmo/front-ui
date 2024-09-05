import { isFunction } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { useFieldValidity } from "./Field.utils";
import { NativeInputOnChangeFn, useInputId } from "../Input";
import { defaultCommonInputProps } from "../Input/Input.common";
import { Input } from "../Input/Input.component";
import { inputTypes } from "../Input/Input.data";
import { InputAssistiveText } from "../InputAssistiveText";
import { InputLabel } from "../InputLabel";

import { FlexColumnLayout } from "@layouts";
import { useLogger, useTestId, useMergedProps, useClassName } from "@utils";

import type { FieldProps, FieldDefaultProps } from "./Field.types";
import type { InputType } from "../Input/Input.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultFieldProps: FieldDefaultProps<InputType> = {
  type: "text",
  ...defaultCommonInputProps,
  ...InputLabel.defaultProps,
  ...InputAssistiveText.defaultProps,
  label: "[Field label]",
  placeholder: "[Field placeholder]",
  assistiveText: null,
  value: null,
  onChange: null,
  className: null,
  name: null,
};

/**
 * A grouping of InputLabel, Input and InputAssistiveText elements.
 *
 * @version 0.0.6
 *
 * @param {FieldProps<TType> & TestIdProps} props - Field component props
 * @returns {Nullable<JSX.Element>}
 */
const Field = <TType extends InputType>(
  props: FieldProps<TType> & TestIdProps
): Nullable<JSX.Element> => {
  const logger = useLogger("Field");

  const mergedProps: FieldDefaultProps<InputType> = useMergedProps<
    FieldDefaultProps<InputType>,
    Partial<FieldDefaultProps<InputType>>
  >(defaultFieldProps, props as Partial<FieldDefaultProps<InputType>>);

  const testId = useTestId("field", props);
  const className = useClassName(mergedProps);

  const inputId = useInputId(props);
  const labelHtmlFor = useMemo(() => {
    if (["icon-picker", "combobox"].includes(mergedProps.type)) {
      return null;
    }
    return inputId;
  }, [mergedProps.type, inputId]);

  const { errorText, error, setValidityState } = useFieldValidity(mergedProps);

  /**
   * Native input on change middleware that updates the validity state
   */
  const updateValidityOnChange = useCallback<NativeInputOnChangeFn>(
    (event) => {
      setValidityState(event.target.validity);
      if (isFunction<NativeInputOnChangeFn>(mergedProps.onChangeNative)) {
        mergedProps.onChangeNative(event);
      }
    },
    [mergedProps, setValidityState]
  );

  const shoulDisplayAssistiveText = useMemo(() => {
    return !!(mergedProps.assistiveText || (errorText && error));
  }, [mergedProps, errorText, error]);

  if (!mergedProps.type || !inputTypes?.includes(mergedProps.type)) {
    logger.error(`Invalid type (${mergedProps.type}) provided.`);
    return null;
  }

  return (
    <FieldContainer
      testId={testId}
      overrideTestId
      data-field-type={mergedProps.type}
      className={className}
      gap="s-1"
    >
      <InputLabel
        {...mergedProps}
        testId="field-label"
        overrideTestId
        htmlFor={labelHtmlFor}
      >
        <Input
          {...mergedProps}
          id={inputId}
          testId="field-input"
          onChangeNative={updateValidityOnChange}
          error={error}
        />
      </InputLabel>
      {shoulDisplayAssistiveText && (
        <InputAssistiveText
          assistiveText={mergedProps.assistiveText}
          errorText={errorText}
          error={error}
          testId="field-assistive-text"
          overrideTestId
        />
      )}
    </FieldContainer>
  );
};
Field.defaultProps = defaultFieldProps;

export { Field };

export const FieldContainer = styled(FlexColumnLayout)`
  input,
  textarea,
  select,
  label {
    width: 100%;
  }
`;
