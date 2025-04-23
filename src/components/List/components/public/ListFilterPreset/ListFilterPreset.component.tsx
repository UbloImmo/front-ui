import { useMemo } from "react";
import styled from "styled-components";

import { listFilterPresetButtonStyles } from "./ListFilterPreset.styles";
import { useListFilterPreset } from "./ListFilterPreset.utils";

import { Badge, type BadgeProps } from "@/components/Badge";
import { Text } from "@/components/Text";
import { useTestId } from "@/utils/props.utils";
import { normalizeToPaletteColor, useUikitTranslation } from "@utils";

import type {
  ListFilterPresetProps,
  ListFilterPresetStyleProps,
} from "./ListFilterPreset.types";
import type { PaletteColor } from "@types";

/**
 * A component that displays a single filter preset button
 * and allows interacting with it.
 *
 * @version 0.0.3
 *
 * @param {ListFilterPresetProps} props
 * @returns {Nullable<JSX.Element>}
 */
export const ListFilterPreset = <TItem extends object = object>(
  props: ListFilterPresetProps<TItem>
) => {
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

  const textColor = useMemo<PaletteColor>(() => {
    if (filterPreset.disabled) return "gray-600";
    if (filterPreset.active)
      return normalizeToPaletteColor(filterPreset.paletteColor, "dark");
    return "gray-800";
  }, [filterPreset.active, filterPreset.disabled, filterPreset.paletteColor]);

  const tl = useUikitTranslation();

  const title = useMemo(() => {
    return tl.action[filterPreset.active ? "unselect" : "select"](
      filterPreset.label
    );
  }, [filterPreset.active, filterPreset.label, tl]);

  if (filterPreset.hidden) return null;

  return (
    <ListFilterPresetButton
      disabled={filterPreset.disabled}
      onClick={filterPreset.toggle}
      {...styleProps}
      data-testid={testId}
      title={title}
    >
      <Text
        weight="medium"
        color={textColor}
        testId="filter-preset-button-label"
        fill
        ellipsis
      >
        {filterPreset.label}
      </Text>
      <Badge {...badgeProps} />
    </ListFilterPresetButton>
  );
};

const ListFilterPresetButton = styled.button<ListFilterPresetStyleProps>`
  ${listFilterPresetButtonStyles}
`;
