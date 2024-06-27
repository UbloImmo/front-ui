import { isNull } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  ComboBoxButtonStyles,
  ComboBoxIconContainerStyle,
} from "./ComboBoxButton.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { StyleProps, type TestIdProps } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  isEmptyString,
  useStyleProps,
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
};

/**
 * A single clickable option in a ComboBox
 *
 * @version 0.0.1
 *
 * @param {ComboBoxButtonProps & TestIdProps} props - ComboBoxButton component props
 * @returns {JSX.Element}
 */
const ComboBoxButton = (
  props: ComboBoxButtonProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("ComboBoxButton");
  const mergedProps = useMergedProps(defaultComboBoxButtonProps, props);
  const { label, multi, active } = mergedProps;
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

  return (
    <ComboBoxButtonContainer
      data-testid={testId}
      onClick={onSelect}
      disabled={mergedProps.disabled}
      {...styleProps}
    >
      <ComboBoxIconContainer $active={active ?? false}>
        <Icon name={iconName} />
        <Icon name={iconName} />
      </ComboBoxIconContainer>

      <Text weight="medium" ellipsis>
        {label}
      </Text>
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
