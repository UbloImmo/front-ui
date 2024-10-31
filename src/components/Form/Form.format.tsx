import {
  isArray,
  isNullish,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { type FC, type ReactNode } from "react";
import styled from "styled-components";

import { Badge } from "../Badge";
import { Text } from "../Text";
import { FieldSkeleton } from "./components/FieldSkeleton.component";
import { scaleNumber } from "../Input/NumberInput/NumberInput.utils";

import { ComboBox } from "@/components/ComboBox";
import { IconPickerItem } from "@/components/IconPicker/components/IconPickerItem/IconPickerItem.component";
import { formatCurrencyInt } from "@/components/Input/CurrencyInput/CurrencyInput.utils";
import { normalizeToDate } from "@/components/Input/DateInput/DateInput.utils";
import { useSelectOptions } from "@/components/Input/SelectInput/SelectInput.utils";
import { breakpointsPx } from "@/sizes";
import { FlexLayout, FlexRowLayout } from "@layouts";
import { arrayOf, isEmptyString } from "@utils";

import type {
  FormDisplayValueFormatterFn,
  FormDisplayValueFormatterMap,
} from "./Form.types";
import type { NumberInputProps } from "../Input/NumberInput/NumberInput.types";
import type {
  InputType,
  InputValue,
  SelectInputProps,
  SpecificInputProps,
  MultiSelectInputProps,
  SearchInputProps,
} from "@/components/Input";

const noValue = "—";

/**
 * Displays the selected value for a select input field.
 *
 * @param {Object} params - The parameters for the component.
 * @param {NullishPrimitives} params.fieldValue - The current value of the select field.
 * @param {Object} params.props - The props for the select input.
 * @param {Array} params.props.options - The options for the select input.
 * @param {Function} [params.props.SelectedOption] - Optional custom component to render the selected option.
 * @param {boolean} params.props.disabled - Whether the select input is disabled.
 * @param {Function} [params.props.filterOption] - Optional function to filter the options.
 * @returns {ReactNode} The rendered display of the selected value.
 */
const DisplaySelectValue = ({
  fieldValue,
  props: { options, SelectedOption, disabled, filterOption },
}: {
  fieldValue: NullishPrimitives;
  props: SelectInputProps<NullishPrimitives>;
}): ReactNode => {
  const { flattenedOptions, isLoading } = useSelectOptions({
    options,
    filterOption,
  });
  if (!fieldValue) return noValue;
  if (isLoading) return <FieldSkeleton />;
  const option =
    flattenedOptions.find(({ value }) => value === fieldValue) ?? null;

  const optionValue = option?.value ?? fieldValue;

  if (!optionValue) return noValue;

  if (SelectedOption)
    return <SelectedOption value={optionValue} disabled={disabled} />;

  return <FormFieldDisplayValue value={option?.label ?? String(optionValue)} />;
};

/**
 * A {@link FormDisplayValueFormatterFn} that displays an `combobox` field's value.
 *
 * @param {InputValue} fieldValue - The value of the field to display.
 * @param {{ options: SelectOptionOrGroup[], direction: "row" | "column", columns: number | null }}
 *   props - The props object containing the options, the direction
 *   of the combobox (either "row" or "column"), and the number of
 *   columns (or null if the direction is "row").
 * @returns {ReactNode} A ReactNode that displays the label of the
 *   corresponding option, or the value itself if no option matches.
 */
const displayComboBoxValue: FormDisplayValueFormatterFn<
  "combobox",
  ReactNode
> = (values, { options, direction, columns }) => {
  const commonProps = {
    direction,
    columns,
    readonly: true,
    showIcon: false,
  };
  if (isNullish(values) || !options) return noValue;
  if (isArray(values)) {
    const displayOptions = options
      .filter(({ value }) => values.includes(value))
      .map((option) => ({
        ...option,
        editable: false,
        deletable: false,
      }));
    if (!displayOptions?.length) return noValue;
    return <ComboBox {...commonProps} options={displayOptions} />;
  }
  const option = options.find(({ value }) => value === values);
  if (!option) return noValue;
  return <ComboBox {...commonProps} options={[option]} />;
};

/**
 * A {@link FormDisplayValueFormatterFn} that displays an `date` field's value.
 *
 * @param {InputValue} value - The value of the field to display.
 * @returns {string} A string representation of the date
 *   (e.g. "2022-01-01"), or "Invalid date" if the value is invalid.
 */
const displayDateValue: FormDisplayValueFormatterFn<"date"> = (value) => {
  const date = normalizeToDate(value);
  if (date) return date.toLocaleDateString();
  return "Invalid date";
};

/**
 * A {@link FormDisplayValueFormatterFn} that displays an `password` field's value.
 *
 * @param {InputValue} value - The value of the field to display.
 * @returns {string} A string representation of the password
 *   (e.g. "********"), or an empty string if the value is invalid.
 */
const displayPasswordValue: FormDisplayValueFormatterFn<"password"> = (value) =>
  arrayOf(value.length, () => "*").join("");

/**
 * A {@link FormDisplayValueFormatterFn} that displays an `icon-picker` field's value.
 *
 * @param {InputValue} value - The value of the field to display.
 * @returns {ReactNode} An icon picker item component with the given value
 *   and the active and readonly props set to true. If the value is invalid,
 *   an empty string is returned.
 */
const displayIconPickerValue: FormDisplayValueFormatterFn<
  "icon-picker",
  ReactNode
> = (value) => {
  if (!value) return noValue;

  return <IconPickerItem name={value} active readonly />;
};

const DisplaySearchValue = ({
  fieldValue,
  props: { disabled, SelectedOption, results },
}: {
  fieldValue: NullishPrimitives;
  props: SearchInputProps<NullishPrimitives>;
}) => {
  const { flattenedOptions, isLoading } = useSelectOptions({
    options: results ?? undefined,
    filterOption: null,
  });
  if (!fieldValue) return <FormFieldDisplayValue value={noValue} />;
  if (isLoading) return <FieldSkeleton />;

  const result =
    flattenedOptions.find(({ value }) => value === fieldValue) ?? null;
  const resultValue = result?.value ?? fieldValue;

  if (!resultValue) return <FormFieldDisplayValue value={noValue} />;

  if (SelectedOption)
    return <SelectedOption value={resultValue} disabled={disabled} />;

  return <FormFieldDisplayValue value={result?.label ?? String(resultValue)} />;
};

/**
 * Displays the selected values for a multi-select input field.
 *
 * @param {Object} props - The component props.
 * @param {NullishPrimitives[]} props.fieldValue - The array of selected values.
 * @param {Object} props.props - The props passed to the MultiSelectInput component.
 * @param {MultiSelectInputProps<NullishPrimitives>['options']} props.props.options - The options for the multi-select input.
 * @returns {ReactNode} A FlexRowLayout of Badge components for each selected option, or a no-value placeholder.
 */
const DisplayMultiSelectValue = ({
  fieldValue,
  props: { options },
}: {
  fieldValue: NullishPrimitives[];
  props: MultiSelectInputProps<NullishPrimitives>;
}): ReactNode => {
  const { flattenedOptions, isLoading } = useSelectOptions({
    options,
    filterOption: null,
  });
  if (!fieldValue) return <FormFieldDisplayValue value={noValue} />;
  if (isLoading) return <FieldSkeleton />;
  const activeOptions = flattenedOptions.filter(({ value }) =>
    fieldValue.includes(value)
  );

  return (
    <FlexRowLayout wrap fill gap="s-1" align="center">
      {activeOptions.map(({ label, value, icon }) => (
        <Badge
          key={`multi-select-badge-${value}`}
          icon={icon}
          label={label}
          color="primary"
        />
      ))}
    </FlexRowLayout>
  );
};

/**
 * Formats a number value according to the provided NumberInputProps.
 *
 * @param {number} value - The number to be formatted.
 * @param {NumberInputProps} props - The props object containing formatting options.
 * @returns {string} The formatted number as a string.
 */
const formatNumberValue = (value: number, props: NumberInputProps) => {
  const safeScale = Math.max(props.scale ?? 0, 0);
  const inverseScaled = scaleNumber(value, -safeScale, props.precision);
  if (!inverseScaled) return noValue;
  const finalNumber = safeScale
    ? inverseScaled.toFixed(safeScale)
    : inverseScaled;

  const numberStr = String(finalNumber);
  const [intStr, decimalStr] = numberStr.split(/[.,]/g);
  let i = 0;
  const intStrWithSpaces = intStr
    .split("")
    .reverse()
    .map((digit, index) => {
      i++;
      if (i % 3 === 0 && index !== 0) {
        return ` ${digit}`;
      }
      return digit;
    })
    .reverse()
    .join("");

  if (!decimalStr?.length) return intStrWithSpaces.trim();
  let flag = false;
  const trimmedDecimalStr = decimalStr
    .slice(0, safeScale)
    .trim()
    .split("")
    .reverse()
    .reduce((acc, char) => {
      if (char !== "0" || flag) {
        flag = true;
        return `${char}${acc}`;
      }
      return acc;
    }, "");
  return [intStrWithSpaces, trimmedDecimalStr]
    .filter((str) => !isEmptyString(str))
    .join(",")
    .trim();
};

const valueFormatters: FormDisplayValueFormatterMap<ReactNode | FC> = {
  text: String,
  number: formatNumberValue,
  email: String,
  currency: formatCurrencyInt,
  password: displayPasswordValue,
  phone: String,
  textarea: String,
  select: (fieldValue, props) => () =>
    <DisplaySelectValue fieldValue={fieldValue} props={props} />,
  date: displayDateValue,
  combobox: displayComboBoxValue,
  "icon-picker": displayIconPickerValue,
  search: (fieldValue, props) => () =>
    <DisplaySearchValue fieldValue={fieldValue} props={props} />,
  "search-text": String,
  "multi-select": (fieldValue, props) => () =>
    <DisplayMultiSelectValue fieldValue={fieldValue} props={props} />,
};

/**
 * Compute the display content for a form field given its type and props.
 *
 * @example
 * const props = {
 *   type: "text",
 *   value: "Hello world!",
 * };
 *
 * const displayContent = computeFieldDisplayContent(props.type, props);
 * // displayContent is "Hello world!"
 *
 * @param {TType} type - The type of the form field.
 * @param {SpecificInputProps<TType>} props - The props of the form field.
 * @returns {ReactNode | FC} The computed display content or a component that, upon rendererd, displays the field's value.
 */
export const computeFieldDisplayContent = <TType extends InputType>(
  type: TType,
  props: SpecificInputProps<TType>
): ReactNode | FC => {
  return isNullish(props.value)
    ? noValue
    : valueFormatters[type](props.value as InputValue<TType>, props);
};

/**
 * A component that displays a form field's value in a Text component.
 *
 * @param {{ value: string }} props - The props of the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormFieldDisplayValue = ({ value }: { value: string }) => {
  return (
    <FieldDisplayValueContainer justify="start" align="center">
      <Text color="gray-800" weight="medium">
        {value}
      </Text>
    </FieldDisplayValueContainer>
  );
};

const FieldDisplayValueContainer = styled(FlexLayout)`
  --container-height: var(--s-8);
  --container-height-mobile: calc(var(--container-height) + var(--s-2));

  td:has(&) & {
    --container-height: var(--s-6);
  }
  max-height: var(--container-height);
  height: var(--container-height);
  min-height: var(--container-height);

  @media screen and (max-width: ${breakpointsPx.XS}) {
    max-height: var(--container-height-mobile);
    height: var(--container-height-mobile);
    min-height: var(--container-height-mobile);
  }
`;
