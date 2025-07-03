import { css } from "styled-components";

import { cssVarUsage } from "@utils";

export const sideEntityMenuStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: 100%;
  overflow: hidden;
`;

export const sideEntityMenuHeaderStyles = css`
  flex-shrink: 0;
  border-bottom: 1px solid ${cssVarUsage("gray-200")};
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
    $borderBottom && `border-bottom: 1px solid ${cssVarUsage("gray-200")}`};

  &:hover:not(:disabled) {
    background-color: ${({ $disabled }) =>
      $disabled ? "transparent" : cssVarUsage("gray-100")};
  }

  &:focus {
    outline: 2px solid ${cssVarUsage("primary-base")};
    outline-offset: -2px;
  }

  &[aria-current="page"] {
    font-weight: 600;
  }
`;
