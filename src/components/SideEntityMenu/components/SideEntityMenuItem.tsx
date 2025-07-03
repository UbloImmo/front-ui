import { FC, useCallback } from "react";
import styled from "styled-components";

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

import { Icon, Text, Heading } from "@components";

import type { SideEntityMenuItemProps } from "../SideEntityMenu.types";

/**
 * SideEntityMenuItem component for rendering individual menu items
 */
export const SideEntityMenuItem: FC<SideEntityMenuItemProps> = ({
  link,
  index = 0,
}) => {
  const handleClick = useCallback(() => {
    if (link.disabled) return;
    if (link.onClick) {
      link.onClick();
    }
  }, [link]);

  if (link.hidden) return null;

  const isDisabled = link.disabled;
  const isActive =
    typeof window !== "undefined" && window.location.pathname === link.to;

  const commonProps = {
    onClick: handleClick,
    $disabled: isDisabled,
    $error: link.error,
    $head: link.head,
    $borderBottom: link.borderBottom,
    tabIndex: isDisabled ? -1 : 0,
    "aria-disabled": isDisabled,
    "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
    "data-testid": `side-entity-menu-item-${index}`,
  };

  const menuItemContent = (
    <>
      {isActive && <StyledMenuItemIndicator />}
      <StyledIconTextContainer>
        {link.icon && (
          <StyledMenuItemIcon>
            <Icon
              name={link.icon}
              size="1rem"
              color={
                link.error
                  ? "error-base"
                  : isDisabled
                    ? "gray-400"
                    : isActive
                      ? "primary-base"
                      : "gray-600"
              }
            />
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
      {link.slot && (
        <div>{typeof link.slot === "function" ? <link.slot /> : link.slot}</div>
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
`;

const StyledMenuItemTitle = styled.div`
  ${menuItemTitleStyles}
`;

const StyledPinIcon = styled.div`
  ${menuItemPinIconStyles}
`;

const StyledErrorIcon = styled.div`
  ${menuItemErrorIconStyles}
`;

const StyledMenuItemIndicator = styled.div`
  ${menuItemIndicatorStyles}
`;

const StyledTextContent = styled.div`
  ${menuItemTextContentStyles}
`;

const StyledIconTextContainer = styled.div`
  ${menuItemIconTextContainerStyles}
`;
