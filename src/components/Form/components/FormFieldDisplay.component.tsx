import { isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { computeFieldDisplayContent } from "../Form.format";

import { Icon } from "@/components/Icon";
import { InputLabel } from "@/components/InputLabel";
import { Text } from "@/components/Text";
import { breakpointsPx } from "@/sizes";
import { FlexColumnLayout, FlexLayout, FlexRowLayout } from "@layouts";

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
  props: BuiltFieldProps<TType>
): JSX.Element => {
  const { label, type, error, errorText } = props;
  const displayContent = useMemo(() => {
    const content = computeFieldDisplayContent(type, props);
    if (isString(content)) return <FormFieldDisplayValue value={content} />;

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

/**
 * A component that displays a form field's value in a Text component.
 *
 * @param {{ value: string }} props - The props of the component.
 * @returns {JSX.Element} The rendered component.
 */
const FormFieldDisplayValue = ({ value }: { value: string }) => {
  return (
    <FieldDisplayValueContainer justify="start" align="center">
      <Text color="gray-800" weight="medium">
        {value}
      </Text>
    </FieldDisplayValueContainer>
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

const FieldDisplayValueContainer = styled(FlexLayout)`
  max-height: var(--s-8);
  height: var(--s-8);
  min-height: var(--s-8);

  @media screen and (max-width: ${breakpointsPx.XS}) {
    max-height: var(--s-10);
    height: var(--s-10);
    min-height: var(--s-10);
  }
`;
