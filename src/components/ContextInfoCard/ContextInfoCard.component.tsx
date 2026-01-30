import { isNullish } from "@ubloimmo/front-util";
import { useCallback, type ReactNode } from "react";

import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";
import { useContextInfoCardStyles } from "./ContextInfoCard.styles";
import { Icon } from "../Icon";

import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { isNonEmptyString, useMergedProps, useTestId } from "@utils";

import type { ContextInfoCardProps } from "./ContextInfoCard.types";
import type { TestIdProps, TextProps } from "@types";

const defaultContextInfoCardProps: Required<ContextInfoCardProps> = {
  title: "[Title]",
  icon: {
    name: "Circle",
  },
  label: null,
  description: null,
  details: null,
  href: null,
  content: null,
  className: null,
  styleOverride: null,
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
 * @version 0.1.0
 *
 * @param {TestIdProps & ContextInfoCardProps} props - The component props
 * @returns {JSX.Element} - The context info card markup
 */
const ContextInfoCard = (
  props: ContextInfoCardProps & TestIdProps
): JSX.Element => {
  const testId = useTestId("context-info-card", props);
  const mergedProps = useMergedProps(defaultContextInfoCardProps, props);
  const { classNames, style } = useContextInfoCardStyles(mergedProps);

  if (isNullish(mergedProps.title)) {
    console.warn(
      "ContextInfoCard: title prop is required but was not provided"
    );
  }

  const Container = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (isNonEmptyString(mergedProps.href))
        return (
          <a
            className={classNames.cardLink}
            style={style}
            href={mergedProps.href}
            data-testid={testId}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
            <FlexRowLayout
              styleOverride={style}
              className={classNames.iconContainer}
              testId="context-info-card-icon-container"
              overrideTestId
            >
              <Icon name="BoxArrowUpRight" color="gray-500" size="s-3" />
            </FlexRowLayout>
          </a>
        );
      return (
        <FlexRowLayout
          className={classNames.card}
          testId={testId}
          overrideTestId
          gap="s-5"
          align="center"
          fill
        >
          {children}
        </FlexRowLayout>
      );
    },
    [classNames, mergedProps.href, style, testId]
  );

  return (
    <Container>
      <StaticIcon size="s" {...mergedProps.icon} />
      <FlexColumnLayout fill overflow="hidden">
        {mergedProps.label && (
          <Text {...labelTextProps}>{mergedProps.label}</Text>
        )}
        <FlexRowLayout fill>
          <Text {...titleTextProps}>{mergedProps.title}</Text>
          {mergedProps.content}
        </FlexRowLayout>
        {mergedProps.description && (
          <Text {...descriptionTextProps}>{mergedProps.description}</Text>
        )}
        {mergedProps.details && (
          <Text {...detailsTextProps}>{mergedProps.details}</Text>
        )}
      </FlexColumnLayout>
    </Container>
  );
};

ContextInfoCard.defaultProps = defaultContextInfoCardProps;

export { ContextInfoCard };
