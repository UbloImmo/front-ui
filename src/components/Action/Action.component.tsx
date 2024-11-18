import { VoidFn, isFunction, type Nullable } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import {
  actionContainerStyles,
  actionLabelContainerStyles,
} from "./Action.styles";
import { Badge, type BadgeProps } from "../Badge";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";
import { Tooltip, TooltipProps } from "../Tooltip";

import { FlexLayout, FlexLayoutProps, FlexRowLayout } from "@/layouts";
import {
  TextProps,
  type ColorKeyOrWhite,
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
} from "@utils";

import type {
  ActionProps,
  ActionSize,
  DefaultActionProps,
} from "./Action.types";
import type {
  StaticIconProps,
  StaticIconSize,
} from "../StaticIcon/StaticIcon.types";

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
  iconTooltip: null,
  description: null,
};

/**
 * An action button with an icon, label and optional badge
 *
 * @version 0.0.5
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

  const onClick = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isFunction<VoidFn>(mergedProps.onClick) && !mergedProps.disabled)
        mergedProps.onClick();
    },
    [mergedProps]
  );

  const staticIconProps = useMemo<StaticIconProps>(() => {
    const color: ColorKeyOrWhite = mergedProps.disabled
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

  const iconTooltipProps = useMemo<Nullable<TooltipProps>>(() => {
    if (!mergedProps.iconTooltip) return null;

    return {
      ...mergedProps.iconTooltip,
      children: null,
      iconColor: mergedProps.disabled
        ? "gray-400"
        : mergedProps.iconTooltip.iconColor,
    };
  }, [mergedProps]);

  const canDisplayDescription = useMemo(() => {
    return mergedProps.description && mergedProps.size === "large";
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
        <ActionLabelContainer
          align="center"
          justify="start"
          fill
          gap="s-1"
          testId={`${testId}-label-container`}
        >
          <Text {...textProps} testId={`${testId}-label`}>
            {mergedProps.label}
          </Text>
          {iconTooltipProps && mergedProps.size === "large" && (
            <Tooltip {...iconTooltipProps} />
          )}
          {canDisplayDescription && badgeProps && (
            <Badge {...badgeProps} testId={`${testId}-badge`} />
          )}
        </ActionLabelContainer>

        {!canDisplayDescription && badgeProps && (
          <Badge {...badgeProps} testId={`${testId}-badge`} />
        )}

        {canDisplayDescription && (
          <Text testId={`${testId}-description`} overrideTestId>
            {mergedProps.description}
          </Text>
        )}
        {iconTooltipProps && mergedProps.size === "default" ? (
          <Tooltip {...iconTooltipProps} />
        ) : null}
      </FlexLayout>
    </ActionContainer>
  );
};

Action.defaultProps = defaultActionProps;

export { Action };

const ActionContainer = styled.button<StyleProps<DefaultActionProps>>`
  ${actionContainerStyles}
`;

const ActionLabelContainer = styled(FlexRowLayout)`
  ${actionLabelContainerStyles}
`;
