import { isObject, isString, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { ListFilter } from "../ListFilter";
import {
  listTableHeaderFilterButtonStyles,
  listTableHeaderFilterLabelStyles,
  listTableHeaderFilterStyles,
} from "./ListTableHeaderFilter.styles";

import { Icon } from "@/components/Icon";
import {
  InputLabelText,
  type InputLabelTextStyleProps,
} from "@/components/InputLabel";
import { useListContext } from "@/components/List/context";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import { parseFixedLength } from "@/sizes/size.utils";
import {
  FlexRowLayout,
  Popover,
  TableHeaderCell,
  type PopoverCollisionCompoundPadding,
} from "@layouts";
import {
  cssPx,
  cssRemToCssPx,
  extractPx,
  useTestId,
  useUikitTranslation,
} from "@utils";

import type {
  ListTableHeaderFilterProps,
  ListTableHeaderFilterStyleProps,
} from "./ListTableHeaderFilter.types";
import type { TestIdProps, TextProps } from "@types";

/**
 * Allows controlling a list filter from a table header cell.
 *
 * @version 0.0.2
 *
 * @param {ListTableHeaderFilterProps} props - ListTableHeaderFilter component props
 * @returns {JSX.Element}
 */
export const ListTableHeaderFilter = (
  props: ListTableHeaderFilterProps & TestIdProps
) => {
  const { getFilterBySignature, loading } = useListContext();

  const [open, setOpen] = useState(false);

  const testId = useTestId("list-table-header-filter", props as TestIdProps);

  const cellRef = useRef<HTMLTableCellElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const computeCollisionPadding = useCallback((): Pick<
    PopoverCollisionCompoundPadding,
    "bottom" | "right"
  > => {
    if (!cellRef.current || !triggerRef.current) return {};
    const cellRect = cellRef.current.getBoundingClientRect();
    const buttonRect = triggerRef.current.getBoundingClientRect();
    const right = buttonRect.right - cellRect.right;
    const bottom =
      buttonRect.bottom -
      cellRect.bottom +
      extractPx(cssRemToCssPx(parseFixedLength("s-1")));
    return {
      right: cssPx(right),
      bottom: cssPx(-bottom),
    };
  }, []);

  const [alignOffset, setAllignOffset] = useState<
    Pick<PopoverCollisionCompoundPadding, "bottom" | "right">
  >(computeCollisionPadding);

  /**
   * Update collision padding a tick after loading state changes
   * to account for layout shift once data is laoded
   */
  useEffect(() => {
    setTimeout(() => setAllignOffset(computeCollisionPadding()));
  }, [loading, computeCollisionPadding]);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const filter = useMemo(() => {
    if (!props.filter) return null;
    const signature =
      isObject(props.filter) &&
      "signature" in props.filter &&
      isString(props.filter.signature)
        ? props.filter.signature
        : isString(props.filter)
          ? props.filter
          : null;
    if (!signature) return null;
    return getFilterBySignature(signature);
  }, [props.filter, getFilterBySignature]);

  const tl = useUikitTranslation();

  const filterTooltipProps = useMemo<
    Nullable<Omit<TooltipProps, "children">>
  >(() => {
    if (!filter) return null;
    return {
      content: tl.action.filterBy(filter.label.toLowerCase()),
      direction: "top",
      cursor: "pointer",
    };
  }, [filter, tl.action]);

  const justify = useMemo(
    () => (props.hideLabel ? "center" : "space-between"),
    [props.hideLabel]
  );

  if (!filter)
    return (
      <TableHeaderCell colSpan={props.colSpan} className={props.className}>
        {props.fallbackLabel}
      </TableHeaderCell>
    );

  return (
    <FilterHeaderCell
      ref={cellRef}
      testId={testId}
      colSpan={props.colSpan}
      className={props.className}
      overrideTestId
      $hideLabel={props.hideLabel}
    >
      <Popover
        open={open}
        onOpenChange={setOpen}
        align="end"
        fill
        fitTriggerWidth
        sideOffset={alignOffset.bottom}
        alignOffset={alignOffset.right}
        content={
          <ListFilter
            filter={filter ?? undefined}
            signature=""
            open={open}
            onClosed={close}
          />
        }
      >
        <FlexRowLayout
          justify={justify}
          align="center"
          gap="s-1"
          fill
          ref={triggerRef}
        >
          {!props.hideLabel && (
            <TableHeaderLabelText
              color="gray-800"
              size="m"
              weight="bold"
              testId="input-label-text"
              $required={false}
              noWrap
            >
              {filter?.label ?? props.fallbackLabel}
            </TableHeaderLabelText>
          )}
          <FlexRowLayout align="center" justify="end" gap="s-2">
            {!props.hideLabel && props.tooltip && (
              <Tooltip {...props.tooltip} iconColor="primary-medium" />
            )}
            <Tooltip {...filterTooltipProps}>
              <FilterButton
                data-testid={`${testId}-trigger`}
                $active={filter?.active}
                type="button"
                disabled={filter.disabled}
              >
                <Icon size="s-4" name="FilterCircle" color="primary-medium" />
                <Icon
                  size="s-4"
                  name="FilterCircleFill"
                  color="primary-medium"
                />
              </FilterButton>
            </Tooltip>
          </FlexRowLayout>
        </FlexRowLayout>
      </Popover>
    </FilterHeaderCell>
  );
};

const FilterHeaderCell = styled(
  TableHeaderCell
)<ListTableHeaderFilterStyleProps>`
  ${listTableHeaderFilterStyles}
`;

const TableHeaderLabelText = styled(InputLabelText)<
  InputLabelTextStyleProps & TextProps
>`
  ${listTableHeaderFilterLabelStyles}
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  ${listTableHeaderFilterButtonStyles}
`;
