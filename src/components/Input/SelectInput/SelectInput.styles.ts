import { css, RuleSet } from "styled-components";

export const SelectInputStyles = (): RuleSet => {
  return css`
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;

    &:disabled {
      cursor: not-allowed;
    }
  `;
};

export const SelectOptionContainerStyles = (): RuleSet => {
  return css`
    position: relative;
    top: calc(var(--s-1) * -1);
    padding-top: var(--s-1);
    width: 100%;
    border-radius: 0 0 var(--s-1) var(--s-1);
    min-height: var(--s-8);
    max-height: calc(var(--s-8) * 7 + var(--s-1));
    height: fit-content;
    background-color: white;
    overflow-y: scroll;
    box-shadow: var(--shadow-card-elevation-low);
  `;
};

const beforeBackgroundColorStyle = (): RuleSet => {
  return css`
    &::before {
      content: "";
      position: absolute;
      background-color: var(--gray-50);
      inset: 0 1px;
    }
  `;
};

export const buildSelectOptionItemStyles = (): RuleSet => {
  return css`
    padding: var(--s-2);
    height: var(--s-8);
    min-height: var(--s-8);
    max-height: var(--s-8);
    transition: color 150ms ease-in-out, background-color 300ms ease-in-out;
    border-top: 1px solid var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;

    span {
      overflow: hidden;
    }

    &[aria-disabled] {
      cursor: not-allowed;

      ${beforeBackgroundColorStyle}

      &:last-child::before {
        bottom: 1px;
      }
    }

    span[data-testid="input-select-option-label"],
    svg[data-testid="icon"] {
      position: relative;
    }

    &:not([aria-disabled]):hover {
      span[data-testid="text"] {
        color: var(--primary-base);
      }
      background-color: var(--primary-light);
    }

    &:last-child {
      &::before,
      & {
        border-radius: 0 0 var(--s-1) var(--s-1);
      }
    }
  `;
};

export const groupOptionLabelStyles = (): RuleSet => {
  return css`
    padding: var(--s-1) var(--s-2);
    height: var(--s-6);
    min-height: var(--s-6);
    max-height: var(--s-6);
    position: relative;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--primary-light);

    span[data-testid="text"] {
      position: relative;
    }

    ${beforeBackgroundColorStyle}
  `;
};
