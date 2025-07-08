import { motion } from "framer-motion";
import { FC, useCallback } from "react";
import styled from "styled-components";

import { Heading } from "../../Heading";
import { Icon } from "../../Icon";
import { Text } from "../../Text";
import {
  menuItemStyles,
  menuItemIconStyles,
  menuItemTitleStyles,
  menuItemIndicatorStyles,
  menuItemErrorIndicatorStyles,
} from "../SideEntityMenu.styles";

import { useTestId } from "@utils";

import type { SideEntityMenuItemProps } from "../SideEntityMenu.types";
import type { PaletteColor } from "@types";

/**
 * SideEntityMenuItem component for rendering individual menu items
 */
export const SideEntityMenuItem: FC<SideEntityMenuItemProps> = ({
  link,
  activeItem,
  navigate,
  isBacklink,
  ...props
}) => {
  const testId = useTestId("side-entity-menu-item", props);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (link.disabled) {
        event.preventDefault();
        return;
      }

      if (navigate && link.to) {
        event.preventDefault();
        navigate(link.to);
        return;
      }

      if (link.onClick) {
        event.preventDefault();
        link.onClick();
        return;
      }

      // Otherwise, let the browser handle the link naturally
      // This supports cmd+click, ctrl+click, shift+click etc.
    },
    [link, navigate]
  );

  if (link.hidden) return null;

  const isDisabled = link.disabled || !link.to;
  const isActive = link.to ? activeItem === link.to : false;

  const commonProps = {
    onClick: handleClick,
    tabIndex: isDisabled ? -1 : 0,
    "aria-disabled": isDisabled,
    "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
    "data-testid": testId,
  };

  if ("isTitle" in link && link.isTitle) {
    return (
      <StyledMenuItemHeader {...commonProps} data-menu-header>
        <StyledMenuItemIcon>
          <Icon name={link.icon} size="s-5" color="gray-700" />
        </StyledMenuItemIcon>
        <StyledMenuItemTitle data-text-content>
          <Heading
            size="h4"
            weight="bold"
            color="gray-900"
            fill
            ellipsis
            lineClamp={2}
          >
            {link.title}
          </Heading>
        </StyledMenuItemTitle>
      </StyledMenuItemHeader>
    );
  }

  const textColor: PaletteColor = isDisabled
    ? "gray-500"
    : isActive
      ? "primary-base"
      : "gray-900";

  const menuItemContent = (
    <>
      {isActive && <StyledMenuItemIndicator layoutId="current" />}
      {link.icon && (
        <StyledMenuItemIcon>
          <Icon
            name={link.icon}
            size={link.head ? "s-5" : "s-4"}
            color={
              isDisabled ? "gray-400" : isActive ? "primary-base" : "gray-700"
            }
          />
          {link.error && (
            <StyledErrorIndicator data-error-indicator>
              <Icon name="CircleFill" size="s-2" color="error-base" />
            </StyledErrorIndicator>
          )}
        </StyledMenuItemIcon>
      )}
      <StyledMenuItemTitle data-text-content>
        {link.head ? (
          <Heading
            size="h4"
            weight="bold"
            color={textColor}
            fill
            ellipsis
            lineClamp={2}
          >
            {link.title}
          </Heading>
        ) : (
          <Text
            size={isBacklink ? "s" : "m"}
            weight={isActive && !isBacklink ? "bold" : "medium"}
            color={textColor}
            fill
            ellipsis
            noWrap
          >
            {link.title}
          </Text>
        )}
        {link.pinned && (
          <Icon name="PinAngleFill" size="s-3" color="gray-700" />
        )}
        {link.error && <Icon name="CircleFill" size="s-2" color="error-base" />}
      </StyledMenuItemTitle>
    </>
  );

  return (
    <StyledMenuItemLink href={link.to} {...commonProps}>
      {menuItemContent}
    </StyledMenuItemLink>
  );
};

const StyledMenuItemLink = styled.a`
  ${menuItemStyles}
`;

const StyledMenuItemHeader = styled.div`
  ${menuItemStyles}
`;

const StyledMenuItemIcon = styled.div`
  ${menuItemIconStyles}
  position: relative;
`;

const StyledMenuItemTitle = styled.div`
  ${menuItemTitleStyles}
`;

const StyledErrorIndicator = styled.div`
  ${menuItemErrorIndicatorStyles}
`;

const StyledMenuItemIndicator = styled(motion.div)`
  ${menuItemIndicatorStyles}
`;
