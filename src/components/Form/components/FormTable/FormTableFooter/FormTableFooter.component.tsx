import { useCallback, useMemo, type ReactNode } from "react";
import styled from "styled-components";

import { FormTableFooterButton } from "./FormTableFooterButton.component";
import { FormTableFooterSelect } from "./FormTableFooterSelect.component";
import { useFormContext } from "../../../Form.context";

import { TableCell, TableFooter, TableRow } from "@/layouts/Table";

import type { FormTableFooterProps } from "../../../Form.types";

export const FormTableFooter = ({
  footer,
  columnsCount,
  appendRow,
  tableData,
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

  return (
    <TableFooter>
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
`;
