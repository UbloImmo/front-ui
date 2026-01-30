import styles from "../FormTable.module.scss";

import { Icon } from "@/components/Icon";
import { useCssClasses } from "@utils";

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
 * @version 0.1.0
 *
 * @param {FormTableCellControlsProps} props - The props for the component.
 * @return {Nullable<JSX.Element>} The rendered controls.
 */
export const FormTableCellControls = ({
  controls,
  isFirst,
  isLast,
}: FormTableCellControlsProps): Nullable<JSX.Element> => {
  const dragHandle = useCssClasses(
    styles["form-table-row-control"],
    styles["form-table-row-drag-handle"]
  );
  const deleteButton = useCssClasses(
    styles["form-table-row-control"],
    styles["form-table-row-delete-button"]
  );

  if (!controls || (!controls.swappable && !controls.deletable)) return null;
  if (!isFirst && !isLast) return null;

  return (
    <>
      {controls?.swappable && isFirst && (
        <div
          className={dragHandle}
          {...controls.swappable.listeners}
          data-testid={controls.swappable.testId}
          ref={controls.swappable.setActivatorNodeRef}
        >
          <Icon name="Grab" size="s-5" color="primary-dark" />
        </div>
      )}
      {controls?.deletable && isLast && (
        <button
          className={deleteButton}
          onClick={controls.deletable.deleteSelf}
          title={controls.deletable.deleteTitle}
          aria-label={controls.deletable.deleteTitle}
          type="button"
          disabled={controls.deletable.disabled}
          data-testid={controls.deletable.testId}
        >
          <Icon name="XLg" size="s-5" color="primary-dark" />
        </button>
      )}
    </>
  );
};
