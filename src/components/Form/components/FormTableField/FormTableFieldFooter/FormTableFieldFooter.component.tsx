import { type ReactNode, useMemo } from "react";

import { FormTableFieldFooterButton } from "./FormTableFieldFooterButton.component";
import { FormTableFieldFooterSelect } from "./FormTableFieldFooterSelect.component";
import styles from "../FormTableField.module.scss";

import { useFormContext } from "@/components/Form/Form.context";
import { useLogger } from "@utils";

import type { FormTableFieldFooterProps } from "./FormTableFieldFooter.types";

/**
 * Renders the footer control matching `footer.kind` ("button" | "select" | "custom"),
 * logging an error and rendering nothing if `footer.kind` is unrecognized.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldFooterProps} - Component props
 * @returns {ReactNode} The table footer's content or null
 */
function FormTableFieldFooterContent({
  footer,
  appendRow,
  data,
}: FormTableFieldFooterProps): ReactNode {
  const { disabled } = useFormContext();
  const logger = useLogger("FormTableFieldFooter");

  const commonProps = useMemo(
    () => ({ appendRow, disabled }),
    [appendRow, disabled]
  );

  if (!footer?.kind) return null;

  switch (footer.kind) {
    case "button": {
      return <FormTableFieldFooterButton footer={footer} {...commonProps} />;
    }
    case "select":
      return (
        <FormTableFieldFooterSelect
          tableData={data}
          footer={footer}
          {...commonProps}
        />
      );
    case "custom":
      return <footer.CustomFooter {...commonProps} />;

    default:
      logger.error(
        `Invalid footer kind supplied to table. Expected one of "button" | "select" | "custom" but got "${(footer as { kind: unknown }).kind}"`
      );
      return null;
  }
}

/**
 * Renders a Form table field's footer if provided & the form is in edit mode.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldFooterProps} props - Component props
 * @returns {ReactNode} The table footer or null
 */
export function FormTableFieldFooter(
  props: FormTableFieldFooterProps
): ReactNode {
  const { isEditing } = useFormContext();
  if (!props.footer || !isEditing) return null;
  return (
    <footer className={styles.footer} data-testid="form-table-field-footer">
      <FormTableFieldFooterContent {...props} />
    </footer>
  );
}
