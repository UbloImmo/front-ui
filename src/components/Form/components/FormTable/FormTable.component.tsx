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
import { useCallback, useMemo } from "react";

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
import { Table, TableBody } from "@layouts";
import { isEmptyString } from "@utils";

import type { TooltipProps } from "@/components/Tooltip";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * A form table component that displays data in a tabular format with optional editing capabilities.
 * Supports row deletion, reordering via drag and drop, and dynamic row addition.
 *
 * @version 0.0.2
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
  modifiers,
  footer,
  columnsCount,
  deleteRow,
  appendRow,
  swapRows,
  EmptyCard,
  data,
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
          />
        )}
        <Table layout={tableLayout}>
          <FormTableHeader headers={headers} colSpans={colSpans} />
          <TableBody>
            {rows.length ? (
              <DndContext
                sensors={sensors}
                onDragEnd={onDragEnd}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <SortableContext items={sortableItems}>
                  {rows.map(({ cells, stableId, id }, index) => {
                    const rowKey = `table-row-${stableId}-${index}`;

                    return (
                      <FormTableRow
                        key={rowKey}
                        modifiers={modifiers}
                        id={id}
                        stableId={stableId}
                        cells={cells}
                        index={index}
                        deleteRow={deleteRow}
                        colSpans={colSpans}
                      />
                    );
                  })}
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
              tableData={data}
              appendRow={appendRow}
              columnsCount={columnsCount}
            />
          )}
        </Table>
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
