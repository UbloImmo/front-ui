import { css, keyframes, RuleSet } from "styled-components";

import { SwitchStyleProps } from "./Switch.types";

import { cssVarUsage } from "@utils";

export const SwitchContainerStyles = (): RuleSet => {
  return css`
    cursor: pointer;
    width: var(--s-10);
    height: 1.375rem;
    border-radius: var(--s-5);
    padding: 0.15rem 0.2rem;
    border: none;
    background-color: var(--gray-300);
    transition: background-color 0.4s ease;

    &[aria-checked="true"] {
      background-color: var(--primary-base);
    }

    &[aria-checked="false"] {
      background-color: var(--gray-300);
    }

    &:disabled {
      background-color: var(--gray-600);
    }
  `;
};

const switchActiveCSSAnim = keyframes`
  25% {
    scale: 0.8;
    width: var(--s-6);
  }
  100% {
    scale: 1;
    transform: translateX(1.1rem);
  }
`;

const switchInactiveCSSAnim = keyframes`
  25% {
    scale: 0.8;
    width: var(--s-6);
  }
  100% {
    scale: 1;
    transform: translateX(0);
  }
`;

export const SwitchHandleStyles = ({
  $disabled,
}: SwitchStyleProps): RuleSet => {
  return css`
    width: var(--s-4);
    height: var(--s-4);
    border-radius: var(--s-4);
    background: ${$disabled ? cssVarUsage("gray-200") : "white"};
    cursor: inherit;

    &[aria-checked="true"] {
      animation: ${switchActiveCSSAnim} 300ms ease-out forwards;
    }

    &[aria-checked="false"] {
      animation: ${switchInactiveCSSAnim} 300ms ease-out forwards;
      transform: translateX(1.1rem);
    }
  `;
};
