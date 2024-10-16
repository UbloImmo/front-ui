import { isString, type Optional } from "@ubloimmo/front-util";

import { useFormContext } from "../../../Form.context";

import { InputLabelText } from "@/components/InputLabel";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
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

        const headerTooltip: Optional<TooltipProps> = tooltip
          ? {
              ...tooltip,
              iconColor: "primary-medium",
              children: null,
            }
          : undefined;

        const headerLabel =
          !isString(label) || isEmptyString(label) ? <>&nbsp;</> : label;

        return (
          <TableHeaderCell key={key}>
            <FlexRowLayout align="center" gap="s-2" justify={justify} fill>
              <InputLabelText
                color="primary-dark"
                size="m"
                weight="bold"
                testId="input-label-text"
                $required={required && isEditing}
              >
                {headerLabel}
              </InputLabelText>
              {headerTooltip && <Tooltip {...headerTooltip} />}
            </FlexRowLayout>
          </TableHeaderCell>
        );
      })}
    </TableHeader>
  );
};
