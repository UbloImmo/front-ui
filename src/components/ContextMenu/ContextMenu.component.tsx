import { isBoolean, isFunction, type VoidFn } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  ContextMenuItem,
  type ContextMenuItemProps,
  ContextMenuArrow,
} from "./components";
import {
  contextMenuActionIconStyles,
  contextMenuStyles,
} from "./ContextMenu.styles";
import {
  type ContextMenuProps,
  type ContextMenuDefaultProps,
  ContextMenuStyleProps,
  type ContextMenuActionIconStyleProps,
} from "./ContextMenu.types";
import { ActionIcon } from "../ActionIcon";

import { FlexColumnLayout, Popover } from "@layouts";
import { FixedCssLength, type TestIdProps } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  useUikitTranslation,
} from "@utils";

const defaultContextMenuProps: ContextMenuDefaultProps = {
  ...Popover.defaultProps,
  items: [],
  open: false,
  onOpenChange: () => {},
  size: "s",
  children: null,
  disabled: false,
  icon: "ThreeDotsVertical",
};

/**
 * Displays a popover containing a list of actions on click
 *
 * @version 0.0.1
 *
 * @param {ContextMenuProps & TestIdProps} props - ContextMenu component props
 * @returns {JSX.Element}
 */
const ContextMenu = (props: ContextMenuProps & TestIdProps): JSX.Element => {
  const { debug } = useLogger("ContextMenu", { hideDebug: true });
  const { items, disabled, size, children, icon, ...mergedProps } =
    useMergedProps(defaultContextMenuProps, props);
  const testId = useTestId("context-menu", props);
  const [open, setOpen] = useState(disabled ? false : mergedProps.defaultOpen);

  const onItemClick = useCallback(
    (item: ContextMenuItemProps) => () => {
      if (item.disabled || disabled) return;
      setOpen(false);
      if (!item.onClick) return;

      item.onClick();
    },
    [disabled],
  );

  const menuItems = useMemo<ContextMenuItemProps[]>(() => {
    return items.map((item) => ({
      ...item,
      size,
      disabled: item.disabled ?? disabled,
      onClick: onItemClick(item),
    }));
  }, [items, disabled, size, onItemClick]);

  debug(mergedProps);

  const propagateOnOpenChange = useCallback(
    (opened: boolean) => {
      if (disabled && opened) return;
      if (
        "onOpenChange" in mergedProps &&
        isFunction<VoidFn<[boolean]>>(mergedProps.onOpenChange)
      ) {
        mergedProps.onOpenChange(opened);
      }
      setOpen(opened);
    },
    [mergedProps, disabled],
  );

  useEffect(() => {
    if (
      "open" in mergedProps &&
      isBoolean(mergedProps.open) &&
      open !== mergedProps.open
    ) {
      setOpen(mergedProps.open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.open]);

  const isMediumSize = useMemo(() => size === "m", [size]);

  const padding = useMemo<FixedCssLength>(
    () => (isMediumSize ? "s-1" : "s-2"),
    [isMediumSize],
  );

  const PovoverContent = useCallback(
    () => (
      <>
        <ContextMenuContainer data-testid={testId} $size={size}>
          <FlexColumnLayout gap={isMediumSize ? "s-1" : 0} fill>
            {menuItems.map((item, index) => (
              <ContextMenuItem
                key={`context-menu-item-${index}-${item.label}`}
                {...item}
                index={index}
              />
            ))}
          </FlexColumnLayout>
        </ContextMenuContainer>
        {!isMediumSize && <ContextMenuArrow />}
      </>
    ),
    [testId, size, isMediumSize, menuItems],
  );

  const tl = useUikitTranslation();
  const actionIconTitle = useMemo(
    () => tl.action[open ? "hide" : "show"]("menu"),
    [open, tl.action],
  );

  const PopoverChildren = useMemo(() => {
    if (children) return children;
    return (
      <ContextMenuActionIcon
        icon={icon}
        color="white"
        $open={open}
        disabled={disabled}
        testId="context-menu-trigger"
        overrideTestId
        title={actionIconTitle}
      />
    );
  }, [children, icon, open, disabled, actionIconTitle]);

  return (
    <Popover
      open={open}
      onOpenChange={propagateOnOpenChange}
      content={PovoverContent}
      testId="context-menu-popover"
      overrideTestId
      sideOffset={padding}
      collisionPadding={padding}
      collisionBoundary={mergedProps.collisionBoundary}
      side={mergedProps.side}
      align={mergedProps.align}
      fill={mergedProps.fill}
      sticky={mergedProps.sticky}
    >
      {PopoverChildren}
    </Popover>
  );
};
ContextMenu.defaultProps = defaultContextMenuProps;

export { ContextMenu };

const ContextMenuContainer = styled.div<ContextMenuStyleProps>`
  ${contextMenuStyles}
`;

const ContextMenuActionIcon = styled(
  ActionIcon,
)<ContextMenuActionIconStyleProps>`
  ${contextMenuActionIconStyles}
`;
