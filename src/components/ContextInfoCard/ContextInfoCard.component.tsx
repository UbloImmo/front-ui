import { isNullish } from "@ubloimmo/front-util";
import styled from "styled-components";

import { FlexColumnLayout, FlexRowLayout } from "../../layouts";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";
import { contextInfoCardContainerStyles } from "./ContextInfoCard.styles";
import { ContextInfoCardProps } from "./ContextInfoCard.types";

import { TestIdProps, TextProps } from "@types";
import { useMergedProps, useTestId } from "@utils";

const defaultContextInfoCardProps: Required<ContextInfoCardProps> = {
  title: "[Title]",
  staticIcon: {
    name: "Circle",
  },
  label: null,
  description: null,
  details: null,
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

  if (isNullish(mergedProps.title)) {
    console.warn(
      "ContextInfoCard: title prop is required but was not provided"
    );
  }

  return (
    <ContextInfoCardContainer
      testId={testId}
      overrideTestId
      gap="s-5"
      align="center"
      fill
    >
      <StaticIcon size="s" {...mergedProps.staticIcon} />
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
    </ContextInfoCardContainer>
  );
};

ContextInfoCard.defaultProps = defaultContextInfoCardProps;

export { ContextInfoCard };

const ContextInfoCardContainer = styled(FlexRowLayout)`
  ${contextInfoCardContainerStyles}
`;

const ContextInfoCardContentContainer = styled(FlexColumnLayout)`
  overflow: hidden;
`;
