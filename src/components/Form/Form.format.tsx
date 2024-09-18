import { isArray, isNullish } from "@ubloimmo/front-util";
import { type ReactNode } from "react";

import { ComboBox } from "@/components/ComboBox";
import { IconPickerItem } from "@/components/IconPicker/components/IconPickerItem/IconPickerItem.component";
import { formatCurrencyInt } from "@/components/Input/CurrencyInput/CurrencyInput.utils";
import { normalizeToDate } from "@/components/Input/DateInput/DateInput.utils";
import { flattenSelectOptions } from "@/components/Input/SelectInput/SelectInput.utils";
import { arrayOf } from "@utils";

import type {
  FormDisplayValueFormatterFn,
  FormDisplayValueFormatterMap,
} from "./Form.types";
import type {
  InputType,
  InputValue,
  SpecificInputProps,
} from "@/components/Input";

const noValue = "—";

/**
 * A {@link FormDisplayValueFormatterFn} that displays an `select` field's value.
 *
 * @param {InputValue} fieldValue - The value of the field to display.
 * @param {{ options: SelectOptionOrGroup[], SelectedOption: ReactNode, disabled: boolean }}
 *   props - The props object containing the options, the SelectedOption
 *   component, and the disabled status.
 * @returns {ReactNode} A ReactNode that displays the label of the
 *   corresponding option, or the value itself if no option matches.
 */
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

/**
 * A {@link FormDisplayValueFormatterFn} that displays a `search` field's value.
 *
 * @param {InputValue} fieldValue - The value of the field to display.
 * @param {{ disabled: boolean, SelectedOption: ReactNode }} props - An object containing the disabled status and the SelectedOption component.
 * @returns {ReactNode} If the value is invalid, an empty string is returned. If the SelectedOption is not provided, the value is returned as a string. Otherwise, the SelectedOption is rendered with the value and the disabled prop set to true.
 */
const displaySearchValue: FormDisplayValueFormatterFn<"search", ReactNode> = (
  fieldValue,
  { disabled, SelectedOption }
) => {
  if (!fieldValue) return noValue;
  if (!SelectedOption) return String(fieldValue);
  return <SelectedOption value={fieldValue} disabled={disabled} />;
};

const valueFormatters: FormDisplayValueFormatterMap<ReactNode> = {
  text: String,
  number: String,
  email: String,
  currency: formatCurrencyInt,
  password: displayPasswordValue,
  phone: String,
  textarea: String,
  select: displaySelectValue,
  date: displayDateValue,
  combobox: displayComboBoxValue,
  "icon-picker": displayIconPickerValue,
  search: displaySearchValue,
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
 * @returns {ReactNode} The computed display content.
 */
export const computeFieldDisplayContent = <TType extends InputType>(
  type: TType,
  props: SpecificInputProps<TType>
): ReactNode => {
  const content: ReactNode = !isNullish(props.value)
    ? valueFormatters[type](props.value as InputValue<TType>, props)
    : noValue;
  return content;
};
