import { isNull } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  ComboBoxButtonStyles,
  ComboBoxIconContainerStyle,
} from "./ComboBoxButton.styles";
import { Icon, type IconProps } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
import { StyleProps, type TestIdProps, type TextProps } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  isEmptyString,
  useStyleProps,
  useUikitTranslation,
} from "@utils";

import type {
  ComboBoxButtonProps,
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";

const defaultComboBoxButtonProps: ComboBoxButtonDefaultProps = {
  active: false,
  multi: false,
  label: "[ComboBox option]",
  onSelect: null,
  disabled: false,
  fill: false,
  showIcon: true,
  description: null,
};

/**
 * A single clickable option in a ComboBox
 *
 * @version 0.0.5
 *
 * @param {ComboBoxButtonProps & TestIdProps} props - ComboBoxButton component props
 * @returns {JSX.Element}
 */
const ComboBoxButton = (
  props: ComboBoxButtonProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("ComboBoxButton");
  const mergedProps = useMergedProps(defaultComboBoxButtonProps, props);
  const { label, multi, active, showIcon, disabled, description } = mergedProps;
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("combo-box-button", props);

  if (!props.label || isEmptyString(props.label)) {
    warn(
      `Missing required label, defaulting to ${defaultComboBoxButtonProps.label}`
    );
  }

  const onSelect = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (isNull(mergedProps.onSelect)) return;
      event.stopPropagation();
      mergedProps.onSelect();
    },
    [mergedProps]
  );

  const iconName = useMemo(() => {
    return multi
      ? active
        ? "CheckSquareFill"
        : "Square"
      : active
      ? "CheckCircleFill"
      : "Circle";
  }, [multi, active]);

  if (multi && !showIcon) {
    warn("Multi mode requires showIcon to be true");
  }

  const textProps = useMemo<TextProps>(
    () => ({
      color: disabled
        ? active
          ? "gray-800"
          : "gray-600"
        : active
        ? "primary-dark"
        : "gray-800",
      weight: active ? "bold" : "medium",
      size: "m",
      ellipsis: true,
    }),
    [active, disabled]
  );

  const iconProps = useMemo<IconProps>(
    () => ({
      color: disabled ? "gray-400" : active ? "primary-base" : "primary-medium",
      name: iconName,
    }),
    [active, disabled, iconName]
  );

  const tl = useUikitTranslation();
  const ariaLabel = useMemo(() => {
    return tl.action[active ? "unselect" : "select"](label);
  }, [active, label, tl.action]);

  return (
    <ComboBoxButtonContainer
      data-testid={testId}
      onClick={onSelect}
      disabled={mergedProps.disabled}
      type="button"
      title={ariaLabel}
      aria-label={ariaLabel}
      aria-disabled={mergedProps.disabled}
      {...styleProps}
    >
      {showIcon && (
        <ComboBoxIconContainer $active={active ?? false}>
          <Icon {...iconProps} />
          <Icon {...iconProps} />
        </ComboBoxIconContainer>
      )}

      <FlexColumnLayout
        gap="s-1"
        align="start"
        justify="start"
        testId="combo-box-button-content"
        overrideTestId
      >
        <Text {...textProps} testId="combo-box-button-label" overrideTestId>
          {label}
        </Text>
        {description && (
          <Text
            color="gray-600"
            testId="combo-box-button-description"
            overrideTestId
          >
            {description}
          </Text>
        )}
      </FlexColumnLayout>
    </ComboBoxButtonContainer>
  );
};

ComboBoxButton.defaultProps = defaultComboBoxButtonProps;

export { ComboBoxButton };

const ComboBoxButtonContainer = styled.button<
  StyleProps<ComboBoxButtonDefaultProps>
>`
  ${ComboBoxButtonStyles}
`;

const ComboBoxIconContainer = styled.div<ComboButtonIconContainerStyleProps>`
  ${ComboBoxIconContainerStyle}
`;
