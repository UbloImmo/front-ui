import styled from "styled-components";

import { Icon } from "@/components/Icon";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Nullable, Nullish, Optional, VoidFn } from "@ubloimmo/front-util";

export type FormTableCellControlsData = {
  swappable?: Nullish<{
    setActivatorNodeRef: VoidFn<[Nullable<HTMLElement>]>;
    testId: string;
    listeners: Optional<SyntheticListenerMap>;
  }>;
  deletable?: Nullish<{
    deleteSelf: VoidFn;
    disabled: boolean;
    deleteTitle: string;
    testId: string;
  }>;
};

export type FormTableCellControlsProps = {
  controls?: Nullish<FormTableCellControlsData>;
  /**
   * Whether the controls get rendered in the first cell of the row
   */
  isFirst?: boolean;
  /**
   * Whether the controls get rendered in the last cell of the row
   */
  isLast?: boolean;
};

/**
 * Renders the controls for a form table cell if enabled and in the first or last cell of the row
 *
 * @param {FormTableCellControlsProps} props - The props for the component.
 * @return {Nullable<JSX.Element>} The rendered controls.
 */
export const FormTableCellControls = ({
  controls,
  isFirst,
  isLast,
}: FormTableCellControlsProps): Nullable<JSX.Element> => {
  if (!controls || (!controls.swappable && !controls.deletable)) return null;
  if (!isFirst && !isLast) return null;

  return (
    <>
      {controls?.swappable && isFirst && (
        <RowDragHandle
          {...controls.swappable.listeners}
          data-testid={controls.swappable.testId}
          ref={controls.swappable.setActivatorNodeRef}
        >
          <Icon name="Grab" size="s-5" color="primary-dark" />
        </RowDragHandle>
      )}
      {controls?.deletable && isLast && (
        <RowDeleteButton
          onClick={controls.deletable.deleteSelf}
          title={controls.deletable.deleteTitle}
          aria-label={controls.deletable.deleteTitle}
          type="button"
          disabled={controls.deletable.disabled}
          data-testid={controls.deletable.testId}
        >
          <Icon name="XLg" size="s-5" color="primary-dark" />
        </RowDeleteButton>
      )}
    </>
  );
};

export const RowDragHandle = styled.div`
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

  transition: opacity 0ms var(--bezier);
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

export const RowDeleteButton = styled.button`
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

  transition: opacity 0ms var(--bezier);
  z-index: 1;

  svg[data-testid="icon"] {
    transition: fill 150ms var(--bezier);
  }

  &:hover svg[data-testid="icon"] {
    fill: var(--error-base);
  }
`;
