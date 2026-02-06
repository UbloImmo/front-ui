import {
  type VoidFn,
  isFunction,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { type MouseEventHandler, useCallback, useMemo } from "react";

import { useSelectInputOptionClassNames } from "../SelectInput.styles";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { FlexRowLayout } from "@/layouts/Flex";
import { useHtmlAttribute, useTestId } from "@utils";

import type { SelectInputOptionProps } from "../SelectInput.types";
import type { PaletteColor, TextProps } from "@types";

/**
 * Renders a single select option
 *
 * @version 0.1.0
 *
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
  const contentColor = useMemo<PaletteColor>(() => {
    return option.disabled
      ? "gray-500"
      : option.active
        ? "gray-900"
        : "gray-800";
  }, [option]);

  const iconColor = useMemo<PaletteColor>(() => {
    return option.disabled ? "gray-500" : (option.iconColor ?? contentColor);
  }, [option.disabled, option.iconColor, contentColor]);

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
  const classNames = useSelectInputOptionClassNames(option.active);

  const ariaDisabled = useHtmlAttribute(option.disabled ? true : null);

  if (Option)
    return (
      <div
        className={classNames.custom}
        title={option.label}
        role="option"
        onClick={propagateSelection}
        aria-selected={option.active}
        data-active={option.active}
        data-testid={testId}
        aria-disabled={ariaDisabled}
        tabIndex={option.disabled ? -1 : 0}
      >
        <Option {...option} />
      </div>
    );

  return (
    <div
      className={classNames.option}
      role="option"
      onClick={propagateSelection}
      aria-selected={option.active}
      data-active={option.active}
      data-testid={testId}
      aria-disabled={option.disabled}
      tabIndex={option.disabled ? -1 : 0}
      title={option.label}
    >
      <FlexRowLayout
        className={classNames.value}
        align="center"
        justify="start"
        gap="s-1"
        fill
      >
        {option.icon && (
          <Icon name={option.icon} color={iconColor} size="s-3" />
        )}
        <Text
          className={classNames.label}
          {...textProps}
          testId="input-select-option-label"
          overrideTestId
          ellipsis
        >
          {option.label}
        </Text>
      </FlexRowLayout>

      {option.active && <Icon name="Check" color={contentColor} size="s-4" />}
    </div>
  );
};

export { SelectInputOption };
