import { useMemo } from "react";
import styled from "styled-components";

import { calloutStyle } from "./Callout.styles";
import {
  type CalloutProps,
  type CalloutDefaultProps,
  CalloutStyleProps,
} from "./Callout.types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { CalloutIcon } from "./components/CalloutIcon.component";

import { FlexColumnLayout } from "@layouts";
import { PaletteColor, type TestIdProps, type TypographyWeight } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useStyleProps,
  useClassName,
  isGrayColor,
  useHtmlAttribute,
} from "@utils";

const defaultCalloutProps: CalloutDefaultProps = {
  children: "[label]",
  color: "primary",
  icon: "auto",
  title: null,
  size: "m",
  className: null,
  as: "div",
  styleOverride: null,
};

/**
 * A card to display permanent feedback information.
 * Its color indicates the type of feedback.
 *
 * @version 0.0.7
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
  const style = useHtmlAttribute(props.styleOverride);

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
      style={style}
    >
      {icon && <CalloutIcon {...mergedProps} />}
      <FlexColumnLayout fill gap="s-3">
        <FlexColumnLayout fill>
          {title && (
            <Heading
              size="h4"
              color={titleColor}
              weight={titleWeight}
              important
            >
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
