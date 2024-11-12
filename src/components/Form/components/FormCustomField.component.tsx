import { useMemo } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";
import { useFormContext } from "../Form.context";

import { FieldContainer } from "@/components/Field";
import { useFieldAssistiveText } from "@/components/Field/Field.utils";
import { Icon } from "@/components/Icon";
import { useInputId } from "@/components/Input";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel, InputLabelProps } from "@/components/InputLabel";
import { isEmptyString } from "@utils";

import type { BuiltFormCustomFieldProps } from "../Form.types";
import type { TooltipProps } from "@/components/Tooltip";
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

  const customFieldProps = useMemo(() => {
    const disabled = isEditing ? fieldProps.disabled : true;
    return {
      ...fieldProps,
      disabled,
      error,
      errorText,
    };
  }, [isEditing, fieldProps, error, errorText]);

  const errorTooltip = useMemo<Nullable<TooltipProps>>(() => {
    if (!error || !errorText || isEditing) return null;
    return {
      children: (
        <Icon name="ExclamationCircleFill" color="error-medium" size="s-4" />
      ),
      content: errorText,
    };
  }, [error, errorText, isEditing]);

  const inputLabelProps = useMemo<InputLabelProps>(() => {
    const required = isEditing ? customFieldProps.required : false;
    const tooltip = errorTooltip ?? customFieldProps.tooltip;
    return {
      ...customFieldProps,
      required,
      tooltip,
    };
  }, [isEditing, customFieldProps, errorTooltip]);

  const noLabel = useMemo(
    () => !fieldProps.label || isEmptyString(fieldProps.label),
    [fieldProps.label]
  );

  const inputId = useInputId(fieldProps);

  const fieldAssistiveText = useFieldAssistiveText(
    { assistiveText },
    customFieldProps.value
  );

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
        {noLabel ? (
          <CustomInput {...customFieldProps} id={inputId} />
        ) : (
          <InputLabel
            {...inputLabelProps}
            testId="field-label"
            overrideTestId
            htmlFor={inputId}
          >
            <CustomInput {...customFieldProps} id={inputId} />
          </InputLabel>
        )}
        {fieldAssistiveText.shouldDisplay && isEditing && (
          <InputAssistiveText
            assistiveText={fieldAssistiveText.assistiveText}
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
