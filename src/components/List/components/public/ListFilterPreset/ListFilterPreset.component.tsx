import { useMemo } from "react";
import styled from "styled-components";

import { listFilterPresetButtonStyles } from "./ListFilterPreset.styles";
import { useListFilterPreset } from "./ListFilterPreset.utils";

import { Badge, type BadgeProps } from "@/components/Badge";
import { Text } from "@/components/Text";
import { useTestId } from "@/utils/props.utils";

import type {
  ListFilterPresetProps,
  ListFilterPresetStyleProps,
} from "./ListFilterPreset.types";

// TODO: make its background white by default
// TODO: change the text's color to `${colorKey}-dark` when active
/**
 * A component that displays a single filter preset button
 * and allows interacting with it.
 *
 * @version 0.0.1
 *
 * @param {ListFilterPresetProps} props
 * @returns {Nullable<JSX.Element>}
 */
export const ListFilterPreset = (props: ListFilterPresetProps) => {
  const { filterPreset, styleProps } = useListFilterPreset(props);
  const testId = useTestId("filter-preset-button", {
    testId: filterPreset.testId,
  });

  const badgeProps = useMemo<BadgeProps>(
    () => ({
      label: String(filterPreset.count),
      color: filterPreset.active ? filterPreset.colorKey : "gray",
    }),
    [filterPreset]
  );

  if (filterPreset.hidden) return null;

  return (
    <ListFilterPresetButton
      disabled={filterPreset.disabled}
      onClick={filterPreset.toggle}
      {...styleProps}
      data-testid={testId}
    >
      <Text weight="medium" testId="filter-preset-button-label" fill ellipsis>
        {filterPreset.label}
      </Text>
      <Badge {...badgeProps} />
    </ListFilterPresetButton>
  );
};

const ListFilterPresetButton = styled.button<ListFilterPresetStyleProps>`
  ${listFilterPresetButtonStyles}
`;
