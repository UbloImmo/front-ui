import { isNullish } from "@ubloimmo/front-util";
import { useCallback, type ReactNode } from "react";
import styled from "styled-components";

import { FlexColumnLayout, FlexRowLayout } from "../../layouts";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";
import {
  contextInfoCardContainerLinkStyles,
  contextInfoCardContainerStyles,
  contextInfoCardIconContainerStyles,
} from "./ContextInfoCard.styles";
import { Icon } from "../Icon";

import { TestIdProps, TextProps } from "@types";
import { isNonEmptyString, useMergedProps, useTestId } from "@utils";

import type { ContextInfoCardProps } from "./ContextInfoCard.types";

const defaultContextInfoCardProps: Required<ContextInfoCardProps> = {
  title: "[Title]",
  icon: {
    name: "Circle",
  },
  label: null,
  description: null,
  details: null,
  href: null,
};

const commonTextProps: TextProps = {
  fill: true,
  ellipsis: true,
};

const labelTextProps: TextProps = {
  ...commonTextProps,
  size: "m",
  weight: "bold",
  color: "gray-800",
};

const titleTextProps: TextProps = {
  ...commonTextProps,
  size: "m",
  weight: "medium",
  color: "gray-800",
};

const descriptionTextProps: TextProps = {
  ...commonTextProps,
  size: "m",
  weight: "regular",
  color: "gray-500",
};

const detailsTextProps: TextProps = {
  ...commonTextProps,
  size: "xs",
  weight: "medium",
  color: "gray-500",
};

/**
 * A component that displays contextual information with an icon, title, label, and description.
 *
 * @version 0.0.2
 *
 * @param {TestIdProps & ContextInfoCardProps} props - The component props
 * @returns {JSX.Element} - The context info card markup
 */
const ContextInfoCard = (
  props: ContextInfoCardProps & TestIdProps
): JSX.Element => {
  const testId = useTestId("context-info-card", props);
  const mergedProps = useMergedProps(defaultContextInfoCardProps, props);

  if (isNullish(mergedProps.title)) {
    console.warn(
      "ContextInfoCard: title prop is required but was not provided"
    );
  }

  const Container = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (isNonEmptyString(mergedProps.href))
        return (
          <ContextInfoCardContainerLink
            href={mergedProps.href}
            data-testid={testId}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
            <ContextInfoCardIconContainer
              testId="context-info-card-icon-container"
              overrideTestId
            >
              <Icon name="BoxArrowUpRight" color="gray-500" size="s-3" />
            </ContextInfoCardIconContainer>
          </ContextInfoCardContainerLink>
        );
      return (
        <ContextInfoCardContainer
          testId={testId}
          overrideTestId
          gap="s-5"
          align="center"
          fill
        >
          {children}
        </ContextInfoCardContainer>
      );
    },
    [mergedProps.href, testId]
  );

  return (
    <Container>
      <StaticIcon size="s" {...mergedProps.icon} />
      <ContextInfoCardContentContainer fill>
        {mergedProps.label && (
          <Text {...labelTextProps}>{mergedProps.label}</Text>
        )}
        <Text {...titleTextProps}>{mergedProps.title}</Text>
        {mergedProps.description && (
          <Text {...descriptionTextProps}>{mergedProps.description}</Text>
        )}
        {mergedProps.details && (
          <Text {...detailsTextProps}>{mergedProps.details}</Text>
        )}
      </ContextInfoCardContentContainer>
    </Container>
  );
};

ContextInfoCard.defaultProps = defaultContextInfoCardProps;

export { ContextInfoCard };

const ContextInfoCardContainer = styled(FlexRowLayout)`
  ${contextInfoCardContainerStyles}
`;

const ContextInfoCardContainerLink = styled.a`
  ${contextInfoCardContainerLinkStyles}
`;

const ContextInfoCardContentContainer = styled(FlexColumnLayout)`
  overflow: hidden;
`;

const ContextInfoCardIconContainer = styled(FlexRowLayout)`
  ${contextInfoCardIconContainerStyles}
`;
