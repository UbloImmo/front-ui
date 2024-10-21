import { isString, type Optional } from "@ubloimmo/front-util";
import styled from "styled-components";

import { useFormContext } from "../../../Form.context";

import {
  InputLabelText,
  type InputLabelTextStyleProps,
} from "@/components/InputLabel";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import { FlexRowLayout, TableHeader, TableHeaderCell } from "@layouts";
import { isEmptyString } from "@utils";

import type { BuiltFormTableProps } from "../../../Form.types";
import type { TextProps } from "@types";

type FormTableHeaderProps = Pick<BuiltFormTableProps, "headers" | "colSpans">;

export const FormTableHeader = ({
  headers,
  colSpans,
}: FormTableHeaderProps) => {
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
          <TableHeaderCell key={key} colSpan={colSpans[index] ?? 1}>
            <FlexRowLayout align="center" gap="s-2" justify={justify} fill>
              <TableHeaderLabelText
                color="primary-dark"
                size="m"
                weight="bold"
                testId="input-label-text"
                $required={required && isEditing}
              >
                {headerLabel}
              </TableHeaderLabelText>
              {headerTooltip && <Tooltip {...headerTooltip} />}
            </FlexRowLayout>
          </TableHeaderCell>
        );
      })}
    </TableHeader>
  );
};

const TableHeaderLabelText = styled(InputLabelText)<
  InputLabelTextStyleProps & TextProps
>`
  white-space: nowrap;
  min-width: max-content;
`;
