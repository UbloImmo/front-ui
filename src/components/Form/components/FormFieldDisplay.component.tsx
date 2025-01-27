import { isFunction, isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo, type FC } from "react";
import styled from "styled-components";

import {
  computeFieldDisplayContent,
  FormFieldDisplayValue,
} from "../Form.format";

import { Icon } from "@/components/Icon";
import { InputLabel } from "@/components/InputLabel";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";

import type { BuiltFieldProps } from "../Form.types";
import type { InputType } from "@/components/Input";
import type { TooltipProps } from "@/components/Tooltip";

/**
 * Renders a form field's display value and read-mode label
 *
 * @template {TType extends InputType} TType - The type of the {@link FormFieldProps}'s `type` property
 *
 * @param {BuiltFieldProps<TType>} props - The {@link BuiltFieldProps} object
 * @returns {JSX.Element} The {@link FieldDisplayContainer} containing the field's display value
 */
export const FormFieldDisplay = <TType extends InputType>(
  props: BuiltFieldProps<TType>,
): JSX.Element => {
  const { label, type, error, errorText } = props;
  const displayContent = useMemo(() => {
    const content = computeFieldDisplayContent(type, props);
    if (isString(content)) return <FormFieldDisplayValue value={content} />;
    if (isFunction<FC>(content)) {
      const DisplayContent = content;
      return <DisplayContent />;
    }

    return content;
  }, [props, type]);

  const errorTooltip = useMemo<Nullable<TooltipProps>>(() => {
    if (!error || !errorText) return null;
    return {
      children: (
        <Icon name="ExclamationCircleFill" color="error-medium" size="s-4" />
      ),
      content: errorText,
    };
  }, [error, errorText]);

  return (
    <FieldDisplayContainer
      testId="form-field-display"
      overrideTestId
      gap="s-2"
      fill
      id={props.id}
    >
      <InputLabel
        label={label}
        required={false}
        testId="form-field-display-label"
        overrideTestId
        tooltip={errorTooltip}
        compact
      />
      <FlexRowLayout
        fill
        align="center"
        justify="start"
        gap="s-2"
        testId="form-field-display-value"
      >
        {displayContent}
      </FlexRowLayout>
    </FieldDisplayContainer>
  );
};

const FieldDisplayContainer = styled(FlexColumnLayout)`
  input,
  textarea,
  select,
  label {
    width: 100%;
  }
`;
