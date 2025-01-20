import { useMemo } from "react";
import styled from "styled-components";

import { FlexColumnLayout, FlexRowLayout } from "../../layouts";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";
import { contextInfoCardContainerStyles } from "./ContextInfoCard.styles";
import { ContextInfoCardProps } from "./ContextInfoCard.types";

import { TestIdProps, TextProps } from "@types";
import { useMergedProps, useTestId } from "@utils";

const defaultContextInfoCardProps: ContextInfoCardProps = {
  title: "[Title]",
  staticIcon: {
    name: "Circle",
  },
};

/**
 * A component that displays contextual information with an icon, title, label, and description.
 *
 * @version 0.0.1
 *
 * @param {TestIdProps & ContextInfoCardProps} props - The component props
 * @returns {JSX.Element} - The context info card markup
 */
const ContextInfoCard = (
  props: ContextInfoCardProps & TestIdProps
): JSX.Element => {
  const testId = useTestId("context-info-card", props);
  const mergedProps = useMergedProps(defaultContextInfoCardProps, props);

  const labelTextProps = useMemo<TextProps>(
    () => ({
      size: "m",
      weight: "bold",
      color: "gray-800",
    }),
    []
  );

  const titleTextProps = useMemo<TextProps>(
    () => ({
      size: "m",
      weight: "medium",
      color: "gray-800",
    }),
    []
  );

  const descriptionTextProps = useMemo<TextProps>(
    () => ({
      size: "m",
      weight: "regular",
      color: "gray-500",
    }),
    []
  );

  const detailsTextProps = useMemo<TextProps>(
    () => ({
      size: "xs",
      weight: "medium",
      color: "gray-500",
    }),
    []
  );

  return (
    <ContextInfoCardContainer data-testid={testId}>
      <FlexRowLayout gap="s-5" align="center">
        <StaticIcon size="s" {...mergedProps.staticIcon} />
        <FlexColumnLayout>
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
        </FlexColumnLayout>
      </FlexRowLayout>
    </ContextInfoCardContainer>
  );
};

ContextInfoCard.defaultProps = defaultContextInfoCardProps;

export { ContextInfoCard };

const ContextInfoCardContainer = styled(FlexColumnLayout)`
  ${contextInfoCardContainerStyles}
`;
