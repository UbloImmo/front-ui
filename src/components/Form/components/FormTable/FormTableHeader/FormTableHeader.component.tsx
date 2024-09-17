import { isString } from "@ubloimmo/front-util";

import { useFormContext } from "../../../Form.context";

import { InputLabelText } from "@/components/InputLabel";
import { Tooltip } from "@/components/Tooltip";
import { FlexRowLayout, TableHeader, TableHeaderCell } from "@layouts";
import { isEmptyString } from "@utils";

import type { BuiltFormTableProps } from "../../../Form.types";

type FormTableHeaderProps = Pick<BuiltFormTableProps, "headers">;

export const FormTableHeader = ({ headers }: FormTableHeaderProps) => {
  const { isEditing } = useFormContext();
  return (
    <TableHeader>
      {headers.map(({ label, compact, tooltip, required }, index) => {
        const key = `table-header-${index}-${label}`;
        const justify = compact ? "start" : "space-between";

        const headerLabel =
          !isString(label) || isEmptyString(label) ? <>&nbsp;</> : label;

        return (
          <TableHeaderCell key={key}>
            <FlexRowLayout align="center" gap="s-2" justify={justify}>
              <InputLabelText
                color="primary-dark"
                size="m"
                weight="bold"
                testId="input-label-text"
                $required={required && isEditing}
              >
                {headerLabel}
              </InputLabelText>
              {tooltip && isEditing && <Tooltip {...tooltip} />}
            </FlexRowLayout>
          </TableHeaderCell>
        );
      })}
    </TableHeader>
  );
};
