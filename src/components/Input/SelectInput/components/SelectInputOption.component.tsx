import {
  type VoidFn,
  isFunction,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { type MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import { buildSelectOptionItemStyles } from "../SelectInput.styles";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexRowLayout } from "@layouts";
import { useStyleProps } from "@utils";

import type {
  SelectOptionItemStyleProps,
  SelectInputOptionProps,
} from "../SelectInput.types";
import type { PaletteColor, TextProps } from "@types";

/**
 * Renders a single select option
 * @template {NullishPrimitives} TValue - The option's value
 * @param {SelectInputOptionProps<TValue>} props - The option to render and its `onSelect` callback
 * @returns JSX.Element
 */
const SelectInputOption = <TValue extends NullishPrimitives>(
  props: SelectInputOptionProps<TValue>
): JSX.Element => {
  const styleProps = useStyleProps(props);

  const contentColor = useMemo<PaletteColor>(() => {
    return props.disabled ? "gray-500" : props.active ? "gray-900" : "gray-800";
  }, [props]);

  const propagateSelection = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isFunction<VoidFn>(props.onSelect)) props.onSelect();
    },
    [props]
  );

  const textProps = useMemo<TextProps>(
    () => ({
      color: contentColor,
      weight: props.active ? "bold" : "medium",
      size: "m",
    }),
    [contentColor, props.active]
  );

  return (
    <SelectOptionItem
      role="option"
      onClick={propagateSelection}
      aria-selected={props.active}
      data-active={props.active}
      data-testid="input-select-option"
      aria-disabled={props.disabled}
      {...styleProps}
      tabIndex={props.disabled ? -1 : 0}
    >
      <FlexRowLayout align="center" justify="start" gap="s-1">
        {props.icon && (
          <Icon name={props.icon} color={contentColor} size="s-3" />
        )}
        <Text
          {...textProps}
          testId="input-select-option-label"
          overrideTestId
          ellipsis
        >
          {props.label}
        </Text>
      </FlexRowLayout>
      {props.active && <Icon name="Check" color={contentColor} size="s-4" />}
    </SelectOptionItem>
  );
};

export { SelectInputOption };

const SelectOptionItem = styled.div<SelectOptionItemStyleProps>`
  ${buildSelectOptionItemStyles}
`;
