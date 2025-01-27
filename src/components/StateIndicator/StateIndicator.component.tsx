import { useMemo } from "react";
import styled from "styled-components";

import {
  computeStateIndicatorColors,
  stateIndicatorStyle,
} from "./StateIndicator.styles";

import { Icon, type IconProps } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useMergedProps, useStyleProps, useTestId } from "@utils";

import type {
  DefaultStateIndicatorProps,
  StateIndicatorProps,
  StateIndicatorStyleProps,
} from "./StateIndicator.types";
import type { TextProps, TestIdProps } from "@types";

const defaultStateIndicatorProps: DefaultStateIndicatorProps = {
  label: "[Label]",
  color: "primary",
  icon: "Circle",
};

/**
 * Essentially a blown up `Badge` that fills its container
 * and has an extra `white` color.
 *
 * @version 0.0.4
 *
 * @param {TestIdProps & StateIndicatorProps} props - the state indicator props
 * @returns {JSX.Element} - the state indicator markup
 */
const StateIndicator = (
  props: TestIdProps & StateIndicatorProps,
): JSX.Element => {
  const testId = useTestId("state-indicator", props);
  const mergedProps = useMergedProps(defaultStateIndicatorProps, props);
  const colors = useMemo(
    () => computeStateIndicatorColors(mergedProps.color),
    [mergedProps],
  );
  const styleProps = useStyleProps(colors);

  const iconProps = useMemo<IconProps>(() => {
    return {
      name: mergedProps.icon,
      color: colors.icon,
      size: "s-3",
    };
  }, [mergedProps, colors]);

  const TextProps = useMemo<TextProps>(() => {
    return {
      size: "m",
      weight: "medium",
      color: colors.label,
      ellipsis: true,
    };
  }, [colors]);

  return (
    <StateIndicatorContainer {...styleProps} data-testid={testId} role="status">
      <Icon {...iconProps} />
      <Text {...TextProps}>{mergedProps.label}</Text>
    </StateIndicatorContainer>
  );
};
StateIndicator.defaultProps = defaultStateIndicatorProps;

export { StateIndicator };

const StateIndicatorContainer = styled.div<StateIndicatorStyleProps>`
  ${stateIndicatorStyle}
`;
