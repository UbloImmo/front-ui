import { forwardRef, type ReactNode, useMemo } from "react";

import styles from "../FormTableField.module.scss";

import { Checkbox } from "@/components/Checkbox";
import { useFormContext } from "@/components/Form/Form.context";
import { getInputLabelTextClassName } from "@/components/InputLabel/InputLabel.styles";
import { Text } from "@/components/Text";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import {
  FlexRowLayout,
  TableCell,
  TableHeader,
  TableHeaderCell,
} from "@layouts";
import { cssClasses, isNonEmptyString, useCssClasses } from "@utils";

import type { FormTableFieldHeaderProps } from "./FormTableFieldHeader.types";
import type { Optional } from "@ubloimmo/front-util";

/**
 * Renders the header of a form table.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldHeaderProps} - Component props
 * @return {ReactNode} - The table header
 */
export const FormTableFieldHeader = forwardRef<
  HTMLTableSectionElement,
  FormTableFieldHeaderProps
>(
  (
    { headers, colSpans, modifiers, selected, setTableSelection },
    ref
  ): ReactNode => {
    const { isEditing, disabled } = useFormContext();

    const showSelectControl = useMemo<boolean>(
      () => modifiers.selectable && isEditing,
      [isEditing, modifiers.selectable]
    );

    const blockerLeftClassName = useCssClasses(
      styles["row-control"],
      styles["row-control-left"],
      styles["header-blocker"],
      styles.shown
    );
    const blockerRightClassName = useCssClasses(
      styles["row-control"],
      styles["row-control-right"],
      styles["header-blocker"],
      styles.shown
    );
    const controlLeftClassName = useCssClasses(
      styles["row-control"],
      styles["row-control-left"],
      styles["header-control-left"],
      [styles.shown, showSelectControl]
    );

    return (
      <TableHeader
        sticky
        className={styles.header}
        ref={ref}
        testId="form-table-field-header"
        overrideTestId
      >
        <TableCell role="presentation" className={blockerLeftClassName} />
        {showSelectControl && (
          <TableHeaderCell role="presentation" className={controlLeftClassName}>
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

          const headerLabel = isNonEmptyString(label) ? label : <>&nbsp;</>;

          const cellClassName = cssClasses(styles["header-cell"]);
          const textClassName = cssClasses(
            getInputLabelTextClassName(required && isEditing),
            styles["header-text"]
          );

          return (
            <TableHeaderCell
              key={key}
              colSpan={colSpans[index] ?? 1}
              className={cellClassName}
            >
              <FlexRowLayout align="center" gap="s-2" justify={justify} fill>
                <Text
                  className={textClassName}
                  color="primary-dark"
                  size="m"
                  weight="bold"
                  testId="input-label-text"
                >
                  {headerLabel}
                </Text>
                {headerTooltip && <Tooltip {...headerTooltip} />}
              </FlexRowLayout>
            </TableHeaderCell>
          );
        })}
        <TableCell role="presentation" className={blockerRightClassName} />
      </TableHeader>
    );
  }
);
