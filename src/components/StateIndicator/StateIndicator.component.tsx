import { useMemo } from "react";
import styled from "styled-components";

import {
  computeStateIndicatorColors,
  stateIndicatorStyle,
} from "./StateIndicator.styles";

import { FlexLayout } from "@/layouts";
import { useMergedProps, useStyleProps, useTestId } from "@utils";

import { Icon, IconProps, Text } from "@components";

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
 * @version 0.0.1
 *
 * @param {TestIdProps & StateIndicatorProps} props - the state indicator props
 * @returns {JSX.Element} - the state indicator markup
 */
const StateIndicator = (
  props: TestIdProps & StateIndicatorProps
): JSX.Element => {
  const testId = useTestId("state-indicator", props);
  const mergedProps = useMergedProps(defaultStateIndicatorProps, props);
  const colors = useMemo(
    () => computeStateIndicatorColors(mergedProps.color),
    [mergedProps]
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
      size: "s",
      weight: "medium",
      color: colors.label,
    };
  }, [colors]);

  return (
    <StateIndicatorContainer {...styleProps} data-testid={testId}>
      <FlexLayout align="center" justify="start" fill gap="s-3">
        <Icon {...iconProps} />
        <Text {...TextProps} ellipsis>
          {mergedProps.label}
        </Text>
      </FlexLayout>
    </StateIndicatorContainer>
  );
};
StateIndicator.defaultProps = defaultStateIndicatorProps;

export { StateIndicator };

const StateIndicatorContainer = styled.div<StateIndicatorStyleProps>`
  ${stateIndicatorStyle}
`;
