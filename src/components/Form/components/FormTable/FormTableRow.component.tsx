import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { transformObject } from "@ubloimmo/front-util";
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
import { FormTableCustomFieldCell } from "./FormTableCell/FormTableCustomFieldCell.component";

import { Icon } from "@/components/Icon";
import { TableRow } from "@layouts";
import { useStyleProps, useUikitTranslation, useStatic } from "@utils";

import type {
  BuiltFormTableRow,
  FormTableModifiers,
  DeleteTableRowFn,
} from "../../Form.types";
import type { StyleProps } from "@types";

type FormTableRowProps = BuiltFormTableRow & {
  index: number;
  dynamicIndex: number;
  modifiers: Required<FormTableModifiers>;
  deleteRow: DeleteTableRowFn;
};

export const FormTableRow = ({
  cells,
  modifiers,
  index,
  dynamicIndex,
  id,
  deleteRow,
}: FormTableRowProps) => {
  const { isEditing } = useFormContext();

  const mods = useMemo(
    () => transformObject(modifiers, (modifier) => isEditing && modifier),
    [modifiers, isEditing]
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
  } = useSortable({ id, disabled: !mods.swappable });

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

  return (
    <StyledTableRow
      {...styledProps}
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      {cells.map((cell, cellIndex) => {
        const cellKey = `table-cell-${cellIndex}`;
        if (isBuiltCustomFormField(cell)) {
          return (
            <FormTableCustomFieldCell
              {...cell}
              key={cellKey}
              rowIndex={dynamicIndex}
            />
          );
        }
        return <FormTableFieldCell {...cell} key={cellKey} />;
      })}
      {mods.swappable && (
        <RowDragHandle {...listeners} ref={setActivatorNodeRef}>
          <Icon name="Grab" size="s-5" color="primary-dark" />
        </RowDragHandle>
      )}
      {mods.deletable && (
        <RowDeleteButton
          onClick={deleteSelf}
          disabled={!mods.deletable}
          title={deleteTitle}
          aria-label={deleteTitle}
          type="button"
        >
          <Icon name="XLg" size="s-5" color="primary-dark" />
        </RowDeleteButton>
      )}
    </StyledTableRow>
  );
};

const RowDeleteButton = styled.button`
  position: absolute;
  inset: 0;
  left: unset;
  width: var(--s-6);
  height: 100%;
  translate: var(--s-6);
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  opacity: 0;
  pointer-events: none;

  transition: opacity 300ms var(--bezier);
  z-index: 1;

  svg[data-testid="icon"] {
    transition: fill 150ms var(--bezier);
  }

  &:hover svg[data-testid="icon"] {
    fill: var(--error-base);
  }
`;

const RowDragHandle = styled.div`
  position: absolute;
  inset: 0;
  right: unset;
  width: var(--s-6);
  height: 100%;
  translate: calc(var(--s-6) * -1);
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;

  transition: opacity 300ms var(--bezier);
  z-index: 1;

  svg[data-testid="icon"] {
    transition: fill 150ms var(--bezier);
  }

  &:hover svg[data-testid="icon"] {
    &,
    path {
      fill: var(--primary-base);
    }
  }
`;

type StyledTableRowProps = StyleProps<
  FormTableModifiers & {
    dragging?: boolean;
  }
> & {
  ref: RefCallback<HTMLElement>;
  style?: CSSProperties;
};

const StyledTableRow = styled(TableRow)<StyledTableRowProps>`
  position: relative;

  ${({ $deletable, $dragging }) =>
    $deletable &&
    !$dragging &&
    css`
      &:hover ${RowDeleteButton} {
        opacity: 1;
        pointer-events: all;
      }
    `}

  ${({ $swappable }) =>
    $swappable &&
    css`
      &:hover ${RowDragHandle} {
        opacity: 1;
        pointer-events: all;
      }
    `}

  ${({ $dragging }) =>
    $dragging &&
    css`
      background: white;
      border: 2px solid var(--primary-medium);
      box-shadow: var(--shadow-card-elevation-medium);
      transition: box-shadow 150ms var(--bezier), border 150ms var(--bezier);
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
