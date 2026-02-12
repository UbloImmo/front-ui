import { useMemo } from "react";

import { useCalloutStyle } from "./Callout.styles";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { CalloutIcon } from "./components/CalloutIcon.component";

import { FlexColumnLayout } from "@/layouts/Flex";
import { PaletteColor, SpacingLabel, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, isGrayColor } from "@utils";

import type { CalloutProps, CalloutDefaultProps } from "./Callout.types";

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
 * @version 0.1.0
 *
 * @param {CalloutProps & TestIdProps} props - Callout component props
 * @returns {JSX.Element}
 */
const Callout = (props: CalloutProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Callout");
  const mergedProps = useMergedProps(defaultCalloutProps, props);
  const { color, size, title, icon, children } = mergedProps;
  const testId = useTestId("callout", props);

  const { className, style } = useCalloutStyle(mergedProps);

  const textColor = useMemo<PaletteColor>(() => {
    return color === "gray" ? "gray-700" : `${color}-dark`;
  }, [color]);

  const titleColor = useMemo<PaletteColor>(() => {
    return isGrayColor(color)
      ? "gray-700"
      : size === "l"
        ? color === "pending" || color === "warning"
          ? `${color}-dark`
          : `${color}-base`
        : `${color}-dark`;
  }, [color, size]);

  const titleGap = useMemo<SpacingLabel | undefined>(() => {
    return size === "l" ? "s-1" : undefined;
  }, [size]);

  if (!props.children) {
    warn(
      `Missing required children, defaulting to ${defaultCalloutProps.children}`
    );
  }

  return (
    <div data-testid={testId} className={className} style={style}>
      {icon && <CalloutIcon {...mergedProps} />}
      <FlexColumnLayout fill gap="s-3">
        <FlexColumnLayout fill gap={titleGap}>
          {title && (
            <Heading size="h4" color={titleColor} weight="bold" important>
              {title}
            </Heading>
          )}
          <Text weight="medium" color={textColor}>
            {children}
          </Text>
        </FlexColumnLayout>
      </FlexColumnLayout>
    </div>
  );
};
Callout.__DEFAULT_PROPS = defaultCalloutProps;

export { Callout };
