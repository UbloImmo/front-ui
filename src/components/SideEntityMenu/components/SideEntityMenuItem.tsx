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
  menuItemPinIconStyles,
  menuItemErrorIconStyles,
  menuItemIndicatorStyles,
  menuItemTextContentStyles,
  menuItemIconTextContainerStyles,
} from "../SideEntityMenu.styles";

import { useTestId } from "@utils";

import type { SideEntityMenuItemProps } from "../SideEntityMenu.types";

/**
 * SideEntityMenuItem component for rendering individual menu items
 */
export const SideEntityMenuItem: FC<SideEntityMenuItemProps> = ({
  link,
  activeItem,
  ...props
}) => {
  const testId = useTestId("side-entity-menu-item", props);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (link.disabled) return;
      if (link.onClick) {
        event.preventDefault(); // Prevent navigation when onClick is provided
        link.onClick();
      }
    },
    [link]
  );

  if (link.hidden) return null;

  const isDisabled = link.disabled;
  const isActive = activeItem
    ? activeItem === link.to
    : typeof window !== "undefined" && window.location.pathname === link.to;

  const commonProps = {
    onClick: handleClick,
    $disabled: isDisabled,
    $error: link.error,
    $head: link.head,
    tabIndex: isDisabled ? -1 : 0,
    "aria-disabled": isDisabled,
    "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
    "data-testid": testId,
  };

  const menuItemContent = (
    <>
      {isActive && <StyledMenuItemIndicator layoutId="current" />}
      <StyledIconTextContainer>
        {link.icon && (
          <StyledMenuItemIcon>
            <Icon
              name={link.icon}
              size="1rem"
              color={
                isDisabled ? "gray-400" : isActive ? "primary-base" : "gray-600"
              }
            />
            {link.error && (
              <StyledErrorIndicator data-error-indicator>
                <Icon name="CircleFill" size="0.5rem" color="error-base" />
              </StyledErrorIndicator>
            )}
          </StyledMenuItemIcon>
        )}
        <StyledMenuItemTitle data-text-content>
          <StyledTextContent>
            {link.head ? (
              <Heading
                size="h4"
                weight="bold"
                color={
                  isDisabled ? "gray-500" : isActive ? "gray-700" : "gray-900"
                }
              >
                {link.title}
              </Heading>
            ) : (
              <Text
                size="m"
                weight={isActive ? "bold" : "regular"}
                color={
                  isDisabled ? "gray-500" : isActive ? "gray-700" : "gray-900"
                }
              >
                {link.title}
              </Text>
            )}
          </StyledTextContent>
        </StyledMenuItemTitle>
      </StyledIconTextContainer>
      {link.pinned && (
        <StyledPinIcon data-text-content>
          <Icon
            name="PinAngleFill"
            size="0.75rem"
            color={
              isDisabled ? "gray-400" : isActive ? "primary-base" : "gray-600"
            }
          />
        </StyledPinIcon>
      )}
      {link.error && (
        <StyledErrorIcon data-text-content>
          <Icon name="CircleFill" size="0.5rem" color="error-base" />
        </StyledErrorIcon>
      )}
    </>
  );

  return (
    <StyledMenuItemLink href={link.to} {...commonProps}>
      {menuItemContent}
    </StyledMenuItemLink>
  );
};

const StyledMenuItemLink = styled.a<{
  $disabled?: boolean;
  $error?: boolean;
  $head?: boolean;
  $borderBottom?: boolean;
}>`
  ${menuItemStyles}
`;

const StyledMenuItemIcon = styled.div`
  ${menuItemIconStyles}
  position: relative;
`;

const StyledMenuItemTitle = styled.div`
  ${menuItemTitleStyles}
`;

const StyledPinIcon = styled.div`
  ${menuItemPinIconStyles}
`;

const StyledErrorIndicator = styled.div`
  position: absolute;
  top: calc(var(--s-3) * -0.5);
  right: calc(var(--s-3) * -0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
  height: 0.5rem;
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
`;

const StyledErrorIcon = styled.div`
  ${menuItemErrorIconStyles}
`;

const StyledMenuItemIndicator = styled(motion.div)`
  ${menuItemIndicatorStyles}
`;

const StyledTextContent = styled.div`
  ${menuItemTextContentStyles}
`;

const StyledIconTextContainer = styled.div`
  ${menuItemIconTextContainerStyles}
`;
