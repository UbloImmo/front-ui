import { isString } from "@ubloimmo/front-util";
import { useCallback, useMemo, type MouseEventHandler } from "react";

import { useContextMenuItemStyles } from "./ContextMenuItem.styles";

import { Action } from "@/components/Action";
import { Text } from "@/components/Text";
import { useLogger, useTestId, useMergedProps, useHtmlAttribute } from "@utils";

import type {
  ContextMenuItemProps,
  ContextMenuItemDefaultProps,
} from "./ContextMenuItem.types";
import type { TestIdProps } from "@types";

const defaultContextMenuItemProps: ContextMenuItemDefaultProps = {
  label: "[Label]",
  icon: null,
  size: "s",
  onClick: null,
  disabled: false,
  title: null,
  badgeLabel: null,
  index: 0,
  iconTooltip: null,
  className: null,
  color: "primary",
  styleOverride: null,
};

/**
 * Renders a single button or action in a ContextMenu
 *
 * @version 0.1.0
 *
 * @param {ContextMenuItemProps & TestIdProps} props - ContextMenu component props
 * @returns {JSX.Element}
 */
const ContextMenuItem = (
  props: ContextMenuItemProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("ContextMenu");
  const { disabled, index, ...mergedProps } = useMergedProps(
    defaultContextMenuItemProps,
    props
  );
  const testId = useTestId("context-menu-item", props);
  const { classNames, style } = useContextMenuItemStyles(mergedProps);

  const onClick = useHtmlAttribute(mergedProps.onClick);

  const onSmallItemClick = useCallback<MouseEventHandler>(
    (event) => {
      event?.stopPropagation();
      event.preventDefault();
      if (onClick) onClick();
    },
    [onClick]
  );

  const tabIndex = useMemo(
    () => (disabled ? -1 : index + 1),
    [disabled, index]
  );

  if (!isString(props.label))
    warn(
      `Missing required label, defaulting to ${defaultContextMenuItemProps.label}`
    );

  if (mergedProps.size === "m")
    return (
      <Action
        className={classNames.m}
        size="default"
        label={mergedProps.label}
        icon={mergedProps.icon ?? "Cursor"}
        title={mergedProps.title ?? mergedProps.label}
        color={mergedProps.color}
        onClick={onClick}
        disabled={disabled}
        badgeLabel={mergedProps.badgeLabel}
        testId={testId}
        overrideTestId
        styleOverride={style}
      />
    );

  return (
    <button
      type="button"
      className={classNames.s}
      style={style}
      data-testid={testId}
      disabled={disabled}
      onClick={onSmallItemClick}
      tabIndex={tabIndex}
    >
      <Text
        className={classNames.label}
        color={disabled ? "gray-600" : "gray-800"}
        weight="bold"
        size="m"
        testId="context-menu-item-label"
        overrideTestId
        ellipsis
      >
        {mergedProps.label}
      </Text>
    </button>
  );
};
ContextMenuItem.defaultProps = defaultContextMenuItemProps;

export { ContextMenuItem };
