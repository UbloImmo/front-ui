import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useFormContext } from "../../Form.context";
import { FormFieldGridItem } from "../FormFieldGridItem.component";
import { FormTableEmptyState } from "./FormTableEmptyState.component";
import { FormTableHeader } from "./FormTableHeader/FormTableHeader.component";
import { FormTableRow } from "./FormTableRow.component";
import { StableFormTableRow, type BuiltFormTableProps } from "../../Form.types";
import { FormTableFooter } from "./FormTableFooter/FormTableFooter.component";

import { FieldContainer } from "@/components/Field";
import { Icon } from "@/components/Icon";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel } from "@/components/InputLabel";
import { Table, TableBody } from "@layouts";

import type { TooltipProps } from "@/components/Tooltip";
import type { Nullable } from "@ubloimmo/front-util";

export const FormTable = ({
  stableId,
  rows,
  layout,
  headers,
  assistiveText,
  errorText,
  error,
  label,
  required,
  tooltip,
  compact,
  modifiers,
  footer,
  columnsCount,
  deleteRow,
  appendRow,
  EmptyCard,
}: BuiltFormTableProps) => {
  const { isEditing, updateTableRowIndexMap } = useFormContext();

  const shoulDisplayAssistiveText = useMemo(() => {
    return isEditing && !!(assistiveText || (errorText && error));
  }, [isEditing, assistiveText, errorText, error]);

  const generateRowId = useCallback(() => uuidv4(), []);

  const [stableRows, setStableRows] = useState<StableFormTableRow[]>(() =>
    rows.map((row, initialIndex) => ({
      ...row,
      stableId: generateRowId(),
      initialIndex,
    }))
  );

  const sortableItems = useMemo<UniqueIdentifier[]>(
    () => stableRows.map(({ stableId }) => stableId),
    [stableRows]
  );

  useEffect(() => {
    // update stable rows data while keeping id
    const updatedRows = rows
      .map((row, initialIndex): StableFormTableRow => {
        const stableRow = stableRows.find(({ id }) => id === row.id);
        return {
          ...row,
          stableId: stableRow?.stableId ?? generateRowId(),
          initialIndex,
        };
      })
      .sort((a, b) => {
        const aIndex = sortableItems.indexOf(a.stableId);
        if (aIndex === -1) return 1;
        const bIndex = sortableItems.indexOf(b.stableId);
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    setStableRows(updatedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, generateRowId]);

  useEffect(() => {
    updateTableRowIndexMap(stableId, stableRows);
  }, [stableId, stableRows, updateTableRowIndexMap]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {})
  );

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!(over && active.id !== over.id)) {
        return;
      }
      const oldIndex = sortableItems.indexOf(active.id);
      const newIndex = sortableItems.indexOf(over.id);
      const swapped = arrayMove([...stableRows], oldIndex, newIndex);
      setStableRows(swapped);
    },
    [sortableItems, stableRows]
  );

  const errorTooltip = useMemo<Nullable<TooltipProps>>(() => {
    if (!error || !errorText) return null;
    return {
      children: (
        <Icon name="ExclamationCircleFill" color="error-medium" size="s-4" />
      ),
      content: errorText,
    };
  }, [error, errorText]);

  const labelTooltip = useMemo(
    () => (isEditing ? tooltip : errorTooltip),
    [isEditing, errorTooltip, tooltip]
  );

  if (layout.hidden) return null;

  return (
    <FormFieldGridItem
      columnEnd={layout.columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FieldContainer
        testId="form-custom-field"
        overrideTestId
        data-field-type="custom"
        gap="s-2"
        fill
      >
        <InputLabel
          label={label}
          required={isEditing ? required : false}
          tooltip={labelTooltip}
          compact={!isEditing || compact}
          testId="field-label"
          overrideTestId
        />
        <Table>
          <FormTableHeader headers={headers} />
          <TableBody>
            {stableRows.length ? (
              <DndContext
                sensors={sensors}
                onDragEnd={onDragEnd}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <SortableContext items={sortableItems}>
                  {stableRows.map(
                    ({ cells, stableId, initialIndex }, dynamicIndex) => {
                      const rowKey = `table-row-${stableId}-${initialIndex}`;
                      return (
                        <FormTableRow
                          key={rowKey}
                          modifiers={modifiers}
                          id={stableId}
                          cells={cells}
                          index={initialIndex}
                          dynamicIndex={dynamicIndex}
                          deleteRow={deleteRow}
                        />
                      );
                    }
                  )}
                </SortableContext>
              </DndContext>
            ) : (
              <FormTableEmptyState
                EmptyCard={EmptyCard}
                columnsCount={columnsCount}
              />
            )}
          </TableBody>
          {footer && isEditing && (
            <FormTableFooter
              footer={footer}
              appendRow={appendRow}
              columnsCount={columnsCount}
            />
          )}
        </Table>
        {shoulDisplayAssistiveText && (
          <InputAssistiveText
            assistiveText={assistiveText}
            errorText={errorText}
            error={error}
            testId="field-assistive-text"
            overrideTestId
          />
        )}
      </FieldContainer>
    </FormFieldGridItem>
  );
};
