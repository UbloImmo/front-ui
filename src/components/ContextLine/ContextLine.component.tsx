import { useMemo } from "react";

import { useContextLineStyles } from "./ContextLine.styles";
import { Badge } from "../Badge";
import { StaticIcon, StaticIconProps } from "../StaticIcon";
import { Text } from "../Text";

import { FlexLayout } from "@/layouts/Flex";
import { useLogger, useTestId, useMergedProps } from "@utils";

import type {
  ContextLineProps,
  ContextLineDefaultProps,
} from "./ContextLine.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultContextLineProps: ContextLineDefaultProps = {
  label: "[label]",
  children: null,
  description: null,
  icon: null,
  badge: null,
  borderBottom: true,
  paddingHorizontal: false,
  compact: false,
  className: null,
  styleOverride: null,
};

/**
 *
 * Use ContextLine inside contextual areas to display current state of something.
 *
 * @version 0.1.0
 *
 * @param {ContextLineProps & TestIdProps} props - ContextLine component props
 * @returns {JSX.Element}
 */
const ContextLine = (props: ContextLineProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("ContextLine", { hideLogs: true });
  const mergedProps = useMergedProps(defaultContextLineProps, props);
  const testId = useTestId("context-line", props);
  const { style, className } = useContextLineStyles(mergedProps);

  if (!mergedProps.label) warn("Missing label prop");

  const staticIconProps = useMemo<Nullable<StaticIconProps>>(() => {
    if (!mergedProps.icon?.name) return null;

    return {
      ...mergedProps.icon,
      size: "xs",
      indicator: null,
    };
  }, [mergedProps.icon]);

  return (
    <FlexLayout
      direction="row"
      align="center"
      justify="space-between"
      gap="s-2"
      fill
      testId={testId}
      overrideTestId
      className={className}
      styleOverride={style}
    >
      <FlexLayout
        direction="row"
        gap="s-2"
        align={mergedProps.description ? "start" : "center"}
        justify="start"
      >
        {staticIconProps && <StaticIcon {...staticIconProps} />}
        <FlexLayout direction="column" fill>
          <Text
            weight="medium"
            testId="context-line-label"
            fill
            ellipsis
            overrideTestId
          >
            {mergedProps.label}
          </Text>
          {mergedProps.description && (
            <Text size="xs" color="gray-800" fill ellipsis overrideTestId>
              {mergedProps.description}
            </Text>
          )}
        </FlexLayout>
      </FlexLayout>
      <FlexLayout direction="row" gap="s-2">
        {mergedProps.children}
        {mergedProps.badge && <Badge {...mergedProps.badge} />}
      </FlexLayout>
    </FlexLayout>
  );
};

ContextLine.defaultProps = defaultContextLineProps;

export { ContextLine };
