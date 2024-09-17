import { useMemo } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";
import { useFormContext } from "../Form.context";

import { FieldContainer } from "@/components/Field";
import { useInputId } from "@/components/Input";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel } from "@/components/InputLabel";

import type { BuiltFormCustomFieldProps } from "../Form.types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * A form field that allows a custom form field component to be passed as a prop.
 *
 * The component renders the custom form field component with the provided props
 * and the form context's `error` and `isEditing` properties.
 *
 * The component also renders an {@link InputLabel} with the provided `label`
 * and an {@link InputAssistiveText} if the `assistiveText` prop is provided.
 *
 * The component uses the {@link useFormContext} hook to get the current form
 * context and the {@link useInputId} hook to get a unique id for the input.
 *
 * @param {BuiltFormCustomFieldProps} props - The component props.
 * @returns {Nullable<JSX.Element>} The rendered component.
 */
export const FormCustomField = (
  props: BuiltFormCustomFieldProps
): Nullable<JSX.Element> => {
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
