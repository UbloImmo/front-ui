import { css, type RuleSet } from "styled-components";

export const tableHeaderCellStyles = (): RuleSet => css`
  text-align: left;
  padding-bottom: var(--s-2);

  div {
    background-color: var(--primary-light);
    width: 100%;
    padding: var(--s-2) var(--s-4);
    height: max-content;
    border: 1px solid var(--primary-medium);
  }

  &:not(:first-child) div,
  :not(:last-child) div {
    border-left: 0;
  }

  &:first-child div {
    border-top-left-radius: var(--s-2);
    border-bottom-left-radius: var(--s-2);
  }

  &:last-child div {
    border-top-right-radius: var(--s-2);
    border-bottom-right-radius: var(--s-2);
  }
`;
