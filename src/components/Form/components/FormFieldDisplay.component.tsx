import { isNullish, isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { formatCurrencyInt } from "@/components/Input/CurrencyInput/CurrencyInput.utils";
import { breakpointsPx } from "@/sizes";
import { FlexColumnLayout, FlexLayout, FlexRowLayout } from "@layouts";
import { arrayOf } from "@utils";

import { InputLabel, Icon, Text, type TooltipProps } from "@components";

import type {
  BuiltFieldProps,
  FormDisplayValueFormatterMap,
} from "../Form.types";
import type { InputType, InputValue } from "@/components/Input";

const valueFormatters: FormDisplayValueFormatterMap = {
  text: String,
  number: String,
  email: String,
  currency: formatCurrencyInt,
  password: (value) => arrayOf(value.length, () => "*").join(""),
  phone: String,
  textarea: String,
};

const noValue = "—";

export const FormFieldDisplay = <TType extends InputType>({
  label,
  value,
  type,
  error,
  errorText,
}: BuiltFieldProps<TType>) => {
  const displayContent = useMemo(() => {
    const content: JSX.Element | string = !isNullish(value)
      ? valueFormatters[type](value as InputValue<TType>)
      : noValue;

    if (isString(content)) return <FormFieldDisplayValue value={content} />;
    return content;
  }, [value, type]);

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

const FieldDisplayContainer = styled(FlexColumnLayout)`
  input,
  textarea,
  select,
  label {
    width: 100%;
  }
`;

const FormFieldDisplayValue = ({ value }: { value: string }) => {
  return (
    <FieldDisplayValueContainer justify="start" align="center">
      <Text color="gray-800" weight="medium">
        {value}
      </Text>
    </FieldDisplayValueContainer>
  );
};

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
