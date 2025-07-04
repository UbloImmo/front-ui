import { css } from "styled-components";

import { cssVarUsage } from "@utils";

const sideEntityMenuStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: 100%;
  overflow: hidden;
  padding: 0.25rem;
  background-color: white;
  border-radius: 0.5rem;
`;

export const sideEntityMenuContainerStyles = css<{
  $width: string;
  $collapsedWidth: string;
}>`
  ${sideEntityMenuStyles}
  width: ${({ $collapsedWidth }) => $collapsedWidth};
  transition: width 0.2s ease-in-out;

  /* Show all when hovering the entire menu */
  &:hover {
    width: ${({ $width }) => $width};

    div[data-text-content] {
      opacity: 1;
      visibility: visible;
    }

    /* Hide error indicator on icon when expanded */
    div[data-error-indicator] {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

export const sideEntityMenuTitleSectionStyles = css`
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: 0.75rem;
  padding: ${cssVarUsage("s-2")};
`;

export const menuItemStyles = css<{
  $disabled?: boolean;
  $error?: boolean;
  $head?: boolean;
  $borderBottom?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${cssVarUsage("s-2")};
  min-height: 2.5rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  font-weight: ${({ $head }) => ($head ? "600" : "400")};
  background-color: transparent;
  transition: background-color 0.2s ease;

  ${({ $borderBottom }) =>
    $borderBottom &&
    `border-bottom: 1px solid ${cssVarUsage("primary-light")}`};

  &:hover:not(:disabled) {
    background-color: ${({ $disabled }) =>
      $disabled ? "transparent" : cssVarUsage("primary-light")};
  }

  &:focus {
    outline: 2px solid ${cssVarUsage("primary-base")};
    outline-offset: -2px;
  }

  &[aria-current="page"] {
    font-weight: 600;
  }
`;

export const menuItemIconStyles = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  width: 1rem;
`;

export const menuItemTitleStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  height: 1.25rem;
  font-size: ${cssVarUsage("font-size-m")};
  line-height: ${cssVarUsage("line-height-m")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const menuItemPinIconStyles = css`
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &:not([data-text-content]) {
    opacity: 1;
    visibility: visible;
  }
`;

export const menuItemErrorIconStyles = css`
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &:not([data-text-content]) {
    opacity: 1;
    visibility: visible;
  }
`;

export const menuItemIndicatorStyles = css`
  position: absolute;
  left: 0;
  height: 1.25rem;
  width: 0.125rem;
  border-radius: 0.125rem;
  background-color: ${cssVarUsage("primary-base")};
  align-self: center;
`;

export const menuItemTextContentStyles = css`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1;
  }
`;

export const menuItemIconTextContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
`;
