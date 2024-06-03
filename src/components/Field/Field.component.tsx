import { useMemo, type FC } from "react";
import styled from "styled-components";

import { defaultCommonInputProps } from "../Input/Input.common";
import { Input } from "../Input/Input.component";
import { inputTypes } from "../Input/Input.data";
import { InputAssistiveText } from "../InputAssistiveText";
import { InputLabel } from "../InputLabel";

import { FlexColumnLayout } from "@layouts";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useClassName,
  useStatic,
} from "@utils";

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
  assistiveText: "[Field assistive text]",
  value: null,
  onChange: null,
  className: null,
};

/**
 * A grouping of InputLabel, Input and InputAssistiveText elements.
 *
 * @version 0.0.1
 *
 * @param {FieldProps<TType> & TestIdProps} props - Field component props
 * @returns {Nullable<JSX.Element>}
 */
const Field = <TType extends InputType>(
  props: FieldProps<TType> & TestIdProps
): Nullable<JSX.Element> => {
  const { error } = useLogger("Field");

  const mergedProps: FieldDefaultProps<InputType> = useMergedProps<
    FieldDefaultProps<InputType>,
    Partial<FieldDefaultProps<InputType>>
  >(defaultFieldProps, props as Partial<FieldDefaultProps<InputType>>);

  const testId = useTestId("field", props);
  const className = useClassName(mergedProps);

  const displayAssistiveText = useMemo(() => {
    return !!(mergedProps.assistiveText || mergedProps.errorText);
  }, [mergedProps]);

  // cast in render needed to fix testing compilation errors
  const FieldInput = useStatic(
    () => Input as FC<FieldProps<InputType> & TestIdProps>
  );

  if (!mergedProps.type || !inputTypes?.includes(mergedProps.type)) {
    error(`Invalid type (${mergedProps.type}) provided.`);
    return null;
  }

  return (
    <FieldContainer
      testId={testId}
      data-field-type={mergedProps.type}
      className={className}
      gap="s-1"
    >
      <InputLabel {...mergedProps} testId="field-label">
        <FieldInput {...mergedProps} testId="field-input" />
      </InputLabel>
      {displayAssistiveText && <InputAssistiveText {...mergedProps} />}
    </FieldContainer>
  );
};
Field.defaultProps = defaultFieldProps;

export { Field };

const FieldContainer = styled(FlexColumnLayout)`
  input,
  textarea,
  select,
  label {
    width: 100%;
  }
`;
