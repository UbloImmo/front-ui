import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { transformObject, type Nullish } from "@ubloimmo/front-util";
import {
  useMemo,
  useCallback,
  type RefCallback,
  type CSSProperties,
} from "react";
import styled, { css } from "styled-components";

import { FormTableFieldCell } from "./FormTableCell/FormTableFieldCell.component";
import { useFormContext } from "../../Form.context";
import { isBuiltCustomFormField } from "../../Form.utils";
import {
  RowDeleteButton,
  RowDragHandle,
  type FormTableCellControlsData,
  FormTableCellControls,
  type FormTableCellControlsProps,
} from "./FormTableCell/FormTableCellControls.component";
import { FormTableCustomFieldCell } from "./FormTableCell/FormTableCustomFieldCell.component";

import { Checkbox } from "@/components/Checkbox";
import { FlexRowLayout } from "@/layouts/Flex";
import { TableCell, TableRow } from "@/layouts/Table";
import { BEZIER } from "@/themes";
import { useStyleProps, useUikitTranslation, useStatic } from "@utils";

import type {
  BuiltFormTableRow,
  FormTableModifiers,
  BuiltFormTableModifiers,
  BuiltFormTableCallbacks,
} from "../../Form.types";
import type { StyleProps } from "@types";

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
  const { isEditing } = useFormContext();

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

  const styledProps = useStyleProps({ ...mods, dragging: isDragging });

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

  return (
    <StyledTableRow
      {...styledProps}
      {...attributes}
      ref={setNodeRef}
      id={id}
      style={style}
      data-testid="form-table-row"
      data-row-index={index}
    >
      {showSelectionCell && (
        <TableCell styleOverride={{ position: "relative" }}>
          <FormTableCellControls controls={controls} isFirst />
          <SelectionCellInner align="center" justify="center" fill>
            <Checkbox
              onChange={(selected) => setRowSelection(index, !!selected)}
              active={selected}
            />
          </SelectionCellInner>
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
    </StyledTableRow>
  );
};

type StyledTableRowProps = StyleProps<
  Omit<FormTableModifiers<object>, "selectable"> & {
    dragging?: boolean;
  }
> & {
  ref: RefCallback<HTMLElement>;
  style?: CSSProperties;
  id?: string;
};

const StyledTableRow = styled(TableRow)<StyledTableRowProps>`
  position: relative;

  & > td {
    max-width: 0; /* allow cells to shrink */
  }

  ${({ $deletable, $dragging }) =>
    $deletable &&
    !$dragging &&
    css`
      &:hover ${RowDeleteButton} {
        transition-duration: 300ms;
        opacity: 1;
        pointer-events: all;
      }
    `}

  ${({ $swappable }) =>
    $swappable &&
    css`
      &:hover ${RowDragHandle} {
        transition-duration: 300ms;
        opacity: 1;
        pointer-events: all;
      }
    `}

  ${({ $dragging }) =>
    $dragging &&
    css`
      background: var(--white);
      border: 2px solid var(--primary-medium);
      box-shadow: var(--shadow-card-elevation-medium);
      transition:
        box-shadow 150ms var(--bezier),
        border 150ms var(--bezier);
      z-index: 1;

      & > td {
        border-color: var(--primary-medium);
        border-top: 1px solid var(--primary-medium) !important;
        border-bottom: 1px solid var(--primary-medium) !important;

        &:first-child {
          border-left: none;
          border-top-left-radius: var(--s-1) !important;
          border-bottom-left-radius: var(--s-1) !important;
        }

        &:last-of-type {
          border-right: none;
          border-top-right-radius: var(--s-1) !important;
          border-bottom-right-radius: var(--s-1) !important;
        }
      }
    `}
`;

const SelectionCellInner = styled(FlexRowLayout)`
  background: var(--white);
  min-height: var(--input-height);
  border-top-left-radius: calc(var(--s-1) * 0.75);
  border-bottom-left-radius: calc(var(--s-1) * 0.75);
`;
