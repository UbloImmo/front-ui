import { type GenericFn, isFunction } from "@ubloimmo/front-util";
import { type ReactNode, useCallback, useMemo } from "react";

import styles from "../FormTableField.module.scss";

import { Button } from "@/components/Button";
import { useCssClasses, useUikitTranslation } from "@utils";

import type {
  AnyTableRow,
  FormTableFieldFooterButtonProps,
} from "./FormTableFieldFooter.types";
import type { IconName } from "@/components/Icon";

/**
 * Renders a button inside a Form table field's footer
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldFooterButtonProps} props - Component props
 * @returns {ReactNode} - Footer button
 */
export function FormTableFieldFooterButton({
  footer: { kind: _k, newRow, ...buttonProps },
  appendRow,
  disabled,
}: FormTableFieldFooterButtonProps): ReactNode {
  const tl = useUikitTranslation();
  const onButtonClick = useCallback(() => {
    const rowToAppend: Partial<AnyTableRow> = isFunction<
      GenericFn<[], Partial<AnyTableRow>>
    >(newRow)
      ? newRow()
      : (newRow ?? {});

    appendRow(rowToAppend);
  }, [newRow, appendRow]);

  const label = useMemo(
    () => buttonProps.label ?? tl.action.addItem(),
    [buttonProps.label, tl]
  );

  const icon = useMemo<IconName>(
    () => buttonProps.icon ?? "PlusCircle",
    [buttonProps.icon]
  );

  const className = useCssClasses(styles["footer-button"]);

  return (
    <Button
      className={className}
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
}
