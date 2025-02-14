import { css, type RuleSet } from "styled-components";

export const contextMenuItemStyles = (): RuleSet => {
  return css`
    height: var(--s-7);
    min-height: var(--s-7);
    max-height: var(--s-7);
    width: 100%;
    min-width: 10rem;
    max-width: 100%;
    background: var(--white);
    padding: 0 var(--s-2);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    transition: background 300ms ease-out 0s;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px solid var(--primary-medium);
    }

    &:disabled {
      background: var(--gray-50);
      cursor: not-allowed;
    }

    span[data-testid="context-menu-item-label"] {
      transition: color 300ms ease-out 0s;
      width: 100%;
      flex: 1;
      overflow: hidden;
    }

    &:hover:not(:disabled) span[data-testid="context-menu-item-label"],
    &:focus-visible:not(:disabled) span[data-testid="context-menu-item-label"] {
      color: var(--primary-base);
      transition-duration: 150ms;
    }

    &:focus-visible:not(:disabled) {
      outline: none;
      background: var(--primary-light);
    }

    &:last-child {
      border-bottom-right-radius: var(--s-05);
      border-bottom-left-radius: var(--s-05);
    }

    &:first-child {
      border-top-right-radius: var(--s-05);
      border-top-left-radius: var(--s-05);
    }
  `;
};
