import { isString } from "@ubloimmo/front-util";
import { useCallback, useMemo, type MouseEventHandler } from "react";
import styled from "styled-components";

import { contextMenuItemStyles } from "./ContextMenuItem.styles";

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
};

/**
 * Renders a single button or action in a ContextMenu
 *
 * @version 0.0.3
 *
 * @param {ContextMenuItemProps & TestIdProps} props - ContextMenu component props
 * @returns {JSX.Element}
 */
const ContextMenuItem = (
  props: ContextMenuItemProps & TestIdProps,
): JSX.Element => {
  const { warn, debug } = useLogger("ContextMenu", {
    hideDebug: true,
  });
  const { disabled, index, ...mergedProps } = useMergedProps(
    defaultContextMenuItemProps,
    props,
  );
  const testId = useTestId("context-menu-item", props);

  const onClick = useHtmlAttribute(mergedProps.onClick);

  const onSmallItemClick = useCallback<MouseEventHandler>(
    (event) => {
      event?.stopPropagation();
      event.preventDefault();
      if (onClick) onClick();
    },
    [onClick],
  );

  debug(mergedProps);

  const tabIndex = useMemo(
    () => (disabled ? -1 : index + 1),
    [disabled, index],
  );

  if (!isString(props.label))
    warn(
      `Missing required label, defaulting to ${defaultContextMenuItemProps.label}`,
    );

  if (mergedProps.size === "m")
    return (
      <StyledAction
        label={mergedProps.label}
        icon={mergedProps.icon ?? "Cursor"}
        title={mergedProps.title ?? mergedProps.label}
        onClick={onClick}
        disabled={disabled}
        badgeLabel={mergedProps.badgeLabel}
        testId={testId}
        overrideTestId
      />
    );

  return (
    <ContextMenuItemContainer
      data-testid={testId}
      disabled={disabled}
      onClick={onSmallItemClick}
      tabIndex={tabIndex}
    >
      <Text
        color={disabled ? "gray-600" : "gray-800"}
        weight="bold"
        size="m"
        testId="context-menu-item-label"
        overrideTestId
        ellipsis
      >
        {mergedProps.label}
      </Text>
    </ContextMenuItemContainer>
  );
};
ContextMenuItem.defaultProps = defaultContextMenuItemProps;

export { ContextMenuItem };

const ContextMenuItemContainer = styled.button`
  ${contextMenuItemStyles}
`;

const StyledAction = styled(Action)`
  min-width: 25rem;
`;
