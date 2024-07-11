import { css, keyframes, RuleSet } from "styled-components";

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

    &[data-active="true"] {
      background-color: var(--primary-base);

      &:disabled {
        background-color: var(--gray-600);
      }
    }

    &[data-active="false"]:not(:disabled) {
      background-color: var(--gray-300);
    }
  `;
};

const switchActiveCSSAnim = keyframes`
  from {
    transform: translateX(0);
  }
  25% {
    transform: scaleY(0.8);
    width: var(--s-6);
  }
  to {
    transform: translateX(1.1rem);
  }
`;

const switchInactiveCSSAnim = keyframes`
  from {
    transform: translateX(1.1rem);
  }
  25% {
    transform: scaleY(0.8);
    width: var(--s-6);
  }
  to {
    transform: translateX(0);
  }
`;

export const SwitchHandleStyles = (): RuleSet => {
  return css`
    width: var(--s-4);
    height: var(--s-4);
    border-radius: var(--s-4);
    background: white;
    cursor: inherit;
    transition: transform 300ms ease-out;

    &[data-active="true"] {
      animation: ${switchActiveCSSAnim} 300ms ease-out;
      transform: translateX(1.1rem);
    }

    &[data-active="false"] {
      animation: ${switchInactiveCSSAnim} 300ms ease-out;
      transform: translateX(0);
    }
  `;
};
