import {
  type VoidFn,
  isFunction,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { type MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  customSelectOptionStyles,
  selectOptionLabelContainerStyles,
  selectOptionStyles,
} from "../SelectInput.styles";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexRowLayout } from "@/layouts/Flex";
import { useHtmlAttribute, useStyleProps, useTestId } from "@utils";

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
const SelectInputOption = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>({
  Option,
  onSelect,
  ...option
}: SelectInputOptionProps<TValue, TExtraData>): JSX.Element => {
  const styleProps = useStyleProps(option);

  const contentColor = useMemo<PaletteColor>(() => {
    return option.disabled
      ? "gray-500"
      : option.active
        ? "gray-900"
        : "gray-800";
  }, [option]);

  const propagateSelection = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isFunction<VoidFn>(onSelect)) onSelect();
    },
    [onSelect]
  );

  const textProps = useMemo<TextProps>(
    () => ({
      color: contentColor,
      weight: option.active ? "bold" : "medium",
      size: "m",
    }),
    [contentColor, option]
  );

  const testId = useTestId("input-select-option", option);

  const ariaDisabled = useHtmlAttribute(option.disabled ? true : null);

  if (Option)
    return (
      <CustomSelectOptionContainer
        title={option.label}
        role="option"
        onClick={propagateSelection}
        aria-selected={option.active}
        data-active={option.active}
        data-testid={testId}
        aria-disabled={ariaDisabled}
        {...styleProps}
        tabIndex={option.disabled ? -1 : 0}
      >
        <Option {...option} />
      </CustomSelectOptionContainer>
    );

  return (
    <SelectOptionContainer
      role="option"
      onClick={propagateSelection}
      aria-selected={option.active}
      data-active={option.active}
      data-testid={testId}
      aria-disabled={option.disabled}
      {...styleProps}
      tabIndex={option.disabled ? -1 : 0}
      title={option.label}
    >
      <SelectOptionValueContainer
        {...styleProps}
        align="center"
        justify="start"
        gap="s-1"
        fill
      >
        {option.icon && (
          <Icon name={option.icon} color={contentColor} size="s-3" />
        )}
        <Text
          {...textProps}
          testId="input-select-option-label"
          overrideTestId
          ellipsis
        >
          {option.label}
        </Text>
      </SelectOptionValueContainer>

      {option.active && <Icon name="Check" color={contentColor} size="s-4" />}
    </SelectOptionContainer>
  );
};

export { SelectInputOption };

const SelectOptionContainer = styled.div<SelectOptionItemStyleProps>`
  ${selectOptionStyles}
`;

const CustomSelectOptionContainer = styled.div<SelectOptionItemStyleProps>`
  ${customSelectOptionStyles}
`;

const SelectOptionValueContainer = styled(
  FlexRowLayout
)<SelectOptionItemStyleProps>`
  ${selectOptionLabelContainerStyles}
`;
