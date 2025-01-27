import { isFunction, type GenericFn } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { Button } from "@/components/Button";
import { useUikitTranslation } from "@utils";

import type {
  BuiltFormTableCallbacks,
  FormTableButtonFooter,
} from "@/components/Form/Form.types";
import type { IconName } from "@/components/Icon";

type RowValue = Record<string, unknown>;

type FormTableFooterButtonProps = {
  footer: FormTableButtonFooter<RowValue>;
  disabled?: boolean;
} & Pick<BuiltFormTableCallbacks, "appendRow">;

export const FormTableFooterButton = ({
  footer: { kind: _k, newRow, ...buttonProps },
  appendRow,
  disabled,
}: FormTableFooterButtonProps) => {
  const tl = useUikitTranslation();
  const onButtonClick = useCallback(() => {
    const rowToAppend: Partial<RowValue> = isFunction<
      GenericFn<[], Partial<RowValue>>
    >(newRow)
      ? newRow()
      : (newRow ?? {});

    appendRow(rowToAppend);
  }, [newRow, appendRow]);

  const label = useMemo(
    () => buttonProps.label ?? tl.action.addItem(),
    [buttonProps.label, tl],
  );

  const icon = useMemo<IconName>(
    () => buttonProps.icon ?? "PlusCircle",
    [buttonProps.icon],
  );

  return (
    <FooterButton
      disabled={disabled}
      label={label}
      icon={icon}
      onClick={onButtonClick}
      testId="form-table-footer-button"
      overrideTestId
      fullWidth
      color="white"
    />
  );
};

const FooterButton = styled(Button)`
  border-radius: var(--s-05);
`;
