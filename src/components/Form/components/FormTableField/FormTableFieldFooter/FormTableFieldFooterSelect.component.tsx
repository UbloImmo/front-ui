import { isArray, isNull, isObject } from "@ubloimmo/front-util";
import { useCallback, useMemo, useState, type ReactNode } from "react";

import {
  type FilterSelectOptionFn,
  SelectInput,
  type SelectInputProps,
} from "@/components/Input";
import { useTestId, useUikitTranslation } from "@utils";

import type {
  AnyTableRow,
  FormTableFieldFooterSelectProps,
} from "./FormTableFieldFooter.types";

const SELECT_KEY_ROLLBACK_LIMIT = 100;

/**
 * Renders a select input inside a Form table field's footer
 *
 * @version 0.1.3
 *
 * @param {FormTableFieldFooterSelectProps} props - Component props
 * @returns {ReactNode} - Footer select input
 */
export function FormTableFieldFooterSelect({
  footer: { kind: _k, unique, filterOption, ...footerSelectProps },
  tableData,
  appendRow,
  disabled,
}: FormTableFieldFooterSelectProps): ReactNode {
  const { action } = useUikitTranslation();

  const [selectId, setSelectId] = useState(0);

  const selectKey = useMemo(
    () => `form-table-field-footer-select-${selectId}`,
    [selectId]
  );

  const rerenderSelect = useCallback(() => {
    setSelectId((prev) => {
      if (prev >= SELECT_KEY_ROLLBACK_LIMIT) return 0;
      return prev + 1;
    });
  }, []);

  /**
   * Filters out options which values are already contained in a table row.
   *
   * @see {FilterSelectOptionFn}
   */
  const filterOptionBasedOnValue = useCallback<
    FilterSelectOptionFn<Partial<AnyTableRow>>
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
    FilterSelectOptionFn<Partial<AnyTableRow>>
  >(
    (option) => {
      const externalFilter = filterOption ? filterOption(option) : true;
      return externalFilter && filterOptionBasedOnValue(option);
    },
    [filterOption, filterOptionBasedOnValue]
  );

  const selectProps = useMemo<SelectInputProps<Partial<AnyTableRow>>>(
    () => ({
      ...footerSelectProps,
      placeholder: footerSelectProps.placeholder ?? action.selectItem(),
      onChange: (value) => {
        if (!value) return;
        appendRow(value);
        rerenderSelect();
      },
      filterOption: filterSelectOption,
      disabled,
    }),
    [
      footerSelectProps,
      action,
      filterSelectOption,
      disabled,
      appendRow,
      rerenderSelect,
    ]
  );

  const testId = useTestId("form-table-footer-select", footerSelectProps);

  return (
    <SelectInput
      {...selectProps}
      name="form-table-footer-select"
      testId={testId}
      overrideTestId
      key={selectKey}
    />
  );
}
