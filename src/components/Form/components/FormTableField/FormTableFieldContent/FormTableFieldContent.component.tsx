import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { isNull } from "@ubloimmo/front-util";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import styles from "../FormTableField.module.scss";
import { FormTableFieldHeader } from "../FormTableFieldHeader";
import { FormTableFieldRow } from "../FormTableFieldRow";

import { useFormContext } from "@/components/Form/Form.context";
import { GridLayout, type GridTemplateArray } from "@/layouts/Grid";
import { Table, TableBody } from "@/layouts/Table";
import {
  cssCalc,
  cssLengthUsage,
  cssPx,
  useCssClasses,
  useCssVariables,
  useResizeObserver,
} from "@utils";

import type {
  FormTableFieldContentProps,
  FormTableFieldContentRefs,
} from "./FormTableFieldContent.types";

/**
 * Renders a Form table field's scroller, table, body & header
 * while forwarding their refs to the parent component
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldContentProps} props - Component props
 * @return {ReactNode} Form table field content
 */
export const FormTableFieldContent = forwardRef<
  FormTableFieldContentRefs,
  FormTableFieldContentProps
>(
  (
    {
      colSpans,
      colWidths,
      modifiers,
      displayRows,
      maxBodyHeight,
      headers,
      swapRows,
      deleteRow,
      setRowSelection,
      selected,
      setTableSelection,
      id,
      scrollerId,
      isEmpty,
    },
    refs
  ): ReactNode => {
    const { isEditing } = useFormContext();

    // store rendered element refs
    const gridRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);
    const tableBodyRef = useRef<HTMLTableSectionElement>(null);
    const tableHeaderRef = useRef<HTMLTableSectionElement>(null);

    const tableHeaderDimensions = useResizeObserver(tableHeaderRef);

    // forward internal element refs to parent component for usage in siblings
    // namely `FormTableFieldScrollbars`
    useImperativeHandle(refs, () => ({
      get gridRef() {
        return gridRef.current;
      },
      get tableRef() {
        return tableRef.current;
      },
      get tableBodyRef() {
        return tableBodyRef.current;
      },
      get tableHeaderRef() {
        return tableHeaderRef.current;
      },
    }));

    /**
     * Grid columns computed based on modifiers & provided table columns
     * We add `s-6` to both sides to act as sticky blockers for the table's content
     */
    const columns = useMemo<GridTemplateArray>(() => {
      return [
        "s-6",
        ...(modifiers.selectable && isEditing ? ["s-9" as const] : []),
        ...colWidths,
        "s-6",
      ];
    }, [modifiers.selectable, isEditing, colWidths]);

    const onDragEnd = useCallback(
      (event: DragEndEvent) => {
        if (event.canceled) return;

        // swap rows if needed
        const { source } = event.operation;
        if (!isSortable(source)) return;
        const { initialIndex, index } = source;
        if (initialIndex === index) return;

        swapRows(initialIndex, index);
      },
      [swapRows]
    );

    const gridMaxHeight = useMemo(() => {
      if (isNull(maxBodyHeight)) return null;
      return cssCalc(
        `${cssLengthUsage(maxBodyHeight)} + ${cssPx(tableHeaderDimensions?.height ?? 0)}`
      );
    }, [maxBodyHeight, tableHeaderDimensions?.height]);

    // grid scroller CSS styling
    const className = useCssClasses(styles.grid);
    const style = useCssVariables({
      "grid-max-height": gridMaxHeight,
    });

    return (
      <DragDropProvider onDragEnd={onDragEnd}>
        <GridLayout
          role="grid"
          gap={0}
          className={className}
          columns={columns}
          styleOverride={style}
          ref={gridRef}
          id={scrollerId}
          testId="form-table-field-grid"
          overrideTestId
        >
          <Table
            className={styles.table}
            id={id}
            ref={tableRef}
            testId="form-table-field-table"
            overrideTestId
          >
            <FormTableFieldHeader
              headers={headers}
              colSpans={colSpans}
              modifiers={modifiers}
              selected={selected}
              setTableSelection={setTableSelection}
              ref={tableHeaderRef}
            />
            <TableBody
              ref={tableBodyRef}
              style="form"
              className={styles["table-body"]}
              testId="form-table-field-body"
              overrideTestId
            >
              {!isEmpty &&
                displayRows.map((row) => (
                  <FormTableFieldRow
                    key={row.stableId}
                    row={row}
                    containerRef={tableBodyRef}
                    gridColumns={columns}
                    deleteRow={deleteRow}
                    setRowSelection={setRowSelection}
                    colSpans={colSpans}
                  />
                ))}
            </TableBody>
          </Table>
        </GridLayout>
      </DragDropProvider>
    );
  }
);
