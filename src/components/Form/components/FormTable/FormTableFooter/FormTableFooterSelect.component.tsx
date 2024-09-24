import { isArray, isNull, isObject } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import {
  FilterSelectOptionFn,
  SelectInput,
  type SelectInputProps,
} from "@/components/Input";
import { useUikitTranslation } from "@utils";

import type {
  BuiltFormTableCallbacks,
  FormTableSelectFooter,
} from "@/components/Form/Form.types";

type RowValue = Record<string, unknown>;

type FormTableFooterSelectProps = {
  footer: FormTableSelectFooter<RowValue>;
  tableData: RowValue[];
  disabled?: boolean;
} & Pick<BuiltFormTableCallbacks, "appendRow">;

export const FormTableFooterSelect = ({
  footer: { kind: _k, unique, filterOption, ...footerSelectProps },
  tableData,
  appendRow,
  disabled,
}: FormTableFooterSelectProps) => {
  const { action } = useUikitTranslation();

  /**
   * Filters out options which values are already contained in a table row.
   *
   * @see {FilterSelectOptionFn}
   */
  const filterOptionBasedOnValue = useCallback<
    FilterSelectOptionFn<Partial<RowValue>>
  >(
    (option) => {
      if (!isArray(unique) || !unique.length) return true;
      const optionValue = option.value;
      if (!optionValue || isNull(optionValue)) return true;
      if (!isObject(optionValue)) return false;
      return !unique.some((key) => {
        if (!(key in optionValue) || !optionValue[key]) return false;
        return tableData.some((rowValue) => rowValue[key] === optionValue[key]);
      });
    },
    [tableData, unique]
  );

  /**
   * Filters out options based on provided filterOption prop and table data.
   *
   * @see {@link FilterSelectOptionFn}, {@link filterOptionBasedOnValue}
   */
  const filterSelectOption = useCallback<
    FilterSelectOptionFn<Partial<RowValue>>
  >(
    (option) => {
      const externalFilter = filterOption ? filterOption(option) : true;
      return externalFilter && filterOptionBasedOnValue(option);
    },
    [filterOption, filterOptionBasedOnValue]
  );

  const selectProps = useMemo<SelectInputProps<Partial<RowValue>>>(
    () => ({
      ...footerSelectProps,
      placeholder: footerSelectProps.placeholder ?? action.selectItem(),
      onChange: (value) => {
        if (!value) return;

        appendRow(value);
      },
      filterOption: filterSelectOption,
      disabled,
    }),
    [footerSelectProps, action, filterSelectOption, disabled, appendRow]
  );

  return (
    <SelectInput
      {...selectProps}
      name="form-table-footer-select"
      testId="form-table-footer-select"
      overrideTestId
    />
  );
};
