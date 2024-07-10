import styled, { css, keyframes, RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { SwitchStyleProps } from "./Switch.types";

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--s-2);
  cursor: default;
`;

export const SwitchToggleStyles = ({
  $active,
  $disabled,
}: SwitchStyleProps): RuleSet => {
  return css`
    cursor: pointer;
    width: var(--s-10);
    height: 1.375rem;
    border-radius: var(--s-5);
    padding: 0.2rem;
    background-color: ${$active
      ? $disabled
        ? cssVarUsage("gray-600")
        : cssVarUsage("primary-base")
      : cssVarUsage("gray-300")};
    transition: background-color 0.4s ease;
  `;
};

const switchActiveCSSAnim = keyframes`
  0% { 
    transform: translateX(0) scale(1);
  }
  25% {
    transform: scale(0.8);
    width: var(--s-6);
  }
  100% { 
    width: var(--s-4);
    transform: translateX(1.1rem);
    
  }
`;

const switchInactiveCSSAnim = keyframes`
  0% { 
    transform: translateX(1.1rem) scale(1);
  }
  25% {
    transform: scale(0.8);
    width: var(--s-6);
  }
  100% { 
    width: var(--s-4);
    transform: translateX(0);
  }
`;

export const SwitchToggleCheckboxStyles = ({
  $active,
}: SwitchStyleProps): RuleSet => {
  return css`
    width: var(--s-4);
    height: var(--s-4);
    border-radius: var(--s-4);
    background: white;
    cursor: inherit;
    transform: ${$active ? "translateX(1.1rem)" : "translateX(0)"};
    ${$active
      ? css`
          animation: ${switchActiveCSSAnim} 250ms ease-out;
        `
      : css`
          animation: ${switchInactiveCSSAnim} 300ms ease-out;
        `}
  `;
};
