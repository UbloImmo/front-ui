import { useMemo } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";
import { useFormContext } from "../Form.context";

import { FieldContainer } from "@/components/Field";
import { useInputId } from "@/components/Input";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel } from "@/components/InputLabel";

import type { BuiltFormCustomFieldProps } from "../Form.types";

export const FormCustomField = (props: BuiltFormCustomFieldProps) => {
  const {
    CustomInput,
    layout,
    assistiveText,
    errorText,
    error,
    ...fieldProps
  } = props;

  const { isEditing } = useFormContext();

  const shoulDisplayAssistiveText = useMemo(() => {
    return isEditing && !!(assistiveText || (errorText && error));
  }, [isEditing, assistiveText, errorText, error]);

  const customFieldProps = useMemo(() => {
    const disabled = isEditing ? fieldProps.disabled : true;
    return {
      ...fieldProps,
      disabled,
      error,
    };
  }, [isEditing, fieldProps, error]);

  const inputId = useInputId(fieldProps);

  if (layout.hidden) return null;

  return (
    <FormFieldGridItem
      columnEnd={layout.columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FieldContainer
        testId="form-custom-field"
        overrideTestId
        data-field-type="custom"
        gap="s-1"
      >
        <InputLabel
          {...customFieldProps}
          testId="field-label"
          overrideTestId
          htmlFor={inputId}
        >
          <CustomInput {...customFieldProps} id={inputId} />
        </InputLabel>
        {shoulDisplayAssistiveText && (
          <InputAssistiveText
            assistiveText={assistiveText}
            errorText={errorText}
            error={error}
            testId="field-assistive-text"
            overrideTestId
          />
        )}
      </FieldContainer>
    </FormFieldGridItem>
  );
};
