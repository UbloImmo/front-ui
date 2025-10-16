import { useCallback, useMemo } from "react";
import styled from "styled-components";

import { listFilterOptionItemStyles } from "./ListFilterOptionItem.styles";

import { Checkbox } from "@/components/Checkbox";
import { Icon, IconProps, type IconName } from "@/components/Icon";
import { CLEAR_FILTER_OPTION_SIGNATURE } from "@/components/List/modules/FilterOption/FilterOption.hook";
import { Text } from "@/components/Text";
import { FlexLayout } from "@/layouts/Flex";
import { TextProps } from "@types";
import { useMergedProps, useStyleProps } from "@utils";

import type {
  ListFilterOptionItemProps,
  ListFilterOptionItemStyleProps,
} from "./ListFilterOptionItem.types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * Renders a filter option's list item in a filter.
 *
 * @version 0.0.3
 *
 * @template {object} TItem - The type of the list's items
 * @param {ListFilterOptionItemProps<TItem>} props - The component's props
 * @returns {Nullable<JSX.Element>} The component's rendered element
 */
export const ListFilterOptionItem = <TItem extends object = object>({
  option,
  highlighted,
  multi,
  closeFilter,
}: ListFilterOptionItemProps<TItem>): Nullable<JSX.Element> => {
  const highlightProps = useMergedProps(
    { highlighted: false },
    { highlighted }
  );
  const styleProps = useStyleProps(highlightProps);
  const matchAttr = useMemo(
    () =>
      option?.matches
        .map(({ value, comparison, property }) =>
          [property, comparison, JSON.stringify(value)].join(" ")
        )
        .join(option.operator) ?? "",
    [option]
  );

  const textProps = useMemo<TextProps>(() => {
    return {
      size: "s",
      weight: option.selected ? "bold" : "medium",
      color: option.disabled
        ? "gray-500"
        : highlighted
          ? "gray-800"
          : "gray-700",
      fill: true,
      lineClamp: 3,
    };
  }, [highlighted, option.disabled, option.selected]);

  const iconProps = useMemo<Nullable<IconProps>>(() => {
    const name: IconName = option.icon
      ? option.icon
      : option.selected
        ? "CircleFill"
        : "Circle";

    return {
      name,
      color: option.disabled ? "gray-400" : option.paletteColor,
      size: "s-3",
    };
  }, [option]);

  const toggleOptionSelection = useCallback(() => {
    (option.selected ? option.unselect : option.select)();
  }, [option]);

  const toggleOptionSelectionAndClose = useCallback(() => {
    if (option.disabled || option.fixed) return;
    toggleOptionSelection();
    if (closeFilter) closeFilter();
  }, [option.disabled, option.fixed, toggleOptionSelection, closeFilter]);

  if (option.hidden) return null;

  return (
    <ListFilterOptionItemContainer
      {...styleProps}
      data-testid="list-filter-option"
      aria-selected={option.selected}
      aria-disabled={option.disabled}
      aria-label={option.label}
      title={option.label}
      role="option"
      data-option-signature={option.signature}
      data-selected={option.selected}
      data-option-match={matchAttr}
      onClick={toggleOptionSelectionAndClose}
    >
      <FlexLayout fill direction="row" align="center" gap="s-2">
        {option.icon && <Icon {...iconProps} key="option icon" />}
        <Text {...textProps}>{option.label}</Text>
        {option.signature === CLEAR_FILTER_OPTION_SIGNATURE ? null : multi ? (
          <Checkbox
            key="option checkbox"
            disabled={option.disabled || option.fixed}
            active={option.selected}
            onChange={toggleOptionSelection}
          />
        ) : (
          option.selected && (
            <Icon name="CheckLg" color="primary-base" size="s-4" />
          )
        )}
      </FlexLayout>
    </ListFilterOptionItemContainer>
  );
};

const ListFilterOptionItemContainer = styled.li<ListFilterOptionItemStyleProps>`
  ${listFilterOptionItemStyles}
`;
