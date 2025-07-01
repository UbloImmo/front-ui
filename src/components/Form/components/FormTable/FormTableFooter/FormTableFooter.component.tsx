import { CSSProperties, useCallback, useMemo, type ReactNode } from "react";
import styled from "styled-components";

import { FormTableFooterButton } from "./FormTableFooterButton.component";
import { FormTableFooterSelect } from "./FormTableFooterSelect.component";
import { useFormContext } from "../../../Form.context";

import { TableCell, TableFooter, TableRow } from "@/layouts/Table";

import type { FormTableFooterProps } from "../../../Form.types";

/**
 * The footer of the `FormTable` component.
 *
 * @version 0.0.2
 *
 * @param {FormTableFooterProps} props - The component props.
 * @returns The footer component.
 */
export const FormTableFooter = ({
  footer,
  columnsCount,
  appendRow,
  tableData,
  sticky,
}: FormTableFooterProps) => {
  const { isEditing, disabled } = useFormContext();

  const footerDisabled = useMemo(
    () => !isEditing || disabled,
    [disabled, isEditing]
  );
  const FooterComponent = useCallback((): ReactNode => {
    const commonProps = {
      appendRow,
      disabled: footerDisabled,
    };
    if (footer.kind === "button")
      return <FormTableFooterButton footer={footer} {...commonProps} />;

    if (footer.kind === "select")
      return (
        <FormTableFooterSelect
          tableData={tableData}
          footer={footer}
          {...commonProps}
        />
      );

    if (footer.kind === "custom") {
      const { CustomFooter } = footer;
      return <CustomFooter {...commonProps} />;
    }

    return null;
  }, [appendRow, footerDisabled, footer, tableData]);

  const styles = useMemo<CSSProperties>(
    () =>
      sticky
        ? {
            position: "sticky",
            bottom: 0,
          }
        : {},
    [sticky]
  );

  return (
    <TableFooter styleOverride={styles}>
      <TableRow>
        <FooterCell colSpan={columnsCount}>
          <FooterComponent />
        </FooterCell>
      </TableRow>
    </TableFooter>
  );
};

const FooterCell = styled(TableCell)`
  padding: var(--s-1);
  background: var(--white);
`;
