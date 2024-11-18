import { isNull } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import {
  calloutStyle,
  calloutTitleStyle,
  computeCalloutIconNames,
} from "./Callout.styles";
import {
  type CalloutProps,
  type CalloutDefaultProps,
  CalloutStyleProps,
} from "./Callout.types";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
import { PaletteColor, type TestIdProps } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useStyleProps,
  useClassName,
} from "@utils";

const defaultCalloutProps: CalloutDefaultProps = {
  children: "[label]",
  color: "primary",
  icon: "auto",
  title: null,
  size: "m",
  className: null,
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
  const { icon, children, color, title } = mergedProps;
  const testId = useTestId("callout", props);
  const className = useClassName(mergedProps);

  const iconName = useMemo(() => {
    if (isNull(icon)) return null;
    return icon === "auto" ? computeCalloutIconNames[color] : icon;
  }, [icon, color]);

  const textColor = useMemo<PaletteColor>(() => {
    return color === "gray" ? "gray-700" : `${color}-dark`;
  }, [color]);

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
      {icon && <Icon name={iconName ?? undefined} />}
      <FlexColumnLayout fill gap="s-3">
        <FlexColumnLayout fill>
          {title && (
            <CalloutTitle size="h4" {...styleProps}>
              {title}
            </CalloutTitle>
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

const CalloutTitle = styled(Heading)<CalloutStyleProps>`
  ${calloutTitleStyle}
`;
