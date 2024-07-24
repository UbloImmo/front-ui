import { useMemo } from "react";
import styled from "styled-components";

import {
  calloutStyle,
  computeCalloutColors,
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

import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type { TestIdProps } from "@types";

const defaultCalloutProps: CalloutDefaultProps = {
  label: "[label]",
  color: "primary",
  icon: "auto",
  title: null,
};

/**
 * A card to display permanent feedback information.
 * Its color indicates the type of feedback.
 *
 * @version 0.0.1
 *
 * @param {CalloutProps & TestIdProps} props - Callout component props
 * @returns {JSX.Element}
 */
const Callout = (props: CalloutProps & TestIdProps): JSX.Element => {
  const { log, warn } = useLogger("Callout");
  const mergedProps = useMergedProps(defaultCalloutProps, props);
  const { icon, label, color, title } = mergedProps;
  const testId = useTestId("callout", props);

  const iconName = useMemo(() => {
    if (!icon) return;
    return icon === "auto" ? computeCalloutIconNames[color] : icon;
  }, [icon, color]);

  const calloutColors = useMemo(() => computeCalloutColors(color), [color]);

  const styleProps = useStyleProps(calloutColors);

  log(mergedProps);

  if (!props.label) {
    warn(`Missing required label, defaulting to ${defaultCalloutProps.label}`);
  }

  return (
    <CalloutContainer {...styleProps} data-testid={testId}>
      {icon && <Icon color={calloutColors.icon} name={iconName} size="s-4" />}
      <div>
        {title && (
          <Heading size="h4" color={calloutColors.text}>
            {props.title}
          </Heading>
        )}
        <Text color={calloutColors.text}>{label}</Text>
      </div>
    </CalloutContainer>
  );
};
Callout.defaultProps = defaultCalloutProps;

export { Callout };

const CalloutContainer = styled.div<CalloutStyleProps>`
  ${calloutStyle}
`;
