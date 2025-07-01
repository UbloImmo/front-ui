import { isString, type Optional } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { useFormContext } from "../../../Form.context";

import { Checkbox } from "@/components/Checkbox";
import {
  InputLabelText,
  type InputLabelTextStyleProps,
} from "@/components/InputLabel";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import { FlexRowLayout } from "@/layouts/Flex";
import {
  TableHeader,
  TableHeaderCell,
  type TableHeaderProps,
} from "@/layouts/Table";
import { isEmptyString } from "@utils";

import type { BuiltFormTableProps } from "../../../Form.types";
import type { TextProps } from "@types";

type FormTableHeaderProps = Pick<
  BuiltFormTableProps,
  "headers" | "colSpans" | "modifiers" | "selected" | "setTableSelection"
> &
  Pick<TableHeaderProps, "sticky">;

/**
 * The header of the `FormTable` component.
 *
 * @version 0.0.2
 *
 * @param {FormTableHeaderProps} props - The component props.
 * @returns The header component.
 */
export const FormTableHeader = ({
  headers,
  colSpans,
  modifiers,
  selected,
  sticky,
  setTableSelection,
}: FormTableHeaderProps) => {
  const { isEditing, disabled } = useFormContext();
  const showSelectionHeader = useMemo(
    () => isEditing && modifiers.selectable,
    [isEditing, modifiers.selectable]
  );
  return (
    <TableHeader sticky={sticky}>
      {showSelectionHeader && (
        <TableHeaderCell>
          <FlexRowLayout align="center" justify="center" fill>
            <Checkbox
              active={selected}
              disabled={disabled}
              onChange={setTableSelection}
            />
          </FlexRowLayout>
        </TableHeaderCell>
      )}
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
