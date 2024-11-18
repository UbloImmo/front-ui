import { isNull } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { calloutStyle, computeCalloutIconNames } from "./Callout.styles";
import {
  type CalloutProps,
  type CalloutDefaultProps,
  CalloutStyleProps,
} from "./Callout.types";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
import {
  PaletteColor,
  type SpacingLabel,
  type TestIdProps,
  type TypographyWeight,
} from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useStyleProps,
  useClassName,
  isGrayColor,
} from "@utils";

const defaultCalloutProps: CalloutDefaultProps = {
  children: "[label]",
  color: "primary",
  icon: "auto",
  title: null,
  size: "m",
  className: null,
};

const CalloutIcon = ({ size, color, icon }: CalloutDefaultProps) => {
  const iconSize = useMemo<SpacingLabel>(
    () => (size === "l" ? "s-6" : "s-4"),
    [size]
  );
  const iconColor = useMemo<PaletteColor>(
    () => (isGrayColor(color) ? "gray-600" : `${color}-base`),
    [color]
  );

  const iconName = useMemo(() => {
    if (isNull(icon)) return null;
    return icon === "auto" ? computeCalloutIconNames[color] : icon;
  }, [icon, color]);

  return (
    <Icon name={iconName ?? undefined} color={iconColor} size={iconSize} />
  );
};

/**
 * A card to display permanent feedback information.
 * Its color indicates the type of feedback.
 *
 * @version 0.0.4
 *
 * @param {CalloutProps & TestIdProps} props - Callout component props
 * @returns {JSX.Element}
 */
const Callout = (props: CalloutProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Callout");
  const mergedProps = useMergedProps(defaultCalloutProps, props);
  const { color, size, title, icon, children } = mergedProps;
  const testId = useTestId("callout", props);
  const className = useClassName(mergedProps);

  const textColor = useMemo<PaletteColor>(() => {
    return color === "gray" ? "gray-700" : `${color}-dark`;
  }, [color]);

  const titleColor = useMemo<PaletteColor>(() => {
    return isGrayColor(color)
      ? "gray-700"
      : size === "l"
      ? `${color}-base`
      : `${color}-dark`;
  }, [color, size]);

  const titleWeight = useMemo<TypographyWeight>(() => {
    return size === "l" ? "bold" : "medium";
  }, [size]);

  const styleProps = useStyleProps(mergedProps);

  if (!props.children) {
    warn(
      `Missing required children, defaulting to ${defaultCalloutProps.children}`
    );
  }

  return (
    <CalloutContainer
      {...styleProps}
      data-testid={testId}
      className={className}
    >
      {icon && <CalloutIcon {...mergedProps} />}
      <FlexColumnLayout fill gap="s-3">
        <FlexColumnLayout fill>
          {title && (
            <Heading size="h4" color={titleColor} weight={titleWeight}>
              {title}
            </Heading>
          )}
          <Text weight="medium" color={textColor}>
            {children}
          </Text>
        </FlexColumnLayout>
      </FlexColumnLayout>
    </CalloutContainer>
  );
};
Callout.defaultProps = defaultCalloutProps;

export { Callout };

const CalloutContainer = styled.div<CalloutStyleProps>`
  ${calloutStyle}
`;
