import { useCallback, useMemo } from "react";

import {
  useListTableHeaderSortClassnames,
  useSortIcons,
} from "./ListTableHeaderSort.styles";

import { Icon } from "@/components/Icon";
import { useListContext } from "@/components/List/context";
import { Text } from "@/components/Text";
import { Tooltip, TooltipProps } from "@/components/Tooltip";
import { FlexRowLayout, TableHeaderCell } from "@layouts";
import { isNonEmptyString, useTestId, useUikitTranslation } from "@utils";

import type { ListTableHeaderSortProps } from "./ListTableHeaderSort.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * Allows controlling a list sort from a table header cell.
 *
 * @version 0.0.1
 *
 * @template {object} TItem - Type of a single list item
 *
 * @param {ListTableHeaderSortProps<TItem> & TestIdProps} props - ListTableHeaderSort component props
 * @returns {JSX.Element}
 */
export const ListTableHeaderSort = <TItem extends object>(
  props: ListTableHeaderSortProps<TItem> & TestIdProps
): JSX.Element => {
  const { getSort } = useListContext<TItem>();

  const testId = useTestId("list-table-header-sort", props as TestIdProps);

  const sort = useMemo(
    () => getSort(props.property),
    [getSort, props.property]
  );

  const justify = useMemo(
    () => (props.hideLabel ? "center" : "space-between"),
    [props.hideLabel]
  );

  const tl = useUikitTranslation();

  const sortTooltipProps = useMemo<
    Nullable<Omit<TooltipProps, "children">>
  >(() => {
    if (!sort) return null;
    const label = sort.label ?? props.fallbackLabel;
    const content = sort.prioritized
      ? tl.action.invertSortingOrder()
      : isNonEmptyString(label)
        ? tl.action.sortBy(label.toLowerCase())
        : tl.action.sort();
    return {
      content,
      direction: props.tooltipDirection ?? "top",
      cursor: "pointer",
    };
  }, [props.fallbackLabel, props.tooltipDirection, sort, tl.action]);

  const icons = useSortIcons(sort?.iconSet);
  const classNames = useListTableHeaderSortClassnames(
    sort?.prioritized,
    sort?.inverted,
    props.hideLabel,
    props.className
  );

  const onSortClick = useCallback(() => {
    if (!sort) return;
    if (!sort.prioritized) return sort.prioritize();
    sort.invert();
  }, [sort]);

  const label = useMemo(
    () => sort?.label ?? props.fallbackLabel,
    [sort?.label, props.fallbackLabel]
  );

  if (!sort?.active)
    return (
      <TableHeaderCell
        testId={testId}
        overrideTestId
        styleOverride={props.styleOverride}
        colSpan={props.colSpan}
        className={props.className}
      >
        {props.fallbackLabel}
      </TableHeaderCell>
    );

  return (
    <TableHeaderCell
      testId={testId}
      overrideTestId
      styleOverride={props.styleOverride}
      className={classNames.cell}
    >
      <FlexRowLayout justify={justify} align="center" gap="s-1" fill>
        {!props.hideLabel && (
          <Text
            color="gray-800"
            size="m"
            weight="bold"
            testId="input-label-text"
            noWrap
            ellipsis
            title={label}
          >
            {label}
          </Text>
        )}
        <FlexRowLayout align="center" justify="end" gap="s-2">
          {!props.hideLabel && props.tooltip && (
            <Tooltip
              {...props.tooltip}
              direction={
                props.tooltipDirection ?? props.tooltip?.direction ?? "top"
              }
              iconColor="primary-medium"
            />
          )}
          {!!sortTooltipProps && sort && (
            <Tooltip {...sortTooltipProps}>
              <button
                className={classNames.button}
                data-testid={`${testId}-trigger`}
                type="button"
                disabled={!sort.active}
                onClick={onSortClick}
              >
                <Icon size="s-4" name={icons.base} color="primary-medium" />
                <Icon size="s-4" name={icons.inverted} color="primary-medium" />
              </button>
            </Tooltip>
          )}
        </FlexRowLayout>
      </FlexRowLayout>
    </TableHeaderCell>
  );
};
