import { useMemo } from "react";

import { Chip } from "@/components/Chip";
import { useLogger, useTestId } from "@utils";

import type { ListFilterOptionChipProps } from "./ListFilterOptionChip.types";

/**
 * Renders a filter option as a chip.
 *
 * @version 0.0.1
 */
export const ListFilterOptionChip = <TItem extends object>({
  filterOption,
  filterDisabled,
}: ListFilterOptionChipProps<TItem>) => {
  const { error } = useLogger("FilterOptionChip");

  const color = useMemo(() => filterOption?.colorKey, [filterOption]);

  const testId = useTestId("list-filter-option-chip");

  const disabled = useMemo(() => {
    return filterOption?.disabled || filterOption?.fixed || filterDisabled;
  }, [filterOption, filterDisabled]);

  if (!filterOption) {
    error("No filter option provided");
    return null;
  }

  return (
    <Chip
      color={color}
      label={filterOption.label}
      icon={filterOption.icon}
      disabled={disabled}
      onDelete={filterOption.unselect}
      testId={testId}
      overrideTestId
    />
  );
};
