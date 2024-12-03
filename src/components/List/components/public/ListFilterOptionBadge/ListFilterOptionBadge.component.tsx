import { useMemo } from "react";

import { Badge, type BadgeProps } from "@/components/Badge";
import { useListContext } from "@/components/List/context";
import {
  arrayComparison,
  itemMatchesOption,
} from "@/components/List/modules/DataProvider/StaticDataProvider/StaticDataProvider.utils";
import { useUikitTranslation } from "@utils";

import type { ListFilterOptionBadgeProps } from "./ListFilterOptionBadge.types";
import type { FilterOptionData } from "@/components/List/modules";

/**
 * Displays a badge based on a list item's property and the list's options.
 *
 * @template {object} TItem - The type of the list item
 * @param {ListFilterOptionBadgeProps<TItem>} props - The component props
 *
 * @returns {JSX.Element} - The badge
 */
export const ListFilterOptionBadge = <TItem extends object>({
  property,
  item,
  emptyLabel,
}: ListFilterOptionBadgeProps<TItem>): JSX.Element => {
  const { options } = useListContext<TItem>();
  const tl = useUikitTranslation();

  const badgeProps = useMemo<BadgeProps>(() => {
    const emptyBadge: BadgeProps = {
      label: emptyLabel ?? tl.status.unspecified(),
      color: "gray",
    };
    if (!property) return emptyBadge;
    const propertyOptions = options.filter((option) =>
      option.matches[arrayComparison(option.operator)](
        (match) => match.property === property
      )
    );

    if (!propertyOptions.length) return emptyBadge;

    const refinedOptions = propertyOptions.map(
      (option): FilterOptionData<TItem> => {
        const matches = option.matches.filter(
          (match) => match.property === property
        );
        return {
          ...option,
          selected: true,
          matches,
        };
      }
    );

    if (!refinedOptions.length) return emptyBadge;

    const matchingOption = refinedOptions.find((option) =>
      itemMatchesOption(item, option)
    );

    if (!matchingOption) return emptyBadge;

    return {
      label: matchingOption.label,
      color: matchingOption.colorKey,
      icon: matchingOption.icon,
    };
  }, [options, emptyLabel, tl.status, item, property]);

  return (
    <Badge {...badgeProps} testId="list-filter-option-badge" overrideTestId />
  );
};
