import { useMemo } from "react";

import { SelectInput, type SelectInputProps } from "@/components/Input";
import { useUikitTranslation } from "@utils";

import type {
  BuiltFormTableCallbacks,
  FormTableSelectFooter,
} from "@/components/Form/Form.types";

type RowValue = Record<string, unknown>;

type FormTableFooterSelectProps = {
  footer: FormTableSelectFooter<RowValue>;
  disabled?: boolean;
} & Pick<BuiltFormTableCallbacks, "appendRow">;

export const FormTableFooterSelect = ({
  footer: { kind: _k, ...footerSelectProps },
  appendRow,
  disabled,
}: FormTableFooterSelectProps) => {
  const { action } = useUikitTranslation();
  const selectProps = useMemo<SelectInputProps<Partial<RowValue>>>(
    () => ({
      ...footerSelectProps,
      placeholder: footerSelectProps.placeholder ?? action.selectItem(),
      onChange: (value) => {
        if (!value) return;

        appendRow(value);
      },
      disabled,
    }),
    [appendRow, disabled, footerSelectProps, action]
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
