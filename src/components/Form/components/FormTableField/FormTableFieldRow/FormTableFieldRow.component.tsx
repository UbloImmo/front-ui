import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { closestCenter } from "@dnd-kit/collision";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useSortable } from "@dnd-kit/react/sortable";
import { transformObject } from "@ubloimmo/front-util";
import { type ReactNode, useCallback, useMemo } from "react";

import styles from "../FormTableField.module.scss";
import { FormTableFieldCell } from "../FormTableFieldCell/FormTableFieldCell.component";
import { FormTableFieldCustomCell } from "../FormTableFieldCustomCell/FormTableFieldCustomCell.component";

import { Checkbox, type CheckboxStatus } from "@/components/Checkbox";
import { useFormContext } from "@/components/Form/Form.context";
import { isBuiltCustomFormField } from "@/components/Form/Form.utils";
import { Icon } from "@/components/Icon";
import { formatGridTemplate } from "@/layouts/Grid/Grid.styles";
import { TableCell, type TableCellPosition, TableRow } from "@/layouts/Table";
import { BEZIER } from "@/themes";
import { useCssClasses, useCssVariables, useUikitTranslation } from "@utils";

import type { FormTableFieldRowProps } from "./FormTableFieldRow.types";

/**
 * Renders a single table row in a form table field.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldRowProps} props - Component props
 * @returns {ReactNode} - A single table row or null if the table is configured only to show selected rows and this one isn't
 */
export function FormTableFieldRow({
  row,
  containerRef,
  gridColumns,
  deleteRow,
  setRowSelection,
  colSpans,
}: FormTableFieldRowProps): ReactNode {
  const { isEditing, disabled } = useFormContext();
  const { action } = useUikitTranslation();

  // enrich modifiers with isEditing condition
  const mods = useMemo(() => {
    return transformObject(
      row.modifiers,
      (modifier): boolean => isEditing && !!modifier
    );
  }, [row.modifiers, isEditing]);

  // dnd-kit sortable setup
  const {
    handleRef: setActivatorNodeRef,
    ref: setNodeRef,
    isDragging,
    isDropping,
  } = useSortable({
    id: row.stableId,
    index: row.index,
    disabled: !mods.swappable,
    transition: {
      duration: 150,
      easing: BEZIER,
    },
    collisionDetector: closestCenter,
    modifiers: [
      RestrictToVerticalAxis,
      RestrictToElement.configure({
        element: () => containerRef.current,
      }),
    ],
  });

  /**
   * Deletes the row if allowed to
   */
  const deleteSelf = useCallback(() => {
    if (!mods.deletable || disabled) return;
    deleteRow(row.index);
  }, [deleteRow, disabled, mods.deletable, row.index]);

  /**
   * Updates the row's selection property if allowed to
   */
  const toggleSelfSelection = useCallback(
    (selected: CheckboxStatus) => {
      if (!mods.selectable || disabled) return;
      setRowSelection(row.index, !!selected);
    },
    [disabled, mods.selectable, row.index, setRowSelection]
  );

  // row CSS styling
  const rowClassName = useCssClasses(
    styles.row,
    [styles.dragging, isDragging || isDropping],
    [styles.swappable, mods.swappable],
    [styles.selectable, mods.selectable],
    [styles.deletable, mods.deletable]
  );
  const rowStyles = useCssVariables({
    "row-columns": formatGridTemplate(gridColumns),
  });

  // left & right sticky overlay control CSS styling
  const swapControlClassName = useCssClasses(
    styles["row-control"],
    styles["row-control-left"],
    [styles.shown, mods.swappable],
    styles["row-control-swap"]
  );
  const deleteControlClassName = useCssClasses(
    styles["row-control"],
    styles["row-control-right"],
    [styles.shown, mods.deletable],
    styles["row-control-delete"]
  );
  const selectControlClassName = useCssClasses(
    styles["row-control"],
    styles["row-control-select"],
    [styles.shown, mods.selectable]
  );
  const blockerLeftClassName = useCssClasses(
    styles["row-control"],
    styles["row-control-left"],
    styles["row-blocker"]
  );
  const blockerRightClassName = useCssClasses(
    styles["row-control"],
    styles["row-control-right"],
    styles["row-blocker"]
  );

  // do not render row when selectable behavior is set to filter
  if (
    row.modifiers.selectable &&
    row.modifiers.selectable.behavior === "filter" &&
    !row.selected
  )
    return null;

  return (
    <TableRow
      role="row"
      className={rowClassName}
      styleOverride={rowStyles}
      ref={setNodeRef}
      id={row.stableId}
      testId="form-table-field-row"
      overrideTestId
    >
      <TableCell
        role="presentation"
        testId="form-table-field-row-blocker-left"
        overrideTestId
        className={blockerLeftClassName}
      />

      <TableCell
        role="presentation"
        className={swapControlClassName}
        ref={setActivatorNodeRef}
        testId="form-table-field-row-swap-control"
        overrideTestId
      >
        <Icon name="Grab" size="s-5" color="primary-dark" />
      </TableCell>
      <TableCell
        role="presentation"
        className={selectControlClassName}
        testId="form-table-field-row-select-control"
        overrideTestId
      >
        <Checkbox
          active={row.selected}
          onChange={toggleSelfSelection}
          disabled={disabled}
        />
      </TableCell>

      {row.cells.map((cell, cellIndex) => {
        const cellKey = `table-cell-${cellIndex}`;
        const colSpan = colSpans[cellIndex] ?? 1;
        const isFirst = !cellIndex;
        const isLast = cellIndex === row.cells.length - 1;
        const position: TableCellPosition =
          isFirst && isLast
            ? "both"
            : isFirst
              ? "start"
              : isLast
                ? "end"
                : "middle";

        if (isBuiltCustomFormField(cell)) {
          return (
            <FormTableFieldCustomCell
              {...cell}
              rowIndex={row.index}
              rowDisplayIndex={row.displayIndex}
              colSpan={colSpan}
              position={position}
              key={cellKey}
            />
          );
        }
        return (
          <FormTableFieldCell
            colSpan={colSpan}
            {...cell}
            position={position}
            key={cellKey}
          />
        );
      })}

      <TableCell
        role="presentation"
        className={blockerRightClassName}
        testId="form-table-field-row-blocker-right"
        overrideTestId
      />

      <TableCell
        title={action.delete()}
        role="presentation"
        className={deleteControlClassName}
        onClick={deleteSelf}
        testId="form-table-field-row-delete-control"
        overrideTestId
      >
        <Icon name="XLg" size="s-5" color="primary-dark" />
      </TableCell>
    </TableRow>
  );
}
