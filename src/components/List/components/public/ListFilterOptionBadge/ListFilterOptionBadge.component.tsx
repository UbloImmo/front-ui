import { Optional } from "@ubloimmo/front-util";
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
 * @version 0.1.1
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
  const { optionsMap } = useListContext<TItem>();
  const tl = useUikitTranslation();

  const badgeProps = useMemo<BadgeProps>(() => {
    const emptyBadge: BadgeProps = {
      label: emptyLabel ?? tl.status.unspecified(),
      color: "gray",
    };
    if (!property) return emptyBadge;

    let matchingOption: Optional<FilterOptionData<TItem>> = undefined;
    for (const [_, option] of optionsMap) {
      if (
        !option.matches[arrayComparison(option.operator)](
          (match) => match.property === property
        )
      )
        continue;
      if (
        itemMatchesOption(
          item,
          option.matches.length > 1
            ? {
                ...option,
                matches: option.matches.filter(
                  (match) => match.property === property
                ),
              }
            : option,
          true
        )
      ) {
        matchingOption = option;
        break;
      }
    }

    if (!matchingOption) return emptyBadge;

    return {
      label: matchingOption.label,
      color: matchingOption.colorKey,
      icon: matchingOption.icon,
    };
  }, [emptyLabel, tl.status, property, optionsMap, item]);

  return (
    <Badge {...badgeProps} testId="list-filter-option-badge" overrideTestId />
  );
};
