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
import { SortableContext } from "@dnd-kit/sortable";
import { isNull, isNullish, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useId, useMemo, type ReactNode } from "react";

import { useFormContext } from "../../Form.context";
import { FormFieldGridItem } from "../FormFieldGridItem.component";
import { FormTableEmptyState } from "./FormTableEmptyState.component";
import { FormTableHeader } from "./FormTableHeader/FormTableHeader.component";
import { FormTableRow } from "./FormTableRow.component";
import { type BuiltFormTableProps } from "../../Form.types";
import { FormTableFooter } from "./FormTableFooter/FormTableFooter.component";

import { FieldContainer } from "@/components/Field";
import { useFieldAssistiveText } from "@/components/Field/Field.utils";
import { Icon } from "@/components/Icon";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel } from "@/components/InputLabel";
import { Table, TableBody, TableScrollView } from "@/layouts/Table";
import { isEmptyString } from "@utils";

import type { TooltipProps } from "@/components/Tooltip";

/**
 * A form table component that displays data in a tabular format with optional editing capabilities.
 * Supports row deletion, reordering via drag and drop, and dynamic row addition.
 *
 * @version 0.0.3
 *
 * @param {BuiltFormTableProps} props - The props for the form table component
 * @returns {JSX.Element} The rendered form table component
 */

export const FormTable = ({
  rows,
  layout,
  headers,
  colSpans,
  tableLayout,
  assistiveText,
  errorText,
  error,
  label,
  required,
  tooltip,
  compact,
  footer,
  columnsCount,
  deleteRow,
  appendRow,
  swapRows,
  setRowSelection,
  setTableSelection,
  modifiers,
  maxBodyHeight,
  selected,
  EmptyCard,
  data,
  id,
}: BuiltFormTableProps) => {
  const { isEditing } = useFormContext();

  const tableAssistiveText = useFieldAssistiveText(
    { assistiveText, error, errorText },
    data
  );

  const sortableItems = useMemo<UniqueIdentifier[]>(
    () => rows.map(({ stableId }) => stableId),
    [rows]
  );

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
      swapRows(oldIndex, newIndex);
    },
    [sortableItems, swapRows]
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

  const hasLabel = useMemo(() => {
    return label && !isEmptyString(label);
  }, [label]);

  const dynamicColumnsCount = useMemo(() => {
    if (isEditing && modifiers.selectable) return columnsCount + 1;
    return columnsCount;
  }, [columnsCount, isEditing, modifiers.selectable]);

  const defaultId = useId();
  const tableId = useMemo(() => id ?? defaultId, [id, defaultId]);

  const stickyHeaderOrFooter = useMemo(
    () => !isNullish(maxBodyHeight),
    [maxBodyHeight]
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
        {hasLabel && (
          <InputLabel
            label={label}
            required={isEditing ? required : false}
            tooltip={labelTooltip}
            compact={!isEditing || compact}
            testId="field-label"
            overrideTestId
            htmlFor={tableId}
          />
        )}
        <FormTableWrapper maxBodyHeight={maxBodyHeight}>
          <Table layout={tableLayout} id={tableId}>
            <FormTableHeader
              headers={headers}
              colSpans={colSpans}
              modifiers={modifiers}
              selected={selected}
              setTableSelection={setTableSelection}
              sticky={stickyHeaderOrFooter}
            />
            <TableBody style="form">
              {rows.length ? (
                <DndContext
                  sensors={sensors}
                  onDragEnd={onDragEnd}
                  collisionDetection={closestCenter}
                  modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                  <SortableContext items={sortableItems}>
                    {rows.map(
                      (
                        {
                          cells,
                          stableId,
                          id,
                          modifiers: rowModifiers,
                          selected: rowSelected,
                        },
                        index
                      ) => {
                        const rowKey = `table-row-${stableId}-${index}`;

                        return (
                          <FormTableRow
                            key={rowKey}
                            modifiers={rowModifiers}
                            id={id}
                            stableId={stableId}
                            cells={cells}
                            index={index}
                            deleteRow={deleteRow}
                            setRowSelection={setRowSelection}
                            selected={rowSelected}
                            colSpans={colSpans}
                          />
                        );
                      }
                    )}
                  </SortableContext>
                </DndContext>
              ) : (
                <FormTableEmptyState
                  EmptyCard={EmptyCard}
                  columnsCount={dynamicColumnsCount}
                />
              )}
            </TableBody>
            {footer && isEditing && (
              <FormTableFooter
                footer={footer}
                tableData={data}
                appendRow={appendRow}
                columnsCount={dynamicColumnsCount}
                sticky={stickyHeaderOrFooter}
              />
            )}
          </Table>
        </FormTableWrapper>
        {tableAssistiveText.shouldDisplay && isEditing && (
          <InputAssistiveText
            assistiveText={tableAssistiveText.assistiveText}
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

const FormTableWrapper = ({
  maxBodyHeight,
  children,
}: Pick<BuiltFormTableProps, "maxBodyHeight"> & { children: ReactNode }) => {
  if (isNull(maxBodyHeight)) return children;
  return (
    <TableScrollView
      overflowDirection="y"
      maxHeight={maxBodyHeight}
      style="form"
    >
      {children}
    </TableScrollView>
  );
};
