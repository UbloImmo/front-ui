import { css, keyframes, RuleSet } from "styled-components";

import { SwitchStyleProps } from "./Switch.types";

import { cssVarUsage } from "@utils";

const sharedSwitchStyles = css`
  --padding: 0.1875rem;
  --translateX: calc(var(--s-5) - var(--padding));
`;

export const SwitchContainerStyles = (): RuleSet => {
  return css`
    ${sharedSwitchStyles}
    cursor: pointer;
    width: var(--s-10);
    max-width: var(--s-10);
    min-width: var(--s-10);
    height: 1.375rem;
    border-radius: var(--s-5);
    padding: var(--padding);
    border: none;
    background-color: var(--gray-300);
    transition: background-color 300ms ease;

    &[aria-checked] {
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
    translate: var(--translateX) 0;
  }
`;

const switchInactiveCSSAnim = keyframes`
  25% {
    scale: 0.8;
    width: var(--s-6);
  }
  100% {
    scale: 1;
    translate: 0;
  }
`;

export const SwitchHandleStyles = ({
  $disabled,
}: SwitchStyleProps): RuleSet => {
  return css`
    width: var(--s-4);
    height: var(--s-4);
    min-width: var(--s-4);
    min-height: var(--s-4);
    border-radius: var(--s-4);
    background: ${$disabled ? cssVarUsage("gray-200") : "white"};
    cursor: inherit;

    &[aria-checked] {
      animation: ${switchActiveCSSAnim} 300ms ease-out forwards;
    }

    &[aria-checked="false"] {
      animation: ${switchInactiveCSSAnim} 300ms ease-out forwards;
      translate: var(--translateX) 0;
    }
  `;
};
