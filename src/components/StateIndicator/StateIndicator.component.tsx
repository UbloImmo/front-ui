import { useMemo } from "react";

import {
  computeStateIndicatorColors,
  useStateIndicatorStyles,
} from "./StateIndicator.styles";

import { Icon, type IconProps } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useMergedProps, useTestId } from "@utils";

import type {
  DefaultStateIndicatorProps,
  StateIndicatorProps,
} from "./StateIndicator.types";
import type { TextProps, TestIdProps } from "@types";

const defaultStateIndicatorProps: DefaultStateIndicatorProps = {
  label: "[Label]",
  color: "primary",
  icon: "Circle",
  className: null,
  styleOverride: null,
  as: "div",
};

/**
 * Essentially a blown up `Badge` that fills its container
 * and has an extra `white` color.
 *
 * @version 0.1.0
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
  const { className, style, labelClassName } = useStateIndicatorStyles(
    colors,
    mergedProps
  );

  const iconProps = useMemo<IconProps>(() => {
    return {
      name: mergedProps.icon,
      color: colors.icon,
      size: "s-3",
    };
  }, [mergedProps.icon, colors]);

  const TextProps = useMemo<TextProps>(() => {
    return {
      size: "m",
      weight: "medium",
      color: colors.label,
      ellipsis: true,
    };
  }, [colors.label]);

  const Element = mergedProps.as;

  return (
    <Element
      className={className}
      style={style}
      data-testid={testId}
      role="status"
    >
      <Icon {...iconProps} />
      <Text className={labelClassName} {...TextProps}>
        {mergedProps.label}
      </Text>
    </Element>
  );
};
StateIndicator.defaultProps = defaultStateIndicatorProps;

export { StateIndicator };
