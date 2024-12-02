import { useMemo } from "react";

import { Badge, type BadgeProps } from "@/components/Badge";
import { useListContext } from "@/components/List/context";
import {
  arrayComparison,
  itemMatchesOption,
} from "@/components/List/modules/DataProvider/StaticDataProvider/StaticDataProvider.utils";
import { useUikitTranslation } from "@utils";

import type { ListFilterOptionBadgeProps } from "./ListFilterOptionBadge.types";

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
    const matchingOption = options.find(
      (option) =>
        option.matches[arrayComparison(option.operator)](
          (match) => match.property === property
        ) &&
        itemMatchesOption(item, {
          ...option,
          selected: true,
        })
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
