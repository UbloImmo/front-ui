import {
  isArray,
  isNullish,
  isString,
  type Nullable,
} from "@ubloimmo/front-util";
import { useMemo, type ReactNode } from "react";
import styled from "styled-components";

import { ComboBox } from "@/components/ComboBox";
import { Icon } from "@/components/Icon";
import { IconPickerItem } from "@/components/IconPicker/components/IconPickerItem/IconPickerItem.component";
import { formatCurrencyInt } from "@/components/Input/CurrencyInput/CurrencyInput.utils";
import { normalizeToDate } from "@/components/Input/DateInput/DateInput.utils";
import { flattenSelectOptions } from "@/components/Input/SelectInput/SelectInput.utils";
import { InputLabel } from "@/components/InputLabel";
import { Text } from "@/components/Text";
import { breakpointsPx } from "@/sizes";
import { FlexColumnLayout, FlexLayout, FlexRowLayout } from "@layouts";
import { arrayOf } from "@utils";

import type {
  BuiltFieldProps,
  FormDisplayValueFormatterFn,
  FormDisplayValueFormatterMap,
} from "../Form.types";
import type { InputType, InputValue } from "@/components/Input";
import type { TooltipProps } from "@/components/Tooltip";

const noValue = "—";

const displaySelectValue: FormDisplayValueFormatterFn<"select", ReactNode> = (
  fieldValue,
  { options, SelectedOption, disabled }
) => {
  const option = isArray(options)
    ? flattenSelectOptions(options).find(({ value }) => value === fieldValue) ??
      null
    : null;

  const optionValue = option?.value ?? fieldValue;

  if (!optionValue) return noValue;

  if (SelectedOption)
    return <SelectedOption value={optionValue} disabled={disabled} />;

  return option?.label ?? String(fieldValue);
};

const valueFormatters: FormDisplayValueFormatterMap<ReactNode> = {
  text: String,
  number: String,
  email: String,
  currency: formatCurrencyInt,
  password: (value) => arrayOf(value.length, () => "*").join(""),
  phone: String,
  textarea: String,
  select: displaySelectValue,
  date: (value) => {
    const date = normalizeToDate(value);
    if (date) return date.toLocaleDateString();
    return "Invalid date";
  },
  combobox: (values, { options, direction, columns }) => {
    const commonProps = {
      direction,
      columns,
      readonly: true,
      showIcon: false,
    };
    if (isNullish(values) || !options) return noValue;
    if (isArray(values)) {
      const displayOptions = options.filter(({ value }) =>
        values.includes(value)
      );
      if (!displayOptions?.length) return noValue;
      return <ComboBox {...commonProps} options={displayOptions} />;
    }
    const option = options.find(({ value }) => value === values);
    if (!option) return noValue;
    return <ComboBox {...commonProps} options={[option]} />;
  },
  "icon-picker": (value) => {
    if (!value) return noValue;

    return <IconPickerItem name={value} active readonly />;
  },
  search: (fieldValue, { disabled, SelectedOption }) => {
    if (!fieldValue) return noValue;
    if (!SelectedOption) return String(fieldValue);
    return <SelectedOption value={fieldValue} disabled={disabled} />;
  },
};

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
  const { label, value, type, error, errorText } = props;
  const displayContent = useMemo(() => {
    const content: ReactNode = !isNullish(value)
      ? valueFormatters[type](value as InputValue<TType>, props)
      : noValue;

    if (isString(content)) return <FormFieldDisplayValue value={content} />;
    return content;
  }, [value, props, type]);

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
