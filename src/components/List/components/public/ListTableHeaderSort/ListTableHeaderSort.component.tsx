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

export const ListTableHeaderSort = <TItem extends object>(
  props: ListTableHeaderSortProps<TItem> & TestIdProps
) => {
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
    const content = isNonEmptyString(label)
      ? tl.action.sortBy(label.toLowerCase())
      : tl.action.sort();
    return {
      content,
      direction: "top",
      cursor: "pointer",
    };
  }, [props.fallbackLabel, sort, tl.action]);

  const icons = useSortIcons(sort?.iconSet);
  const classNames = useListTableHeaderSortClassnames(
    sort?.prioritized,
    sort?.inverted,
    props.hideLabel,
    props.className
  );

  const onInvertClick = useCallback(() => {
    if (!sort) return;
    if (sort.prioritized) return sort.invert();
    sort.prioritize();
  }, [sort]);

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
            className={classNames.label}
            color="gray-800"
            size="m"
            weight="bold"
            testId="input-label-text"
            noWrap
          >
            {sort?.label ?? props.fallbackLabel}
          </Text>
        )}
        <FlexRowLayout align="center" justify="end" gap="s-2">
          {!props.hideLabel && props.tooltip && (
            <Tooltip {...props.tooltip} iconColor="primary-medium" />
          )}
          {!!sortTooltipProps && sort && (
            <Tooltip {...sortTooltipProps}>
              <button
                className={classNames.button}
                data-testid={`${testId}-trigger`}
                type="button"
                disabled={!sort.active}
                onClick={onInvertClick}
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
