import { isFunction } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import {
  actionIconIconColorMap,
  useActionIconStyle,
} from "./ActionIcon.styles";
import { Icon } from "../Icon";

import { useLogger, useMergedProps, useTestId } from "@utils";

import type {
  ActionIconProps,
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
  styleOverride: null,
};

/**
 * The smallest (and best) version of the Action component.
 *
 * No label, no tags, just an icon.
 *
 * @version 0.1.0
 *
 * @param {ActionIconProps & TestIdProps} props - The properties for the action icon
 * @return {JSX.Element} The rendered action icon component
 */
const ActionIcon = (props: ActionIconProps & TestIdProps): JSX.Element => {
  const { warn, error } = useLogger("ActionIcon");
  const mergedProps = useMergedProps<DefaultActionIconProps, ActionIconProps>(
    defaultActionIconProps,
    props
  );
  const testId = useTestId("action-icon", props);

  if (!props.icon) {
    error(
      `Missing required icon, defaulting to ${defaultActionIconProps.icon}`
    );
  }

  if (!props.title) {
    warn(
      `Missing required title, defaulting to ${defaultActionIconProps.title}`
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

  const { style, className } = useActionIconStyle(mergedProps);

  return (
    <button
      className={className}
      data-testid={testId}
      disabled={mergedProps.disabled}
      aria-disabled={mergedProps.disabled}
      title={mergedProps.title}
      onClick={onClick}
      aria-label={mergedProps.title}
      role="button"
      type="button"
      style={style}
    >
      <Icon {...iconProps} />
    </button>
  );
};
ActionIcon.defaultProps = defaultActionIconProps;
export { ActionIcon };
