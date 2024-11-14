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
import { Hypertext } from "../Hypertext";
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
} from "@utils";

const defaultCalloutProps: CalloutDefaultProps = {
  children: "[label]",
  color: "primary",
  icon: "auto",
  title: null,
  hyperText: null,
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
  const { icon, children, color, title, hyperText, size } = mergedProps;
  const testId = useTestId("callout", props);
  const className = useClassName(mergedProps);

  const iconName = useMemo(() => {
    if (isNull(icon)) return null;
    return icon === "auto" ? computeCalloutIconNames[color] : icon;
  }, [icon, color]);

  const iconStyles = useMemo(() => {
    const iconColor = color === "gray" ? "gray-600" : `${color}-base`;
    const iconSize = size === "l" ? "s-6" : "s-4";

    return {
      color: iconColor as PaletteColor,
      size: iconSize as SpacingLabel,
    };
  }, [color, size]);

  const textColor = useMemo<PaletteColor>(() => {
    return color === "gray" ? "gray-700" : `${color}-dark`;
  }, [color]);

  const titleStyles = useMemo(() => {
    const titleColor =
      color === "gray"
        ? "gray-700"
        : size === "l"
        ? `${color}-base`
        : `${color}-dark`;

    const titleWeight = size === "l" ? "bold" : "medium";

    return {
      color: titleColor as PaletteColor,
      weight: titleWeight as TypographyWeight,
    };
  }, [color, size]);

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
      {icon && <Icon {...iconStyles} name={iconName ?? undefined} />}
      <FlexColumnLayout fill gap="s-3">
        <FlexColumnLayout fill>
          {title && (
            <Heading size="h4" important {...titleStyles}>
              {title}
            </Heading>
          )}
          <Text weight="medium" color={textColor}>
            {children}
          </Text>
        </FlexColumnLayout>
        {hyperText && (
          <div>
            <Hypertext {...hyperText} color={color} />
          </div>
        )}
      </FlexColumnLayout>
    </CalloutContainer>
  );
};
Callout.defaultProps = defaultCalloutProps;

export { Callout };

const CalloutContainer = styled.div<CalloutStyleProps>`
  ${calloutStyle}
`;
