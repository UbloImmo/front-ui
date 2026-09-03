import { type ReactNode, useMemo } from "react";

import styles from "../FormTableField.module.scss";

import { Text } from "@/components/Text";
import { useCssClasses, useStatic, useUikitTranslation } from "@utils";

import type { FormTableFieldEmptyStateProps } from "./FormTableFieldEmptyState.types";

/**
 * Renders an empty state for a FormTable component.
 *
 * When an EmptyCard prop is provided, it will be rendered.
 * Otherwise, a default empty state will be rendered, which is a italic bold text
 * with a warning color, and a size of "s".
 *
 * The default empty state's content is a translation of the "status.empty" key
 * with "table" as the first argument and "[REPLACE ME]" as the second one.
 *
 * The empty state is wrapped in a single table row, which spans the whole table
 * width.
 *
 * @version 0.1.2
 *
 * @param {FormTableFieldEmptyStateProps} props The component props
 * @return {ReactNode} The table's empty state
 */
export function FormTableFieldEmptyState({
  EmptyCard,
}: FormTableFieldEmptyStateProps): ReactNode {
  const tl = useUikitTranslation();

  const emptyLabel = useStatic(tl.status.empty("table", "[REPLACE ME]"));

  const EmptyState = useMemo<ReactNode>(() => {
    if (EmptyCard) return <EmptyCard />;

    return (
      <Text italic size="s" color="gray-400" weight="medium" align="center">
        {emptyLabel}
      </Text>
    );
  }, [EmptyCard, emptyLabel]);

  const className = useCssClasses(styles.empty);

  return (
    <section className={className} data-testid="form-table-field-empty">
      {EmptyState}
    </section>
  );
}
