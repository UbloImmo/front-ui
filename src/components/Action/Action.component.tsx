import { VoidFn, isFunction, type Nullable } from "@ubloimmo/front-util";
import { lazy, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { actionContainerStyles } from "./Action.styles";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";

import { FlexLayout, FlexLayoutProps } from "@/layouts";
import {
  TextProps,
  type PaletteColor,
  type StyleProps,
  type TestIdProps,
} from "@types";
import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
  loadComponent,
} from "@utils";

import type {
  ActionProps,
  ActionSize,
  DefaultActionProps,
} from "./Action.types";
import type { BadgeProps } from "../Badge";
import type {
  StaticIconProps,
  StaticIconColor,
  StaticIconSize,
} from "../StaticIcon/StaticIcon.types";

const ActionBadge = lazy(loadComponent("Badge", import("../Badge")));

const staticIconSizeMap: Record<ActionSize, StaticIconSize> = {
  default: "s",
  large: "m",
};

const defaultActionProps: DefaultActionProps = {
  label: "[Action]",
  icon: "Cursor",
  size: "default",
  disabled: false,
  badgeLabel: null,
  onClick: null,
  title: null,
};

/**
 * An action button with an icon, label and optional badge
 *
 * @version 0.0.2
 *
 * @param {ActionProps} props - The component's props
 * @returns {JSX.Element}
 */
const Action = (props: ActionProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Action");

  const mergedProps = useMergedProps(defaultActionProps, props);
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("action", props);

  if (!props.icon) {
    warn(`Missing required icon, defaulting to ${defaultActionProps.icon}`);
  }

  if (!props.label) {
    warn(`Missing required icon, defaulting to ${defaultActionProps.label}`);
  }

  const [isHovering, setIsHovering] = useState(false);

  const onClick = useCallback(() => {
    if (isFunction<VoidFn>(mergedProps.onClick) && !mergedProps.disabled)
      mergedProps.onClick();
  }, [mergedProps]);

  const staticIconProps = useMemo<StaticIconProps>(() => {
    const color: StaticIconColor = mergedProps.disabled
      ? "white"
      : isHovering
      ? "primary"
      : "gray";
    const size = staticIconSizeMap[mergedProps.size];
    return { size, color, name: mergedProps.icon };
  }, [mergedProps, isHovering]);

  const badgeProps = useMemo<Nullable<BadgeProps & TestIdProps>>(() => {
    if (!mergedProps.badgeLabel || isEmptyString(mergedProps.badgeLabel))
      return null;
    return {
      label: mergedProps.badgeLabel,
      color: mergedProps.disabled ? "gray" : "primary",
      shade: "light",
      testId: "action-badge",
    };
  }, [mergedProps]);

  const textProps = useMemo<TextProps>(() => {
    const color: PaletteColor = mergedProps.disabled
      ? "gray-600"
      : isHovering
      ? "primary-base"
      : "gray-800";
    return {
      color,
      weight: "bold",
      size: "m",
    };
  }, [mergedProps, isHovering]);

  const layoutProps = useMemo<FlexLayoutProps>(() => {
    if (mergedProps.size === "large") {
      return {
        direction: "column",
        gap: "s-1",
        align: "start",
        justify: "center",
      };
    }
    return {
      direction: "row",
      gap: "s-2",
      align: "center",
      justify: "space-between",
    };
  }, [mergedProps]);

  return (
    <ActionContainer
      data-testid={testId}
      type="button"
      title={mergedProps.title ?? mergedProps.label}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={mergedProps.disabled}
      {...styleProps}
    >
      <StaticIcon {...staticIconProps} />
      <FlexLayout {...layoutProps} fill>
        <Text {...textProps} testId="action-label">
          {mergedProps.label}
        </Text>
        {badgeProps && <ActionBadge {...badgeProps} testId="action-badge" />}
      </FlexLayout>
    </ActionContainer>
  );
};

Action.defaultProps = defaultActionProps;

export { Action };

const ActionContainer = styled.button<StyleProps<DefaultActionProps>>`
  ${actionContainerStyles}
`;
