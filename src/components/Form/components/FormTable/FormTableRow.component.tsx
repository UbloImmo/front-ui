import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { transformObject, type Nullish } from "@ubloimmo/front-util";
import { useMemo, useCallback } from "react";

import styles from "./FormTable.module.scss";
import { FormTableFieldCell } from "./FormTableCell/FormTableFieldCell.component";
import { useFormContext } from "../../Form.context";
import { isBuiltCustomFormField } from "../../Form.utils";
import {
  type FormTableCellControlsData,
  FormTableCellControls,
  type FormTableCellControlsProps,
} from "./FormTableCell/FormTableCellControls.component";
import { FormTableCustomFieldCell } from "./FormTableCell/FormTableCustomFieldCell.component";

import { Checkbox } from "@/components/Checkbox";
import { FlexRowLayout } from "@/layouts/Flex";
import { TableCell, TableRow } from "@/layouts/Table";
import { BEZIER } from "@/themes";
import {
  useUikitTranslation,
  useStatic,
  cssVarUsage,
  useCssClasses,
} from "@utils";

import type {
  BuiltFormTableRow,
  BuiltFormTableModifiers,
  BuiltFormTableCallbacks,
} from "../../Form.types";

type FormTableRowProps = BuiltFormTableRow &
  Pick<BuiltFormTableCallbacks, "deleteRow" | "setRowSelection"> & {
    index: number;
    modifiers: BuiltFormTableModifiers;
    colSpans: number[];
  };

export const FormTableRow = ({
  cells,
  modifiers,
  index,
  id,
  stableId,
  deleteRow,
  setRowSelection,
  selected,
  colSpans,
}: FormTableRowProps) => {
  const { isEditing, disabled } = useFormContext();

  const mods = useMemo(() => {
    const { selectable: _, ...rest } = modifiers;
    return transformObject(rest, (modifier) => isEditing && modifier);
  }, [modifiers, isEditing]);

  const showSelectionCell = useMemo(
    () => isEditing && modifiers.selectable,
    [isEditing, modifiers.selectable]
  );

  const deleteSelf = useCallback(() => {
    if (!mods.deletable) return;
    deleteRow(index);
  }, [deleteRow, index, mods]);

  const {
    attributes,
    transition,
    transform,
    setNodeRef,
    listeners,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({
    id: stableId,
    disabled: !mods.swappable,
    transition: {
      duration: 50,
      easing: BEZIER,
    },
  });

  const tl = useUikitTranslation();
  const deleteTitle = useStatic(tl.action.delete);

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  const controls = useMemo<Nullish<FormTableCellControlsData>>(() => {
    if ((!mods.swappable && !mods.deletable) || !isEditing) return null;
    return {
      swappable: mods.swappable
        ? {
            setActivatorNodeRef,
            listeners,
            testId: "form-table-row-drag-handle",
          }
        : null,
      deletable: mods.deletable
        ? {
            disabled: false,
            deleteTitle,
            deleteSelf,
            testId: "form-table-row-delete-button",
          }
        : null,
    };
  }, [
    deleteSelf,
    deleteTitle,
    isEditing,
    listeners,
    mods.deletable,
    mods.swappable,
    setActivatorNodeRef,
  ]);

  const className = useCssClasses(
    styles["form-table-row"],
    [styles.deletable, mods.deletable],
    [styles.dragging, isDragging],
    [styles.swappable, mods.swappable]
  );

  const selectionCell = useCssClasses(styles["form-table-row-selection-cell"]);

  return (
    <TableRow
      className={className}
      {...attributes}
      ref={setNodeRef}
      id={id}
      styleOverride={style}
      data-testid="form-table-row"
      data-row-index={index}
    >
      {showSelectionCell && (
        <TableCell
          styleOverride={{ position: "relative", width: cssVarUsage("s-9") }}
        >
          <FormTableCellControls controls={controls} isFirst />
          <FlexRowLayout
            className={selectionCell}
            align="center"
            justify="center"
            fill
          >
            <Checkbox
              onChange={(selected) => setRowSelection(index, !!selected)}
              active={selected}
              disabled={disabled}
            />
          </FlexRowLayout>
        </TableCell>
      )}
      {cells.map((cell, cellIndex) => {
        const cellKey = `table-cell-${cellIndex}`;
        const colSpan = colSpans[cellIndex] ?? 1;
        const isLast = cellIndex === cells.length - 1;
        const isFirst = (showSelectionCell ? cellIndex + 1 : cellIndex) === 0;
        const controlsProps: FormTableCellControlsProps = {
          controls,
          isFirst,
          isLast,
        };
        if (isBuiltCustomFormField(cell)) {
          return (
            <FormTableCustomFieldCell
              {...cell}
              rowIndex={index}
              colSpan={colSpan}
              {...controlsProps}
              key={cellKey}
            />
          );
        }
        return (
          <FormTableFieldCell
            colSpan={colSpan}
            {...cell}
            {...controlsProps}
            key={cellKey}
          />
        );
      })}
    </TableRow>
  );
};
