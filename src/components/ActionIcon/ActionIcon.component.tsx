import { isFunction } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  actionIconContainerStyles,
  actionIconIconColorMap,
} from "./ActionIcon.styles";
import { Icon } from "../Icon";

import {
  useClassName,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type {
  ActionIconProps,
  ActionIconStyleProps,
  DefaultActionIconProps,
} from "./ActionIcon.types";
import type { IconProps } from "../Icon";
import type { PaletteColor, TestIdProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

const defaultActionIconProps: DefaultActionIconProps = {
  icon: "Square",
  size: "l",
  color: "white",
  onClick: null,
  disabled: false,
  title: "[Action title]",
  className: null,
};

/**
 * The smallest (and best) version of the Action component.
 *
 * No label, no tags, just an icon.
 *
 * @version 0.0.4
 *
 * @param {ActionIconProps & TestIdProps} props - The properties for the action icon
 * @return {JSX.Element} The rendered action icon component
 */
const ActionIcon = (props: ActionIconProps & TestIdProps): JSX.Element => {
  const { warn, error } = useLogger("ActionIcon");
  const mergedProps = useMergedProps<DefaultActionIconProps, ActionIconProps>(
    defaultActionIconProps,
    props,
  );
  const styleProps = useStyleProps(mergedProps);
  const testId = useTestId("action-icon", props);

  if (!props.icon) {
    error(
      `Missing required icon, defaulting to ${defaultActionIconProps.icon}`,
    );
  }

  if (!props.title) {
    warn(
      `Missing required title, defaulting to ${defaultActionIconProps.title}`,
    );
  }

  const iconProps = useMemo<IconProps>(() => {
    const isLarge = mergedProps.size === "l";
    const disabledColor: PaletteColor = isLarge ? "gray-400" : "gray-500";
    const color = mergedProps.disabled
      ? disabledColor
      : actionIconIconColorMap[mergedProps.size][mergedProps.color];
    return {
      name: mergedProps.icon,
      size: "s-5",
      color,
    };
  }, [mergedProps]);

  const onClick = useCallback(() => {
    if (mergedProps.disabled) return;
    if (isFunction<VoidFn>(mergedProps.onClick)) mergedProps.onClick();
  }, [mergedProps]);

  const className = useClassName(mergedProps);

  return (
    <ActionIconContainer
      {...styleProps}
      className={className}
      data-testid={testId}
      disabled={mergedProps.disabled}
      aria-disabled={mergedProps.disabled}
      title={mergedProps.title}
      onClick={onClick}
      aria-label={mergedProps.title}
      role="button"
      type="button"
    >
      <Icon {...iconProps} />
    </ActionIconContainer>
  );
};
ActionIcon.defaultProps = defaultActionIconProps;
export { ActionIcon };

const ActionIconContainer = styled.button<ActionIconStyleProps>`
  ${actionIconContainerStyles}
`;
